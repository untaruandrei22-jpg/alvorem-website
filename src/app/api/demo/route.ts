import { NextRequest, NextResponse } from "next/server";

const DEVELOPMENT_DEMO_API = "http://127.0.0.1:8000";
const MAX_QUESTION_LENGTH = 300;
const MAX_REQUEST_BYTES = 4_096;
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

type JsonRecord = Record<string, unknown>;
type RateLimitEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateLimitEntry>();

function resolveDemoApiBaseUrl() {
  const configured = process.env.PRIVATE_AI_DEMO_API_URL?.trim();

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return DEVELOPMENT_DEMO_API;
  }

  return null;
}

function upstreamHeaders(includeJsonBody = false) {
  const headers: Record<string, string> = { Accept: "application/json" };
  const apiKey = process.env.PRIVATE_AI_DEMO_API_KEY?.trim();

  if (includeJsonBody) {
    headers["Content-Type"] = "application/json";
  }

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
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

function normalizeAnswer(payload: unknown) {
  if (
    !isRecord(payload) ||
    typeof payload.industry !== "string" ||
    typeof payload.industry_display_name !== "string" ||
    (payload.action !== "answer" && payload.action !== "clarification") ||
    typeof payload.question !== "string" ||
    !(typeof payload.capability === "string" || payload.capability === null) ||
    !(typeof payload.data_month === "string" || payload.data_month === null) ||
    typeof payload.headline !== "string" ||
    typeof payload.summary !== "string" ||
    !Array.isArray(payload.kpis) ||
    !isStringArray(payload.details) ||
    !isStringArray(payload.provenance) ||
    typeof payload.disclaimer !== "string" ||
    !isStringArray(payload.suggested_prompts)
  ) {
    return null;
  }

  const kpis = payload.kpis.flatMap((kpi) => {
    if (!isRecord(kpi) || typeof kpi.label !== "string" || typeof kpi.value !== "string") {
      return [];
    }

    return [{ label: kpi.label, value: kpi.value }];
  });

  return {
    industry: payload.industry,
    industry_display_name: payload.industry_display_name,
    action: payload.action,
    question: payload.question,
    capability: payload.capability,
    data_month: payload.data_month,
    headline: payload.headline,
    summary: payload.summary,
    kpis: kpis.slice(0, 8),
    details: payload.details.slice(0, 8),
    provenance: payload.provenance.slice(0, 12),
    disclaimer: payload.disclaimer,
    suggested_prompts: payload.suggested_prompts.slice(0, 6),
  };
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

export async function GET() {
  const baseUrl = resolveDemoApiBaseUrl();

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
  const baseUrl = resolveDemoApiBaseUrl();

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

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  if (!isRecord(body)) {
    return json({ error: "Invalid request." }, 400);
  }

  const { industry, question } = body;

  if (
    typeof industry !== "string" ||
    !SUPPORTED_INDUSTRIES.has(industry) ||
    typeof question !== "string"
  ) {
    return json({ error: "Choose a valid industry and enter a question." }, 400);
  }

  const cleanedQuestion = question.trim();

  if (!cleanedQuestion || cleanedQuestion.length > MAX_QUESTION_LENGTH) {
    return json(
      { error: `Question must contain 1-${MAX_QUESTION_LENGTH} characters.` },
      400,
    );
  }

  try {
    const response = await fetchWithTimeout(`${baseUrl}/v1/demo`, {
      method: "POST",
      headers: upstreamHeaders(true),
      body: JSON.stringify({
        industry,
        question: cleanedQuestion,
      }),
    });

    if (!response.ok) return upstreamFailure(response.status);

    const answer = normalizeAnswer(await readJson(response));
    if (!answer) return json({ error: "The demo returned an invalid response." }, 502);

    return json(answer);
  } catch {
    return json({ error: "The ALVO demo is temporarily unavailable." }, 503);
  }
}
