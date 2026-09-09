"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AgentInlineText } from "@/components/AgentInlineText";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import { WorkIntelligenceField } from "@/components/WorkIntelligenceField";
import styles from "./WorkContent.module.css";

type Mode = "alvo" | "orem" | "team";
type Step = "problem" | "data" | "intelligence" | "outcome";

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>;
}

function StepIcon({ step, team = false }: { step: Step; team?: boolean }) {
  if (step === "problem") return <svg viewBox="0 0 28 28" aria-hidden="true"><rect x="5" y="3.5" width="17" height="21" rx="2.5" /><path d="M9 9h9M9 13.5h7M9 18h5" /></svg>;
  if (step === "data") return <svg viewBox="0 0 28 28" aria-hidden="true"><ellipse cx="14" cy="6.5" rx="8.5" ry="3.5" /><path d="M5.5 6.5v7c0 1.9 3.8 3.5 8.5 3.5s8.5-1.6 8.5-3.5v-7M5.5 13.5v7c0 1.9 3.8 3.5 8.5 3.5s8.5-1.6 8.5-3.5v-7" /></svg>;
  if (step === "intelligence") return <svg viewBox="0 0 36 28" aria-hidden="true"><path d="M13 2c1.2 6 4.1 9.1 10 10.3-5.9 1.2-8.8 4.4-10 10.4-1.2-6-4.1-9.2-10-10.4C8.9 11.1 11.8 8 13 2Z" />{team && <path d="M27 8c.7 3.4 2.4 5.2 5.8 5.9-3.4.7-5.1 2.5-5.8 5.9-.7-3.4-2.4-5.2-5.8-5.9C24.6 13.2 26.3 11.4 27 8Z" />}</svg>;
  return <svg viewBox="0 0 28 28" aria-hidden="true"><path d="M5 23V16h4v7M12 23V10h4v13M19 23V4h4v19M3 23.5h22" /></svg>;
}

const stepOrder: Step[] = ["problem", "data", "intelligence", "outcome"];
const connectorClasses = [styles.connectorFirst, styles.connectorMiddle, styles.connectorLast];

const straightPath = "M0 21 H100";
const branchPaths = [
  "M0 21 C28 21 34 5 58 5 C78 5 84 18 100 21",
  straightPath,
  "M0 21 C28 21 34 37 58 37 C78 37 84 24 100 21",
];
const joinPath = "M48 39 C60 39 68 21 100 21";

function MotionPath({ path, className }: { path: string; className: string }) {
  return <path className={className} d={path} pathLength="1" vectorEffect="non-scaling-stroke" />;
}

function WorkflowConnector({ mode, index }: { mode: Mode; index: number }) {
  const isReasoningBranch = mode === "orem" && index === 1;
  const isTeamJoin = mode === "team" && index === 1;
  const isTeamOutcome = mode === "team" && index === 2;

  return (
    <span className={[styles.connector, connectorClasses[index]].join(" ")} aria-hidden="true">
      <svg className={styles.connectorSvg} viewBox="0 0 100 42" preserveAspectRatio="none">
        {isReasoningBranch ? (
          branchPaths.map((path, branchIndex) => (
            <MotionPath
              key={path}
              path={path}
              className={[styles.routeBase, styles.routeBranch, branchIndex === 1 ? styles.routeBranchCenter : ""].filter(Boolean).join(" ")}
            />
          ))
        ) : (
          <MotionPath path={straightPath} className={styles.routeBase} />
        )}

        {isTeamJoin && <MotionPath path={joinPath} className={[styles.routeBase, styles.joinRoute].join(" ")} />}
        {isTeamJoin && <circle className={styles.depthCue} cx="48" cy="21" r="4" vectorEffect="non-scaling-stroke" />}

        {isReasoningBranch ? (
          branchPaths.map((path, branchIndex) => (
            <MotionPath
              key={`signal-${path}`}
              path={path}
              className={[
                styles.signalPath,
                styles.signalViolet,
                branchIndex === 1 ? styles.branchSignalCenter : "",
                branchIndex === 2 ? styles.branchSignalLower : "",
              ].filter(Boolean).join(" ")}
            />
          ))
        ) : (
          <MotionPath
            path={straightPath}
            className={[
              styles.signalPath,
              mode === "alvo" || (mode === "team" && index < 2) ? styles.signalWarm : styles.signalViolet,
              isTeamOutcome ? styles.signalUnified : "",
            ].filter(Boolean).join(" ")}
          />
        )}

        {isTeamJoin && <MotionPath path={joinPath} className={[styles.signalPath, styles.signalViolet, styles.joinSignal].join(" ")} />}
      </svg>

      <span className={styles.mobileTrack}>
        <i className={styles.mobileSignalPrimary} />
        {isTeamJoin && <i className={styles.mobileSignalJoin} />}
      </span>
    </span>
  );
}

function WorkflowMotion({
  mode,
  labels,
  content,
  flow,
}: {
  mode: Mode;
  labels: Readonly<Record<Step, string>>;
  content: Readonly<Record<Step, string>>;
  flow?: string;
}) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsPlaying(true);
        observer.disconnect();
      },
      { threshold: 0.28, rootMargin: "0px 0px -10%" },
    );

    observer.observe(journey);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={journeyRef}
      className={[styles.journey, styles[mode], isPlaying ? styles.isPlaying : ""].filter(Boolean).join(" ")}
      data-workflow={mode}
    >
      {stepOrder.map((step, index) => (
        <div className={styles.step} data-step={step} key={step}>
          <div className={styles.stepHead}>
            <span className={styles.stepIcon}>
              <StepIcon step={step} team={mode === "team"} />
            </span>
            {index < stepOrder.length - 1 && <WorkflowConnector mode={mode} index={index} />}
          </div>
          <h3>{labels[step]}</h3>
          <p><AgentInlineText text={content[step]} /></p>
        </div>
      ))}
      {flow && <p className={styles.flow}>{flow}</p>}
    </div>
  );
}

function ModeMark({ mode }: { mode: Mode }) {
  if (mode === "team") {
    return <span className={styles.teamMark}><AgentWordmark agent="alvo" size="md" /><i>+</i><AgentWordmark agent="orem" size="md" /></span>;
  }
  return <AgentWordmark agent={mode} size="md" />;
}

const copy = {
  en: {
    eyebrow: "REPRESENTATIVE WORKFLOWS",
    title: <>AI that earns<br />its place <em>in<br />the business.</em></>,
    intro: "Three ways ALVOREM turns everyday work into clearer decisions, deeper insight and real progress.",
    heroCta: "Bring us a process worth simplifying",
    cases: [
      {
        number: "01", modeLabel: "EVERYDAY INTELLIGENCE", mode: "alvo" as const,
        title: "Daily answers leaders can verify.",
        summary: "ALVO handles everyday work. It brings clarity, structure and speed to the questions that keep the business moving.",
        action: "See ALVO in action", href: "/solutions#alvo",
        problem: "Real questions from everyday work.", data: "Your business context and trusted sources.", intelligence: "Clear answers, summaries and next steps.", outcome: "Faster decisions and more time for what matters.",
      },
      {
        number: "02", modeLabel: "DEEP INTELLIGENCE", mode: "orem" as const,
        title: "Deeper reasoning when the obvious answer is not enough.",
        summary: "OREM adds depth. It reasons across more context, explores alternatives and helps you see what others might miss.",
        action: "See OREM in action", href: "/solutions#orem",
        problem: "Complex questions with higher stakes or uncertainty.", data: "Richer context across documents, conversations and systems.", intelligence: "Deeper reasoning, scenario analysis and clear options.", outcome: "Greater confidence and a clearer path forward.",
      },
      {
        number: "03", modeLabel: "TEAM INTELLIGENCE", mode: "team" as const,
        title: "One conversation from everyday work to deeper action.",
        summary: "Together, ALVO and OREM give your team the right depth at the right time — in a single, seamless experience.",
        action: "See the bigger picture", href: "/solutions#team-flow",
        problem: "People bring real work, goals and constraints.", data: "The right context, from everyday to complex.", intelligence: "ALVO for speed when possible. OREM when deeper reasoning is needed.", outcome: "Better decisions, faster progress and a more capable team.",
      },
    ],
    labels: { problem: "Problem", data: "Data", intelligence: "Intelligence", outcome: "Outcome" },
    flow: "Problem → context → right depth → useful outcome.",
    finalEyebrow: "READY WHEN YOU ARE",
    finalTitle: <>Bring us a process<br />worth <em>simplifying.</em></>,
    finalBody: "Let’s find the right starting point for your team.",
    finalCta: "Start a conversation",
    subject: "Business process worth simplifying",
  },
  ro: {
    eyebrow: "FLUXURI REPREZENTATIVE",
    title: <>AI care își câștigă<br />locul <em>în business.</em></>,
    intro: "Trei moduri prin care ALVOREM transformă munca de zi cu zi în decizii mai clare, analiză profundă și progres real.",
    heroCta: "Adu-ne un proces care merită simplificat",
    cases: [
      {
        number: "01", modeLabel: "INTELIGENȚĂ DE ZI CU ZI", mode: "alvo" as const,
        title: "Răspunsuri zilnice pe care liderii le pot verifica.",
        summary: "ALVO gestionează munca de zi cu zi. Aduce claritate, structură și viteză întrebărilor care țin businessul în mișcare.",
        action: "Vezi ALVO în acțiune", href: "/solutions#alvo",
        problem: "Întrebări reale din munca de zi cu zi.", data: "Contextul businessului și surse de încredere.", intelligence: "Răspunsuri clare, sumarizări și pași următori.", outcome: "Decizii mai rapide și mai mult timp pentru ce contează.",
      },
      {
        number: "02", modeLabel: "INTELIGENȚĂ PROFUNDĂ", mode: "orem" as const,
        title: "Raționament mai profund când răspunsul evident nu ajunge.",
        summary: "OREM adaugă profunzime. Raționează pe un context mai larg, explorează alternative și te ajută să vezi ce poate fi ușor ratat.",
        action: "Vezi OREM în acțiune", href: "/solutions#orem",
        problem: "Întrebări complexe, cu miză sau incertitudine mai mare.", data: "Context bogat din documente, conversații și sisteme.", intelligence: "Raționament profund, scenarii și opțiuni clare.", outcome: "Mai multă încredere și o direcție mai clară.",
      },
      {
        number: "03", modeLabel: "INTELIGENȚĂ DE ECHIPĂ", mode: "team" as const,
        title: "O singură conversație de la munca zilnică la acțiune profundă.",
        summary: "Împreună, ALVO și OREM oferă echipei profunzimea potrivită la momentul potrivit — într-o singură experiență coerentă.",
        action: "Vezi imaginea completă", href: "/solutions#team-flow",
        problem: "Oamenii aduc munca, obiectivele și constrângerile reale.", data: "Contextul potrivit, de la cotidian la complex.", intelligence: "ALVO pentru viteză. OREM când este nevoie de raționament profund.", outcome: "Decizii mai bune, progres mai rapid și o echipă mai capabilă.",
      },
    ],
    labels: { problem: "Problemă", data: "Date", intelligence: "Inteligență", outcome: "Rezultat" },
    flow: "Problemă → context → profunzimea potrivită → rezultat util.",
    finalEyebrow: "CÂND EȘTI PREGĂTIT",
    finalTitle: <>Adu-ne un proces<br />care merită <em>simplificat.</em></>,
    finalBody: "Găsim împreună punctul potrivit de început pentru echipa ta.",
    finalCta: "Începe o conversație",
    subject: "Proces de business care merită simplificat",
  },
} as const;

export function WorkContent() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <>
      <section className={styles.hero} id="main-content">
        <div className={["site-shell", styles.heroInner].join(" ")}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className={styles.intro}><AgentInlineText text={t.intro} /></p>
            <a className="button button--primary" href={`mailto:hello@alvorem.ro?subject=${encodeURIComponent(t.subject)}`}>{t.heroCta} <ArrowIcon /></a>
          </div>
          <WorkIntelligenceField locale={locale} />
        </div>
      </section>

      <section className={styles.cases} aria-label={t.eyebrow}>
        {t.cases.map((item) => (
          <article className={[styles.case, styles[item.mode]].join(" ")} key={item.number}>
            <div className={["site-shell", styles.caseInner].join(" ")}>
              <div className={styles.caseTop}><span>{item.number}</span><i /><span>{item.modeLabel}</span></div>
              <div className={styles.caseBody}>
                <div className={styles.caseCopy}>
                  <ModeMark mode={item.mode} />
                  <h2>{item.title}</h2>
                  <p><AgentInlineText text={item.summary} /></p>
                  <Link className={styles.caseLink} href={item.href}><AgentInlineText text={item.action} /> <ArrowIcon /></Link>
                </div>
                <WorkflowMotion
                  mode={item.mode}
                  labels={t.labels}
                  content={item}
                  flow={item.mode === "team" ? t.flow : undefined}
                />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.finalCta}>
        <div className="site-shell">
          <p className="eyebrow">{t.finalEyebrow}</p>
          <h2>{t.finalTitle}</h2>
          <p>{t.finalBody}</p>
          <a className="button button--primary" href={`mailto:hello@alvorem.ro?subject=${encodeURIComponent(t.subject)}`}>{t.finalCta} <ArrowIcon /></a>
        </div>
      </section>
    </>
  );
}
