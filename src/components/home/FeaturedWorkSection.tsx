import { ArrowIcon } from "@/components/BrandAssets";

const projects = [
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

export function FeaturedWorkSection() {
  return (
    <section className="featured-shell" id="work" aria-labelledby="featured-work-title">
      <div className="featured-inner shell-wide">
        <div className="featured-heading">
          <span className="kicker">FEATURED WORK</span>
          <h2 id="featured-work-title">Real problems.<br /><em>Real progress.</em></h2>
          <div className="heading-rule" aria-hidden="true" />
        </div>

        <div className="case-grid">
          {projects.map((item) => (
            <article className={`case-card ${item.className}`} key={item.title}>
              <div className="case-art" aria-hidden="true">
                <div className="case-sheen" />
                <div className="case-shape shape-one" />
                <div className="case-shape shape-two" />
                <div className="case-shape shape-three" />
              </div>
              <div className="case-copy">
                <h3>
                  {item.title.split("\n").map((line, index) => (
                    <span key={line}>{line}{index === 0 ? <br /> : null}</span>
                  ))}
                </h3>
                <div className="case-meta">
                  <span>{item.label}</span>
                  <span className="case-arrow" aria-hidden="true"><ArrowIcon /></span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="featured-side-note" aria-label="ALVOREM brand statement">
          <span>A BRIGHTER</span>
          <span>TOMORROW</span>
          <span>TOGETHER</span>
          <div className="heading-rule" aria-hidden="true" />
        </aside>
      </div>
    </section>
  );
}
