import Image from "next/image";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

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

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5h16v11H9l-5 4v-15Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 20v-7M12 20V8M19 20V4" />
    </svg>
  );
}

function CogIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.3" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4m10.6 10.6 1.4 1.4m0-13.4-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4.5h5.5A2.5 2.5 0 0 1 12 7v13a3.5 3.5 0 0 0-3.5-3.5H4v-12Zm16 0h-5.5A2.5 2.5 0 0 0 12 7v13a3.5 3.5 0 0 1 3.5-3.5H20v-12Z" />
    </svg>
  );
}

const values = [
  { label: "Understands your business", icon: <PersonIcon /> },
  { label: "Available anytime", icon: <ClockIcon /> },
  { label: "Built around your people", icon: <PeopleIcon /> },
];

const capabilities = [
  {
    title: "Ask",
    description: "Get clear, accurate answers about your business.",
    icon: <MessageIcon />,
  },
  {
    title: "Report",
    description: "Turn your data into useful insight, automatically.",
    icon: <ChartIcon />,
  },
  {
    title: "Automate",
    description: "Hand over repetitive work, so you don’t have to.",
    icon: <CogIcon />,
  },
];

const steps = [
  {
    number: "01",
    title: "We learn your business.",
    description: "We understand your context, people and goals.",
    icon: <BookIcon />,
  },
  {
    number: "02",
    title: "We build your agent.",
    description: "We tailor it to your workflow and make it yours.",
    icon: <CogIcon />,
  },
  {
    number: "03",
    title: "You work more simply.",
    description: "Your agent answers, reports and automates.",
    icon: <PersonIcon />,
  },
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <div className="site-shell header-inner">
          <a className="logo-link" href="#top" aria-label="ALVOREM home">
            <Logo />
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#solutions">Solutions</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#insights">Insights</a>
            <a href="mailto:hello@alvorem.ro?subject=Careers%20at%20ALVOREM">Careers</a>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <a className="button button--small button--primary header-cta" href="#contact">
              Start a project
            </a>
          </div>
        </div>
      </header>

      <section className="hero site-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">INTELLIGENT SYSTEMS FOR MODERN BUSINESS</p>
          <h1 id="hero-title">
            <span>Your business,</span>
            <em>simpler.</em>
          </h1>
          <p className="hero-description">
            AI agents that understand your business, answer anytime, and handle the work that slows you down.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#work">
              See how it works <ArrowIcon />
            </a>
            <a className="button button--secondary" href="#contact">
              Start a project
            </a>
          </div>
        </div>

        <div className="agent-stage" id="agent-demo">
          <div className="clarity-halo" aria-hidden="true" />
          <div className="agent-card">
            <div className="agent-card__header">
              <Logo compact inverse />
              <button type="button" aria-label="More agent options">
                <span />
                <span />
                <span />
              </button>
            </div>
            <div className="agent-card__body">
              <span className="agent-orb" aria-hidden="true" />
              <h2>Good morning, Andrei.</h2>
              <p>What needs your attention today?</p>

              <div className="insight-card">
                <span className="insight-icon"><ChartIcon /></span>
                <span>
                  <strong>Sales are 8% below plan</strong>
                  <small>I found the three factors that matter most.</small>
                  <a href="#insights">View the why</a>
                </span>
                <ArrowIcon />
              </div>

              <div className="agent-prompt" aria-label="Agent question example">
                <span>Ask your agent anything…</span>
                <button type="button" aria-label="Send example question">
                  <ArrowIcon />
                </button>
              </div>
              <small className="agent-status">Always on. Always working for you.</small>
            </div>
          </div>
        </div>
      </section>

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

      <section className="capabilities site-shell" id="solutions" aria-labelledby="capabilities-title">
        <div className="capability-copy" id="work">
          <p className="eyebrow">A LIGHTER WAY TO WORK</p>
          <h2 id="capabilities-title">One agent. Less to carry.</h2>

          <div className="capability-list">
            {capabilities.map((capability) => (
              <article className="capability-row" key={capability.title}>
                <span className="round-icon">{capability.icon}</span>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <figure className="human-photo">
          <Image
            src="/alvorem-human-workspace.webp"
            alt="Two colleagues calmly reviewing their business together on a laptop"
            fill
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </figure>
      </section>

      <section className="brand-statement" id="about" aria-labelledby="statement-title">
        <div className="site-shell">
          <h2 id="statement-title">Technology should give you time back.</h2>
          <p>More clarity. Fewer repetitive tasks. More room for life.</p>
        </div>
      </section>

      <section className="process site-shell" id="insights" aria-labelledby="process-title">
        <p className="eyebrow">A SIMPLE WAY FORWARD</p>
        <h2 className="sr-only" id="process-title">How ALVOREM works</h2>
        <div className="step-grid">
          {steps.map((step, index) => (
            <div className="step-wrap" key={step.number}>
              <article className="step-card">
                <span className="step-number">{step.number}</span>
                <span className="round-icon">{step.icon}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
              {index < steps.length - 1 && <span className="step-arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta" id="contact" aria-labelledby="cta-title">
        <div className="cta-horizon" aria-hidden="true">
          <span />
        </div>
        <div className="site-shell final-cta__content">
          <h2 id="cta-title">Make business feel <em>lighter.</em></h2>
          <a className="button button--primary" href="mailto:hello@alvorem.ro?subject=Start%20a%20conversation">
            Start a conversation <ArrowIcon />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-shell footer-inner">
          <div className="footer-brand">
            <Logo compact />
            <span />
            <p>PEOPLE · TECH · A BRIGHTER TOMORROW</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="mailto:hello@alvorem.ro">Contact</a>
            <a href="#about">About</a>
            <a href="#top">Back to top</a>
          </nav>
          <p className="copyright">© 2026 ALVOREM. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
