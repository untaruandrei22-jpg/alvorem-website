import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";

const themeInitializer = `
(function () {
  try {
    var saved = window.localStorage.getItem("alvorem-theme");
    var theme = saved === "light" || saved === "dark"
      ? saved
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = "dark";
  }
})();`;

export const metadata: Metadata = {
  title: "ALVOREM — Intelligent systems for modern business",
  description:
    "ALVOREM designs and builds AI-powered systems, data products, automation and software for modern business.",
  metadataBase: new URL("https://alvorem.ro"),
  openGraph: {
    title: "ALVOREM",
    description: "Intelligent systems for modern business.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
