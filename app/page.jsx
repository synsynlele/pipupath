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
    description: "You are a living bridge.",
    traits: ["Empathetic", "Influential", "Magnetic"],
  },
  MAKER: {
    name: "The Maker",
    emoji: "🔨",
    tagline: "Your hands and mind build what didn't exist.",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.15)",
    description: "Creation is your instinct.",
    traits: ["Skilled", "Precise", "Patient"],
  },
  VOICE: {
    name: "The Voice",
    emoji: "🔥",
    tagline: "You make ideas move and people listen.",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.15)",
    description: "Words are your tools.",
    traits: ["Articulate", "Persuasive", "Curious"],
  },
  MERCHANT: {
    name: "The Merchant",
    emoji: "💎",
    tagline: "You see value everywhere others see nothing.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.15)",
    description: "Wealth is your language.",
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
    description: "You care deeply.",
    traits: ["Compassionate", "Driven", "Grounded"],
  },
  PERFORMER: {
    name: "The Performer",
    emoji: "✨",
    tagline: "You create experiences that change people.",
    color: "#F472B6",
    glow: "rgba(244,114,182,0.15)",
    description: "Emotion is your raw material.",
    traits: ["Creative", "Expressive", "Bold"],
  },
};

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
    Object.entries(weights).forEach(([k, v]) => {
      scores[k] += v;
    });
  });

  return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
}

// FIXED ROUTE
async function callAI(prompt) {
  const res = await fetch("/api/path", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  return data;
}

async function generatePath(archetypeKey) {
  const arch = ARCHETYPES[archetypeKey];

  return await callAI(`
Return ONLY JSON:
{
 "path_title":"Specific path title",
 "revelation":"Powerful insight",
 "skill_one":"Main skill",
 "skill_why":"Why it matters",
 "first_move":"Specific move in 48 hours",
 "first_offer":"Value offer in 7 days",
 "trap":"Main trap",
 "challenge":"30 day challenge"
}

Builder Type: ${arch.name}
Description: ${arch.description}
`);
}

async function generateCheckin(archetypeKey, checkin, path) {
  return await callAI(`
Return ONLY JSON:
{
 "acknowledgment":"Specific praise",
 "insight":"What results reveal",
 "adjustment":"Specific weekly adjustment",
 "next_move":"Single next move",
 "momentum":8,
 "momentum_note":"Reason for score"
}

Builder Path: ${path.path_title}
Tried: ${checkin.tried}
Worked: ${checkin.worked}
Stuck: ${checkin.stuck}
`);
}

const CSS = `
body{margin:0}
*{box-sizing:border-box}
.pp{
min-height:100vh;
background:#080400;
color:#F5ECD7;
font-family:Arial,sans-serif;
padding:24px;
display:flex;
justify-content:center;
align-items:center;
}
.pp-wrap{max-width:620px;width:100%}
.pp-logo{font-size:12px;letter-spacing:.35em;color:#F59E0B;margin-bottom:28px}
.pp-h1{font-size:58px;line-height:1.02;margin-bottom:18px}
.pp-h1 em,.pp-h2 em{color:#F59E0B;font-style:italic}
.pp-h2{font-size:40px;line-height:1.1;margin-bottom:16px}
.pp-lead{opacity:.7;line-height:1.6;margin-bottom:26px}
.pp-btn,.pp-btn-outline{
width:100%;
padding:15px;
margin-top:10px;
cursor:pointer;
font-weight:bold;
border:none;
}
.pp-btn{background:#F59E0B;color:#080400}
.pp-btn-outline{background:transparent;color:#F5ECD7;border:1px solid #ffffff18}
.pp-opt{
width:100%;
padding:15px;
margin-bottom:10px;
text-align:left;
background:#ffffff08;
color:#F5ECD7;
border:1px solid #ffffff12;
cursor:pointer;
}
.pp-card{
padding:16px;
background:#ffffff08;
border:1px solid #ffffff12;
margin-bottom:10px;
}
.pp-card-label{
font-size:11px;
opacity:.5;
margin-bottom:7px;
text-transform:uppercase;
letter-spacing:.12em;
}
.pp-input,.pp-textarea{
width:100%;
padding:14px;
margin-bottom:10px;
background:#ffffff08;
border:1px solid #ffffff12;
color:#F5ECD7;
}
.pp-textarea{min-height:90px}
.pp-spin{
width:44px;height:44px;
border:2px solid #ffffff20;
border-top-color:#F59E0B;
border-radius:50%;
animation:spin 1s linear infinite;
margin:auto;
}
@keyframes spin{to{transform:rotate(360deg)}}
`;

export default function PipuPath(){
  const [screen,setScreen]=useState("boot");
  const [qIdx,setQIdx]=useState(0);
  const [answers,setAnswers]=useState([]);
  const [chosen,setChosen]=useState(null);
  const [archKey,setArchKey]=useState(null);
  const [pathData,setPathData]=useState(null);
  const [busy,setBusy]=useState(false);

  const [checkin,setCheckin]=useState({tried:"",worked:"",stuck:""});
  const [checkinRes,setCheckinRes]=useState(null);

  const [email,setEmail]=useState("");
  const [user,setUser]=useState(null);

  const arch = archKey ? ARCHETYPES[archKey] : null;

  useEffect(()=>{
    const u = localStorage.getItem("pp_user");
    const p = localStorage.getItem("pp_profile");

    if(u){
      const parsedUser = JSON.parse(u);
      setUser(parsedUser);

      if(p){
        const parsed = JSON.parse(p);
        setArchKey(parsed.archKey);
        setPathData(parsed.pathData);
        setScreen("returning");
      }else{
        setScreen("questions");
      }
    }else{
      setScreen("login");
    }
  },[]);

  function go(s){ setScreen(s); }

  function login(){
    if(!email.trim()) return;
    const u = {email};
    localStorage.setItem("pp_user",JSON.stringify(u));
    setUser(u);
    go("questions");
  }

  function logout(){
    localStorage.removeItem("pp_user");
    localStorage.removeItem("pp_profile");
    location.reload();
  }

  function pickAnswer(i){
    setChosen(i);

    setTimeout(async ()=>{
      const next=[...answers,i];
      setAnswers(next);
      setChosen(null);

      if(qIdx < QUESTIONS.length-1){
        setQIdx(qIdx+1);
      }else{
        const key = calcArchetype(next);
        setArchKey(key);
        go("generating");

        const result = await generatePath(key);
        setPathData(result);

        localStorage.setItem("pp_profile",JSON.stringify({
          archKey:key,
          pathData:result
        }));

        go("result");
      }
    },250);
  }

  async function submitCheckin(){
    setBusy(true);
    const res = await generateCheckin(archKey,checkin,pathData);
    setCheckinRes(res);
    setBusy(false);
    go("checkin_result");
  }

  const screens = {

    boot:<div className="pp-spin"></div>,

    login:(
      <div>
        <div className="pp-logo">PIPUPATH</div>
        <h1 className="pp-h1">Start your<br/><em>builder journey.</em></h1>
        <p className="pp-lead">Enter your email to begin.</p>
        <input className="pp-input" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="pp-btn" onClick={login}>Continue →</button>
      </div>
    ),

    questions:user && (
      <div>
        <div className="pp-logo">PIPUPATH</div>
        <div style={{marginBottom:"16px",opacity:.5}}>Question {qIdx+1} of {QUESTIONS.length}</div>
        <h2 className="pp-h2">{QUESTIONS[qIdx].q}</h2>

        {QUESTIONS[qIdx].options.map((o,i)=>(
          <button key={i} className="pp-opt" onClick={()=>pickAnswer(i)}>
            {o.text}
          </button>
        ))}
      </div>
    ),

    generating:(
      <div style={{textAlign:"center"}}>
        <div className="pp-spin"></div>
        <p style={{marginTop:"20px"}}>Mapping your builder path...</p>
      </div>
    ),

    result:arch && (
      <div>
        <div className="pp-logo">{user?.email}</div>
        <h2 className="pp-h2">{pathData?.path_title || arch.name}</h2>

        <div className="pp-card"><div className="pp-card-label">Revelation</div>{pathData?.revelation}</div>
        <div className="pp-card"><div className="pp-card-label">Skill</div>{pathData?.skill_one}</div>
        <div className="pp-card"><div className="pp-card-label">First Move</div>{pathData?.first_move}</div>
        <div className="pp-card"><div className="pp-card-label">Offer</div>{pathData?.first_offer}</div>
        <div className="pp-card"><div className="pp-card-label">Trap</div>{pathData?.trap}</div>
        <div className="pp-card"><div className="pp-card-label">Challenge</div>{pathData?.challenge}</div>

        <button className="pp-btn" onClick={()=>go("checkin")}>Check In Progress →</button>
        <button className="pp-btn-outline" onClick={logout}>Logout</button>
      </div>
    ),

    checkin:(
      <div>
        <div className="pp-logo">PIPUPATH</div>
        <h2 className="pp-h2">Your<br/><em>Adjustment</em></h2>

        <textarea className="pp-textarea" placeholder="What did you try?" value={checkin.tried} onChange={e=>setCheckin({...checkin,tried:e.target.value})}/>
        <textarea className="pp-textarea" placeholder="What worked?" value={checkin.worked} onChange={e=>setCheckin({...checkin,worked:e.target.value})}/>
        <textarea className="pp-textarea" placeholder="Where are you stuck?" value={checkin.stuck} onChange={e=>setCheckin({...checkin,stuck:e.target.value})}/>

        <button className="pp-btn" onClick={submitCheckin}>
          {busy ? "Analyzing..." : "Get My Adjustment →"}
        </button>
      </div>
    ),

    checkin_result:(
      <div>
        <div className="pp-logo">PIPUPATH</div>
        <h2 className="pp-h2">Your<br/><em>Adjustment</em></h2>

        <div className="pp-card"><div className="pp-card-label">Acknowledgment</div>{checkinRes?.acknowledgment}</div>
        <div className="pp-card"><div className="pp-card-label">Insight</div>{checkinRes?.insight}</div>
        <div className="pp-card"><div className="pp-card-label">Adjustment</div>{checkinRes?.adjustment}</div>
        <div className="pp-card"><div className="pp-card-label">Next Move</div>{checkinRes?.next_move}</div>
        <div className="pp-card"><div className="pp-card-label">Momentum</div>{checkinRes?.momentum}/10</div>

        <button className="pp-btn" onClick={()=>go("result")}>Back To My Path →</button>
      </div>
    ),

    returning:(
      <div>
        <div className="pp-logo">{user?.email}</div>
        <h2 className="pp-h2">Welcome back,<br/><em>{pathData?.path_title}</em></h2>

        <button className="pp-btn" onClick={()=>go("result")}>View My Path</button>
        <button className="pp-btn-outline" onClick={()=>go("checkin")}>Check In Progress</button>
        <button className="pp-btn-outline" onClick={logout}>Logout</button>
      </div>
    )
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="pp">
        <div className="pp-wrap">
          {screens[screen]}
        </div>
      </div>
    </>
  );
}