import { ArrowIcon } from "@/components/BrandAssets";

export function FounderSection() {
  return (
    <section className="founder shell-wide" id="founder" aria-labelledby="founder-title">
      <div className="founder-card production-panel">
        <div>
          <span className="kicker">FOUNDER / CAREER</span>
          <h2 id="founder-title">Experience, systems and<br />evidence — connected.</h2>
        </div>
        <div className="founder-copy">
          <p>
            The founder profile will become an interactive CV and project explorer rather than a static résumé.
          </p>
          <a href="#contact">Explore the founder profile <ArrowIcon /></a>
        </div>
      </div>
    </section>
  );
}
