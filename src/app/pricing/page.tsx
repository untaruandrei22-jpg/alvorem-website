import type { Metadata } from "next";
import { HomeFooter } from "@/components/HomeLocaleSections";
import { LocalizedSkipLink } from "@/components/LocalizedSkipLink";
import { PricingCommercialScope } from "@/components/PricingCommercialScope";
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
      <LocalizedSkipLink />
      <SiteHeader activePage="pricing" />
      <PricingContent />
      <PricingCommercialScope />
      <HomeFooter />
    </main>
  );
}
