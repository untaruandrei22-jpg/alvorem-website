import { ArrowIcon } from "@/components/BrandAssets";

export function CTASection() {
  return (
    <section className="contact shell-wide" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel production-cta-panel">
        <span className="kicker">START A CONVERSATION</span>
        <h2 id="contact-title">Have an idea that deserves<br />a better system?</h2>
        <p>Start with the problem. We will figure out what technology genuinely helps.</p>
        <a className="button primary-xl contact-email" href="mailto:hello@alvorem.ai">
          hello@alvorem.ai <ArrowIcon />
        </a>
      </div>
    </section>
  );
}
