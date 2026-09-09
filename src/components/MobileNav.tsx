"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

export type PageKey = "home" | "solutions" | "work" | "pricing" | "about" | "careers";

const links: { href: string; page: PageKey; en: string; ro: string }[] = [
  { href: "/", en: "Home", ro: "Acasă", page: "home" },
  { href: "/solutions", en: "Solutions", ro: "Soluții", page: "solutions" },
  { href: "/work", en: "Work", ro: "Proiecte", page: "work" },
  { href: "/pricing", en: "Pricing", ro: "Prețuri", page: "pricing" },
  { href: "/about", en: "About", ro: "Despre", page: "about" },
  { href: "/careers", en: "Careers", ro: "Cariere", page: "careers" },
];

export function MobileNav({ activePage }: { activePage?: PageKey }) {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const cta = locale === "ro" ? "Începe o conversație" : "Start a conversation";

  return (
    <div
      className="mobile-nav"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        className="mobile-nav__trigger"
        type="button"
        aria-label={
          open
            ? locale === "ro" ? "Închide meniul" : "Close navigation menu"
            : locale === "ro" ? "Deschide meniul" : "Open navigation menu"
        }
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <nav
        className="mobile-nav__panel"
        id="mobile-navigation"
        aria-label={locale === "ro" ? "Navigație mobilă" : "Mobile navigation"}
        hidden={!open}
      >
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            aria-current={activePage === link.page ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            <span>{link[locale]}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
        <Link
          className="mobile-nav__cta"
          href="/start?source=mobile-nav"
          onClick={() => setOpen(false)}
        >
          {cta} <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </div>
  );
}
