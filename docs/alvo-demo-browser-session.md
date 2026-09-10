# ALVO demo browser session

The homepage demo now has a small browser-session foundation for the future
`POST /v1/demo/chat` integration:

`browser tab -> conversation ID + bounded history -> future chat request`

- History contains only user questions and safe user-facing ALVO response text.
- History is capped at 8 chronological user/assistant messages.
- Every persisted message is non-blank and at most 500 characters.
- The backend remains authoritative for `conversation_id`; the browser does not invent one.
- State uses `sessionStorage` under `alvorem:alvo-demo-session:v1` only.
- Restored JSON is treated as untrusted and discarded unless its complete shape is valid.
- Reset removes the conversation ID, history, and sessionStorage entry without reloading.
- This is not personal memory and has no cookies, localStorage, account, or server persistence.
- Team Trace, routing/provider output, prompts, provenance, token usage, credentials, headers,
  raw errors, and internal AI metadata are never stored as conversation history.

This step does not connect `/v1/demo/chat`; the existing public demo transport and visual
experience remain unchanged until the next integration step.
