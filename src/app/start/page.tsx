import type { Metadata } from "next";
import { Suspense } from "react";
import { HomeFooter } from "@/components/HomeLocaleSections";
import { LeadConversationForm } from "@/components/LeadConversationForm";
import { LocalizedSkipLink } from "@/components/LocalizedSkipLink";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Start a conversation — ALVOREM",
  description: "Tell ALVOREM about one business process worth simplifying and find the right starting point with ALVO, OREM or a private deployment.",
};

export default function StartConversationPage() {
  return (
    <main id="top">
      <LocalizedSkipLink />
      <SiteHeader />
      <Suspense fallback={null}>
        <LeadConversationForm />
      </Suspense>
      <HomeFooter />
    </main>
  );
}
