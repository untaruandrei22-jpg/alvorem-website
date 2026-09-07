"use client";

import { useLocale } from "@/components/LocaleProvider";
import styles from "./LanguageToggle.module.css";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className={styles.toggle} role="group" aria-label="Language">
      <button
        type="button"
        className={locale === "ro" ? styles.active : undefined}
        aria-pressed={locale === "ro"}
        onClick={() => setLocale("ro")}
      >
        RO
      </button>
      <span aria-hidden="true" />
      <button
        type="button"
        className={locale === "en" ? styles.active : undefined}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  );
}
