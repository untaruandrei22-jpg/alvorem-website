import {
  isV2ConversationCheckpoint,
  type V2ConversationCheckpoint,
} from "./alvo-demo-v2-checkpoint.ts";

export const STAGING_BUSINESS_GPT_V2_PATH =
  "/v1/demo/staging/business-gpt-v2-chat";

export type V2GatewayRequest = {
  message: string;
  locale: "en" | "ro";
  checkpoint: V2ConversationCheckpoint | null;
};

export type V2GatewayPresentationResponse = {
  conversation_id: string;
  industry: "retail";
  industry_display_name: "Retail";
  action: "answer" | "clarification";
  question: string;
  capability: null;
  data_month: null;
  headline: string;
  summary: string;
  kpis: [];
  details: [];
  provenance: string[];
  disclaimer: string;
  suggested_prompts: string[];
  prior_result_context: null;
  v2_checkpoint: V2ConversationCheckpoint;
  runtime_version: "v2";
};

type JsonRecord = Record<string, unknown>;

const RESPONSE_FIELDS = new Set([
  "session_id",
  "action",
  "response_mode",
  "text",
  "execution_status",
  "checkpoint",
  "synthetic_only",
]);
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
const SESSION_ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;
const MAX_RESPONSE_TEXT_CHARACTERS = 2_000;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactFields(value: JsonRecord, allowed: ReadonlySet<string>) {
  const keys = Object.keys(value);
  return keys.length === allowed.size && keys.every((key) => allowed.has(key));
}

export function buildV2GatewayRequest(input: {
  message: string;
  locale: "en" | "ro";
  checkpoint: V2ConversationCheckpoint | null;
}): V2GatewayRequest {
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

export function normalizeV2GatewayResponse(
  payload: unknown,
  expected: {
    message: string;
    conversationId: string | null;
  },
): V2GatewayPresentationResponse | null {
  if (
    !isRecord(payload) ||
    !exactFields(payload, RESPONSE_FIELDS) ||
    typeof payload.session_id !== "string" ||
    !SESSION_ID.test(payload.session_id) ||
    typeof payload.action !== "string" ||
    !ACTIONS.has(payload.action) ||
    typeof payload.response_mode !== "string" ||
    !RESPONSE_MODES.has(payload.response_mode) ||
    typeof payload.text !== "string" ||
    payload.text.trim().length === 0 ||
    payload.text.length > MAX_RESPONSE_TEXT_CHARACTERS ||
    !(
      payload.execution_status === null ||
      (
        typeof payload.execution_status === "string" &&
        EXECUTION_STATUSES.has(payload.execution_status)
      )
    ) ||
    payload.synthetic_only !== true ||
    !isV2ConversationCheckpoint(payload.checkpoint) ||
    payload.checkpoint.session_id !== payload.session_id ||
    (
      expected.conversationId !== null &&
      payload.session_id !== expected.conversationId
    )
  ) {
    return null;
  }

  const isAnswer = payload.action === "answer";
  const isReset = payload.action === "reset";
  const isConversational = payload.response_mode === "conversational";
  const action = isAnswer ? "answer" : "clarification";
  const text = payload.text.trim();

  return {
    conversation_id: payload.session_id,
    industry: "retail",
    industry_display_name: "Retail",
    action,
    question: expected.message,
    capability: null,
    data_month: null,
    headline: isReset ? "ALVO V2 · Reset" : "ALVO V2",
    summary: text,
    kpis: [],
    details: [],
    provenance:
      isAnswer && !isConversational ? ["synthetic:v2_verified"] : [],
    disclaimer: "Synthetic V2 staging canary — no real company data.",
    suggested_prompts: [],
    prior_result_context: null,
    v2_checkpoint: payload.checkpoint,
    runtime_version: "v2",
  };
}