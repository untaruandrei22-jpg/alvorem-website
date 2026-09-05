"use client";

import { useState } from "react";

const capabilities = [
  { id: "agents", eyebrow: "AI", title: "AI Agents", copy: "Private, grounded assistants that connect business questions to trusted systems and data." },
  { id: "data", eyebrow: "DATA", title: "Data / Decision Systems", copy: "Dashboards, metrics and data products designed around the decisions leaders actually need to make." },
  { id: "automation", eyebrow: "AUTOMATION", title: "Automation / Workflow Automation", copy: "Focused automation that removes repetitive work while keeping people in control of important decisions." },
  { id: "software", eyebrow: "SOFTWARE", title: "Software / Custom Products", copy: "Useful web and internal products shaped around real operations, not generic templates." },
];

export function CapabilityExplorer() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const active = capabilities.find((item) => item.id === activeId) ?? capabilities[0];
  return <section className="capabilities shell" id="solutions" aria-labelledby="capability-title"><div className="section-heading"><span className="kicker">WHAT WE BUILD</span><h2 id="capability-title">One partner. Multiple<br />ways to make a business<br />smarter.</h2></div><div className="capability-grid"><div className="capability-list" role="tablist" aria-label="ALVOREM capabilities">{capabilities.map((item, index) => <button key={item.id} id={`tab-${item.id}`} className={`capability-button ${active.id === item.id ? "active" : ""}`} onClick={() => setActiveId(item.id)} role="tab" aria-selected={active.id === item.id} aria-controls="capability-panel"><span className="capability-index">0{index + 1}</span><span><small>{item.eyebrow}</small><strong>{item.title}</strong></span><span className="capability-arrow">→</span></button>)}</div><div className="capability-stage" id="capability-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} tabIndex={0}><div className="stage-orbit one"/><div className="stage-orbit two"/><div className="stage-core" key={active.id}><span>{active.eyebrow}</span><h3>{active.title}</h3><p>{active.copy}</p><a href="#contact">Talk about this <b>→</b></a></div></div></div></section>;
}
