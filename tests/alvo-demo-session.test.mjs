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
  isDemoSessionReadyForSubmission,
  resetDemoSession,
  restoreDemoSession,
  saveDemoSession,
  setDemoConversationId,
  setV2ConversationCheckpoint,
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

function presentation(overrides = {}) {
  return {
    action: "answer",
    headline: "Margin is stable.",
    summary: "The latest synthetic month remains within the expected range.",
    kpis: [{ label: "Gross margin", value: "45.4%" }],
    provenance: ["synthetic:generated/retail_v1"],
    disclaimer: "Synthetic demo — no real company data.",
    ...overrides,
  };
}

function priorResultContext(overrides = {}) {
  return {
    client_brain_id: "retail_public_v1",
    capability_id: "margin_analysis",
    metric_ids: ["gross_margin_pct"],
    dimension_ids: ["store"],
    selected_entity_ref: "store:S003",
    entity_refs: ["store:S003"],
    result_refs: ["result:retail_public_v1:margin_analysis"],
    analysis_mode: "compare",
    period_start: "2026-07-01",
    period_end: "2026-07-31",
    comparison_mode: "previous_period",
    comparison_period_start: "2026-06-01",
    comparison_period_end: "2026-06-30",
    role: "manager",
    ...overrides,
  };
}

function v2Checkpoint(overrides = {}) {
  return {
    schema_version: "2.0",
    client_brain_id: "retail_public_v2",
    session_id: "v2_session_1",
    turn_count: 1,
    topics: [],
    verified_results: [],
    focused_result_id: null,
    pending_clarification: null,
    unresolved_references: [],
    ...overrides,
  };
}

function assistant(overrides = {}) {
  return {
    content: "Margin is stable.",
    presentation: presentation(),
    priorResultContext: null,
    ...overrides,
  };
}

function assistantMessage(index) {
  return {
    role: "assistant",
    content: `answer-${index}`,
    presentation: presentation({
      headline: `answer-${index}`,
      summary: `summary-${index}`,
    }),
    priorResultContext: null,
  };
}

test("creates an empty browser session", () => {
  assert.deepEqual(createEmptyDemoSession("ro"), {
    conversationId: null,
    history: [],
    locale: "ro",
    v2Checkpoint: null,
  });
});

test("blocks demo submission until browser session restore completes", () => {
  assert.equal(isDemoSessionReadyForSubmission(false, false), false);
  assert.equal(isDemoSessionReadyForSubmission(true, false), true);
  assert.equal(isDemoSessionReadyForSubmission(true, true), false);
});

test("preserves the authoritative backend conversation ID", () => {
  const session = setDemoConversationId(createEmptyDemoSession(), "demo_abc-123");
  const next = appendConversationTurn(session, "Question", assistant());
  assert.equal(next.conversationId, "demo_abc-123");
});

test("appends a chronological user and presentation-safe assistant turn", () => {
  const turn = assistant({
    priorResultContext: priorResultContext(),
  });
  const session = appendConversationTurn(
    createEmptyDemoSession(),
    "Which store is weakest?",
    turn,
  );

  assert.deepEqual(session.history, [
    { role: "user", content: "Which store is weakest?" },
    {
      role: "assistant",
      content: turn.content,
      presentation: turn.presentation,
      priorResultContext: turn.priorResultContext,
    },
  ]);
});

test("completes a successful turn with authoritative ID atomically", () => {
  const previous = setDemoConversationId(
    createEmptyDemoSession(),
    "demo_previous",
  );
  const turn = assistant();
  const next = completeDemoConversationTurn(
    previous,
    "demo_authoritative",
    "What about margin?",
    turn,
  );

  assert.equal(next.conversationId, "demo_authoritative");
  assert.deepEqual(next.history, [
    { role: "user", content: "What about margin?" },
    {
      role: "assistant",
      content: turn.content,
      presentation: turn.presentation,
      priorResultContext: null,
    },
  ]);
  assert.equal(previous.conversationId, "demo_previous");
  assert.deepEqual(previous.history, []);
});

test("stores a V2 checkpoint only when it matches the conversation session", () => {
  const base = setDemoConversationId(
    createEmptyDemoSession(),
    "v2_session_1",
  );
  const next = setV2ConversationCheckpoint(base, v2Checkpoint());

  assert.equal(next.v2Checkpoint?.session_id, "v2_session_1");
  assert.equal(base.v2Checkpoint, null);

  assert.throws(
    () =>
      setV2ConversationCheckpoint(
        base,
        v2Checkpoint({ session_id: "v2_other" }),
      ),
    TypeError,
  );
});

test("restores a validated V2 checkpoint and rejects internal additions", () => {
  const storage = memoryStorage();
  const session = setV2ConversationCheckpoint(
    setDemoConversationId(createEmptyDemoSession(), "v2_session_1"),
    v2Checkpoint(),
  );

  assert.equal(saveDemoSession(session, storage), true);
  assert.deepEqual(restoreDemoSession(storage), session);

  const tampered = {
    ...session,
    v2Checkpoint: {
      ...session.v2Checkpoint,
      result_fingerprint: "sha256:" + "0".repeat(64),
    },
  };
  storage.setItem(DEMO_SESSION_STORAGE_KEY, JSON.stringify(tampered));
  assert.deepEqual(restoreDemoSession(storage), createEmptyDemoSession());
  assert.equal(storage.has(DEMO_SESSION_STORAGE_KEY), false);
});

test("keeps only the latest eight valid messages in chronological order", () => {
  const messages = Array.from({ length: 10 }, (_, index) =>
    index % 2 === 0
      ? { role: "user", content: `question-${index}` }
      : assistantMessage(index),
  );
  const bounded = buildBoundedHistory(messages);
  assert.equal(bounded.length, DEMO_HISTORY_MAX_MESSAGES);
  assert.equal(bounded[0].content, "question-2");
  assert.equal(bounded.at(-1).content, "answer-9");
});

test("preserves the newest typed entity anchor when the normal eight-message tail would evict it", () => {
  const anchorContext = priorResultContext({
    selected_entity_ref: "store:S004",
    entity_refs: ["store:S004"],
  });
  const messages = [
    { role: "user", content: "Older store question" },
    assistantMessage(1),
    { role: "user", content: "Director framing" },
    {
      ...assistantMessage(3),
      priorResultContext: anchorContext,
    },
    { role: "user", content: "follow-up-4" },
    assistantMessage(5),
    { role: "user", content: "follow-up-6" },
    assistantMessage(7),
    { role: "user", content: "inventory-switch" },
    assistantMessage(9),
    { role: "user", content: "first-return-attempt" },
    assistantMessage(11),
    { role: "user", content: "second-return-attempt" },
    assistantMessage(13),
  ];

  const bounded = buildBoundedHistory(messages);

  assert.equal(bounded.length, DEMO_HISTORY_MAX_MESSAGES);
  assert.equal(bounded[0].content, "Director framing");
  assert.equal(bounded[1].content, "answer-3");
  assert.equal(
    bounded[1].priorResultContext?.selected_entity_ref,
    "store:S004",
  );
  assert.equal(bounded[2].content, "inventory-switch");
  assert.equal(bounded.at(-1).content, "answer-13");
});

test("keeps the ordinary latest-eight behavior when an entity anchor already survives in the tail", () => {
  const messages = Array.from({ length: 10 }, (_, index) =>
    index % 2 === 0
      ? { role: "user", content: `question-${index}` }
      : {
          ...assistantMessage(index),
          priorResultContext:
            index === 7 ? priorResultContext() : null,
        },
  );

  const bounded = buildBoundedHistory(messages);

  assert.equal(bounded.length, DEMO_HISTORY_MAX_MESSAGES);
  assert.equal(bounded[0].content, "question-2");
  assert.equal(bounded[5].priorResultContext?.selected_entity_ref, "store:S003");
  assert.equal(bounded.at(-1).content, "answer-9");
});

test("restores visible transcript content and typed continuation from sessionStorage", () => {
  const storage = memoryStorage();
  const expected = completeDemoConversationTurn(
    createEmptyDemoSession("ro"),
    "demo_restore",
    "Care magazin e cel mai slab?",
    assistant({
      content: "Store S003 has the weakest margin.",
      presentation: presentation({
        headline: "Store S003 has the weakest margin.",
        summary: "Its synthetic margin is lowest in the current ranked view.",
      }),
      priorResultContext: priorResultContext(),
    }),
  );

  assert.equal(saveDemoSession(expected, storage), true);
  assert.deepEqual(restoreDemoSession(storage, "ro"), expected);
});

test("persisted session contains only the approved presentation-safe shape", () => {
  const storage = memoryStorage();
  const session = completeDemoConversationTurn(
    createEmptyDemoSession(),
    "demo_safe",
    "Why?",
    assistant({ priorResultContext: priorResultContext() }),
  );
  assert.equal(saveDemoSession(session, storage), true);

  const raw = storage.getItem(DEMO_SESSION_STORAGE_KEY);
  assert.ok(raw);
  const serialized = JSON.parse(raw);
  const publicJson = JSON.stringify(serialized);

  for (const forbidden of [
    "team_trace",
    "routing",
    "usage",
    "provider",
    "prompt",
    "chain_of_thought",
    "token",
    "cost",
    "database",
    "raw_model",
  ]) {
    assert.doesNotMatch(publicJson, new RegExp(forbidden, "i"));
  }
});

for (const [name, raw] of [
  ["malformed JSON", "{"],
  [
    "invalid role",
    JSON.stringify({
      conversationId: null,
      history: [{ role: "tool", content: "x" }],
      locale: "en",
    }),
  ],
  [
    "oversized content",
    JSON.stringify({
      conversationId: null,
      history: [
        {
          role: "user",
          content: "x".repeat(DEMO_MESSAGE_MAX_CHARACTERS + 1),
        },
      ],
      locale: "en",
    }),
  ],
  [
    "legacy assistant without presentation",
    JSON.stringify({
      conversationId: "demo_old",
      history: [{ role: "assistant", content: "Old headline only" }],
      locale: "en",
    }),
  ],
  [
    "unexpected fields",
    JSON.stringify({
      conversationId: null,
      history: [],
      locale: "en",
      routing: {},
    }),
  ],
]) {
  test(`discards ${name} from sessionStorage`, () => {
    const storage = memoryStorage({ [DEMO_SESSION_STORAGE_KEY]: raw });
    assert.deepEqual(restoreDemoSession(storage), createEmptyDemoSession());
    assert.equal(storage.has(DEMO_SESSION_STORAGE_KEY), false);
  });
}

test("rejects oversized user messages instead of persisting them", () => {
  assert.throws(
    () =>
      appendConversationTurn(
        createEmptyDemoSession(),
        "x".repeat(DEMO_MESSAGE_MAX_CHARACTERS + 1),
        assistant(),
      ),
    RangeError,
  );
});

test("rejects assistant presentation with unexpected internal fields", () => {
  assert.throws(
    () =>
      appendConversationTurn(
        createEmptyDemoSession(),
        "Question",
        assistant({
          presentation: {
            ...presentation(),
            routing: { strategy: "smart" },
          },
        }),
      ),
    RangeError,
  );
});

test("rejects malformed typed continuation metadata", () => {
  assert.throws(
    () =>
      appendConversationTurn(
        createEmptyDemoSession(),
        "Question",
        assistant({
          priorResultContext: priorResultContext({
            selected_entity_ref: "store:S999",
          }),
        }),
      ),
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
