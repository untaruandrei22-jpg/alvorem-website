import styles from "./ManifestoSection.module.css";

const principles = [
  {
    title: "Serve before you sell.",
    copy: "Solve the right problem simply instead of selling unnecessary complexity.",
  },
  {
    title: "Truth over growth.",
    copy: "Be honest about what AI can do, what it cannot do and where people must stay in control.",
  },
  {
    title: "Stewardship over excess.",
    copy: "Use time, money, data, attention and compute responsibly.",
  },
  {
    title: "Human dignity first.",
    copy: "Build systems that serve people. Never treat people as disposable resources.",
  },
];

export function ManifestoSection() {
  return (
    <section className={styles.section} id="manifesto" aria-labelledby="manifesto-title">
      <div className={styles.horizon} aria-hidden="true">
        <span />
      </div>

      <div className={styles.shell}>
        <div className={styles.intro}>
          <p className="eyebrow">OUR FOUNDATION</p>
          <h2 id="manifesto-title">Light. Purpose. Prayer. A new beginning.</h2>
          <p className={styles.foundation}>
            <strong>ALVOREM is a Christian-driven technology company.</strong> We believe technology should serve people, protect their dignity and give them more time for what truly matters.
          </p>
          <p className={styles.bodyCopy}>
            Our work is shaped by truth, stewardship, service, humility, responsibility and love for our neighbour. We pursue excellence and profitability, but never at the expense of integrity.
          </p>
        </div>

        <div className={styles.meaningGrid} aria-label="The meaning carried by ALVOREM, ALVO and OREM">
          <article className={styles.meaningCard}>
            <span>ALVOREM</span>
            <h3>Dawn.</h3>
            <p>Light emerging. A new beginning. Something better coming into view.</p>
          </article>

          <article className={styles.meaningCard}>
            <span>ALVO</span>
            <h3>Clarity &amp; purpose.</h3>
            <p>Clear direction. Simplicity. A target worth aiming at.</p>
          </article>

          <article className={styles.meaningCard} id="orem-story">
            <span>OREM</span>
            <h3>Prayer &amp; discernment.</h3>
            <p>Seek wisdom before acting. Greater capability should carry greater responsibility.</p>
          </article>
        </div>

        <div className={styles.agentBridge}>
          <span className={styles.alvoMark}>ALVO brings clarity.</span>
          <i aria-hidden="true" />
          <span className={styles.oremMark}>OREM seeks wisdom.</span>
        </div>

        <div className={styles.principles}>
          <div className={styles.principlesHeading}>
            <p className="eyebrow">WHAT FAITH CHANGES IN PRACTICE</p>
            <h3>Values are real when they cost something.</h3>
          </div>

          <div className={styles.principlesGrid}>
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{principle.title}</h4>
                  <p>{principle.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.promise}>
          <p className="eyebrow">THE PROMISE</p>
          <blockquote>We build technology to serve people, not to rule them.</blockquote>
          <p>Make business simpler. Make room for what matters.</p>
        </div>
      </div>
    </section>
  );
}
