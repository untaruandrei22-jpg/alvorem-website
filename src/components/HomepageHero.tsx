"use client";

import { AgentWordmark } from "@/components/AgentWordmark";
import { HomeAgentDemo } from "@/components/HomeAgentDemo";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./HomepageHero.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

const copy = {
  en: {
    eyebrow: "PRIVATE AI TEAM FOR BUSINESS",
    titleLead: "Your business,",
    titleEm: "simpler.",
    alvoLine: "for every day.",
    oremLine: "when more is needed.",
    alvoDescription: " is the private business chat your team uses every day. ",
    oremDescription:
      " steps in when a question needs deeper reasoning or work should run automatically.",
    primary: "Talk to",
    secondary: "See how they work together",
    systemLabel: "ONE TEAM · SHARED BUSINESS CONTEXT",
    dailyLayer: "EVERYDAY INTERFACE",
    dailyDetail: "Answers · summaries · reports",
    deepLayer: "DEEPER LAYER",
    deepDetail: "Reasoning · automation · escalation",
    subscription: "SUBSCRIPTION UPGRADE",
    handoff: "Brings in more depth when the work needs it",
  },
  ro: {
    eyebrow: "ECHIPA TA PRIVATĂ DE AI PENTRU BUSINESS",
    titleLead: "Afacerea ta,",
    titleEm: "mai simplă.",
    alvoLine: "pentru fiecare zi.",
    oremLine: "când ai nevoie de mai mult.",
    alvoDescription: " este chat-ul privat de business pe care echipa ta îl folosește zilnic. ",
    oremDescription:
      " intervine când o întrebare are nevoie de analiză mai profundă sau munca trebuie automatizată.",
    primary: "Vorbește cu",
    secondary: "Vezi cum lucrează împreună",
    systemLabel: "O SINGURĂ ECHIPĂ · ACELAȘI CONTEXT DE BUSINESS",
    dailyLayer: "INTERFAȚA DE ZI CU ZI",
    dailyDetail: "Răspunsuri · rezumate · rapoarte",
    deepLayer: "NIVELUL PROFUND",
    deepDetail: "Analiză · automatizare · escaladare",
    subscription: "UPGRADE PRIN ABONAMENT",
    handoff: "Aduce mai multă profunzime când munca o cere",
  },
} as const;

export function HomepageHero() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section
      className={["site-shell", styles.hero].join(" ")}
      id="main-content"
      aria-labelledby="hero-title"
    >
      <div className={styles.copy}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 id="hero-title">
          <span>{t.titleLead}</span>
          <em>{t.titleEm}</em>
        </h1>

        <div className={styles.agentPromise} aria-label="ALVO for every day. OREM when more is needed.">
          <span>
            <AgentWordmark agent="alvo" size="sm" />
            <strong>{t.alvoLine}</strong>
          </span>
          <i aria-hidden="true" />
          <span>
            <AgentWordmark agent="orem" size="sm" />
            <strong>{t.oremLine}</strong>
          </span>
        </div>

        <p className={styles.description}>
          <AgentWordmark agent="alvo" size="xs" className={styles.inlineAgent} />
          {t.alvoDescription}
          <AgentWordmark agent="orem" size="xs" className={styles.inlineAgent} />
          {t.oremDescription}
        </p>

        <div className={styles.actions}>
          <a className="button button--primary" href="#agent-demo">
            {t.primary} <AgentWordmark agent="alvo" size="xs" className={styles.buttonAgent} /> <ArrowIcon />
          </a>
          <a className="button button--secondary" href="#team-flow">
            {t.secondary}
          </a>
        </div>
      </div>

      <div className={styles.stage} id="agent-demo" aria-label="ALVOREM AI team product demonstration">
        <div className={styles.systemLabel}>{t.systemLabel}</div>

        <div className={styles.deepAura} aria-hidden="true" />
        <div className={styles.deepIdentity}>
          <div className={styles.deepHeading}>
            <AgentWordmark agent="orem" size="sm" />
            <span>{t.subscription}</span>
          </div>
          <strong>{t.deepLayer}</strong>
          <small>{t.deepDetail}</small>
        </div>

        <div className={styles.connection} aria-hidden="true">
          <span />
          <i />
        </div>

        <div className={styles.dailyIdentity}>
          <AgentWordmark agent="alvo" size="sm" />
          <span>
            <strong>{t.dailyLayer}</strong>
            <small>{t.dailyDetail}</small>
          </span>
        </div>

        <HomeAgentDemo />

        <div className={styles.handoffNote}>
          <span aria-hidden="true">↗</span>
          {t.handoff}
        </div>
      </div>
    </section>
  );
}
