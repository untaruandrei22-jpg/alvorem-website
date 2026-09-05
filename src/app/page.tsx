import { CapabilityExplorer } from "@/components/CapabilityExplorer";
import { HeroAsk } from "@/components/HeroAsk";
import { Logo } from "@/components/Logo";

const work = [
  { label: "DATA PLATFORM · FINTECH", title: "From fragmented data to strategic clarity.", className: "mountains" },
  { label: "AI AUTOMATION · SAAS", title: "AI agents that actually deliver.", className: "wave" },
  { label: "CUSTOM SOFTWARE · B2B", title: "A modern platform for global growth.", className: "architecture" },
];

function Arrow() { return <span aria-hidden="true">→</span>; }

export default function Home() {
  return (
    <main id="top">
      <header className="nav shell">
        <a href="#top" className="logo-link" aria-label="ALVOREM home"><Logo /></a>
        <nav aria-label="Main navigation">
          <a href="#solutions">Solutions <span aria-hidden="true">⌄</span></a>
          <a href="#work">Work</a><a href="#about">About</a><a href="#insights">Insights</a><a href="#founder">Careers</a>
        </nav>
        <div className="nav-actions"><a className="search-link" href="#ask" aria-label="Ask ALVOREM">⌕</a><a href="#contact" className="nav-cta">Start a Project</a></div>
      </header>

      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="kicker">DATA&nbsp;&nbsp; · &nbsp;&nbsp;AI&nbsp;&nbsp; · &nbsp;&nbsp;SOFTWARE</span>
          <h1 id="hero-title">Intelligent systems<br />for modern <em>business.</em></h1>
          <p>We design and build AI-powered systems, software, and data solutions that turn ambitious ideas into real business impact.</p>
          <div className="hero-actions"><a className="button primary" href="#work">Explore Work <Arrow /></a><a className="button ghost" href="#contact">Start a Project</a></div>
          <HeroAsk />
        </div>

        <div className="hero-scene" aria-label="ALVOREM capabilities">
          <div className="scene-glow" />
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
          <div className="star star-a">✦</div><div className="star star-b">·</div><div className="star star-c">✦</div>
          <div className="hero-flower"><Logo compact /></div>
          <div className="pedestal"><span /><i /></div>
          <div className="terrain terrain-back" /><div className="terrain terrain-front" />
          <a className="glass-card ai-card" href="#solutions"><b className="card-icon sparkle">✦</b><span><strong>AI Agents</strong><small>Automate work.<br />Amplify people.</small></span><i>→</i></a>
          <a className="glass-card data-card" href="#work"><b className="card-icon bars">▥</b><span><strong>Dashboards</strong><small>Turn data into<br />clear decisions.</small></span><i>→</i></a>
          <a className="glass-card automation-card" href="#solutions"><b className="card-icon gear">✿</b><span><strong>Automation</strong><small>Streamline<br />what&apos;s next.</small></span><i>→</i></a>
          <a className="glass-card cv-card" href="#founder"><b className="card-icon person">♟</b><span><strong>Founder CV</strong><small>Experience<br />with impact.</small></span><i>→</i></a>
          <blockquote>Ideas<br />People<br />Technology<br />A Brighter<br />Tomorrow</blockquote>
          <div className="story-note"><span>Same brighter questions.<br />Bigger tomorrows.</span><a href="#about" aria-label="Our story">▶</a><small>WATCH<br />OUR STORY</small></div>
        </div>
      </section>

      <section className="featured" id="work" aria-labelledby="work-title">
        <div className="shell featured-layout">
          <div className="featured-heading"><span className="kicker">FEATURED WORK</span><h2 id="work-title">Real problems.<br />Real progress.</h2><i /></div>
          <div className="work-grid">{work.map((item) => <a className="work-card" href="#contact" key={item.title}><div className={`work-art ${item.className}`}><span /></div><h3>{item.title}</h3><small>{item.label}</small><b aria-hidden="true">→</b></a>)}</div>
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
