"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import { Logo } from "@/components/Logo";
import { buildDemoChatBrowserRequest } from "@/lib/alvo-demo-chat";
import {
  DEMO_MESSAGE_MAX_CHARACTERS,
  completeDemoConversationTurn,
  createEmptyDemoSession,
  isDemoSessionReadyForSubmission,
  resetDemoSession,
  restoreDemoSession,
  saveDemoSession,
  type DemoConversationLocale,
} from "@/lib/alvo-demo-session";
import styles from "./HomeAgentDemo.module.css";

type DemoProfile = {
  industry: string;
  display_name: string;
  description: string;
  synthetic_only: true;
  suggested_prompts: string[];
};

type DemoAnswer = {
  conversation_id: string;
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
  const { locale } = useLocale();
  const ro = locale === "ro";
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
  const sessionLocale: DemoConversationLocale = ro ? "ro" : "en";
  const [conversationSession, setConversationSession] = useState(() =>
    createEmptyDemoSession(sessionLocale),
  );
  const [sessionRestored, setSessionRestored] = useState(false);
  const initialSessionLocale = useRef(sessionLocale);

  useEffect(() => {
    const restored = restoreDemoSession(undefined, initialSessionLocale.current);
    setConversationSession({ ...restored, locale: initialSessionLocale.current });
    setSessionRestored(true);
  }, []);

  useEffect(() => {
    if (sessionRestored) {
      saveDemoSession({ ...conversationSession, locale: sessionLocale });
    }
  }, [conversationSession, sessionLocale, sessionRestored]);

  useEffect(() => {
    let cancelled = false;

    async function loadProfiles() {
      try {
        const response = await fetch("/api/demo", { cache: "no-store" });
        if (!response.ok) return;

        const profiles = (await response.json()) as DemoProfile[];
        if (cancelled || !Array.isArray(profiles)) return;

        const supportedProfiles = profiles.filter(
          (profile) =>
            industries.some(([industry]) => industry === profile.industry) &&
            Array.isArray(profile.suggested_prompts),
        );

        const firstProfile = supportedProfiles[0];
        if (!firstProfile) return;

        const nextIndustries = new Set(supportedProfiles.map((profile) => profile.industry));

        setAvailableIndustries(nextIndustries);
        setPromptsByIndustry(
          Object.fromEntries(
            supportedProfiles.map((profile) => [profile.industry, profile.suggested_prompts]),
          ),
        );
        setActiveIndustry((currentIndustry) =>
          nextIndustries.has(currentIndustry)
            ? currentIndustry
            : firstProfile.industry,
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

  const availableIndustryOptions = useMemo(
    () => industries.filter(([industry]) => availableIndustries.has(industry)),
    [availableIndustries],
  );

  async function ask(nextQuestion: string) {
    const cleaned = nextQuestion.trim();
    if (
      !cleaned ||
      !isDemoSessionReadyForSubmission(sessionRestored, loading)
    ) {
      return;
    }
    if (cleaned.length > DEMO_MESSAGE_MAX_CHARACTERS) {
      setError(
        `Message must contain 1-${DEMO_MESSAGE_MAX_CHARACTERS} characters.`,
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildDemoChatBrowserRequest({
          industry: activeIndustry,
          message: cleaned,
          conversationId: conversationSession.conversationId,
          history: conversationSession.history,
        })),
      });

      const payload = (await response.json()) as DemoAnswer | { error?: string };

      if (
        !response.ok ||
        !("headline" in payload) ||
        !("conversation_id" in payload) ||
        typeof payload.conversation_id !== "string"
      ) {
        throw new Error("error" in payload && payload.error ? payload.error : "Demo unavailable.");
      }

      setAnswer(payload);
      setConversationSession((current) =>
        completeDemoConversationTurn(
          current,
          payload.conversation_id,
          cleaned,
          payload.headline,
        ),
      );
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
    setConversationSession(resetDemoSession(undefined, sessionLocale));
  }

  function applyPrompt(prompt: string) {
    setQuestion(prompt);
    setAnswer(null);
    setError(null);
    void ask(prompt);
  }

  return (
    <div className="agent-card">
      <div className="agent-card__header">
        <div className={styles.demoHeader}>
          <Logo compact inverse />
          <span className={styles.demoBadge}>{ro ? "Demo sintetic" : "Synthetic demo"}</span>
        </div>
      </div>

      <div className="agent-card__body">
        {!answer && (
          <div className={styles.alvoIntro}>
            <AgentWordmark agent="alvo" size="md" />
            <div>
              <strong>{ro ? "Conversația ta de business de zi cu zi." : "Your everyday business conversation."}</strong>
              <p>{ro ? "Întreabă. Primește claritate. Continuă munca." : "Ask. Get clarity. Keep moving."}</p>
            </div>
          </div>
        )}

        <label className={styles.industryLabel} htmlFor="home-agent-industry">
          {ro ? "Business fictiv" : "Fictional business"}
        </label>
        <select
          id="home-agent-industry"
          className={styles.industrySelect}
          value={activeIndustry}
          disabled={loading}
          onChange={(event) => selectIndustry(event.target.value)}
        >
          {availableIndustryOptions.map(([industry, label]) => (
            <option value={industry} key={industry}>{label}</option>
          ))}
        </select>

        {!answer && prompts.length > 0 && (
          <div className={styles.promptList} aria-label={ro ? "Întrebări sugerate" : "Suggested questions"}>
            {prompts.slice(0, 2).map((prompt) => (
              <button
                key={prompt}
                type="button"
                className={styles.promptButton}
                disabled={loading}
                onClick={() => applyPrompt(prompt)}
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

            {answer.disclaimer && (
              <p className={styles.responseDisclaimer}>{answer.disclaimer}</p>
            )}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="home-agent-question">
            {ro ? "Întreabă despre business-ul fictiv" : "Ask a question about the fictional business"}
          </label>
          <textarea
            id="home-agent-question"
            className={styles.input}
            value={question}
            rows={1}
            maxLength={DEMO_MESSAGE_MAX_CHARACTERS}
            disabled={loading}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void ask(question);
              }
            }}
            placeholder={ro ? "Întreabă ceva despre acest business…" : "Ask anything about this business…"}
          />
          <button
            className={styles.sendButton}
            type="submit"
            disabled={loading || !question.trim()}
            aria-label={loading ? (ro ? "Agentul răspunde" : "Agent is answering") : (ro ? "Întreabă agentul" : "Ask the agent")}
          >
            <ArrowIcon />
          </button>
        </form>

        {error && <p className={styles.error} role="alert">{error}</p>}
        <small className={styles.status}>
          {loading
            ? (ro ? "Verific datele sintetice…" : "Checking the synthetic business data…")
            : (ro ? "Date sintetice · Doar citire · Fără date reale de companie" : "Synthetic data · Read only · No company data")}
        </small>
      </div>
    </div>
  );
}
