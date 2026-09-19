# ALVO demo browser session

The homepage demo keeps a **bounded same-tab conversation session** for the public
synthetic demo:

`browser tab -> conversation ID + safe transcript state -> /api/demo -> backend /v1/demo/chat`

## What is persisted

The browser stores only presentation-safe state in `sessionStorage` under
`alvorem:alvo-demo-session:v1`:

- authoritative backend `conversation_id`;
- at most 8 chronological user/assistant messages;
- user message text;
- ALVO headline + summary;
- up to 4 displayed KPI label/value pairs;
- synthetic provenance references;
- public disclaimer;
- presentation-safe typed `priorResultContext` required for bounded entity-aware follow-ups.

Every stored message remains bounded. Restored JSON is treated as untrusted and is
discarded unless the complete expected shape validates.

## What is never persisted

The browser session must never contain:

- Team Trace;
- routing/model/provider metadata;
- prompts or hidden reasoning;
- token/cost internals;
- credentials or authorization headers;
- database/real-data paths;
- raw provider/model errors;
- arbitrary tool output.

The server-side proxy remains responsible for normalizing the backend response to
the presentation contract before anything reaches browser state.

## Visible transcript

The homepage renders the bounded session as a visible user + ALVO transcript rather
than replacing the previous response.

Each ALVO turn restores from presentation-safe browser state after same-tab reload.
The transcript scrolls internally to the latest turn so the surrounding homepage
does not jump.

## Continuation metadata

P1.2F added bounded typed ranked-entity continuation context to the backend.
The website carries only the safe public envelope returned by the proxy:

- Client Brain id;
- capability id;
- metric/dimension ids;
- selected entity ref;
- bounded entity/result refs.

It is sent back only on assistant history messages. The backend re-validates it
against the active Client Brain, execution contract and canonical deterministic
synthetic result. Browser state is not authoritative.

## Language UX

The homepage accepts free-form Romanian or English input. The frontend does not
translate business facts or rewrite backend answers. Language understanding and
answer wording remain backend responsibilities.

The compatibility request locale sent upstream remains the backend-supported
metadata value; it is not an instruction that restricts the user's input language.

## Reset and persistence boundary

`New conversation` explicitly clears:

- conversation ID;
- transcript history;
- continuation metadata;
- sessionStorage entry.

This is not personal memory and has no cookies, localStorage, account persistence or
server-side memory.

## Non-goals

This browser session does not:

- remove Coming Soon / launch the public site;
- enable production or real-data access;
- activate a provider/model;
- create persistent cross-tab or account memory;
- grant write/action capability.
