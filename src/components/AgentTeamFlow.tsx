"use client";

import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./AgentTeamFlow.module.css";

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

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3c.7 4.8 3.2 7.3 8 8-4.8.7-7.3 3.2-8 8-.7-4.8-3.2-7.3-8-8 4.8-.7 7.3-3.2 8-8Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5.5 12.5 4 4 9-9" />
    </svg>
  );
}

const copy = {
  en: {
    eyebrow: "ONE TEAM · ONE BUSINESS MEMORY",
    title: "Ask once. The team decides how deep to go.",
    leadStart: "You talk to ",
    leadMiddle: ". If the work needs deeper reasoning or automation, ",
    leadEnd: " brings in ",
    leadTail: " inside the same trusted context. No second tool. No lost conversation.",
    context: ["SAME BUSINESS MEMORY", "SAME ACCESS RULES", "ONE CONVERSATION"],
    startLabel: "01 · START HERE",
    startTitle: "Talk naturally.",
    startBody: "Ask about sales, KPIs, documents, customers or the work your team needs to move forward.",
    prompt: "What changed in the business this week?",
    decisionLabel: "02 · UNDERSTAND",
    decisionTitle: "ALVO reads the task, not just the prompt.",
    simple: "Everyday work",
    simpleDetail: "Answer directly",
    deeper: "More depth needed",
    deeperDetail: "Bring in OREM",
    subscription: "SUBSCRIPTION",
    deepLabel: "DEEPER CAPABILITY",
    deepTitle: "Reason. Investigate. Automate.",
    deepBody: "OREM handles the work that needs broader context, stronger reasoning or advanced automation — while staying inside the same business system.",
    deepFeatures: ["DEEP ANALYSIS", "AUTOMATION", "STRATEGIC WORK"],
    outcomeLabel: "03 · ONE OUTCOME",
    outcomeTitle: "The result comes back clear.",
    outcomeBody: "Your team gets one answer and one next step, regardless of how much intelligence was needed behind the scenes.",
    outcomeChip: "READY FOR YOUR TEAM",
    ruleStart: " is the interface. ",
    ruleMiddle: " is the depth. ",
    ruleEnd: "Together, they are the team.",
  },
  ro: {
    eyebrow: "O ECHIPĂ · O SINGURĂ MEMORIE DE BUSINESS",
    title: "Întrebi o dată. Echipa decide cât de profund trebuie să meargă.",
    leadStart: "Tu vorbești cu ",
    leadMiddle: ". Dacă munca are nevoie de analiză mai profundă sau automatizare, ",
    leadEnd: " îl aduce pe ",
    leadTail: " în același context de încredere. Fără alt instrument. Fără conversație pierdută.",
    context: ["ACELEAȘI DATE DE BUSINESS", "ACELEAȘI REGULI DE ACCES", "O SINGURĂ CONVERSAȚIE"],
    startLabel: "01 · ÎNCEPE AICI",
    startTitle: "Vorbește natural.",
    startBody: "Întreabă despre vânzări, KPI-uri, documente, clienți sau munca pe care echipa trebuie să o ducă mai departe.",
    prompt: "Ce s-a schimbat în business săptămâna aceasta?",
    decisionLabel: "02 · ÎNȚELEGE",
    decisionTitle: "ALVO înțelege sarcina, nu doar întrebarea.",
    simple: "Muncă de zi cu zi",
    simpleDetail: "Răspunde direct",
    deeper: "E nevoie de mai mult",
    deeperDetail: "Îl aduce pe OREM",
    subscription: "ABONAMENT",
    deepLabel: "CAPABILITATE AVANSATĂ",
    deepTitle: "Analizează. Investighează. Automatizează.",
    deepBody: "OREM preia munca ce are nevoie de context mai larg, raționament mai puternic sau automatizare avansată — în același sistem de business.",
    deepFeatures: ["ANALIZĂ PROFUNDĂ", "AUTOMATIZARE", "MUNCĂ STRATEGICĂ"],
    outcomeLabel: "03 · UN SINGUR REZULTAT",
    outcomeTitle: "Rezultatul revine clar.",
    outcomeBody: "Echipa ta primește un singur răspuns și un singur pas următor, indiferent câtă inteligență a fost necesară în spate.",
    outcomeChip: "GATA PENTRU ECHIPA TA",
    ruleStart: " este interfața. ",
    ruleMiddle: " aduce profunzimea. ",
    ruleEnd: "Împreună sunt echipa.",
  },
} as const;

export function AgentTeamFlow() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className={styles.section} id="team-flow" aria-labelledby="team-flow-title" data-no-translate>
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

        <div className={styles.system}>
          <div className={styles.contextRail} aria-label={t.context.join(", ")}>
            {t.context.map((item, index) => (
              <span key={item}>
                <i aria-hidden="true" />
                {item}
                {index < t.context.length - 1 ? <b aria-hidden="true" /> : null}
              </span>
            ))}
          </div>

          <div className={styles.journey}>
            <article className={`${styles.card} ${styles.startCard}`}>
              <div className={styles.cardLabel}>{t.startLabel}</div>
              <div className={styles.cardIdentity}>
                <span className={styles.icon}><MessageIcon /></span>
                <AgentWordmark agent="alvo" size="sm" />
              </div>
              <h3>{t.startTitle}</h3>
              <p>{t.startBody}</p>
              <div className={styles.promptBubble}>
                <span>{t.prompt}</span>
                <i aria-hidden="true"><ArrowIcon /></i>
              </div>
            </article>

            <div className={styles.connector} aria-hidden="true"><span /><i /></div>

            <article className={`${styles.card} ${styles.decisionCard}`}>
              <div className={styles.cardLabel}>{t.decisionLabel}</div>
              <div className={styles.decisionHalo} aria-hidden="true"><span /></div>
              <AgentWordmark agent="alvo" size="md" />
              <h3>{t.decisionTitle}</h3>

              <div className={styles.routes}>
                <div className={styles.route}>
                  <span className={styles.routeDot} aria-hidden="true"><CheckIcon /></span>
                  <div>
                    <strong>{t.simple}</strong>
                    <small>{t.simpleDetail}</small>
                  </div>
                  <ArrowIcon />
                </div>
                <div className={`${styles.route} ${styles.deepRoute}`}>
                  <span className={styles.routeDot} aria-hidden="true"><SparkIcon /></span>
                  <div>
                    <strong>{t.deeper}</strong>
                    <small>{t.deeperDetail}</small>
                  </div>
                  <span className={styles.subscription}>{t.subscription}</span>
                </div>
              </div>
            </article>

            <div className={`${styles.connector} ${styles.connectorDeep}`} aria-hidden="true"><span /><i /></div>

            <article className={`${styles.card} ${styles.outcomeCard}`}>
              <div className={styles.cardLabel}>{t.outcomeLabel}</div>
              <div className={styles.teamIdentity} aria-label="ALVO and OREM">
                <AgentWordmark agent="alvo" size="sm" />
                <i aria-hidden="true">+</i>
                <AgentWordmark agent="orem" size="sm" />
              </div>
              <h3>{t.outcomeTitle}</h3>
              <p>{t.outcomeBody}</p>
              <div className={styles.outcomeChip}>
                <CheckIcon /> {t.outcomeChip}
              </div>
            </article>
          </div>

          <div className={styles.deepLane}>
            <div className={styles.deepMark}>
              <span className={styles.eclipse} aria-hidden="true" />
              <div>
                <span className={styles.deepLabel}>{t.deepLabel}</span>
                <AgentWordmark agent="orem" size="md" />
              </div>
            </div>
            <div className={styles.deepCopy}>
              <strong>{t.deepTitle}</strong>
              <p>{t.deepBody}</p>
            </div>
            <div className={styles.deepFeatures}>
              {t.deepFeatures.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
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
