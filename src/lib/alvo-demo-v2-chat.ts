import {
  isV2ConversationCheckpoint,
  type V2ConversationCheckpoint,
} from "./alvo-demo-v2-checkpoint.ts";

export const V2_STAGING_UPSTREAM_PATH =
  "/v1/demo/staging/business-gpt-v2-chat";

const MAX_V2_RESPONSE_TEXT = 2_000;
const MAX_HEADLINE = 500;
const ACTIONS = new Set(["answer", "clarification", "reset", "refusal"]);
const RESPONSE_MODES = new Set([
  "conversational",
  "natural_verified",
  "deterministic_fallback",
  "evidence_verified",
  "presentation_verified",
  "reset",
  "safety",
  "safe_error",
]);
const EXECUTION_STATUSES = new Set([
  "completed",
  "partial",
  "failed",
  "clarification_required",
  "unsupported",
]);

type JsonRecord = Record<string, unknown>;

export type V2StagingBrowserPresentation = {
  conversation_id: string;
  industry: "retail";
  industry_display_name: "Retail";
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
  prior_result_context: null;
  v2_checkpoint: V2ConversationCheckpoint;
};

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactFields(value: JsonRecord, fields: readonly string[]) {
  const keys = Object.keys(value);
  return keys.length === fields.length &&
    keys.every((key) => fields.includes(key));
}

export function buildV2StagingUpstreamRequest(input: {
  message: string;
  locale: "en" | "ro";
  checkpoint: V2ConversationCheckpoint | null;
}) {
  if (
    input.checkpoint !== null &&
    !isV2ConversationCheckpoint(input.checkpoint)
  ) {
    throw new TypeError("Invalid V2 checkpoint.");
  }
  return {
    message: input.message,
    locale: input.locale,
    checkpoint: input.checkpoint,
  };
}

export function normalizeV2StagingGatewayResponse(
  payload: unknown,
  expected: {
    message: string;
    locale: "en" | "ro";
    checkpoint: V2ConversationCheckpoint | null;
    suggestedPrompts: readonly string[];
  },
): V2StagingBrowserPresentation | null {
  if (
    !isRecord(payload) ||
    !exactFields(payload, [
      "session_id",
      "action",
      "response_mode",
      "text",
      "execution_status",
      "checkpoint",
      "synthetic_only",
    ]) ||
    payload.synthetic_only !== true ||
    typeof payload.session_id !== "string" ||
    typeof payload.action !== "string" ||
    !ACTIONS.has(payload.action) ||
    typeof payload.response_mode !== "string" ||
    !RESPONSE_MODES.has(payload.response_mode) ||
    typeof payload.text !== "string" ||
    payload.text.trim().length === 0 ||
    payload.text.length > MAX_V2_RESPONSE_TEXT ||
    !(
      payload.execution_status === null ||
      (typeof payload.execution_status === "string" &&
        EXECUTION_STATUSES.has(payload.execution_status))
    ) ||
    !isV2ConversationCheckpoint(payload.checkpoint)
  ) {
    return null;
  }

  const checkpoint = payload.checkpoint;
  if (checkpoint.session_id !== payload.session_id) return null;
  if (
    expected.checkpoint !== null &&
    checkpoint.session_id !== expected.checkpoint.session_id
  ) {
    return null;
  }
  if (
    expected.checkpoint !== null &&
    checkpoint.turn_count < expected.checkpoint.turn_count
  ) {
    return null;
  }

  const focused = checkpoint.focused_result_id === null
    ? null
    : checkpoint.verified_results.find(
        (result) => result.result_id === checkpoint.focused_result_id,
      ) ?? null;

  const lines = payload.text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const headline = (lines[0] ?? payload.text.trim()).slice(0, MAX_HEADLINE);
  const browserAction = payload.action === "answer"
    ? "answer"
    : "clarification";
  const hasVerifiedProvenance = browserAction === "answer" &&
    payload.response_mode !== "conversational";

  return {
    conversation_id: payload.session_id,
    industry: "retail",
    industry_display_name: "Retail",
    action: browserAction,
    question: expected.message,
    capability: focused?.capability_id ?? null,
    data_month:
      focused?.period?.grain === "month" ? focused.period.start : null,
    headline,
    summary: payload.text.trim(),
    kpis: [],
    details: [],
    provenance:
      hasVerifiedProvenance ? ["synthetic:business-gpt-v2"] : [],
    disclaimer: "Synthetic demo — no real company data.",
    suggested_prompts: [...expected.suggestedPrompts].slice(0, 6),
    prior_result_context: null,
    v2_checkpoint: checkpoint,
  };
}
