import { Fragment } from "react";
import { AgentWordmark } from "@/components/AgentWordmark";
import styles from "./AgentInlineText.module.css";

type Size = "xs" | "sm" | "md" | "lg";

export function AgentInlineText({
  text,
  size = "xs",
  className = "",
}: {
  text: string;
  size?: Size;
  className?: string;
}) {
  const parts = text.split(/(ALVOREM|ALVO|OREM)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part === "ALVOREM") {
          return (
            <AgentWordmark
              key={`${part}-${index}`}
              agent="alvorem"
              size={size}
              className={`${styles.inline} ${className}`.trim()}
            />
          );
        }

        if (part === "ALVO") {
          return (
            <AgentWordmark
              key={`${part}-${index}`}
              agent="alvo"
              size={size}
              className={`${styles.inline} ${className}`.trim()}
            />
          );
        }

        if (part === "OREM") {
          return (
            <AgentWordmark
              key={`${part}-${index}`}
              agent="orem"
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
