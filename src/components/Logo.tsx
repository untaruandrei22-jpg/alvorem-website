import { useId } from "react";

export function Logo({ compact = false }: { compact?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`} aria-label={compact ? undefined : "ALVOREM — People, Tech, A Brighter Tomorrow"}>
      <svg className="brand-mark" viewBox="0 0 112 72" role="img" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-planet`} cx="34%" cy="30%" r="78%">
            <stop offset="0" stopColor="#32276d" />
            <stop offset=".62" stopColor="#241c58" />
            <stop offset="1" stopColor="#6f5bd9" />
          </radialGradient>
          <linearGradient id={`${id}-rim`} x1="0" y1=".75" x2="1" y2=".2">
            <stop offset="0" stopColor="#6f5bd9" />
            <stop offset=".58" stopColor="#c8b4f0" />
            <stop offset="1" stopColor="#f7f5fc" />
          </linearGradient>
          <linearGradient id={`${id}-horizon`} x1=".5" y1="0" x2=".5" y2="1">
            <stop offset="0" stopColor="#5440a8" />
            <stop offset=".18" stopColor="#30266a" />
            <stop offset="1" stopColor="#17142d" />
          </linearGradient>
          <filter id={`${id}-glow`} x="-50%" y="-70%" width="200%" height="240%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter={`url(#${id}-glow)`}>
          <circle cx="56" cy="27" r="20.5" fill={`url(#${id}-planet)`} stroke={`url(#${id}-rim)`} strokeWidth="1.4" />
          <path d="M4 69Q56 25 108 69V72H4Z" fill={`url(#${id}-horizon)`} />
          <path d="M4 69Q56 25 108 69" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </svg>
      {!compact && (
        <div className="brand-lockup">
          <div className="brand-word">
            <svg className="wordmark-a" viewBox="0 0 30 26" aria-hidden="true">
              <path d="M2 24 12.5 2M17.5 2 28 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
            </svg>
            <span>LVOREM</span>
          </div>
          <span className="brand-sub">PEOPLE&nbsp;&nbsp; · &nbsp;&nbsp;TECH&nbsp;&nbsp; · &nbsp;&nbsp;A BRIGHTER TOMORROW</span>
        </div>
      )}
    </div>
  );
}
