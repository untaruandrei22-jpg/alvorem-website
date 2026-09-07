import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./careers.module.css";

export const metadata: Metadata = {
  title: "Careers, kind of — ALVOREM",
  description:
    "Send ALVOREM the CV they told you not to send. A video, a repo, a voice note or something we have not thought of yet.",
};

const applicationHref =
  "mailto:hello@alvorem.ro?subject=My%20weird%20CV%20%E2%80%94%20ALVOREM";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.8 17.2h6.4M9.5 20h5" />
      <path d="M7.4 13.7A7 7 0 1 1 16.6 13.7c-1.1.9-1.7 1.8-1.8 3H9.2c-.1-1.2-.7-2.1-1.8-3Z" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <path d="m9.7 3.2.7 2.1m3.2 0 .7-2.1m3.8 2.7-1.7 1.4m2.3 2.3 2.1-.7m0 6.2-2.1-.7m-.6 3.7-1.7-1.4m-2.1 4.1-.7-2.1m-3.2 0-.7 2.1m-3.8-2.7 1.7-1.4m-2.3-2.3-2.1.7m0-6.2 2.1.7m.6-3.7 1.7 1.4" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.2 21c.5-5 2.7-7.5 6.8-7.5s6.3 2.5 6.8 7.5" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 28 22" aria-hidden="true">
      <rect x="1" y="1" width="26" height="20" rx="2" />
      <path d="m2.5 3 11.5 9L25.5 3" />
    </svg>
  );
}

const notices = [
  {
    number: "01",
    title: "CURIOUS OVER POLISHED",
    lead: "Show us how you think.",
    body: "We care more about your curiosity, problem-solving and way of thinking than a perfect CV.",
    icon: <BulbIcon />,
  },
  {
    number: "02",
    title: "USEFUL OVER IMPRESSIVE",
    lead: "Make something that helps.",
    body: "A small project, a clear idea or a thoughtful experiment tells us more than a long list of buzzwords.",
    icon: <GearIcon />,
  },
  {
    number: "03",
    title: "YOURSELF OVER TEMPLATE",
    lead: "Leave the beige CV behind.",
    body: "We want to meet the real you — your ideas, your taste, your unusual path.",
    icon: <PersonIcon />,
  },
];

const lessOf = [
  "Perfect templates",
  "Corporate theatre",
  "Ten years of everything",
];

const moreOf = [
  "Things you made",
  "Problems you noticed",
  "Opinions you can defend",
];

export default function CareersPage() {
  return (
    <main className={styles.page} id="top">
      <header className="site-header">
        <div className="site-shell header-inner">
          <Link className="logo-link" href="/" aria-label="ALVOREM home">
            <Logo />
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/solutions">Solutions</Link>
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
            <Link
              className={styles.activeNav}
              href="/careers"
              aria-current="page"
            >
              Careers
            </Link>
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

      <section
        className={["site-shell", styles.hero].join(" ")}
        aria-labelledby="careers-hero-title"
      >
        <div className={styles.heroCopy}>
          <p className="eyebrow">CAREERS, KIND OF.</p>
          <h1 id="careers-hero-title">
            <span>Send us the CV</span>
            <span>they told you</span>
            <em>not to send.</em>
          </h1>
          <p className={styles.heroDescription}>
            A video. A Notion page. A GitHub repo. A PDF with too much
            personality. Show us how your mind works.
          </p>
          <a className="button button--primary" href={applicationHref}>
            Surprise us <ArrowIcon />
          </a>
          <p className={styles.noRole}>
            <span aria-hidden="true" />
            NO OPEN ROLE? SEND IT ANYWAY.
          </p>
        </div>

        <div
          className={styles.portalStage}
          role="img"
          aria-label="Video, Notion page, GitHub repository, PDF and voice note flowing through the ALVOREM halo into an application email"
        >
          <svg className={styles.orbits} viewBox="0 0 620 520" aria-hidden="true">
            <path d="M90 105c85 15 124 55 167 139" />
            <path d="M355 46c-13 91-19 133-28 182" />
            <path d="M37 303c99-4 148-16 215-49" />
            <path d="M522 171c-86 28-123 46-166 82" />
            <path d="M555 353c-102-24-146-51-190-83" />
            <path d="M310 307v54" />
          </svg>

          <article className={[styles.artifact, styles.videoCard].join(" ")}>
            <p>VIDEO</p>
            <span className={styles.playIcon} aria-hidden="true" />
            <i aria-hidden="true"><b /></i>
          </article>

          <article className={[styles.artifact, styles.notionCard].join(" ")}>
            <p>NOTION</p>
            <span className={styles.textLines} aria-hidden="true">
              <i /><i /><i />
            </span>
            <span className={styles.noteThumb} aria-hidden="true" />
          </article>

          <article className={[styles.artifact, styles.githubCard].join(" ")}>
            <p>GITHUB</p>
            <strong aria-hidden="true">&lt;/&gt;</strong>
            <span className={styles.codeLines} aria-hidden="true"><i /><i /></span>
          </article>

          <article className={[styles.artifact, styles.pdfCard].join(" ")}>
            <p>PDF</p>
            <span className={styles.pdfSheet} aria-hidden="true" />
            <span className={styles.pdfLines} aria-hidden="true"><i /><i /><i /></span>
          </article>

          <article className={[styles.artifact, styles.voiceCard].join(" ")}>
            <p>VOICE NOTE</p>
            <span className={styles.voicePlay} aria-hidden="true" />
            <span className={styles.waveform} aria-hidden="true">
              {[8, 18, 27, 13, 34, 22, 39, 17, 30, 11, 24, 15].map((height, index) => (
                <i key={index} style={{ height }} />
              ))}
            </span>
          </article>

          <div className={styles.portalHalo} aria-hidden="true"><span /></div>

          <div className={styles.emailPortal} aria-hidden="true">
            <EnvelopeIcon />
            <p>SEND YOUR THING</p>
          </div>

          <p className={styles.portalNote} aria-hidden="true">
            Different minds build<br />a brighter tomorrow.
          </p>
        </div>
      </section>

      <section className={styles.noticeSection} aria-labelledby="notice-title">
        <div className="site-shell">
          <p className="eyebrow" id="notice-title">WHAT WE NOTICE</p>
          <div className={styles.noticeGrid}>
            {notices.map((notice) => (
              <article key={notice.number}>
                <span className={styles.noticeNumber}>{notice.number}</span>
                <div className={styles.noticeIcon}>{notice.icon}</div>
                <div className={styles.noticeCopy}>
                  <h2>{notice.title}</h2>
                  <p className={styles.noticeLead}>{notice.lead}</p>
                  <p>{notice.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={["site-shell", styles.manifesto].join(" ")} aria-label="What matters at ALVOREM">
        <div className={styles.manifestoColumn}>
          <div className={styles.manifestoTitle}><h2>LESS OF</h2><span /></div>
          <ul>
            {lessOf.map((item) => (
              <li key={item}><i aria-hidden="true">−</i>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.manifestoDivider} aria-hidden="true"><i /></div>

        <div className={styles.manifestoColumn}>
          <div className={styles.manifestoTitle}><h2>MORE OF</h2><span /></div>
          <ul>
            {moreOf.map((item) => (
              <li key={item}><i aria-hidden="true">+</i>{item}</li>
            ))}
          </ul>
        </div>

        <blockquote>
          “Different people build a brighter tomorrow.”
          <footer><span /> ALVOREM</footer>
        </blockquote>
      </section>

      <section className={["site-shell", styles.submission].join(" ")} aria-labelledby="submission-title">
        <div className={styles.submissionCopy}>
          <p className="eyebrow">THE ANTI-APPLICATION</p>
          <h2 id="submission-title">Send the <em>weird one.</em></h2>
          <p>
            Email your file, link, video, voice note or experiment. Tell us what
            you want to make simpler.
          </p>
          <div className={styles.emailActions}>
            <a className={styles.emailAddress} href={applicationHref}>
              <EnvelopeIcon />
              hello@alvorem.ro
            </a>
            <a className="button button--primary" href={applicationHref}>
              Open your email <ArrowIcon />
            </a>
          </div>
          <p className={styles.formats}>LINK · FILE · STORY · SOMETHING ELSE</p>
        </div>

        <div className={styles.submissionArt} aria-hidden="true">
          <div className={styles.giantHalo}><span /></div>
          <p>UNCONVENTIONAL<br />PEOPLE.<br />INTELLIGENT<br />SYSTEMS.<br />A BRIGHTER<br />TOMORROW.</p>
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
