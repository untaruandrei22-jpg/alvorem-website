"use client";

import { AgentWordmark } from "@/components/AgentWordmark";
import { HomeAgentDemo } from "@/components/HomeAgentDemo";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./HomepageHero.module.css";

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

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 20v-7M12 20V8M19 20V4" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m4 12 8 4 8-4M4 16l8 5 8-5" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.5 4.2A3.5 3.5 0 0 0 4 7a3.2 3.2 0 0 0 1 2.3A3.8 3.8 0 0 0 6.5 16a3.2 3.2 0 0 0 3 4" />
      <path d="M14.5 4.2A3.5 3.5 0 0 1 20 7a3.2 3.2 0 0 1-1 2.3A3.8 3.8 0 0 1 17.5 16a3.2 3.2 0 0 1-3 4" />
      <path d="M12 3v18M8 9c2 0 3 1 4 2M16 9c-2 0-3 1-4 2" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <circle cx="12" cy="11" r="2" />
      <path d="M6.8 7 10 9.7M17.2 7 14 9.7M12 13v3" />
    </svg>
  );
}

const copy = {
  en: {
    eyebrow: "PRIVATE AI FOR A CLEARER TOMORROW",
    titleLead: "Your business,",
    titleEm: "simpler.",
    description:
      "One private AI team for your business. ALVO handles everyday work. OREM adds deeper reasoning and automation when more is needed.",
    primary: "Start with",
    secondary: "See how the team works",
    proof: ["Private by design", "Built for real business", "From daily clarity to deeper strategy"],
    daily: "EVERYDAY BUSINESS CHAT",
    dailyDetail: "Answers · summaries · reports",
    oremLabel: "SUBSCRIPTION UPGRADE",
    oremTitle: "DEEPER INTELLIGENCE",
    oremItems: ["Deeper reasoning", "Multi-source analysis", "Scenario modelling", "Advanced automation"],
    relation: "Same context. More depth when needed.",
  },
  ro: {
    eyebrow: "AI PRIVAT PENTRU UN MÂINE MAI CLAR",
    titleLead: "Afacerea ta,",
    titleEm: "mai simplă.",
    description:
      "O singură echipă AI privată pentru afacerea ta. ALVO se ocupă de munca de zi cu zi. OREM adaugă analiză profundă și automatizare când este nevoie de mai mult.",
    primary: "Începe cu",
    secondary: "Vezi cum lucrează echipa",
    proof: ["Privat prin design", "Construit pentru business real", "De la claritate zilnică la strategie profundă"],
    daily: "CHAT-UL DE BUSINESS DE ZI CU ZI",
    dailyDetail: "Răspunsuri · rezumate · rapoarte",
    oremLabel: "UPGRADE PRIN ABONAMENT",
    oremTitle: "INTELIGENȚĂ MAI PROFUNDĂ",
    oremItems: ["Raționament aprofundat", "Analiză din surse multiple", "Modelare de scenarii", "Automatizare avansată"],
    relation: "Același context. Mai multă profunzime când este nevoie.",
  },
} as const;

export function HomepageHero() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section
      className={["site-shell", styles.hero].join(" ")}
      id="main-content"
      aria-labelledby="hero-title"
    >
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.planet} />
        <span className={styles.horizon} />
      </div>

      <div className={styles.copy}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 id="hero-title">
          <span>{t.titleLead}</span>
          <em>{t.titleEm}</em>
        </h1>

        <p className={styles.description}>{t.description}</p>

        <div className={styles.actions}>
          <a className="button button--primary" href="#agent-demo">
            {t.primary} <AgentWordmark agent="alvo" size="xs" className={styles.buttonAgent} /> <ArrowIcon />
          </a>
          <a className="button button--secondary" href="#team-flow">
            {t.secondary}
          </a>
        </div>

        <div className={styles.proofList} aria-label={locale === "ro" ? "Beneficii principale" : "Key benefits"}>
          <span><LockIcon />{t.proof[0]}</span>
          <span><ChartIcon />{t.proof[1]}</span>
          <span><LayersIcon />{t.proof[2]}</span>
        </div>
      </div>

      <div className={styles.stage} id="agent-demo" aria-label="ALVOREM AI team product demonstration">
        <article className={styles.oremPanel}>
          <div className={styles.oremTopline}>
            <span className={styles.eclipse} aria-hidden="true" />
            <AgentWordmark agent="orem" size="sm" />
          </div>
          <p className={styles.upgradeLabel}>{t.oremLabel}</p>
          <h2>{t.oremTitle}</h2>
          <div className={styles.oremList}>
            {t.oremItems.map((item, index) => (
              <span key={item}>
                {index === 0 ? <BrainIcon /> : index === 1 ? <LayersIcon /> : <NetworkIcon />}
                {item}
              </span>
            ))}
          </div>
        </article>

        <div className={styles.alvoPanel}>
          <div className={styles.alvoTopline}>
            <AgentWordmark agent="alvo" size="sm" />
            <span>{t.daily}</span>
          </div>
          <small>{t.dailyDetail}</small>
          <HomeAgentDemo />
        </div>

        <div className={styles.relationNote}>
          <span className={styles.relationLine} aria-hidden="true" />
          <p>{t.relation}</p>
        </div>
      </div>
    </section>
  );
}
