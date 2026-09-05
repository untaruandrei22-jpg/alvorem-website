import { useId } from "react";

export function Logo({ compact = false }: { compact?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`} aria-label={compact ? undefined : "ALVOREM — People, Tech, A Brighter Tomorrow"}>
      <svg className="brand-mark" viewBox="0 0 116 52" role="img" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-planet`} cx="34%" cy="32%" r="76%">
            <stop offset="0" stopColor="#302666" />
            <stop offset=".64" stopColor="#21194f" />
            <stop offset="1" stopColor="#644cc8" />
          </radialGradient>
          <linearGradient id={`${id}-rim`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#7559dc" />
            <stop offset=".46" stopColor="#bba3f4" />
            <stop offset=".76" stopColor="#f7f5fc" />
            <stop offset="1" stopColor="#a982e8" />
          </linearGradient>
          <linearGradient id={`${id}-horizon`} x1=".5" y1="0" x2=".5" y2="1">
            <stop offset="0" stopColor="#4e3d9c" />
            <stop offset=".24" stopColor="#2c245f" />
            <stop offset="1" stopColor="#0d0b1d" />
          </linearGradient>
          <filter id={`${id}-glow`} x="-45%" y="-85%" width="190%" height="270%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="58" cy="22.8" r="22.2" fill={`url(#${id}-planet)`} />
        <path d="M1 51Q58 21.5 115 51V52H1Z" fill={`url(#${id}-horizon)`} />
        <g filter={`url(#${id}-glow)`}>
          <circle cx="58" cy="22.8" r="22.2" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.15" />
          <path d="M1 51Q58 21.5 115 51" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.3" strokeLinecap="round" />
          <ellipse cx="58" cy="36.4" rx="3.8" ry=".7" fill="#ffffff" />
        </g>
      </svg>
      {!compact && (
        <div className="brand-lockup">
          <div className="brand-word">
            <svg className="wordmark-a" viewBox="0 0 30 26" aria-hidden="true">
              <path d="M2 24 12.5 2M17.5 2 28 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
              <circle cx="15" cy="20.2" r="1.45" fill="currentColor" />
            </svg>
            <span>LVOREM</span>
          </div>
          <span className="brand-sub">PEOPLE&nbsp;&nbsp; · &nbsp;&nbsp;TECH&nbsp;&nbsp; · &nbsp;&nbsp;A BRIGHTER TOMORROW</span>
        </div>
      )}
    </div>
  );
}
