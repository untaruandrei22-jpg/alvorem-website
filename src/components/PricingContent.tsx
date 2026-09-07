"use client";

import { AgentInlineText } from "@/components/AgentInlineText";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./PricingContent.module.css";

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>;
}

const copy = {
  en: {
    eyebrow: "PRICING",
    title: "Simple pricing for the intelligence you need.",
    body: "Start with ALVO. Add OREM when deeper reasoning or automation becomes valuable. Choose the full team when you want both working from the same business memory.",
    plans: {
      alvo: {
        badge: "STARTING PLAN",
        title: "Everyday intelligence",
        priceLabel: "STARTING FROM",
        price: "1,490 RON",
        period: "/ month",
        priceNote: "excl. VAT",
        body: "Your private business intelligence for everyday questions, KPIs, summaries and reports.",
        features: ["Everyday business chat", "KPI summaries", "Reports", "Trusted business context"],
        cta: "Start with ALVO",
      },
      orem: {
        badge: "SUBSCRIPTION UPGRADE",
        title: "Deep intelligence",
        priceLabel: "ADD-ON FROM",
        price: "+1,490 RON",
        period: "/ month",
        priceNote: "excl. VAT",
        body: "Add deeper reasoning, investigation, scenario work and advanced automation when the work needs more.",
        features: ["Deep analysis", "Multi-source reasoning", "Scenario modelling", "Advanced automation"],
        cta: "Add OREM",
      },
      team: {
        badge: "RECOMMENDED",
        title: "The full private AI team",
        priceLabel: "STARTING FROM",
        price: "2,790 RON",
        period: "/ month",
        priceNote: "excl. VAT",
        body: "ALVO as the everyday interface. OREM as the deeper layer. One business memory and the right depth for every task.",
        features: ["ALVO + OREM", "Shared business memory", "One conversation", "Intelligent handoff"],
        cta: "Talk to us",
      },
    },
    enterpriseEyebrow: "CUSTOM DEPLOYMENTS",
    enterpriseTitle: "Need something more private or more complex?",
    enterpriseBody: "Dedicated infrastructure, custom integrations, governance requirements and larger deployments are scoped around your business.",
    enterpriseCta: "Talk to ALVOREM",
    valueEyebrow: "WHAT YOU ARE ACTUALLY BUYING",
    valueTitle: "Not another chatbot.",
    valueBody: "You are paying for an AI team that understands your business context, works with trusted data and helps reduce the work your people carry.",
    valueItems: ["Private context", "Predictable access", "Human control"],
    faqTitle: "A few useful answers.",
    faqs: [
      ["Can I start only with ALVO?", "Yes. ALVO is designed to be the everyday starting point."],
      ["Can I add OREM later?", "Yes. OREM is an upgrade layer, so you can add deeper capability when it becomes valuable."],
      ["Do ALVO and OREM use the same business context?", "Yes. The product direction is one trusted business memory and shared access rules."],
      ["Do you offer pilots?", "Yes. Pilot scope, integrations and commercial terms are agreed around the business case."],
    ],
    pricingSubject: "Pricing conversation",
    customSubject: "Custom ALVOREM deployment",
  },
  ro: {
    eyebrow: "PREȚURI",
    title: "Prețuri simple pentru inteligența de care ai nevoie.",
    body: "Începe cu ALVO. Adaugă OREM când raționamentul mai profund sau automatizarea devin valoroase. Alege echipa completă când vrei ca amândoi să lucreze din aceeași memorie de business.",
    plans: {
      alvo: {
        badge: "PLAN DE PORNIRE",
        title: "Inteligență de zi cu zi",
        priceLabel: "DE LA",
        price: "1.490 RON",
        period: "/ lună",
        priceNote: "fără TVA",
        body: "Inteligența ta privată de business pentru întrebări, KPI, rezumate și rapoarte zilnice.",
        features: ["Chat zilnic de business", "Rezumate KPI", "Rapoarte", "Context de business de încredere"],
        cta: "Începe cu ALVO",
      },
      orem: {
        badge: "UPGRADE PRIN ABONAMENT",
        title: "Inteligență profundă",
        priceLabel: "ADD-ON DE LA",
        price: "+1.490 RON",
        period: "/ lună",
        priceNote: "fără TVA",
        body: "Adaugă raționament mai profund, investigație, scenarii și automatizare avansată când munca are nevoie de mai mult.",
        features: ["Analiză profundă", "Raționament din surse multiple", "Modelare de scenarii", "Automatizare avansată"],
        cta: "Adaugă OREM",
      },
      team: {
        badge: "RECOMANDAT",
        title: "Echipa AI privată completă",
        priceLabel: "DE LA",
        price: "2.790 RON",
        period: "/ lună",
        priceNote: "fără TVA",
        body: "ALVO ca interfață zilnică. OREM ca nivel profund. O singură memorie de business și profunzimea potrivită pentru fiecare task.",
        features: ["ALVO + OREM", "Memorie comună de business", "O singură conversație", "Transfer inteligent"],
        cta: "Vorbește cu noi",
      },
    },
    enterpriseEyebrow: "IMPLEMENTĂRI PERSONALIZATE",
    enterpriseTitle: "Ai nevoie de ceva mai privat sau mai complex?",
    enterpriseBody: "Infrastructura dedicată, integrările personalizate, cerințele de guvernanță și implementările mai mari sunt configurate în jurul afacerii tale.",
    enterpriseCta: "Vorbește cu ALVOREM",
    valueEyebrow: "CE CUMPERI DE FAPT",
    valueTitle: "Nu încă un chatbot.",
    valueBody: "Plătești pentru o echipă AI care înțelege contextul afacerii tale, lucrează cu date de încredere și reduce din munca pe care oamenii tăi o duc zilnic.",
    valueItems: ["Context privat", "Acces predictibil", "Control uman"],
    faqTitle: "Câteva răspunsuri utile.",
    faqs: [
      ["Pot începe doar cu ALVO?", "Da. ALVO este punctul de pornire pentru lucrul de zi cu zi."],
      ["Pot adăuga OREM mai târziu?", "Da. OREM este un nivel de upgrade, astfel încât poți adăuga capabilități mai profunde când devin valoroase."],
      ["ALVO și OREM folosesc același context de business?", "Da. Direcția produsului este o singură memorie de business de încredere și aceleași reguli de acces."],
      ["Oferiți pilot?", "Da. Scopul pilotului, integrările și termenii comerciali se stabilesc în jurul cazului de business."],
    ],
    pricingSubject: "Conversație despre prețuri ALVOREM",
    customSubject: "Implementare ALVOREM personalizată",
  },
} as const;

export function PricingContent() {
  const { locale } = useLocale();
  const t = copy[locale];
  const plans = [
    ["alvo", t.plans.alvo],
    ["orem", t.plans.orem],
    ["team", t.plans.team],
  ] as const;

  return (
    <>
      <section className={["site-shell", styles.hero].join(" ")} id="main-content" aria-labelledby="pricing-title">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 id="pricing-title">{t.title}</h1>
        <p><AgentInlineText text={t.body} /></p>
      </section>

      <section className={["site-shell", styles.plans].join(" ")} aria-label={locale === "ro" ? "Opțiuni de abonament" : "Subscription options"}>
        {plans.map(([key, plan]) => (
          <article className={`${styles.plan} ${styles[key]}`} key={key}>
            <div className={styles.planTop}>
              <span>{plan.badge}</span>
              {key === "alvo" ? (
                <AgentWordmark agent="alvo" size="md" />
              ) : key === "orem" ? (
                <AgentWordmark agent="orem" size="md" />
              ) : (
                <span className={styles.teamMarks}><AgentWordmark agent="alvo" size="xs" /><i>+</i><AgentWordmark agent="orem" size="xs" /></span>
              )}
            </div>
            <h2>{plan.title}</h2>
            <div className={styles.price}>
              <span className={styles.priceLabel}>{plan.priceLabel}</span>
              <div className={styles.priceLine}>
                <strong>{plan.price}</strong>
                <span>{plan.period}</span>
              </div>
              <small>{plan.priceNote}</small>
            </div>
            <p><AgentInlineText text={plan.body} /></p>
            <div className={styles.features}>
              {plan.features.map((feature) => <span key={feature}><AgentInlineText text={feature} /></span>)}
            </div>
            <a href={`mailto:hello@alvorem.ro?subject=${encodeURIComponent(t.pricingSubject)}`}>
              <AgentInlineText text={plan.cta} /> <ArrowIcon />
            </a>
          </article>
        ))}
      </section>

      <section className={["site-shell", styles.custom].join(" ")}>
        <div>
          <p className="eyebrow">{t.enterpriseEyebrow}</p>
          <h2>{t.enterpriseTitle}</h2>
          <p>{t.enterpriseBody}</p>
        </div>
        <a
          className="button button--secondary"
          href={`mailto:hello@alvorem.ro?subject=${encodeURIComponent(t.customSubject)}`}
        >
          {t.enterpriseCta}
        </a>
      </section>

      <section className={styles.value}>
        <div className={["site-shell", styles.valueInner].join(" ")}>
          <div>
            <p className="eyebrow">{t.valueEyebrow}</p>
            <h2>{t.valueTitle}</h2>
            <p>{t.valueBody}</p>
          </div>
          <div className={styles.valueItems}>
            {t.valueItems.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className={["site-shell", styles.faq].join(" ")}>
        <h2>{t.faqTitle}</h2>
        <div>
          {t.faqs.map(([question, answer]) => (
            <article key={question}>
              <h3><AgentInlineText text={question} /></h3>
              <p><AgentInlineText text={answer} /></p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
