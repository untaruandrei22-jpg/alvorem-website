import { HomeCompactTeam } from "@/components/HomeCompactTeam";
import { HomeFooter } from "@/components/HomeLocaleSections";
import { HomeTrustCTA } from "@/components/HomeTrustCTA";
import { HomepageHero } from "@/components/HomepageHero";
import { LocalizedSkipLink } from "@/components/LocalizedSkipLink";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <main id="top">
      <LocalizedSkipLink />
      <SiteHeader activePage="home" />

      <HomepageHero />
      <HomeCompactTeam />
      <HomeTrustCTA />
      <HomeFooter />
    </main>
  );
}
