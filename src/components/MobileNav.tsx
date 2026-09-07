"use client";

import Link from "next/link";
import { useState } from "react";

type PageKey = "solutions" | "work" | "about" | "careers";

const links: { href: string; label: string; page: PageKey }[] = [
  { href: "/solutions", label: "Solutions", page: "solutions" },
  { href: "/work", label: "Work", page: "work" },
  { href: "/about", label: "About", page: "about" },
  { href: "/careers", label: "Careers", page: "careers" },
];

export function MobileNav({ activePage }: { activePage?: PageKey }) {
  const [open, setOpen] = useState(false);

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
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
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
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            aria-current={activePage === link.page ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            <span>{link.label}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
        <a
          className="mobile-nav__cta"
          href="mailto:hello@alvorem.ro?subject=Start%20a%20project"
          onClick={() => setOpen(false)}
        >
          Start a project <span aria-hidden="true">→</span>
        </a>
      </nav>
    </div>
  );
}
