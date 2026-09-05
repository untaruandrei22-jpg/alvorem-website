import { BrandStatementSection } from "@/components/home/BrandStatementSection";
import { CTASection } from "@/components/home/CTASection";
import { FeaturedWorkSection } from "@/components/home/FeaturedWorkSection";
import { Footer } from "@/components/home/Footer";
import { FounderSection } from "@/components/home/FounderSection";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatWeBuildSection } from "@/components/home/WhatWeBuildSection";

export default function Home() {
  return (
    <main className="site-frame" id="top">
      <div className="site-noise" aria-hidden="true" />
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />

      <Header />
      <HeroSection />
      <FeaturedWorkSection />
      <WhatWeBuildSection />
      <BrandStatementSection />
      <FounderSection />
      <CTASection />
      <Footer />
    </main>
  );
}
