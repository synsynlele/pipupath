'use client';

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// 8 UNIVERSAL BUILDER ARCHETYPES
// ─────────────────────────────────────────────
const ARCHETYPES = {
  SOLVER: {
    name: "The Solver",
    emoji: "⚡",
    tagline: "You fix what others walk past.",
    color: "#F97316",
    glow: "rgba(249,115,22,0.15)",
    description: "Problems don't frustrate you — they fuel you.",
    traits: ["Analytical", "Relentless", "Resourceful"],
  },
  CONNECTOR: {
    name: "The Connector",
    emoji: "🌐",
    tagline: "People and ideas find their home through you.",
    color: "#10B981",
    glow: "rgba(16,185,129,0.15)",
    description: "You build networks and trust.",
    traits: ["Empathetic", "Influential", "Magnetic"],
  },
  MAKER: {
    name: "The Maker",
    emoji: "🔨",
    tagline: "Your hands and mind build what didn't exist.",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.15)",
    description: "You create what wasn't there.",
    traits: ["Skilled", "Precise", "Patient"],
  },
  VOICE: {
    name: "The Voice",
    emoji: "🔥",
    tagline: "You make ideas move and people listen.",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.15)",
    description: "Words are your leverage.",
    traits: ["Articulate", "Persuasive", "Curious"],
  },
  MERCHANT: {
    name: "The Merchant",
    emoji: "💎",
    tagline: "You see value everywhere others see nothing.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.15)",
    description: "You understand opportunity.",
    traits: ["Sharp", "Bold", "Strategic"],
  },
  ARCHITECT: {
    name: "The Architect",
    emoji: "🏛️",
    tagline: "You design systems before others see the need.",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.15)",
    description: "You think in systems.",
    traits: ["Strategic", "Visionary", "Disciplined"],
  },
  HEALER: {
    name: "The Healer",
    emoji: "🌱",
    tagline: "You build to reduce human pain.",
    color: "#4ADE80",
    glow: "rgba(74,222,128,0.15)",
    description: "You help people thrive.",
    traits: ["Compassionate", "Driven", "Grounded"],
  },
  PERFORMER: {
    name: "The Performer",
    emoji: "✨",
    tagline: "You create experiences that change people.",
    color: "#F472B6",
    glow: "rgba(244,114,182,0.15)",
    description: "You move culture through expression.",
    traits: ["Creative", "Expressive", "Bold"],
  },
};

// QUESTIONS KEPT EXACTLY
const QUESTIONS = [
  {
    q: "When you see something broken or missing in the world, your first instinct is:",
    options: [
      { text: "Break it apart and fix it yourself", w: { SOLVER: 3, ARCHITECT: 1 } },
      { text: "Find others who care about it too", w: { CONNECTOR: 3, HEALER: 1 } },
      { text: "Build something that solves it permanently", w: { MAKER: 3, SOLVER: 1 } },
      { text: "Talk or write about it until people pay attention", w: { VOICE: 3, PERFORMER: 1 } },
    ],
  },
  {
    q: "What kind of work makes you lose track of time?",
    options: [
      { text: "Creating or crafting something from nothing", w: { MAKER: 3, PERFORMER: 1 } },
      { text: "Deep conversations and building relationships", w: { CONNECTOR: 3, HEALER: 1 } },
      { text: "Spotting an opportunity and making it real", w: { MERCHANT: 3, SOLVER: 1 } },
      { text: "Teaching, explaining, helping someone understand", w: { VOICE: 3, HEALER: 1 } },
    ],
  },
  {
    q: "What frustrates you most about the world right now?",
    options: [
      { text: "Things are broken and inefficient when they don't need to be", w: { SOLVER: 3, ARCHITECT: 2 } },
      { text: "People are isolated with no support or community", w: { HEALER: 3, CONNECTOR: 2 } },
      { text: "Good talent and ideas die without direction", w: { ARCHITECT: 2, MERCHANT: 2 } },
      { text: "Important truths are not being told or heard", w: { VOICE: 3, PERFORMER: 2 } },
    ],
  },
  {
    q: "In 10 years, what does your greatest impact look like?",
    options: [
      { text: "A product or system millions of people depend on", w: { SOLVER: 2, MAKER: 2, ARCHITECT: 2 } },
      { text: "A movement or community that changed lives together", w: { CONNECTOR: 3, HEALER: 2 } },
      { text: "A business that generates real wealth and employs people", w: { MERCHANT: 3, ARCHITECT: 1 } },
      { text: "Work — art, ideas, stories — that changed how people think", w: { VOICE: 2, PERFORMER: 3 } },
    ],
  },
  {
    q: "When you imagine yourself at your absolute best, you are:",
    options: [
      { text: "Deep in a hard problem, finally cracking it", w: { SOLVER: 3, MAKER: 1 } },
      { text: "In a room of people who trust and follow your lead", w: { CONNECTOR: 2, ARCHITECT: 1, MERCHANT: 1 } },
      { text: "Creating something with total focus and flow", w: { MAKER: 3, PERFORMER: 2 } },
      { text: "Sitting with someone who needs help — and actually helping", w: { HEALER: 3, VOICE: 1 } },
    ],
  },
];

function calcArchetype(answers) {
  const scores = {};
  Object.keys(ARCHETYPES).forEach(k => scores[k] = 0);

  answers.forEach((optIdx, qIdx) => {
    const weights = QUESTIONS[qIdx].options[optIdx].w;
    Object.entries(weights).forEach(([k,v]) => scores[k]+=v);
  });

  return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
}

async function callAI(prompt){
  const res = await fetch("/api/generate",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ prompt })
  });

  const data = await res.json();

  if(!res.ok) throw new Error(data.error || "Failed");

  return data.result;
}

export default function Page(){
  const [screen,setScreen]=useState("welcome");
  const [qIdx,setQIdx]=useState(0);
  const [answers,setAnswers]=useState([]);
  const [archKey,setArchKey]=useState(null);
  const [pathData,setPathData]=useState(null);

  useEffect(()=>{
    const saved = localStorage.getItem("pp_profile");
    if(saved){
      try{
        const parsed = JSON.parse(saved);
        setArchKey(parsed.archKey);
        setPathData(parsed.pathData);
        setScreen("result");
      }catch{}
    }
  },[]);

  async function pickAnswer(i){
    const next=[...answers,i];
    setAnswers(next);

    if(qIdx < QUESTIONS.length-1){
      setQIdx(qIdx+1);
      return;
    }

    const key = calcArchetype(next);
    setArchKey(key);
    setScreen("loading");

    try{
      const result = await callAI("Generate JSON builder report.");
      setPathData(result);
      localStorage.setItem("pp_profile", JSON.stringify({
        archKey:key,
        pathData:result
      }));
    }catch{
      setPathData({
        path_title:"Your Builder Path",
        revelation:"You have clear potential that grows through action.",
        skill_one:"Consistency",
        skill_why:"Repeated action compounds.",
        first_move:"Take one bold practical step in 48 hours.",
        first_offer:"Help one person solve one problem.",
        trap:"Waiting too long.",
        challenge:"30 days of visible progress."
      });
    }

    setScreen("result");
  }

  function reset(){
    localStorage.removeItem("pp_profile");
    setAnswers([]);
    setQIdx(0);
    setArchKey(null);
    setPathData(null);
    setScreen("welcome");
  }

  const arch = archKey ? ARCHETYPES[archKey] : null;

  return (
    <div style={{
      minHeight:"100vh",
      background:"#080400",
      color:"#F5ECD7",
      padding:"30px",
      fontFamily:"Arial"
    }}>
      <div style={{maxWidth:"580px",margin:"0 auto"}}>

        {screen==="welcome" && <>
          <h1>Discover your builder path.</h1>
          <button onClick={()=>setScreen("questions")}>Begin Discovery</button>
        </>}

        {screen==="questions" && <>
          <p>Question {qIdx+1} of {QUESTIONS.length}</p>
          <h2>{QUESTIONS[qIdx].q}</h2>
          {QUESTIONS[qIdx].options.map((opt,i)=>(
            <button key={i} onClick={()=>pickAnswer(i)} style={{display:"block",marginTop:"10px"}}>
              {opt.text}
            </button>
          ))}
        </>}

        {screen==="loading" && <h2>Mapping your builder path...</h2>}

        {screen==="result" && arch && pathData && <>
          <h2>{arch.emoji} {arch.name}</h2>
          <h3>{pathData.path_title}</h3>
          <p>{pathData.revelation}</p>
          <p><strong>Skill:</strong> {pathData.skill_one}</p>
          <p>{pathData.skill_why}</p>
          <p><strong>Move:</strong> {pathData.first_move}</p>
          <p><strong>Offer:</strong> {pathData.first_offer}</p>
          <p><strong>Trap:</strong> {pathData.trap}</p>
          <p><strong>Challenge:</strong> {pathData.challenge}</p>
          <button onClick={reset}>Start Again</button>
        </>}

      </div>
    </div>
  );
}