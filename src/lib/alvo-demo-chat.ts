export const DEMO_CHAT_UPSTREAM_PATH = "/v1/demo/chat";
export const DEMO_CHAT_UPSTREAM_LOCALE = "en" as const;
export const DEMO_CHAT_INVALID_RESPONSE_ERROR =
  "The demo returned an invalid response.";

export const DEMO_CHAT_APPROVED_CAPABILITIES = [
  "performance_summary",
  "target_variance",
  "ranking",
  "trend",
  "margin_analysis",
  "inventory_risk",
] as const;

export type DemoChatHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export type DemoChatBrowserRequest = {
  industry: string;
  message: string;
  conversation_id: string | null;
  history: DemoChatHistoryMessage[];
};

export type DemoChatRequestLimits = {
  messageCharacters: number;
  historyMessages: number;
  conversationIdCharacters: number;
};

export type DemoChatRequestValidationReason =
  | "invalid_request"
  | "invalid_industry"
  | "invalid_message"
  | "invalid_conversation_id"
  | "invalid_history";

export type DemoChatRequestValidation =
  | { ok: true; value: DemoChatBrowserRequest }
  | { ok: false; reason: DemoChatRequestValidationReason };

export type DemoChatPresentationResponse = {
  conversation_id: string;
  industry: string;
  industry_display_name: string;
  action: "answer" | "clarification";
  question: string;
  capability: string | null;
  data_month: string | null;
  headline: string;
  summary: string;
  kpis: { label: string; value: string }[];
  details: string[];
  provenance: string[];
  disclaimer: string;
  suggested_prompts: string[];
};

export type DemoChatGatewayResult =
  | { status: 200; body: DemoChatPresentationResponse }
  | { status: 502; body: { error: typeof DEMO_CHAT_INVALID_RESPONSE_ERROR } };

type JsonRecord = Record<string, unknown>;

const REQUEST_FIELDS = new Set([
  "industry",
  "message",
  "conversation_id",
  "history",
]);
const HISTORY_MESSAGE_FIELDS = new Set(["role", "content"]);
const CONVERSATION_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;
const APPROVED_CAPABILITIES = new Set<string>(DEMO_CHAT_APPROVED_CAPABILITIES);
const REQUIRED_VERIFICATION_CHECKS = [
  "synthetic_only_contract",
  "approved_capability_scope",
  "supported_answer_content",
] as const;

const MAX_INDUSTRY_CHARACTERS = 64;
const MAX_DISPLAY_NAME_CHARACTERS = 160;
const MAX_HEADLINE_CHARACTERS = 500;
const MAX_SUMMARY_CHARACTERS = 2_000;
const MAX_DETAIL_CHARACTERS = 1_000;
const MAX_DISCLAIMER_CHARACTERS = 500;
const MAX_ARRAY_ITEMS = 24;
const MAX_KPIS = 24;
const MAX_PROVENANCE_ITEMS = 12;
const MAX_CAPABILITIES = DEMO_CHAT_APPROVED_CAPABILITIES.length;
const JSON_MAX_BYTES_PER_CHARACTER = 6;
const JSON_ENVELOPE_BYTES = 1_024;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactFields(value: JsonRecord, allowed: Set<string>) {
  const keys = Object.keys(value);
  return keys.length === allowed.size && keys.every((key) => allowed.has(key));
}

function isBoundedText(value: unknown, maxCharacters: number): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxCharacters
  );
}

function parseStringArray(
  value: unknown,
  maxItems: number,
  maxCharacters: number,
): string[] | null {
  if (
    !Array.isArray(value) ||
    value.length > maxItems ||
    !value.every((item) => isBoundedText(item, maxCharacters))
  ) {
    return null;
  }
  return value.map((item) => item.trim());
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

export function isDemoConversationId(
  value: unknown,
  maxCharacters: number,
): value is string {
  return (
    typeof value === "string" &&
    value.length <= maxCharacters &&
    CONVERSATION_ID_PATTERN.test(value)
  );
}

export function validateDemoChatRequest(
  payload: unknown,
  supportedIndustries: ReadonlySet<string>,
  limits: DemoChatRequestLimits,
): DemoChatRequestValidation {
  if (!isRecord(payload) || !hasExactFields(payload, REQUEST_FIELDS)) {
    return { ok: false, reason: "invalid_request" };
  }

  if (
    typeof payload.industry !== "string" ||
    !supportedIndustries.has(payload.industry)
  ) {
    return { ok: false, reason: "invalid_industry" };
  }

  if (!isBoundedText(payload.message, limits.messageCharacters)) {
    return { ok: false, reason: "invalid_message" };
  }

  if (
    payload.conversation_id !== null &&
    !isDemoConversationId(
      payload.conversation_id,
      limits.conversationIdCharacters,
    )
  ) {
    return { ok: false, reason: "invalid_conversation_id" };
  }

  if (
    !Array.isArray(payload.history) ||
    payload.history.length > limits.historyMessages
  ) {
    return { ok: false, reason: "invalid_history" };
  }

  const history: DemoChatHistoryMessage[] = [];
  for (const message of payload.history) {
    if (
      !isRecord(message) ||
      !hasExactFields(message, HISTORY_MESSAGE_FIELDS) ||
      (message.role !== "user" && message.role !== "assistant") ||
      !isBoundedText(message.content, limits.messageCharacters)
    ) {
      return { ok: false, reason: "invalid_history" };
    }
    history.push({
      role: message.role,
      content: message.content.trim(),
    });
  }

  return {
    ok: true,
    value: {
      industry: payload.industry,
      message: payload.message.trim(),
      conversation_id: payload.conversation_id,
      history,
    },
  };
}

export function buildDemoChatBrowserRequest(input: {
  industry: string;
  message: string;
  conversationId: string | null;
  history: readonly DemoChatHistoryMessage[];
}): DemoChatBrowserRequest {
  return {
    industry: input.industry,
    message: input.message,
    conversation_id: input.conversationId,
    history: input.history.map((message) => ({ ...message })),
  };
}

export function buildDemoChatUpstreamRequest(request: DemoChatBrowserRequest) {
  return {
    ...request,
    locale: DEMO_CHAT_UPSTREAM_LOCALE,
    history: request.history.map((message) => ({ ...message })),
  };
}

export function calculateDemoChatMaxRequestBytes(limits: DemoChatRequestLimits) {
  const boundedStringCharacters =
    limits.messageCharacters * (limits.historyMessages + 1) +
    limits.conversationIdCharacters +
    MAX_INDUSTRY_CHARACTERS;

  return (
    boundedStringCharacters * JSON_MAX_BYTES_PER_CHARACTER +
    JSON_ENVELOPE_BYTES
  );
}

function parseCapabilities(value: unknown): string[] | null {
  if (
    !Array.isArray(value) ||
    value.length > MAX_CAPABILITIES ||
    !value.every(
      (capability) =>
        typeof capability === "string" &&
        APPROVED_CAPABILITIES.has(capability),
    ) ||
    new Set(value).size !== value.length
  ) {
    return null;
  }
  return [...value];
}

function parseKpis(
  value: unknown,
  capabilities: ReadonlySet<string>,
): { label: string; value: string }[] | null {
  if (!Array.isArray(value) || value.length > MAX_KPIS) return null;

  const kpis: { label: string; value: string }[] = [];
  for (const kpi of value) {
    if (
      !isRecord(kpi) ||
      !isBoundedText(kpi.label, MAX_HEADLINE_CHARACTERS) ||
      !isBoundedText(kpi.value, MAX_HEADLINE_CHARACTERS) ||
      typeof kpi.source_capability !== "string" ||
      !APPROVED_CAPABILITIES.has(kpi.source_capability) ||
      !capabilities.has(kpi.source_capability)
    ) {
      return null;
    }
    kpis.push({
      label: kpi.label.trim(),
      value: kpi.value.trim(),
    });
  }
  return kpis;
}

function invalidGatewayResult(): DemoChatGatewayResult {
  return {
    status: 502,
    body: { error: DEMO_CHAT_INVALID_RESPONSE_ERROR },
  };
}

export function normalizeDemoChatGatewayResponse(
  payload: unknown,
  expected: {
    industry: string;
    message: string;
    conversationId: string | null;
    conversationIdCharacters: number;
  },
): DemoChatGatewayResult {
  if (
    !isRecord(payload) ||
    payload.synthetic_only !== true ||
    payload.handled_by !== "alvo" ||
    !isDemoConversationId(
      payload.conversation_id,
      expected.conversationIdCharacters,
    ) ||
    (expected.conversationId !== null &&
      payload.conversation_id !== expected.conversationId) ||
    !isRecord(payload.answer) ||
    !isRecord(payload.verification)
  ) {
    return invalidGatewayResult();
  }

  const answer = payload.answer;
  const capabilities = parseCapabilities(payload.capabilities_used);
  const provenance = parseStringArray(
    payload.provenance,
    MAX_PROVENANCE_ITEMS,
    MAX_HEADLINE_CHARACTERS,
  );
  const details = parseStringArray(
    answer.details,
    MAX_ARRAY_ITEMS,
    MAX_DETAIL_CHARACTERS,
  );
  const suggestedPrompts = parseStringArray(
    answer.suggested_prompts,
    MAX_ARRAY_ITEMS,
    MAX_HEADLINE_CHARACTERS,
  );
  const checks = parseStringArray(
    payload.verification.checks,
    MAX_ARRAY_ITEMS,
    MAX_HEADLINE_CHARACTERS,
  );

  if (
    capabilities === null ||
    provenance === null ||
    details === null ||
    suggestedPrompts === null ||
    checks === null ||
    payload.verification.status !== "passed" ||
    !REQUIRED_VERIFICATION_CHECKS.every((check) => checks.includes(check)) ||
    !isBoundedText(answer.industry_display_name, MAX_DISPLAY_NAME_CHARACTERS) ||
    answer.industry !== expected.industry ||
    answer.question !== expected.message ||
    (answer.action !== "answer" && answer.action !== "clarification") ||
    !(answer.data_month === null || isIsoDate(answer.data_month)) ||
    !isBoundedText(answer.headline, MAX_HEADLINE_CHARACTERS) ||
    !isBoundedText(answer.summary, MAX_SUMMARY_CHARACTERS) ||
    !isBoundedText(payload.disclaimer, MAX_DISCLAIMER_CHARACTERS)
  ) {
    return invalidGatewayResult();
  }

  const capabilitySet = new Set(capabilities);
  const kpis = parseKpis(answer.kpis, capabilitySet);
  if (kpis === null) return invalidGatewayResult();

  const hasCapabilityEvidence = capabilities.length > 0;
  const hasExpectedVerification = checks.includes(
    hasCapabilityEvidence ? "synthetic_provenance" : "safe_clarification",
  );
  const hasOnlySyntheticProvenance = provenance.every((source) =>
    source.startsWith("synthetic:"),
  );
  const answerContractMatches =
    (answer.action === "answer" &&
      hasCapabilityEvidence &&
      provenance.length > 0) ||
    (answer.action === "clarification" &&
      !hasCapabilityEvidence &&
      provenance.length === 0 &&
      kpis.length === 0);

  if (
    !hasExpectedVerification ||
    !hasOnlySyntheticProvenance ||
    !answerContractMatches
  ) {
    return invalidGatewayResult();
  }

  return {
    status: 200,
    body: {
      conversation_id: payload.conversation_id,
      industry: expected.industry,
      industry_display_name: answer.industry_display_name.trim(),
      action: answer.action,
      question: answer.question,
      capability: capabilities.length === 1 ? capabilities[0] : null,
      data_month: answer.data_month,
      headline: answer.headline.trim(),
      summary: answer.summary.trim(),
      kpis: kpis.slice(0, 8),
      details: details.slice(0, 8),
      provenance: provenance.slice(0, 12),
      disclaimer: payload.disclaimer.trim(),
      suggested_prompts: suggestedPrompts.slice(0, 6),
    },
  };
}
