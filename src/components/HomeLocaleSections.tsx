"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useLocale } from "@/components/LocaleProvider";

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7" r="3.5" />
      <path d="M4.5 21c.6-5.3 3.1-8 7.5-8s6.9 2.7 7.5 8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2.5 21c.3-4.8 2.1-7.2 5.5-7.2s5.3 2.4 5.5 7.2M13 15.2c1-.8 2.2-1.2 3.7-1.2 3 0 4.6 2.1 4.8 6.3" />
    </svg>
  );
}

const copy = {
  en: {
    valuesLabel: "ALVOREM values",
    values: ["Understands your business", "Available anytime", "Built around your people"],
    footerTagline: "PEOPLE · TECH · A BRIGHTER TOMORROW",
    footerNavLabel: "Footer navigation",
    contact: "Contact",
    solutions: "Solutions",
    pricing: "Pricing",
    about: "About",
    back: "Back to top",
    copyright: "© 2026 ALVOREM. All rights reserved.",
  },
  ro: {
    valuesLabel: "Valorile ALVOREM",
    values: ["Îți înțelege afacerea", "Disponibil oricând", "Construit în jurul oamenilor tăi"],
    footerTagline: "OAMENI · TEHNOLOGIE · UN MÂINE MAI LUMINOS",
    footerNavLabel: "Navigare subsol",
    contact: "Contact",
    solutions: "Soluții",
    pricing: "Prețuri",
    about: "Despre",
    back: "Înapoi sus",
    copyright: "© 2026 ALVOREM. Toate drepturile rezervate.",
  },
} as const;

const icons = [<PersonIcon key="person" />, <ClockIcon key="clock" />, <PeopleIcon key="people" />];

export function HomeValueStrip() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="value-strip" aria-label={t.valuesLabel}>
      <div className="site-shell value-grid">
        {t.values.map((label, index) => (
          <div className="value-item" key={label}>
            <span>{icons[index]}</span>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeFooter() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-shell footer-inner">
        <div className="footer-brand">
          <Link href="/" aria-label={locale === "ro" ? "Pagina principală ALVOREM" : "ALVOREM home"}>
            <Logo compact />
          </Link>
          <span className="footer-divider" aria-hidden="true" />
          <p>{t.footerTagline}</p>
        </div>
        <nav aria-label={t.footerNavLabel}>
          <a href="mailto:hello@alvorem.ro">{t.contact}</a>
          <Link href="/solutions">{t.solutions}</Link>
          <Link href="/pricing">{t.pricing}</Link>
          <Link href="/about">{t.about}</Link>
          <a href="#top">{t.back}</a>
        </nav>
        <p className="copyright">{t.copyright}</p>
      </div>
    </footer>
  );
}
