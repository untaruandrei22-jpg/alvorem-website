import assert from "node:assert/strict";
import test from "node:test";

import {
  DEVELOPMENT_DEMO_API,
  PRODUCTION_DEMO_API,
  STAGING_DEMO_API,
  STAGING_MODEL_ASSISTED_PATH,
  isCloudflarePreviewHostname,
  resolveDemoApiBaseUrl,
  resolveDemoChatUpstreamTarget,
} from "../src/lib/alvo-demo-endpoint.ts";

test("recognizes only Cloudflare workers.dev preview hostnames", () => {
  assert.equal(
    isCloudflarePreviewHostname(
      "feat-homepage-visible-transcript-bilingual-alvorem-website.untaruandrei22.workers.dev",
    ),
    true,
  );
  assert.equal(isCloudflarePreviewHostname("alvorem.ro"), false);
  assert.equal(
    isCloudflarePreviewHostname("workers.dev.evil.example"),
    false,
  );
});

test("uses explicit configured demo URL on non-preview hosts", () => {
  assert.equal(
    resolveDemoApiBaseUrl({
      hostname: "internal.example",
      configuredUrl: "https://configured.example/",
      development: false,
    }),
    "https://configured.example",
  );
});

test("Cloudflare preview cannot be redirected to production by a global URL", () => {
  assert.equal(
    resolveDemoApiBaseUrl({
      hostname:
        "feat-homepage-visible-transcript-bilingual-alvorem-website.untaruandrei22.workers.dev",
      configuredUrl:
        "https://private-ai-business-agent-production.up.railway.app",
      development: false,
    }),
    STAGING_DEMO_API,
  );
});

test("uses local backend in development", () => {
  assert.equal(
    resolveDemoApiBaseUrl({
      hostname: "localhost",
      configuredUrl: null,
      development: true,
    }),
    DEVELOPMENT_DEMO_API,
  );
});

test("routes Cloudflare Workers previews to Railway staging", () => {
  for (const hostname of [
    "feat-homepage-visible-transcript-bilingual-alvorem-website.untaruandrei22.workers.dev",
    "b8ce5968-alvorem-website.untaruandrei22.workers.dev",
  ]) {
    assert.equal(
      resolveDemoApiBaseUrl({
        hostname,
        configuredUrl: null,
        development: false,
      }),
      STAGING_DEMO_API,
    );
  }
});

test("keeps custom production domains on Railway production", () => {
  for (const hostname of [
    "alvorem.ro",
    "www.alvorem.ro",
    "alvorem-website.example.com",
  ]) {
    assert.equal(
      resolveDemoApiBaseUrl({
        hostname,
        configuredUrl: null,
        development: false,
      }),
      PRODUCTION_DEMO_API,
    );
  }
});

test("does not treat deceptive workers.dev suffixes as preview domains", () => {
  assert.equal(
    resolveDemoApiBaseUrl({
      hostname: "workers.dev.evil.example",
      configuredUrl: null,
      development: false,
    }),
    PRODUCTION_DEMO_API,
  );
});


test("uses public demo chat when staging canary mode is off", () => {
  assert.deepEqual(
    resolveDemoChatUpstreamTarget({
      baseUrl: PRODUCTION_DEMO_API,
      stagingCanaryEnabled: false,
      stagingCanaryToken: null,
    }),
    { path: "/v1/demo/chat", canaryToken: null, runtime: "public" },
  );
});

test("uses protected model-assisted endpoint only on exact staging origin", () => {
  const token = "preview-canary-token-0123456789abcdef";
  assert.deepEqual(
    resolveDemoChatUpstreamTarget({
      baseUrl: STAGING_DEMO_API,
      stagingCanaryEnabled: true,
      stagingCanaryToken: token,
    }),
    {
      path: STAGING_MODEL_ASSISTED_PATH,
      canaryToken: token,
      runtime: "model_assisted",
    },
  );
});

test("staging canary mode fails closed on production or missing token", () => {
  assert.throws(
    () =>
      resolveDemoChatUpstreamTarget({
        baseUrl: PRODUCTION_DEMO_API,
        stagingCanaryEnabled: true,
        stagingCanaryToken: "preview-canary-token-0123456789abcdef",
      }),
    /staging_canary_not_configured/,
  );
  assert.throws(
    () =>
      resolveDemoChatUpstreamTarget({
        baseUrl: STAGING_DEMO_API,
        stagingCanaryEnabled: true,
        stagingCanaryToken: "short",
      }),
    /staging_canary_not_configured/,
  );
});


test("routes explicit V2 preview runtime only to protected staging", () => {
  const token = "preview-canary-token-0123456789abcdef";
  assert.deepEqual(
    resolveDemoChatUpstreamTarget({
      baseUrl: STAGING_DEMO_API,
      stagingCanaryEnabled: true,
      stagingCanaryToken: token,
      stagingRuntime: "v2",
    }),
    {
      path: "/v1/demo/staging/business-gpt-v2-chat",
      canaryToken: token,
      runtime: "v2",
    },
  );
});

test("browser input cannot select staging runtime", () => {
  const token = "preview-canary-token-0123456789abcdef";
  const target = resolveDemoChatUpstreamTarget({
    baseUrl: STAGING_DEMO_API,
    stagingCanaryEnabled: true,
    stagingCanaryToken: token,
  });
  assert.equal(target.runtime, "model_assisted");
  assert.notEqual(target.runtime, "v2");
});
