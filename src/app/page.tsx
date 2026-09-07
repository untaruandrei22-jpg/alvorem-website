import { AgentTeamFlow } from "@/components/AgentTeamFlow";
import { AgentsSplit } from "@/components/AgentsSplit";
import { HomeClosing } from "@/components/HomeClosing";
import { HomeFooter, HomeValueStrip } from "@/components/HomeLocaleSections";
import { HomepageHero } from "@/components/HomepageHero";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader activePage="home" />

      <HomepageHero />
      <HomeValueStrip />
      <AgentsSplit />
      <AgentTeamFlow />
      <HomeClosing />
      <HomeFooter />
    </main>
  );
}
