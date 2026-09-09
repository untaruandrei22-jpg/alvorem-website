import { AgentWordmark } from "@/components/AgentWordmark";

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
      <AgentWordmark agent="alvorem" size="md" className="brand-wordmark" decorative />
      {!compact && (
        <span className="brand-tagline" aria-hidden="true">
          PEOPLE <i>•</i> TECH <i>•</i> A BRIGHTER TOMORROW
        </span>
      )}
    </span>
  );
}
