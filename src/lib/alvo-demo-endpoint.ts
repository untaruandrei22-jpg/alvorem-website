import { STAGING_BUSINESS_GPT_V2_PATH } from "./alvo-demo-v2-gateway.ts";
export const DEVELOPMENT_DEMO_API =
  "http://127.0.0.1:8000";
export const STAGING_DEMO_API =
  "https://v2-005-benchmark-runner-staging.up.railway.app";
export const PRODUCTION_DEMO_API =
  "https://private-ai-business-agent-production.up.railway.app";

export function isCloudflarePreviewHostname(hostname?: string): boolean {
  return Boolean(hostname?.endsWith(".workers.dev"));
}

export function resolveDemoApiBaseUrl(input: {
  hostname?: string;
  configuredUrl?: string | null;
  development: boolean;
}): string {
  // Cloudflare branch/version previews must always rehearse against the
  // synthetic staging runtime. Do this before configuredUrl so a project-wide
  // production URL cannot accidentally route a preview rehearsal to prod.
  if (isCloudflarePreviewHostname(input.hostname)) {
    return STAGING_DEMO_API;
  }

  const configured = input.configuredUrl?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (input.development) {
    return DEVELOPMENT_DEMO_API;
  }

  return PRODUCTION_DEMO_API;
}


export const STAGING_MODEL_ASSISTED_PATH =
  "/v1/demo/staging/model-assisted-chat";

export type DemoStagingRuntime = "model_assisted" | "v2";

export type DemoChatUpstreamTarget = {
  path:
    | "/v1/demo/chat"
    | typeof STAGING_MODEL_ASSISTED_PATH
    | typeof STAGING_BUSINESS_GPT_V2_PATH;
  canaryToken: string | null;
  runtime: "public" | DemoStagingRuntime;
};

export function resolveDemoChatUpstreamTarget(input: {
  baseUrl: string;
  stagingCanaryEnabled: boolean;
  stagingCanaryToken?: string | null;
  stagingRuntime?: DemoStagingRuntime;
}): DemoChatUpstreamTarget {
  if (!input.stagingCanaryEnabled) {
    return {
      path: "/v1/demo/chat",
      canaryToken: null,
      runtime: "public",
    };
  }

  const token = input.stagingCanaryToken?.trim() ?? "";
  if (input.baseUrl !== STAGING_DEMO_API || token.length < 32) {
    throw new Error("staging_canary_not_configured");
  }

  const runtime = input.stagingRuntime ?? "model_assisted";
  return {
    path:
      runtime === "v2"
        ? STAGING_BUSINESS_GPT_V2_PATH
        : STAGING_MODEL_ASSISTED_PATH,
    canaryToken: token,
    runtime,
  };
}
