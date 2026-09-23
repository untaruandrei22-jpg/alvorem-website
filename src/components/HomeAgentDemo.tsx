"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import { Logo } from "@/components/Logo";
import {
  DEMO_CHAT_RETAIL_PROMPTS,
  buildDemoChatBrowserRequest,
} from "@/lib/alvo-demo-chat";
import {
  DEMO_MESSAGE_MAX_CHARACTERS,
  completeDemoConversationTurn,
  createEmptyDemoSession,
  isDemoSessionReadyForSubmission,
  resetDemoSession,
  restoreDemoSession,
  saveDemoSession,
  setV2ConversationCheckpoint,
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
  v2_checkpoint?: import("@/lib/alvo-demo-v2-checkpoint").V2ConversationCheckpoint;
  runtime_version?: "v2";
  prior_result_context: {
    client_brain_id: string;
    capability_id: string;
    metric_ids: string[];
    dimension_ids: string[];
    selected_entity_ref: string | null;
    entity_refs: string[];
    result_refs: string[];
    analysis_mode: "performance" | "trend" | "rank" | "compare" | "investigate" | "explain" | null;
    period_start: string | null;
    period_end: string | null;
    comparison_mode: "target" | "previous_period" | "explicit_period" | null;
    comparison_period_start: string | null;
    comparison_period_end: string | null;
    role: "manager" | "product_owner" | "analyst" | "executive" | null;
  } | null;
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
    retail: [...DEMO_CHAT_RETAIL_PROMPTS.en],
  });
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionLocale: DemoConversationLocale = ro ? "ro" : "en";
  const [conversationSession, setConversationSession] = useState(() =>
    createEmptyDemoSession(sessionLocale),
  );
  const [sessionRestored, setSessionRestored] = useState(false);
  const initialSessionLocale = useRef(sessionLocale);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

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
    () =>
      ro && activeIndustry === "retail"
        ? DEMO_CHAT_RETAIL_PROMPTS.ro
        : promptsByIndustry[activeIndustry] ?? [],
    [activeIndustry, promptsByIndustry, ro],
  );

  const availableIndustryOptions = useMemo(
    () => industries.filter(([industry]) => availableIndustries.has(industry)),
    [availableIndustries],
  );

  const latestAssistantMessage = useMemo(
    () =>
      [...conversationSession.history]
        .reverse()
        .find((message) => message.role === "assistant") ?? null,
    [conversationSession.history],
  );

  useEffect(() => {
    if (!sessionRestored || conversationSession.history.length === 0) return;
    const transcript = transcriptRef.current;
    if (!transcript) return;
    transcript.scrollTo({
      top: transcript.scrollHeight,
      behavior: "smooth",
    });
  }, [conversationSession.history.length, loading, sessionRestored]);

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
          locale: sessionLocale,
          history: conversationSession.history,
          v2Checkpoint: conversationSession.v2Checkpoint,
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

      setConversationSession((current) => {
        const completed = completeDemoConversationTurn(
          current,
          payload.conversation_id,
          cleaned,
          {
            content: payload.headline,
            presentation: {
              action: payload.action,
              headline: payload.headline,
              summary: payload.summary,
              kpis: payload.kpis.slice(0, 4),
              provenance: payload.provenance.slice(0, 12),
              disclaimer: payload.disclaimer,
            },
            priorResultContext: payload.prior_result_context,
          },
        );
        return setV2ConversationCheckpoint(
          completed,
          payload.v2_checkpoint ?? null,
        );
      });
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
    if (!isDemoSessionReadyForSubmission(sessionRestored, loading)) return;
    if (!availableIndustries.has(industry)) return;
    setActiveIndustry(industry);
    setError(null);
    setQuestion("");
    setConversationSession(resetDemoSession(undefined, sessionLocale));
  }

  function applyPrompt(prompt: string) {
    setQuestion(prompt);
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
        {conversationSession.history.length === 0 && (
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
          disabled={loading || !sessionRestored}
          onChange={(event) => selectIndustry(event.target.value)}
        >
          {availableIndustryOptions.map(([industry, label]) => (
            <option value={industry} key={industry}>{label}</option>
          ))}
        </select>

        <div className={styles.demoControls}>
          <small id="home-agent-language" className={styles.languageHint}>
            {ro ? "Întreabă în română sau engleză." : "Ask in English or Romanian."}
          </small>
          <button
            type="button"
            className={styles.resetButton}
            disabled={loading || !sessionRestored}
            onClick={() => selectIndustry(activeIndustry)}
          >
            {ro ? "Conversație nouă" : "New conversation"}
          </button>
        </div>

        {(conversationSession.history.length === 0 ||
          latestAssistantMessage?.presentation?.action === "clarification" ||
          error) &&
          prompts.length > 0 && (
          <div className={styles.promptList} aria-label={ro ? "Întrebări sugerate" : "Suggested questions"}>
            {prompts.slice(0, 2).map((prompt) => (
              <button
                key={prompt}
                type="button"
                className={styles.promptButton}
                disabled={loading || !sessionRestored}
                onClick={() => applyPrompt(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {conversationSession.history.length > 0 && (
          <div
            ref={transcriptRef}
            className={styles.transcript}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label={ro ? "Conversație cu ALVO" : "Conversation with ALVO"}
          >
            {conversationSession.history.map((message, index) => {
              if (message.role === "user") {
                return (
                  <div
                    className={styles.userTurn}
                    key={`user-${index}-${message.content.slice(0, 24)}`}
                  >
                    <span>{ro ? "Tu" : "You"}</span>
                    <p>{message.content}</p>
                  </div>
                );
              }

              const presentation = message.presentation;
              if (!presentation) return null;

              return (
                <div
                  className={styles.assistantTurn}
                  key={`assistant-${index}-${message.content.slice(0, 24)}`}
                >
                  <div className={styles.assistantTurnLabel}>
                    <AgentWordmark agent="alvo" size="sm" />
                  </div>
                  <div className={styles.responseCard}>
                    <p className={styles.responseHeadline}>
                      {presentation.headline}
                    </p>
                    <p className={styles.responseSummary}>
                      {presentation.summary}
                    </p>

                    {presentation.kpis.length > 0 && (
                      <div className={styles.kpis}>
                        {presentation.kpis.map((kpi) => (
                          <div
                            className={styles.kpi}
                            key={`${index}-${kpi.label}-${kpi.value}`}
                          >
                            <span>{kpi.label}</span>
                            <strong>{kpi.value}</strong>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={styles.proofRow}>
                      <span>
                        {presentation.provenance.length}{" "}
                        {ro
                          ? presentation.provenance.length === 1
                            ? "sursă verificată"
                            : "surse verificate"
                          : `source${presentation.provenance.length === 1 ? "" : "s"} checked`}
                      </span>
                      <span>{ro ? "Date sintetice" : "Synthetic data"}</span>
                      <span>{ro ? "Doar citire" : "Read only"}</span>
                    </div>

                    {presentation.disclaimer && (
                      <p className={styles.responseDisclaimer}>
                        {presentation.disclaimer}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className={styles.assistantPending} aria-label={ro ? "ALVO răspunde" : "ALVO is answering"}>
                <AgentWordmark agent="alvo" size="sm" />
                <span>{ro ? "Verific datele sintetice…" : "Checking the synthetic business data…"}</span>
              </div>
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
            aria-describedby="home-agent-language"
            maxLength={DEMO_MESSAGE_MAX_CHARACTERS}
            disabled={loading || !sessionRestored}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void ask(question);
              }
            }}
            placeholder={ro ? "Întreabă despre vânzări, marjă, ținte sau stoc…" : "Ask about sales, targets, margin or inventory…"}
          />
          <button
            className={styles.sendButton}
            type="submit"
            disabled={loading || !sessionRestored || !question.trim()}
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
