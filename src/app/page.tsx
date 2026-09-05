import { CapabilityExplorer } from "@/components/CapabilityExplorer";
import { Logo } from "@/components/Logo";

const work = [
  { label: "PRIVATE AI", title: "A grounded business agent connected to controlled company data.", detail: "AI · DATA · SECURITY" },
  { label: "BUSINESS INTELLIGENCE", title: "Decision dashboards built around the questions leaders actually ask.", detail: "BI · ANALYTICS · DATA" },
  { label: "AUTOMATION", title: "Less manual work. Clearer systems. More time for decisions that matter.", detail: "WORKFLOWS · SOFTWARE" },
];

export default function Home() {
  return (
    <main>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="nav shell"><a href="#top" className="logo-link"><Logo /></a><nav aria-label="Main navigation"><a href="#solutions">Solutions</a><a href="#work">Work</a><a href="#founder">Founder</a><a href="#contact" className="nav-cta">Start a project</a></nav></header>
      <section className="hero shell" id="top">
        <div className="hero-copy"><span className="kicker">DATA · AI · SOFTWARE</span><h1>Intelligent systems<br />for modern <em>business.</em></h1><p>ALVOREM designs AI-powered systems, data products and automation that turn complex operations into clear, useful experiences.</p><div className="hero-actions"><a className="button primary" href="#work">Explore work <span>→</span></a><a className="button ghost" href="#contact">Start a project</a></div><div className="proof-note"><span className="pulse" /> Building in Romania. Designed to work globally.</div></div>
        <div className="hero-visual" aria-hidden="true"><div className="hero-halo halo-one" /><div className="hero-halo halo-two" /><div className="hero-logo"><Logo compact /></div><div className="float-card card-one"><small>AI AGENTS</small><strong>Trusted answers.</strong><span>↗</span></div><div className="float-card card-two"><small>DATA</small><strong>Clear decisions.</strong><span>↗</span></div><div className="float-card card-three"><small>AUTOMATION</small><strong>Less friction.</strong><span>↗</span></div><div className="float-card card-four"><small>FOUNDER</small><strong>See the work.</strong><span>↗</span></div></div>
      </section>
      <section className="manifesto shell"><span>THE IDEA</span><p>Good technology should make a business feel <strong>simpler</strong> — not more complicated.</p></section>
      <CapabilityExplorer />
      <section className="work shell" id="work"><div className="section-heading split-heading"><div><span className="kicker">FEATURED WORK</span><h2>Proof over promises.</h2></div><p>Real problems, real systems, and public case studies only when the work is ready to be shown.</p></div><div className="work-grid">{work.map((item, index) => (<article className="work-card" key={item.title}><div className={`work-art art-${index + 1}`}><span className="work-number">0{index + 1}</span><div className="work-glow" /></div><small>{item.label}</small><h3>{item.title}</h3><span className="work-detail">{item.detail}</span></article>))}</div></section>
      <section className="founder shell" id="founder"><div className="founder-card"><div><span className="kicker">FOUNDER / CAREER</span><h2>Built by someone who understands the data and the business around it.</h2></div><div className="founder-copy"><p>The founder profile will become an interactive CV: experience, projects, systems, tools and evidence — connected instead of listed as stars on a résumé.</p><a href="#contact">Founder profile coming in V1 <span>→</span></a></div></div></section>
      <section className="contact shell" id="contact"><div className="contact-panel"><span className="kicker">START A CONVERSATION</span><h2>Have a messy process, scattered data or an idea that deserves a better system?</h2><p>Tell ALVOREM what you are trying to achieve. We will start with the problem, not the technology.</p><a className="button primary" href="mailto:hello@alvorem.ai">hello@alvorem.ai <span>↗</span></a></div></section>
      <footer className="footer shell"><Logo /><p>© 2026 ALVOREM. Built with care in Romania.</p><div><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}
