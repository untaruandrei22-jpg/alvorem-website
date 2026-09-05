import { AlvoremSymbol, ArrowIcon, FeatureIcon } from "@/components/BrandAssets";

const heroCards = [
  { className: "scene-card card-agents", icon: "agents" as const, title: "AI Agents", copy: "Automate work.\nAmplify people." },
  { className: "scene-card card-data", icon: "dashboards" as const, title: "Dashboards", copy: "Turn data into\nclear decisions." },
  { className: "scene-card card-auto", icon: "automation" as const, title: "Automation", copy: "Streamline\nwhat's next." },
  { className: "scene-card card-founder", icon: "founder" as const, title: "Founder CV", copy: "Experience\nwith impact." },
];

export function HeroSection() {
  return (
    <section className="hero-cinematic shell-wide" aria-labelledby="hero-title">
      <div className="hero-copy-v2">
        <span className="kicker">DATA · AI · SOFTWARE</span>
        <h1 id="hero-title">
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
          <span className="ask-spark" aria-hidden="true"><FeatureIcon name="agents" /></span>
          <span className="ask-placeholder">Ask Alvorem anything...</span>
          <span className="ask-submit" aria-hidden="true"><ArrowIcon /></span>
        </div>

        <div className="try-row" aria-label="Suggested prompts">
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
        <div className="scene-logo"><AlvoremSymbol variant="hero" /></div>

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
              <small>
                {card.copy.split("\n").map((line, index) => (
                  <span key={line}>{line}{index === 0 ? <br /> : null}</span>
                ))}
              </small>
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
  );
}
