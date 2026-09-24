export const V2_CHECKPOINT_SCHEMA_VERSION = "2.0" as const;
export const V2_CHECKPOINT_MAX_BYTES = 8 * 1024;

const MAX_TOPIC_STACK = 8;
const MAX_VERIFIED_RESULTS = 16;
const MAX_TOPIC_REFS = 16;
const MAX_UNRESOLVED_REFERENCES = 8;
const MAX_REFERENCE_CANDIDATES = 16;

const IDENTIFIER = /^[a-z][a-z0-9_]{0,63}$/;
const OPAQUE_ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;
const ENTITY_ID = /^[A-Za-z0-9][A-Za-z0-9_]{0,63}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const OPERATIONS = new Set(["summarize", "analyze", "compare", "rank"]);
const TIME_GRAINS = new Set(["day", "week", "month", "quarter", "year"]);
const CLARIFICATION_KINDS = new Set([
  "ambiguous_reference",
  "missing_period",
  "missing_comparison_period",
  "missing_metric",
  "unsupported_capability",
  "other",
]);
const REFERENCE_KINDS = new Set([
  "metric",
  "dimension",
  "entity",
  "period",
  "topic",
  "result",
  "evidence",
]);

type JsonRecord = Record<string, unknown>;

export type V2CheckpointEntityRef = {
  entity_type_id: string;
  entity_id: string;
};

export type V2CheckpointPeriod = {
  grain: "day" | "week" | "month" | "quarter" | "year";
  start: string;
  end: string;
};

export type V2CheckpointTopic = {
  topic_id: string;
  operations: ("summarize" | "analyze" | "compare" | "rank")[];
  metric_ids: string[];
  dimension_ids: string[];
  entity_refs: V2CheckpointEntityRef[];
  period: V2CheckpointPeriod | null;
  comparison_period: V2CheckpointPeriod | null;
  verified_result_ids: string[];
};

export type V2CheckpointVerifiedResult = {
  result_id: string;
  task_id: string;
  capability_id: string;
  metric_ids: string[];
  dimension_ids: string[];
  entity_refs: V2CheckpointEntityRef[];
  period: V2CheckpointPeriod | null;
  evidence_bundle_id: string;
};

export type V2ConversationCheckpoint = {
  schema_version: typeof V2_CHECKPOINT_SCHEMA_VERSION;
  client_brain_id: string;
  session_id: string;
  turn_count: number;
  topics: V2CheckpointTopic[];
  verified_results: V2CheckpointVerifiedResult[];
  focused_result_id: string | null;
  pending_clarification: Record<string, unknown> | null;
  unresolved_references: Record<string, unknown>[];
};

const CHECKPOINT_FIELDS = new Set([
  "schema_version",
  "client_brain_id",
  "session_id",
  "turn_count",
  "topics",
  "verified_results",
  "focused_result_id",
  "pending_clarification",
  "unresolved_references",
]);
const TOPIC_FIELDS = new Set([
  "topic_id",
  "operations",
  "metric_ids",
  "dimension_ids",
  "entity_refs",
  "period",
  "comparison_period",
  "verified_result_ids",
]);
const RESULT_FIELDS = new Set([
  "result_id",
  "task_id",
  "capability_id",
  "metric_ids",
  "dimension_ids",
  "entity_refs",
  "period",
  "evidence_bundle_id",
]);
const ENTITY_FIELDS = new Set(["entity_type_id", "entity_id"]);
const PERIOD_FIELDS = new Set(["grain", "start", "end"]);
const CLARIFICATION_FIELDS = new Set(["kind", "reason_code", "task_id"]);
const UNRESOLVED_FIELDS = new Set([
  "reference_id",
  "kind",
  "candidate_ids",
  "reason_code",
]);

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactFields(value: JsonRecord, fields: ReadonlySet<string>) {
  const keys = Object.keys(value);
  return keys.length === fields.size && keys.every((key) => fields.has(key));
}

function uniqueStrings(value: unknown, max: number, pattern: RegExp): value is string[] {
  return Array.isArray(value) &&
    value.length <= max &&
    value.every((item) => typeof item === "string" && pattern.test(item)) &&
    new Set(value).size === value.length;
}

function isoDate(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_DATE.test(value)) return false;
  const parsed = new Date(value + "T00:00:00.000Z");
  return !Number.isNaN(parsed.valueOf()) &&
    parsed.toISOString().slice(0, 10) === value;
}

function entityRef(value: unknown): value is V2CheckpointEntityRef {
  return isRecord(value) &&
    exactFields(value, ENTITY_FIELDS) &&
    typeof value.entity_type_id === "string" &&
    IDENTIFIER.test(value.entity_type_id) &&
    typeof value.entity_id === "string" &&
    ENTITY_ID.test(value.entity_id);
}

function entityRefs(value: unknown): value is V2CheckpointEntityRef[] {
  if (!Array.isArray(value) || value.length > MAX_TOPIC_REFS || !value.every(entityRef)) {
    return false;
  }
  const keys = value.map((item) => item.entity_type_id + ":" + item.entity_id);
  return new Set(keys).size === keys.length;
}

function period(value: unknown): value is V2CheckpointPeriod {
  return isRecord(value) &&
    exactFields(value, PERIOD_FIELDS) &&
    typeof value.grain === "string" &&
    TIME_GRAINS.has(value.grain) &&
    isoDate(value.start) &&
    isoDate(value.end) &&
    value.end >= value.start;
}

function optionalPeriod(value: unknown): value is V2CheckpointPeriod | null {
  return value === null || period(value);
}

function topic(value: unknown): value is V2CheckpointTopic {
  return isRecord(value) &&
    exactFields(value, TOPIC_FIELDS) &&
    typeof value.topic_id === "string" &&
    IDENTIFIER.test(value.topic_id) &&
    Array.isArray(value.operations) &&
    value.operations.length <= 6 &&
    value.operations.every((item) => typeof item === "string" && OPERATIONS.has(item)) &&
    new Set(value.operations).size === value.operations.length &&
    uniqueStrings(value.metric_ids, MAX_TOPIC_REFS, IDENTIFIER) &&
    uniqueStrings(value.dimension_ids, MAX_TOPIC_REFS, IDENTIFIER) &&
    entityRefs(value.entity_refs) &&
    optionalPeriod(value.period) &&
    optionalPeriod(value.comparison_period) &&
    uniqueStrings(value.verified_result_ids, MAX_TOPIC_REFS, IDENTIFIER);
}

function verifiedResult(value: unknown): value is V2CheckpointVerifiedResult {
  return isRecord(value) &&
    exactFields(value, RESULT_FIELDS) &&
    typeof value.result_id === "string" &&
    IDENTIFIER.test(value.result_id) &&
    typeof value.task_id === "string" &&
    IDENTIFIER.test(value.task_id) &&
    typeof value.capability_id === "string" &&
    IDENTIFIER.test(value.capability_id) &&
    uniqueStrings(value.metric_ids, MAX_TOPIC_REFS, IDENTIFIER) &&
    uniqueStrings(value.dimension_ids, MAX_TOPIC_REFS, IDENTIFIER) &&
    entityRefs(value.entity_refs) &&
    optionalPeriod(value.period) &&
    typeof value.evidence_bundle_id === "string" &&
    IDENTIFIER.test(value.evidence_bundle_id);
}

function pendingClarification(value: unknown) {
  if (value === null) return true;
  return isRecord(value) &&
    exactFields(value, CLARIFICATION_FIELDS) &&
    typeof value.kind === "string" &&
    CLARIFICATION_KINDS.has(value.kind) &&
    typeof value.reason_code === "string" &&
    IDENTIFIER.test(value.reason_code) &&
    (value.task_id === null ||
      (typeof value.task_id === "string" && IDENTIFIER.test(value.task_id)));
}

function unresolvedReference(value: unknown) {
  if (!isRecord(value) ||
      !exactFields(value, UNRESOLVED_FIELDS) ||
      typeof value.reference_id !== "string" ||
      !IDENTIFIER.test(value.reference_id) ||
      typeof value.kind !== "string" ||
      !REFERENCE_KINDS.has(value.kind) ||
      !uniqueStrings(value.candidate_ids, MAX_REFERENCE_CANDIDATES, OPAQUE_ID) ||
      typeof value.reason_code !== "string" ||
      !IDENTIFIER.test(value.reason_code)) {
    return false;
  }
  return value.kind !== "period" || value.candidate_ids.length === 0;
}

function sizeBytes(value: unknown) {
  try {
    return new TextEncoder().encode(JSON.stringify(value)).byteLength;
  } catch {
    return Number.POSITIVE_INFINITY;
  }
}

export function isV2ConversationCheckpoint(
  value: unknown,
): value is V2ConversationCheckpoint {
  if (!isRecord(value) ||
      sizeBytes(value) > V2_CHECKPOINT_MAX_BYTES ||
      !exactFields(value, CHECKPOINT_FIELDS) ||
      value.schema_version !== V2_CHECKPOINT_SCHEMA_VERSION ||
      typeof value.client_brain_id !== "string" ||
      !IDENTIFIER.test(value.client_brain_id) ||
      typeof value.session_id !== "string" ||
      !OPAQUE_ID.test(value.session_id) ||
      !Number.isSafeInteger(value.turn_count) ||
      Number(value.turn_count) < 0 ||
      !Array.isArray(value.topics) ||
      value.topics.length > MAX_TOPIC_STACK ||
      !value.topics.every(topic) ||
      !Array.isArray(value.verified_results) ||
      value.verified_results.length > MAX_VERIFIED_RESULTS ||
      !value.verified_results.every(verifiedResult) ||
      !pendingClarification(value.pending_clarification) ||
      !Array.isArray(value.unresolved_references) ||
      value.unresolved_references.length > MAX_UNRESOLVED_REFERENCES ||
      !value.unresolved_references.every(unresolvedReference)) {
    return false;
  }

  const topicIds = value.topics.map((item) => item.topic_id);
  const resultIds = value.verified_results.map((item) => item.result_id);
  const unresolvedIds = value.unresolved_references.map(
    (item) => (item as JsonRecord).reference_id,
  );
  const knownResults = new Set(resultIds);

  if (new Set(topicIds).size !== topicIds.length ||
      new Set(resultIds).size !== resultIds.length ||
      new Set(unresolvedIds).size !== unresolvedIds.length) {
    return false;
  }

  if (value.focused_result_id !== null &&
      (typeof value.focused_result_id !== "string" ||
       !IDENTIFIER.test(value.focused_result_id) ||
       !knownResults.has(value.focused_result_id))) {
    return false;
  }

  return value.topics.every((item) =>
    item.verified_result_ids.every((resultId) => knownResults.has(resultId)),
  );
}

export function parseV2ConversationCheckpoint(
  value: unknown,
): V2ConversationCheckpoint | null {
  return isV2ConversationCheckpoint(value) ? value : null;
}
