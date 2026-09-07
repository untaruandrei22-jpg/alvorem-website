import { AgentTeamFlow } from "@/components/AgentTeamFlow";
import { AgentsSplit } from "@/components/AgentsSplit";
import { HomeClosing } from "@/components/HomeClosing";
import { HomepageHero } from "@/components/HomepageHero";
import { Logo } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7" r="3.5" />
      <path d="M4.5 21c.6-5.3 3.1-8 7.5-8s6.9 2.7 7.5 8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2.5 21c.3-4.8 2.1-7.2 5.5-7.2s5.3 2.4 5.5 7.2M13 15.2c1-.8 2.2-1.2 3.7-1.2 3 0 4.6 2.1 4.8 6.3" />
    </svg>
  );
}

const values = [
  { label: "Understands your business", icon: <PersonIcon /> },
  { label: "Available anytime", icon: <ClockIcon /> },
  { label: "Built around your people", icon: <PeopleIcon /> },
];

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader activePage="home" />

      <HomepageHero />

      <section className="value-strip" aria-label="ALVOREM values">
        <div className="site-shell value-grid">
          {values.map((value) => (
            <div className="value-item" key={value.label}>
              <span>{value.icon}</span>
              <p>{value.label}</p>
            </div>
          ))}
        </div>
      </section>

      <AgentsSplit />
      <AgentTeamFlow />
      <HomeClosing />

      <footer className="site-footer" role="contentinfo">
        <div className="site-shell footer-inner">
          <div className="footer-brand">
            <Logo compact />
            <span className="footer-divider" aria-hidden="true" />
            <p>PEOPLE · TECH · A BRIGHTER TOMORROW</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="mailto:hello@alvorem.ro">Contact</a>
            <a href="/about">About</a>
            <a href="#top">Back to top</a>
          </nav>
          <p className="copyright">© 2026 ALVOREM. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
