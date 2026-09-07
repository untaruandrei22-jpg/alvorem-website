"use client";

import Link from "next/link";
import { AgentInlineText } from "@/components/AgentInlineText";
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
    eyebrow: "MEET YOUR AI TEAM",
    title: "One team. Three ways to work.",
    intro: "Start with everyday clarity. Add deeper intelligence when the work needs it. Let both work together when you want the full team.",
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
      label: "TEAM MODE",
      title: "The right depth, one context.",
      body: "ALVO stays the interface. OREM adds depth. Both use the same trusted business memory and access rules.",
      points: ["Shared business memory", "One conversation", "Intelligent handoff"],
    },
    cta: "Explore solutions",
  },
  ro: {
    eyebrow: "FĂ CUNOȘTINȚĂ CU ECHIPA TA AI",
    title: "O echipă. Trei moduri de lucru.",
    intro: "Începe cu claritatea de zi cu zi. Adaugă inteligență mai profundă când munca o cere. Lasă-i să lucreze împreună când vrei echipa completă.",
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
      label: "MOD ECHIPĂ",
      title: "Profunzimea potrivită, același context.",
      body: "ALVO rămâne interfața. OREM adaugă profunzime. Amândoi folosesc aceeași memorie de business și aceleași reguli de acces.",
      points: ["Memorie comună de business", "O singură conversație", "Transfer inteligent"],
    },
    cta: "Explorează soluțiile",
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
                {card.key === "alvo" ? (
                  <AgentWordmark agent="alvo" size="sm" />
                ) : card.key === "orem" ? (
                  <AgentWordmark agent="orem" size="sm" />
                ) : (
                  <span className={styles.teamMarks}>
                    <AgentWordmark agent="alvo" size="xs" />
                    <i aria-hidden="true">+</i>
                    <AgentWordmark agent="orem" size="xs" />
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
