import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work — ALVOREM",
  description:
    "See how ALVOREM turns business context into useful, private AI agents for insight, reporting and automation.",
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v5h4M9 12h6M9 16h6" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6M12 7.2v.2" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v12H9l-5 4V5Z" />
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 12.5 3.5 3.5L18 7.5" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4m10.6 10.6 1.4 1.4m0-13.4-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7.2" r="3.2" />
      <path d="M5 21c.5-5 2.8-7.5 7-7.5s6.5 2.5 7 7.5" />
    </svg>
  );
}

function EvidenceWorkspace() {
  const bars = [44, 54, 62, 67, 58, 72, 70, 82, 76];
  const plan = [53, 61, 68, 73, 77, 72, 75, 79, 72];

  return (
    <div className={styles.evidenceWorkspace}>
      <div className={styles.workspaceTopbar}>
        <p>SYNTHETIC DEMONSTRATION</p>
        <div className={styles.statusChips} aria-label="Demonstration safeguards">
          <span><LockIcon />Read only</span>
          <span><FileIcon />Sources attached</span>
          <span><InfoIcon />Limitations shown</span>
        </div>
      </div>

      <div className={styles.queryRow}>
        <SearchIcon />
        <p>How are sales tracking against plan?</p>
      </div>

      <div className={styles.answerRow}>
        <span className={styles.miniHalo} aria-hidden="true" />
        <div>
          <strong>Total sales are 8% below plan for Q3 2024.</strong>
          <p>Actuals are $12.4M vs. a plan of $13.5M, based on internal sales data.</p>
          <small>This answer includes known limitations.</small>
        </div>
      </div>

      <div className={styles.analysisGrid}>
        <div className={styles.salesChart} role="img" aria-label="Synthetic monthly sales compared with plan from January through September">
          <div className={styles.chartHeading}>
            <strong>Monthly sales vs. plan</strong>
            <div>
              <span><i className={styles.actualDot} />Actuals</span>
              <span><i className={styles.planDot} />Plan</span>
            </div>
          </div>
          <div className={styles.chartPlot}>
            <span className={styles.gridLine} />
            <span className={styles.gridLine} />
            <span className={styles.gridLine} />
            <svg className={styles.planLine} viewBox="0 0 900 100" preserveAspectRatio="none" aria-hidden="true">
              <polyline points={plan.map((value, index) => `${index * 112.5},${100 - value}`).join(" ")} />
              {plan.map((value, index) => <circle cx={index * 112.5} cy={100 - value} r="4" key={`${value}-${index}`} />)}
            </svg>
            <div className={styles.bars} aria-hidden="true">
              {bars.map((height, index) => <i style={{ height: `${height}%` }} key={`${height}-${index}`} />)}
            </div>
          </div>
          <div className={styles.chartMonths} aria-hidden="true">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month) => <span key={month}>{month}</span>)}
          </div>
        </div>

        <div className={styles.sourcesPanel}>
          <strong>Evidence &amp; sources</strong>
          {[
            ["Sales plan", "Q3_Plan_2024.xlsx"],
            ["Actuals", "Sales_Actuals_2024.csv"],
            ["Calculation", "Methodology_v1.0.pdf"],
          ].map(([title, file]) => (
            <div className={styles.sourceRow} key={title}>
              <span><FileIcon /></span>
              <div>
                <strong>{title}</strong>
                <small>{file}</small>
              </div>
              <ArrowIcon />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const proofItems = [
  {
    title: "ONE QUESTION",
    copy: "Ask a question in your own words.",
    icon: <MessageIcon />,
  },
  {
    title: "A VERIFIED ANSWER",
    copy: "Get a clear answer with calculations, not guesses.",
    icon: <ChartIcon />,
  },
  {
    title: "SOURCES ATTACHED",
    copy: "See exactly where the answer comes from.",
    icon: <FileIcon />,
  },
];

function ReportPreview() {
  const bars = [32, 38, 35, 49, 61, 76, 58, 67, 83];

  return (
    <div className={styles.reportPreview}>
      <div className={styles.previewHeader}>
        <span><FileIcon /></span>
        <strong>Monthly Business Brief</strong>
        <small>Synthetic preview · September 2024</small>
      </div>
      <div className={styles.reportBody}>
        <div className={styles.executiveSummary}>
          <strong>Executive summary</strong>
          <p>Overall performance was in line with expectations, with continued momentum in key segments.</p>
          <div className={styles.metricRow}>
            <span><strong>$12.4M</strong><small>Total sales</small></span>
            <span><strong>+6%</strong><small>vs. last month</small></span>
            <span><strong>-8%</strong><small>vs. plan</small></span>
          </div>
        </div>
        <div className={styles.reportChart} role="img" aria-label="Synthetic key trend bar chart">
          <strong>Key trend</strong>
          <div className={styles.reportBars} aria-hidden="true">
            {bars.map((height, index) => <i style={{ height: `${height}%` }} key={`${height}-${index}`} />)}
          </div>
          <div className={styles.reportSource}><FileIcon /><span>Sources (3)</span><ArrowIcon /></div>
        </div>
      </div>
    </div>
  );
}

function WorkflowPreview() {
  const steps = [
    { title: "Trigger", copy: "New data available", icon: <FileIcon />, complete: true },
    { title: "Prepare", copy: "Clean and structure data", icon: <GearIcon />, complete: true },
    { title: "Human approval", copy: "Review and confirm outputs", icon: <PersonIcon />, approval: true },
    { title: "Complete", copy: "Publish and notify", icon: <CheckIcon /> },
  ];

  return (
    <div className={styles.workflowPreview}>
      <p>SYNTHETIC PREVIEW</p>
      <div className={styles.workflowLine} aria-hidden="true" />
      {steps.map((step) => (
        <div className={[styles.workflowStep, step.approval ? styles.approvalStep : ""].join(" ")} key={step.title}>
          <span className={styles.workflowNode} aria-hidden="true">{step.approval ? <i className={styles.miniHalo} /> : null}</span>
          <span className={styles.stepIcon}>{step.icon}</span>
          <span className={styles.stepCopy}>
            <strong>{step.title}</strong>
            <small>{step.copy}</small>
          </span>
          {step.approval ? <span className={styles.controlChip}>Human in control</span> : (
            <span className={[styles.stepCheck, step.complete ? styles.stepComplete : ""].join(" ")}>{step.complete ? <CheckIcon /> : null}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function WorkPage() {
  return (
    <main className={styles.page} id="top">
      <header className="site-header">
        <div className="site-shell header-inner">
          <Link className="logo-link" href="/" aria-label="ALVOREM home">
            <Logo />
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/solutions">Solutions</Link>
            <Link className={styles.activeNav} href="/work" aria-current="page">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/#insights">Insights</Link>
            <a href="mailto:hello@alvorem.ro?subject=Careers%20at%20ALVOREM">Careers</a>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <a className="button button--small button--primary header-cta" href="mailto:hello@alvorem.ro?subject=Start%20a%20project">
              Start a project
            </a>
          </div>
        </div>
      </header>

      <section className={["site-shell", styles.hero].join(" ")} aria-labelledby="work-hero-title">
        <div className={styles.heroCopy}>
          <p className="eyebrow">SELECTED WORK</p>
          <h1 id="work-hero-title">
            <span>Built for the way</span>
            <em>real businesses work.</em>
          </h1>
          <p className={styles.heroDescription}>
            A closer look at how we turn business context into useful, private AI agents.
          </p>
          <div className={styles.heroActions}>
            <a className="button button--primary" href="#sales-intelligence">Explore the work <ArrowIcon /></a>
            <a className="button button--secondary" href="mailto:hello@alvorem.ro?subject=Start%20a%20project">Start a project</a>
          </div>
        </div>

        <nav className={styles.workIndex} aria-label="Selected work">
          <span className={styles.indexLine} aria-hidden="true"><i className={styles.miniHalo} /></span>
          <a href="#sales-intelligence"><b>01</b><span>SALES INTELLIGENCE</span></a>
          <a href="#executive-reporting"><b>02</b><span>EXECUTIVE REPORTING</span></a>
          <a href="#operations-automation"><b>03</b><span>OPERATIONS AUTOMATION</span></a>
          <p>PRIVATE BY DESIGN · PEOPLE IN CONTROL</p>
        </nav>
      </section>

      <section className={styles.featuredCase} id="sales-intelligence" aria-labelledby="sales-case-title">
        <div className="site-shell">
          <div className={styles.caseGrid}>
            <div className={styles.caseCopy}>
              <div className={styles.caseMeta}><span>01</span><p>PRIVATE AI PILOT · SALES INTELLIGENCE</p></div>
              <h2 id="sales-case-title">From scattered data to an answer leaders <em>can verify.</em></h2>
              <p>A private, read-only agent designed to answer sales questions with clear calculations, sources and limitations.</p>
              <a className={styles.textLink} href="#evidence">View the approach <ArrowIcon /></a>
            </div>
            <div id="evidence"><EvidenceWorkspace /></div>
          </div>

          <div className={styles.proofStrip}>
            {proofItems.map((item) => (
              <article key={item.title}>
                <span className={styles.proofIcon}>{item.icon}</span>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={["site-shell", styles.storiesSection].join(" ")} aria-label="More selected work">
        <article className={[styles.storyCard, styles.reportStory].join(" ")} id="executive-reporting">
          <div className={styles.storyMeta}><span>02</span><p>EXECUTIVE REPORTING</p></div>
          <h2>A monthly report that arrives already <em>explained.</em></h2>
          <p>Turn recurring data into a concise brief, with the numbers and reasoning kept together.</p>
          <a className={styles.textLink} href="#report-preview">See the pattern <ArrowIcon /></a>
          <div id="report-preview"><ReportPreview /></div>
        </article>

        <article className={[styles.storyCard, styles.automationStory].join(" ")} id="operations-automation">
          <div className={styles.storyMeta}><span>03</span><p>OPERATIONS AUTOMATION</p></div>
          <h2>Recurring work, moved forward with control.</h2>
          <p>Automate the repeatable steps. Keep human approval where judgment matters.</p>
          <a className={styles.textLink} href="#workflow-preview">See the flow <ArrowIcon /></a>
          <div id="workflow-preview"><WorkflowPreview /></div>
        </article>
      </section>

      <section className={["final-cta", styles.cta].join(" ")} id="contact" aria-labelledby="work-cta-title">
        <div className="cta-horizon" aria-hidden="true"><span /></div>
        <div className={["site-shell", "final-cta__content", styles.ctaContent].join(" ")}>
          <h2 id="work-cta-title">Have a process worth simplifying?</h2>
          <p><em>Let’s look at it together.</em></p>
          <a className="button button--primary" href="mailto:hello@alvorem.ro?subject=Start%20a%20conversation">Start a conversation <ArrowIcon /></a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-shell footer-inner">
          <div className="footer-brand">
            <Link href="/" aria-label="ALVOREM home"><Logo compact /></Link>
            <span className="footer-divider" aria-hidden="true" />
            <p>PEOPLE · TECH · A BRIGHTER TOMORROW</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="mailto:hello@alvorem.ro">Contact</a>
            <Link href="/about">About</Link>
            <a href="#top">Back to top</a>
          </nav>
          <p className="copyright">© 2026 ALVOREM. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
