# ALVOREM Website

Public brand, portfolio, B2B and founder/career platform for ALVOREM.

## Direction

**Your business, simpler.**

ALVOREM builds AI agents around each client’s business so people can ask, report and automate without adding more complexity to their day.

## Stack

- Next.js (App Router)
- TypeScript
- CSS design tokens / responsive motion
- No CMS in V1
- Static-first; AI interaction later

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current V1 shell

- responsive navigation
- responsive clarity-halo ALVOREM wordmark and favicon
- matching light and dark themes with saved system preference
- self-hosted Montserrat and Lora brand typography
- clear AI-agent product demonstration in the hero
- ALVO as the current clear, calm public demo and OREM as the upcoming deeper agent
- human-centered capability story with original photography
- concise Ask / Report / Automate offer
- three-step project journey and conversation CTA
- production metadata
- reduced-motion accessibility support

## Guardrails

- No fake clients, logos or testimonials.
- No confidential employer/client data.
- Public case studies use synthetic, anonymized or explicitly approved material.
- Product claims must match capabilities that are actually built and validated.
- OREM remains labelled "Coming next" until the public demo API supports a distinct OREM mode.

## Synthetic homepage demo

Set `PRIVATE_AI_DEMO_API_URL` on the website server to connect the public synthetic demo. If the upstream service is protected, also set `PRIVATE_AI_DEMO_API_KEY`; it is forwarded server-to-server as a bearer token and is never exposed to the browser.

The website bridge validates industries and response shapes, rejects oversized or cross-site submissions, normalizes upstream errors and applies a small per-instance request limit. Keep a distributed rate limit on the deployed edge or demo API as the production source of truth.

## Domains

- `alvorem.ro` — primary domain
- `alvorem.ai` — optional future acquisition

Canonical routing is intentionally not locked yet.
