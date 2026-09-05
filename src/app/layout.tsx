import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import "./fidelity.css";
import "./master.css";
import "./geometry.css";
import "./final-fidelity.css";
import "./brand-fidelity.css";
import "./brand-board.css";
import "./final-polish.css";
import "./p0-fidelity.css";
import "./final-final-polish.css";
import "./production-home.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-primary",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-secondary",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
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
    <html lang="en" className={`${montserrat.variable} ${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
