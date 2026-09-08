import styles from "./AgentWordmark.module.css";

type Agent = "alvo" | "orem" | "alvorem";
type Size = "xs" | "sm" | "md" | "lg";

function BrandA() {
  return (
    <svg className={styles.brandA} viewBox="0 0 34 28" aria-hidden="true" focusable="false">
      <path d="M2 26 17 2l15 24" />
    </svg>
  );
}

export function AgentWordmark({
  agent,
  size = "md",
  className = "",
}: {
  agent: Agent;
  size?: Size;
  className?: string;
}) {
  const name = agent === "alvo" ? "ALVO" : agent === "orem" ? "OREM" : "ALVOREM";

  return (
    <span
      className={`${styles.wordmark} ${styles[agent]} ${styles[size]} ${className}`.trim()}
      role="img"
      aria-label={name}
    >
      {agent === "alvo" && (
        <>
          <BrandA />
          <span aria-hidden="true">L</span>
          <span aria-hidden="true">V</span>
          <span aria-hidden="true">O</span>
        </>
      )}

      {agent === "orem" && (
        <>
          <span aria-hidden="true">O</span>
          <span aria-hidden="true">R</span>
          <span aria-hidden="true">E</span>
          <span aria-hidden="true">M</span>
        </>
      )}

      {agent === "alvorem" && (
        <>
          <BrandA />
          <span aria-hidden="true">L</span>
          <span aria-hidden="true">V</span>
          <span aria-hidden="true">O</span>
          <span aria-hidden="true">R</span>
          <span aria-hidden="true">E</span>
          <span aria-hidden="true">M</span>
        </>
      )}
    </span>
  );
}
