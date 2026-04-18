'use client';

import { useEffect, useState } from "react";

/* =========================
   PREMIUM ARCHETYPES
========================= */
const ARCHETYPES = {
  SOLVER:{
    name:"The Solver",emoji:"⚡",tagline:"You fix what others walk past.",
    color:"#F97316",glow:"rgba(249,115,22,.15)",
    description:"Problems fuel you. You naturally diagnose friction and move toward resolution.",
    traits:["Analytical","Relentless","Resourceful"]
  },
  CONNECTOR:{
    name:"The Connector",emoji:"🌐",tagline:"People and ideas find their home through you.",
    color:"#10B981",glow:"rgba(16,185,129,.15)",
    description:"You create leverage through trust, relationships and alignment.",
    traits:["Empathetic","Influential","Magnetic"]
  },
  MAKER:{
    name:"The Maker",emoji:"🔨",tagline:"Your hands and mind build what did not exist.",
    color:"#A78BFA",glow:"rgba(167,139,250,.15)",
    description:"Creation is not optional for you. You feel alive when building.",
    traits:["Skilled","Precise","Patient"]
  },
  VOICE:{
    name:"The Voice",emoji:"🔥",tagline:"You make ideas move and people listen.",
    color:"#FBBF24",glow:"rgba(251,191,36,.15)",
    description:"Communication is your force multiplier.",
    traits:["Articulate","Persuasive","Curious"]
  },
  MERCHANT:{
    name:"The Merchant",emoji:"💎",tagline:"You see value where others see nothing.",
    color:"#F59E0B",glow:"rgba(245,158,11,.15)",
    description:"You understand opportunity, exchange and momentum.",
    traits:["Sharp","Bold","Strategic"]
  },
  ARCHITECT:{
    name:"The Architect",emoji:"🏛️",tagline:"You design systems before others see the need.",
    color:"#38BDF8",glow:"rgba(56,189,248,.15)",
    description:"You think in systems, frameworks and scale.",
    traits:["Strategic","Visionary","Disciplined"]
  },
  HEALER:{
    name:"The Healer",emoji:"🌱",tagline:"You build to reduce human pain.",
    color:"#4ADE80",glow:"rgba(74,222,128,.15)",
    description:"You are moved by human need and compelled to help.",
    traits:["Compassionate","Driven","Grounded"]
  },
  PERFORMER:{
    name:"The Performer",emoji:"✨",tagline:"You create experiences that change people.",
    color:"#F472B6",glow:"rgba(244,114,182,.15)",
    description:"Emotion, culture and expression are your tools.",
    traits:["Creative","Expressive","Bold"]
  }
};

/* =========================
   PREMIUM QUESTIONS
========================= */
const QUESTIONS = [
{
q:"When you see something broken or missing in the world, your first instinct is:",
options:[
{text:"Break it apart and fix it yourself",w:{SOLVER:3,ARCHITECT:1}},
{text:"Find others who care about it too",w:{CONNECTOR:3,HEALER:1}},
{text:"Build something that solves it permanently",w:{MAKER:3,SOLVER:1}},
{text:"Talk or write about it until people pay attention",w:{VOICE:3,PERFORMER:1}}
]},
{
q:"What kind of work makes you lose track of time?",
options:[
{text:"Creating or crafting something from nothing",w:{MAKER:3,PERFORMER:1}},
{text:"Deep conversations and building relationships",w:{CONNECTOR:3,HEALER:1}},
{text:"Spotting an opportunity and making it real",w:{MERCHANT:3,SOLVER:1}},
{text:"Teaching, explaining, helping someone understand",w:{VOICE:3,HEALER:1}}
]},
{
q:"What frustrates you most about the world right now?",
options:[
{text:"Things are broken and inefficient when they don't need to be",w:{SOLVER:3,ARCHITECT:2}},
{text:"People are isolated with no support or community",w:{HEALER:3,CONNECTOR:2}},
{text:"Good talent and ideas die without direction",w:{ARCHITECT:2,MERCHANT:2}},
{text:"Important truths are not being told or heard",w:{VOICE:3,PERFORMER:2}}
]},
{
q:"In 10 years, what does your greatest impact look like?",
options:[
{text:"A product or system millions of people depend on",w:{SOLVER:2,MAKER:2,ARCHITECT:2}},
{text:"A movement or community that changed lives together",w:{CONNECTOR:3,HEALER:2}},
{text:"A business that generates real wealth and employs people",w:{MERCHANT:3,ARCHITECT:1}},
{text:"Work — art, ideas, stories — that changed how people think",w:{VOICE:2,PERFORMER:3}}
]},
{
q:"When you imagine yourself at your absolute best, you are:",
options:[
{text:"Deep in a hard problem, finally cracking it",w:{SOLVER:3,MAKER:1}},
{text:"In a room of people who trust and follow your lead",w:{CONNECTOR:2,ARCHITECT:1,MERCHANT:1}},
{text:"Creating something with total focus and flow",w:{MAKER:3,PERFORMER:2}},
{text:"Sitting with someone who needs help — and actually helping",w:{HEALER:3,VOICE:1}}
]}
];

function calcArchetype(answers){
 const scores={};
 Object.keys(ARCHETYPES).forEach(k=>scores[k]=0);
 answers.forEach((opt,qIdx)=>{
   const weights=QUESTIONS[qIdx].options[opt].w;
   Object.entries(weights).forEach(([k,v])=>scores[k]+=v);
 });
 return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
}

/* =========================
   AI
========================= */
async function callAI(prompt){
 const res=await fetch("/api/path",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({prompt})
 });
 return await res.json();
}

async function generatePath(key,answers){
 const arch=ARCHETYPES[key];

 const summary=answers.map((a,i)=>`Q${i+1}: ${QUESTIONS[i].options[a].text}`).join("\n");

 return await callAI(`
Return ONLY valid JSON.

{
"path_title":"",
"revelation":"",
"skill_one":"",
"skill_why":"",
"wealth_path":"",
"career_path":"",
"first_move":"",
"first_offer":"",
"trap":"",
"challenge":""
}

You are the greatest elite coach and strategist in the world, with brutal honesty and high standards.

Builder Type: ${arch.name}
Tagline: ${arch.tagline}
Description: ${arch.description}

User answers:
${summary}

Rules:
- Answer like you are speeaking to a youth
- No clichés
- No generic advice
- Be specific
- Be very detailed
- Use simple language
- High leverage
- Modern
- Premium
- Feels personal
`);
}

async function generateCheckin(checkin,path){
 return await callAI(`
Return ONLY valid JSON.

{
"acknowledgment":"",
"insight":"",
"adjustment":"",
"next_move":"",
"momentum":8,
"momentum_note":"",
}

You are the greatest elite execution coach in the world.

Builder Path: ${path.path_title}

Tried:${checkin.tried}
Worked:${checkin.worked}
Stuck:${checkin.stuck}

Rules:
- Diagnose sharply
- No fluff
- Practical
- Be very detailed
- Answer like you are speeaking to a youth
- Use simple language
- High leverage
`);
}

/* =========================
   STYLE
========================= */
const CSS=`
body{margin:0}
*{box-sizing:border-box}
.pp{
min-height:100vh;
background:linear-gradient(180deg,#050300,#0c0903);
color:#F7E8C5;
font-family:Arial,sans-serif;
padding:28px;
display:flex;
justify-content:center;
align-items:center
}
.pp-wrap{max-width:680px;width:100%}
.pp-logo{font-size:12px;letter-spacing:.42em;color:#D4A43B;margin-bottom:24px}
.pp-h1{font-size:56px;line-height:1.02;margin:0 0 16px}
.pp-h2{font-size:40px;line-height:1.08;margin:0 0 16px}
.pp-h1 em,.pp-h2 em{font-style:italic;color:#D4A43B}
.pp-btn,.pp-btn-outline{
width:100%;padding:16px;margin-top:12px;border-radius:16px;
font-weight:700;cursor:pointer;font-size:15px
}
.pp-btn{background:#D4A43B;color:#111;border:none}
.pp-btn-outline{
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.09);
color:#F7E8C5
}
.pp-opt,.pp-input,.pp-textarea{
width:100%;padding:16px;margin-top:10px;border-radius:16px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
color:#F7E8C5;font-size:15px
}
.pp-opt{text-align:left;cursor:pointer}
.pp-card{
padding:18px;border-radius:18px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
margin-top:12px
}
.pp-label{
font-size:11px;opacity:.6;letter-spacing:.14em;
text-transform:uppercase;margin-bottom:8px
}
.pp-traits{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
.pp-trait{
padding:6px 10px;border-radius:999px;
background:rgba(255,255,255,.04);
font-size:12px
}
.pp-spin{
width:46px;height:46px;margin:auto;
border:2px solid rgba(255,255,255,.1);
border-top-color:#D4A43B;border-radius:50%;
animation:spin 1s linear infinite
}
@keyframes spin{to{transform:rotate(360deg)}}
`;

export default function PipuPath(){
 const [screen,setScreen]=useState("boot");
 const [email,setEmail]=useState("");
 const [user,setUser]=useState(null);
 const [qIdx,setQIdx]=useState(0);
 const [answers,setAnswers]=useState([]);
 const [archKey,setArchKey]=useState(null);
 const [pathData,setPathData]=useState(null);
 const [busy,setBusy]=useState(false);
 const [checkin,setCheckin]=useState({tried:"",worked:"",stuck:""});
 const [checkinRes,setCheckinRes]=useState(null);

 useEffect(()=>{
   const u=localStorage.getItem("pp_user");
   const p=localStorage.getItem("pp_profile");

   if(u){
     setUser(JSON.parse(u));
     if(p){
       const saved=JSON.parse(p);
       setArchKey(saved.archKey);
       setPathData(saved.pathData);
       setScreen("returning");
     }else{
       setScreen("questions");
     }
   }else{
     setScreen("login");
   }
 },[]);

 function login(){
   if(!email.trim()) return;
   const u={email};
   localStorage.setItem("pp_user",JSON.stringify(u));
   setUser(u);

   const p=localStorage.getItem("pp_profile");
   if(p){
     const saved=JSON.parse(p);
     setArchKey(saved.archKey);
     setPathData(saved.pathData);
     setScreen("returning");
   }else{
     setScreen("questions");
   }
 }

 function logout(){
   localStorage.removeItem("pp_user");
   location.reload();
 }

 function retake(){
   setAnswers([]);
   setQIdx(0);
   setScreen("questions");
 }

 function share(){
   const title=pathData?.path_title || "My Builder Path";
   window.open(
    `https://wa.me/?text=${encodeURIComponent("I discovered my Builder Path on PipuPath: "+title)}`,
    "_blank"
   );
 }

 function downloadPDF(){window.print();}

 async function pickAnswer(i){
   const next=[...answers,i];
   setAnswers(next);

   if(qIdx<QUESTIONS.length-1){
     setQIdx(qIdx+1);
     return;
   }

   const key=calcArchetype(next);
   setArchKey(key);
   setScreen("generating");

   const result=await generatePath(key,next);
   setPathData(result);

   localStorage.setItem("pp_profile",JSON.stringify({
     archKey:key,
     pathData:result
   }));

   setScreen("result");
 }

 async function submitCheckin(){
   setBusy(true);
   const res=await generateCheckin(checkin,pathData);
   setCheckinRes(res);
   setBusy(false);
   setScreen("checkin_result");
 }

 const arch=ARCHETYPES[archKey] || {};

 const screens={

 boot:<div className="pp-spin"></div>,

 login:<div>
   <div className="pp-logo">PIPUPATH</div>
   <h1 className="pp-h1">Discover your<br/><em>builder path.</em></h1>
   <input
    className="pp-input"
    value={email}
    onChange={e=>setEmail(e.target.value)}
    placeholder="you@email.com"
   />
   <button className="pp-btn" onClick={login}>Continue →</button>
 </div>,

 questions:<div>
   <div className="pp-logo">PIPUPATH</div>
   <div style={{opacity:.65}}>Question {qIdx+1} of {QUESTIONS.length}</div>
   <h2 className="pp-h2">{QUESTIONS[qIdx].q}</h2>

   {QUESTIONS[qIdx].options.map((o,i)=>(
    <button key={i} className="pp-opt" onClick={()=>pickAnswer(i)}>
      {o.text}
    </button>
   ))}
 </div>,

 generating:<div style={{textAlign:"center"}}>
   <div className="pp-spin"></div>
   <p style={{marginTop:18}}>Mapping your elite path...</p>
 </div>,

 result:<div>
   <div className="pp-logo">{user?.email}</div>

   <h2 className="pp-h2">
     {arch.emoji} {arch.name}
   </h2>

   <div className="pp-traits">
     {arch.traits?.map(t=><span key={t} className="pp-trait">{t}</span>)}
   </div>

   <div className="pp-card" style={{borderColor:arch.color}}>
     <div className="pp-label">Path Title</div>
     {pathData?.path_title}
   </div>

   <div className="pp-card">
     <div className="pp-label">Revelation</div>
     {pathData?.revelation}
   </div>

   <div className="pp-card">
     <div className="pp-label">Skill To Build First</div>
     <strong>{pathData?.skill_one}</strong><br/>
     <small>{pathData?.skill_why}</small>
   </div>

   <div className="pp-card">
     <div className="pp-label">Wealth Path</div>
     {pathData?.wealth_path}
   </div>
   
   <div className="pp-card">
     <div className="pp-label">Career Path</div>
     {pathData?.career_path}
   </div>

   <div className="pp-card">
     <div className="pp-label">First Move</div>
     {pathData?.first_move}
   </div>

   <div className="pp-card">
     <div className="pp-label">First Offer</div>
     {pathData?.first_offer}
   </div>

   <div className="pp-card">
     <div className="pp-label">Trap</div>
     {pathData?.trap}
   </div>

   <div className="pp-card">
     <div className="pp-label">Challenge</div>
     {pathData?.challenge}
   </div>

   <button className="pp-btn" onClick={()=>setScreen("returning")}>
     Dashboard →
   </button>

   <button className="pp-btn-outline" onClick={()=>setScreen("checkin")}>
     Weekly Check-In
   </button>

   <button className="pp-btn-outline" onClick={retake}>
     Retake Questions
   </button>

   <button className="pp-btn-outline" onClick={share}>
     Share
   </button>

   <button className="pp-btn-outline" onClick={downloadPDF}>
     Download
   </button>
 </div>,

 returning:<div>
   <div className="pp-logo">{user?.email}</div>

   <h2 className="pp-h2">
     Welcome back,<br/><em>{pathData?.path_title}</em>
   </h2>

   <button className="pp-btn" onClick={()=>setScreen("result")}>
     My Builder Path→
   </button>

   <button className="pp-btn-outline" onClick={()=>setScreen("checkin")}>
     Weekly Check-In
   </button>

   <button className="pp-btn-outline" onClick={retake}>
     Retake Questions
   </button>

   <button className="pp-btn-outline" onClick={share}>
     Share
   </button>

   <button className="pp-btn-outline" onClick={logout}>
     Logout
   </button>
 </div>,

 checkin:<div>
   <div className="pp-logo">PIPUPATH</div>
   <h2 className="pp-h2">Weekly <em>Adjustment</em></h2>

   <textarea
    className="pp-textarea"
    placeholder="What did you try?"
    value={checkin.tried}
    onChange={e=>setCheckin({...checkin,tried:e.target.value})}
   />

   <textarea
    className="pp-textarea"
    placeholder="What worked?"
    value={checkin.worked}
    onChange={e=>setCheckin({...checkin,worked:e.target.value})}
   />

   <textarea
    className="pp-textarea"
    placeholder="Where are you stuck?"
    value={checkin.stuck}
    onChange={e=>setCheckin({...checkin,stuck:e.target.value})}
   />

   <button className="pp-btn" onClick={submitCheckin}>
     {busy?"Analyzing...":"Get My Adjustment →"}
   </button>
 </div>,

 checkin_result:<div>
   <div className="pp-logo">PIPUPATH</div>
   <h2 className="pp-h2">Your <em>Adjustment</em></h2>
   
   <div className="pp-card">
     <div className="pp-label">Acknowlegdment</div>
     {checkinRes?.acknowledgement}
   </div>

   <div className="pp-card">
     <div className="pp-label">Insight</div>
     {checkinRes?.insight}
   </div>

   <div className="pp-card">
     <div className="pp-label">Adjustment</div>
     {checkinRes?.adjustment}
   </div>

   <div className="pp-card">
     <div className="pp-label">Next Move</div>
     {checkinRes?.next_move}
   </div>

   <div className="pp-card">
     <div className="pp-label">Momentum</div>
     {checkinRes?.momentum}/10
   </div>

   <div className="pp-card">
     <div className="pp-label">Momentum Note</div>
     {checkinRes?.momentum_note}
   </div>

   <button className="pp-btn" onClick={()=>setScreen("returning")}>
     Dashboard →
   </button>
 </div>

 };

 return(
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