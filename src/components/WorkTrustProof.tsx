"use client";

import styles from "./WorkTrustProof.module.css";

type Locale = "en" | "ro";

const copy = {
  en: {
    eyebrow: "IMPLEMENTATION PROOF",
    title: "Trust should be visible in the architecture.",
    body: "The current ALVOREM business-agent core is built read-only-first. Business facts come from approved tools and controlled sources, then pass a trusted-answer contract before they reach the interface.",
    pathLabel: "CURRENT ANSWER PATH",
    steps: [
      {
        label: "REQUEST",
        title: "Business question",
        body: "Natural language enters the conversation layer. It does not grant access to business data by itself.",
      },
      {
        label: "CONTROL",
        title: "Approved tool only",
        body: "The agent can select only validated business tools. Write requests, arbitrary SQL and unrestricted queries are rejected.",
      },
      {
        label: "DATA",
        title: "Controlled source",
        body: "The current private-data path is read-only and bounded. The public website demo is synthetic-only.",
      },
      {
        label: "EVIDENCE",
        title: "Trusted answer",
        body: "Data date, scope, provenance and limitations are validated. Incomplete or invalid data-backed answers are blocked before presentation.",
      },
    ],
    controls: [
      {
        title: "Read-only first",
        body: "No write operations or arbitrary SQL in the current business-data API.",
      },
      {
        title: "Fail closed",
        body: "Real-data access, authenticated client access and external-model access use separate gates. Missing or invalid configuration stops the path.",
      },
      {
        title: "Evidence before narrative",
        body: "The language model is not the authority for business facts. Verified tools and evidence remain the source of truth.",
      },
      {
        title: "Privacy-safe observability",
        body: "Telemetry can record operational metadata without storing user questions, model answers or business values.",
      },
    ],
    note: "These are implemented controls in the current product core, not a claim of external certification. Retention, residency, provider policy and network boundaries are scoped per private deployment.",
  },
  ro: {
    eyebrow: "DOVADĂ DE IMPLEMENTARE",
    title: "Încrederea trebuie să se vadă în arhitectură.",
    body: "Nucleul actual al agentului ALVOREM este construit read-only-first. Informațiile de business vin din instrumente aprobate și surse controlate, apoi trec printr-un contract de răspuns de încredere înainte să ajungă în interfață.",
    pathLabel: "TRASEUL ACTUAL AL RĂSPUNSULUI",
    steps: [
      {
        label: "CERERE",
        title: "Întrebare de business",
        body: "Limbajul natural intră în stratul conversațional. El nu oferă singur acces la datele de business.",
      },
      {
        label: "CONTROL",
        title: "Doar instrumente aprobate",
        body: "Agentul poate selecta doar instrumente de business validate. Cererile de scriere, SQL-ul arbitrar și interogările nelimitate sunt respinse.",
      },
      {
        label: "DATE",
        title: "Sursă controlată",
        body: "Traseul actual pentru date private este read-only și limitat. Demo-ul public al website-ului folosește exclusiv date sintetice.",
      },
      {
        label: "DOVADĂ",
        title: "Răspuns de încredere",
        body: "Data, scopul, proveniența și limitările sunt validate. Răspunsurile incomplete sau invalide sunt blocate înainte de afișare.",
      },
    ],
    controls: [
      {
        title: "Read-only first",
        body: "Fără operațiuni de scriere sau SQL arbitrar în API-ul actual pentru date de business.",
      },
      {
        title: "Fail closed",
        body: "Accesul la date reale, accesul client autentificat și accesul modelului extern au porți separate. Configurația lipsă sau invalidă oprește traseul.",
      },
      {
        title: "Dovadă înainte de narațiune",
        body: "Modelul de limbaj nu este autoritatea pentru faptele de business. Instrumentele validate și dovezile rămân sursa de adevăr.",
      },
      {
        title: "Observabilitate sigură pentru confidențialitate",
        body: "Telemetria poate păstra metadate operaționale fără întrebările utilizatorului, răspunsurile modelului sau valorile de business.",
      },
    ],
    note: "Acestea sunt controale implementate în nucleul actual al produsului, nu o afirmație de certificare externă. Retenția, rezidența datelor, politica de provider și limitele de rețea se stabilesc pentru fiecare implementare privată.",
  },
} as const;

export function WorkTrustProof({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className={styles.section} aria-labelledby="work-trust-title">
      <div className="site-shell">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 id="work-trust-title">{t.title}</h2>
          </div>
          <p>{t.body}</p>
        </div>

        <div className={styles.pathBlock}>
          <p className={styles.pathLabel}>{t.pathLabel}</p>
          <div className={styles.path} role="list">
            {t.steps.map((step, index) => (
              <article className={styles.step} role="listitem" key={step.title}>
                <div className={styles.stepMeta}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{step.label}</small>
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {index < t.steps.length - 1 && <i className={styles.arrow} aria-hidden="true">→</i>}
              </article>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          {t.controls.map((control) => (
            <article key={control.title}>
              <span aria-hidden="true" />
              <h3>{control.title}</h3>
              <p>{control.body}</p>
            </article>
          ))}
        </div>

        <p className={styles.note}>{t.note}</p>
      </div>
    </section>
  );
}
