import { HomeCompactTeam } from "@/components/HomeCompactTeam";
import { HomeFooter } from "@/components/HomeLocaleSections";
import { HomeTrustCTA } from "@/components/HomeTrustCTA";
import { HomepageHero } from "@/components/HomepageHero";
import { LocalizedSkipLink } from "@/components/LocalizedSkipLink";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.page} id="top">
      <LocalizedSkipLink />
      <SiteHeader activePage="home" />

      <HomepageHero />
      <HomeCompactTeam />
      <HomeTrustCTA />
      <HomeFooter />
    </main>
  );
}
