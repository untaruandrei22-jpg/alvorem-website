export const DEMO_CHAT_UPSTREAM_PATH = "/v1/demo/chat";
export const DEMO_CHAT_INVALID_RESPONSE_ERROR =
  "The demo returned an invalid response.";

export const DEMO_CHAT_LOCALES = ["en", "ro"] as const;
export type DemoChatLocale = (typeof DEMO_CHAT_LOCALES)[number];
export const DEMO_CHAT_RETAIL_PROMPTS: Record<
  DemoChatLocale,
  readonly string[]
> = {
  en: [
    "How are stores performing this month?",
    "Which stores are furthest below target?",
    "What needs my attention today?",
  ],
  ro: [
    "Cum stăm cu vânzările luna asta?",
    "Care magazine sunt cel mai mult sub țintă?",
    "Unde avem probleme cu stocul?",
  ],
};

export const DEMO_CHAT_APPROVED_CAPABILITIES = [
  "performance_summary",
  "target_variance",
  "ranking",
  "trend",
  "margin_analysis",
  "inventory_risk",
] as const;

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

export type DemoChatHistoryMessage = {
  role: "user" | "assistant";
  content: string;
  prior_result_context?: DemoPriorResultContext | null;
};

export type DemoChatBrowserRequest = {
  industry: string;
  message: string;
  conversation_id: string | null;
  locale: DemoChatLocale;
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
  prior_result_context: DemoPriorResultContext | null;
};

export type DemoChatGatewayResult =
  | { status: 200; body: DemoChatPresentationResponse }
  | { status: 502; body: { error: typeof DEMO_CHAT_INVALID_RESPONSE_ERROR } };

type JsonRecord = Record<string, unknown>;

const REQUEST_FIELDS = new Set([
  "industry",
  "message",
  "conversation_id",
  "locale",
  "history",
]);
const APPROVED_LOCALES = new Set<string>(DEMO_CHAT_LOCALES);
const USER_HISTORY_MESSAGE_FIELDS = new Set(["role", "content"]);
const ASSISTANT_HISTORY_MESSAGE_FIELDS = new Set([
  "role",
  "content",
  "prior_result_context",
]);
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
const CONVERSATION_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;
const APPROVED_CAPABILITIES = new Set<string>(DEMO_CHAT_APPROVED_CAPABILITIES);
const SAFE_ID_PATTERN = /^[a-z][a-z0-9_]{0,63}$/;
const SAFE_REF_PATTERN = /^[a-z][a-z0-9_]{0,31}:[A-Za-z0-9][A-Za-z0-9_.:/-]{0,127}$/;
const ANALYSIS_MODES = new Set([
  "performance", "trend", "rank", "compare", "investigate", "explain",
]);
const COMPARISON_MODES = new Set(["target", "previous_period", "explicit_period"]);
const PRESENTATION_ROLES = new Set(["manager", "product_owner", "analyst", "executive"]);
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
const MAX_CONTEXT_IDS = 4;
const MAX_CONTEXT_ENTITY_REFS = 4;
const MAX_CONTEXT_RESULT_REFS = 4;
const MAX_CONTEXT_REF_CHARACTERS = 160;
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

function parseUniqueSafeStringArray(
  value: unknown,
  maxItems: number,
  pattern: RegExp,
  maxCharacters: number,
): string[] | null {
  if (
    !Array.isArray(value) ||
    value.length > maxItems ||
    !value.every(
      (item) =>
        typeof item === "string" &&
        item.length <= maxCharacters &&
        pattern.test(item),
    ) ||
    new Set(value).size !== value.length
  ) {
    return null;
  }
  return [...value];
}

function parsePriorResultContext(
  value: unknown,
): DemoPriorResultContext | null | undefined {
  if (value === undefined || value === null) return null;
  if (!isRecord(value) || !hasExactFields(value, PRIOR_RESULT_CONTEXT_FIELDS)) {
    return undefined;
  }
  if (
    typeof value.client_brain_id !== "string" ||
    !SAFE_ID_PATTERN.test(value.client_brain_id) ||
    typeof value.capability_id !== "string" ||
    !APPROVED_CAPABILITIES.has(value.capability_id)
  ) {
    return undefined;
  }

  const metricIds = parseUniqueSafeStringArray(
    value.metric_ids,
    MAX_CONTEXT_IDS,
    SAFE_ID_PATTERN,
    64,
  );
  const dimensionIds = parseUniqueSafeStringArray(
    value.dimension_ids,
    MAX_CONTEXT_IDS,
    SAFE_ID_PATTERN,
    64,
  );
  const entityRefs = parseUniqueSafeStringArray(
    value.entity_refs,
    MAX_CONTEXT_ENTITY_REFS,
    SAFE_REF_PATTERN,
    MAX_CONTEXT_REF_CHARACTERS,
  );
  const resultRefs = parseUniqueSafeStringArray(
    value.result_refs,
    MAX_CONTEXT_RESULT_REFS,
    SAFE_REF_PATTERN,
    MAX_CONTEXT_REF_CHARACTERS,
  );
  if (
    metricIds === null ||
    dimensionIds === null ||
    entityRefs === null ||
    resultRefs === null ||
    resultRefs.length !== 1 ||
    resultRefs[0] !== `result:${value.client_brain_id}:${value.capability_id}`
  ) {
    return undefined;
  }

  const selected =
    value.selected_entity_ref === null
      ? null
      : typeof value.selected_entity_ref === "string" &&
          value.selected_entity_ref.length <= MAX_CONTEXT_REF_CHARACTERS &&
          SAFE_REF_PATTERN.test(value.selected_entity_ref) &&
          entityRefs.includes(value.selected_entity_ref)
        ? value.selected_entity_ref
        : undefined;
  if (selected === undefined || (entityRefs.length > 0 && dimensionIds.length === 0)) {
    return undefined;
  }

  const analysisMode = value.analysis_mode === null
    ? null
    : typeof value.analysis_mode === "string" && ANALYSIS_MODES.has(value.analysis_mode)
      ? value.analysis_mode as DemoPriorResultContext["analysis_mode"]
      : undefined;
  const comparisonMode = value.comparison_mode === null
    ? null
    : typeof value.comparison_mode === "string" && COMPARISON_MODES.has(value.comparison_mode)
      ? value.comparison_mode as DemoPriorResultContext["comparison_mode"]
      : undefined;
  const role = value.role === null
    ? null
    : typeof value.role === "string" && PRESENTATION_ROLES.has(value.role)
      ? value.role as DemoPriorResultContext["role"]
      : undefined;
  const periodStart = value.period_start === null
    ? null
    : isIsoDate(value.period_start) ? value.period_start : undefined;
  const periodEnd = value.period_end === null
    ? null
    : isIsoDate(value.period_end) ? value.period_end : undefined;
  const comparisonPeriodStart = value.comparison_period_start === null
    ? null
    : isIsoDate(value.comparison_period_start) ? value.comparison_period_start : undefined;
  const comparisonPeriodEnd = value.comparison_period_end === null
    ? null
    : isIsoDate(value.comparison_period_end) ? value.comparison_period_end : undefined;
  if (
    analysisMode === undefined || comparisonMode === undefined || role === undefined ||
    periodStart === undefined || periodEnd === undefined ||
    comparisonPeriodStart === undefined || comparisonPeriodEnd === undefined ||
    (periodStart === null) !== (periodEnd === null) ||
    (comparisonPeriodStart === null) !== (comparisonPeriodEnd === null) ||
    (periodStart !== null && periodEnd !== null && periodEnd < periodStart) ||
    (comparisonPeriodStart !== null && comparisonPeriodEnd !== null && comparisonPeriodEnd < comparisonPeriodStart) ||
    ((comparisonMode === "previous_period" || comparisonMode === "explicit_period") && comparisonPeriodStart === null) ||
    (comparisonMode === null && comparisonPeriodStart !== null)
  ) {
    return undefined;
  }

  return {
    client_brain_id: value.client_brain_id,
    capability_id: value.capability_id,
    metric_ids: metricIds,
    dimension_ids: dimensionIds,
    selected_entity_ref: selected,
    entity_refs: entityRefs,
    result_refs: resultRefs,
    analysis_mode: analysisMode,
    period_start: periodStart,
    period_end: periodEnd,
    comparison_mode: comparisonMode,
    comparison_period_start: comparisonPeriodStart,
    comparison_period_end: comparisonPeriodEnd,
    role,
  };
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
    typeof payload.locale !== "string" ||
    !APPROVED_LOCALES.has(payload.locale)
  ) {
    return { ok: false, reason: "invalid_request" };
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
      (message.role !== "user" && message.role !== "assistant") ||
      !isBoundedText(message.content, limits.messageCharacters)
    ) {
      return { ok: false, reason: "invalid_history" };
    }

    if (message.role === "user") {
      if (!hasExactFields(message, USER_HISTORY_MESSAGE_FIELDS)) {
        return { ok: false, reason: "invalid_history" };
      }
      history.push({
        role: "user",
        content: message.content.trim(),
      });
      continue;
    }

    const hasContextField = Object.hasOwn(message, "prior_result_context");
    const validShape =
      hasExactFields(message, USER_HISTORY_MESSAGE_FIELDS) ||
      hasExactFields(message, ASSISTANT_HISTORY_MESSAGE_FIELDS);
    if (!validShape) {
      return { ok: false, reason: "invalid_history" };
    }
    const context = hasContextField
      ? parsePriorResultContext(message.prior_result_context)
      : null;
    if (context === undefined) {
      return { ok: false, reason: "invalid_history" };
    }
    history.push({
      role: "assistant",
      content: message.content.trim(),
      ...(hasContextField ? { prior_result_context: context } : {}),
    });
  }

  return {
    ok: true,
    value: {
      industry: payload.industry,
      message: payload.message.trim(),
      conversation_id: payload.conversation_id,
      locale: payload.locale as DemoChatLocale,
      history,
    },
  };
}

export function buildDemoChatBrowserRequest(input: {
  industry: string;
  message: string;
  conversationId: string | null;
  locale: DemoChatLocale;
  history: readonly {
    role: "user" | "assistant";
    content: string;
    priorResultContext?: DemoPriorResultContext | null;
  }[];
}): DemoChatBrowserRequest {
  return {
    industry: input.industry,
    message: input.message,
    conversation_id: input.conversationId,
    locale: input.locale,
    history: input.history.map((message) => (
      message.role === "assistant"
        ? {
            role: "assistant",
            content: message.content,
            prior_result_context: message.priorResultContext ?? null,
          }
        : { role: "user", content: message.content }
    )),
  };
}

export function buildDemoChatUpstreamRequest(request: DemoChatBrowserRequest) {
  return {
    ...request,
    history: request.history.map((message) => ({ ...message })),
  };
}

export function calculateDemoChatMaxRequestBytes(limits: DemoChatRequestLimits) {
  const boundedStringCharacters =
    limits.messageCharacters * (limits.historyMessages + 1) +
    limits.conversationIdCharacters +
    MAX_INDUSTRY_CHARACTERS;

  const assistantContextCount = Math.ceil(limits.historyMessages / 2);
  const boundedContextCharacters =
    assistantContextCount *
    (
      (MAX_CONTEXT_IDS * 2 * 64) +
      ((MAX_CONTEXT_ENTITY_REFS + MAX_CONTEXT_RESULT_REFS + 1) *
        MAX_CONTEXT_REF_CHARACTERS) +
      256
    );

  return (
    (boundedStringCharacters + boundedContextCharacters) *
      JSON_MAX_BYTES_PER_CHARACTER +
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
  const priorResultContext = parsePriorResultContext(
    payload.prior_result_context,
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
    priorResultContext === undefined ||
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

  if (
    priorResultContext !== null &&
    (
      !capabilitySet.has(priorResultContext.capability_id) ||
      priorResultContext.result_refs[0] !==
        `result:${priorResultContext.client_brain_id}:${priorResultContext.capability_id}`
    )
  ) {
    return invalidGatewayResult();
  }

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
      prior_result_context: priorResultContext,
    },
  };
}
