import type { Metadata } from "next";
import { HomeFooter } from "@/components/HomeLocaleSections";
import { PricingContent } from "@/components/PricingContent";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Pricing — ALVOREM",
  description:
    "Simple ALVOREM pricing architecture: start with ALVO, add OREM for deeper intelligence, or use the full private AI team.",
};

export default function PricingPage() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader activePage="pricing" />
      <PricingContent />
      <HomeFooter />
    </main>
  );
}
