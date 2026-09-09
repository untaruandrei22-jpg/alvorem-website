# Cloudflare Next.js 16 preview result — 8 Sep 2026

## Result
PASS — non-production Worker version upload succeeded for commit `89139aff3f5b9aacd02dcefb2f7c434deb19b367` on branch `fix/cloudflare-next-worker`.

## Validated command

```sh
npx wrangler setup --yes --build && npx wrangler versions upload
```

## Observed Cloudflare setup
Wrangler 4.130.0 detected Next.js 16.3.4 and configured the project with the OpenNext Cloudflare adapter (`@opennextjs/cloudflare` 1.20.6) in the ephemeral build workspace.

The setup created/updated the expected Worker deployment artifacts/configuration, including:
- `wrangler.jsonc`
- `open-next.config.ts`
- `.dev.vars` in the ephemeral workspace
- `public/_headers`
- package scripts for OpenNext preview/deploy
- `.open-next/worker.js`
- `.open-next/assets`

## Deployment evidence
- OpenNext build completed.
- Worker saved at `.open-next/worker.js`.
- 18 changed assets uploaded successfully; 102 were already present.
- Worker uploaded successfully.
- Worker Version ID: `8b35cefa-10bd-4da9-b321-9e0b5b886aef`.
- Preview URL: `https://8b35cefa-alvorem-website.untaruandrei22.workers.dev`.
- Branch alias: `https://fix-cloudflare-next-worker-alvorem-website.untaruandrei22.workers.dev`.
- Active production traffic remained on `main`; the preview version was not promoted.

## Warning observed
OpenNext reported that cache setup was not completed automatically. Persistent OpenNext configuration should explicitly review cache configuration before treating the adapter migration as final architecture.

## Decision boundary
This validates the non-production deployment path and resolves the original missing-entry-point diagnosis. It does **not** by itself approve promotion of the preview version or a permanent adapter migration. Production command/settings remain human-gated.
