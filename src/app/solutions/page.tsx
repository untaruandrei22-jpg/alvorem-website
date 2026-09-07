import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./solutions.module.css";

export const metadata: Metadata = {
  title: "Solutions — ALVOREM",
  description:
    "One AI agent that learns your business context and helps your people ask, report and automate.",
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
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

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="7.5" ry="3" />
      <path d="M4.5 5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5M4.5 11v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1" />
      <rect x="14" y="14" width="6.5" height="6.5" rx="1" />
    </svg>
  );
}

function ProcessIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="4" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 6.5v5M5 16.5v-3h14v3M12 11.5v2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6.5 12.5 3.4 3.4 7.6-8" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3.5h8l4 4V21H6V3.5Z" />
      <path d="M14 3.5V8h4M9 12h6M9 15.5h6" />
    </svg>
  );
}

const contextInputs = [
  {
    title: "Data",
    description: "Your internal knowledge, documents and data.",
    icon: <DatabaseIcon />,
  },
  {
    title: "Tools",
    description: "The systems you already use, connected securely.",
    icon: <ToolsIcon />,
  },
  {
    title: "Processes",
    description: "Your ways of working and business rules.",
    icon: <ProcessIcon />,
  },
];

const trustItems = [
  "Source-backed answers",
  "Permission-aware access",
  "People stay in control",
];

function AskPreview() {
  return (
    <div className={[styles.solutionPreview, styles.askPreview].join(" ")} aria-label="Example of a source-backed answer">
      <p>What’s our policy on parental leave?</p>
      <div className={styles.answerPanel}>
        <span>Here’s what I found:</span>
        <div className={styles.sourceCard}>
          <span className={styles.sourceIcon}><FileIcon /></span>
          <span>
            <strong>Parental Leave Policy</strong>
            <small>Company Handbook · p. 12</small>
          </span>
          <ArrowIcon />
        </div>
        <span className={styles.moreSources}>+ 2 more sources</span>
      </div>
    </div>
  );
}

function ReportPreview() {
  return (
    <div className={[styles.solutionPreview, styles.reportPreview].join(" ")} aria-label="Example quarterly sales report">
      <div className={styles.reportHeading}>
        <span>
          <strong>Q3 Sales Performance</strong>
          <small>▼ 8% below plan</small>
        </span>
        <span className={styles.reportPlan}>Plan</span>
      </div>
      <div className={styles.chart} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.chartLabels} aria-hidden="true">
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
      </div>
      <div className={styles.reportAction}>
        <span className={styles.miniChartIcon}><ChartIcon /></span>
        <span>View full report</span>
        <ArrowIcon />
      </div>
    </div>
  );
}

function AutomatePreview() {
  const rows = [
    ["Pull latest data", "Completed", "2 min ago", "done"],
    ["Apply your rules", "Completed", "1 min ago", "done"],
    ["Draft summary", "In progress", "Now", "active"],
    ["Send to team", "Scheduled", "In 5 min", "waiting"],
  ];

  return (
    <div className={[styles.solutionPreview, styles.automatePreview].join(" ")} aria-label="Example automated reporting workflow">
      {rows.map(([title, status, time, state]) => (
        <div className={styles.automationRow} key={title}>
          <span className={[styles.workflowStatus, styles[state]].join(" ")}>
            {state === "done" ? <CheckIcon /> : null}
          </span>
          <span>
            <strong>{title}</strong>
            <small>{status}</small>
          </span>
          <small>{time}</small>
        </div>
      ))}
    </div>
  );
}

const solutions = [
  {
    label: "ASK",
    cue: "Find the right answer",
    title: "Answers grounded in your business.",
    description:
      "Find the right answer across your knowledge, with sources your team can trust.",
    icon: <MessageIcon />,
    preview: <AskPreview />,
  },
  {
    label: "REPORT",
    cue: "See what matters",
    title: "Clear insight, delivered when it matters.",
    description:
      "Turn scattered data into useful reports, summaries and next steps.",
    icon: <ChartIcon />,
    preview: <ReportPreview />,
  },
  {
    label: "AUTOMATE",
    cue: "Move work forward",
    title: "Recurring work, handled with your rules.",
    description:
      "Move repeatable tasks forward while your people stay in control.",
    icon: <CogIcon />,
    preview: <AutomatePreview />,
  },
];

export default function SolutionsPage() {
  return (
    <main className={styles.page} id="top">
      <header className="site-header">
        <div className="site-shell header-inner">
          <Link className="logo-link" href="/" aria-label="ALVOREM home">
            <Logo />
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            <Link className={styles.activeNav} href="/solutions" aria-current="page">Solutions</Link>
            <Link href="/work">Work</Link>
            <Link href="/#about">About</Link>
            <Link href="/#insights">Insights</Link>
            <a href="mailto:hello@alvorem.ro?subject=Careers%20at%20ALVOREM">Careers</a>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <a
              className="button button--small button--primary header-cta"
              href="mailto:hello@alvorem.ro?subject=Start%20a%20project"
            >
              Start a project
            </a>
          </div>
        </div>
      </header>

      <section className={["site-shell", styles.hero].join(" ")} aria-labelledby="solutions-hero-title">
        <div className={styles.heroIntro}>
          <p className="eyebrow">SOLUTIONS BUILT AROUND YOUR BUSINESS</p>
          <h1 id="solutions-hero-title">
            <span>One agent.</span>
            <em>Three ways to work lighter.</em>
          </h1>
          <p className={styles.heroDescription}>
            Ask for answers. Turn data into insight. Automate recurring work—all
            with one system built around your business.
          </p>
          <div className={styles.heroActions}>
            <a className="button button--primary" href="#solutions">
              Explore solutions <ArrowIcon />
            </a>
            <a
              className="button button--secondary"
              href="mailto:hello@alvorem.ro?subject=Start%20a%20project"
            >
              Start a project
            </a>
          </div>
        </div>

        <nav className={styles.solutionRail} aria-label="Explore the three ALVOREM solutions">
          <span className={styles.railBeam} aria-hidden="true">
            <i />
          </span>
          {solutions.map((solution, index) => (
            <a href={"#" + solution.label.toLowerCase()} key={solution.label}>
              <span className={styles.railNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.railIcon}>{solution.icon}</span>
              <span className={styles.railCopy}>
                <strong>{solution.label}</strong>
                <small>{solution.cue}</small>
              </span>
              <ArrowIcon />
            </a>
          ))}
        </nav>
      </section>

      <section className={styles.solutionsSection} id="solutions" aria-labelledby="solutions-title">
        <div className="site-shell">
          <p className="eyebrow">THREE WAYS TO WORK LIGHTER</p>
          <h2 className={styles.sectionTitle} id="solutions-title">
            Start with what slows you down.
          </h2>

          <div className={styles.solutionsGrid}>
            {solutions.map((solution) => (
              <article
                className={styles.solutionCard}
                id={solution.label.toLowerCase()}
                key={solution.label}
              >
                <div className={styles.solutionHeader}>
                  <span className={styles.solutionIcon}>{solution.icon}</span>
                  <div>
                    <p className={styles.solutionLabel}>{solution.label}</p>
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                  </div>
                </div>
                {solution.preview}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contextSection} id="context" aria-labelledby="context-title">
        <div className="site-shell">
          <div className={styles.centerHeading}>
            <p className="eyebrow">BUILT AROUND YOUR REALITY</p>
            <h2 className={styles.sectionTitle} id="context-title">
              Your context in. Clear work out.
            </h2>
          </div>

          <div className={styles.flowDiagram}>
            <svg className={styles.flowLines} viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0 0 8 4 0 8Z" />
                </marker>
              </defs>
              <path d="M250 48 C340 48 350 150 452 150" />
              <path d="M250 150 H452" />
              <path d="M250 252 C340 252 350 150 452 150" />
              <path d="M548 150 H750" markerEnd="url(#flow-arrow)" />
            </svg>

            <div className={styles.contextInputs}>
              {contextInputs.map((item) => (
                <article className={styles.contextCard} key={item.title}>
                  <span>{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.contextCore}>
              <div className={styles.coreBrand}>
                <Logo compact />
              </div>
              <span className={styles.contextHalo} aria-hidden="true" />
              <p>Understands. Connects.<br />Gets to work.</p>
            </div>

            <article className={[styles.contextCard, styles.peopleOutput].join(" ")}>
              <span><PeopleIcon /></span>
              <div>
                <h3>Your people</h3>
                <p>Answers, insights and automation — in the flow of your work.</p>
              </div>
            </article>
          </div>

          <div className={styles.trustRow}>
            {trustItems.map((item) => (
              <p key={item}>
                <span><CheckIcon /></span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={["site-shell", styles.humanSection].join(" ")} aria-labelledby="human-title">
        <figure className={styles.teamPhoto}>
          <Image
            src="/alvorem-solutions-team.webp"
            alt="Three colleagues simplifying a business process together around a laptop"
            fill
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </figure>
        <div className={styles.humanCopy}>
          <p className="eyebrow">DESIGNED FOR REAL WORK</p>
          <h2 id="human-title">Technology should give your team time back.</h2>
          <p>
            Less searching. Less reporting by hand. More room for judgment,
            relationships and growth.
          </p>
          <div className={styles.proofLine}>
            <span><PeopleIcon /></span>
            <strong>Built around your workflows—not the other way around.</strong>
          </div>
        </div>
      </section>

      <section className={["final-cta", styles.cta].join(" ")} id="contact" aria-labelledby="solutions-cta-title">
        <div className="cta-horizon" aria-hidden="true">
          <span />
        </div>
        <div className={["site-shell", "final-cta__content", styles.ctaContent].join(" ")}>
          <h2 id="solutions-cta-title">Bring us one complicated process.</h2>
          <p>We’ll help make it <em>lighter.</em></p>
          <a
            className="button button--primary"
            href="mailto:hello@alvorem.ro?subject=Start%20a%20conversation"
          >
            Start a conversation <ArrowIcon />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-shell footer-inner">
          <div className="footer-brand">
            <Link href="/" aria-label="ALVOREM home">
              <Logo compact />
            </Link>
            <span className="footer-divider" aria-hidden="true" />
            <p>PEOPLE · TECH · A BRIGHTER TOMORROW</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="mailto:hello@alvorem.ro">Contact</a>
            <Link href="/#about">About</Link>
            <a href="#top">Back to top</a>
          </nav>
          <p className="copyright">© 2026 ALVOREM. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
