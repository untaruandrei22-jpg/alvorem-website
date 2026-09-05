"use client";

import { useState } from "react";

const capabilities = [
  { id: "agents", eyebrow: "AI", title: "AI Agents", copy: "Private, grounded assistants that connect business questions to trusted systems and data." },
  { id: "data", eyebrow: "DATA", title: "Decision Systems", copy: "Dashboards, metrics and data products built around decisions — not vanity charts." },
  { id: "automation", eyebrow: "AUTOMATION", title: "Workflow Automation", copy: "Remove repetitive operational work while keeping people in control of important decisions." },
  { id: "software", eyebrow: "SOFTWARE", title: "Custom Products", copy: "Focused web and internal tools shaped around a real business workflow, not a generic template." },
];

export function CapabilityExplorer() {
  const [active, setActive] = useState(capabilities[0]);
  return (
    <section className="capabilities shell" id="solutions">
      <div className="section-heading"><span className="kicker">WHAT WE BUILD</span><h2>One partner. Multiple ways to make a business smarter.</h2></div>
      <div className="capability-grid">
        <div className="capability-list" role="tablist" aria-label="ALVOREM capabilities">
          {capabilities.map((item, index) => (
            <button key={item.id} className={`capability-button ${active.id === item.id ? "active" : ""}`} onClick={() => setActive(item)} role="tab" aria-selected={active.id === item.id}>
              <span className="capability-index">0{index + 1}</span><span><small>{item.eyebrow}</small><strong>{item.title}</strong></span><span className="capability-arrow">↗</span>
            </button>
          ))}
        </div>
        <div className="capability-stage" role="tabpanel">
          <div className="stage-orbit orbit-one" /><div className="stage-orbit orbit-two" />
          <div className="stage-core"><span>{active.eyebrow}</span><h3>{active.title}</h3><p>{active.copy}</p><a href="#contact">Talk about this <span>→</span></a></div>
        </div>
      </div>
    </section>
  );
}
