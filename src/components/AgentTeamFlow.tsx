"use client";

import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./AgentTeamFlow.module.css";

const copy = {
  en: {
    eyebrow: "ONE TEAM · ONE BUSINESS MEMORY",
    title: "They don’t work alone.",
    leadStart: "Your team starts with ",
    leadMiddle: ". When more depth is needed, ",
    leadEnd: " can bring in ",
    leadTail: " without changing the trusted business context.",
    steps: [
      {
        number: "01",
        label: "ASK",
        title: "Start naturally.",
        body: "Everyday questions, summaries and business reporting begin in the same familiar conversation.",
        agent: "alvo" as const,
      },
      {
        number: "02",
        label: "UNDERSTAND",
        title: "Handle it or escalate.",
        body: "If the task is straightforward, it gets handled immediately. If it needs more depth, the team can escalate it.",
        agent: "alvo" as const,
      },
      {
        number: "03",
        label: "GO DEEPER",
        title: "Bring in deeper capability.",
        body: "Complex analysis, broader reasoning and advanced automation move into the subscription layer.",
        agent: "orem" as const,
        badge: "SUBSCRIPTION",
      },
      {
        number: "04",
        label: "RETURN",
        title: "One clear outcome.",
        body: "The deeper work stays inside the same trusted system and comes back in a form your team can act on.",
        agent: "team" as const,
      },
    ],
    ruleStart: " is the interface. ",
    ruleMiddle: " is the depth. ",
    ruleEnd: "Together, they are the team.",
  },
  ro: {
    eyebrow: "O ECHIPĂ · O SINGURĂ MEMORIE DE BUSINESS",
    title: "Nu lucrează separat.",
    leadStart: "Echipa ta începe cu ",
    leadMiddle: ". Când este nevoie de mai multă profunzime, ",
    leadEnd: " poate aduce ",
    leadTail: " în aceeași experiență, fără să schimbe contextul de business de încredere.",
    steps: [
      {
        number: "01",
        label: "ÎNTREABĂ",
        title: "Începe natural.",
        body: "Întrebările de zi cu zi, rezumatele și rapoartele pornesc din aceeași conversație familiară.",
        agent: "alvo" as const,
      },
      {
        number: "02",
        label: "ÎNȚELEGE",
        title: "Rezolvă sau escaladează.",
        body: "Dacă cererea este simplă, este rezolvată imediat. Dacă are nevoie de mai multă profunzime, echipa o poate escalada.",
        agent: "alvo" as const,
      },
      {
        number: "03",
        label: "MERGI MAI PROFUND",
        title: "Adu capabilitatea avansată.",
        body: "Analiza complexă, raționamentul mai larg și automatizările avansate trec în nivelul disponibil prin abonament.",
        agent: "orem" as const,
        badge: "ABONAMENT",
      },
      {
        number: "04",
        label: "REZULTAT",
        title: "Un singur rezultat clar.",
        body: "Munca profundă rămâne în același sistem de încredere și revine într-o formă pe care echipa ta o poate folosi.",
        agent: "team" as const,
      },
    ],
    ruleStart: " este interfața de zi cu zi. ",
    ruleMiddle: " aduce profunzimea. ",
    ruleEnd: "Împreună sunt echipa.",
  },
} as const;

export function AgentTeamFlow() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className={styles.section} id="team-flow" aria-labelledby="team-flow-title">
      <div className="site-shell">
        <div className={styles.intro}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="team-flow-title">{t.title}</h2>
          <p>
            {t.leadStart}
            <AgentWordmark agent="alvo" size="xs" className={styles.inlineAgent} />
            {t.leadMiddle}
            <AgentWordmark agent="alvo" size="xs" className={styles.inlineAgent} />
            {t.leadEnd}
            <AgentWordmark agent="orem" size="xs" className={styles.inlineAgent} />
            {t.leadTail}
          </p>
        </div>

        <div className={styles.flow}>
          {t.steps.map((step, index) => (
            <div className={styles.stepWrap} key={step.number}>
              <article className={`${styles.step} ${step.agent === "orem" ? styles.deepStep : ""}`}>
                <div className={styles.stepTop}>
                  <span className={styles.number}>{step.number}</span>
                  <span className={styles.label}>{step.label}</span>
                  {"badge" in step ? <span className={styles.badge}>{step.badge}</span> : null}
                </div>

                <div className={styles.identity}>
                  {step.agent === "team" ? (
                    <span className={styles.teamIdentity} aria-label="ALVO and OREM">
                      <AgentWordmark agent="alvo" size="sm" />
                      <i aria-hidden="true">+</i>
                      <AgentWordmark agent="orem" size="sm" />
                    </span>
                  ) : (
                    <AgentWordmark agent={step.agent} size="sm" />
                  )}
                </div>

                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>

              {index < t.steps.length - 1 ? (
                <span className={styles.arrow} aria-hidden="true">→</span>
              ) : null}
            </div>
          ))}
        </div>

        <div className={styles.rule}>
          <AgentWordmark agent="alvo" size="sm" />
          <span>{t.ruleStart}</span>
          <AgentWordmark agent="orem" size="sm" />
          <span>{t.ruleMiddle}{t.ruleEnd}</span>
        </div>
      </div>
    </section>
  );
}
