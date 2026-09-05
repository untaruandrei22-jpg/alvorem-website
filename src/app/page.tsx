import { CapabilityExplorer } from "@/components/CapabilityExplorer";
import { AlvoremLogo, ArrowIcon, FeatureIcon, HeroMark, SearchIcon } from "@/components/BrandAssets";

const work = [
  {
    label: "DATA PLATFORM · FINTECH",
    title: "From fragmented data\nto strategic clarity.",
    className: "case-ai",
  },
  {
    label: "AI AUTOMATION · SAAS",
    title: "AI agents that\nactually deliver.",
    className: "case-data",
  },
  {
    label: "CUSTOM SOFTWARE · B2B",
    title: "A modern platform\nfor global growth.",
    className: "case-software",
  },
];

const heroCards = [
  { className: "scene-card card-agents", icon: "agents" as const, title: "AI Agents", copy: "Automate work.\nAmplify people." },
  { className: "scene-card card-data", icon: "dashboards" as const, title: "Dashboards", copy: "Turn data into\nclear decisions." },
  { className: "scene-card card-auto", icon: "automation" as const, title: "Automation", copy: "Streamline\nwhat's next." },
  { className: "scene-card card-founder", icon: "founder" as const, title: "Founder CV", copy: "Experience\nwith impact." },
];

export default function Home() {
  return (
    <main className="site-frame" id="top">
      <div className="site-noise" aria-hidden="true" />
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />

      <header className="nav shell-wide">
        <a href="#top" className="logo-link" aria-label="ALVOREM home"><AlvoremLogo /></a>
        <nav aria-label="Main navigation">
          <a href="#solutions">Solutions <span className="nav-chevron">⌄</span></a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#insights">Insights</a>
          <a href="#founder">Careers</a>
        </nav>
        <div className="nav-actions">
          <button className="search-button" aria-label="Search"><SearchIcon /></button>
          <a href="#contact" className="nav-project">Start a Project</a>
        </div>
      </header>

      <section className="hero-cinematic shell-wide">
        <div className="hero-copy-v2">
          <span className="kicker">DATA · AI · SOFTWARE</span>
          <h1>
            <span className="hero-line-one">Intelligent systems</span><br />
            <span className="hero-line-gradient">for modern business.</span>
          </h1>
          <p className="hero-lede">
            We design and build AI-powered systems, software, and data solutions<br className="desktop-break" />
            that turn ambitious ideas into real business impact.
          </p>

          <div className="hero-actions-v2">
            <a className="button primary-xl" href="#work">Explore Work <ArrowIcon /></a>
            <a className="button outline-xl" href="#contact">Start a Project</a>
          </div>

          <div className="ask-shell" role="group" aria-label="Ask ALVOREM preview">
            <span className="ask-spark"><FeatureIcon name="agents" /></span>
            <span className="ask-placeholder">Ask Alvorem anything...</span>
            <span className="ask-submit"><ArrowIcon /></span>
          </div>

          <div className="try-row">
            <span className="try-label">TRY</span>
            <span>Show me what you do</span>
            <span>Real client results</span>
            <span>Build an AI agent</span>
            <span>Our approach</span>
          </div>
        </div>

        <div className="hero-scene" aria-hidden="true">
          <div className="particle-field" />
          <div className="star-field star-field-one" />
          <div className="star-field star-field-two" />

          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="orbit orbit-c" />
          <div className="orbit orbit-d" />
          <div className="orbit orbit-e" />
          <div className="orbit-node node-one" />
          <div className="orbit-node node-two" />
          <div className="orbit-node node-three" />
          <div className="orbit-node node-four" />
          <div className="orbit-node node-five" />

          <div className="scene-logo-glow" />
          <div className="scene-logo"><HeroMark /></div>

          <div className="pedestal-beam" />
          <div className="pedestal-top pedestal-ring-outer" />
          <div className="pedestal-top pedestal-ring-inner" />
          <div className="pedestal-body" />
          <div className="pedestal-shadow" />

          {heroCards.map((card) => (
            <div className={card.className} key={card.title}>
              <span className="scene-icon"><FeatureIcon name={card.icon} /></span>
              <div>
                <strong>{card.title}</strong>
                <small>{card.copy.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</small>
              </div>
              <span className="scene-arrow"><ArrowIcon /></span>
            </div>
          ))}

          <div className="scene-note">
            <span>Ideas</span>
            <span>People</span>
            <span>Technology</span>
            <strong>A Brighter<br />Tomorrow.</strong>
            <i />
          </div>

          <div className="story-area">
            <div className="story-glass">
              <span>SAME BRIGHTER QUESTIONS.</span>
              <span>BIGGER TOMORROWS.</span>
              <i />
            </div>
            <div className="story-watch">
              <span className="story-play">▶</span>
              <span className="story-watch-copy">WATCH<br />OUR STORY</span>
            </div>
          </div>
        </div>

        <div className="hero-floor" aria-hidden="true">
          <div className="floor-haze" />
          <div className="floor-wave wave-one" />
          <div className="floor-wave wave-two" />
          <div className="floor-wave wave-three" />
          <div className="floor-wave wave-four" />
          <div className="floor-wave wave-five" />
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
                  <div className="case-shape shape-three" />
                </div>
                <div className="case-copy">
                  <h3>{item.title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h3>
                  <div className="case-meta">
                    <span>{item.label}</span>
                    <span className="case-arrow"><ArrowIcon /></span>
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
            <a href="#contact">Explore the founder profile <ArrowIcon /></a>
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
        <AlvoremLogo />
        <p>© 2026 ALVOREM. Built with care in Romania.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
