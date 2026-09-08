"use client";

import Link from "next/link";
import { AgentInlineText } from "@/components/AgentInlineText";
import { AgentRingMark } from "@/components/AgentRingMark";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./HomeCompactTeam.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

const copy = {
  en: {
    eyebrow: "MEET ALVO + OREM",
    title: "Two kinds of intelligence. One private AI team.",
    intro: "ALVO brings calm, everyday clarity. OREM brings deeper reasoning when the work demands more. Together, the two rings become one ALVOREM system.",
    alvo: {
      label: "EVERYDAY MODE",
      title: "Clarity for every day.",
      body: "Ask, understand, summarize and report without adding another complicated tool to the day.",
      points: ["Business questions", "KPI summaries", "Reports and daily work"],
    },
    orem: {
      label: "DEEP MODE",
      title: "Think deeper when it matters.",
      body: "Bring in broader context, stronger reasoning and advanced automation for the work that needs more.",
      points: ["Deep analysis", "Scenario reasoning", "Advanced automation"],
    },
    team: {
      label: "TOGETHER",
      title: "One context. The right depth.",
      body: "ALVO stays close to the everyday work. OREM adds depth. Both use the same trusted business memory and access rules.",
      points: ["Shared business memory", "One conversation", "Intelligent handoff"],
    },
    cta: "Explore ALVO + OREM",
  },
  ro: {
    eyebrow: "DESCOPERĂ ALVO + OREM",
    title: "Două tipuri de inteligență. O singură echipă AI privată.",
    intro: "ALVO aduce claritate calmă pentru zi de zi. OREM aduce raționament mai profund când munca o cere. Împreună, cele două inele devin un singur sistem ALVOREM.",
    alvo: {
      label: "MOD ZILNIC",
      title: "Claritate pentru fiecare zi.",
      body: "Întreabă, înțelege, rezumă și raportează fără să adaugi încă un instrument complicat în ziua ta.",
      points: ["Întrebări de business", "Rezumate KPI", "Rapoarte și lucru zilnic"],
    },
    orem: {
      label: "MOD PROFUND",
      title: "Gândește mai profund când contează.",
      body: "Adaugă mai mult context, raționament mai puternic și automatizare avansată pentru munca ce are nevoie de mai mult.",
      points: ["Analiză profundă", "Scenarii și raționament", "Automatizare avansată"],
    },
    team: {
      label: "ÎMPREUNĂ",
      title: "Același context. Profunzimea potrivită.",
      body: "ALVO rămâne aproape de munca zilnică. OREM adaugă profunzime. Amândoi folosesc aceeași memorie de business și aceleași reguli de acces.",
      points: ["Memorie comună de business", "O singură conversație", "Transfer inteligent"],
    },
    cta: "Explorează ALVO + OREM",
  },
} as const;

export function HomeCompactTeam() {
  const { locale } = useLocale();
  const t = copy[locale];

  const cards = [
    { key: "alvo", data: t.alvo },
    { key: "orem", data: t.orem },
    { key: "team", data: t.team },
  ] as const;

  return (
    <section className={styles.section} aria-labelledby="home-team-title">
      <div className="site-shell">
        <div className={styles.intro}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="home-team-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article className={`${styles.card} ${styles[card.key]}`} key={card.key}>
              <div className={styles.topline}>
                <span>{card.data.label}</span>
              </div>

              <div className={styles.identity}>
                <AgentRingMark variant={card.key} size="lg" />
                {card.key === "alvo" ? (
                  <AgentWordmark agent="alvo" size="md" />
                ) : card.key === "orem" ? (
                  <AgentWordmark agent="orem" size="md" />
                ) : (
                  <span className={styles.teamMarks}>
                    <AgentWordmark agent="alvo" size="sm" />
                    <i aria-hidden="true">+</i>
                    <AgentWordmark agent="orem" size="sm" />
                  </span>
                )}
              </div>

              <h3>{card.data.title}</h3>
              <p><AgentInlineText text={card.data.body} /></p>
              <div className={styles.points}>
                {card.data.points.map((point) => <span key={point}>{point}</span>)}
              </div>
            </article>
          ))}
        </div>

        <Link className={styles.cta} href="/solutions">
          {t.cta} <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
