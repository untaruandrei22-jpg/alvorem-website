import assert from "node:assert/strict";
import test from "node:test";

import {
  DEMO_HISTORY_MAX_MESSAGES,
  DEMO_MESSAGE_MAX_CHARACTERS,
  DEMO_SESSION_STORAGE_KEY,
  appendConversationTurn,
  buildBoundedHistory,
  completeDemoConversationTurn,
  createEmptyDemoSession,
  resetDemoSession,
  restoreDemoSession,
  saveDemoSession,
  setDemoConversationId,
} from "../src/lib/alvo-demo-session.ts";

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
    has: (key) => values.has(key),
  };
}

test("creates an empty browser session", () => {
  assert.deepEqual(createEmptyDemoSession("ro"), {
    conversationId: null,
    history: [],
    locale: "ro",
  });
});

test("preserves the authoritative backend conversation ID", () => {
  const session = setDemoConversationId(createEmptyDemoSession(), "demo_abc-123");
  const next = appendConversationTurn(session, "Question", "Answer");
  assert.equal(next.conversationId, "demo_abc-123");
});

test("appends a chronological user and assistant turn", () => {
  const session = appendConversationTurn(createEmptyDemoSession(), "Question", "Answer");
  assert.deepEqual(session.history, [
    { role: "user", content: "Question" },
    { role: "assistant", content: "Answer" },
  ]);
});

test("completes a successful turn with the authoritative conversation ID atomically", () => {
  const previous = setDemoConversationId(
    createEmptyDemoSession(),
    "demo_previous",
  );
  const next = completeDemoConversationTurn(
    previous,
    "demo_authoritative",
    "What about margin?",
    "Margin is stable.",
  );

  assert.equal(next.conversationId, "demo_authoritative");
  assert.deepEqual(next.history, [
    { role: "user", content: "What about margin?" },
    { role: "assistant", content: "Margin is stable." },
  ]);
  assert.equal(previous.conversationId, "demo_previous");
  assert.deepEqual(previous.history, []);
});

test("keeps only the latest eight messages in chronological order", () => {
  const messages = Array.from({ length: 10 }, (_, index) => ({
    role: index % 2 === 0 ? "user" : "assistant",
    content: `message-${index}`,
  }));
  const bounded = buildBoundedHistory(messages);
  assert.equal(bounded.length, DEMO_HISTORY_MAX_MESSAGES);
  assert.equal(bounded[0].content, "message-2");
  assert.equal(bounded.at(-1).content, "message-9");
});

test("restores a valid sessionStorage value", () => {
  const storage = memoryStorage();
  const expected = appendConversationTurn(createEmptyDemoSession(), "Question", "Answer");
  assert.equal(saveDemoSession(expected, storage), true);
  assert.deepEqual(restoreDemoSession(storage), expected);
});

for (const [name, raw] of [
  ["malformed JSON", "{"],
  ["invalid role", JSON.stringify({ conversationId: null, history: [{ role: "tool", content: "x" }], locale: "en" })],
  ["oversized content", JSON.stringify({ conversationId: null, history: [{ role: "user", content: "x".repeat(DEMO_MESSAGE_MAX_CHARACTERS + 1) }], locale: "en" })],
  ["unexpected fields", JSON.stringify({ conversationId: null, history: [], locale: "en", routing: {} })],
]) {
  test(`discards ${name} from sessionStorage`, () => {
    const storage = memoryStorage({ [DEMO_SESSION_STORAGE_KEY]: raw });
    assert.deepEqual(restoreDemoSession(storage), createEmptyDemoSession());
    assert.equal(storage.has(DEMO_SESSION_STORAGE_KEY), false);
  });
}

test("rejects oversized messages instead of persisting them", () => {
  assert.throws(
    () => appendConversationTurn(createEmptyDemoSession(), "x".repeat(501), "Answer"),
    RangeError,
  );
});

test("reset clears history, conversation ID, and storage", () => {
  const storage = memoryStorage({ [DEMO_SESSION_STORAGE_KEY]: "value" });
  const reset = resetDemoSession(storage, "ro");
  assert.deepEqual(reset, createEmptyDemoSession("ro"));
  assert.equal(storage.has(DEMO_SESSION_STORAGE_KEY), false);
});

test("restore and save are SSR-safe without browser storage", () => {
  assert.deepEqual(restoreDemoSession(null, "en"), createEmptyDemoSession("en"));
  assert.equal(saveDemoSession(createEmptyDemoSession(), null), false);
});
