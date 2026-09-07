import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — ALVOREM",
  description:
    "ALVOREM builds private AI agents around the context, rules and people that make every business different.",
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

const principles = [
  {
    number: "01",
    title: "PEOPLE AT THE CENTER",
    description: "Start with the people doing the work.",
  },
  {
    number: "02",
    title: "CLARITY OVER COMPLEXITY",
    description: "Build only what makes the next decision easier.",
  },
  {
    number: "03",
    title: "PROGRESS WITH CONTROL",
    description: "Automate responsibly. Keep judgment human.",
  },
];

export default function AboutPage() {
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
            <Link className={styles.activeNav} href="/about" aria-current="page">About</Link>
            <Link href="/careers">Careers</Link>
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

      <section className={["site-shell", styles.hero].join(" ")} aria-labelledby="about-hero-title">
        <p className="eyebrow">ABOUT ALVOREM</p>
        <div className={styles.heroGrid}>
          <h1 id="about-hero-title">
            <span>Technology should</span>
            <em>work around people.</em>
          </h1>
          <div className={styles.heroIntro}>
            <p>
              We build private AI agents around the context, rules and people
              that make every business different.
            </p>
            <div className={styles.heroActions}>
              <a className="button button--primary" href="#why">
                Why we exist <ArrowIcon />
              </a>
              <a
                className="button button--secondary"
                href="mailto:hello@alvorem.ro?subject=Start%20a%20conversation"
              >
                Start a conversation
              </a>
            </div>
          </div>
        </div>
        <div className={styles.heroRule} aria-hidden="true">
          <span className={styles.miniHalo} />
        </div>
      </section>

      <figure className={styles.photoSection}>
        <div className={styles.photoFrame}>
          <Image
            src="/alvorem-about-conversation.webp"
            alt="Three people listening and discussing business needs around a notebook and laptop"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <figcaption className="site-shell">
          Good systems begin with a real conversation.
        </figcaption>
      </figure>

      <section className={["site-shell", styles.whySection].join(" ")} id="why" aria-labelledby="why-title">
        <div className={styles.whyHeading}>
          <p className="eyebrow">WHY ALVOREM EXISTS</p>
          <h2 id="why-title">
            <span>Business is already</span>
            <em>complicated enough.</em>
          </h2>
        </div>

        <div className={styles.whyDivider} aria-hidden="true">
          <span className={styles.miniHalo} />
        </div>

        <div className={styles.whyCopy}>
          <p>
            Important answers are scattered. Reports take time. Repetitive work
            keeps returning.
          </p>
          <p>
            We started ALVOREM to make that burden lighter—without taking people
            out of the picture.
          </p>
          <Link className={styles.textLink} href="/solutions">
            See what we build <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className={styles.principlesSection} aria-labelledby="principles-title">
        <div className="site-shell">
          <p className="eyebrow">WHAT GUIDES THE WORK</p>
          <h2 id="principles-title">Simple principles. Serious intent.</h2>

          <div className={styles.principlesGrid}>
            {principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={["site-shell", styles.studioSection].join(" ")} aria-labelledby="studio-title">
        <div className={styles.studioWords} aria-label="Listen. Understand. Build.">
          <span>Listen.</span>
          <div><i className={styles.miniHalo} aria-hidden="true" /><em>Understand.</em></div>
          <span>Build.</span>
        </div>

        <div className={styles.studioCopy}>
          <p className="eyebrow">AN INDEPENDENT AI STUDIO</p>
          <h2 id="studio-title">Close enough to understand.</h2>
          <p>
            We work directly with the people closest to the problem, so what we
            build stays useful, private and grounded in reality.
          </p>
          <div className={styles.locationLine}>
            <span aria-hidden="true" />
            <p>BUILT IN ROMANIA · DESIGNED FOR REAL BUSINESSES</p>
          </div>
        </div>
      </section>

      <section className={["final-cta", styles.cta].join(" ")} id="contact" aria-labelledby="about-cta-title">
        <div className="cta-horizon" aria-hidden="true"><span /></div>
        <div className={["site-shell", "final-cta__content", styles.ctaContent].join(" ")}>
          <h2 id="about-cta-title">Let’s build with people in mind.</h2>
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
            <Link href="/" aria-label="ALVOREM home"><Logo compact /></Link>
            <span className="footer-divider" aria-hidden="true" />
            <p>PEOPLE · TECH · A BRIGHTER TOMORROW</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="mailto:hello@alvorem.ro">Contact</a>
            <Link href="/about" aria-current="page">About</Link>
            <a href="#top">Back to top</a>
          </nav>
          <p className="copyright">© 2026 ALVOREM. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
