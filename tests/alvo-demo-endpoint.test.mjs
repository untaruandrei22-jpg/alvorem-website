import assert from "node:assert/strict";
import test from "node:test";

import {
  DEVELOPMENT_DEMO_API,
  PRODUCTION_DEMO_API,
  STAGING_DEMO_API,
  resolveDemoApiBaseUrl,
} from "../src/lib/alvo-demo-endpoint.ts";

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
