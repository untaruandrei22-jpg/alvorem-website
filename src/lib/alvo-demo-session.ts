export const DEMO_HISTORY_MAX_MESSAGES = 8;
export const DEMO_MESSAGE_MAX_CHARACTERS = 500;
export const DEMO_CONVERSATION_ID_MAX_CHARACTERS = 64;
export const DEMO_SESSION_STORAGE_KEY = "alvorem:alvo-demo-session:v1";

export type DemoConversationRole = "user" | "assistant";
export type DemoConversationLocale = "en" | "ro";

export type DemoConversationMessage = {
  role: DemoConversationRole;
  content: string;
};

export type DemoConversationSession = {
  conversationId: string | null;
  history: DemoConversationMessage[];
  locale: DemoConversationLocale;
};

export type DemoSessionStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const SESSION_FIELDS = new Set(["conversationId", "history", "locale"]);
const MESSAGE_FIELDS = new Set(["role", "content"]);
const CONVERSATION_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;

function hasExactFields(value: Record<string, unknown>, allowed: Set<string>) {
  const keys = Object.keys(value);
  return keys.length === allowed.size && keys.every((key) => allowed.has(key));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLocale(value: unknown): value is DemoConversationLocale {
  return value === "en" || value === "ro";
}

function isMessage(value: unknown): value is DemoConversationMessage {
  if (!isRecord(value) || !hasExactFields(value, MESSAGE_FIELDS)) return false;
  if (value.role !== "user" && value.role !== "assistant") return false;
  return (
    typeof value.content === "string" &&
    value.content.trim().length > 0 &&
    value.content.length <= DEMO_MESSAGE_MAX_CHARACTERS
  );
}

export function createEmptyDemoSession(
  locale: DemoConversationLocale = "en",
): DemoConversationSession {
  return { conversationId: null, history: [], locale };
}

export function validateDemoSession(value: unknown): DemoConversationSession | null {
  if (!isRecord(value) || !hasExactFields(value, SESSION_FIELDS)) return null;
  if (!isLocale(value.locale)) return null;
  if (
    value.conversationId !== null &&
    (typeof value.conversationId !== "string" ||
      value.conversationId.length > DEMO_CONVERSATION_ID_MAX_CHARACTERS ||
      !CONVERSATION_ID_PATTERN.test(value.conversationId))
  ) {
    return null;
  }
  if (
    !Array.isArray(value.history) ||
    value.history.length > DEMO_HISTORY_MAX_MESSAGES ||
    !value.history.every(isMessage)
  ) {
    return null;
  }
  return {
    conversationId: value.conversationId,
    history: value.history.map((message) => ({ ...message })),
    locale: value.locale,
  };
}

export function buildBoundedHistory(
  messages: readonly DemoConversationMessage[],
): DemoConversationMessage[] {
  if (!messages.every(isMessage)) {
    throw new TypeError("Conversation history contains an invalid message.");
  }
  return messages
    .slice(-DEMO_HISTORY_MAX_MESSAGES)
    .map((message) => ({ ...message }));
}

export function appendConversationTurn(
  session: DemoConversationSession,
  userContent: string,
  assistantContent: string,
): DemoConversationSession {
  const additions: DemoConversationMessage[] = [
    { role: "user", content: userContent },
    { role: "assistant", content: assistantContent },
  ];
  if (!additions.every(isMessage)) {
    throw new RangeError("Conversation messages must contain 1 to 500 characters.");
  }
  return {
    ...session,
    history: buildBoundedHistory([...session.history, ...additions]),
  };
}

export function setDemoConversationId(
  session: DemoConversationSession,
  conversationId: string,
): DemoConversationSession {
  if (
    conversationId.length > DEMO_CONVERSATION_ID_MAX_CHARACTERS ||
    !CONVERSATION_ID_PATTERN.test(conversationId)
  ) {
    throw new TypeError("Invalid demo conversation ID.");
  }
  return { ...session, conversationId };
}

export function completeDemoConversationTurn(
  session: DemoConversationSession,
  conversationId: string,
  userContent: string,
  assistantContent: string,
): DemoConversationSession {
  return appendConversationTurn(
    setDemoConversationId(session, conversationId),
    userContent,
    assistantContent,
  );
}

function browserSessionStorage(): DemoSessionStorage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function restoreDemoSession(
  storage: DemoSessionStorage | null = browserSessionStorage(),
  fallbackLocale: DemoConversationLocale = "en",
): DemoConversationSession {
  if (!storage) return createEmptyDemoSession(fallbackLocale);
  try {
    const serialized = storage.getItem(DEMO_SESSION_STORAGE_KEY);
    if (serialized === null) return createEmptyDemoSession(fallbackLocale);
    const restored = validateDemoSession(JSON.parse(serialized));
    if (restored) return restored;
  } catch {
    // Untrusted browser state is discarded below.
  }
  try {
    storage.removeItem(DEMO_SESSION_STORAGE_KEY);
  } catch {
    // Storage may be unavailable; the in-memory empty session remains safe.
  }
  return createEmptyDemoSession(fallbackLocale);
}

export function saveDemoSession(
  session: DemoConversationSession,
  storage: DemoSessionStorage | null = browserSessionStorage(),
): boolean {
  if (!storage) return false;
  const validated = validateDemoSession(session);
  if (!validated) throw new TypeError("Refusing to persist an invalid demo session.");
  try {
    storage.setItem(DEMO_SESSION_STORAGE_KEY, JSON.stringify(validated));
    return true;
  } catch {
    return false;
  }
}

export function resetDemoSession(
  storage: DemoSessionStorage | null = browserSessionStorage(),
  locale: DemoConversationLocale = "en",
): DemoConversationSession {
  if (storage) {
    try {
      storage.removeItem(DEMO_SESSION_STORAGE_KEY);
    } catch {
      // Reset still succeeds in memory when browser storage is unavailable.
    }
  }
  return createEmptyDemoSession(locale);
}
