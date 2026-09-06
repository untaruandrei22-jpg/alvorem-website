"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getActiveTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getActiveTheme());
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = getActiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("alvorem-theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "dark"}
    >
      <svg className="theme-icon theme-icon--sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.25" />
        <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56m11.02 11.02 1.56 1.56M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" />
      </svg>
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
      <svg className="theme-icon theme-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.35 8.35 0 1 0 20.2 15.1Z" />
      </svg>
    </button>
  );
}
