import Image from "next/image";
import { CapabilityExplorer } from "@/components/CapabilityExplorer";
import { HeroAsk } from "@/components/HeroAsk";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const work = [
  { label: "DATA PLATFORM · FINTECH", title: "From fragmented data to strategic clarity.", className: "mountains", image: "/featured-mountains.webp" },
  { label: "AI AUTOMATION · SAAS", title: "AI agents that actually deliver.", className: "wave", image: "/featured-ribbon.webp" },
  { label: "CUSTOM SOFTWARE · B2B", title: "A modern platform for global growth.", className: "architecture", image: "/featured-architecture.webp" },
];

function Arrow() { return <span aria-hidden="true">→</span>; }

function CapabilityIcon({ name }: { name: "ai" | "dashboards" | "automation" | "founder" }) {
  if (name === "ai") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 1.8 5.4 13h5.2l-.8 9.2L18.6 11h-5.2l.8-9.2Z" fill="currentColor" /></svg>;
  if (name === "dashboards") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="13" width="4" height="8" rx=".8" fill="currentColor" /><rect x="10" y="8" width="4" height="13" rx=".8" fill="currentColor" /><rect x="17" y="3" width="4" height="18" rx=".8" fill="currentColor" /></svg>;
  if (name === "automation") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.3" r="4.1" fill="currentColor" /><path d="M4.5 21c.5-5 3-7.5 7.5-7.5s7 2.5 7.5 7.5H4.5Z" fill="currentColor" /></svg>;
}

function TrustedRow() {
  return (
    <div className="trusted-row" aria-label="Trusted by forward-thinking teams">
      <span className="trusted-label">TRUSTED BY FORWARD-THINKING TEAMS</span>
      <div className="trusted-logos" aria-hidden="true">
        <span className="trust-brand"><b className="stripe-mark">S</b>Stripe</span>
        <span className="trust-brand"><b className="notion-mark">N</b>Notion</span>
        <span className="trust-brand"><b className="figma-mark"><i /><i /><i /><i /><i /></b>Figma</span>
        <span className="trust-brand"><b className="shopify-mark">S</b>Shopify</span>
        <span className="trust-brand"><b className="linear-mark"><i /><i /><i /></b>Linear</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="nav shell">
        <a href="#top" className="logo-link" aria-label="ALVOREM home"><Logo /></a>
        <nav aria-label="Main navigation">
          <a href="#solutions">Solutions <span aria-hidden="true">⌄</span></a>
          <a href="#work">Work</a><a href="#about">About</a><a href="#insights">Insights</a><a href="#founder">Careers</a>
        </nav>
        <div className="nav-actions"><a className="search-link" href="#ask" aria-label="Ask ALVOREM">⌕</a><ThemeToggle /><a href="#contact" className="nav-cta">Start a Project</a></div>
      </header>

      <section className="hero shell" aria-labelledby="hero-title">
        <Image
          className="hero-art"
          src="/alvorem-horizon-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="hero-art-shade" aria-hidden="true" />

        <div className="hero-copy">
          <span className="kicker">DATA&nbsp;&nbsp; · &nbsp;&nbsp;AI&nbsp;&nbsp; · &nbsp;&nbsp;SOFTWARE</span>
          <h1 id="hero-title">Intelligent systems<br />for modern <em>business.</em></h1>
          <p>We design and build AI-powered systems, software, and data solutions that turn ambitious ideas into real business impact.</p>
          <div className="hero-actions"><a className="button primary" href="#work">Explore Work <Arrow /></a><a className="button ghost" href="#contact">Start a Project</a></div>
          <HeroAsk />
          <TrustedRow />
        </div>

        <div className="hero-scene" aria-label="ALVOREM capabilities">
          <a className="glass-card ai-card" href="#solutions"><b className="card-icon"><CapabilityIcon name="ai" /></b><span><strong>AI Agents</strong><small>Automate work.<br />Amplify people.</small></span><i>→</i></a>
          <a className="glass-card data-card" href="#work"><b className="card-icon"><CapabilityIcon name="dashboards" /></b><span><strong>Dashboards</strong><small>Turn data into<br />clear decisions.</small></span><i>→</i></a>
          <a className="glass-card automation-card" href="#solutions"><b className="card-icon"><CapabilityIcon name="automation" /></b><span><strong>Automation</strong><small>Streamline<br />what&apos;s next.</small></span><i>→</i></a>
          <a className="glass-card cv-card" href="#founder"><b className="card-icon"><CapabilityIcon name="founder" /></b><span><strong>Founder CV</strong><small>Experience<br />with impact.</small></span><i>→</i></a>
          <blockquote>Ideas<br />People<br />Technology<br />A Brighter<br />Tomorrow</blockquote>
          <div className="story-note"><span>Same brighter questions.<br />Bigger tomorrows.</span><a href="#about" aria-label="Our story">▶</a><small>WATCH<br />OUR STORY</small></div>
        </div>
      </section>

      <section className="featured" id="work" aria-labelledby="work-title">
        <div className="shell featured-layout">
          <div className="featured-heading"><span className="kicker">FEATURED WORK</span><h2 id="work-title">Real problems.<br />Real progress.</h2><i /></div>
          <div className="work-grid">{work.map((item) => <a className="work-card" href="#contact" key={item.title}><div className={`work-art ${item.className}`} aria-hidden="true"><Image src={item.image} alt="" fill sizes="(max-width: 620px) 100vw, 33vw" /></div><h3>{item.title}</h3><small>{item.label}</small><b aria-hidden="true">→</b></a>)}</div>
          <aside className="side-mantra">A BRIGHTER<br />TOMORROW<br />TOGETHER<i /></aside>
        </div>
      </section>

      <CapabilityExplorer />

      <section className="statement shell" id="about">
        <div><span className="kicker">ALVOREM</span><h2>Technology that makes<br />the business feel<br />simpler.</h2></div>
        <p>We combine data, AI, software and practical business thinking into focused systems people can actually use. The goal is not more technology. The goal is better decisions, better workflows and more room for people to do meaningful work.</p>
      </section>

      <section className="founder shell" id="founder">
        <div><span className="kicker">FOUNDER / CAREER</span><h2>Experience, systems and<br />evidence — connected.</h2></div>
        <div className="founder-copy"><p>The founder profile will become an interactive CV and project explorer rather than a static résumé.</p><a href="mailto:hello@alvorem.ro?subject=Founder%20profile">Explore the<br />founder profile <Arrow /></a></div>
      </section>

      <section className="contact shell" id="contact"><div className="contact-panel"><span className="kicker">START A CONVERSATION</span><h2>Have an idea that deserves<br />a better system?</h2><p>Start with the problem. We will figure out what technology genuinely helps.</p><a className="button primary" href="mailto:hello@alvorem.ro?subject=Start%20a%20project">hello@alvorem.ro <span>↗</span></a></div></section>

      <footer className="footer shell"><Logo /><p>© 2026 ALVOREM. Built with care in Romania.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
