import { NextResponse } from "next/server";

const intents = new Set(["alvo", "orem", "private", "unsure"]);
const locales = new Set(["en", "ro"]);

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_json" }, { status: 400 });
  }

  // Honeypot: answer success without forwarding bot submissions.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 160).toLowerCase();
  const company = clean(body.company, 120);
  const message = clean(body.message, 3000);
  const intent = clean(body.intent, 20);
  const source = clean(body.source, 80) || "direct";
  const locale = clean(body.locale, 4) || "en";

  if (!name || !company || message.length < 20 || !validEmail(email)) {
    return NextResponse.json({ ok: false, code: "invalid_input" }, { status: 400 });
  }
  if (!intents.has(intent) || !locales.has(locale)) {
    return NextResponse.json({ ok: false, code: "invalid_input" }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, code: "contact_not_configured" }, { status: 503 });
  }

  let parsedWebhook: URL;
  try {
    parsedWebhook = new URL(webhookUrl);
  } catch {
    return NextResponse.json({ ok: false, code: "contact_not_configured" }, { status: 503 });
  }
  if (parsedWebhook.protocol !== "https:") {
    return NextResponse.json({ ok: false, code: "contact_not_configured" }, { status: 503 });
  }

  const payload = {
    type: "alvorem.website.lead",
    submitted_at: new Date().toISOString(),
    name,
    email,
    company,
    intent,
    message,
    source,
    locale,
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "ALVOREM-Website/1.0",
  };
  const bearer = process.env.CONTACT_WEBHOOK_BEARER_TOKEN?.trim();
  if (bearer) headers.Authorization = `Bearer ${bearer}`;

  try {
    const response = await fetch(parsedWebhook, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
