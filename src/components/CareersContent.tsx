"use client";

import { AgentInlineText } from "@/components/AgentInlineText";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./CareersContent.module.css";

const formatOrder = ["video", "repo", "notion", "pdf", "voice", "other"] as const;

type FormatKind = (typeof formatOrder)[number];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

function FormatIcon({ kind }: { kind: FormatKind }) {
  if (kind === "video") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.25" />
        <path d="m10.25 8.75 5.25 3.25-5.25 3.25Z" />
      </svg>
    );
  }

  if (kind === "repo") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m8.5 6.5-5 5.5 5 5.5M15.5 6.5l5 5.5-5 5.5M13.5 4.5l-3 15" />
      </svg>
    );
  }

  if (kind === "notion") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="1.8" />
        <path d="M8 16V8l8 8V8" />
      </svg>
    );
  }

  if (kind === "pdf") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3.75h7l3 3V20.25H7zM14 3.75v3h3M9.5 11h5M9.5 14h5M9.5 17h3.25" />
      </svg>
    );
  }

  if (kind === "voice") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="3.5" width="6" height="11" rx="3" />
        <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3.5M9 20.5h6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="12" r="1.25" />
      <circle cx="12" cy="12" r="1.25" />
      <circle cx="18" cy="12" r="1.25" />
    </svg>
  );
}

const copy = {
  en: {
    eyebrow: "CAREERS, KIND OF.",
    titleLines: ["Please don’t send", "us a normal CV."],
    intro:
      "Tell us what you’ve built, broken, learned, obsessed over or tried when nobody asked you to. A video, a repo, a voice note, a Notion page or something we have not thought of yet.",
    cta: "Send the weird one",
    note: "NO OPEN ROLE? SEND IT ANYWAY.",
    core: "NO TEMPLATE REQUIRED",
    coreSub: "BUILD · THINK · CARE",
    formatItems: {
      video: "VIDEO",
      repo: "REPO",
      notion: "NOTION",
      pdf: "PDF",
      voice: "VOICE NOTE",
      other: "SOMETHING ELSE",
    },
    valuesEyebrow: "WHAT WE CARE ABOUT",
    valuesTitle: "Character before theatre.",
    valuesLead: "Five things matter more to us than a polished application.",
    values: [
      ["Curiosity", "You keep asking better questions after the obvious answer."],
      ["Character", "How you work with people matters as much as what you can build."],
      ["Craft", "You care about making useful things well, even when nobody is grading you."],
      ["Courage", "You can challenge an idea, admit you were wrong and try again."],
      ["Kindness", "Intelligence without care is not the culture we want to build."],
    ],
    anti: "THE ANTI-APPLICATION",
    antiTitle: "Show us how your mind works.",
    antiLead: "Less performance. More evidence of how you notice, think and make.",
    less: "LESS OF",
    more: "MORE OF",
    lessItems: ["Perfect templates", "Corporate theatre", "Buzzwords without proof"],
    moreItems: ["Things you made", "Problems you noticed", "Opinions you can defend"],
    finalTitle: "Different minds build a brighter tomorrow.",
    finalBody:
      "If there is something you think ALVOREM should build, improve or question, that is already a better start than a conventional cover letter.",
    email: "Email your weird CV",
    subject: "My weird CV — ALVOREM",
  },
  ro: {
    eyebrow: "CARIERE, ÎNTR-UN FEL.",
    titleLines: ["Te rugăm să nu ne trimiți", "un CV normal."],
    intro:
      "Spune-ne ce ai construit, stricat, învățat, ce te-a obsedat sau ce ai încercat fără să îți ceară nimeni. Un video, un repo, un voice note, o pagină Notion sau ceva la care noi nici nu ne-am gândit.",
    cta: "Trimite varianta ciudată",
    note: "NU E NICIUN ROL DESCHIS? TRIMITE ORICUM.",
    core: "FĂRĂ TEMPLATE OBLIGATORIU",
    coreSub: "CONSTRUIEȘTE · GÂNDEȘTE · ÎȚI PASĂ",
    formatItems: {
      video: "VIDEO",
      repo: "REPO",
      notion: "NOTION",
      pdf: "PDF",
      voice: "VOICE NOTE",
      other: "ALTCEVA",
    },
    valuesEyebrow: "CE CONTEAZĂ PENTRU NOI",
    valuesTitle: "Caracter înaintea teatrului corporate.",
    valuesLead: "Cinci lucruri contează pentru noi mai mult decât o aplicație perfect lustruită.",
    values: [
      ["Curiozitate", "Continui să pui întrebări mai bune după răspunsul evident."],
      ["Caracter", "Felul în care lucrezi cu oamenii contează la fel de mult ca ce poți construi."],
      ["Meșteșug", "Îți pasă să faci lucruri utile bine, chiar dacă nu te notează nimeni."],
      ["Curaj", "Poți contrazice o idee, admite că ai greșit și încerca din nou."],
      ["Bunătate", "Inteligența fără grijă față de oameni nu este cultura pe care vrem să o construim."],
    ],
    anti: "ANTI-APLICAȚIA",
    antiTitle: "Arată-ne cum gândești.",
    antiLead: "Mai puțină reprezentație. Mai multe dovezi despre cum observi, gândești și construiești.",
    less: "MAI PUȚIN",
    more: "MAI MULT",
    lessItems: ["Template-uri perfecte", "Teatru corporate", "Buzzwords fără dovadă"],
    moreItems: ["Lucruri pe care le-ai făcut", "Probleme pe care le-ai observat", "Opinii pe care le poți susține"],
    finalTitle: "Minți diferite construiesc un mâine mai luminos.",
    finalBody:
      "Dacă există ceva ce crezi că ALVOREM ar trebui să construiască, să îmbunătățească sau să pună sub semnul întrebării, este deja un început mai bun decât o scrisoare de intenție convențională.",
    email: "Trimite CV-ul ciudat pe email",
    subject: "CV-ul meu ciudat — ALVOREM",
  },
} as const;

export function CareersContent() {
  const { locale } = useLocale();
  const t = copy[locale];
  const applicationHref = `mailto:hello@alvorem.ro?subject=${encodeURIComponent(t.subject)}`;
  const formatsLine = formatOrder.map((kind) => t.formatItems[kind]).join(" · ");

  return (
    <div className={styles.page}>
      <section className={["site-shell", styles.hero].join(" ")} id="main-content">
        <div className={styles.heroCopy}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>
            {t.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p>{t.intro}</p>
          <a className="button button--primary" href={applicationHref}>
            {t.cta}
            <ArrowIcon />
          </a>
          <small>{t.note}</small>
        </div>

        <div className={styles.artifacts} aria-hidden="true">
          <div className={styles.orbitRing} />
          <div className={styles.artifactCore}>
            <i />
            <strong>{t.core}</strong>
            <small>{t.coreSub}</small>
          </div>
          {formatOrder.map((kind) => (
            <span className={styles.formatCard} data-format={kind} key={kind}>
              <FormatIcon kind={kind} />
              <b>{t.formatItems[kind]}</b>
            </span>
          ))}
        </div>
      </section>

      <section className={styles.values}>
        <div className={["site-shell", styles.valuesInner].join(" ")}>
          <div className={styles.valuesHeader}>
            <p className="eyebrow">{t.valuesEyebrow}</p>
            <h2>{t.valuesTitle}</h2>
            <p>{t.valuesLead}</p>
          </div>
          <ol className={styles.valueList}>
            {t.values.map(([title, body], index) => (
              <li key={title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={["site-shell", styles.anti].join(" ")}>
        <div className={styles.antiIntro}>
          <p className="eyebrow">{t.anti}</p>
          <h2>{t.antiTitle}</h2>
          <p>{t.antiLead}</p>
          <small>{formatsLine}</small>
        </div>
        <div className={styles.compare}>
          <div>
            <strong>{t.less}</strong>
            {t.lessItems.map((item) => (
              <p key={item}>
                <i aria-hidden="true">−</i>
                {item}
              </p>
            ))}
          </div>
          <div>
            <strong>{t.more}</strong>
            {t.moreItems.map((item) => (
              <p key={item}>
                <i aria-hidden="true">+</i>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.final}>
        <div className={["site-shell", styles.finalInner].join(" ")}>
          <h2>{t.finalTitle}</h2>
          <p><AgentInlineText text={t.finalBody} size="sm" /></p>
          <a className="button button--primary" href={applicationHref}>
            {t.email}
            <ArrowIcon />
          </a>
        </div>
      </section>
    </div>
  );
}
