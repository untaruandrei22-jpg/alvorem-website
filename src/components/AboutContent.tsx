"use client";

import Image from "next/image";
import { AgentInlineText } from "@/components/AgentInlineText";
import { AgentWordmark } from "@/components/AgentWordmark";
import { Logo } from "@/components/Logo";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./AboutContent.module.css";

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>;
}

const copy = {
  en: {
    eyebrow: "ABOUT ALVOREM",
    titleStart: "Technology should work around",
    titleAccent: "people.",
    intro: "We build private AI for real businesses — so people can work more clearly, make better decisions and have more time for what matters.",
    primaryCta: "Start a conversation",
    storyCta: "Our story",
    heroAlt: "People working together around a table",
    purpose: "OUR PURPOSE",
    purposeTitle: <>Make business <em>simpler.</em><br />Make room for what matters.</>,
    purposeBody: "We help businesses remove complexity with private, practical AI — so people can focus on the work that truly matters.",
    names: "THE STORY BEHIND THE NAME",
    nameCards: [
      { name: "ALVOREM", title: "A brighter tomorrow.", cue: "DAWN · A NEW BEGINNING", body: "ALVOREM brings together clarity and wisdom — people and technology for a brighter tomorrow." },
      { name: "ALVO", title: "Clarity for today.", cue: "CLARITY · PURPOSE · DIRECTION", body: "Inspired by the Portuguese meanings around alvo: clear or white, and a target or aim. ALVO focuses on what matters now." },
      { name: "OREM", title: "Wisdom for what’s next.", cue: "PRAYER · DISCERNMENT · WISDOM", body: "Orem means “pray” in Portuguese. OREM represents deeper reasoning, wider perspective and a longer horizon." },
    ],
    bridgeStart: "brings clarity.",
    bridgeEnd: "seeks wisdom.",
    bridgeBody: "Together, they form ALVOREM — practical AI for a brighter tomorrow.",
    faith: "OUR FAITH",
    faithTitle: "Faith is a foundation, not a marketing device.",
    faithBody: "ALVOREM is a Christian-driven technology company. Our faith shapes how we work, how we treat people and the kind of technology we want to build. We believe in human dignity, honest work and using our talents to serve others.",
    faithWelcome: "We welcome people of every background. You do not have to share our faith to work with us, partner with us or benefit from what we build. We simply remain grateful that you are here.",
    principles: [
      { title: "People first", body: "Every person has inherent worth and should be treated with respect, fairness and care." },
      { title: "Honest work", body: "We value integrity, transparency and doing the right thing — even when it is harder." },
      { title: "Service over self", body: "We build to serve others, not to inflate ourselves." },
      { title: "Wisdom over speed", body: "We seek discernment, not just faster answers." },
      { title: "A brighter tomorrow", body: "We believe in hope — and in using technology to help people, communities and businesses flourish." },
    ],
    commitment: "OUR COMMITMENT",
    statement: <>We build technology<br />to serve <em>people,</em> not to rule them.</>,
    statementBody: "More human businesses. A brighter tomorrow.",
    finalEyebrow: "LET’S BUILD WHAT MATTERS",
    finalTitle: "People. Ideas. A brighter tomorrow.",
    finalBody: "We would love to hear from you — about your business, your ideas or simply a better tomorrow.",
    contact: "Start a conversation",
  },
  ro: {
    eyebrow: "DESPRE ALVOREM",
    titleStart: "Tehnologia ar trebui să lucreze în jurul",
    titleAccent: "oamenilor.",
    intro: "Construim AI privat pentru afaceri reale — astfel încât oamenii să lucreze mai clar, să ia decizii mai bune și să aibă mai mult timp pentru ce contează.",
    primaryCta: "Începe o conversație",
    storyCta: "Povestea noastră",
    heroAlt: "Oameni care lucrează împreună în jurul unei mese",
    purpose: "SCOPUL NOSTRU",
    purposeTitle: <>Fă businessul <em>mai simplu.</em><br />Fă loc pentru ce contează.</>,
    purposeBody: "Ajutăm afacerile să elimine complexitatea prin AI privat și practic — pentru ca oamenii să se concentreze pe munca ce contează cu adevărat.",
    names: "POVESTEA DIN SPATELE NUMELUI",
    nameCards: [
      { name: "ALVOREM", title: "Un mâine mai luminos.", cue: "ZORI · UN NOU ÎNCEPUT", body: "ALVOREM aduce împreună claritatea și înțelepciunea — oameni și tehnologie pentru un mâine mai luminos." },
      { name: "ALVO", title: "Claritate pentru astăzi.", cue: "CLARITATE · SCOP · DIRECȚIE", body: "Inspirat de sensurile portugheze ale lui alvo: clar sau alb, dar și țintă ori scop. ALVO se concentrează pe ce contează acum." },
      { name: "OREM", title: "Înțelepciune pentru ce urmează.", cue: "RUGĂCIUNE · DISCERNĂMÂNT · ÎNȚELEPCIUNE", body: "Orem înseamnă „rugați-vă” în portugheză. OREM reprezintă raționament mai profund, perspectivă mai largă și un orizont mai lung." },
    ],
    bridgeStart: "aduce claritate.",
    bridgeEnd: "caută înțelepciune.",
    bridgeBody: "Împreună formează ALVOREM — AI practic pentru un mâine mai luminos.",
    faith: "CREDINȚA NOASTRĂ",
    faithTitle: "Credința este fundație, nu instrument de marketing.",
    faithBody: "ALVOREM este o companie de tehnologie ghidată de valori creștine. Credința ne modelează felul în care lucrăm, tratăm oamenii și tehnologia pe care vrem să o construim. Credem în demnitate umană, muncă cinstită și folosirea talentelor noastre pentru a-i servi pe ceilalți.",
    faithWelcome: "Primim oameni din orice mediu. Nu trebuie să ne împărtășești credința pentru a lucra cu noi, a ne fi partener sau a beneficia de ceea ce construim. Suntem pur și simplu recunoscători că ești aici.",
    principles: [
      { title: "Oamenii înainte de toate", body: "Fiecare om are valoare și merită respect, corectitudine și grijă." },
      { title: "Muncă cinstită", body: "Prețuim integritatea, transparența și alegerea lucrului corect — chiar când este mai greu." },
      { title: "Slujire înaintea sinelui", body: "Construim pentru a-i ajuta pe ceilalți, nu pentru a ne pune pe noi în centru." },
      { title: "Înțelepciune înaintea vitezei", body: "Căutăm discernământ, nu doar răspunsuri mai rapide." },
      { title: "Un mâine mai luminos", body: "Credem în speranță și în tehnologie folosită pentru ca oamenii, comunitățile și afacerile să înflorească." },
    ],
    commitment: "ANGAJAMENTUL NOSTRU",
    statement: <>Construim tehnologie<br />care să servească <em>oamenii,</em> nu să îi conducă.</>,
    statementBody: "Afaceri mai umane. Un mâine mai luminos.",
    finalEyebrow: "SĂ CONSTRUIM CE CONTEAZĂ",
    finalTitle: "Oameni. Idei. Un mâine mai luminos.",
    finalBody: "Ne-ar face plăcere să auzim de la tine — despre afacerea ta, ideile tale sau pur și simplu despre un mâine mai bun.",
    contact: "Începe o conversație",
  },
} as const;

export function AboutContent() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <>
      <section className={["site-shell", styles.hero].join(" ")} id="main-content">
        <div className={styles.heroCopy}>
          <p className="eyebrow"><AgentInlineText text={t.eyebrow} /></p>
          <h1>{t.titleStart} <em>{t.titleAccent}</em></h1>
          <p>{t.intro}</p>
          <div className={styles.heroActions}>
            <a className="button button--primary" href={`mailto:hello@alvorem.ro?subject=${encodeURIComponent(t.primaryCta)}`}>{t.primaryCta}<ArrowIcon /></a>
            <a className="button button--secondary" href="#purpose">{t.storyCta}</a>
          </div>
        </div>
        <figure className={styles.heroImage}>
          <Image src="/alvorem-about-conversation.webp" alt={t.heroAlt} fill priority sizes="(max-width: 900px) 100vw, 48vw" />
          <span>PEOPLE<br />CREATE A<br />BRIGHTER<br />TOMORROW</span>
        </figure>
      </section>

      <section className={styles.purpose} id="purpose">
        <div className="site-shell">
          <p className="eyebrow">{t.purpose}</p>
          <h2>{t.purposeTitle}</h2>
          <p>{t.purposeBody}</p>
        </div>
      </section>

      <section className={["site-shell", styles.names].join(" ")} id="names">
        <p className="eyebrow">{t.names}</p>
        <div className={styles.nameGrid}>
          {t.nameCards.map((card, index) => (
            <article key={card.name}>
              <div className={styles.nameMark}>
                {index === 0 ? <Logo compact /> : index === 1 ? <AgentWordmark agent="alvo" size="lg" /> : <AgentWordmark agent="orem" size="lg" />}
              </div>
              <small>{card.cue}</small>
              <h3>{card.title}</h3>
              <p><AgentInlineText text={card.body} /></p>
            </article>
          ))}
        </div>
        <div className={styles.bridge}>
          <p><AgentWordmark agent="alvo" size="md" /> <span>{t.bridgeStart}</span> <AgentWordmark agent="orem" size="md" /> <span>{t.bridgeEnd}</span></p>
          <small><AgentInlineText text={t.bridgeBody} /></small>
        </div>
      </section>

      <section className={styles.faith}>
        <div className={["site-shell", styles.faithGrid].join(" ")}>
          <div className={styles.faithCopy}>
            <p className="eyebrow">{t.faith}</p>
            <h2>{t.faithTitle}</h2>
            <p><AgentInlineText text={t.faithBody} /></p>
            <p>{t.faithWelcome}</p>
          </div>
          <div className={styles.principles}>
            {t.principles.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{principle.title}</h3><p>{principle.body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.commitment}>
        <div className="site-shell">
          <p className="eyebrow">{t.commitment}</p>
          <h2>{t.statement}</h2>
          <p>{t.statementBody}</p>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className="site-shell">
          <p className="eyebrow">{t.finalEyebrow}</p>
          <h2>{t.finalTitle}</h2>
          <p>{t.finalBody}</p>
          <a className="button button--primary" href={`mailto:hello@alvorem.ro?subject=${encodeURIComponent(t.contact)}`}>{t.contact}<ArrowIcon /></a>
        </div>
      </section>
    </>
  );
}
