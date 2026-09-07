import { NextRequest, NextResponse } from "next/server";

const DEVELOPMENT_DEMO_API = "http://127.0.0.1:8000";
const MAX_QUESTION_LENGTH = 300;
const REQUEST_TIMEOUT_MS = 6000;

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

export async function GET() {
  const baseUrl = resolveDemoApiBaseUrl();

  if (!baseUrl) {
    return NextResponse.json(
      { error: "Demo service is not configured." },
      { status: 503 },
    );
  }

  try {
    const response = await fetchWithTimeout(`${baseUrl}/v1/demo/profiles`);
    const payload = await response.json();

    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "Demo service is temporarily unavailable." },
      { status: 503 },
    );
  }
}

export async function POST(request: NextRequest) {
  const baseUrl = resolveDemoApiBaseUrl();

  if (!baseUrl) {
    return NextResponse.json(
      { error: "Demo service is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { industry, question } = body as {
    industry?: unknown;
    question?: unknown;
  };

  if (typeof industry !== "string" || typeof question !== "string") {
    return NextResponse.json(
      { error: "industry and question are required." },
      { status: 400 },
    );
  }

  const cleanedQuestion = question.trim();

  if (!cleanedQuestion || cleanedQuestion.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: `Question must contain 1-${MAX_QUESTION_LENGTH} characters.` },
      { status: 400 },
    );
  }

  try {
    const response = await fetchWithTimeout(`${baseUrl}/v1/demo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        industry,
        question: cleanedQuestion,
      }),
    });

    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "Demo service is temporarily unavailable." },
      { status: 503 },
    );
  }
}
