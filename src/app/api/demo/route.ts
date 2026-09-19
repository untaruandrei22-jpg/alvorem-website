import { NextRequest, NextResponse } from "next/server";
import {
  DEMO_CHAT_UPSTREAM_PATH,
  buildDemoChatUpstreamRequest,
  calculateDemoChatMaxRequestBytes,
  normalizeDemoChatGatewayResponse,
  validateDemoChatRequest,
  type DemoChatRequestLimits,
} from "@/lib/alvo-demo-chat";
import {
  DEMO_CONVERSATION_ID_MAX_CHARACTERS,
  DEMO_HISTORY_MAX_MESSAGES,
  DEMO_MESSAGE_MAX_CHARACTERS,
} from "@/lib/alvo-demo-session";
import {
  isCloudflarePreviewHostname,
  resolveDemoApiBaseUrl,
  resolveDemoChatUpstreamTarget,
} from "@/lib/alvo-demo-endpoint";
const REQUEST_TIMEOUT_MS = 20_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const SUPPORTED_INDUSTRIES = new Set([
  "retail",
  "manufacturing",
  "professional_services",
  "hospitality",
  "ecommerce",
  "logistics_distribution",
  "healthcare_operations",
  "construction_real_estate",
]);
const DEMO_CHAT_LIMITS = {
  messageCharacters: DEMO_MESSAGE_MAX_CHARACTERS,
  historyMessages: DEMO_HISTORY_MAX_MESSAGES,
  conversationIdCharacters: DEMO_CONVERSATION_ID_MAX_CHARACTERS,
} satisfies DemoChatRequestLimits;
const MAX_REQUEST_BYTES = calculateDemoChatMaxRequestBytes(DEMO_CHAT_LIMITS);

type JsonRecord = Record<string, unknown>;
type RateLimitEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateLimitEntry>();

function upstreamHeaders(
  includeJsonBody = false,
  canaryToken: string | null = null,
) {
  const headers: Record<string, string> = { Accept: "application/json" };
  const apiKey = process.env.PRIVATE_AI_DEMO_API_KEY?.trim();

  if (includeJsonBody) {
    headers["Content-Type"] = "application/json";
  }

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  if (canaryToken) {
    headers["X-ALVOREM-Canary-Token"] = canaryToken;
  }

  return headers;
}

function json(payload: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return NextResponse.json(payload, {
    status,
    headers: { "Cache-Control": "no-store", ...extraHeaders },
  });
}

function rateLimit(request: NextRequest) {
  const now = Date.now();

  if (rateLimitStore.size > 1_000) {
    for (const [key, entry] of rateLimitStore) {
      if (entry.resetAt <= now) rateLimitStore.delete(key);
    }
  }

  const clientKey =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous";
  const current = rateLimitStore.get(clientKey);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return null;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1_000));
  }

  current.count += 1;
  return null;
}

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function readJson(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

function unwrapStagingCanaryResponse(payload: unknown) {
  if (!isRecord(payload)) return null;

  const fields = new Set(Object.keys(payload));
  const expectedFields = [
    "response",
    "grounded_text",
    "grounded_mode",
    "orem_reasoning_used",
    "orem_fallback_reason",
  ];

  if (
    fields.size !== expectedFields.length ||
    !expectedFields.every((field) => fields.has(field)) ||
    !isRecord(payload.response) ||
    !(
      payload.grounded_text === null ||
      typeof payload.grounded_text === "string"
    ) ||
    !["none", "d1", "d2"].includes(String(payload.grounded_mode)) ||
    typeof payload.orem_reasoning_used !== "boolean" ||
    !(
      payload.orem_fallback_reason === null ||
      typeof payload.orem_fallback_reason === "string"
    )
  ) {
    return null;
  }

  return payload.response;
}

function isRecord(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function normalizeProfiles(payload: unknown) {
  if (!Array.isArray(payload)) return null;

  const profiles = payload.flatMap((profile) => {
    if (
      !isRecord(profile) ||
      typeof profile.industry !== "string" ||
      !SUPPORTED_INDUSTRIES.has(profile.industry) ||
      typeof profile.display_name !== "string" ||
      typeof profile.description !== "string" ||
      profile.synthetic_only !== true ||
      !isStringArray(profile.suggested_prompts)
    ) {
      return [];
    }

    return [{
      industry: profile.industry,
      display_name: profile.display_name,
      description: profile.description,
      synthetic_only: true,
      suggested_prompts: profile.suggested_prompts.slice(0, 6),
    }];
  });

  return profiles.length > 0 ? profiles : null;
}

function upstreamFailure(status: number) {
  if (status === 429) {
    return json({ error: "The demo is busy. Please try again in a moment." }, 429);
  }

  if (status >= 400 && status < 500) {
    return json({ error: "ALVO could not answer that question. Try rephrasing it." }, 400);
  }

  return json({ error: "The ALVO demo is temporarily unavailable." }, 503);
}

export async function GET(request: NextRequest) {
  const baseUrl = resolveDemoApiBaseUrl({
    hostname: request.nextUrl.hostname,
    configuredUrl: process.env.PRIVATE_AI_DEMO_API_URL,
    development: process.env.NODE_ENV === "development",
  });

  if (!baseUrl) {
    return json({ error: "Demo service is not configured." }, 503);
  }

  try {
    const response = await fetchWithTimeout(`${baseUrl}/v1/demo/profiles`, {
      headers: upstreamHeaders(),
    });

    if (!response.ok) return upstreamFailure(response.status);

    const profiles = normalizeProfiles(await readJson(response));
    if (!profiles) return json({ error: "The demo returned an invalid response." }, 502);

    return json(profiles);
  } catch {
    return json({ error: "The ALVO demo is temporarily unavailable." }, 503);
  }
}

export async function POST(request: NextRequest) {
  const baseUrl = resolveDemoApiBaseUrl({
    hostname: request.nextUrl.hostname,
    configuredUrl: process.env.PRIVATE_AI_DEMO_API_URL,
    development: process.env.NODE_ENV === "development",
  });

  if (!baseUrl) {
    return json({ error: "Demo service is not configured." }, 503);
  }

  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return json({ error: "Cross-site requests are not allowed." }, 403);
  }

  const retryAfter = rateLimit(request);
  if (retryAfter) {
    return json(
      { error: "The demo is busy. Please try again in a moment." },
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ error: "Content-Type must be application/json." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return json({ error: "Request body is too large." }, 413);
  }

  let serializedBody: string;

  try {
    serializedBody = await request.text();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  if (new TextEncoder().encode(serializedBody).byteLength > MAX_REQUEST_BYTES) {
    return json({ error: "Request body is too large." }, 413);
  }

  let body: unknown;

  try {
    body = JSON.parse(serializedBody) as unknown;
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const validated = validateDemoChatRequest(
    body,
    SUPPORTED_INDUSTRIES,
    DEMO_CHAT_LIMITS,
  );

  if (!validated.ok) {
    if (validated.reason === "invalid_message") {
      return json(
        {
          error:
            `Message must contain 1-${DEMO_MESSAGE_MAX_CHARACTERS} characters.`,
        },
        400,
      );
    }
    return json(
      { error: "Choose a valid industry and enter a valid conversation." },
      400,
    );
  }

  try {
    const upstreamTarget = resolveDemoChatUpstreamTarget({
      baseUrl,
      stagingCanaryEnabled: isCloudflarePreviewHostname(
        request.nextUrl.hostname,
      ),
      stagingCanaryToken:
        process.env.PRIVATE_AI_DEMO_STAGING_CANARY_TOKEN,
    });
    const response = await fetchWithTimeout(
      `${baseUrl}${upstreamTarget.path}`,
      {
        method: "POST",
        headers: upstreamHeaders(true, upstreamTarget.canaryToken),
        body: JSON.stringify(buildDemoChatUpstreamRequest(validated.value)),
      },
    );

    if (!response.ok) return upstreamFailure(response.status);

    const rawPayload = await readJson(response);
    const normalizedPayload = upstreamTarget.canaryToken
      ? unwrapStagingCanaryResponse(rawPayload)
      : rawPayload;

    if (!normalizedPayload) {
      return json({ error: "The demo returned an invalid response." }, 502);
    }

    const result = normalizeDemoChatGatewayResponse(normalizedPayload, {
      industry: validated.value.industry,
      message: validated.value.message,
      conversationId: validated.value.conversation_id,
      conversationIdCharacters: DEMO_CONVERSATION_ID_MAX_CHARACTERS,
    });

    return json(result.body, result.status);
  } catch {
    return json({ error: "The ALVO demo is temporarily unavailable." }, 503);
  }
}
