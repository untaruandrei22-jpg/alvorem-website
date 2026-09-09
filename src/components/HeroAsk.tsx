"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const prompts = ["Show me what you do", "Real client results", "Build an AI agent", "Our approach"];

export function HeroAsk() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const question = value.trim();
    if (!question) return;
    router.push(`/start?source=hero-ask&message=${encodeURIComponent(question)}`);
  }

  return (
    <div className="ask-wrap" id="ask">
      <form className="ask-bar" onSubmit={submit}>
        <span aria-hidden="true">✦</span>
        <label className="sr-only" htmlFor="alvorem-question">Ask ALVOREM anything</label>
        <input
          id="alvorem-question"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ask Alvorem anything..."
        />
        <button type="submit" aria-label="Submit question">→</button>
      </form>
      <div className="ask-prompts">
        <small>TRY</small>
        {prompts.map((prompt) => (
          <button type="button" key={prompt} onClick={() => setValue(prompt)}>{prompt}</button>
        ))}
      </div>
    </div>
  );
}
