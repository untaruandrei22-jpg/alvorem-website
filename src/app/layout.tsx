import type { Metadata } from "next";
import { Caveat, Jost, Manrope } from "next/font/google";
import "./globals.css";
import "./fidelity.css";
import "./master.css";
import "./geometry.css";
import "./final-fidelity.css";
import "./brand-fidelity.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALVOREM — Intelligent systems for modern business",
  description:
    "ALVOREM designs and builds AI-powered systems, data products, automation and software for modern business.",
  metadataBase: new URL("https://alvorem.ai"),
  openGraph: {
    title: "ALVOREM",
    description: "Intelligent systems for modern business.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${jost.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
