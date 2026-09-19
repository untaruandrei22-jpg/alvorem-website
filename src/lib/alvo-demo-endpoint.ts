export const DEVELOPMENT_DEMO_API =
  "http://127.0.0.1:8000";
export const STAGING_DEMO_API =
  "https://private-ai-business-agent-staging.up.railway.app";
export const PRODUCTION_DEMO_API =
  "https://private-ai-business-agent-production.up.railway.app";

export function resolveDemoApiBaseUrl(input: {
  hostname?: string;
  configuredUrl?: string | null;
  development: boolean;
}): string {
  // Cloudflare branch/version previews must always rehearse against the
  // synthetic staging runtime. Do this before configuredUrl so a project-wide
  // production URL cannot accidentally route a preview rehearsal to prod.
  if (input.hostname?.endsWith(".workers.dev")) {
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
