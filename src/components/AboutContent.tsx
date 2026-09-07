"use client";

import Link from "next/link";
import { AgentWordmark } from "@/components/AgentWordmark";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./AboutContent.module.css";

function ArrowIcon(){return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>}

const copy={
  en:{
    eyebrow:"ABOUT ALVOREM",
    title:"Technology should work around people.",
    intro:"ALVOREM is a Christian-driven technology company building private AI to reduce unnecessary business burden and make more room for judgment, relationships, creativity and life.",
    why:"WHY WE EXIST",
    whyTitle:"Make business simpler. Make room for what matters.",
    whyBody:"Business is complicated enough. Important answers are scattered, repetitive work keeps returning and people spend too much time carrying systems instead of being helped by them. We want to reverse that relationship.",
    names:"THE NAMES CARRY THE IDEA",
    namesTitle:"Light. Purpose. Prayer. A new beginning.",
    nameCards:[
      {name:"ALVOREM",cue:"DAWN · A NEW BEGINNING",body:"The company name evokes first light: a clearer beginning and the belief that technology can make tomorrow lighter rather than heavier."},
      {name:"ALVO",cue:"CLARITY · PURPOSE · DIRECTION",body:"Inspired by the Portuguese meanings around alvo — clear or white, and a target or aim. ALVO is the everyday interface that helps turn complexity into clarity."},
      {name:"OREM",cue:"PRAYER · DISCERNMENT · WISDOM",body:"Orem means “pray” in Portuguese. OREM represents the deeper layer: more context, stronger reasoning and the discipline to think carefully when the answer matters."},
    ],
    bridgeStart:"brings clarity.",bridgeEnd:"seeks wisdom.",
    faith:"WHAT DRIVES US",
    faithTitle:"Faith is a foundation, not a marketing device.",
    faithBody:"Our Christian conviction shapes how we think about people, power and responsibility. Technology should serve human dignity. Capability should come with accountability. Growth should never require us to become careless with truth or people.",
    principles:["Serve before sell","Truth over growth","Stewardship over excess","Excellence as character","Mercy and human dignity","Profit with purpose"],
    statement:"We build technology to serve people, not to rule them.",
    studio:"HOW WE BUILD",
    studioTitle:"Close enough to understand. Careful enough to deserve trust.",
    studioBody:"We work with the people closest to the problem, connect only the context that is useful and keep human control visible. ALVO, OREM and the full team are different levels of the same promise: make work lighter without making people smaller.",
    cta:"See the solutions",
  },
  ro:{
    eyebrow:"DESPRE ALVOREM",
    title:"Tehnologia ar trebui să lucreze în jurul oamenilor.",
    intro:"ALVOREM este o companie de tehnologie ghidată de valori creștine, care construiește AI privat pentru a reduce povara inutilă din business și a face mai mult loc pentru judecată, relații, creativitate și viață.",
    why:"DE CE EXISTĂM",
    whyTitle:"Simplifică business-ul. Fă loc pentru ce contează.",
    whyBody:"Business-ul este deja suficient de complicat. Răspunsurile importante sunt împrăștiate, munca repetitivă revine constant, iar oamenii ajung să ducă sistemele în spate în loc să fie ajutați de ele. Vrem să inversăm această relație.",
    names:"NUMELE POARTĂ IDEEA",
    namesTitle:"Lumină. Scop. Rugăciune. Un nou început.",
    nameCards:[
      {name:"ALVOREM",cue:"ZORI · UN NOU ÎNCEPUT",body:"Numele companiei evocă prima lumină: un început mai clar și credința că tehnologia poate face ziua de mâine mai ușoară, nu mai grea."},
      {name:"ALVO",cue:"CLARITATE · SCOP · DIRECȚIE",body:"Inspirat de sensurile portugheze ale lui alvo — clar sau alb, dar și țintă ori scop. ALVO este interfața de zi cu zi care transformă complexitatea în claritate."},
      {name:"OREM",cue:"RUGĂCIUNE · DISCERNĂMÂNT · ÎNȚELEPCIUNE",body:"Orem înseamnă „rugați-vă” în portugheză. OREM reprezintă nivelul profund: mai mult context, raționament mai puternic și disciplina de a gândi atent când răspunsul contează."},
    ],
    bridgeStart:"aduce claritate.",bridgeEnd:"caută înțelepciune.",
    faith:"CE NE CONDUCE",
    faithTitle:"Credința este fundație, nu instrument de marketing.",
    faithBody:"Convingerea noastră creștină influențează modul în care privim oamenii, puterea și responsabilitatea. Tehnologia trebuie să servească demnitatea umană. Capacitatea trebuie însoțită de responsabilitate. Creșterea nu justifică neglijența față de adevăr sau oameni.",
    principles:["Servește înainte să vinzi","Adevăr înaintea creșterii","Administrare responsabilă","Excelență ca trăsătură de caracter","Milă și demnitate umană","Profit cu scop"],
    statement:"Construim tehnologie care să servească oamenii, nu să îi conducă.",
    studio:"CUM CONSTRUIM",
    studioTitle:"Suficient de aproape ca să înțelegem. Suficient de atenți ca să merităm încrederea.",
    studioBody:"Lucrăm cu oamenii cei mai apropiați de problemă, conectăm doar contextul care este util și păstrăm controlul uman vizibil. ALVO, OREM și echipa completă sunt niveluri diferite ale aceleiași promisiuni: muncă mai ușoară fără oameni mai mici.",
    cta:"Vezi soluțiile",
  }
} as const;

export function AboutContent(){
 const {locale}=useLocale(); const t=copy[locale];
 return <>
  <section className={["site-shell",styles.hero].join(" ")} id="main-content">
   <p className="eyebrow">{t.eyebrow}</p><div className={styles.heroGrid}><h1>{t.title}</h1><div><p>{t.intro}</p><Link className="button button--primary" href="/solutions">{t.cta}<ArrowIcon/></Link></div></div>
  </section>
  <section className={styles.why}><div className="site-shell"><p className="eyebrow">{t.why}</p><h2>{t.whyTitle}</h2><p>{t.whyBody}</p></div></section>
  <section className={["site-shell",styles.names].join(" ")} id="names"><p className="eyebrow">{t.names}</p><h2>{t.namesTitle}</h2><div className={styles.nameGrid}>{t.nameCards.map((card,index)=><article key={card.name} className={index===2?styles.oremCard:undefined}>{index===1?<AgentWordmark agent="alvo" size="lg"/>:index===2?<AgentWordmark agent="orem" size="lg"/>:<strong className={styles.alvorem}>ALVOREM</strong>}<small>{card.cue}</small><p>{card.body}</p></article>)}</div><div className={styles.bridge}><AgentWordmark agent="alvo" size="md"/><span>{t.bridgeStart}</span><i/><AgentWordmark agent="orem" size="md"/><span>{t.bridgeEnd}</span></div></section>
  <section className={styles.faith}><div className="site-shell"><div className={styles.faithGrid}><div><p className="eyebrow">{t.faith}</p><h2>{t.faithTitle}</h2><p>{t.faithBody}</p></div><div className={styles.principles}>{t.principles.map((p,i)=><div key={p}><span>{String(i+1).padStart(2,"0")}</span><p>{p}</p></div>)}</div></div><blockquote>{t.statement}</blockquote></div></section>
  <section className={["site-shell",styles.studio].join(" ")}><p className="eyebrow">{t.studio}</p><h2>{t.studioTitle}</h2><p>{t.studioBody}</p><a className="button button--primary" href="mailto:hello@alvorem.ro?subject=Start%20a%20conversation">{locale==="ro"?"Începe o conversație":"Start a conversation"}<ArrowIcon/></a></section>
 </>;
}
