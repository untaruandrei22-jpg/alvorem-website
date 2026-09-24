import {
  isV2ConversationCheckpoint,
  type V2ConversationCheckpoint,
} from "./alvo-demo-v2-checkpoint.ts";
export const DEMO_HISTORY_MAX_MESSAGES = 8;
export const DEMO_TRANSCRIPT_MAX_MESSAGES = 32;
export const DEMO_MESSAGE_MAX_CHARACTERS = 500;
export const DEMO_CONVERSATION_ID_MAX_CHARACTERS = 64;
export const DEMO_SESSION_STORAGE_KEY = "alvorem:alvo-demo-session:v2";

export type DemoConversationRole = "user" | "assistant";
export type DemoConversationLocale = "en" | "ro";

export type DemoPriorResultContext = {
  client_brain_id: string;
  capability_id: string;
  metric_ids: string[];
  dimension_ids: string[];
  selected_entity_ref: string | null;
  entity_refs: string[];
  result_refs: string[];
  analysis_mode: "performance" | "trend" | "rank" | "compare" | "investigate" | "explain" | null;
  period_start: string | null;
  period_end: string | null;
  comparison_mode: "target" | "previous_period" | "explicit_period" | null;
  comparison_period_start: string | null;
  comparison_period_end: string | null;
  role: "manager" | "product_owner" | "analyst" | "executive" | null;
};

export type DemoConversationChart = {
  chart_type: "bar";
  metric_id: "revenue";
  unit: "RON";
  points: { label: string; value: number }[];
};

export type DemoConversationPresentation = {
  action: "answer" | "clarification";
  headline: string;
  summary: string;
  kpis: { label: string; value: string }[];
  provenance: string[];
  disclaimer: string;
  chart?: DemoConversationChart | null;
};

export type DemoConversationMessage = {
  role: DemoConversationRole;
  content: string;
  presentation?: DemoConversationPresentation;
  priorResultContext?: DemoPriorResultContext | null;
};

export type DemoConversationSession = {
  conversationId: string | null;
  history: DemoConversationMessage[];
  locale: DemoConversationLocale;
  v2Checkpoint: V2ConversationCheckpoint | null;
};

export type DemoAssistantTurnInput = {
  content: string;
  presentation: DemoConversationPresentation;
  priorResultContext?: DemoPriorResultContext | null;
};

export type DemoSessionStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const SESSION_FIELDS = new Set([
  "conversationId",
  "history",
  "locale",
  "v2Checkpoint",
]);
const USER_MESSAGE_FIELDS = new Set(["role", "content"]);
const ASSISTANT_MESSAGE_FIELDS = new Set([
  "role",
  "content",
  "presentation",
  "priorResultContext",
]);
const PRESENTATION_FIELDS = new Set([
  "action",
  "headline",
  "summary",
  "kpis",
  "provenance",
  "disclaimer",
  "chart",
]);
const LEGACY_PRESENTATION_FIELDS = new Set([
  "action",
  "headline",
  "summary",
  "kpis",
  "provenance",
  "disclaimer",
]);
const KPI_FIELDS = new Set(["label", "value"]);
const CHART_FIELDS = new Set(["chart_type", "metric_id", "unit", "points"]);
const CHART_POINT_FIELDS = new Set(["label", "value"]);
const PRIOR_RESULT_CONTEXT_FIELDS = new Set([
  "client_brain_id",
  "capability_id",
  "metric_ids",
  "dimension_ids",
  "selected_entity_ref",
  "entity_refs",
  "result_refs",
  "analysis_mode",
  "period_start",
  "period_end",
  "comparison_mode",
  "comparison_period_start",
  "comparison_period_end",
  "role",
]);
const CONVERSATION_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;
const SAFE_ID_PATTERN = /^[a-z][a-z0-9_]{0,63}$/;
const SAFE_REF_PATTERN = /^[a-z][a-z0-9_]{0,31}:[A-Za-z0-9][A-Za-z0-9_.:/-]{0,127}$/;
const ANALYSIS_MODES = new Set([
  "performance", "trend", "rank", "compare", "investigate", "explain",
]);
const COMPARISON_MODES = new Set(["target", "previous_period", "explicit_period"]);
const PRESENTATION_ROLES = new Set(["manager", "product_owner", "analyst", "executive"]);
const MAX_SUMMARY_CHARACTERS = 2_000;
const MAX_DISCLAIMER_CHARACTERS = 500;
const MAX_KPIS = 4;
const MAX_PROVENANCE_ITEMS = 12;
const MAX_CHART_POINTS = 12;
const MAX_CHART_LABEL_CHARACTERS = 32;
const MAX_CONTEXT_IDS = 4;
const MAX_CONTEXT_ENTITY_REFS = 4;
const MAX_CONTEXT_RESULT_REFS = 1;

function hasExactFields(value: Record<string, unknown>, allowed: Set<string>) {
  const keys = Object.keys(value);
  return keys.length === allowed.size && keys.every((key) => allowed.has(key));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBoundedText(value: unknown, maxCharacters: number): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxCharacters
  );
}

function isLocale(value: unknown): value is DemoConversationLocale {
  return value === "en" || value === "ro";
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function isSafeIdArray(value: unknown, maxItems: number): value is string[] {
  return (
    Array.isArray(value) &&
    value.length <= maxItems &&
    value.every((item) => typeof item === "string" && SAFE_ID_PATTERN.test(item)) &&
    new Set(value).size === value.length
  );
}

function isSafeRefArray(value: unknown, maxItems: number): value is string[] {
  return (
    Array.isArray(value) &&
    value.length <= maxItems &&
    value.every((item) => typeof item === "string" && SAFE_REF_PATTERN.test(item)) &&
    new Set(value).size === value.length
  );
}

function isPriorResultContext(value: unknown): value is DemoPriorResultContext {
  if (
    !isRecord(value) ||
    !hasExactFields(value, PRIOR_RESULT_CONTEXT_FIELDS) ||
    typeof value.client_brain_id !== "string" ||
    !SAFE_ID_PATTERN.test(value.client_brain_id) ||
    typeof value.capability_id !== "string" ||
    !SAFE_ID_PATTERN.test(value.capability_id) ||
    !isSafeIdArray(value.metric_ids, MAX_CONTEXT_IDS) ||
    !isSafeIdArray(value.dimension_ids, MAX_CONTEXT_IDS) ||
    !isSafeRefArray(value.entity_refs, MAX_CONTEXT_ENTITY_REFS) ||
    !isSafeRefArray(value.result_refs, MAX_CONTEXT_RESULT_REFS) ||
    value.result_refs.length !== 1 ||
    value.result_refs[0] !==
      `result:${value.client_brain_id}:${value.capability_id}`
  ) {
    return false;
  }

  if (
    value.selected_entity_ref !== null &&
    (typeof value.selected_entity_ref !== "string" ||
      !SAFE_REF_PATTERN.test(value.selected_entity_ref) ||
      !value.entity_refs.includes(value.selected_entity_ref))
  ) {
    return false;
  }

  if (value.entity_refs.length > 0 && value.dimension_ids.length === 0) {
    return false;
  }

  const periodValid =
    (value.period_start === null && value.period_end === null) ||
    (isIsoDate(value.period_start) &&
      isIsoDate(value.period_end) &&
      value.period_end >= value.period_start);
  const comparisonPeriodValid =
    (value.comparison_period_start === null && value.comparison_period_end === null) ||
    (isIsoDate(value.comparison_period_start) &&
      isIsoDate(value.comparison_period_end) &&
      value.comparison_period_end >= value.comparison_period_start);
  const analysisValid =
    value.analysis_mode === null ||
    (typeof value.analysis_mode === "string" && ANALYSIS_MODES.has(value.analysis_mode));
  const comparisonValid =
    value.comparison_mode === null ||
    (typeof value.comparison_mode === "string" && COMPARISON_MODES.has(value.comparison_mode));
  const roleValid =
    value.role === null ||
    (typeof value.role === "string" && PRESENTATION_ROLES.has(value.role));

  return Boolean(
    periodValid &&
    comparisonPeriodValid &&
    analysisValid &&
    comparisonValid &&
    roleValid &&
    !((value.comparison_mode === "previous_period" ||
      value.comparison_mode === "explicit_period") &&
      value.comparison_period_start === null) &&
    !(value.comparison_mode === null && value.comparison_period_start !== null)
  );
}

function isConversationChart(value: unknown): value is DemoConversationChart {
  if (
    !isRecord(value) ||
    !hasExactFields(value, CHART_FIELDS) ||
    value.chart_type !== "bar" ||
    value.metric_id !== "revenue" ||
    value.unit !== "RON" ||
    !Array.isArray(value.points) ||
    value.points.length < 2 ||
    value.points.length > MAX_CHART_POINTS
  ) {
    return false;
  }

  return value.points.every(
    (point) =>
      isRecord(point) &&
      hasExactFields(point, CHART_POINT_FIELDS) &&
      isBoundedText(point.label, MAX_CHART_LABEL_CHARACTERS) &&
      typeof point.value === "number" &&
      Number.isFinite(point.value) &&
      point.value >= 0,
  );
}

function isPresentation(value: unknown): value is DemoConversationPresentation {
  if (
    !isRecord(value) ||
    !(
      hasExactFields(value, PRESENTATION_FIELDS) ||
      hasExactFields(value, LEGACY_PRESENTATION_FIELDS)
    ) ||
    (value.action !== "answer" && value.action !== "clarification") ||
    !isBoundedText(value.headline, DEMO_MESSAGE_MAX_CHARACTERS) ||
    !isBoundedText(value.summary, MAX_SUMMARY_CHARACTERS) ||
    !isBoundedText(value.disclaimer, MAX_DISCLAIMER_CHARACTERS) ||
    !Array.isArray(value.kpis) ||
    value.kpis.length > MAX_KPIS ||
    !Array.isArray(value.provenance) ||
    value.provenance.length > MAX_PROVENANCE_ITEMS
  ) {
    return false;
  }

  if (
    !value.kpis.every(
      (kpi) =>
        isRecord(kpi) &&
        hasExactFields(kpi, KPI_FIELDS) &&
        isBoundedText(kpi.label, DEMO_MESSAGE_MAX_CHARACTERS) &&
        isBoundedText(kpi.value, DEMO_MESSAGE_MAX_CHARACTERS),
    )
  ) {
    return false;
  }

  if (
    "chart" in value &&
    !(value.chart === null || isConversationChart(value.chart))
  ) {
    return false;
  }

  return value.provenance.every((item) =>
    isBoundedText(item, DEMO_MESSAGE_MAX_CHARACTERS),
  );
}

function isMessage(value: unknown): value is DemoConversationMessage {
  if (!isRecord(value)) return false;

  if (value.role === "user") {
    return (
      hasExactFields(value, USER_MESSAGE_FIELDS) &&
      isBoundedText(value.content, DEMO_MESSAGE_MAX_CHARACTERS)
    );
  }

  if (value.role !== "assistant" || !hasExactFields(value, ASSISTANT_MESSAGE_FIELDS)) {
    return false;
  }

  return (
    isBoundedText(value.content, DEMO_MESSAGE_MAX_CHARACTERS) &&
    isPresentation(value.presentation) &&
    (value.priorResultContext === null ||
      isPriorResultContext(value.priorResultContext))
  );
}

function copyV2Checkpoint(
  checkpoint: V2ConversationCheckpoint | null,
): V2ConversationCheckpoint | null {
  if (checkpoint === null) return null;
  return JSON.parse(JSON.stringify(checkpoint)) as V2ConversationCheckpoint;
}

function copyMessage(message: DemoConversationMessage): DemoConversationMessage {
  if (message.role === "user") {
    return { role: "user", content: message.content };
  }

  return {
    role: "assistant",
    content: message.content,
    presentation: {
      ...message.presentation!,
      kpis: message.presentation!.kpis.map((kpi) => ({ ...kpi })),
      provenance: [...message.presentation!.provenance],
      ...(message.presentation!.chart === undefined
        ? {}
        : {
            chart: message.presentation!.chart
              ? {
                  ...message.presentation!.chart,
                  points: message.presentation!.chart.points.map((point) => ({ ...point })),
                }
              : null,
          }),
    },
    priorResultContext: message.priorResultContext
      ? {
          ...message.priorResultContext,
          metric_ids: [...message.priorResultContext.metric_ids],
          dimension_ids: [...message.priorResultContext.dimension_ids],
          entity_refs: [...message.priorResultContext.entity_refs],
          result_refs: [...message.priorResultContext.result_refs],
        }
      : null,
  };
}

export function createEmptyDemoSession(
  locale: DemoConversationLocale = "en",
): DemoConversationSession {
  return {
    conversationId: null,
    history: [],
    locale,
    v2Checkpoint: null,
  };
}

export function isDemoSessionReadyForSubmission(
  sessionRestored: boolean,
  loading: boolean,
): boolean {
  return sessionRestored && !loading;
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
    value.history.length > DEMO_TRANSCRIPT_MAX_MESSAGES ||
    !value.history.every(isMessage)
  ) {
    return null;
  }
  if (
    value.v2Checkpoint !== null &&
    !isV2ConversationCheckpoint(value.v2Checkpoint)
  ) {
    return null;
  }
  if (
    value.v2Checkpoint !== null &&
    value.conversationId !== null &&
    value.v2Checkpoint.session_id !== value.conversationId
  ) {
    return null;
  }
  return {
    conversationId: value.conversationId,
    history: value.history.map(copyMessage),
    locale: value.locale,
    v2Checkpoint: copyV2Checkpoint(value.v2Checkpoint),
  };
}

function hasTypedEntityAnchor(message: DemoConversationMessage): boolean {
  return (
    message.role === "assistant" &&
    message.priorResultContext?.selected_entity_ref !== null &&
    message.priorResultContext?.selected_entity_ref !== undefined &&
    message.priorResultContext.entity_refs.length === 1
  );
}

export function buildBoundedHistory(
  messages: readonly DemoConversationMessage[],
  maxMessages = DEMO_TRANSCRIPT_MAX_MESSAGES,
): DemoConversationMessage[] {
  if (!messages.every(isMessage)) {
    throw new TypeError("Conversation history contains an invalid message.");
  }

  if (!Number.isInteger(maxMessages) || maxMessages < 2) {
    throw new RangeError("Conversation history bound must be at least two messages.");
  }

  if (messages.length <= maxMessages) {
    return messages.map(copyMessage);
  }

  const tailStart = messages.length - maxMessages;
  let anchorAssistantIndex = -1;
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (hasTypedEntityAnchor(messages[index])) {
      anchorAssistantIndex = index;
      break;
    }
  }

  // If the newest typed entity anchor already survives in the normal tail,
  // keep the existing chronological last-N behavior unchanged.
  if (anchorAssistantIndex < 0 || anchorAssistantIndex >= tailStart) {
    return messages
      .slice(-maxMessages)
      .map(copyMessage);
  }

  const anchorStart =
    anchorAssistantIndex > 0 && messages[anchorAssistantIndex - 1].role === "user"
      ? anchorAssistantIndex - 1
      : anchorAssistantIndex;
  const anchor = messages.slice(anchorStart, anchorAssistantIndex + 1);
  const tailSlots = maxMessages - anchor.length;
  const tail = messages.slice(-tailSlots);

  return [...anchor, ...tail].map(copyMessage);
}

export function appendConversationTurn(
  session: DemoConversationSession,
  userContent: string,
  assistant: DemoAssistantTurnInput,
): DemoConversationSession {
  const additions: DemoConversationMessage[] = [
    { role: "user", content: userContent },
    {
      role: "assistant",
      content: assistant.content,
      presentation: {
        ...assistant.presentation,
        kpis: assistant.presentation.kpis.map((kpi) => ({ ...kpi })),
        provenance: [...assistant.presentation.provenance],
      },
      priorResultContext: assistant.priorResultContext ?? null,
    },
  ];
  if (!additions.every(isMessage)) {
    throw new RangeError("Conversation messages contain invalid or oversized safe data.");
  }
  return {
    ...session,
    history: buildBoundedHistory([...session.history, ...additions]),
  };
}

export function setV2ConversationCheckpoint(
  session: DemoConversationSession,
  checkpoint: V2ConversationCheckpoint | null,
): DemoConversationSession {
  if (checkpoint !== null && !isV2ConversationCheckpoint(checkpoint)) {
    throw new TypeError("Invalid V2 conversation checkpoint.");
  }
  if (
    checkpoint !== null &&
    session.conversationId !== null &&
    checkpoint.session_id !== session.conversationId
  ) {
    throw new TypeError(
      "V2 checkpoint session does not match the demo conversation ID.",
    );
  }
  return {
    ...session,
    v2Checkpoint: copyV2Checkpoint(checkpoint),
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
  assistant: DemoAssistantTurnInput,
): DemoConversationSession {
  return appendConversationTurn(
    setDemoConversationId(session, conversationId),
    userContent,
    assistant,
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