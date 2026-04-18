'use client';

import { useEffect, useState } from "react";

const ARCHETYPES = {
  SOLVER:{name:"The Solver",emoji:"🛠️",tagline:"You attack friction others tolerate.",color:"#F59E0B",glow:"rgba(245,158,11,.18)",description:"You turn broken systems into working realities.",traits:["Decisive","Practical","Resilient"]},
  CONNECTOR:{name:"The Connector",emoji:"🤝",tagline:"You multiply value through people.",color:"#22C55E",glow:"rgba(34,197,94,.18)",description:"You create momentum through trust.",traits:["Social","Warm","Influential"]},
  MAKER:{name:"The Maker",emoji:"⚙️",tagline:"You build what should exist.",color:"#8B5CF6",glow:"rgba(139,92,246,.18)",description:"Creation is your native language.",traits:["Creative","Focused","Inventive"]},
  VOICE:{name:"The Voice",emoji:"🎙️",tagline:"You move minds with ideas.",color:"#EF4444",glow:"rgba(239,68,68,.18)",description:"Words become leverage in your hands.",traits:["Bold","Persuasive","Expressive"]},
  MERCHANT:{name:"The Merchant",emoji:"💰",tagline:"You spot value early.",color:"#10B981",glow:"rgba(16,185,129,.18)",description:"You convert opportunity into income.",traits:["Sharp","Commercial","Alert"]},
  ARCHITECT:{name:"The Architect",emoji:"🏛️",tagline:"You design systems before others see the need.",color:"#38BDF8",glow:"rgba(56,189,248,.18)",description:"You think in scalable systems.",traits:["Strategic","Visionary","Disciplined"]},
  HEALER:{name:"The Healer",emoji:"🌱",tagline:"You build to reduce human pain.",color:"#4ADE80",glow:"rgba(74,222,128,.18)",description:"You care deeply and act usefully.",traits:["Compassionate","Grounded","Driven"]},
  PERFORMER:{name:"The Performer",emoji:"✨",tagline:"You create experiences that move people.",color:"#F472B6",glow:"rgba(244,114,182,.18)",description:"Emotion is your raw material.",traits:["Creative","Expressive","Bold"]}
};

const QUESTIONS = [
{
q:"When you see something broken or missing in the world, your instinct is:",
options:[
{text:"Fix it yourself",w:{SOLVER:3,ARCHITECT:1}},
{text:"Gather people to solve it",w:{CONNECTOR:3,HEALER:1}},
{text:"Build something permanent",w:{MAKER:3,SOLVER:1}},
{text:"Speak until attention comes",w:{VOICE:3,PERFORMER:1}}
]},
{
q:"What kind of work makes you lose track of time?",
options:[
{text:"Creating from nothing",w:{MAKER:3,PERFORMER:1}},
{text:"Deep conversations & relationships",w:{CONNECTOR:3,HEALER:1}},
{text:"Spotting opportunity & acting",w:{MERCHANT:3,SOLVER:1}},
{text:"Teaching or explaining",w:{VOICE:3,HEALER:1}}
]},
{
q:"What frustrates you most right now?",
options:[
{text:"Broken inefficient systems",w:{SOLVER:3,ARCHITECT:2}},
{text:"People unsupported or isolated",w:{HEALER:3,CONNECTOR:2}},
{text:"Good talent wasted",w:{ARCHITECT:2,MERCHANT:2}},
{text:"Important truths unheard",w:{VOICE:3,PERFORMER:2}}
]},
{
q:"In 10 years, your greatest impact looks like:",
options:[
{text:"A system millions use",w:{SOLVER:2,MAKER:2,ARCHITECT:2}},
{text:"A movement changing lives",w:{CONNECTOR:3,HEALER:2}},
{text:"A business creating jobs",w:{MERCHANT:3,ARCHITECT:1}},
{text:"Work that changed minds",w:{VOICE:2,PERFORMER:3}}
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

async function callAI(prompt){
 const res=await fetch("/api/path",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({prompt})
 });
 return await res.json();
}

async function generatePath(key){
 const arch=ARCHETYPES[key];
 return await callAI(`
Return ONLY valid JSON.

{
"path_title":"",
"revelation":"",
"hidden_advantage":"",
"skill_one":"",
"wealth_path":"",
"career_path":"",
"first_move":"",
"first_offer":"",
"enemy_pattern":"",
"mindset_shift":"",
"challenge":""
}

You are a world-class strategist. Brutally honest. High standards.

Builder Type: ${arch.name}
Tagline: ${arch.tagline}
Description: ${arch.description}

Rules:
- No clichés
- No generic advice
- Specific
- Powerful
- Modern
- Feels expensive
- Make user feel seen
`);
}

async function generateCheckin(checkin,path){
 return await callAI(`
Return ONLY valid JSON.

{
"acknowledgment":"",
"diagnosis":"",
"blindspot":"",
"adjustment":"",
"next_move":"",
"momentum":8,
"focus_week":""
}

You are an elite execution coach.

Builder Path: ${path.path_title}
Tried:${checkin.tried}
Worked:${checkin.worked}
Stuck:${checkin.stuck}

Rules:
- Diagnose sharply
- No vague praise
- Give one high leverage move
`);
}

const CSS=`
body{margin:0}
*{box-sizing:border-box}
.pp{min-height:100vh;background:linear-gradient(180deg,#050300,#0c0903);color:#F7E8C5;font-family:Arial,sans-serif;padding:28px;display:flex;justify-content:center;align-items:center}
.pp-wrap{max-width:680px;width:100%}
.pp-logo{font-size:12px;letter-spacing:.42em;color:#D4A43B;margin-bottom:24px}
.pp-h1{font-size:58px;line-height:1.02;margin:0 0 16px}
.pp-h2{font-size:42px;line-height:1.08;margin:0 0 16px}
.pp-h1 em,.pp-h2 em{font-style:italic;color:#D4A43B}
.pp-btn,.pp-btn-outline{width:100%;padding:16px;margin-top:12px;border-radius:16px;font-weight:700;cursor:pointer}
.pp-btn{background:#D4A43B;color:#111;border:none}
.pp-btn-outline{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.09);color:#F7E8C5}
.pp-input,.pp-textarea,.pp-opt{width:100%;padding:16px;margin-top:10px;border-radius:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:#F7E8C5}
.pp-opt{text-align:left;cursor:pointer}
.pp-card{padding:18px;border-radius:18px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);margin-top:12px}
.pp-label{font-size:11px;opacity:.6;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px}
.pp-spin{width:46px;height:46px;border:2px solid rgba(255,255,255,.1);border-top-color:#D4A43B;border-radius:50%;animation:spin 1s linear infinite;margin:auto}
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
     } else setScreen("questions");
   } else setScreen("login");
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
   } else setScreen("questions");
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
   window.open(`https://wa.me/?text=${encodeURIComponent("I discovered my Builder Path on PipuPath: "+title)}`,"_blank");
 }

 function downloadPDF(){ window.print(); }

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

   const result=await generatePath(key);
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
   <h1 className="pp-h1">Find your<br/><em>builder path.</em></h1>
   <input className="pp-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/>
   <button className="pp-btn" onClick={login}>Continue →</button>
 </div>,

 questions:<div>
   <div className="pp-logo">PIPUPATH</div>
   <div style={{opacity:.65}}>Question {qIdx+1} of {QUESTIONS.length}</div>
   <h2 className="pp-h2">{QUESTIONS[qIdx].q}</h2>
   {QUESTIONS[qIdx].options.map((o,i)=>(
     <button key={i} className="pp-opt" onClick={()=>pickAnswer(i)}>{o.text}</button>
   ))}
 </div>,

 generating:<div style={{textAlign:"center"}}>
   <div className="pp-spin"></div>
   <p style={{marginTop:18}}>Mapping your elite path...</p>
 </div>,

 result:<div>
   <div className="pp-logo">{user?.email}</div>
   <h2 className="pp-h2">{arch.emoji} {arch.name}</h2>

   <div className="pp-card" style={{borderColor:arch.color,boxShadow:`0 0 0 1px ${arch.color} inset,0 0 40px ${arch.glow}`}}>
     <div className="pp-label">Path Title</div>
     {pathData?.path_title}
   </div>

   <div className="pp-card"><div className="pp-label">Revelation</div>{pathData?.revelation}</div>
   <div className="pp-card"><div className="pp-label">First Move</div>{pathData?.first_move}</div>

   <button className="pp-btn" onClick={()=>setScreen("returning")}>Dashboard →</button>
   <button className="pp-btn-outline" onClick={()=>setScreen("checkin")}>Weekly Check-In</button>
   <button className="pp-btn-outline" onClick={retake}>Retake Questions</button>
   <button className="pp-btn-outline" onClick={share}>Share</button>
   <button className="pp-btn-outline" onClick={downloadPDF}>Download</button>
 </div>,

 returning:<div>
   <div className="pp-logo">{user?.email}</div>
   <h2 className="pp-h2">Welcome back,<br/><em>{pathData?.path_title}</em></h2>
   <button className="pp-btn" onClick={()=>setScreen("result")}>Open Dashboard →</button>
   <button className="pp-btn-outline" onClick={()=>setScreen("checkin")}>Weekly Check-In</button>
   <button className="pp-btn-outline" onClick={retake}>Retake Questions</button>
   <button className="pp-btn-outline" onClick={share}>Share</button>
   <button className="pp-btn-outline" onClick={logout}>Logout</button>
 </div>,

 checkin:<div>
   <div className="pp-logo">PIPUPATH</div>
   <h2 className="pp-h2">Weekly <em>Adjustment</em></h2>
   <textarea className="pp-textarea" placeholder="What did you try?" value={checkin.tried} onChange={e=>setCheckin({...checkin,tried:e.target.value})}/>
   <textarea className="pp-textarea" placeholder="What worked?" value={checkin.worked} onChange={e=>setCheckin({...checkin,worked:e.target.value})}/>
   <textarea className="pp-textarea" placeholder="Where are you stuck?" value={checkin.stuck} onChange={e=>setCheckin({...checkin,stuck:e.target.value})}/>
   <button className="pp-btn" onClick={submitCheckin}>{busy?"Analyzing...":"Get My Adjustment →"}</button>
 </div>,

 checkin_result:<div>
   <div className="pp-logo">PIPUPATH</div>
   <h2 className="pp-h2">Your <em>Adjustment</em></h2>
   <div className="pp-card">{checkinRes?.diagnosis}</div>
   <div className="pp-card">{checkinRes?.next_move}</div>
   <button className="pp-btn" onClick={()=>setScreen("returning")}>Dashboard →</button>
 </div>
 };

 return(
 <>
 <style>{CSS}</style>
 <div className="pp">
   <div className="pp-wrap">{screens[screen]}</div>
 </div>
 </>
 );
}