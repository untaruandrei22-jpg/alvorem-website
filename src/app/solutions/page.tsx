import type { Metadata } from "next";
import { AgentTeamFlow } from "@/components/AgentTeamFlow";
import { AgentsSplit } from "@/components/AgentsSplit";
import { HomeFooter } from "@/components/HomeLocaleSections";
import { SiteHeader } from "@/components/SiteHeader";
import { SolutionsCapabilities } from "@/components/SolutionsCapabilities";
import { SolutionsIntro } from "@/components/SolutionsIntro";

export const metadata: Metadata = {
  title: "Solutions — ALVOREM",
  description:
    "Meet ALVO for everyday business intelligence, OREM for deeper reasoning and automation, and the full ALVOREM team working from one trusted business context.",
};

export default function SolutionsPage() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader activePage="solutions" />

      <SolutionsIntro />
      <AgentsSplit />
      <AgentTeamFlow />
      <SolutionsCapabilities />
      <HomeFooter />
    </main>
  );
}
