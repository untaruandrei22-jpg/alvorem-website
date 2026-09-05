import { useId } from "react";

export function Logo({ compact = false }: { compact?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`} aria-label={compact ? undefined : "ALVOREM — People, Tech, A Brighter Tomorrow"}>
      <svg className="brand-mark" viewBox="0 0 72 72" role="img" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-top`} x1=".1" y1=".9" x2=".82" y2=".08"><stop offset="0" stopColor="#5b34ad"/><stop offset=".48" stopColor="#9f78ea"/><stop offset=".84" stopColor="#e5d7ff"/><stop offset="1" stopColor="#fff"/></linearGradient>
          <linearGradient id={`${id}-left`} x1=".05" y1=".9" x2=".88" y2=".12"><stop offset="0" stopColor="#4d279c"/><stop offset=".56" stopColor="#8e61dd"/><stop offset="1" stopColor="#d7c2ff"/></linearGradient>
          <linearGradient id={`${id}-right`} x1=".02" y1=".96" x2=".92" y2=".06"><stop offset="0" stopColor="#6a3fc0"/><stop offset=".54" stopColor="#a882ed"/><stop offset="1" stopColor="#eee4ff"/></linearGradient>
          <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g filter={`url(#${id}-glow)`}><path d="M35.6 36.4C34.6 24.2 40.8 13.5 53.2 6.5C57.2 19.2 51.2 30.8 37.8 38.5Z" fill={`url(#${id}-top)`}/><path d="M34.7 40.3C23.4 31.2 12.2 30 5.5 34.7C11.3 47.4 22.8 52 35.8 45.8Z" fill={`url(#${id}-left)`}/><path d="M38 40.4C49.7 31.2 60.8 30.6 67 35.2C60.9 48 49.3 52.2 36.8 45.8Z" fill={`url(#${id}-right)`}/></g>
      </svg>
      {!compact && <div className="brand-lockup"><div className="brand-word"><span className="custom-a" aria-hidden="true">⌃</span><span>LVOREM</span></div><span className="brand-sub">PEOPLE&nbsp;&nbsp; · &nbsp;&nbsp;TECH&nbsp;&nbsp; · &nbsp;&nbsp;A BRIGHTER TOMORROW</span></div>}
    </div>
  );
}
