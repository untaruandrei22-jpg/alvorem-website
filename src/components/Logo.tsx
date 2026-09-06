type LogoProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function Logo({ compact = false, inverse = false }: LogoProps) {
  return (
    <span
      className={`brand-logo${compact ? " brand-logo--compact" : ""}${inverse ? " brand-logo--inverse" : ""}`}
      role="img"
      aria-label="ALVOREM — People, Tech, A Brighter Tomorrow"
    >
      <span className="brand-wordmark" aria-hidden="true">
        <svg className="brand-a" viewBox="0 0 34 28" focusable="false">
          <path d="M2 26 17 2l15 24" />
        </svg>
        <span>L</span>
        <span>V</span>
        <span className="brand-halo" />
        <span>R</span>
        <span>E</span>
        <span>M</span>
      </span>
      {!compact && (
        <span className="brand-tagline" aria-hidden="true">
          PEOPLE <i>•</i> TECH <i>•</i> A BRIGHTER TOMORROW
        </span>
      )}
    </span>
  );
}
