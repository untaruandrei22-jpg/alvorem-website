"use client";

import Link from "next/link";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./AgentsSplit.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m13.5 2-8 11h6l-1 9 8-12h-6l1-8Z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h12v9H9l-5 4V5Z" />
      <path d="M10 9h10v8h-4l-3 3v-3" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 20v-6M12 20V9M19 20V4" />
      <path d="M3 20h18" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M3 20c.4-4.6 2.4-7 6-7s5.6 2.4 6 7" />
      <path d="M14 15c.8-.7 1.8-1 3-1 2.8 0 4.3 2 4.5 6" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.5 4.2A3.5 3.5 0 0 0 4 7a3.2 3.2 0 0 0 1 2.3A3.8 3.8 0 0 0 6.5 16a3.2 3.2 0 0 0 3 4" />
      <path d="M14.5 4.2A3.5 3.5 0 0 1 20 7a3.2 3.2 0 0 1-1 2.3A3.8 3.8 0 0 1 17.5 16a3.2 3.2 0 0 1-3 4" />
      <path d="M12 3v18M8 9c2 0 3 1 4 2M16 9c-2 0-3 1-4 2M8 15c2 0 3-1 4-2M16 15c-2 0-3-1-4-2" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m4 12 8 4 8-4M4 16l8 5 8-5" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <circle cx="12" cy="11" r="2" />
      <path d="M6.8 7 10 9.7M17.2 7 14 9.7M12 13v3" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="13" r="7" />
      <circle cx="11" cy="13" r="3" />
      <path d="m13.5 10.5 7-7M16 3.5h4.5V8" />
    </svg>
  );
}

const alvoItems = [
  { en: "Everyday business chat", ro: "Chat de business pentru zi de zi", icon: <ChatIcon /> },
  { en: "Fast, clear answers", ro: "Răspunsuri rapide și clare", icon: <BoltIcon /> },
  { en: "KPI summaries and reports", ro: "Rezumate KPI și rapoarte", icon: <ChartIcon /> },
  { en: "Built for daily team use", ro: "Construit pentru utilizarea zilnică a echipei", icon: <PeopleIcon /> },
];

const oremItems = [
  { en: "Deeper reasoning", ro: "Raționament aprofundat", icon: <BrainIcon /> },
  { en: "Multi-source analysis", ro: "Analiză din surse multiple", icon: <LayersIcon /> },
  { en: "Advanced automation", ro: "Automatizare avansată", icon: <NetworkIcon /> },
  { en: "Strategic recommendations", ro: "Recomandări strategice", icon: <TargetIcon /> },
];

export function AgentsSplit() {
  const { locale } = useLocale();
  const ro = locale === "ro";

  return (
    <section className={styles.section} aria-labelledby="agents-title" data-no-translate>
      <div className={styles.sectionIntro}>
        <p className="eyebrow">{ro ? "FĂ CUNOȘTINȚĂ CU ECHIPA TA AI" : "MEET YOUR AI TEAM"}</p>
        <div className={styles.introGrid}>
          <h2 id="agents-title">
            {ro ? "Două niveluri de inteligență. O singură echipă." : "Two levels of intelligence. One team."}
          </h2>
          <p>
            <AgentWordmark agent="alvo" size="xs" className={styles.inlineAgent} />
            {ro ? " este locul în care începe munca de zi cu zi. Când este nevoie de mai multă profunzime, " : " is where everyday work begins. When more depth is needed, "}
            <AgentWordmark agent="orem" size="xs" className={styles.inlineAgent} />
            {ro ? " intră în aceeași conversație — cu același context de business." : " joins the same conversation — with the same business context."}
          </p>
        </div>
      </div>

      <div className={styles.systemFrame}>
        <div className={styles.ambientGlow} aria-hidden="true" />
        <div className={styles.systemRail}>
          <span>{ro ? "UN SINGUR SISTEM PRIVAT" : "ONE PRIVATE SYSTEM"}</span>
          <i aria-hidden="true" />
          <span>{ro ? "CONTEXT COMUN" : "SHARED CONTEXT"}</span>
          <i aria-hidden="true" />
          <span>{ro ? "ACELEAȘI REGULI DE ACCES" : "SAME ACCESS RULES"}</span>
        </div>

        <div className={styles.cards}>
          <article className={`${styles.agentCard} ${styles.alvoCard}`} id="alvo">
            <div className={styles.cardHalo} aria-hidden="true"><span /></div>
            <div className={styles.cardTopline}>
              <AgentWordmark agent="alvo" size="md" />
              <span>{ro ? "ZI DE ZI" : "EVERYDAY"}</span>
            </div>

            <div className={styles.cardCopy}>
              <h3>{ro ? "Claritate pentru fiecare zi." : "Clarity for every day."}</h3>
              <p>
                {ro
                  ? "Chat-ul privat de business pe care echipa ta îl folosește pentru întrebări, rapoarte, rezumate și lucru curent."
                  : "The private business chat your team uses for questions, reports, summaries and everyday work."}
              </p>
            </div>

            <div className={styles.featureList}>
              {alvoItems.map((item) => (
                <div className={styles.feature} key={item.en}>
                  <span>{item.icon}</span>
                  <p>{ro ? item.ro : item.en}</p>
                </div>
              ))}
            </div>

            <Link className={`${styles.cta} ${styles.alvoCta}`} href="/#agent-demo">
              {ro ? "Vorbește cu" : "Talk to"} <AgentWordmark agent="alvo" size="xs" /> <ArrowIcon />
            </Link>
          </article>

          <div className={styles.handoff} aria-label={ro ? "ALVO poate apela la OREM" : "ALVO can bring in OREM"}>
            <div className={styles.handoffLine} aria-hidden="true"><span /><i /><b /></div>
            <p>
              <AgentWordmark agent="alvo" size="xs" className={styles.inlineAgent} />
              {ro ? " știe când are nevoie de mai multă profunzime." : " knows when more depth is needed."}
            </p>
            <strong>{ro ? "apelează" : "brings in"}</strong>
          </div>

          <article className={`${styles.agentCard} ${styles.oremCard}`} id="orem">
            <div className={styles.cardEclipse} aria-hidden="true"><span /></div>
            <div className={styles.cardTopline}>
              <AgentWordmark agent="orem" size="md" />
              <span className={styles.subscription}>{ro ? "ABONAMENT" : "SUBSCRIPTION"}</span>
            </div>

            <div className={styles.cardCopy}>
              <h3>{ro ? "Mai profund când contează." : "Deeper when it matters."}</h3>
              <p>
                {ro
                  ? "Nivelul superior pentru analiză complexă, automatizare și întrebări care au nevoie de mai mult context și raționament."
                  : "The upgraded layer for complex analysis, automation and questions that need broader context and deeper reasoning."}
              </p>
            </div>

            <div className={styles.featureList}>
              {oremItems.map((item) => (
                <div className={styles.feature} key={item.en}>
                  <span>{item.icon}</span>
                  <p>{ro ? item.ro : item.en}</p>
                </div>
              ))}
            </div>

            <Link className={`${styles.cta} ${styles.oremCta}`} href="/pricing">
              {ro ? "Descoperă" : "Explore"} <AgentWordmark agent="orem" size="xs" /> <ArrowIcon />
            </Link>
          </article>
        </div>

        <div className={styles.sharedContext}>
          <div className={styles.sharedMark} aria-hidden="true"><span /><i /></div>
          <div>
            <strong>{ro ? "Aceeași memorie de business." : "The same business memory."}</strong>
            <p>
              {ro
                ? "Nu alegi între doi roboți. Lucrezi cu o singură echipă care folosește nivelul potrivit de inteligență pentru fiecare situație."
                : "You are not choosing between two bots. You work with one team that uses the right level of intelligence for each situation."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
