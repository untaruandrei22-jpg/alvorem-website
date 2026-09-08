import { useId } from "react";
import styles from "./AgentWordmark.module.css";

type Agent = "alvo" | "orem" | "alvorem";
type Size = "xs" | "sm" | "md" | "lg";

type AgentWordmarkProps = {
  agent: Agent;
  size?: Size;
  className?: string;
  decorative?: boolean;
};

const WORDMARK_META = {
  alvo: { label: "ALVO", viewBox: "0 0 138 30" },
  orem: { label: "OREM", viewBox: "0 0 136 30" },
  alvorem: { label: "ALVOREM", viewBox: "0 0 250 30" },
} as const;

function AlvoLetters({ includeO = true }: { includeO?: boolean }) {
  return (
    <>
      {/* The open A is the exact no-crossbar construction used by Logo. */}
      <path d="M2 26 17 2l15 24" />
      <path d="M40 2v24h24" />
      <path d="M72 2l15 24 15-24" />
      {includeO && <ellipse cx="123" cy="14" rx="13" ry="12" />}
    </>
  );
}

function OremLetters({ offset = 0, includeO = true }: { offset?: number; includeO?: boolean }) {
  return (
    <g transform={offset ? `translate(${offset} 0)` : undefined}>
      {includeO && <ellipse cx="15" cy="14" rx="13" ry="12" />}
      <path d="M36 26V2h13c8 0 14 4.2 14 11s-4.8 9-14 9H36m13 0 14 4" />
      <path d="M71 2v24M71 2h23M71 14h20M71 26h23" />
      <path d="M102 26V2l16 20 16-20v24" />
    </g>
  );
}

function ParentRingDevice({ gradientId }: { gradientId: string }) {
  const alvoGradient = `${gradientId}-alvo`;
  const oremGradient = `${gradientId}-orem`;

  return (
    <>
      <defs>
        <linearGradient id={alvoGradient} x1="0.08" y1="0.88" x2="0.9" y2="0.12">
          <stop offset="0" stopColor="#D8B58F" />
          <stop offset="0.38" stopColor="#FFF8ED" />
          <stop offset="0.62" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#CDB294" />
        </linearGradient>
        <linearGradient id={oremGradient} x1="0.08" y1="0.9" x2="0.9" y2="0.08">
          <stop offset="0" stopColor="#4930AD" />
          <stop offset="0.42" stopColor="#7560F0" />
          <stop offset="0.7" stopColor="#D0C3FF" />
          <stop offset="1" stopColor="#6244D1" />
        </linearGradient>
      </defs>
      <circle className={styles.oremRing} cx="130" cy="14" r="12" stroke={`url(#${oremGradient})`} />
      <circle className={styles.alvoRing} cx="122" cy="14" r="12" stroke={`url(#${alvoGradient})`} />
    </>
  );
}

function WordmarkGeometry({ agent, gradientId }: { agent: Agent; gradientId: string }) {
  if (agent === "alvo") {
    return <AlvoLetters />;
  }

  if (agent === "orem") {
    return <OremLetters />;
  }

  return (
    <>
      <AlvoLetters includeO={false} />
      <ParentRingDevice gradientId={gradientId} />
      <OremLetters offset={114} includeO={false} />
    </>
  );
}

export function AgentWordmark({
  agent,
  size = "md",
  className = "",
  decorative = false,
}: AgentWordmarkProps) {
  const meta = WORDMARK_META[agent];
  const gradientId = `agent-wordmark-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <span
      className={`${styles.wordmark} ${styles[agent]} ${styles[size]} ${className}`.trim()}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : meta.label}
      aria-hidden={decorative || undefined}
    >
      <svg
        className={styles.geometry}
        viewBox={meta.viewBox}
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="xMinYMid meet"
      >
        <g className={styles.letterforms}>
          <WordmarkGeometry agent={agent} gradientId={gradientId} />
        </g>
      </svg>
    </span>
  );
}
