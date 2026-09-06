import type { Metadata } from "next";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/400-italic.css";
import "@fontsource/lora/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALVOREM — Your business, simpler.",
  description:
    "AI agents built around your business — ready to answer, report and automate whenever you need them.",
  metadataBase: new URL("https://alvorem.ro"),
  openGraph: {
    title: "ALVOREM — Your business, simpler.",
    description: "AI agents that understand your business and handle the work that slows you down.",
    type: "website",
  },
};

const themeScript = `
  (() => {
    try {
      const stored = localStorage.getItem("alvorem-theme");
      const preferred = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.theme = stored === "dark" || stored === "light" ? stored : preferred;
    } catch (_) {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
