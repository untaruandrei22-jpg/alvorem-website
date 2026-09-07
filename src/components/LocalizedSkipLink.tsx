"use client";

import { useLocale } from "@/components/LocaleProvider";

export function LocalizedSkipLink() {
  const { locale } = useLocale();

  return (
    <a className="skip-link" href="#main-content">
      {locale === "ro" ? "Sari la conținut" : "Skip to content"}
    </a>
  );
}
