import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";
import { HomeFooter } from "@/components/HomeLocaleSections";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "About — ALVOREM",
  description: "Why ALVOREM exists, what ALVO and OREM mean, and the Christian-driven principles behind the company.",
};

export default function AboutPage() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader activePage="about" />
      <AboutContent />
      <HomeFooter />
    </main>
  );
}
