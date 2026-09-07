"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";

const copyPairs = [
  // Shared UI
  ["Skip to content", "Sari la conținut"],
  ["Start a project", "Începe o conversație"],
  ["Start a conversation", "Începe o conversație"],
  ["Contact", "Contact"],
  ["About", "Despre"],
  ["Back to top", "Înapoi sus"],
  ["© 2026 ALVOREM. All rights reserved.", "© 2026 ALVOREM. Toate drepturile rezervate."],

  // Home — supporting sections
  ["Understands your business", "Îți înțelege afacerea"],
  ["Available anytime", "Disponibil oricând"],
  ["Built around your people", "Construit în jurul oamenilor tăi"],
  ["A LIGHTER WAY TO WORK", "UN MOD MAI UȘOR DE A LUCRA"],
  ["One agent. Less to carry.", "Un agent. Mai puțin de dus."],
  ["Ask", "Întreabă"],
  ["Get clear, accurate answers about your business.", "Primește răspunsuri clare și corecte despre afacerea ta."],
  ["Report", "Raportează"],
  ["Turn your data into useful insight, automatically.", "Transformă automat datele în informații utile."],
  ["Automate", "Automatizează"],
  ["Hand over repetitive work, so you don’t have to.", "Lasă munca repetitivă în seama sistemului, ca să nu mai fie nevoie să o faci tu."],
  ["Technology should give you time back.", "Tehnologia ar trebui să îți dea timp înapoi."],
  ["More clarity. Fewer repetitive tasks. More room for life.", "Mai multă claritate. Mai puține sarcini repetitive. Mai mult loc pentru viață."],
  ["A SIMPLE WAY FORWARD", "UN DRUM SIMPLU ÎNAINTE"],
  ["How ALVOREM works", "Cum funcționează ALVOREM"],
  ["We learn your business.", "Îți înțelegem afacerea."],
  ["We understand your context, people and goals.", "Înțelegem contextul, oamenii și obiectivele tale."],
  ["We build your agent.", "Îți construim agentul."],
  ["We tailor it to your workflow and make it yours.", "Îl adaptăm modului tău de lucru și îl facem al tău."],
  ["You work more simply.", "Lucrezi mai simplu."],
  ["Your agent answers, reports and automates.", "Agentul tău răspunde, raportează și automatizează."],
  ["Make business feel", "Fă afacerea să fie"],
  ["lighter.", "mai ușoară."],

  // ALVO / OREM relationship section
  ["MEET YOUR AI TEAM", "FĂ CUNOȘTINȚĂ CU ECHIPA TA AI"],
  ["One business. Shared context. Different depth.", "O singură afacere. Context comun. Profunzime diferită."],
  ["Clarity for every day.", "Claritate pentru fiecare zi."],
  ["Your everyday private business chat. Fast, calm and grounded in what is really happening inside your company.", "Chat-ul privat de business pentru fiecare zi. Rapid, calm și ancorat în ceea ce se întâmplă cu adevărat în compania ta."],
  ["Everyday business chat", "Chat de business pentru zi de zi"],
  ["Fast, clear answers", "Răspunsuri rapide și clare"],
  ["KPI summaries and reports", "Rezumate KPI și rapoarte"],
  ["Built for daily team use", "Construit pentru utilizarea zilnică a echipei"],
  ["Talk to", "Vorbește cu"],
  ["ONE", "O"],
  ["BUSINESS", "AFACERE"],
  ["SHARED", "CONTEXT"],
  ["CONTEXT", "COMUN"],
  ["Think deeper when it matters.", "Gândește mai profund când contează."],
  ["The upgraded ALVOREM layer for deeper reasoning and automation. It steps in when the work needs more than an everyday answer.", "Nivelul superior ALVOREM pentru raționament profund și automatizare. Intervine când munca are nevoie de mai mult decât un răspuns de zi cu zi."],
  ["Deeper reasoning", "Raționament aprofundat"],
  ["Multi-source analysis", "Analiză din surse multiple"],
  ["Advanced automation", "Automatizare avansată"],
  ["Strategic recommendations", "Recomandări strategice"],
  ["Unlock", "Deblochează"],
  ["They share the same trusted business context. They work as one team.", "Folosesc același context de business de încredere. Lucrează ca o singură echipă."],

  // Solutions
  ["SOLUTIONS BUILT AROUND YOUR BUSINESS", "SOLUȚII CONSTRUITE ÎN JURUL AFACERII TALE"],
  ["One agent.", "Un agent."],
  ["Three ways to work lighter.", "Trei moduri de a lucra mai simplu."],
  ["Ask for answers. Turn data into insight. Automate recurring work—all with one system built around your business.", "Pune întrebări. Transformă datele în informații utile. Automatizează munca repetitivă — totul într-un singur sistem construit în jurul afacerii tale."],
  ["Explore solutions", "Explorează soluțiile"],
  ["Explore the three ALVOREM solutions", "Explorează cele trei soluții ALVOREM"],
  ["ASK", "ÎNTREABĂ"],
  ["Find the right answer", "Găsește răspunsul potrivit"],
  ["REPORT", "RAPORTEAZĂ"],
  ["See what matters", "Vezi ce contează"],
  ["AUTOMATE", "AUTOMATIZEAZĂ"],
  ["Move work forward", "Du munca mai departe"],
  ["THREE WAYS TO WORK LIGHTER", "TREI MODURI DE A LUCRA MAI SIMPLU"],
  ["Start with what slows you down.", "Începe cu ceea ce te încetinește."],
  ["Answers grounded in your business.", "Răspunsuri ancorate în afacerea ta."],
  ["Find the right answer across your knowledge, with sources your team can trust.", "Găsește răspunsul potrivit în informațiile companiei, cu surse în care echipa ta poate avea încredere."],
  ["Clear insight, delivered when it matters.", "Claritate utilă, exact când contează."],
  ["Turn scattered data into useful reports, summaries and next steps.", "Transformă datele împrăștiate în rapoarte utile, rezumate și pași următori."],
  ["Recurring work, handled with your rules.", "Munca repetitivă, gestionată după regulile tale."],
  ["Move repeatable tasks forward while your people stay in control.", "Automatizează sarcinile repetitive, păstrând oamenii la control."],
  ["Data", "Date"],
  ["Your internal knowledge, documents and data.", "Cunoștințele, documentele și datele interne ale companiei."],
  ["Tools", "Instrumente"],
  ["The systems you already use, connected securely.", "Sistemele pe care le folosești deja, conectate în siguranță."],
  ["Processes", "Procese"],
  ["Your ways of working and business rules.", "Modul tău de lucru și regulile afacerii."],
  ["Source-backed answers", "Răspunsuri susținute de surse"],
  ["Permission-aware access", "Acces în funcție de permisiuni"],
  ["People stay in control", "Oamenii rămân la control"],
  ["What’s our policy on parental leave?", "Care este politica noastră privind concediul parental?"],
  ["Here’s what I found:", "Iată ce am găsit:"],
  ["Parental Leave Policy", "Politica privind concediul parental"],
  ["Company Handbook · p. 12", "Manualul companiei · p. 12"],
  ["+ 2 more sources", "+ încă 2 surse"],
  ["Q3 Sales Performance", "Performanța vânzărilor T3"],
  ["▼ 8% below plan", "▼ 8% sub plan"],
  ["Plan", "Plan"],
  ["View full report", "Vezi raportul complet"],
  ["Pull latest data", "Preia cele mai recente date"],
  ["Apply your rules", "Aplică regulile tale"],
  ["Draft summary", "Pregătește rezumatul"],
  ["Send to team", "Trimite echipei"],
  ["Completed", "Finalizat"],
  ["In progress", "În desfășurare"],
  ["Scheduled", "Programat"],
  ["2 min ago", "acum 2 min"],
  ["1 min ago", "acum 1 min"],
  ["Now", "Acum"],
  ["In 5 min", "În 5 min"],
  ["BUILT AROUND YOUR REALITY", "CONSTRUIT ÎN JURUL REALITĂȚII TALE"],
  ["Your context in. Clear work out.", "Contextul tău intră. Claritatea iese."],
  ["Understands. Connects.", "Înțelege. Conectează."],
  ["Gets to work.", "Trece la treabă."],
  ["Your people", "Oamenii tăi"],
  ["Answers, insights and automation — in the flow of your work.", "Răspunsuri, insight-uri și automatizare — direct în fluxul vostru de lucru."],
  ["DESIGNED FOR REAL WORK", "GÂNDIT PENTRU MUNCĂ REALĂ"],
  ["Technology should give your team time back.", "Tehnologia ar trebui să redea timp echipei tale."],
  ["Less searching. Less reporting by hand. More room for judgment, relationships and growth.", "Mai puțină căutare. Mai puține rapoarte făcute manual. Mai mult loc pentru judecată, relații și creștere."],
  ["Built around your workflows—not the other way around.", "Construit în jurul fluxurilor tale de lucru — nu invers."],
  ["Bring us one complicated process.", "Adu-ne un proces complicat."],
  ["We’ll help make it", "Te ajutăm să îl facem"],

  // About
  ["ABOUT ALVOREM", "DESPRE ALVOREM"],
  ["Technology should", "Tehnologia ar trebui"],
  ["work around people.", "să lucreze în jurul oamenilor."],
  ["We build private AI agents around the context, rules and people that make every business different.", "Construim agenți AI privați în jurul contextului, regulilor și oamenilor care fac fiecare afacere diferită."],
  ["Why we exist", "De ce existăm"],
  ["Good systems begin with a real conversation.", "Sistemele bune încep cu o conversație reală."],
  ["WHY ALVOREM EXISTS", "DE CE EXISTĂ ALVOREM"],
  ["Business is already", "Business-ul este deja"],
  ["complicated enough.", "destul de complicat."],
  ["Important answers are scattered. Reports take time. Repetitive work keeps returning.", "Răspunsurile importante sunt împrăștiate. Rapoartele consumă timp. Munca repetitivă revine mereu."],
  ["We started ALVOREM to make that burden lighter—without taking people out of the picture.", "Am pornit ALVOREM pentru a face această povară mai ușoară — fără să scoatem oamenii din ecuație."],
  ["See what we build", "Vezi ce construim"],
  ["Listen.", "Ascultă."],
  ["Understand.", "Înțelege."],
  ["Build.", "Construiește."],
  ["AN INDEPENDENT AI STUDIO", "UN STUDIO AI INDEPENDENT"],
  ["Close enough to understand.", "Suficient de aproape ca să înțelegem."],
  ["We work directly with the people closest to the problem, so what we build stays useful, private and grounded in reality.", "Lucrăm direct cu oamenii cei mai apropiați de problemă, astfel încât ceea ce construim să rămână util, privat și ancorat în realitate."],
  ["BUILT IN ROMANIA · DESIGNED FOR REAL BUSINESSES", "CONSTRUIT ÎN ROMÂNIA · GÂNDIT PENTRU AFACERI REALE"],
  ["Make business simpler.", "Fă business-ul mai simplu."],
  ["Make room for what matters.", "Fă loc pentru ceea ce contează."],

  // Manifesto
  ["OUR FOUNDATION", "FUNDAMENTUL NOSTRU"],
  ["Light. Purpose. Prayer. A new beginning.", "Lumină. Scop. Rugăciune. Un nou început."],
  ["ALVOREM is a Christian-driven technology company.", "ALVOREM este o companie de tehnologie ghidată de valori creștine."],
  ["We believe technology should serve people, protect their dignity and give them more time for what truly matters.", "Credem că tehnologia trebuie să servească oamenii, să le protejeze demnitatea și să le ofere mai mult timp pentru ceea ce contează cu adevărat."],
  ["Our work is shaped by truth, stewardship, service, humility, responsibility and love for our neighbour. We pursue excellence and profitability, but never at the expense of integrity.", "Munca noastră este ghidată de adevăr, administrare responsabilă, slujire, smerenie, responsabilitate și iubirea aproapelui. Urmărim excelența și profitabilitatea, dar niciodată în detrimentul integrității."],
  ["Dawn.", "Zori."],
  ["Light emerging. A new beginning. Something better coming into view.", "Lumina care apare. Un nou început. Ceva mai bun care începe să se vadă."],
  ["Clarity & purpose.", "Claritate și scop."],
  ["Clear direction. Simplicity. A target worth aiming at.", "Direcție clară. Simplitate. O țintă pentru care merită să lucrezi."],
  ["Prayer & discernment.", "Rugăciune și discernământ."],
  ["Seek wisdom before acting. Greater capability should carry greater responsibility.", "Caută înțelepciunea înainte de a acționa. O capacitate mai mare trebuie să vină cu o responsabilitate mai mare."],
  ["brings clarity.", "aduce claritate."],
  ["seeks wisdom.", "caută înțelepciune."],
  ["WHAT FAITH CHANGES IN PRACTICE", "CE SCHIMBĂ CREDINȚA ÎN PRACTICĂ"],
  ["Values are real when they cost something.", "Valorile sunt reale atunci când au un cost."],
  ["Serve before you sell.", "Servește înainte să vinzi."],
  ["Solve the right problem simply instead of selling unnecessary complexity.", "Rezolvă simplu problema potrivită, în loc să vinzi complexitate inutilă."],
  ["Truth over growth.", "Adevărul înaintea creșterii."],
  ["Be honest about what AI can do, what it cannot do and where people must stay in control.", "Fii sincer despre ce poate face AI-ul, ce nu poate face și unde oamenii trebuie să rămână la control."],
  ["Stewardship over excess.", "Responsabilitate înaintea excesului."],
  ["Use time, money, data, attention and compute responsibly.", "Folosește responsabil timpul, banii, datele, atenția și puterea de calcul."],
  ["Human dignity first.", "Demnitatea umană pe primul loc."],
  ["Build systems that serve people. Never treat people as disposable resources.", "Construiește sisteme care servesc oamenii. Nu trata niciodată oamenii ca resurse dispensabile."],
  ["THE PROMISE", "PROMISIUNEA"],
  ["We build technology to serve people, not to rule them.", "Construim tehnologie pentru a servi oamenii, nu pentru a-i conduce."],
  ["Make business simpler. Make room for what matters.", "Fă business-ul mai simplu. Fă loc pentru ceea ce contează."],

  // Work
  ["SELECTED WORK", "PROIECTE SELECTATE"],
  ["Built for the way", "Construit pentru felul în care"],
  ["real businesses work.", "lucrează afacerile reale."],
  ["A closer look at how we turn business context into useful, private AI agents.", "O privire mai atentă asupra modului în care transformăm contextul de business în agenți AI privați și utili."],
  ["Explore the work", "Explorează proiectele"],
  ["Selected work", "Proiecte selectate"],
  ["SALES INTELLIGENCE", "INTELIGENȚĂ DE VÂNZĂRI"],
  ["EXECUTIVE REPORTING", "RAPORTARE EXECUTIVĂ"],
  ["OPERATIONS AUTOMATION", "AUTOMATIZAREA OPERAȚIUNILOR"],
  ["PRIVATE BY DESIGN · PEOPLE IN CONTROL", "PRIVAT PRIN DESIGN · OAMENII RĂMÂN LA CONTROL"],
  ["PRIVATE AI PILOT · SALES INTELLIGENCE", "PILOT AI PRIVAT · INTELIGENȚĂ DE VÂNZĂRI"],
  ["From scattered data to an answer leaders", "De la date împrăștiate la un răspuns pe care liderii"],
  ["can verify.", "îl pot verifica."],
  ["A private, read-only agent designed to answer sales questions with clear calculations, sources and limitations.", "Un agent privat, read-only, construit să răspundă întrebărilor despre vânzări cu calcule clare, surse și limitări explicite."],
  ["View the approach", "Vezi abordarea"],
  ["SYNTHETIC DEMONSTRATION", "DEMONSTRAȚIE SINTETICĂ"],
  ["Read only", "Doar citire"],
  ["Sources attached", "Surse atașate"],
  ["Limitations shown", "Limitări afișate"],
  ["How are sales tracking against plan?", "Cum evoluează vânzările față de plan?"],
  ["Total sales are 8% below plan for Q3 2024.", "Vânzările totale sunt cu 8% sub plan pentru T3 2024."],
  ["Actuals are $12.4M vs. a plan of $13.5M, based on internal sales data.", "Realizările sunt de 12,4 mil. $ față de un plan de 13,5 mil. $, pe baza datelor interne de vânzări."],
  ["This answer includes known limitations.", "Acest răspuns include limitările cunoscute."],
  ["Monthly sales vs. plan", "Vânzări lunare vs. plan"],
  ["Actuals", "Realizat"],
  ["Evidence & sources", "Dovezi și surse"],
  ["Sales plan", "Plan de vânzări"],
  ["Calculation", "Calcul"],
  ["ONE QUESTION", "O ÎNTREBARE"],
  ["Ask a question in your own words.", "Pune o întrebare în propriile cuvinte."],
  ["A VERIFIED ANSWER", "UN RĂSPUNS VERIFICAT"],
  ["Get a clear answer with calculations, not guesses.", "Primește un răspuns clar, cu calcule, nu presupuneri."],
  ["SOURCES ATTACHED", "SURSE ATAȘATE"],
  ["See exactly where the answer comes from.", "Vezi exact de unde vine răspunsul."],
  ["Monthly Business Brief", "Raport lunar de business"],
  ["Synthetic preview · September 2024", "Previzualizare sintetică · Septembrie 2024"],
  ["Executive summary", "Rezumat executiv"],
  ["Overall performance was in line with expectations, with continued momentum in key segments.", "Performanța generală a fost în linie cu așteptările, cu un ritm bun menținut în segmentele cheie."],
  ["Total sales", "Vânzări totale"],
  ["vs. last month", "vs. luna trecută"],
  ["vs. plan", "vs. plan"],
  ["Key trend", "Tendință principală"],
  ["Sources (3)", "Surse (3)"],
  ["Trigger", "Declanșator"],
  ["New data available", "Date noi disponibile"],
  ["Prepare", "Pregătire"],
  ["Clean and structure data", "Curăță și structurează datele"],
  ["Human approval", "Aprobare umană"],
  ["Review and confirm outputs", "Revizuiește și confirmă rezultatele"],
  ["Complete", "Finalizare"],
  ["Publish and notify", "Publică și notifică"],
  ["SYNTHETIC PREVIEW", "PREVIZUALIZARE SINTETICĂ"],
  ["Human in control", "Omul rămâne la control"],
  ["More selected work", "Mai multe proiecte selectate"],
  ["A monthly report that arrives already", "Un raport lunar care vine deja"],
  ["explained.", "explicat."],
  ["Turn recurring data into a concise brief, with the numbers and reasoning kept together.", "Transformă datele recurente într-un raport concis, păstrând cifrele și explicațiile împreună."],
  ["See the pattern", "Vezi modelul"],
  ["Recurring work, moved forward with control.", "Munca repetitivă, dusă mai departe cu control."],
  ["Automate the repeatable steps. Keep human approval where judgment matters.", "Automatizează pașii repetitivi. Păstrează aprobarea umană acolo unde judecata contează."],
  ["See the flow", "Vezi fluxul"],
  ["Have a process worth simplifying?", "Ai un proces care merită simplificat?"],
  ["Let’s look at it together.", "Hai să îl analizăm împreună."],

  // Careers
  ["CAREERS, KIND OF.", "CARIERE, ÎN FELUL NOSTRU."],
  ["Send us the CV", "Trimite-ne CV-ul"],
  ["they told you", "pe care ți-au spus"],
  ["not to send.", "să nu-l trimiți."],
  ["A video. A Notion page. A GitHub repo. A PDF with too much personality. Show us how your mind works.", "Un video. O pagină Notion. Un repo GitHub. Un PDF cu prea multă personalitate. Arată-ne cum gândești."],
  ["Surprise us", "Surprinde-ne"],
  ["NO OPEN ROLE? SEND IT ANYWAY.", "NU AVEM UN ROL DESCHIS? TRIMITE-L ORICUM."],
  ["VOICE NOTE", "MESAJ VOCAL"],
  ["SEND YOUR THING", "TRIMITE CE AI"],
  ["Different minds build", "Minți diferite construiesc"],
  ["a brighter tomorrow.", "un mâine mai luminos."],
  ["WHAT WE NOTICE", "CE OBSERVĂM"],
  ["CURIOUS OVER POLISHED", "CURIOZITATE ÎNAINTEA PERFECȚIUNII"],
  ["Show us how you think.", "Arată-ne cum gândești."],
  ["We care more about your curiosity, problem-solving and way of thinking than a perfect CV.", "Ne interesează mai mult curiozitatea, felul în care rezolvi probleme și cum gândești decât un CV perfect."],
  ["USEFUL OVER IMPRESSIVE", "UTIL ÎNAINTE DE IMPRESIONANT"],
  ["Make something that helps.", "Construiește ceva care ajută."],
  ["A small project, a clear idea or a thoughtful experiment tells us more than a long list of buzzwords.", "Un proiect mic, o idee clară sau un experiment bine gândit ne spune mai mult decât o listă lungă de buzzwords."],
  ["YOURSELF OVER TEMPLATE", "TU ÎNAINTEA ȘABLONULUI"],
  ["Leave the beige CV behind.", "Lasă CV-ul beige în urmă."],
  ["We want to meet the real you — your ideas, your taste, your unusual path.", "Vrem să te cunoaștem pe tine — ideile tale, gustul tău, drumul tău neobișnuit."],
  ["LESS OF", "MAI PUȚIN"],
  ["Perfect templates", "Șabloane perfecte"],
  ["Corporate theatre", "Teatru corporatist"],
  ["Ten years of everything", "Zece ani din orice"],
  ["MORE OF", "MAI MULT"],
  ["Things you made", "Lucruri pe care le-ai făcut"],
  ["Problems you noticed", "Probleme pe care le-ai observat"],
  ["Opinions you can defend", "Opinii pe care le poți susține"],
  ["“Different people build a brighter tomorrow.”", "„Oameni diferiți construiesc un mâine mai luminos.”"],
  ["THE ANTI-APPLICATION", "ANTI-APLICAȚIA"],
  ["Send the", "Trimite-l pe"],
  ["weird one.", "cel ciudat."],
  ["Email your file, link, video, voice note or experiment. Tell us what you want to make simpler.", "Trimite-ne prin email fișierul, linkul, video-ul, mesajul vocal sau experimentul tău. Spune-ne ce vrei să faci mai simplu."],
  ["Open your email", "Deschide emailul"],
  ["LINK · FILE · STORY · SOMETHING ELSE", "LINK · FIȘIER · POVESTE · ALTCEVA"],
  ["UNCONVENTIONAL", "NECONVENȚIONALI"],
  ["PEOPLE.", "OAMENI."],
  ["INTELLIGENT", "INTELIGENTE"],
  ["SYSTEMS.", "SISTEME."],
  ["A BRIGHTER", "UN MÂINE"],
  ["TOMORROW.", "MAI LUMINOS."],
] as const;

const enToRo = new Map<string, string>(copyPairs);
const roToEn = new Map<string, string>(copyPairs.map(([en, ro]) => [ro, en]));

const titlePairs: Record<string, [string, string]> = {
  "/": ["ALVOREM — Your business, simpler.", "ALVOREM — Afacerea ta, mai simplă."],
  "/solutions": ["Solutions — ALVOREM", "Soluții — ALVOREM"],
  "/work": ["Work — ALVOREM", "Proiecte — ALVOREM"],
  "/about": ["About — ALVOREM", "Despre — ALVOREM"],
  "/careers": ["Careers, kind of — ALVOREM", "Cariere, în felul nostru — ALVOREM"],
};

function normalized(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function translateValue(value: string, locale: "en" | "ro") {
  const key = normalized(value);
  if (!key) return value;

  const translated = locale === "ro" ? enToRo.get(key) : roToEn.get(key);
  if (!translated) return value;

  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

function shouldSkipTextNode(node: Node) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (parent.closest("[data-no-translate]")) return true;
  return ["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE"].includes(parent.tagName);
}

function translateDocument(locale: "en" | "ro", pathname: string) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    if (!shouldSkipTextNode(node)) {
      const current = node.nodeValue ?? "";
      const next = translateValue(current, locale);
      if (next !== current) node.nodeValue = next;
    }
    node = walker.nextNode();
  }

  document.querySelectorAll<HTMLElement>("[aria-label], [title], [placeholder], img[alt]").forEach((element) => {
    for (const attribute of ["aria-label", "title", "placeholder", "alt"] as const) {
      const current = element.getAttribute(attribute);
      if (!current) continue;
      const next = translateValue(current, locale);
      if (next !== current) element.setAttribute(attribute, next);
    }
  });

  const titles = titlePairs[pathname];
  if (titles) document.title = locale === "ro" ? titles[1] : titles[0];
}

export function SiteLocaleCopy() {
  const { locale } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const apply = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => translateDocument(locale, pathname));
    };

    apply();

    const observer = new MutationObserver(apply);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [locale, pathname]);

  return null;
}
