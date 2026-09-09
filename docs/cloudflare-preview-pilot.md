# Cloudflare preview pilot

Issue: #29

Purpose: validate the Cloudflare Workers deployment path for the existing Next.js 16 application without changing product or visual code and without promoting a feature branch to production.

## Confirmed root cause

`next build` succeeds. The non-production deploy step fails at:

`npx wrangler versions upload`

because the repository has not yet been configured with a Worker entry point / assets output / Wrangler configuration.

## Safe validation plan

For non-production branches only, temporarily use:

`npx wrangler setup --yes --build && npx wrangler versions upload`

Rationale:
- `wrangler setup` performs Cloudflare automatic framework configuration without deploying.
- For Next.js 16, Cloudflare automatic configuration uses vinext.
- `--build` builds the configured Worker output.
- `wrangler versions upload` then uploads a preview version without promoting it as the active production deployment.

This is a reversible compatibility test in the Cloudflare build environment. It does not authorize a production adapter migration by itself.

## Acceptance

If the preview succeeds, capture the preview URL and build log, then create/accept a persistent repository configuration via a dedicated infrastructure PR before production rollout.

If the preview fails, capture the first actionable error and keep PR #27 blocked.
