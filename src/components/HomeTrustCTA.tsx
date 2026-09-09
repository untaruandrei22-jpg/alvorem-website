"use client";

import Image from "next/image";
import Link from "next/link";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./HomeTrustCTA.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
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
    trustEyebrow: "PRIVATE BY DESIGN · HUMAN BY PRINCIPLE",
    trustTitle: "Your business stays yours.",
    trustBody: "Your context stays controlled. Your people remain in charge. AI helps carry the work — it does not take ownership away from them.",
    trustItems: ["Private business context", "Permission-aware access", "People stay in control"],
    caption: "People stay at the center of decisions.",
    ctaEyebrow: "READY WHEN YOU ARE",
    ctaStart: "Start with",
    ctaBody: "Your business doesn’t need more complexity.",
    ctaButton: "Start a conversation",
    ctaNote: "is there when you need to go deeper.",
  },
  ro: {
    trustEyebrow: "PRIVAT PRIN DESIGN · UMAN PRIN PRINCIPIU",
    trustTitle: "Afacerea ta rămâne a ta.",
    trustBody: "Contextul afacerii tale rămâne controlat. Oamenii rămân la conducere. AI-ul ajută la ducerea muncii — nu preia controlul asupra ei.",
    trustItems: ["Context privat de business", "Acces în funcție de permisiuni", "Oamenii rămân la control"],
    caption: "Oamenii rămân în centrul deciziilor.",
    ctaEyebrow: "CÂND EȘTI PREGĂTIT",
    ctaStart: "Începe cu",
    ctaBody: "Afacerea ta nu are nevoie de mai multă complexitate.",
    ctaButton: "Începe o conversație",
    ctaNote: "este acolo când ai nevoie de mai multă profunzime.",
  },
} as const;

export function HomeTrustCTA() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className={styles.section}>
      <div className={["site-shell", styles.trust].join(" ")}>
        <div className={styles.copy}>
          <p className="eyebrow">{t.trustEyebrow}</p>
          <h2>{t.trustTitle}</h2>
          <p>{t.trustBody}</p>
          <div className={styles.list}>
            {t.trustItems.map((item, index) => (
              <div key={item}>
                <span>{index === 0 ? <LockIcon /> : index === 1 ? <ShieldIcon /> : <PeopleIcon />}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <figure className={styles.image}>
          <Image
            src="/alvorem-human-workspace.webp"
            alt={locale === "ro" ? "Doi colegi analizând afacerea lor la un laptop" : "Two colleagues reviewing their business on a laptop"}
            fill
            sizes="(max-width: 820px) 100vw, 48vw"
          />
          <figcaption>{t.caption}</figcaption>
        </figure>
      </div>

      <div className={styles.cta} id="contact">
        <div className={styles.glow} aria-hidden="true" />
        <div className={["site-shell", styles.ctaInner].join(" ")}>
          <p className="eyebrow">{t.ctaEyebrow}</p>
          <h2>
            <span>{t.ctaStart}</span>
            <span className={styles.alvoPhrase}>
              <AgentWordmark agent="alvo" size="lg" />
              <i aria-hidden="true">.</i>
            </span>
          </h2>
          <p>{t.ctaBody}</p>
          <Link
            className="button button--primary"
            href="/start?source=home-trust&intent=alvo"
          >
            {t.ctaButton} <ArrowIcon />
          </Link>
          <div className={styles.note}>
            <AgentWordmark agent="orem" size="xs" />
            <span>{t.ctaNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
