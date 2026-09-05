type FeatureName = "agents" | "dashboards" | "automation" | "founder";

type LogoProps = { className?: string };
type SymbolProps = { className?: string; variant?: "brand" | "hero" };

function BrandDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <linearGradient id={`${prefix}-petal-top`} x1="0.16" y1="0.96" x2="0.82" y2="0.05">
        <stop offset="0" stopColor="#513799" />
        <stop offset="0.44" stopColor="#6F58D9" />
        <stop offset="0.73" stopColor="#B291EA" />
        <stop offset="1" stopColor="#F4EEFF" />
      </linearGradient>
      <linearGradient id={`${prefix}-petal-left`} x1="0.08" y1="0.9" x2="0.92" y2="0.12">
        <stop offset="0" stopColor="#2A235B" />
        <stop offset="0.48" stopColor="#6546C5" />
        <stop offset="0.8" stopColor="#A985E8" />
        <stop offset="1" stopColor="#D7C4F5" />
      </linearGradient>
      <linearGradient id={`${prefix}-petal-right`} x1="0.04" y1="0.95" x2="0.9" y2="0.08">
        <stop offset="0" stopColor="#423078" />
        <stop offset="0.48" stopColor="#7458D6" />
        <stop offset="0.8" stopColor="#AE89E7" />
        <stop offset="1" stopColor="#E5D6FA" />
      </linearGradient>
      <linearGradient id={`${prefix}-wordmark`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#C8B4F0" />
        <stop offset="0.2" stopColor="#F7F5FC" />
        <stop offset="0.84" stopColor="#F2EEF9" />
        <stop offset="1" stopColor="#D6C9EA" />
      </linearGradient>
      <filter id={`${prefix}-soft-glow`} x="-70%" y="-70%" width="240%" height="240%">
        <feGaussianBlur stdDeviation="1.7" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`${prefix}-hero-glow`} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function SymbolGeometry({ prefix, hero = false }: { prefix: string; hero?: boolean }) {
  return (
    <g filter={`url(#${prefix}-${hero ? "hero-glow" : "soft-glow"})`}>
      <path
        d="M79 133C72 96 78 50 126 10C135 54 119 96 84 132C82 135 79 136 79 133Z"
        fill={`url(#${prefix}-petal-top)`}
      />
      <path
        d="M76 133C46 132 14 116 10 73C42 70 68 86 78 127C79 131 79 133 76 133Z"
        fill={`url(#${prefix}-petal-left)`}
      />
      <path
        d="M85 133C116 132 146 113 151 76C120 80 96 94 84 127C82 131 82 133 85 133Z"
        fill={`url(#${prefix}-petal-right)`}
      />
      {hero && (
        <>
          <path d="M86 124C91 78 104 43 126 16" stroke="#FFF9FF" strokeWidth="2.8" strokeLinecap="round" opacity=".28" />
          <path d="M22 82C47 82 65 96 75 125" stroke="#EFE3FF" strokeWidth="2.1" strokeLinecap="round" opacity=".16" />
          <path d="M91 125C105 101 122 88 145 82" stroke="#F5E9FF" strokeWidth="2.2" strokeLinecap="round" opacity=".18" />
        </>
      )}
    </g>
  );
}

function WordmarkGeometry({ prefix }: { prefix: string }) {
  const stroke = `url(#${prefix}-wordmark)`;
  return (
    <g className="wordmark-vector" fill="none" stroke={stroke} strokeWidth="3.15" strokeLinecap="square" strokeLinejoin="miter">
      {/* custom open A — no crossbar, matching the brand board */}
      <path d="M122 53L139 18L156 53" />
      <path d="M181 18V53H207" />
      <path d="M228 18L244 53L260 18" />
      <ellipse cx="292" cy="35.5" rx="18" ry="17.5" />
      <path d="M332 53V18H350C362 18 368 24 368 34C368 44 361 48 350 48H332M350 48L370 53" />
      <path d="M396 18V53M396 18H423M396 35H419M396 53H423" />
      <path d="M452 53V18L470 45L488 18V53" />
    </g>
  );
}

function Tagline() {
  return (
    <text x="122" y="82" className="brand-tagline-vector">
      PEOPLE · TECH · A BRIGHTER TOMORROW
    </text>
  );
}

export function AlvoremLogoHorizontal({ className = "" }: LogoProps) {
  const prefix = "alv-h";
  return (
    <svg className={`alvorem-lockup alvorem-logo-horizontal ${className}`} viewBox="0 0 510 100" role="img" aria-label="ALVOREM — People · Tech · A Brighter Tomorrow">
      <BrandDefs prefix={prefix} />
      <g transform="translate(5 1) scale(.56)">
        <SymbolGeometry prefix={prefix} />
      </g>
      <WordmarkGeometry prefix={prefix} />
      <Tagline />
    </svg>
  );
}

export function AlvoremLogoMain({ className = "" }: LogoProps) {
  const prefix = "alv-main";
  return (
    <svg className={`alvorem-logo-main ${className}`} viewBox="0 0 520 360" role="img" aria-label="ALVOREM main logo — People · Tech · A Brighter Tomorrow">
      <BrandDefs prefix={prefix} />
      <g transform="translate(178 22) scale(1.02)">
        <SymbolGeometry prefix={prefix} />
      </g>
      <g transform="translate(0 198)">
        <WordmarkGeometry prefix={prefix} />
        <Tagline />
      </g>
    </svg>
  );
}

export function AlvoremSymbol({ className = "", variant = "brand" }: SymbolProps) {
  const prefix = variant === "hero" ? "alv-symbol-hero" : "alv-symbol";
  return (
    <svg className={`alvorem-symbol ${variant === "hero" ? "alvorem-symbol-hero" : ""} ${className}`} viewBox="0 0 160 150" role="img" aria-label={variant === "brand" ? "ALVOREM symbol" : undefined} aria-hidden={variant === "hero" ? true : undefined}>
      <BrandDefs prefix={prefix} />
      {variant === "hero" && (
        <>
          <radialGradient id={`${prefix}-core`} cx="50%" cy="75%" r="48%">
            <stop offset="0" stopColor="#FFF9FF" stopOpacity=".88" />
            <stop offset=".22" stopColor="#DCC7F8" stopOpacity=".64" />
            <stop offset=".55" stopColor="#6F58D9" stopOpacity=".18" />
            <stop offset="1" stopColor="#1A1830" stopOpacity="0" />
          </radialGradient>
          <ellipse cx="81" cy="123" rx="56" ry="31" fill={`url(#${prefix}-core)`} opacity=".9" />
        </>
      )}
      <SymbolGeometry prefix={prefix} hero={variant === "hero"} />
    </svg>
  );
}

export function AlvoremFavicon({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 128 128" role="img" aria-label="ALVOREM app icon">
      <defs>
        <linearGradient id="fav-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1A1830" />
          <stop offset="1" stopColor="#0D0C1D" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="120" height="120" rx="29" fill="url(#fav-bg)" />
      <g transform="translate(18 22) scale(.58)">
        <BrandDefs prefix="fav" />
        <SymbolGeometry prefix="fav" />
      </g>
    </svg>
  );
}

// Backwards-compatible exports while the rest of the site migrates to named brand assets.
export const AlvoremLogo = AlvoremLogoHorizontal;
export function HeroMark({ className = "" }: { className?: string }) {
  return <AlvoremSymbol variant="hero" className={className} />;
}

export function FeatureIcon({ name }: { name: FeatureName }) {
  if (name === "agents") {
    return (
      <svg className="feature-icon-svg" viewBox="0 0 40 40" aria-hidden="true">
        <defs><linearGradient id="icon-agents" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#6F58D9"/><stop offset=".58" stopColor="#C8B4F0"/><stop offset="1" stopColor="#F7F5FC"/></linearGradient></defs>
        <path d="M20 2C21.8 11.8 28.2 18.2 38 20C28.2 21.8 21.8 28.2 20 38C18.2 28.2 11.8 21.8 2 20C11.8 18.2 18.2 11.8 20 2Z" fill="url(#icon-agents)" />
      </svg>
    );
  }

  if (name === "dashboards") {
    return (
      <svg className="feature-icon-svg" viewBox="0 0 40 40" aria-hidden="true">
        <defs><linearGradient id="icon-dashboard" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#6F58D9"/><stop offset=".6" stopColor="#C8B4F0"/><stop offset="1" stopColor="#F7F5FC"/></linearGradient></defs>
        <rect x="5" y="23" width="7" height="12" rx="1.4" fill="url(#icon-dashboard)" />
        <rect x="16.5" y="15" width="7" height="20" rx="1.4" fill="url(#icon-dashboard)" />
        <rect x="28" y="6" width="7" height="29" rx="1.4" fill="url(#icon-dashboard)" />
      </svg>
    );
  }

  if (name === "automation") {
    return (
      <svg className="feature-icon-svg" viewBox="0 0 40 40" aria-hidden="true">
        <defs><linearGradient id="icon-gear" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#6F58D9"/><stop offset=".58" stopColor="#C8B4F0"/><stop offset="1" stopColor="#F7F5FC"/></linearGradient></defs>
        <path fill="url(#icon-gear)" d="M17.2 3.5h5.6l1 4.2a13 13 0 0 1 3.1 1.3l3.8-2.2 4 4-2.2 3.8a13 13 0 0 1 1.3 3.1l4.2 1v5.6l-4.2 1a13 13 0 0 1-1.3 3.1l2.2 3.8-4 4-3.8-2.2a13 13 0 0 1-3.1 1.3l-1 4.2h-5.6l-1-4.2a13 13 0 0 1-3.1-1.3l-3.8 2.2-4-4 2.2-3.8a13 13 0 0 1-1.3-3.1l-4.2-1v-5.6l4.2-1A13 13 0 0 1 7.5 14.6l-2.2-3.8 4-4 3.8 2.2a13 13 0 0 1 3.1-1.3l1-4.2Zm2.8 10A6.5 6.5 0 1 0 20 26.5 6.5 6.5 0 0 0 20 13.5Z" />
      </svg>
    );
  }

  return (
    <svg className="feature-icon-svg" viewBox="0 0 40 40" aria-hidden="true">
      <defs><linearGradient id="icon-founder" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#6F58D9"/><stop offset=".58" stopColor="#C8B4F0"/><stop offset="1" stopColor="#F7F5FC"/></linearGradient></defs>
      <circle cx="20" cy="12.5" r="6.5" fill="url(#icon-founder)" />
      <path d="M7 35c1.2-8.1 6.3-12.2 13-12.2S31.8 26.9 33 35H7Z" fill="url(#icon-founder)" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg className="search-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="5.8" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M14.9 14.9l4.25 4.25" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg className="arrow-icon-svg" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h10.5M10.8 5.8 15 10l-4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
