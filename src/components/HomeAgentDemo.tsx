"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AgentWordmark } from "@/components/AgentWordmark";
import { AgentRingMark } from "@/components/AgentRingMark";
import { useLocale } from "@/components/LocaleProvider";
import { Logo } from "@/components/Logo";
import {
  parseAlvoMarkdown,
  type AlvoMarkdownInlineSegment,
} from "@/lib/alvo-demo-markdown";
import {
  DEMO_CHAT_RETAIL_PROMPTS,
  buildDemoChatBrowserRequest,
} from "@/lib/alvo-demo-chat";
import {
  DEMO_HISTORY_MAX_MESSAGES,
  DEMO_MESSAGE_MAX_CHARACTERS,
  buildBoundedHistory,
  completeDemoConversationTurn,
  createEmptyDemoSession,
  isDemoSessionReadyForSubmission,
  resetDemoSession,
  restoreDemoSession,
  saveDemoSession,
  setV2ConversationCheckpoint,
  type DemoConversationChart,
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
  chart?: DemoConversationChart | null;
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

function AlvoInlineMarkdown({
  segments,
}: {
  segments: AlvoMarkdownInlineSegment[];
}) {
  return segments.map((segment, index) =>
    segment.strong ? (
      <strong key={`strong-${index}-${segment.text.slice(0, 16)}`}>
        {segment.text}
      </strong>
    ) : (
      <span key={`text-${index}-${segment.text.slice(0, 16)}`}>
        {segment.text}
      </span>
    ),
  );
}

function AlvoMarkdown({ text }: { text: string }) {
  const blocks = parseAlvoMarkdown(text);

  return (
    <div className={styles.responseSummary}>
      {blocks.map((block, blockIndex) => {
        if (block.kind === "paragraph") {
          return (
            <p key={`paragraph-${blockIndex}`}>
              <AlvoInlineMarkdown segments={block.inline} />
            </p>
          );
        }

        if (block.kind === "unordered_list") {
          return (
            <ul key={`unordered-${blockIndex}`}>
              {block.items.map((item, itemIndex) => (
                <li key={`unordered-item-${blockIndex}-${itemIndex}`}>
                  <AlvoInlineMarkdown segments={item} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <ol key={`ordered-${blockIndex}`}>
            {block.items.map((item, itemIndex) => (
              <li key={`ordered-item-${blockIndex}-${itemIndex}`}>
                <AlvoInlineMarkdown segments={item.inline} />
                {item.body.map((paragraph, paragraphIndex) => (
                  <p
                    className={styles.listItemBody}
                    key={`body-${blockIndex}-${itemIndex}-${paragraphIndex}`}
                  >
                    <AlvoInlineMarkdown segments={paragraph} />
                  </p>
                ))}
                {item.details.length > 0 && (
                  <ul>
                    {item.details.map((detail, detailIndex) => (
                      <li
                        key={`detail-${blockIndex}-${itemIndex}-${detailIndex}`}
                      >
                        <AlvoInlineMarkdown segments={detail} />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}

function RevenueBarChart({
  chart,
  ro,
}: {
  chart: DemoConversationChart;
  ro: boolean;
}) {
  const maxValue = Math.max(...chart.points.map((point) => point.value), 0);
  const formatter = new Intl.NumberFormat(ro ? "ro-RO" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const accessibleSummary = chart.points
    .map((point) => `${point.label}: ${Math.round(point.value).toLocaleString(ro ? "ro-RO" : "en-US")} RON`)
    .join(", ");

  return (
    <figure
      className={styles.chart}
      aria-label={`${ro ? "Venituri în ultimele 6 luni" : "Revenue over the last 6 months"}. ${accessibleSummary}`}
    >
      <figcaption className={styles.chartHeader}>
        <strong>{ro ? "Venituri" : "Revenue"}</strong>
        <span>RON · {chart.points.length} {ro ? "luni" : "months"}</span>
      </figcaption>
      <div className={styles.chartBars} aria-hidden="true">
        {chart.points.map((point) => {
          const height =
            maxValue > 0 ? Math.max(4, (point.value / maxValue) * 100) : 4;
          return (
            <div className={styles.chartColumn} key={point.label}>
              <span className={styles.chartValue}>{formatter.format(point.value)}</span>
              <span className={styles.chartTrack}>
                <span
                  className={styles.chartBar}
                  style={{ height: `${height}%` }}
                />
              </span>
              <span className={styles.chartLabel}>{point.label}</span>
            </div>
          );
        })}
      </div>
    </figure>
  );
}

const waitingDetails = {
  en: ["Looking through the numbers…", "Keeping the answer grounded in the data…", "Still working — keeping it grounded."],
  ro: ["Privim cifrele mai atent…", "Păstrăm răspunsul ancorat în date…", "Încă lucrăm — cu atenție la date."],
} as const;

function AlvoWorking({ ro }: { ro: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const next = window.setTimeout(() => setPhase(1), 2200);
    const longWait = window.setTimeout(() => setPhase(2), 7000);
    return () => {
      window.clearTimeout(next);
      window.clearTimeout(longWait);
    };
  }, []);

  return (
    <div className={styles.assistantPending} role="status" aria-label={ro ? "ALVO lucrează" : "ALVO is working"}>
      <span className={`${styles.alvoMark} ${styles.alvoWorking}`}><AgentRingMark variant="alvo" size="xs" decorative /></span>
      <span className={styles.waitingCopy}>
        <strong>{ro ? "ALVO lucrează" : "ALVO is working"}</strong>
        <span className={styles.waitingDetails} aria-hidden="true">
          {waitingDetails[ro ? "ro" : "en"].map((detail, index) => (
            <span key={detail} className={`${styles.waitingDetail} ${phase === index ? styles.waitingDetailActive : ""}`}>
              {detail}
            </span>
          ))}
        </span>
      </span>
    </div>
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
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sessionLocale: DemoConversationLocale = ro ? "ro" : "en";
  const [conversationSession, setConversationSession] = useState(() =>
    createEmptyDemoSession(sessionLocale),
  );
  const [sessionRestored, setSessionRestored] = useState(false);
  const initialSessionLocale = useRef(sessionLocale);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const followTranscriptRef = useRef(true);

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
    if (!transcript || !followTranscriptRef.current) return;
    transcript.scrollTo({
      top: transcript.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
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
    setPendingQuestion(cleaned);
    setQuestion("");
    followTranscriptRef.current = true;

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildDemoChatBrowserRequest({
          industry: activeIndustry,
          message: cleaned,
          conversationId: conversationSession.conversationId,
          locale: sessionLocale,
          history: buildBoundedHistory(
            conversationSession.history,
            DEMO_HISTORY_MAX_MESSAGES,
          ),
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
              chart: payload.chart ?? null,
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
      setQuestion(cleaned);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Demo service is temporarily unavailable.",
      );
    } finally {
      setPendingQuestion(null);
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

        <div className={styles.configuration}>
          <div className={styles.configurationField}>
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
          </div>
          <button
            type="button"
            className={styles.resetButton}
            disabled={loading || !sessionRestored}
            onClick={() => selectIndustry(activeIndustry)}
          >
            {ro ? "Conversație nouă" : "New conversation"}
          </button>
        </div>

        {conversationSession.history.length === 0 && !loading && prompts.length > 0 && (
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

        {(conversationSession.history.length > 0 || loading) && (
          <div
            ref={transcriptRef}
            className={styles.transcript}
            onScroll={(event) => {
              const element = event.currentTarget;
              followTranscriptRef.current =
                element.scrollHeight - element.scrollTop - element.clientHeight < 56;
            }}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label={ro ? "Conversație cu ALVO" : "Conversation with ALVO"}
          >
            {conversationSession.history.map((message, index) => {
              if (message.role === "user") {
                return (
                  <div
                  className={`${styles.userTurn} ${index === conversationSession.history.length - 2 ? styles.newTurn : ""}`}
                    key={`user-${index}-${message.content.slice(0, 24)}`}
                  >
                    <span>{ro ? "Tu" : "You"}</span>
                    <p>{message.content}</p>
                  </div>
                );
              }

              const presentation = message.presentation;
              if (!presentation) return null;
              const isReset = presentation.headline === "ALVO V2 · Reset" &&
                presentation.summary === "The V2 conversation was reset.";
              const isClarification = presentation.action === "clarification" && !isReset;
              const summary = presentation.summary.trim();
              const showHeadline = !summary.startsWith(presentation.headline);

              return (
                <div
                  className={`${styles.assistantTurn} ${index === conversationSession.history.length - 1 ? styles.newTurn : ""} ${isReset ? styles.resetTurn : ""} ${isClarification ? styles.clarificationTurn : ""}`}
                  key={`assistant-${index}-${message.content.slice(0, 24)}`}
                >
                  <div className={styles.assistantTurnLabel}>
                    <span className={styles.alvoMark}><AgentRingMark variant="alvo" size="xs" decorative /></span>
                    <span>ALVO {isReset ? "· Reset" : isClarification ? "· Clarification" : "V2"}</span>
                  </div>
                  <div className={styles.responseCard}>
                    {showHeadline && presentation.headline !== "ALVO V2" && !isReset && (
                      <p className={styles.responseHeadline}>{presentation.headline}</p>
                    )}
                    <AlvoMarkdown text={summary} />

                    {presentation.chart && (
                      <RevenueBarChart chart={presentation.chart} ro={ro} />
                    )}

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

                    {!isReset && (
                      <div className={styles.proofRow}>
                        {presentation.provenance.length > 0 ? (
                          <>
                            <span className={styles.sourceChip}>
                              <span className={styles.sourceCheck} aria-hidden="true">✓</span>
                              {presentation.provenance.length}{" "}
                              {ro
                                ? presentation.provenance.length === 1 ? "sursă" : "surse"
                                : `source${presentation.provenance.length === 1 ? "" : "s"}`}
                            </span>
                            <span>{ro ? "Date sintetice" : "Synthetic"}</span>
                            <span>{ro ? "Doar citire" : "Read only"}</span>
                          </>
                        ) : (
                          <span className={styles.noCompanyDataChip}>
                            {ro ? "Fără date de companie" : "No company data used"}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {loading && pendingQuestion && (
              <div className={`${styles.userTurn} ${styles.newTurn}`}>
                <span>{ro ? "Tu" : "You"}</span>
                <p>{pendingQuestion}</p>
              </div>
            )}
            {loading && <AlvoWorking ro={ro} />}
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
            aria-describedby="home-agent-status"
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
        <small id="home-agent-status" className={styles.status}>
          {ro ? "Demo sintetic · Mediu read-only · Fără date reale de companie" : "Synthetic demo · Read-only environment · No real company data"}
          {latestAssistantMessage?.presentation?.disclaimer && (
            <span className={styles.disclaimer}>{latestAssistantMessage.presentation.disclaimer}</span>
          )}
        </small>
      </div>
    </div>
  );
}