"use client";

import { useLocale } from "@/components/LocaleProvider";
import styles from "./CareersContent.module.css";

const applicationHref="mailto:hello@alvorem.ro?subject=My%20weird%20CV%20%E2%80%94%20ALVOREM";

function ArrowIcon(){return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>}

const copy={
 en:{
  eyebrow:"CAREERS, KIND OF.",
  title:"Please don’t send us a normal CV.",
  intro:"Tell us what you’ve built, broken, learned, obsessed over or tried when nobody asked you to. A video, a repo, a voice note, a Notion page or something we have not thought of yet.",
  cta:"Send the weird one",
  note:"NO OPEN ROLE? SEND IT ANYWAY.",
  valuesEyebrow:"WHAT WE CARE ABOUT",
  valuesTitle:"Character before theatre.",
  values:[
   ["Curiosity","You keep asking better questions after the obvious answer."],
   ["Character","How you work with people matters as much as what you can build."],
   ["Craft","You care about making useful things well, even when nobody is grading you."],
   ["Courage","You can challenge an idea, admit you were wrong and try again."],
   ["Kindness","Intelligence without care is not the culture we want to build."],
  ],
  anti:"THE ANTI-APPLICATION",
  antiTitle:"Show us how your mind works.",
  less:"LESS OF",more:"MORE OF",
  lessItems:["Perfect templates","Corporate theatre","Buzzwords without proof"],
  moreItems:["Things you made","Problems you noticed","Opinions you can defend"],
  formats:"VIDEO · REPO · NOTION · PDF · VOICE NOTE · SOMETHING ELSE",
  finalTitle:"Different minds build a brighter tomorrow.",
  finalBody:"If there is something you think ALVOREM should build, improve or question, that is already a better start than a conventional cover letter.",
  email:"Open your email",
 },
 ro:{
  eyebrow:"CARIERE, ÎNTR-UN FEL.",
  title:"Te rugăm să nu ne trimiți un CV normal.",
  intro:"Spune-ne ce ai construit, stricat, învățat, ce te-a obsedat sau ce ai încercat fără să îți ceară nimeni. Un video, un repo, un voice note, o pagină Notion sau ceva la care noi nici nu ne-am gândit.",
  cta:"Trimite varianta ciudată",
  note:"NU E NICIUN ROL DESCHIS? TRIMITE ORICUM.",
  valuesEyebrow:"CE CONTEAZĂ PENTRU NOI",
  valuesTitle:"Caracter înaintea teatrului corporate.",
  values:[
   ["Curiozitate","Continui să pui întrebări mai bune după răspunsul evident."],
   ["Caracter","Felul în care lucrezi cu oamenii contează la fel de mult ca ce poți construi."],
   ["Meșteșug","Îți pasă să faci lucruri utile bine, chiar dacă nu te notează nimeni."],
   ["Curaj","Poți contrazice o idee, admite că ai greșit și încerca din nou."],
   ["Bunătate","Inteligența fără grijă față de oameni nu este cultura pe care vrem să o construim."],
  ],
  anti:"ANTI-APLICAȚIA",
  antiTitle:"Arată-ne cum gândești.",
  less:"MAI PUȚIN",more:"MAI MULT",
  lessItems:["Template-uri perfecte","Teatru corporate","Buzzwords fără dovadă"],
  moreItems:["Lucruri pe care le-ai făcut","Probleme pe care le-ai observat","Opinii pe care le poți susține"],
  formats:"VIDEO · REPO · NOTION · PDF · VOICE NOTE · ALTCEVA",
  finalTitle:"Minți diferite construiesc un mâine mai luminos.",
  finalBody:"Dacă există ceva ce crezi că ALVOREM ar trebui să construiască, să îmbunătățească sau să pună sub semnul întrebării, este deja un început mai bun decât o scrisoare de intenție convențională.",
  email:"Deschide email-ul",
 }
} as const;

export function CareersContent(){
 const {locale}=useLocale(); const t=copy[locale];
 return <>
  <section className={["site-shell",styles.hero].join(" ")} id="main-content">
   <div className={styles.heroCopy}><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p><a className="button button--primary" href={applicationHref}>{t.cta}<ArrowIcon/></a><small>{t.note}</small></div>
   <div className={styles.artifacts} aria-hidden="true"><span>VIDEO</span><span>&lt;/&gt; REPO</span><span>VOICE NOTE</span><span>NOTION</span><span>PDF?</span><i/></div>
  </section>
  <section className={styles.values}><div className="site-shell"><p className="eyebrow">{t.valuesEyebrow}</p><h2>{t.valuesTitle}</h2><div className={styles.valueGrid}>{t.values.map(([title,body],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
  <section className={["site-shell",styles.anti].join(" ")}><p className="eyebrow">{t.anti}</p><h2>{t.antiTitle}</h2><div className={styles.compare}><div><strong>{t.less}</strong>{t.lessItems.map(x=><p key={x}><i>−</i>{x}</p>)}</div><div><strong>{t.more}</strong>{t.moreItems.map(x=><p key={x}><i>+</i>{x}</p>)}</div></div><p className={styles.formats}>{t.formats}</p></section>
  <section className={styles.final}><div className="site-shell"><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><a className="button button--primary" href={applicationHref}>{t.email}<ArrowIcon/></a></div></section>
 </>;
}
