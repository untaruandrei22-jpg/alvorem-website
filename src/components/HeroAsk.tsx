"use client";

import { FormEvent, useState } from "react";

const prompts = ["Show me what you do", "Real client results", "Build an AI agent", "Our approach"];

export function HeroAsk() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  function submit(event: FormEvent) { event.preventDefault(); if (!value.trim()) return; setStatus("Great question — open a project conversation and we’ll explore it together."); }
  return <div className="ask-wrap" id="ask"><form className="ask-bar" onSubmit={submit}><span aria-hidden="true">✦</span><label className="sr-only" htmlFor="alvorem-question">Ask ALVOREM anything</label><input id="alvorem-question" value={value} onChange={(e) => { setValue(e.target.value); setStatus(""); }} placeholder="Ask Alvorem anything..." /><button type="submit" aria-label="Submit question">→</button></form><div className="ask-prompts"><small>TRY</small>{prompts.map((prompt) => <button type="button" key={prompt} onClick={() => { setValue(prompt); setStatus(""); }}>{prompt}</button>)}</div>{status && <p className="ask-status" role="status">{status} <a href="mailto:hello@alvorem.ro?subject=ALVOREM%20question">Start here →</a></p>}</div>;
}
