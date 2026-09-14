# Retail demo browser checkpoint — 14 September 2026

## Scope and verdict

The deployed website-to-backend Retail path works for the six supported English analytics capabilities. This is a staging checkpoint, not a client-ready sign-off. Romanian questions and ambiguous metric-preserving follow-ups are not ready.

- Public https://alvorem.ro/ was observed rendering the intentional Coming Soon page.
- Tested preview: https://13d18001-alvorem-website.untaruandrei22.workers.dev/
- Preview website commit from Cloudflare's PR #62 deployment comment: `900606c88aaf4a1048fa28130a32f7b6c214d9c3`.
- Website main inspected: `3a69861fecc20e2bbcc71dddd375e5ebd32c936d`.
- Backend source inspected: `083d109b85c90659b9f7a57d10da967062f8e735`. The deployed Railway commit was not independently attested.
- All requests were submitted using the browser UI, sequentially in one tab. The first question used a suggested-question button; subsequent questions used the composer.

## Ten-question matrix

Times are approximate click-to-completion browser timings, including automation overhead. They are not backend latency measurements. The first question was not timed. No model cost or provider mode was observable from the browser.

| # | Question | Visible result | Time | Assessment |
|---|---|---|---|---|
| 1 | How are stores performing this month? | Revenue 1,524,520 RON; target 1,541,566 RON; attainment 98.9%; margin 38.7% | Not measured | Pass |
| 2 | What about margin? | Brasov Mountain lowest margin, 33.9% | 2.564 s | Pass for approved capability follow-up |
| 3 | Which stores are furthest below target? | Bucharest North −18,860 RON; Galati Riverside −11,730 RON; Bucharest Central −8,740 RON | 0.510 s | Pass |
| 4 | Which stores have the highest revenue? | Bucharest Central 243,630 RON; Cluj Center 226,760 RON; Bucharest North 215,630 RON | 2.948 s | Pass |
| 5 | And the weakest? | Returns target variance, led by Bucharest North | 3.136 s | Product limitation: changes metric after revenue ranking |
| 6 | How is revenue trending? | Latest 1,524,520 RON; previous 1,491,260 RON; +2.2% | 0.835 s | Pass |
| 7 | And inventory? | Iasi East Electronics: 72 units sold, 16 stock, 0.22x coverage | 2.847 s | Pass for approved capability follow-up |
| 8 | How many employees do we have? | Safe clarification, no invented employee count, zero sources | 3.244 s | Safe refusal; recovery suggestions missing |
| 9 | Which stores are furthest below target? | Correct target variance answer after unsupported question | 2.718 s | Recovery pass |
| 10 | Cum performează magazinele luna aceasta? | Safe clarification in English | 3.157 s | Romanian unsupported; guidance missing |

Synthetic/read-only labels and the no-real-company-data disclaimer were present in every resulting card. No transport error occurred in this run. This does not establish timeout, outage, or rate-limit recovery.

## Numeric cross-check

Independently regenerated the 384 synthetic records from the inspected backend's `demo_retail.py` generator, using its standard-library-only data-generation definitions. There are 64 August records. Recomputed totals, store revenue, target gaps, margins, July revenue and Iasi Electronics stock match the browser values above. This is a numerical consistency check, not a full backend regression run.

The lowest-revenue store is Galati Riverside (141,510 RON), illustrating why question 5 cannot be presented as preserving the previous ranking metric.

## Small website recovery change

- A visible New conversation control uses the existing session reset helper to clear conversation ID, history, answer, error and composer without reloading.
- Reset and request controls remain disabled while restoring the browser session or awaiting a response.
- English-only question guidance appears in both UI languages and is associated with the textarea for accessibility.
- Existing approved profile suggestions reappear after clarification or an error.
- Backend routing, normalization and the public Coming Soon gate are unchanged.

## Remaining release gates

1. Review and validate the recovery change on its deployed preview, including reset after a successful follow-up and a fresh follow-up without prior context.
2. Verify mobile layout on a phone or supported mobile viewport; desktop browser results do not establish mobile QA.
3. Decide whether ambiguous ranking follow-ups should clarify or preserve the prior metric. Implement in the authoritative backend as a separate change.
4. Record the actual deployed backend commit and runtime mode, then measure model cost and fallback behavior server-side.
5. Rehearse timeout/outage recovery and record a short demonstration after the remaining gates pass.
6. Verify required CI checks in repository settings. The workflow exists, but its existence does not establish branch-protection enforcement.

Do not mark the entire client-ready milestone Done from this checkpoint. Notion reconciliation, branch-protection changes, public launch and A5 activation were not performed by this change.
