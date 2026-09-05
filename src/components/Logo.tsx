export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`} aria-label="ALVOREM">
      <svg className="brand-mark" viewBox="0 0 84 72" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="petalTop" x1="0.08" y1="0.94" x2="0.88" y2="0.08">
            <stop offset="0" stopColor="#6b45b9" />
            <stop offset="0.52" stopColor="#a77cf1" />
            <stop offset="1" stopColor="#f1e9ff" />
          </linearGradient>
          <linearGradient id="petalLeft" x1="0.04" y1="0.9" x2="0.95" y2="0.12">
            <stop offset="0" stopColor="#5a36a1" />
            <stop offset="0.58" stopColor="#9368e4" />
            <stop offset="1" stopColor="#d5c0ff" />
          </linearGradient>
          <linearGradient id="petalRight" x1="0.05" y1="0.92" x2="0.9" y2="0.05">
            <stop offset="0" stopColor="#6743ae" />
            <stop offset="0.55" stopColor="#a475e7" />
            <stop offset="1" stopColor="#eadfff" />
          </linearGradient>
          <filter id="logoBloom" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.1" result="bloom" />
            <feMerge><feMergeNode in="bloom" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d="M42 35C41.4 20.5 49.4 8.7 64.5 3.6C66.1 18.1 59.1 29.4 44.2 38.2Z" fill="url(#petalTop)" filter="url(#logoBloom)" />
        <path d="M39.7 39C26.9 28.7 14.4 28.6 6.1 34.1C14.8 48.9 27.2 53.3 41.2 45.7Z" fill="url(#petalLeft)" filter="url(#logoBloom)" />
        <path d="M44.1 39.5C56.6 29.1 69.4 29.3 77.4 35C68.7 49.7 56.6 53.9 42.3 46Z" fill="url(#petalRight)" filter="url(#logoBloom)" />
      </svg>
      {!compact && (
        <div className="brand-lockup">
          <span className="brand-word">ALVOREM</span>
          <span className="brand-sub">PEOPLE · TECH · A BRIGHTER TOMORROW</span>
        </div>
      )}
    </div>
  );
}
