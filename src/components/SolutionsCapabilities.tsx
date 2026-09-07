"use client";

import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./SolutionsCapabilities.module.css";

function MessageIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h16v11H9l-5 4v-15Z" /></svg>;
}
function ChartIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20v-7M12 20V8M19 20V4" /></svg>;
}
function SparkIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5-2-6.5-6.5-2 6.5-2 2-6.5Z" /></svg>;
}
function BrainIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 4.2A3.5 3.5 0 0 0 4 7a3.2 3.2 0 0 0 1 2.3A3.8 3.8 0 0 0 6.5 16a3.2 3.2 0 0 0 3 4M14.5 4.2A3.5 3.5 0 0 1 20 7a3.2 3.2 0 0 1-1 2.3A3.8 3.8 0 0 1 17.5 16a3.2 3.2 0 0 1-3 4M12 3v18" /></svg>;
}

const copy = {
  en: {
    eyebrow: "WHAT THE TEAM CAN DO",
    title: "Ask. Report. Automate. Analyze.",
    body: "The interface stays simple. The depth changes with the work.",
    items: [
      ["01", "Ask", "Ask what changed, what matters and what to do next.", "alvo", "EVERYDAY", <MessageIcon />],
      ["02", "Report", "Turn business data into clear summaries, recurring reports and deeper analysis.", "team", "SHARED CONTEXT", <ChartIcon />],
      ["03", "Automate", "Move repeatable work forward with clear rules and people still in control.", "orem", "DEEPER LAYER", <SparkIcon />],
      ["04", "Analyze", "Investigate complex questions, compare scenarios and reason across multiple sources.", "orem", "DEEP MODE", <BrainIcon />],
    ],
    noteTitle: "You do not need to choose a model every time.",
    noteBody: "Start with ALVO. When the work needs more depth, OREM can join the same trusted context. One conversation. One business memory.",
    cta: "Start a conversation",
  },
  ro: {
    eyebrow: "CE POATE FACE ECHIPA",
    title: "Întreabă. Raportează. Automatizează. Analizează.",
    body: "Interfața rămâne simplă. Profunzimea se schimbă în funcție de muncă.",
    items: [
      ["01", "Întreabă", "Întreabă ce s-a schimbat, ce contează și ce urmează.", "alvo", "ZI DE ZI", <MessageIcon />],
      ["02", "Raportează", "Transformă datele în rezumate clare, rapoarte recurente și analiză mai profundă.", "team", "CONTEXT COMUN", <ChartIcon />],
      ["03", "Automatizează", "Du munca repetitivă mai departe cu reguli clare și cu oamenii rămași la control.", "orem", "NIVEL PROFUND", <SparkIcon />],
      ["04", "Analizează", "Investighează întrebări complexe, compară scenarii și raționează din mai multe surse.", "orem", "MOD PROFUND", <BrainIcon />],
    ],
    noteTitle: "Nu trebuie să alegi un model de fiecare dată.",
    noteBody: "Începe cu ALVO. Când munca are nevoie de mai multă profunzime, OREM poate intra în același context de încredere. O conversație. O memorie de business.",
    cta: "Începe o conversație",
  },
} as const;

export function SolutionsCapabilities() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className={styles.section} aria-labelledby="capabilities-title">
      <div className="site-shell">
        <div className={styles.intro}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="capabilities-title">{t.title}</h2>
          <p>{t.body}</p>
        </div>

        <div className={styles.grid}>
          {t.items.map((item) => {
            const mode = item[3];
            return (
              <article key={item[0]}>
                <div className={styles.topline}>
                  <span>{item[0]}</span>
                  <span className={styles.icon}>{item[5]}</span>
                </div>
                <h3>{item[1]}</h3>
                <p>{item[2]}</p>
                <div className={styles.mode}>
                  {mode === "team" ? (
                    <span className={styles.teamMarks}><AgentWordmark agent="alvo" size="xs" /><i>+</i><AgentWordmark agent="orem" size="xs" /></span>
                  ) : (
                    <AgentWordmark agent={mode} size="xs" />
                  )}
                  <small>{item[4]}</small>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.note}>
          <div>
            <h3>{t.noteTitle}</h3>
            <p>{t.noteBody}</p>
          </div>
          <a className="button button--primary" href="mailto:hello@alvorem.ro?subject=Start%20a%20conversation">{t.cta}</a>
        </div>
      </div>
    </section>
  );
}
