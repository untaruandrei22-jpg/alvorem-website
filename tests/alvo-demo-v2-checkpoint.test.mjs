import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_CHECKPOINT_MAX_BYTES,
  isV2ConversationCheckpoint,
  parseV2ConversationCheckpoint,
} from "../src/lib/alvo-demo-v2-checkpoint.ts";

function checkpoint(overrides = {}) {
  return {
    schema_version: "2.0",
    client_brain_id: "retail_public_v2",
    session_id: "v2_session_1",
    turn_count: 1,
    topics: [
      {
        topic_id: "topic_1",
        operations: ["summarize"],
        metric_ids: ["revenue"],
        dimension_ids: [],
        entity_refs: [],
        period: {
          grain: "month",
          start: "2026-08-01",
          end: "2026-08-31",
        },
        comparison_period: null,
        verified_result_ids: ["result_1_1"],
      },
    ],
    verified_results: [
      {
        result_id: "result_1_1",
        task_id: "revenue",
        capability_id: "performance_summary",
        metric_ids: ["revenue"],
        dimension_ids: [],
        entity_refs: [],
        period: {
          grain: "month",
          start: "2026-08-01",
          end: "2026-08-31",
        },
        evidence_bundle_id: "evidence_performance_summary",
      },
    ],
    focused_result_id: "result_1_1",
    pending_clarification: null,
    unresolved_references: [],
    ...overrides,
  };
}

test("accepts the exact pointer-only V2 checkpoint shape", () => {
  const value = checkpoint();

  assert.equal(isV2ConversationCheckpoint(value), true);
  assert.deepEqual(parseV2ConversationCheckpoint(value), value);
});

test("rejects internal evidence fields and arbitrary browser authority", () => {
  assert.equal(
    isV2ConversationCheckpoint({
      ...checkpoint(),
      result_fingerprint: "sha256:" + "0".repeat(64),
    }),
    false,
  );
  assert.equal(
    isV2ConversationCheckpoint({
      ...checkpoint(),
      business_value: 123,
    }),
    false,
  );
  assert.equal(
    isV2ConversationCheckpoint({
      ...checkpoint(),
      runtime_version: "v2",
    }),
    false,
  );
});

test("rejects dangling focused or topic result references", () => {
  assert.equal(
    isV2ConversationCheckpoint({
      ...checkpoint(),
      focused_result_id: "result_missing",
    }),
    false,
  );

  const value = checkpoint();
  value.topics[0].verified_result_ids = ["result_missing"];
  assert.equal(isV2ConversationCheckpoint(value), false);
});

test("rejects malformed periods and duplicate typed references", () => {
  const malformed = checkpoint();
  malformed.verified_results[0].period = {
    grain: "month",
    start: "2026-08-31",
    end: "2026-08-01",
  };
  assert.equal(isV2ConversationCheckpoint(malformed), false);

  const duplicates = checkpoint();
  duplicates.topics[0].metric_ids = ["revenue", "revenue"];
  assert.equal(isV2ConversationCheckpoint(duplicates), false);
});

test("rejects checkpoints larger than the browser safety cap", () => {
  const longId = (prefix, index) =>
    prefix + String(index).padStart(2, "0") + "x".repeat(50);
  const value = checkpoint({
    unresolved_references: [
      {
        reference_id: "reference_1",
        kind: "result",
        candidate_ids: Array.from(
          { length: 16 },
          (_, index) => "X".repeat(50) + String(index).padStart(2, "0"),
        ),
        reason_code: "ambiguous_reference",
      },
    ],
  });
  value.topics = Array.from({ length: 8 }, (_, index) => ({
    ...value.topics[0],
    topic_id: "topic_" + String(index + 1),
    metric_ids: Array.from(
      { length: 16 },
      (_, item) => longId("metric_", index * 16 + item),
    ),
    dimension_ids: Array.from(
      { length: 16 },
      (_, item) => longId("dimension_", index * 16 + item),
    ),
    entity_refs: Array.from({ length: 16 }, (_, item) => ({
      entity_type_id: longId("entity_type_", item),
      entity_id: "E" + String(index * 16 + item).padStart(3, "0") + "X".repeat(45),
    })),
    verified_result_ids: ["result_1_1"],
  }));

  assert.equal(
    new TextEncoder().encode(JSON.stringify(value)).byteLength >
      V2_CHECKPOINT_MAX_BYTES,
    true,
  );
  assert.equal(isV2ConversationCheckpoint(value), false);
});
