"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AgentInlineText } from "@/components/AgentInlineText";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./LeadConversationForm.module.css";

type Status = "idle" | "sending" | "success" | "fallback" | "error";

const intents = ["alvo", "orem", "private", "unsure"] as const;
type Intent = (typeof intents)[number];

const copy = {
  en: {
    eyebrow: "START A CONVERSATION",
    title: "Bring us one process worth simplifying.",
    body: "You do not need a finished AI brief. Tell us where work feels heavier than it should and we will find the right starting point.",
    name: "Your name",
    email: "Work email",
    company: "Company",
    intent: "What are you exploring?",
    message: "What would you like to simplify?",
    messagePlaceholder: "For example: weekly reporting takes two days, leaders keep asking the same KPI questions, or one process still lives across spreadsheets and email.",
    submit: "Send to ALVOREM",
    sending: "Sending…",
    direct: "Prefer email? Write to hello@alvorem.ro",
    privacy: "Only the details you submit here are sent. Do not include passwords, credentials or confidential source data.",
    successTitle: "Conversation started.",
    successBody: "Thanks. Your note has been sent to ALVOREM.",
    fallbackTitle: "One final step.",
    fallbackBody: "The direct form channel is not connected yet. Your message is ready below so nothing is lost.",
    fallbackCta: "Send with your email app",
    errorTitle: "Could not send this yet.",
    errorBody: "Try again, or use the direct email option below.",
    intentLabels: {
      alvo: "ALVO — everyday intelligence",
      orem: "OREM — deeper intelligence",
      private: "ALVOREM Private — tailored deployment",
      unsure: "Not sure yet",
    },
  },
  ro: {
    eyebrow: "ÎNCEPE O CONVERSAȚIE",
    title: "Adu-ne un proces care merită simplificat.",
    body: "Nu ai nevoie de un brief AI perfect. Spune-ne unde munca este mai grea decât ar trebui și găsim împreună punctul potrivit de început.",
    name: "Numele tău",
    email: "Email de business",
    company: "Companie",
    intent: "Ce explorezi?",
    message: "Ce ai vrea să simplifici?",
    messagePlaceholder: "De exemplu: raportarea săptămânală durează două zile, liderii pun mereu aceleași întrebări despre KPI sau un proces încă trăiește între Excel și email.",
    submit: "Trimite către ALVOREM",
    sending: "Se trimite…",
    direct: "Preferi email? Scrie la hello@alvorem.ro",
    privacy: "Sunt trimise doar detaliile introduse aici. Nu include parole, credențiale sau date confidențiale din surse.",
    successTitle: "Conversația a început.",
    successBody: "Mulțumim. Mesajul tău a fost trimis către ALVOREM.",
    fallbackTitle: "Încă un pas.",
    fallbackBody: "Canalul direct al formularului nu este conectat încă. Mesajul tău este pregătit mai jos, astfel încât să nu pierzi nimic.",
    fallbackCta: "Trimite cu aplicația ta de email",
    errorTitle: "Nu am putut trimite încă.",
    errorBody: "Încearcă din nou sau folosește opțiunea directă de email de mai jos.",
    intentLabels: {
      alvo: "ALVO — inteligență de zi cu zi",
      orem: "OREM — inteligență profundă",
      private: "ALVOREM Private — implementare personalizată",
      unsure: "Nu sunt sigur încă",
    },
  },
} as const;

function normalizeIntent(value: string | null): Intent {
  return intents.includes(value as Intent) ? (value as Intent) : "unsure";
}

export function LeadConversationForm() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();
  const t = copy[locale];
  const initialIntent = normalizeIntent(searchParams.get("intent"));
  const source = (searchParams.get("source") || "direct").slice(0, 80);
  const initialMessage = (searchParams.get("message") || "").slice(0, 3000);

  const [status, setStatus] = useState<Status>("idle");
  const [fallbackHref, setFallbackHref] = useState("mailto:hello@alvorem.ro");

  const intentOptions = useMemo(
    () => intents.map((value) => ({ value, label: t.intentLabels[value] })),
    [t],
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      company: String(form.get("company") || "").trim(),
      intent: String(form.get("intent") || "unsure"),
      message: String(form.get("message") || "").trim(),
      website: String(form.get("website") || ""),
      source,
      locale,
    };

    const subject = locale === "ro"
      ? `Conversație ALVOREM — ${payload.company || payload.name}`
      : `ALVOREM conversation — ${payload.company || payload.name}`;
    const emailBody = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company}`,
      `Interest: ${payload.intent}`,
      `Source: ${payload.source}`,
      "",
      payload.message,
    ].join("\n");
    setFallbackHref(`mailto:hello@alvorem.ro?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        formElement.reset();
        return;
      }

      const result = await response.json().catch(() => null) as { code?: string } | null;
      setStatus(result?.code === "contact_not_configured" ? "fallback" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={styles.section} id="main-content" aria-labelledby="conversation-title">
      <div className={["site-shell", styles.layout].join(" ")}>
        <div className={styles.copy}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="conversation-title">{t.title}</h1>
          <p><AgentInlineText text={t.body} /></p>
          <div className={styles.teamLine}>
            <AgentWordmark agent="alvo" size="sm" />
            <span aria-hidden="true">→</span>
            <AgentWordmark agent="orem" size="sm" />
            <small>{locale === "ro" ? "profunzimea potrivită, în același context" : "the right depth, in the same context"}</small>
          </div>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={submit}>
            <div className={styles.twoCols}>
              <label>
                <span>{t.name}</span>
                <input name="name" autoComplete="name" maxLength={100} required />
              </label>
              <label>
                <span>{t.email}</span>
                <input name="email" type="email" autoComplete="email" maxLength={160} required />
              </label>
            </div>

            <label>
              <span>{t.company}</span>
              <input name="company" autoComplete="organization" maxLength={120} required />
            </label>

            <label>
              <span>{t.intent}</span>
              <select name="intent" defaultValue={initialIntent}>
                {intentOptions.map((option) => (
                  <option value={option.value} key={option.value}>{option.label}</option>
                ))}
              </select>
            </label>

            <label>
              <span>{t.message}</span>
              <textarea
                name="message"
                rows={6}
                minLength={20}
                maxLength={3000}
                required
                defaultValue={initialMessage}
                placeholder={t.messagePlaceholder}
              />
            </label>

            <label className={styles.honeypot} aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>

            <button className="button button--primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? t.sending : t.submit}
              <span aria-hidden="true">→</span>
            </button>

            <p className={styles.privacy}>{t.privacy}</p>
          </form>

          {status === "success" && (
            <div className={styles.status} role="status">
              <strong>{t.successTitle}</strong>
              <p>{t.successBody}</p>
            </div>
          )}

          {(status === "fallback" || status === "error") && (
            <div className={styles.status} role="status">
              <strong>{status === "fallback" ? t.fallbackTitle : t.errorTitle}</strong>
              <p>{status === "fallback" ? t.fallbackBody : t.errorBody}</p>
              <a href={fallbackHref}>{t.fallbackCta} →</a>
            </div>
          )}

          <a className={styles.direct} href="mailto:hello@alvorem.ro">{t.direct}</a>
        </div>
      </div>
    </section>
  );
}
