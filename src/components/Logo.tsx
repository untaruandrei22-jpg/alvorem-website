import { useId } from "react";

export function Logo({ compact = false }: { compact?: boolean }) {
  const id = useId().replace(/:/g, "");

  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`} aria-label={compact ? undefined : "ALVOREM — People, Tech, A Brighter Tomorrow"}>
      <svg className="brand-mark" viewBox="0 0 116 60" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-planet`} cx="35%" cy="30%" r="78%">
            <stop offset="0" stopColor="var(--logo-planet-core)" />
            <stop offset=".62" stopColor="var(--logo-planet-mid)" />
            <stop offset="1" stopColor="var(--logo-planet-edge)" />
          </radialGradient>
          <linearGradient id={`${id}-rim`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--logo-rim-start)" />
            <stop offset=".46" stopColor="var(--logo-rim-mid)" />
            <stop offset=".76" stopColor="var(--logo-rim-white)" />
            <stop offset="1" stopColor="var(--logo-rim-end)" />
          </linearGradient>
          <linearGradient id={`${id}-horizon`} x1=".5" y1="0" x2=".5" y2="1">
            <stop offset="0" stopColor="var(--logo-horizon-top)" />
            <stop offset=".32" stopColor="var(--logo-horizon-mid)" />
            <stop offset="1" stopColor="var(--logo-horizon-bottom)" />
          </linearGradient>
          <filter id={`${id}-soft`} x="-50%" y="-90%" width="200%" height="280%">
            <feGaussianBlur stdDeviation="2.7" />
          </filter>
          <filter id={`${id}-glow`} x="-45%" y="-85%" width="190%" height="270%">
            <feGaussianBlur stdDeviation="2.15" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <ellipse cx="58" cy="32" rx="43" ry="19" fill="var(--logo-aura)" filter={`url(#${id}-soft)`} />
        <circle cx="58" cy="21.8" r="20.7" fill={`url(#${id}-planet)`} />
        <path d="M.5 59Q58 27.4 115.5 59V60H.5Z" fill={`url(#${id}-horizon)`} />

        <g filter={`url(#${id}-glow)`}>
          <circle cx="58" cy="21.8" r="20.7" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.05" />
          <path d="M.5 59Q58 27.4 115.5 59" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.2" strokeLinecap="round" />
          <ellipse cx="58" cy="31.6" rx="4.8" ry=".75" fill="var(--logo-hotspot)" />
        </g>
      </svg>

      {!compact && (
        <div className="brand-lockup">
          <div className="brand-word">
            <svg className="wordmark-a" viewBox="0 0 30 26" aria-hidden="true">
              <path d="M2 24 12.8 2M17.2 2 28 24" fill="none" stroke="currentColor" strokeWidth="2.05" strokeLinecap="square" />
            </svg>
            <span>LVOREM</span>
          </div>
          <span className="brand-sub">PEOPLE&nbsp;&nbsp; · &nbsp;&nbsp;TECH&nbsp;&nbsp; · &nbsp;&nbsp;A BRIGHTER TOMORROW</span>
        </div>
      )}
    </div>
  );
}
