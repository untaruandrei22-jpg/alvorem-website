# Cloudflare OpenNext migration notes

These notes capture the exact behavior observed from Cloudflare Wrangler automatic setup on 8 Sep 2026 for this repository.

## Observed versions
- Next.js 16.3.4
- Wrangler 4.130.0
- @opennextjs/cloudflare 1.20.6
- @opennextjs/aws 4.1.4
- compatibility date 2026-09-08

## Generated deployment shape
The successful ephemeral setup used the OpenNext Cloudflare adapter and produced a Worker at `.open-next/worker.js` with static assets under `.open-next/assets`.

Expected persistent configuration therefore needs to account for:
- Worker main entry: `.open-next/worker.js`
- `nodejs_compat`
- assets directory `.open-next/assets`
- assets binding `ASSETS`
- `open-next.config.ts`
- OpenNext build step before Wrangler upload/deploy

## Cache note
Automatic migration warned that cache setup was not completed and must be reviewed manually before considering a permanent adapter migration finished.

## Secret handling
The ephemeral migration created `.dev.vars`. This file must not be committed. Real credentials/secrets remain Cloudflare-managed and outside Git.

## Production safety
The successful preview used `wrangler versions upload`; it did not promote the version to production traffic. Production promotion remains a separate human-gated step.
