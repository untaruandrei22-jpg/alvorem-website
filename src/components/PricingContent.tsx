"use client";

import { AgentInlineText } from "@/components/AgentInlineText";
import { AgentRingMark } from "@/components/AgentRingMark";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import brandStyles from "./PricingBrandLockup.module.css";
import styles from "./PricingContent.module.css";

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>;
}

function ValueIcon({ index }: { index: number }) {
  if (index === 0) return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
  if (index === 1) return <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2.5 21c.3-4.8 2.1-7.2 5.5-7.2s5.3 2.4 5.5 7.2M13 15.2c1-.8 2.2-1.2 3.7-1.2 3 0 4.6 2.1 4.8 6.3" /></svg>;
}

const copy = {
  en: {
    eyebrow: "PRICING",
    title: "Private AI, priced for real business work.",
    body: "Start with ALVO for everyday clarity. Choose OREM when you want the deepest reasoning layer in our standard agent plans. Move to ALVOREM Private when both agents, integrations and dedicated implementation need to work as one system.",
    plans: {
      alvo: {
        badge: "EVERYDAY INTELLIGENCE",
        title: "ALVO",
        priceLabel: "MONTHLY",
        price: "€249",
        period: "/ month",
        onboarding: "€490 one-time onboarding",
        annual: "€2,739 / year · 1 month free",
        priceNote: "Prices exclude VAT where applicable.",
        body: "Your private business intelligence for everyday questions, KPIs, summaries and reports.",
        features: ["Everyday business chat", "KPI summaries", "Reports", "Trusted business context"],
        cta: "Start with ALVO",
      },
      orem: {
        badge: "DEEP REASONING",
        title: "OREM",
        priceLabel: "MONTHLY",
        price: "€549",
        period: "/ month",
        onboarding: "€990 one-time onboarding",
        annual: "€6,039 / year · 1 month free",
        priceNote: "Prices exclude VAT where applicable.",
        body: "Deeper reasoning, investigation, scenario work and advanced automation for higher-complexity work.",
        features: ["Deep analysis", "Multi-source reasoning", "Scenario modelling", "Advanced automation"],
        cta: "Choose OREM",
      },
      team: {
        badge: "PRIVATE DEPLOYMENT",
        title: "ALVOREM Private",
        priceLabel: "FROM",
        price: "€1,290",
        period: "/ month",
        onboarding: "Implementation from €2,490",
        annual: "From €14,190 / year · 1 month free",
        priceNote: "Prices exclude VAT where applicable.",
        body: "ALVO + OREM together, with private business context, integrations and implementation shaped around your company.",
        features: ["ALVO + OREM included", "Shared business memory", "Custom integrations", "Dedicated implementation"],
        cta: "Talk to us",
      },
    },
    pricingFootnote: "Annual plans include 1 month free. One-time onboarding applies. Prices exclude VAT where applicable.",
    enterpriseEyebrow: "CUSTOM DEPLOYMENTS",
    enterpriseTitle: "Need a larger or more specialized private AI environment?",
    enterpriseBody: "Dedicated infrastructure, governance requirements, complex integrations and larger rollouts are scoped around your business.",
    enterpriseCta: "Scope a deployment",
    valueEyebrow: "WHAT YOU ARE ACTUALLY BUYING",
    valueTitle: "Not another chatbot.",
    valueBody: "You are paying for an AI team that understands your business context, works with trusted data and helps reduce the work your people carry.",
    valueItems: ["Private context", "Predictable access", "Human control"],
    faqTitle: "A few useful answers.",
    faqs: [
      ["Can I start only with ALVO?", "Yes. ALVO is the everyday starting point and can be deployed independently."],
      ["Is OREM an add-on?", "OREM is the standalone plan for deeper reasoning. ALVOREM Private brings ALVO and OREM together with integrations and dedicated implementation."],
      ["What does onboarding cover?", "Onboarding covers the real setup work needed to configure access, context and the agreed integration scope."],
      ["Do annual plans include a discount?", "Yes. Public annual pricing includes one month free."],
    ],
    pricingSubject: "Pricing conversation",
    customSubject: "Custom ALVOREM deployment",
  },
  ro: {
    eyebrow: "PREȚURI",
    title: "AI privat, cu prețuri pentru muncă reală de business.",
    body: "Începe cu ALVO pentru claritatea de zi cu zi. Alege OREM când vrei cel mai profund nivel de raționament dintre planurile standard de agenți. Treci la ALVOREM Private când ambii agenți, integrările și implementarea dedicată trebuie să funcționeze ca un singur sistem.",
    plans: {
      alvo: {
        badge: "INTELIGENȚĂ DE ZI CU ZI",
        title: "ALVO",
        priceLabel: "LUNAR",
        price: "€249",
        period: "/ lună",
        onboarding: "€490 onboarding o singură dată",
        annual: "€2.739 / an · 1 lună gratuită",
        priceNote: "Prețurile nu includ TVA, unde este cazul.",
        body: "Inteligența ta privată de business pentru întrebări, KPI, rezumate și rapoarte zilnice.",
        features: ["Chat zilnic de business", "Rezumate KPI", "Rapoarte", "Context de business de încredere"],
        cta: "Începe cu ALVO",
      },
      orem: {
        badge: "RAȚIONAMENT PROFUND",
        title: "OREM",
        priceLabel: "LUNAR",
        price: "€549",
        period: "/ lună",
        onboarding: "€990 onboarding o singură dată",
        annual: "€6.039 / an · 1 lună gratuită",
        priceNote: "Prețurile nu includ TVA, unde este cazul.",
        body: "Raționament mai profund, investigație, scenarii și automatizare avansată pentru munca cu complexitate mai mare.",
        features: ["Analiză profundă", "Raționament din surse multiple", "Modelare de scenarii", "Automatizare avansată"],
        cta: "Alege OREM",
      },
      team: {
        badge: "IMPLEMENTARE PRIVATĂ",
        title: "ALVOREM Private",
        priceLabel: "DE LA",
        price: "€1.290",
        period: "/ lună",
        onboarding: "Implementare de la €2.490",
        annual: "De la €14.190 / an · 1 lună gratuită",
        priceNote: "Prețurile nu includ TVA, unde este cazul.",
        body: "ALVO + OREM împreună, cu context privat de business, integrări și implementare construită în jurul companiei tale.",
        features: ["ALVO + OREM incluse", "Memorie comună de business", "Integrări personalizate", "Implementare dedicată"],
        cta: "Vorbește cu noi",
      },
    },
    pricingFootnote: "Planurile anuale includ 1 lună gratuită. Se aplică onboarding o singură dată. Prețurile nu includ TVA, unde este cazul.",
    enterpriseEyebrow: "IMPLEMENTĂRI PERSONALIZATE",
    enterpriseTitle: "Ai nevoie de un mediu AI privat mai mare sau mai specializat?",
    enterpriseBody: "Infrastructura dedicată, cerințele de guvernanță, integrările complexe și implementările mai mari sunt configurate în jurul afacerii tale.",
    enterpriseCta: "Configurează o implementare",
    valueEyebrow: "CE CUMPERI DE FAPT",
    valueTitle: "Nu încă un chatbot.",
    valueBody: "Plătești pentru o echipă AI care înțelege contextul afacerii tale, lucrează cu date de încredere și reduce din munca pe care oamenii tăi o duc zilnic.",
    valueItems: ["Context privat", "Acces predictibil", "Control uman"],
    faqTitle: "Câteva răspunsuri utile.",
    faqs: [
      ["Pot începe doar cu ALVO?", "Da. ALVO este punctul de pornire pentru lucrul de zi cu zi și poate fi implementat independent."],
      ["OREM este un add-on?", "OREM este planul separat pentru raționament mai profund. ALVOREM Private îi aduce pe ALVO și OREM împreună, cu integrări și implementare dedicată."],
      ["Ce acoperă onboarding-ul?", "Onboarding-ul acoperă munca reală de configurare pentru acces, context și scopul de integrare agreat."],
      ["Planurile anuale au discount?", "Da. Prețurile publice anuale includ o lună gratuită."],
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
              <AgentRingMark variant={key} size="md" />
            </div>
            <h2 className={key === "team" ? brandStyles.teamTitle : undefined}>
              {key === "team" ? (
                <>
                  <AgentWordmark agent="alvorem" size="md" className={brandStyles.privateWordmark} />
                  <span className={brandStyles.privateSuffix}>Private</span>
                </>
              ) : (
                <AgentWordmark agent={key} size="md" />
              )}
            </h2>
            <div className={styles.price}>
              <span className={styles.priceLabel}>{plan.priceLabel}</span>
              <div className={styles.priceLine}>
                <strong>{plan.price}</strong>
                <span>{plan.period}</span>
              </div>
              <div className={styles.commercialLines}>
                <span>{plan.onboarding}</span>
                <span>{plan.annual}</span>
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

      <p className={["site-shell", styles.pricingFootnote].join(" ")}>{t.pricingFootnote}</p>

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
            {t.valueItems.map((item, index) => <span key={item}><ValueIcon index={index} />{item}</span>)}
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