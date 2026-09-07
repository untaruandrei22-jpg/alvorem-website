"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Logo } from "@/components/Logo";
import { MobileNav, type PageKey } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./SiteHeader.module.css";

const nav = [
  { href: "/", page: "home" as const, en: "Home", ro: "Acasă" },
  { href: "/solutions", page: "solutions" as const, en: "Solutions", ro: "Soluții" },
  { href: "/work", page: "work" as const, en: "Work", ro: "Work" },
  { href: "/about", page: "about" as const, en: "About", ro: "Despre" },
  { href: "/careers", page: "careers" as const, en: "Careers", ro: "Cariere" },
];

export function SiteHeader({ activePage }: { activePage?: PageKey }) {
  const { locale } = useLocale();
  const cta = locale === "ro" ? "Începe o conversație" : "Start a conversation";

  return (
    <header className="site-header" role="banner">
      <div className="site-shell header-inner">
        <Link className="logo-link" href="/" aria-label="ALVOREM home">
          <Logo />
        </Link>

        <nav className="desktop-nav" aria-label={locale === "ro" ? "Navigație principală" : "Main navigation"}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={activePage === item.page ? styles.active : undefined}
              aria-current={activePage === item.page ? "page" : undefined}
            >
              {item[locale]}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageToggle />
          <MobileNav activePage={activePage} />
          <ThemeToggle />
          <a
            className="button button--small button--primary header-cta"
            href="mailto:hello@alvorem.ro?subject=Start%20a%20conversation"
          >
            {cta}
          </a>
        </div>
      </div>
    </header>
  );
}
