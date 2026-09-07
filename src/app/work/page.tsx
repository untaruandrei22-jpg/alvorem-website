import type { Metadata } from "next";
import { HomeFooter } from "@/components/HomeLocaleSections";
import { SiteHeader } from "@/components/SiteHeader";
import { WorkContent } from "@/components/WorkContent";

export const metadata: Metadata = {
  title: "Work — ALVOREM",
  description: "See how ALVO, OREM and the full ALVOREM team turn trusted business context into useful outcomes.",
};

export default function WorkPage() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader activePage="work" />
      <WorkContent />
      <HomeFooter />
    </main>
  );
}
