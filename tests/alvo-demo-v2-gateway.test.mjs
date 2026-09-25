import assert from "node:assert/strict";
import test from "node:test";

import {
  buildV2GatewayRequest,
  normalizeV2GatewayResponse,
} from "../src/lib/alvo-demo-v2-gateway.ts";
import {
  DEMO_HISTORY_MAX_MESSAGES,
} from "../src/lib/alvo-demo-session.ts";

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
    chart: null,
    synthetic_only: true,
    ...overrides,
  };
}

test("builds the exact V2 staging request with bounded transcript only", () => {
  const value = buildV2GatewayRequest({
    message: "Make that shorter.",
    locale: "en",
    history: [
      { role: "user", content: "How would you structure the review?" },
      {
        role: "assistant",
        content: "Use results, blockers, and next actions.",
        prior_result_context: {
          must_not_cross: true,
        },
      },
    ],
    checkpoint: checkpoint(),
  });
  assert.deepEqual(value, {
    message: "Make that shorter.",
    locale: "en",
    history: [
      { role: "user", text: "How would you structure the review?" },
      {
        role: "assistant",
        text: "Use results, blockers, and next actions.",
      },
    ],
    checkpoint: checkpoint(),
  });
  assert.equal(
    JSON.stringify(value).includes("prior_result_context"),
    false,
  );
  assert.equal(Object.hasOwn(value, "industry"), false);
  assert.equal(Object.hasOwn(value, "runtime_version"), false);
});

test("rejects V2 history beyond the bounded request contract", () => {
  assert.throws(
    () =>
      buildV2GatewayRequest({
        message: "Continue.",
        locale: "en",
        history: Array.from({ length: DEMO_HISTORY_MAX_MESSAGES + 1 }, (_, index) => ({
          role: "user",
          content: `turn-${index}`,
        })),
        checkpoint: checkpoint(),
      }),
    /Invalid V2 history/,
  );
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


test("normalizes a bounded verified revenue chart", () => {
  const chart = {
    chart_type: "bar",
    metric_id: "revenue",
    unit: "RON",
    points: [
      { label: "martie 2026", value: 1400000 },
      { label: "aprilie 2026", value: 1450000 },
      { label: "mai 2026", value: 1490000 },
      { label: "iunie 2026", value: 1510000 },
      { label: "iulie 2026", value: 1500000 },
      { label: "august 2026", value: 1524520 },
    ],
  };
  const result = normalizeV2GatewayResponse(
    backendResponse({
      text: "Sigur — acesta este bar chart-ul veniturilor.",
      chart,
    }),
    {
      message: "poti face un bar chart cu ultimele 6 luni?",
      conversationId: null,
    },
  );

  assert.ok(result);
  assert.deepEqual(result.chart, chart);
  assert.deepEqual(result.provenance, ["synthetic:v2_verified"]);
});

test("rejects malformed or unbounded V2 charts", () => {
  for (const chart of [
    {
      chart_type: "line",
      metric_id: "revenue",
      unit: "RON",
      points: [
        { label: "iulie 2026", value: 1 },
        { label: "august 2026", value: 2 },
      ],
    },
    {
      chart_type: "bar",
      metric_id: "revenue",
      unit: "RON",
      points: [{ label: "august 2026", value: 2 }],
    },
    {
      chart_type: "bar",
      metric_id: "revenue",
      unit: "RON",
      points: [
        { label: "iulie 2026", value: -1 },
        { label: "august 2026", value: 2 },
      ],
    },
  ]) {
    assert.equal(
      normalizeV2GatewayResponse(
        backendResponse({ chart }),
        {
          message: "chart",
          conversationId: null,
        },
      ),
      null,
    );
  }
});

test("accepts conversational V2 answers without fabricating verified provenance", () => {
  const result = normalizeV2GatewayResponse(
    backendResponse({
      response_mode: "conversational",
      text: "Salut! Aici lucrez cu un business Retail fictiv.",
      execution_status: null,
    }),
    {
      message: "Salut! Ce știi despre business-ul ăsta?",
      conversationId: null,
    },
  );

  assert.ok(result);
  assert.equal(result.action, "answer");
  assert.equal(result.headline, "ALVO V2");
  assert.equal(
    result.summary,
    "Salut! Aici lucrez cu un business Retail fictiv.",
  );
  assert.deepEqual(result.provenance, []);
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