"use client";

import Image from "next/image";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./HomeClosing.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5h16v11H9l-5 4v-15Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 20v-7M12 20V8M19 20V4" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5-2-6.5-6.5-2 6.5-2 2-6.5Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 19 6v5c0 4.6-2.5 8-7 10-4.5-2-7-5.4-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M3 20c.4-4.6 2.4-7 6-7s5.6 2.4 6 7M14 15c.8-.7 1.8-1 3-1 2.8 0 4.3 2 4.5 6" />
    </svg>
  );
}

const copy = {
  en: {
    eyebrow: "ASK · REPORT · AUTOMATE",
    title: "One interface. Less to carry.",
    leadStart: "Start with ",
    leadMiddle: ". When the work needs more depth, ",
    leadEnd: " joins the same trusted system.",
    capabilities: [
      {
        number: "01",
        title: "Ask",
        body: "Ask what changed, what matters and what to do next in your business.",
        mode: "alvo" as const,
        modeCopy: "EVERYDAY",
        icon: <MessageIcon />,
      },
      {
        number: "02",
        title: "Report",
        body: "Turn business data into clear summaries, recurring reports and deeper analysis when needed.",
        mode: "team" as const,
        modeCopy: "SHARED CONTEXT",
        icon: <ChartIcon />,
      },
      {
        number: "03",
        title: "Automate",
        body: "Move repeatable work forward with clear rules and people still in control.",
        mode: "orem" as const,
        modeCopy: "DEEPER LAYER",
        icon: <SparkIcon />,
      },
    ],
    trustEyebrow: "PRIVATE BY DESIGN · HUMAN BY PRINCIPLE",
    trustTitle: "Your business stays yours.",
    trustBody:
      "Your context stays controlled. Your people remain in charge. AI helps carry the work — it does not take ownership away from them.",
    trustItems: ["Private business context", "Permission-aware access", "People stay in control"],
    ctaEyebrow: "READY WHEN YOU ARE",
    ctaTitleStart: "Start with",
    ctaBody: "Your business doesn’t need more complexity.",
    ctaButton: "Start a conversation",
    ctaNote: "will be there when you need to go deeper.",
  },
  ro: {
    eyebrow: "ÎNTREABĂ · RAPORTEAZĂ · AUTOMATIZEAZĂ",
    title: "O singură interfață. Mai puțin de dus.",
    leadStart: "Începe cu ",
    leadMiddle: ". Când munca are nevoie de mai multă profunzime, ",
    leadEnd: " intră în același sistem de încredere.",
    capabilities: [
      {
        number: "01",
        title: "Întreabă",
        body: "Întreabă ce s-a schimbat, ce contează și ce urmează pentru afacerea ta.",
        mode: "alvo" as const,
        modeCopy: "ZI DE ZI",
        icon: <MessageIcon />,
      },
      {
        number: "02",
        title: "Raportează",
        body: "Transformă datele în rezumate clare, rapoarte recurente și analiză mai profundă atunci când este nevoie.",
        mode: "team" as const,
        modeCopy: "CONTEXT COMUN",
        icon: <ChartIcon />,
      },
      {
        number: "03",
        title: "Automatizează",
        body: "Du munca repetitivă mai departe cu reguli clare și cu oamenii rămași la control.",
        mode: "orem" as const,
        modeCopy: "NIVEL PROFUND",
        icon: <SparkIcon />,
      },
    ],
    trustEyebrow: "PRIVAT PRIN DESIGN · UMAN PRIN PRINCIPIU",
    trustTitle: "Afacerea ta rămâne a ta.",
    trustBody:
      "Contextul afacerii tale rămâne controlat. Oamenii rămân la conducere. AI-ul ajută la ducerea muncii — nu preia controlul asupra ei.",
    trustItems: ["Context privat de business", "Acces în funcție de permisiuni", "Oamenii rămân la control"],
    ctaEyebrow: "CÂND EȘTI PREGĂTIT",
    ctaTitleStart: "Începe cu",
    ctaBody: "Afacerea ta nu are nevoie de mai multă complexitate.",
    ctaButton: "Începe o conversație",
    ctaNote: "va fi acolo când vei avea nevoie de mai multă profunzime.",
  },
} as const;

export function HomeClosing() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className={styles.section} id="solutions" aria-labelledby="closing-title">
      <div className="site-shell">
        <div className={styles.capabilityIntro}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="closing-title">{t.title}</h2>
          <p>
            {t.leadStart}
            <AgentWordmark agent="alvo" size="xs" className={styles.inlineAgent} />
            {t.leadMiddle}
            <AgentWordmark agent="orem" size="xs" className={styles.inlineAgent} />
            {t.leadEnd}
          </p>
        </div>

        <div className={styles.capabilityRail}>
          {t.capabilities.map((item) => (
            <article className={styles.capability} key={item.number}>
              <div className={styles.capabilityTop}>
                <span className={styles.number}>{item.number}</span>
                <span className={styles.icon}>{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className={styles.mode}>
                {item.mode === "team" ? (
                  <span className={styles.teamMark}>
                    <AgentWordmark agent="alvo" size="xs" />
                    <i aria-hidden="true">+</i>
                    <AgentWordmark agent="orem" size="xs" />
                  </span>
                ) : (
                  <AgentWordmark agent={item.mode} size="xs" />
                )}
                <small>{item.modeCopy}</small>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.trustPanel} id="about">
          <div className={styles.trustCopy}>
            <p className="eyebrow">{t.trustEyebrow}</p>
            <h2>{t.trustTitle}</h2>
            <p>{t.trustBody}</p>

            <div className={styles.trustList}>
              {t.trustItems.map((item, index) => (
                <div key={item}>
                  <span className={styles.trustIcon}>
                    {index === 0 ? <LockIcon /> : index === 1 ? <ShieldIcon /> : <PeopleIcon />}
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <figure className={styles.humanFrame}>
            <Image
              src="/alvorem-human-workspace.webp"
              alt={
                locale === "ro"
                  ? "Doi colegi analizând calm afacerea lor împreună la un laptop"
                  : "Two colleagues calmly reviewing their business together on a laptop"
              }
              fill
              sizes="(max-width: 820px) 100vw, 46vw"
            />
            <figcaption>
              {locale === "ro" ? "Oamenii rămân în centrul deciziilor." : "People stay at the center of decisions."}
            </figcaption>
          </figure>
        </div>
      </div>

      <div className={styles.cta} id="contact">
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={["site-shell", styles.ctaInner].join(" ")}>
          <p className="eyebrow">{t.ctaEyebrow}</p>
          <h2>
            <span>{t.ctaTitleStart}</span>
            <span className={styles.ctaAgentPhrase}>
              <AgentWordmark agent="alvo" size="lg" className={styles.ctaAgent} />
              <i aria-hidden="true">.</i>
            </span>
          </h2>
          <p className={styles.ctaBody}>{t.ctaBody}</p>
          <a
            className="button button--primary"
            href="mailto:hello@alvorem.ro?subject=Start%20a%20conversation"
          >
            {t.ctaButton} <ArrowIcon />
          </a>
          <p className={styles.ctaNote}>
            <AgentWordmark agent="orem" size="xs" />
            <span>{t.ctaNote}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
