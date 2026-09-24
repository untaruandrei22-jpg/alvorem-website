import assert from "node:assert/strict";
import test from "node:test";

import {
  buildV2GatewayRequest,
  normalizeV2GatewayResponse,
} from "../src/lib/alvo-demo-v2-gateway.ts";

function checkpoint(overrides = {}) {
  return {
    schema_version: "2.0",
    client_brain_id: "retail_v2",
    session_id: "v2_test_session",
    turn_count: 1,
    topics: [],
    verified_results: [],
    focused_result_id: null,
    pending_clarification: null,
    unresolved_references: [],
    ...overrides,
  };
}

function backendResponse(overrides = {}) {
  return {
    session_id: "v2_test_session",
    action: "answer",
    response_mode: "deterministic_fallback",
    text: "Verified synthetic V2 result.",
    execution_status: "completed",
    checkpoint: checkpoint(),
    synthetic_only: true,
    ...overrides,
  };
}

test("builds the exact V2 staging request without transcript authority", () => {
  const value = buildV2GatewayRequest({
    message: "Show August revenue.",
    locale: "en",
    checkpoint: checkpoint(),
  });
  assert.deepEqual(value, {
    message: "Show August revenue.",
    locale: "en",
    checkpoint: checkpoint(),
  });
  assert.equal(Object.hasOwn(value, "history"), false);
  assert.equal(Object.hasOwn(value, "industry"), false);
  assert.equal(Object.hasOwn(value, "runtime_version"), false);
});

test("normalizes safe V2 result to current presentation contract", () => {
  const result = normalizeV2GatewayResponse(backendResponse(), {
    message: "Show August revenue.",
    conversationId: null,
  });
  assert.ok(result);
  assert.equal(result.runtime_version, "v2");
  assert.equal(result.conversation_id, "v2_test_session");
  assert.equal(result.action, "answer");
  assert.equal(result.headline, "ALVO V2");
  assert.equal(result.summary, "Verified synthetic V2 result.");
  assert.deepEqual(result.provenance, ["synthetic:v2_verified"]);
  assert.deepEqual(result.v2_checkpoint, checkpoint());
});

test("preserves exact V2 session id on follow-up", () => {
  const result = normalizeV2GatewayResponse(backendResponse(), {
    message: "Where did that come from?",
    conversationId: "v2_test_session",
  });
  assert.ok(result);
  assert.equal(result.conversation_id, "v2_test_session");
});

test("rejects V2 session id drift", () => {
  assert.equal(
    normalizeV2GatewayResponse(
      backendResponse({
        session_id: "v2_other_session",
        checkpoint: checkpoint({ session_id: "v2_other_session" }),
      }),
      {
        message: "Follow up.",
        conversationId: "v2_test_session",
      },
    ),
    null,
  );
});

test("rejects malformed or internal V2 response fields", () => {
  assert.equal(
    normalizeV2GatewayResponse(
      {
        ...backendResponse(),
        result_fingerprint: "sha256:internal",
      },
      { message: "Show revenue.", conversationId: null },
    ),
    null,
  );
});

test("rejects checkpoint and session mismatch", () => {
  assert.equal(
    normalizeV2GatewayResponse(
      backendResponse({
        checkpoint: checkpoint({ session_id: "v2_other_session" }),
      }),
      { message: "Show revenue.", conversationId: null },
    ),
    null,
  );
});

test("maps safe error and reset responses to clarification presentation", () => {
  for (const payload of [
    backendResponse({
      action: "clarification",
      response_mode: "safe_error",
      text: "Please rephrase.",
      execution_status: null,
    }),
    backendResponse({
      action: "reset",
      response_mode: "reset",
      text: "The V2 conversation was reset.",
      execution_status: null,
    }),
  ]) {
    const result = normalizeV2GatewayResponse(payload, {
      message: "reset",
      conversationId: null,
    });
    assert.ok(result);
    assert.equal(result.action, "clarification");
    assert.deepEqual(result.provenance, []);
  }
});

test("accepts conversational answers without verified-result provenance", () => {
  const result = normalizeV2GatewayResponse(
    backendResponse({
      response_mode: "conversational",
      text: "Hi! I’m here. What should we look at?",
      execution_status: null,
    }),
    {
      message: "Hi",
      conversationId: null,
    },
  );
  assert.ok(result);
  assert.equal(result.action, "answer");
  assert.deepEqual(result.provenance, []);
});

