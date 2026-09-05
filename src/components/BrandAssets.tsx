type FeatureName = "agents" | "dashboards" | "automation" | "founder";

export function AlvoremLogo({ compact = false }: { compact?: boolean }) {
  if (compact) return <HeroMark className="brand-symbol-compact" />;

  return (
    <svg className="alvorem-lockup" viewBox="0 0 430 88" role="img" aria-label="ALVOREM — People, Tech, A Brighter Tomorrow">
      <defs>
        <linearGradient id="brandPetalTop" x1="0.12" y1="0.9" x2="0.82" y2="0.08">
          <stop offset="0" stopColor="#6540ad" />
          <stop offset="0.52" stopColor="#a778ee" />
          <stop offset="1" stopColor="#f4edff" />
        </linearGradient>
        <linearGradient id="brandPetalSide" x1="0.08" y1="0.88" x2="0.92" y2="0.12">
          <stop offset="0" stopColor="#573393" />
          <stop offset="0.56" stopColor="#8f63d5" />
          <stop offset="1" stopColor="#d9c5ff" />
        </linearGradient>
        <linearGradient id="brandStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e9e2f7" />
          <stop offset="0.55" stopColor="#f5f1fa" />
          <stop offset="1" stopColor="#d8c7f1" />
        </linearGradient>
        <filter id="brandGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <g transform="translate(0 4) scale(.9)" filter="url(#brandGlow)">
        <path d="M43 37C42 22 50 9 66 3C68 18 61 31 46 40Z" fill="url(#brandPetalTop)" />
        <path d="M40 41C27 30 14 30 5 35C14 51 28 55 42 47C46 45 46 42 40 41Z" fill="url(#brandPetalSide)" />
        <path d="M47 41C60 30 73 30 82 36C73 51 60 56 45 48C41 46 41 43 47 41Z" fill="url(#brandPetalTop)" />
      </g>

      <g className="wordmark-vector" fill="none" stroke="url(#brandStroke)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M104 47 L118 17 L132 47" />
        <circle cx="118" cy="35.5" r="2.3" fill="#9d77e6" stroke="none" />

        <path d="M149 17 L149 47 L168 47" />
        <path d="M181 17 L193 47 L205 17" />
        <ellipse cx="232" cy="32" rx="15.5" ry="15" />
        <path d="M262 47 L262 17 L277 17 C287 17 292 22 292 31 C292 39 286 43 277 43 L262 43 M277 43 L294 47" />
        <path d="M313 17 L313 47 M313 17 L335 17 M313 32 L331 32 M313 47 L335 47" />
        <path d="M356 47 L356 17 L370 39 L384 17 L384 47" />
      </g>

      <text x="103" y="72" className="brand-tagline-vector">PEOPLE · TECH · A BRIGHTER TOMORROW</text>
    </svg>
  );
}

export function HeroMark({ className = "" }: { className?: string }) {
  return (
    <svg className={`hero-mark-svg ${className}`} viewBox="0 0 240 220" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="heroTop" x1="0.15" y1="0.95" x2="0.85" y2="0.05">
          <stop offset="0" stopColor="#7045c1" />
          <stop offset="0.42" stopColor="#a879ee" />
          <stop offset="0.72" stopColor="#d9c2ff" />
          <stop offset="1" stopColor="#fffaff" />
        </linearGradient>
        <linearGradient id="heroLeft" x1="0.08" y1="0.9" x2="0.95" y2="0.1">
          <stop offset="0" stopColor="#4d287f" />
          <stop offset="0.45" stopColor="#7950c8" />
          <stop offset="0.76" stopColor="#aa7de9" />
          <stop offset="1" stopColor="#e4d4ff" />
        </linearGradient>
        <linearGradient id="heroRight" x1="0.06" y1="0.92" x2="0.94" y2="0.08">
          <stop offset="0" stopColor="#542d8d" />
          <stop offset="0.43" stopColor="#8658d1" />
          <stop offset="0.75" stopColor="#b88cf1" />
          <stop offset="1" stopColor="#f0e2ff" />
        </linearGradient>
        <radialGradient id="heroCore" cx="50%" cy="54%" r="50%">
          <stop offset="0" stopColor="#fffaff" stopOpacity="1" />
          <stop offset="0.28" stopColor="#e7d5ff" stopOpacity=".88" />
          <stop offset="0.62" stopColor="#a86eea" stopOpacity=".32" />
          <stop offset="1" stopColor="#5c329b" stopOpacity="0" />
        </radialGradient>
        <filter id="heroBloom" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="petalSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.1" result="soft" />
          <feMerge><feMergeNode in="soft" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <ellipse cx="120" cy="133" rx="74" ry="56" fill="url(#heroCore)" filter="url(#heroBloom)" opacity=".82" />

      <g filter="url(#petalSoft)">
        <path d="M119 115C102 72 117 25 171 5C181 51 162 91 124 121C120 124 117 120 119 115Z" fill="url(#heroTop)" />
        <path d="M108 126C77 101 35 93 7 112C29 150 69 169 109 146C119 140 118 133 108 126Z" fill="url(#heroLeft)" />
        <path d="M132 126C164 99 204 97 233 116C211 157 172 171 130 147C120 141 121 133 132 126Z" fill="url(#heroRight)" />
      </g>

      <path d="M126 109C128 67 143 33 170 15" stroke="#fff9ff" strokeWidth="3.2" strokeLinecap="round" opacity=".32" />
      <path d="M24 118C56 108 81 115 105 136" stroke="#e6d6ff" strokeWidth="2.7" strokeLinecap="round" opacity=".19" />
      <path d="M139 136C168 113 196 110 224 121" stroke="#f2e5ff" strokeWidth="2.8" strokeLinecap="round" opacity=".2" />
    </svg>
  );
}

export function FeatureIcon({ name }: { name: FeatureName }) {
  if (name === "agents") {
    return (
      <svg className="feature-icon-svg" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 2C21.8 11.8 28.2 18.2 38 20C28.2 21.8 21.8 28.2 20 38C18.2 28.2 11.8 21.8 2 20C11.8 18.2 18.2 11.8 20 2Z" fill="url(#iconGradA)" />
        <defs><linearGradient id="iconGradA" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#8e59db"/><stop offset=".58" stopColor="#d0adff"/><stop offset="1" stopColor="#fffaff"/></linearGradient></defs>
      </svg>
    );
  }

  if (name === "dashboards") {
    return (
      <svg className="feature-icon-svg" viewBox="0 0 40 40" aria-hidden="true">
        <defs><linearGradient id="iconGradD" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#7b48c6"/><stop offset=".62" stopColor="#c29cf7"/><stop offset="1" stopColor="#fff7ff"/></linearGradient></defs>
        <rect x="6" y="23" width="6" height="11" rx="1.7" fill="url(#iconGradD)" />
        <rect x="17" y="16" width="6" height="18" rx="1.7" fill="url(#iconGradD)" />
        <rect x="28" y="8" width="6" height="26" rx="1.7" fill="url(#iconGradD)" />
      </svg>
    );
  }

  if (name === "automation") {
    return (
      <svg className="feature-icon-svg" viewBox="0 0 40 40" aria-hidden="true">
        <defs><linearGradient id="iconGradG" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#7a48c3"/><stop offset=".58" stopColor="#c49efa"/><stop offset="1" stopColor="#fffaff"/></linearGradient></defs>
        <path fill="url(#iconGradG)" d="M17.2 3.5h5.6l1 4.2a13 13 0 0 1 3.1 1.3l3.8-2.2 4 4-2.2 3.8a13 13 0 0 1 1.3 3.1l4.2 1v5.6l-4.2 1a13 13 0 0 1-1.3 3.1l2.2 3.8-4 4-3.8-2.2a13 13 0 0 1-3.1 1.3l-1 4.2h-5.6l-1-4.2a13 13 0 0 1-3.1-1.3l-3.8 2.2-4-4 2.2-3.8a13 13 0 0 1-1.3-3.1l-4.2-1v-5.6l4.2-1A13 13 0 0 1 7.5 14.6l-2.2-3.8 4-4 3.8 2.2a13 13 0 0 1 3.1-1.3l1-4.2Zm2.8 10A6.5 6.5 0 1 0 20 26.5 6.5 6.5 0 0 0 20 13.5Z" />
      </svg>
    );
  }

  return (
    <svg className="feature-icon-svg" viewBox="0 0 40 40" aria-hidden="true">
      <defs><linearGradient id="iconGradP" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#7542bd"/><stop offset=".58" stopColor="#bd91f5"/><stop offset="1" stopColor="#fff9ff"/></linearGradient></defs>
      <circle cx="20" cy="13" r="7" fill="url(#iconGradP)" />
      <path d="M7 35c1.2-8 6.3-12 13-12s11.8 4 13 12H7Z" fill="url(#iconGradP)" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg className="search-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="5.75" fill="none" stroke="currentColor" strokeWidth="1.35" />
      <path d="M15 15l4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg className="arrow-icon-svg" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h10.5M10.8 5.8 15 10l-4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
