import Link from "next/link";
import styles from "./AgentsSplit.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m13.5 2-8 11h6l-1 9 8-12h-6l1-8Z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h12v9H9l-5 4V5Z" />
      <path d="M10 9h10v8h-4l-3 3v-3" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 20v-6M12 20V9M19 20V4" />
      <path d="M3 20h18" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M3 20c.4-4.6 2.4-7 6-7s5.6 2.4 6 7" />
      <path d="M14 15c.8-.7 1.8-1 3-1 2.8 0 4.3 2 4.5 6" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.5 4.2A3.5 3.5 0 0 0 4 7a3.2 3.2 0 0 0 1 2.3A3.8 3.8 0 0 0 6.5 16a3.2 3.2 0 0 0 3 4" />
      <path d="M14.5 4.2A3.5 3.5 0 0 1 20 7a3.2 3.2 0 0 1-1 2.3A3.8 3.8 0 0 1 17.5 16a3.2 3.2 0 0 1-3 4" />
      <path d="M12 3v18M8 9c2 0 3 1 4 2M16 9c-2 0-3 1-4 2M8 15c2 0 3-1 4-2M16 15c-2 0-3-1-4-2" />
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

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="13" r="7" />
      <circle cx="11" cy="13" r="3" />
      <path d="m13.5 10.5 7-7M16 3.5h4.5V8" />
    </svg>
  );
}

const alvoItems = [
  { label: "Fast and intuitive", icon: <BoltIcon /> },
  { label: "Simple, clear answers", icon: <ChatIcon /> },
  { label: "KPI summaries and reports", icon: <ChartIcon /> },
  { label: "Perfect for daily work", icon: <PeopleIcon /> },
];

const oremItems = [
  { label: "Advanced reasoning", icon: <BrainIcon /> },
  { label: "Multi-source analysis", icon: <LayersIcon /> },
  { label: "Scenario modelling", icon: <NetworkIcon /> },
  { label: "Strategic recommendations", icon: <TargetIcon /> },
];

export function AgentsSplit() {
  return (
    <section className={styles.section} aria-labelledby="agents-title">
      <div className={styles.sectionIntro}>
        <p className="eyebrow">MEET ALVO &amp; OREM</p>
        <h2 id="agents-title">Two private AI agents. One business. Two ways to think.</h2>
      </div>

      <div className={styles.split}>
        <article className={`${styles.panel} ${styles.alvoPanel}`} id="alvo">
          <div className={styles.panelInner}>
            <div className={`${styles.orb} ${styles.alvoOrb}`} aria-hidden="true" />
            <p className={styles.wordmark}>ALVO</p>
            <h3>Clarity for every day.</h3>
            <p className={styles.description}>
              ALVO turns complexity into clear answers. Fast, simple and focused on what matters in your business.
            </p>

            <div className={styles.featureList}>
              {alvoItems.map((item) => (
                <div className={styles.feature} key={item.label}>
                  <span>{item.icon}</span>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <a className={`${styles.cta} ${styles.alvoCta}`} href="#agent-demo">
              Meet ALVO <ArrowIcon />
            </a>
          </div>
        </article>

        <div className={styles.bridge} aria-hidden="true">
          <span>SAME</span>
          <span>BUSINESS</span>
          <i />
          <span>DIFFERENT</span>
          <span>DEPTH</span>
        </div>

        <article className={`${styles.panel} ${styles.oremPanel}`} id="orem">
          <div className={styles.panelInner}>
            <div className={`${styles.orb} ${styles.oremOrb}`} aria-hidden="true" />
            <p className={styles.wordmark}>OREM</p>
            <h3>Think deeper when it matters.</h3>
            <p className={styles.description}>
              OREM brings the smartest possible reasoning to your most important questions. Deeper analysis, broader context, better decisions.
            </p>

            <div className={styles.featureList}>
              {oremItems.map((item) => (
                <div className={styles.feature} key={item.label}>
                  <span>{item.icon}</span>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <Link className={`${styles.cta} ${styles.oremCta}`} href="/about#orem-story">
              Meet OREM <ArrowIcon />
            </Link>
          </div>
        </article>
      </div>

      <p className={styles.sharedLine}>Same trusted business context. Different depth.</p>
    </section>
  );
}
