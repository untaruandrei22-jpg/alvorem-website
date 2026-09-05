"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/BrandAssets";

const services = [
  {
    id: "agents",
    number: "01",
    eyebrow: "AI",
    title: "AI Agents",
    panelTitle: "AI Agents",
    copy: "Private, grounded assistants that connect business questions to trusted systems and data.",
  },
  {
    id: "data",
    number: "02",
    eyebrow: "DATA",
    title: "Data / Decision Systems",
    panelTitle: "Data / Decision Systems",
    copy: "Dashboards, metrics and decision systems that turn trusted data into clear, useful business direction.",
  },
  {
    id: "automation",
    number: "03",
    eyebrow: "AUTOMATION",
    title: "Automation / Workflow Automation",
    panelTitle: "Workflow Automation",
    copy: "Focused automation that removes repetitive operational work while keeping people in control of important decisions.",
  },
  {
    id: "software",
    number: "04",
    eyebrow: "SOFTWARE",
    title: "Software / Custom Products",
    panelTitle: "Custom Products",
    copy: "Focused software and internal products shaped around a real business workflow rather than a generic template.",
  },
];

export function WhatWeBuildSection() {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((service) => service.id === activeId) ?? services[0];

  return (
    <section className="capabilities shell" id="solutions" aria-labelledby="what-we-build-title">
      <div className="section-heading production-section-heading">
        <span className="kicker">WHAT WE BUILD</span>
        <h2 id="what-we-build-title">One partner. Multiple<br />ways to make a business<br />smarter.</h2>
      </div>

      <div className="capability-grid">
        <div className="capability-list" role="tablist" aria-label="ALVOREM services">
          {services.map((item) => {
            const isActive = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`capability-button ${isActive ? "active" : ""}`}
                onClick={() => setActiveId(item.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls="capability-detail"
              >
                <span className="capability-index">{item.number}</span>
                <span className="capability-labels">
                  <small>{item.eyebrow}</small>
                  <strong>{item.title}</strong>
                </span>
                <span className="capability-arrow" aria-hidden="true"><ArrowIcon /></span>
              </button>
            );
          })}
        </div>

        <div className="capability-stage" id="capability-detail" role="tabpanel" aria-live="polite">
          <div className="stage-orbit orbit-one" aria-hidden="true" />
          <div className="stage-orbit orbit-two" aria-hidden="true" />
          <div className="stage-glow" aria-hidden="true" />
          <div className="stage-core">
            <span>{active.eyebrow}</span>
            <h3>{active.panelTitle}</h3>
            <p>{active.copy}</p>
            <a href="#contact">Talk about this <ArrowIcon /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
