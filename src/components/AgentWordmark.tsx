import styles from "./AgentWordmark.module.css";

type Agent = "alvo" | "orem";
type Size = "xs" | "sm" | "md" | "lg";

export function AgentWordmark({
  agent,
  size = "md",
  className = "",
}: {
  agent: Agent;
  size?: Size;
  className?: string;
}) {
  const name = agent === "alvo" ? "ALVO" : "OREM";

  return (
    <span
      className={`${styles.wordmark} ${styles[agent]} ${styles[size]} ${className}`.trim()}
      role="img"
      aria-label={name}
    >
      {agent === "alvo" ? (
        <>
          <span className={styles.letters} aria-hidden="true">ALV</span>
          <span className={styles.oMark} aria-hidden="true" />
        </>
      ) : (
        <>
          <span className={styles.oMark} aria-hidden="true" />
          <span className={styles.letters} aria-hidden="true">REM</span>
        </>
      )}
    </span>
  );
}
