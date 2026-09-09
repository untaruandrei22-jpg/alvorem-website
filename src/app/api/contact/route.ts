import { NextResponse } from "next/server";

const intents = new Set(["alvo", "orem", "private", "unsure"]);
const locales = new Set(["en", "ro"]);

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type LeadPayload = {
  type: "alvorem.website.lead";
  submitted_at: string;
  name: string;
  email: string;
  company: string;
  intent: string;
  message: string;
  source: string;
  locale: string;
};

async function deliverWithResend(payload: LeadPayload, apiKey: string) {
  const to = process.env.CONTACT_TO_EMAIL?.trim() || "hello@alvorem.ro";
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "ALVOREM <hello@alvorem.ro>";
  const subject = `New ALVOREM lead — ${singleLine(payload.company || payload.name)}`;
  const text = [
    "New ALVOREM website conversation",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company}`,
    `Interest: ${payload.intent}`,
    `Source: ${payload.source}`,
    `Locale: ${payload.locale}`,
    `Submitted: ${payload.submitted_at}`,
    "",
    "What they want to simplify:",
    payload.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `alvorem-lead-${crypto.randomUUID()}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      reply_to: payload.email,
      tags: [
        { name: "source", value: payload.source.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 256) || "direct" },
        { name: "intent", value: payload.intent },
      ],
    }),
    redirect: "error",
    signal: AbortSignal.timeout(8000),
  });

  return response.ok;
}

async function deliverWithWebhook(payload: LeadPayload, webhookUrl: string) {
  let parsedWebhook: URL;
  try {
    parsedWebhook = new URL(webhookUrl);
  } catch {
    return false;
  }
  if (parsedWebhook.protocol !== "https:") return false;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "ALVOREM-Website/1.0",
  };
  const bearer = process.env.CONTACT_WEBHOOK_BEARER_TOKEN?.trim();
  if (bearer) headers.Authorization = `Bearer ${bearer}`;

  const response = await fetch(parsedWebhook, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    redirect: "error",
    signal: AbortSignal.timeout(8000),
  });

  return response.ok;
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

  const payload: LeadPayload = {
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

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (!resendApiKey && !webhookUrl) {
    return NextResponse.json({ ok: false, code: "contact_not_configured" }, { status: 503 });
  }

  try {
    if (resendApiKey && await deliverWithResend(payload, resendApiKey)) {
      return NextResponse.json({ ok: true, delivery: "email" });
    }

    // Keep the webhook path as a secondary delivery route if configured.
    if (webhookUrl && await deliverWithWebhook(payload, webhookUrl)) {
      return NextResponse.json({ ok: true, delivery: "webhook" });
    }
  } catch {
    // Deliberately do not log lead PII. The client will offer its prefilled email fallback.
  }

  return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
}
