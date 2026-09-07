"use client";

import Link from "next/link";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./WorkContent.module.css";

type Mode = "alvo" | "orem" | "team";

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>;
}

function ModeMark({ mode }: { mode: Mode }) {
  if (mode === "team") {
    return <span className={styles.teamMark}><AgentWordmark agent="alvo" size="xs" /><i>+</i><AgentWordmark agent="orem" size="xs" /></span>;
  }
  return <AgentWordmark agent={mode} size="sm" />;
}

const copy = {
  en: {
    eyebrow: "SELECTED WORK",
    title: "AI that earns its place in the business.",
    intro: "We start with a real business problem, connect the right context and use only as much intelligence as the work actually needs.",
    cases: [
      {
        number: "01",
        label: "SALES INTELLIGENCE",
        title: "Daily answers leaders can verify.",
        mode: "alvo" as const,
        problem: "Sales questions were slow to answer and repeated across teams.",
        data: "Controlled sales, plan and hierarchy data in a read-only environment.",
        intelligence: "Everyday questions, KPI summaries, variance explanations and source-backed reporting.",
        outcome: "A faster path from question to a clear, traceable business answer.",
      },
      {
        number: "02",
        label: "MANAGEMENT ANALYSIS",
        title: "Deeper reasoning when the obvious answer is not enough.",
        mode: "orem" as const,
        problem: "A management question needed broader context, comparison and scenario thinking.",
        data: "Multiple trusted business sources, rules and decision assumptions.",
        intelligence: "Multi-source reasoning, scenario modelling and strategic recommendations.",
        outcome: "A structured analysis that makes trade-offs and limitations visible.",
      },
      {
        number: "03",
        label: "BUSINESS OPERATIONS",
        title: "One conversation from everyday work to deeper action.",
        mode: "team" as const,
        problem: "Teams needed one place for routine questions, recurring reports and deeper follow-up work.",
        data: "The same trusted business memory and permission model across the workflow.",
        intelligence: "ALVO handles the everyday interaction; OREM joins when deeper analysis or automation is needed.",
        outcome: "One system, one context and less switching between tools or disconnected assistants.",
      },
    ],
    labels: { problem: "Problem", data: "Data", intelligence: "Intelligence", outcome: "Outcome" },
    proofEyebrow: "THE PATTERN",
    proofTitle: "Problem → context → right depth → useful outcome.",
    proofBody: "The goal is not to put AI everywhere. It is to put the right amount of intelligence exactly where work becomes unnecessarily heavy.",
    cta: "See how the team works",
    contact: "Bring us a process worth simplifying",
  },
  ro: {
    eyebrow: "PROIECTE SELECTATE",
    title: "AI care își câștigă locul în business.",
    intro: "Pornim de la o problemă reală de business, conectăm contextul potrivit și folosim doar nivelul de inteligență de care munca are nevoie.",
    cases: [
      {
        number: "01",
        label: "INTELIGENȚĂ DE VÂNZĂRI",
        title: "Răspunsuri zilnice pe care liderii le pot verifica.",
        mode: "alvo" as const,
        problem: "Întrebările despre vânzări primeau răspuns greu și se repetau între echipe.",
        data: "Date controlate despre vânzări, plan și ierarhii, într-un mediu read-only.",
        intelligence: "Întrebări zilnice, KPI-uri, explicații de variații și raportare cu surse.",
        outcome: "Un drum mai scurt de la întrebare la un răspuns clar și trasabil.",
      },
      {
        number: "02",
        label: "ANALIZĂ DE MANAGEMENT",
        title: "Raționament mai profund când răspunsul evident nu ajunge.",
        mode: "orem" as const,
        problem: "O întrebare de management avea nevoie de context mai larg, comparații și scenarii.",
        data: "Mai multe surse de business de încredere, reguli și ipoteze de decizie.",
        intelligence: "Raționament multi-sursă, modelare de scenarii și recomandări strategice.",
        outcome: "O analiză structurată care face vizibile compromisurile și limitările.",
      },
      {
        number: "03",
        label: "OPERAȚIUNI DE BUSINESS",
        title: "O singură conversație de la munca zilnică la acțiune profundă.",
        mode: "team" as const,
        problem: "Echipele aveau nevoie de un singur loc pentru întrebări, rapoarte recurente și follow-up complex.",
        data: "Aceeași memorie de business și același model de permisiuni în tot fluxul.",
        intelligence: "ALVO gestionează interacțiunea zilnică; OREM intră când este nevoie de analiză sau automatizare mai profundă.",
        outcome: "Un singur sistem, același context și mai puțin switching între tool-uri sau asistenți separați.",
      },
    ],
    labels: { problem: "Problemă", data: "Date", intelligence: "Inteligență", outcome: "Rezultat" },
    proofEyebrow: "MODELUL",
    proofTitle: "Problemă → context → profunzimea potrivită → rezultat util.",
    proofBody: "Scopul nu este să punem AI peste tot. Scopul este să punem nivelul potrivit de inteligență exact acolo unde munca devine inutil de grea.",
    cta: "Vezi cum lucrează echipa",
    contact: "Adu-ne un proces care merită simplificat",
  },
} as const;

export function WorkContent() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <>
      <section className={["site-shell", styles.hero].join(" ")} id="main-content">
        <p className="eyebrow">{t.eyebrow}</p>
        <div className={styles.heroGrid}>
          <h1>{t.title}</h1>
          <div>
            <p>{t.intro}</p>
            <Link className="button button--primary" href="/solutions">{t.cta} <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <section className={["site-shell", styles.cases].join(" ")} aria-label={t.eyebrow}>
        {t.cases.map((item) => (
          <article className={styles.case} key={item.number}>
            <div className={styles.caseTop}>
              <span className={styles.number}>{item.number}</span>
              <span className={styles.label}>{item.label}</span>
              <ModeMark mode={item.mode} />
            </div>
            <h2>{item.title}</h2>
            <div className={styles.caseGrid}>
              <div><small>{t.labels.problem}</small><p>{item.problem}</p></div>
              <div><small>{t.labels.data}</small><p>{item.data}</p></div>
              <div><small>{t.labels.intelligence}</small><p>{item.intelligence}</p></div>
              <div><small>{t.labels.outcome}</small><p>{item.outcome}</p></div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.pattern}>
        <div className="site-shell">
          <p className="eyebrow">{t.proofEyebrow}</p>
          <h2>{t.proofTitle}</h2>
          <p>{t.proofBody}</p>
          <a className="button button--primary" href="mailto:hello@alvorem.ro?subject=Business%20process%20worth%20simplifying">{t.contact} <ArrowIcon /></a>
        </div>
      </section>
    </>
  );
}
