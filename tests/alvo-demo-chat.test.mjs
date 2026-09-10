import assert from "node:assert/strict";
import test from "node:test";

import {
  DEMO_CHAT_INVALID_RESPONSE_ERROR,
  DEMO_CHAT_UPSTREAM_LOCALE,
  DEMO_CHAT_UPSTREAM_PATH,
  buildDemoChatBrowserRequest,
  buildDemoChatUpstreamRequest,
  calculateDemoChatMaxRequestBytes,
  normalizeDemoChatGatewayResponse,
  validateDemoChatRequest,
} from "../src/lib/alvo-demo-chat.ts";
import {
  DEMO_CONVERSATION_ID_MAX_CHARACTERS,
  DEMO_HISTORY_MAX_MESSAGES,
  DEMO_MESSAGE_MAX_CHARACTERS,
} from "../src/lib/alvo-demo-session.ts";

const supportedIndustries = new Set([
  "retail",
  "manufacturing",
  "professional_services",
  "hospitality",
  "ecommerce",
  "logistics_distribution",
  "healthcare_operations",
  "construction_real_estate",
]);

const limits = {
  messageCharacters: DEMO_MESSAGE_MAX_CHARACTERS,
  historyMessages: DEMO_HISTORY_MAX_MESSAGES,
  conversationIdCharacters: DEMO_CONVERSATION_ID_MAX_CHARACTERS,
};

const expectedResponse = {
  industry: "retail",
  message: "How are stores performing?",
  conversationId: null,
  conversationIdCharacters: DEMO_CONVERSATION_ID_MAX_CHARACTERS,
};

function validRequest(overrides = {}) {
  return {
    industry: "retail",
    message: "How are stores performing?",
    conversation_id: null,
    history: [],
    ...overrides,
  };
}

function validBackendResponse() {
  return {
    conversation_id: "demo_0123456789abcdef0123456789abcdef",
    handled_by: "alvo",
    route: "specialist",
    route_reason: "approved_single_capability",
    routing: {
      strategy: "deterministic",
      fallback_used: false,
      fallback_reason: null,
      model_tier: null,
      model_reason: null,
    },
    usage: {
      model_calls: 0,
      synthetic_capability_calls: 1,
    },
    answer: {
      industry: "retail",
      industry_display_name: "Retail",
      action: "answer",
      question: "How are stores performing?",
      data_month: "2026-08-01",
      headline: "Revenue is 1.1% below target.",
      summary: "The latest synthetic month is slightly below plan.",
      kpis: [
        {
          label: "Revenue vs target",
          value: "-1.1%",
          source_capability: "performance_summary",
          raw_model_output: "must not cross the proxy",
        },
      ],
      details: ["Four stores are represented in the synthetic dataset."],
      suggested_prompts: ["Which stores are furthest below target?"],
      chain_of_thought: "must not cross the proxy",
    },
    team_trace: [{ agent_id: "alvo", private_prompt: "must not cross the proxy" }],
    capabilities_used: ["performance_summary"],
    orem: { required: false, reason: null },
    verification: {
      status: "passed",
      checks: [
        "synthetic_only_contract",
        "approved_capability_scope",
        "supported_answer_content",
        "synthetic_provenance",
      ],
      provider_detail: "must not cross the proxy",
    },
    provenance: ["synthetic:generated/retail_v1"],
    limitations: ["Synthetic scope only."],
    disclaimer: "Synthetic demo — no real company data.",
    synthetic_only: true,
    raw_provider_error: "must not cross the proxy",
  };
}

function normalize(payload = validBackendResponse(), expected = expectedResponse) {
  return normalizeDemoChatGatewayResponse(payload, expected);
}

function assertSafe502(result) {
  assert.deepEqual(result, {
    status: 502,
    body: { error: DEMO_CHAT_INVALID_RESPONSE_ERROR },
  });
  assert.doesNotMatch(JSON.stringify(result), /provider|upstream|model output/i);
}

test("builds the first-turn browser request with empty prior history", () => {
  assert.deepEqual(
    buildDemoChatBrowserRequest({
      industry: "retail",
      message: "How are stores performing?",
      conversationId: null,
      history: [],
    }),
    validRequest(),
  );
});

test("sends prior successful turns without adding the current message to history", () => {
  const history = [
    { role: "user", content: "Which stores are below target?" },
    { role: "assistant", content: "Two stores are below target." },
  ];
  const request = buildDemoChatBrowserRequest({
    industry: "retail",
    message: "What about margin?",
    conversationId: "demo_follow_up",
    history,
  });

  assert.equal(request.message, "What about margin?");
  assert.equal(request.conversation_id, "demo_follow_up");
  assert.deepEqual(request.history, history);
  assert.equal(
    request.history.some((message) => message.content === request.message),
    false,
  );
  assert.notEqual(request.history, history);
});

test("accepts a valid chat request at the message boundary", () => {
  const result = validateDemoChatRequest(
    validRequest({ message: "x".repeat(DEMO_MESSAGE_MAX_CHARACTERS) }),
    supportedIndustries,
    limits,
  );
  assert.equal(result.ok, true);
});

test("accepts a null conversation ID", () => {
  const result = validateDemoChatRequest(
    validRequest({ conversation_id: null }),
    supportedIndustries,
    limits,
  );
  assert.equal(result.ok, true);
});

test("trims the current message and each prior history message", () => {
  const result = validateDemoChatRequest(
    validRequest({
      message: "  And inventory?  ",
      history: [
        { role: "user", content: "  Show the recent revenue trend.  " },
        { role: "assistant", content: "  Revenue increased.  " },
      ],
    }),
    supportedIndustries,
    limits,
  );

  assert.equal(result.ok, true);
  assert.equal(result.value.message, "And inventory?");
  assert.deepEqual(result.value.history, [
    { role: "user", content: "Show the recent revenue trend." },
    { role: "assistant", content: "Revenue increased." },
  ]);
});

test("rejects unsupported industries", () => {
  const result = validateDemoChatRequest(
    validRequest({ industry: "private_company" }),
    supportedIndustries,
    limits,
  );
  assert.deepEqual(result, { ok: false, reason: "invalid_industry" });
});

test("rejects legacy and unexpected top-level request fields", () => {
  for (const extra of [
    { question: "legacy field" },
    { locale: "en" },
    { data_mode: "database" },
  ]) {
    const result = validateDemoChatRequest(
      { ...validRequest(), ...extra },
      supportedIndustries,
      limits,
    );
    assert.deepEqual(result, { ok: false, reason: "invalid_request" });
  }
});

test("rejects blank current messages", () => {
  const result = validateDemoChatRequest(
    validRequest({ message: "   " }),
    supportedIndustries,
    limits,
  );
  assert.deepEqual(result, { ok: false, reason: "invalid_message" });
});

test("rejects oversized current messages", () => {
  const result = validateDemoChatRequest(
    validRequest({ message: "x".repeat(DEMO_MESSAGE_MAX_CHARACTERS + 1) }),
    supportedIndustries,
    limits,
  );
  assert.deepEqual(result, { ok: false, reason: "invalid_message" });
});

for (const conversationId of [
  "_demo",
  "demo id",
  "demo/id",
  "x".repeat(DEMO_CONVERSATION_ID_MAX_CHARACTERS + 1),
]) {
  test(`rejects malformed conversation ID: ${conversationId.slice(0, 12)}`, () => {
    const result = validateDemoChatRequest(
      validRequest({ conversation_id: conversationId }),
      supportedIndustries,
      limits,
    );
    assert.deepEqual(result, {
      ok: false,
      reason: "invalid_conversation_id",
    });
  });
}

test("accepts a maximum-length conversation ID", () => {
  const result = validateDemoChatRequest(
    validRequest({
      conversation_id: "x".repeat(DEMO_CONVERSATION_ID_MAX_CHARACTERS),
    }),
    supportedIndustries,
    limits,
  );
  assert.equal(result.ok, true);
});

test("rejects history beyond eight messages", () => {
  const history = Array.from(
    { length: DEMO_HISTORY_MAX_MESSAGES + 1 },
    (_, index) => ({ role: "user", content: `question-${index}` }),
  );
  const result = validateDemoChatRequest(
    validRequest({ history }),
    supportedIndustries,
    limits,
  );
  assert.deepEqual(result, { ok: false, reason: "invalid_history" });
});

test("rejects invalid history roles", () => {
  const result = validateDemoChatRequest(
    validRequest({ history: [{ role: "tool", content: "internal" }] }),
    supportedIndustries,
    limits,
  );
  assert.deepEqual(result, { ok: false, reason: "invalid_history" });
});

test("rejects blank history content", () => {
  const result = validateDemoChatRequest(
    validRequest({ history: [{ role: "user", content: "   " }] }),
    supportedIndustries,
    limits,
  );
  assert.deepEqual(result, { ok: false, reason: "invalid_history" });
});

test("rejects oversized history content", () => {
  const result = validateDemoChatRequest(
    validRequest({
      history: [
        {
          role: "assistant",
          content: "x".repeat(DEMO_MESSAGE_MAX_CHARACTERS + 1),
        },
      ],
    }),
    supportedIndustries,
    limits,
  );
  assert.deepEqual(result, { ok: false, reason: "invalid_history" });
});

test("rejects unexpected nested history fields", () => {
  const result = validateDemoChatRequest(
    validRequest({
      history: [{ role: "user", content: "Question", routing: "smart" }],
    }),
    supportedIndustries,
    limits,
  );
  assert.deepEqual(result, { ok: false, reason: "invalid_history" });
});

test("uses only the approved backend chat path", () => {
  assert.equal(DEMO_CHAT_UPSTREAM_PATH, "/v1/demo/chat");
});

test("adds the backend-only English locale and never forwards Romanian locale", () => {
  const upstream = buildDemoChatUpstreamRequest(validRequest());
  assert.equal(upstream.locale, DEMO_CHAT_UPSTREAM_LOCALE);
  assert.equal(upstream.locale, "en");
  assert.equal("ro" in upstream, false);
});

test("preserves conversation continuity and chronological prior history upstream", () => {
  const request = validRequest({
    conversation_id: "demo_follow_up",
    history: [
      { role: "user", content: "Show the recent revenue trend." },
      { role: "assistant", content: "Revenue increased." },
    ],
  });
  const upstream = buildDemoChatUpstreamRequest(request);

  assert.equal(upstream.conversation_id, "demo_follow_up");
  assert.deepEqual(upstream.history, request.history);
  assert.notEqual(upstream.history, request.history);
});

test("calculates a bounded request byte ceiling from the public limits", () => {
  const worstCase = JSON.stringify(
    validRequest({
      industry: "construction_real_estate",
      message: "\0".repeat(DEMO_MESSAGE_MAX_CHARACTERS),
      conversation_id: "x".repeat(DEMO_CONVERSATION_ID_MAX_CHARACTERS),
      history: Array.from({ length: DEMO_HISTORY_MAX_MESSAGES }, (_, index) => ({
        role: index % 2 === 0 ? "user" : "assistant",
        content: "\0".repeat(DEMO_MESSAGE_MAX_CHARACTERS),
      })),
    }),
  );
  const ceiling = calculateDemoChatMaxRequestBytes(limits);

  assert.ok(ceiling >= Buffer.byteLength(worstCase));
  assert.ok(ceiling < 64 * 1_024);
});

test("normalizes a verified synthetic chat response to the presentation shape", () => {
  const result = normalize();
  assert.equal(result.status, 200);
  assert.deepEqual(result.body, {
    conversation_id: "demo_0123456789abcdef0123456789abcdef",
    industry: "retail",
    industry_display_name: "Retail",
    action: "answer",
    question: "How are stores performing?",
    capability: "performance_summary",
    data_month: "2026-08-01",
    headline: "Revenue is 1.1% below target.",
    summary: "The latest synthetic month is slightly below plan.",
    kpis: [{ label: "Revenue vs target", value: "-1.1%" }],
    details: ["Four stores are represented in the synthetic dataset."],
    provenance: ["synthetic:generated/retail_v1"],
    disclaimer: "Synthetic demo — no real company data.",
    suggested_prompts: ["Which stores are furthest below target?"],
  });
});

test("rejects a response that is not synthetic-only", () => {
  const payload = validBackendResponse();
  payload.synthetic_only = false;
  assertSafe502(normalize(payload));
});

test("rejects a response not handled by ALVO", () => {
  const payload = validBackendResponse();
  payload.handled_by = "orem";
  assertSafe502(normalize(payload));
});

test("rejects an invalid authoritative conversation ID", () => {
  const payload = validBackendResponse();
  payload.conversation_id = "demo id";
  assertSafe502(normalize(payload));
});

test("preserves an existing conversation ID in a valid follow-up response", () => {
  const payload = validBackendResponse();
  payload.conversation_id = "demo_follow_up";
  const result = normalize(payload, {
    ...expectedResponse,
    conversationId: "demo_follow_up",
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.conversation_id, "demo_follow_up");
});

test("rejects an unexpected conversation ID change during a follow-up", () => {
  assertSafe502(
    normalize(validBackendResponse(), {
      ...expectedResponse,
      conversationId: "demo_follow_up",
    }),
  );
});

test("rejects malformed nested answer fields", () => {
  const payload = validBackendResponse();
  delete payload.answer.summary;
  assertSafe502(normalize(payload));
});

test("rejects an answer for a different industry", () => {
  const payload = validBackendResponse();
  payload.answer.industry = "manufacturing";
  assertSafe502(normalize(payload));
});

test("rejects an answer for a different current message", () => {
  const payload = validBackendResponse();
  payload.answer.question = "A different question";
  assertSafe502(normalize(payload));
});

test("rejects an invalid data month", () => {
  const payload = validBackendResponse();
  payload.answer.data_month = "2026-02-31";
  assertSafe502(normalize(payload));
});

test("rejects a KPI without source_capability", () => {
  const payload = validBackendResponse();
  delete payload.answer.kpis[0].source_capability;
  assertSafe502(normalize(payload));
});

test("rejects unknown capabilities", () => {
  const payload = validBackendResponse();
  payload.capabilities_used = ["customer_database_lookup"];
  assertSafe502(normalize(payload));
});

test("rejects KPI evidence not named in capabilities_used", () => {
  const payload = validBackendResponse();
  payload.capabilities_used = ["trend"];
  assertSafe502(normalize(payload));
});

test("rejects failed verification", () => {
  const payload = validBackendResponse();
  payload.verification.status = "failed";
  assertSafe502(normalize(payload));
});

test("rejects verification missing required public checks", () => {
  const payload = validBackendResponse();
  payload.verification.checks = ["synthetic_provenance"];
  assertSafe502(normalize(payload));
});

test("rejects non-synthetic provenance", () => {
  const payload = validBackendResponse();
  payload.provenance = ["database:customers/sales"];
  assertSafe502(normalize(payload));
});

test("rejects an answer without synthetic provenance", () => {
  const payload = validBackendResponse();
  payload.provenance = [];
  assertSafe502(normalize(payload));
});

test("accepts a verified safe clarification without capability evidence", () => {
  const payload = validBackendResponse();
  payload.answer.action = "clarification";
  payload.answer.data_month = null;
  payload.answer.headline = "Please choose a supported business question.";
  payload.answer.kpis = [];
  payload.capabilities_used = [];
  payload.provenance = [];
  payload.verification.checks = [
    "synthetic_only_contract",
    "approved_capability_scope",
    "supported_answer_content",
    "safe_clarification",
  ];

  const result = normalize(payload);
  assert.equal(result.status, 200);
  assert.equal(result.body.action, "clarification");
  assert.equal(result.body.capability, null);
  assert.deepEqual(result.body.provenance, []);
});

test("rejects clarification responses that claim capability evidence", () => {
  const payload = validBackendResponse();
  payload.answer.action = "clarification";
  payload.verification.checks = [
    "synthetic_only_contract",
    "approved_capability_scope",
    "supported_answer_content",
    "safe_clarification",
  ];
  assertSafe502(normalize(payload));
});

test("does not expose trace, routing, usage, limitations, or raw provider fields", () => {
  const result = normalize();
  assert.equal(result.status, 200);
  const publicJson = JSON.stringify(result.body);

  for (const internalField of [
    "team_trace",
    "routing",
    "usage",
    "limitations",
    "chain_of_thought",
    "private_prompt",
    "raw_model_output",
    "raw_provider_error",
    "provider_detail",
    "source_capability",
  ]) {
    assert.doesNotMatch(publicJson, new RegExp(internalField));
  }
});

test("rejects a headline too large for safe browser history", () => {
  const payload = validBackendResponse();
  payload.answer.headline = "x".repeat(DEMO_MESSAGE_MAX_CHARACTERS + 1);
  assertSafe502(normalize(payload));
});

test("maps a malformed upstream payload to a generic safe 502", () => {
  assertSafe502(normalize({ raw_provider_error: "private stack trace" }));
});
