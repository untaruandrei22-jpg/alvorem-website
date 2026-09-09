import styles from "./WorkIntelligenceField.module.css";

type Locale = "en" | "ro";

const copy = {
  en: {
    surround: "ALVOREM SURROUNDS THE WORK",
    rightIntelligence: "THE RIGHT INTELLIGENCE. AT THE RIGHT TIME.",
    tomorrow: "SAME PEOPLE. A CLEARER TOMORROW.",
    center: "PEOPLE AT THE CENTER",
    ideas: "IDEAS",
    ideasNote: "Questions into possibilities.",
    context: "SHARED CONTEXT",
    contextNote: "Your business knowledge.",
    alvo: "ALVO",
    alvoNote: "Everyday intelligence.",
    orem: "OREM",
    oremNote: "Deeper reasoning.",
    progress: "PROGRESS",
    progressNote: "Better decisions.",
  },
  ro: {
    surround: "ALVOREM ÎNCONJOARĂ MUNCA",
    rightIntelligence: "INTELIGENȚA POTRIVITĂ. LA MOMENTUL POTRIVIT.",
    tomorrow: "ACEIAȘI OAMENI. UN VIITOR MAI CLAR.",
    center: "OAMENII ÎN CENTRU",
    ideas: "IDEI",
    ideasNote: "Întrebări în posibilități.",
    context: "CONTEXT COMUN",
    contextNote: "Cunoașterea businessului tău.",
    alvo: "ALVO",
    alvoNote: "Inteligență de zi cu zi.",
    orem: "OREM",
    oremNote: "Raționament mai profund.",
    progress: "PROGRES",
    progressNote: "Decizii mai bune.",
  },
} as const;

function PersonGlyph() {
  return (
    <span className={styles.personGlyph}>
      <i className={styles.personHead} />
      <i className={styles.personBody} />
    </span>
  );
}

function Node({ className, label, note, kind }: { className: string; label: string; note: string; kind: "idea" | "context" | "alvo" | "orem" | "progress" }) {
  return (
    <div className={[styles.node, className].join(" ")}>
      <span className={[styles.nodeMark, styles[`nodeMark${kind[0].toUpperCase()}${kind.slice(1)}`]].join(" ")} aria-hidden="true" />
      <strong>{label}</strong>
      <small>{note}</small>
    </div>
  );
}

export function WorkIntelligenceField({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className={styles.field} aria-hidden="true">
      <span className={styles.ambient} />
      <span className={[styles.ring, styles.ringOuter].join(" ")} />
      <span className={[styles.ring, styles.ringMiddle].join(" ")} />
      <span className={[styles.ring, styles.ringInner].join(" ")} />

      <p className={[styles.callout, styles.calloutLeft].join(" ")}>{t.surround}</p>
      <p className={[styles.callout, styles.calloutRight].join(" ")}>{t.rightIntelligence}</p>
      <p className={[styles.callout, styles.calloutBottom].join(" ")}>{t.tomorrow}</p>

      <div className={styles.centerCore}>
        <PersonGlyph />
        <strong>{t.center}</strong>
      </div>

      <Node className={styles.nodeIdeas} label={t.ideas} note={t.ideasNote} kind="idea" />
      <Node className={styles.nodeContext} label={t.context} note={t.contextNote} kind="context" />
      <Node className={styles.nodeAlvo} label={t.alvo} note={t.alvoNote} kind="alvo" />
      <Node className={styles.nodeOrem} label={t.orem} note={t.oremNote} kind="orem" />
      <Node className={styles.nodeProgress} label={t.progress} note={t.progressNote} kind="progress" />
    </div>
  );
}
