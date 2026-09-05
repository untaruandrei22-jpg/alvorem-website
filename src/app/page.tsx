import { CapabilityExplorer } from "@/components/CapabilityExplorer";
import { Logo } from "@/components/Logo";

const work = [
  {
    label: "PRIVATE AI · DATA · SECURITY",
    title: "A grounded business agent built around trusted company data.",
    className: "case-ai",
  },
  {
    label: "BUSINESS INTELLIGENCE · ANALYTICS",
    title: "From fragmented reporting to clearer business decisions.",
    className: "case-data",
  },
  {
    label: "AUTOMATION · CUSTOM SOFTWARE",
    title: "Systems that remove friction from real operational work.",
    className: "case-software",
  },
];

const heroCards = [
  { className: "scene-card card-agents", icon: "✦", title: "AI Agents", copy: "Automate work. Amplify people." },
  { className: "scene-card card-data", icon: "▥", title: "Dashboards", copy: "Turn data into clear decisions." },
  { className: "scene-card card-auto", icon: "⚙", title: "Automation", copy: "Streamline what’s next." },
  { className: "scene-card card-founder", icon: "●", title: "Founder CV", copy: "Experience with impact." },
];

export default function Home() {
  return (
    <main className="site-frame" id="top">
      <div className="site-noise" aria-hidden="true" />
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />

      <header className="nav shell-wide">
        <a href="#top" className="logo-link" aria-label="ALVOREM home"><Logo /></a>
        <nav aria-label="Main navigation">
          <a href="#solutions">Solutions <span className="nav-chevron">⌄</span></a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#insights">Insights</a>
          <a href="#founder">Careers</a>
        </nav>
        <div className="nav-actions">
          <button className="search-button" aria-label="Search">⌕</button>
          <a href="#contact" className="nav-project">Start a Project</a>
        </div>
      </header>

      <section className="hero-cinematic shell-wide">
        <div className="hero-copy-v2">
          <span className="kicker">DATA · AI · SOFTWARE</span>
          <h1>
            Intelligent systems<br />
            for modern <em>business.</em>
          </h1>
          <p className="hero-lede">
            We design and build AI-powered systems, software, and data solutions
            that turn ambitious ideas into real business impact.
          </p>

          <div className="hero-actions-v2">
            <a className="button primary-xl" href="#work">Explore Work <span>→</span></a>
            <a className="button outline-xl" href="#contact">Start a Project</a>
          </div>

          <div className="ask-shell" role="group" aria-label="Ask ALVOREM preview">
            <span className="ask-spark">✦</span>
            <span className="ask-placeholder">Ask Alvorem anything...</span>
            <span className="ask-submit">→</span>
          </div>

          <div className="try-row">
            <span className="try-label">TRY</span>
            <span>Show me what you do</span>
            <span>Real client results</span>
            <span>Build an AI agent</span>
            <span>Our approach</span>
          </div>

          <div className="trust-line">
            <span className="trust-dot" />
            Building in Romania · Designed for ambitious teams everywhere.
          </div>
        </div>

        <div className="hero-scene" aria-hidden="true">
          <div className="star-field star-field-one" />
          <div className="star-field star-field-two" />
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="orbit orbit-c" />
          <div className="orbit-node node-one" />
          <div className="orbit-node node-two" />
          <div className="orbit-node node-three" />

          <div className="scene-logo-glow" />
          <div className="scene-logo"><Logo compact /></div>

          <div className="pedestal-beam" />
          <div className="pedestal-top" />
          <div className="pedestal-body" />

          {heroCards.map((card) => (
            <div className={card.className} key={card.title}>
              <span className="scene-icon">{card.icon}</span>
              <div>
                <strong>{card.title}</strong>
                <small>{card.copy}</small>
              </div>
              <span className="scene-arrow">→</span>
            </div>
          ))}

          <div className="scene-note">
            <span>Ideas</span>
            <span>People</span>
            <span>Technology</span>
            <strong>A brighter<br />tomorrow.</strong>
          </div>

          <div className="story-chip">
            <span className="story-play">▶</span>
            <span><small>OUR STORY</small><strong>Why ALVOREM exists</strong></span>
          </div>
        </div>

        <div className="hero-floor" aria-hidden="true">
          <div className="floor-wave wave-one" />
          <div className="floor-wave wave-two" />
          <div className="floor-wave wave-three" />
        </div>
      </section>

      <section className="featured-shell" id="work">
        <div className="featured-inner shell-wide">
          <div className="featured-heading">
            <span className="kicker">FEATURED WORK</span>
            <h2>Real problems.<br /><em>Real progress.</em></h2>
            <div className="heading-rule" />
          </div>

          <div className="case-grid">
            {work.map((item) => (
              <article className={`case-card ${item.className}`} key={item.title}>
                <div className="case-art">
                  <div className="case-sheen" />
                  <div className="case-shape shape-one" />
                  <div className="case-shape shape-two" />
                </div>
                <div className="case-copy">
                  <h3>{item.title}</h3>
                  <div className="case-meta">
                    <span>{item.label}</span>
                    <span className="case-arrow">→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="featured-side-note">
            <span>A BRIGHTER</span>
            <span>TOMORROW</span>
            <span>TOGETHER</span>
            <div className="heading-rule" />
          </div>
        </div>
      </section>

      <CapabilityExplorer />

      <section className="about shell-wide" id="about">
        <div className="about-card">
          <div>
            <span className="kicker">ALVOREM</span>
            <h2>Technology that makes the business feel simpler.</h2>
          </div>
          <p>
            We combine data, AI, software and practical business thinking into focused systems people can actually use.
            The goal is not more technology. The goal is better decisions, better workflows and more room for people to do meaningful work.
          </p>
        </div>
      </section>

      <section className="founder shell-wide" id="founder">
        <div className="founder-card">
          <div>
            <span className="kicker">FOUNDER / CAREER</span>
            <h2>Experience, systems and evidence — connected.</h2>
          </div>
          <div className="founder-copy">
            <p>The founder profile will become an interactive CV and project explorer rather than a static résumé.</p>
            <a href="#contact">Explore the founder profile <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="contact shell-wide" id="contact">
        <div className="contact-panel">
          <span className="kicker">START A CONVERSATION</span>
          <h2>Have an idea that deserves a better system?</h2>
          <p>Start with the problem. We will figure out what technology genuinely helps.</p>
          <a className="button primary-xl" href="mailto:hello@alvorem.ai">hello@alvorem.ai <span>↗</span></a>
        </div>
      </section>

      <footer className="footer shell-wide">
        <Logo />
        <p>© 2026 ALVOREM. Built with care in Romania.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
