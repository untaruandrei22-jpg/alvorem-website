export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand" aria-label="ALVOREM">
      <svg className="brand-mark" viewBox="0 0 72 72" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="petalA" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#53308f" />
            <stop offset="0.55" stopColor="#8b63d8" />
            <stop offset="1" stopColor="#c8b2ff" />
          </linearGradient>
          <linearGradient id="petalB" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#2d1d56" />
            <stop offset="0.55" stopColor="#7650bd" />
            <stop offset="1" stopColor="#b79ae8" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d="M36 34C35 20 42 9 55 4C57 18 51 29 38 36Z" fill="url(#petalA)" filter="url(#softGlow)" />
        <path d="M34 37C22 28 11 28 5 33C12 46 23 50 35 43Z" fill="url(#petalB)" filter="url(#softGlow)" />
        <path d="M38 38C50 29 61 29 67 34C60 47 49 51 37 44Z" fill="url(#petalA)" filter="url(#softGlow)" />
      </svg>
      {!compact && (
        <div className="brand-lockup">
          <span className="brand-word">ALVOREM</span>
          <span className="brand-sub">DATA · AI · SOFTWARE</span>
        </div>
      )}
    </div>
  );
}
