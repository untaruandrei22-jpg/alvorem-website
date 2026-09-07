"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Logo } from "@/components/Logo";
import styles from "./HomeAgentDemo.module.css";

type DemoProfile = {
  industry: string;
  display_name: string;
  description: string;
  synthetic_only: true;
  suggested_prompts: string[];
};

type DemoAnswer = {
  industry: string;
  industry_display_name: string;
  action: "answer" | "clarification";
  question: string;
  capability: string | null;
  data_month: string | null;
  headline: string;
  summary: string;
  kpis: { label: string; value: string }[];
  details: string[];
  provenance: string[];
  disclaimer: string;
  suggested_prompts: string[];
};

const industries = [
  ["retail", "Retail"],
  ["manufacturing", "Manufacturing"],
  ["professional_services", "Professional services"],
  ["hospitality", "Hospitality"],
  ["ecommerce", "E-commerce"],
  ["logistics_distribution", "Logistics & distribution"],
  ["healthcare_operations", "Healthcare operations"],
  ["construction_real_estate", "Construction & real estate"],
] as const;

const retailPrompts = [
  "How are stores performing this month?",
  "Which stores are furthest below target?",
  "What needs my attention today?",
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

export function HomeAgentDemo() {
  const [activeIndustry, setActiveIndustry] = useState("retail");
  const [availableIndustries, setAvailableIndustries] = useState<Set<string>>(
    () => new Set(["retail"]),
  );
  const [promptsByIndustry, setPromptsByIndustry] = useState<Record<string, string[]>>({
    retail: retailPrompts,
  });
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<DemoAnswer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfiles() {
      try {
        const response = await fetch("/api/demo", { cache: "no-store" });
        if (!response.ok) return;

        const profiles = (await response.json()) as DemoProfile[];
        if (cancelled || !Array.isArray(profiles)) return;

        setAvailableIndustries(new Set(profiles.map((profile) => profile.industry)));
        setPromptsByIndustry(
          Object.fromEntries(
            profiles.map((profile) => [profile.industry, profile.suggested_prompts]),
          ),
        );
      } catch {
        // Keep the Retail fallback visible; submission will surface availability errors.
      }
    }

    void loadProfiles();
    return () => {
      cancelled = true;
    };
  }, []);

  const prompts = useMemo(
    () => promptsByIndustry[activeIndustry] ?? [],
    [activeIndustry, promptsByIndustry],
  );

  async function ask(nextQuestion: string) {
    const cleaned = nextQuestion.trim();
    if (!cleaned || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: activeIndustry,
          question: cleaned,
        }),
      });

      const payload = (await response.json()) as DemoAnswer | { error?: string };

      if (!response.ok || !("headline" in payload)) {
        throw new Error("error" in payload && payload.error ? payload.error : "Demo unavailable.");
      }

      setAnswer(payload);
      setQuestion("");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Demo service is temporarily unavailable.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(question);
  }

  function selectIndustry(industry: string) {
    if (!availableIndustries.has(industry)) return;
    setActiveIndustry(industry);
    setAnswer(null);
    setError(null);
    setQuestion("");
  }

  return (
    <div className="agent-card">
      <div className="agent-card__header">
        <div className={styles.demoHeader}>
          <Logo compact inverse />
          <span className={styles.demoBadge}>Synthetic demo</span>
        </div>
      </div>

      <div className="agent-card__body">
        <span className="agent-orb" aria-hidden="true" />
        <h2>Pick your business.</h2>
        <p>Ask a real ALVOREM agent about fictional business data.</p>

        <span className={styles.industryLabel}>Business type</span>
        <div className={styles.industryGrid} aria-label="Choose demo industry">
          {industries.map(([industry, label]) => {
            const available = availableIndustries.has(industry);
            const active = activeIndustry === industry;

            return (
              <button
                key={industry}
                type="button"
                disabled={!available}
                aria-pressed={active}
                title={available ? `Use ${label} demo` : `${label} demo coming next`}
                className={`${styles.industryButton} ${active ? styles.industryButtonActive : ""}`}
                onClick={() => selectIndustry(industry)}
              >
                {label}
              </button>
            );
          })}
        </div>

        {prompts.length > 0 && (
          <div className={styles.promptList} aria-label="Suggested questions">
            {prompts.slice(0, 3).map((prompt) => (
              <button
                key={prompt}
                type="button"
                className={styles.promptButton}
                disabled={loading}
                onClick={() => void ask(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {answer && (
          <div className={styles.responseCard} aria-live="polite">
            <p className={styles.responseHeadline}>{answer.headline}</p>
            <p className={styles.responseSummary}>{answer.summary}</p>

            {answer.kpis.length > 0 && (
              <div className={styles.kpis}>
                {answer.kpis.slice(0, 4).map((kpi) => (
                  <div className={styles.kpi} key={`${kpi.label}-${kpi.value}`}>
                    <span>{kpi.label}</span>
                    <strong>{kpi.value}</strong>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.proofRow}>
              <span>{answer.provenance.length} source{answer.provenance.length === 1 ? "" : "s"} checked</span>
              <span>Synthetic data</span>
              <span>Read only</span>
            </div>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="home-agent-question">
            Ask the ALVOREM demo agent a question
          </label>
          <input
            id="home-agent-question"
            className={styles.input}
            value={question}
            maxLength={300}
            disabled={loading}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about sales, target, margin, stock…"
          />
          <button
            className={styles.sendButton}
            type="submit"
            disabled={loading || !question.trim()}
            aria-label={loading ? "Agent is answering" : "Ask demo agent"}
          >
            <ArrowIcon />
          </button>
        </form>

        {error && <p className={styles.error} role="alert">{error}</p>}
        <small className={styles.status}>
          {loading ? "Checking the synthetic business data…" : "No real company data is used in this demo."}
        </small>
      </div>
    </div>
  );
}
