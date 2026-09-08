import { Fragment } from "react";
import { AgentWordmark } from "@/components/AgentWordmark";
import styles from "./AgentInlineText.module.css";

type Size = "xs" | "sm" | "md" | "lg";

const BRAND_NAME_PATTERN = /(ALVOREM|ALVO|OREM)/g;
const BRAND_AGENT = {
  ALVOREM: "alvorem",
  ALVO: "alvo",
  OREM: "orem",
} as const;

export function AgentInlineText({
  text,
  size = "xs",
  className = "",
}: {
  text: string;
  size?: Size;
  className?: string;
}) {
  const parts = text.split(BRAND_NAME_PATTERN);

  return (
    <>
      {parts.map((part, index) => {
        if (part in BRAND_AGENT) {
          const agent = BRAND_AGENT[part as keyof typeof BRAND_AGENT];
          return (
            <AgentWordmark
              key={`${part}-${index}`}
              agent={agent}
              size={size}
              className={`${styles.inline} ${className}`.trim()}
            />
          );
        }

        return <Fragment key={`text-${index}`}>{part}</Fragment>;
      })}
    </>
  );
}
