"use client";

import { AgentInlineText } from "@/components/AgentInlineText";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./PricingCommercialScope.module.css";

const copy = {
  en: {
    eyebrow: "COMMERCIAL SCOPE",
    title: "Clear before you commit.",
    body: "The public price tells you which intelligence plan you are buying. Before activation, we put the operating scope in writing so users, data, usage and support are not left to assumption.",
    items: [
      ["Users & access", "We confirm who needs access and the initial rollout scope before activation. Larger or more complex rollouts are scoped as a Private deployment."],
      ["Business context & sources", "Onboarding defines the approved business context and agreed starting sources. Additional or complex sources are scoped explicitly rather than treated as unlimited."],
      ["Integrations", "Standard onboarding covers the agreed setup scope. Custom integrations, dedicated infrastructure and complex system work belong in ALVOREM Private."],
      ["Usage boundaries", "Any plan-specific usage boundaries are made explicit before activation. We do not rely on an undefined ‘unlimited’ promise."],
      ["Support & onboarding", "Onboarding covers access, context and the agreed integration setup. The support path and response expectations are confirmed with the deployment scope."],
      ["Deployment", "ALVO and OREM are the standard agent plans. ALVOREM Private is the scoped route for dedicated implementation, governance requirements, complex integrations and larger rollouts."],
    ],
    footer: "No hidden scope assumptions: the commercial scope is agreed before activation.",
  },
  ro: {
    eyebrow: "SCOP COMERCIAL",
    title: "Clar înainte să te angajezi.",
    body: "Prețul public îți spune ce plan de inteligență cumperi. Înainte de activare, stabilim în scris scopul operațional, astfel încât utilizatorii, datele, utilizarea și suportul să nu rămână la nivel de presupunere.",
    items: [
      ["Utilizatori & acces", "Confirmăm cine are nevoie de acces și scopul inițial al implementării înainte de activare. Implementările mai mari sau mai complexe sunt configurate ca deployment Private."],
      ["Context de business & surse", "Onboarding-ul definește contextul de business aprobat și sursele inițiale agreate. Sursele suplimentare sau complexe sunt configurate explicit, nu tratate ca nelimitate."],
      ["Integrări", "Onboarding-ul standard acoperă scopul de configurare agreat. Integrările personalizate, infrastructura dedicată și munca complexă între sisteme intră în ALVOREM Private."],
      ["Limite de utilizare", "Orice limite specifice planului sunt făcute explicite înainte de activare. Nu ne bazăm pe o promisiune vagă de «nelimitat»."],
      ["Suport & onboarding", "Onboarding-ul acoperă accesul, contextul și configurarea integrărilor agreate. Canalul de suport și așteptările de răspuns sunt confirmate împreună cu scopul implementării."],
      ["Implementare", "ALVO și OREM sunt planurile standard de agenți. ALVOREM Private este ruta configurată pentru implementare dedicată, cerințe de guvernanță, integrări complexe și rollout-uri mai mari."],
    ],
    footer: "Fără presupuneri ascunse: scopul comercial este agreat înainte de activare.",
  },
} as const;

export function PricingCommercialScope() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className={["site-shell", styles.scope].join(" ")} aria-labelledby="pricing-scope-title">
      <div className={styles.heading}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="pricing-scope-title">{t.title}</h2>
        <p><AgentInlineText text={t.body} /></p>
      </div>

      <div className={styles.grid}>
        {t.items.map(([title, body]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p><AgentInlineText text={body} /></p>
          </article>
        ))}
      </div>

      <p className={styles.footer}>{t.footer}</p>
    </section>
  );
}
