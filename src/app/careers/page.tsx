import type { Metadata } from "next";
import { CareersContent } from "@/components/CareersContent";
import { HomeFooter } from "@/components/HomeLocaleSections";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Careers, kind of — ALVOREM",
  description: "Please don’t send ALVOREM a normal CV. Show us what you build, notice, question and care about.",
};

export default function CareersPage() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader activePage="careers" />
      <CareersContent />
      <HomeFooter />
    </main>
  );
}
