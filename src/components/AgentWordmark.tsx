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
          <svg className={styles.brandA} viewBox="0 0 34 28" aria-hidden="true" focusable="false">
            <path d="M2 26 17 2l15 24" />
          </svg>
          <span aria-hidden="true">L</span>
          <span aria-hidden="true">V</span>
          <span aria-hidden="true">O</span>
        </>
      ) : (
        <>
          <span aria-hidden="true">O</span>
          <span aria-hidden="true">R</span>
          <span aria-hidden="true">E</span>
          <span aria-hidden="true">M</span>
        </>
      )}
    </span>
  );
}
