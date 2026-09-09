"use client";

import { AgentInlineText } from "@/components/AgentInlineText";
import { AgentRingMark } from "@/components/AgentRingMark";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./SolutionsIntro.module.css";

const copy = {
  en: {
    eyebrow: "PRIVATE AI · AT THE RIGHT DEPTH",
    title: "Use the intelligence your work actually needs.",
    body: "ALVO handles everyday business work. OREM goes deeper when analysis, automation or strategic reasoning needs more. Together, they work as one private AI team.",
    choose: "CHOOSE THE WAY YOU WANT TO WORK",
    modes: {
      alvo: ["EVERYDAY MODE", "Everyday clarity", "Questions, KPIs, summaries and reports."],
      orem: ["DEEP MODE", "Deeper intelligence", "Analysis, scenarios, strategy and automation."],
      team: ["TEAM MODE", "The full AI team", "One context. The right depth for every task."],
    },
  },
  ro: {
    eyebrow: "AI PRIVAT · LA NIVELUL POTRIVIT",
    title: "Folosește inteligența de care munca ta chiar are nevoie.",
    body: "ALVO gestionează munca de business de zi cu zi. OREM merge mai profund când analiza, automatizarea sau raționamentul strategic au nevoie de mai mult. Împreună lucrează ca o singură echipă AI privată.",
    choose: "ALEGE CUM VREI SĂ LUCREZI",
    modes: {
      alvo: ["MOD ZILNIC", "Claritate de zi cu zi", "Întrebări, KPI, rezumate și rapoarte."],
      orem: ["MOD PROFUND", "Inteligență mai profundă", "Analiză, scenarii, strategie și automatizare."],
      team: ["MOD ECHIPĂ", "Echipa AI completă", "Același context. Profunzimea potrivită pentru fiecare task."],
    },
  },
} as const;

export function SolutionsIntro() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className={["site-shell", styles.section].join(" ")} id="main-content" aria-labelledby="solutions-title">
      <div className={styles.copy}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 id="solutions-title">{t.title}</h1>
        <p><AgentInlineText text={t.body} /></p>
        <a className="button button--primary" href="#team-modes">
          {locale === "ro" ? "Vezi modurile de lucru" : "See the ways to work"}
        </a>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.alvoOrbit} />
        <div className={styles.oremOrbit} />
        <div className={styles.visualMarks}>
          <AgentRingMark variant="team" size="lg" />
          <span className={styles.visualNames}>
            <AgentWordmark agent="alvo" size="sm" />
            <i>+</i>
            <AgentWordmark agent="orem" size="sm" />
          </span>
        </div>
        <p>{locale === "ro" ? "UN CONTEXT · PROFUNZIME DIFERITĂ" : "ONE CONTEXT · DIFFERENT DEPTH"}</p>
      </div>

      <div className={styles.modeSection} id="team-modes">
        <p className={styles.modeLabel}>{t.choose}</p>
        <div className={styles.modes}>
          <article>
            <div className={styles.modeTop}>
              <span>{t.modes.alvo[0]}</span>
              <span className={styles.modeIdentity}><AgentRingMark variant="alvo" size="sm" /><AgentWordmark agent="alvo" size="sm" /></span>
            </div>
            <h2>{t.modes.alvo[1]}</h2>
            <p>{t.modes.alvo[2]}</p>
          </article>
          <article className={styles.deep}>
            <div className={styles.modeTop}>
              <span>{t.modes.orem[0]}</span>
              <span className={styles.modeIdentity}><AgentRingMark variant="orem" size="sm" /><AgentWordmark agent="orem" size="sm" /></span>
            </div>
            <h2>{t.modes.orem[1]}</h2>
            <p>{t.modes.orem[2]}</p>
          </article>
          <article className={styles.team}>
            <div className={styles.modeTop}>
              <span>{t.modes.team[0]}</span>
              <span className={styles.modeIdentity}>
                <AgentRingMark variant="team" size="sm" />
                <span className={styles.teamMarks}><AgentWordmark agent="alvo" size="xs" /><i>+</i><AgentWordmark agent="orem" size="xs" /></span>
              </span>
            </div>
            <h2>{t.modes.team[1]}</h2>
            <p>{t.modes.team[2]}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
