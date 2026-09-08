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
  const alvoEdge = `${id}-alvo-edge`;
  const oremGradient = `${id}-orem`;
  const oremEdge = `${id}-orem-edge`;
  const pearlGlow = `${id}-pearl-glow`;
  const violetGlow = `${id}-violet-glow`;

  const defs = (
    <defs>
      <linearGradient id={alvoGradient} x1="8%" y1="90%" x2="92%" y2="10%">
        <stop offset="0%" stopColor="#9B6B50" />
        <stop offset="13%" stopColor="#C99C7D" />
        <stop offset="31%" stopColor="#F0D6C1" />
        <stop offset="48%" stopColor="#FFF9F1" />
        <stop offset="61%" stopColor="#E8C4A9" />
        <stop offset="80%" stopColor="#B37A5D" />
        <stop offset="100%" stopColor="#F3DCC9" />
      </linearGradient>

      <linearGradient id={alvoEdge} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF9" stopOpacity=".98" />
        <stop offset="38%" stopColor="#F6E6D8" stopOpacity=".5" />
        <stop offset="70%" stopColor="#A96F52" stopOpacity=".15" />
        <stop offset="100%" stopColor="#FFF7ED" stopOpacity=".88" />
      </linearGradient>

      <linearGradient id={oremGradient} x1="8%" y1="92%" x2="92%" y2="8%">
        <stop offset="0%" stopColor="#21105F" />
        <stop offset="15%" stopColor="#321383" />
        <stop offset="34%" stopColor="#4D26C8" />
        <stop offset="52%" stopColor="#8064FF" />
        <stop offset="67%" stopColor="#A494FF" />
        <stop offset="81%" stopColor="#4221B3" />
        <stop offset="100%" stopColor="#261067" />
      </linearGradient>

      <linearGradient id={oremEdge} x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#D8D0FF" stopOpacity=".9" />
        <stop offset="32%" stopColor="#8B78FF" stopOpacity=".35" />
        <stop offset="72%" stopColor="#4A2BD1" stopOpacity=".1" />
        <stop offset="100%" stopColor="#E8E4FF" stopOpacity=".96" />
      </linearGradient>

      <filter id={pearlGlow} x="-90%" y="-90%" width="280%" height="280%">
        <feGaussianBlur stdDeviation="4.2" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 .1  0 1 0 0 .05  0 0 1 0 0  0 0 0 .42 0"
          result="softBlur"
        />
        <feMerge>
          <feMergeNode in="softBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id={violetGlow} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="5.2" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values=".7 0 0 0 .08  0 .45 0 0 .02  0 0 1 0 .2  0 0 0 .5 0"
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
        viewBox="0 0 142 120"
        role="img"
        aria-label="ALVO and OREM interlocking rings"
      >
        {defs}

        <g>
          <g filter={`url(#${violetGlow})`}>
            <circle cx="88" cy="60" r="35" fill="none" stroke={`url(#${oremGradient})`} strokeWidth="18" />
            <circle cx="88" cy="60" r="35" fill="none" stroke={`url(#${oremEdge})`} strokeWidth="2.5" opacity=".82" />
            <circle cx="88" cy="60" r="27.3" fill="none" stroke="#CFC7FF" strokeWidth="1.2" opacity=".28" />
          </g>

          <g filter={`url(#${pearlGlow})`}>
            <circle cx="54" cy="60" r="35" fill="none" stroke={`url(#${alvoGradient})`} strokeWidth="18" />
            <circle cx="54" cy="60" r="35" fill="none" stroke={`url(#${alvoEdge})`} strokeWidth="2.4" opacity=".9" />
            <circle cx="54" cy="60" r="27.3" fill="none" stroke="#FFFDF8" strokeWidth="1.15" opacity=".35" />
          </g>

          {/* OREM passes back over ALVO on the lower-left crossing to create the interlock. */}
          <circle
            cx="88"
            cy="60"
            r="35"
            fill="none"
            stroke={`url(#${oremGradient})`}
            strokeWidth="18"
            pathLength="100"
            strokeDasharray="18 82"
            strokeDashoffset="-30"
            strokeLinecap="round"
            transform="rotate(13 88 60)"
          />
          <circle
            cx="88"
            cy="60"
            r="35"
            fill="none"
            stroke="#D8D1FF"
            strokeWidth="2.2"
            opacity=".5"
            pathLength="100"
            strokeDasharray="16 84"
            strokeDashoffset="-31"
            strokeLinecap="round"
            transform="rotate(13 88 60)"
          />

          {/* Small ALVO highlight on the upper crossing keeps the weave readable. */}
          <circle
            cx="54"
            cy="60"
            r="35"
            fill="none"
            stroke="#FFF9F1"
            strokeWidth="2.5"
            opacity=".72"
            pathLength="100"
            strokeDasharray="11 89"
            strokeDashoffset="-59"
            strokeLinecap="round"
          />
        </g>
      </svg>
    );
  }

  const isAlvo = variant === "alvo";
  const gradient = isAlvo ? alvoGradient : oremGradient;
  const edge = isAlvo ? alvoEdge : oremEdge;
  const glow = isAlvo ? pearlGlow : violetGlow;
  const innerHighlight = isAlvo ? "#FFFDF8" : "#DCD5FF";
  const label = isAlvo ? "ALVO warm pearl ring" : "OREM indigo violet ring";

  return (
    <svg
      className={`${styles.mark} ${styles[size]} ${styles.single} ${styles[variant]} ${className}`}
      viewBox="0 0 120 120"
      role="img"
      aria-label={label}
    >
      {defs}
      <g filter={`url(#${glow})`}>
        <circle cx="60" cy="60" r="35" fill="none" stroke={`url(#${gradient})`} strokeWidth="18" />
        <circle cx="60" cy="60" r="35" fill="none" stroke={`url(#${edge})`} strokeWidth="2.5" opacity=".88" />
        <circle cx="60" cy="60" r="27.2" fill="none" stroke={innerHighlight} strokeWidth="1.2" opacity=".28" />
        <circle
          cx="60"
          cy="60"
          r="35"
          fill="none"
          stroke={innerHighlight}
          strokeWidth="3.1"
          opacity={isAlvo ? ".5" : ".42"}
          pathLength="100"
          strokeDasharray="23 77"
          strokeDashoffset="-53"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
