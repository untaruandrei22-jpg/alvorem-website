"use client";

import { useId } from "react";
import styles from "./AgentRingMark.module.css";

type AgentRingVariant = "alvo" | "orem" | "team";
type AgentRingSize = "sm" | "md" | "lg";

export function AgentRingMark({
  variant,
  size = "md",
  className = "",
}: {
  variant: AgentRingVariant;
  size?: AgentRingSize;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const alvoGradient = `${id}-alvo`;
  const oremGradient = `${id}-orem`;
  const glow = `${id}-glow`;

  const defs = (
    <defs>
      <linearGradient id={alvoGradient} x1="12%" y1="88%" x2="88%" y2="12%">
        <stop offset="0%" stopColor="#B98566" />
        <stop offset="24%" stopColor="#E6C2A7" />
        <stop offset="48%" stopColor="#FFF9F0" />
        <stop offset="68%" stopColor="#F4DDCA" />
        <stop offset="100%" stopColor="#C68E70" />
      </linearGradient>
      <linearGradient id={oremGradient} x1="10%" y1="90%" x2="90%" y2="10%">
        <stop offset="0%" stopColor="#2A156D" />
        <stop offset="26%" stopColor="#5030C9" />
        <stop offset="50%" stopColor="#8B69FF" />
        <stop offset="72%" stopColor="#C9BAFF" />
        <stop offset="100%" stopColor="#3C209C" />
      </linearGradient>
      <filter id={glow} x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="3.2" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .42 0"
          result="softBlur"
        />
        <feMerge>
          <feMergeNode in="softBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );

  if (variant === "team") {
    return (
      <svg
        className={`${styles.mark} ${styles[size]} ${styles.team} ${className}`}
        viewBox="0 0 132 120"
        role="img"
        aria-label="ALVO and OREM interlocking rings"
      >
        {defs}
        <g filter={`url(#${glow})`}>
          <circle cx="82" cy="60" r="34" fill="none" stroke={`url(#${oremGradient})`} strokeWidth="15" />
          <circle cx="50" cy="60" r="34" fill="none" stroke={`url(#${alvoGradient})`} strokeWidth="15" />

          <circle cx="50" cy="60" r="34" fill="none" stroke="#FFFDF8" strokeWidth="3.2" opacity=".35" pathLength="100" strokeDasharray="31 69" strokeDashoffset="-54" strokeLinecap="round" />
          <circle cx="82" cy="60" r="34" fill="none" stroke="#EEE8FF" strokeWidth="3.2" opacity=".34" pathLength="100" strokeDasharray="34 66" strokeDashoffset="-6" strokeLinecap="round" />

          <circle
            cx="82"
            cy="60"
            r="34"
            fill="none"
            stroke={`url(#${oremGradient})`}
            strokeWidth="15"
            pathLength="100"
            strokeDasharray="18 82"
            strokeDashoffset="-29"
            strokeLinecap="round"
            transform="rotate(20 82 60)"
          />
          <circle
            cx="82"
            cy="60"
            r="34"
            fill="none"
            stroke="#F3EEFF"
            strokeWidth="2.6"
            opacity=".36"
            pathLength="100"
            strokeDasharray="16 84"
            strokeDashoffset="-30"
            strokeLinecap="round"
            transform="rotate(20 82 60)"
          />
        </g>
      </svg>
    );
  }

  const gradient = variant === "alvo" ? alvoGradient : oremGradient;
  const highlight = variant === "alvo" ? "#FFFDF7" : "#EEE8FF";
  const label = variant === "alvo" ? "ALVO warm pearl ring" : "OREM indigo ring";

  return (
    <svg
      className={`${styles.mark} ${styles[size]} ${styles.single} ${styles[variant]} ${className}`}
      viewBox="0 0 120 120"
      role="img"
      aria-label={label}
    >
      {defs}
      <g filter={`url(#${glow})`}>
        <circle cx="60" cy="60" r="35" fill="none" stroke={`url(#${gradient})`} strokeWidth="16" />
        <circle
          cx="60"
          cy="60"
          r="35"
          fill="none"
          stroke={highlight}
          strokeWidth="3.2"
          opacity=".38"
          pathLength="100"
          strokeDasharray="35 65"
          strokeDashoffset="-54"
          strokeLinecap="round"
        />
        <circle cx="60" cy="60" r="27.5" fill="none" stroke={highlight} strokeWidth="1" opacity=".16" />
      </g>
    </svg>
  );
}
