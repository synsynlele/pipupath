'use client';

import { useState, useEffect } from "react";

// Keep your existing ARCHETYPES exactly as before
const ARCHETYPES = {
  SOLVER:{name:"The Solver",emoji:"⚡",tagline:"You fix what others walk past.",color:"#F97316",glow:"rgba(249,115,22,0.15)",description:"Problems don't frustrate you — they fuel you.",traits:["Analytical","Relentless","Resourceful"]},
  CONNECTOR:{name:"The Connector",emoji:"🌐",tagline:"People and ideas find their home through you.",color:"#10B981",glow:"rgba(16,185,129,0.15)",description:"You are a living bridge.",traits:["Empathetic","Influential","Magnetic"]},
  MAKER:{name:"The Maker",emoji:"🔨",tagline:"Your hands and mind build what didn't exist.",color:"#A78BFA",glow:"rgba(167,139,250,0.15)",description:"Creation is your instinct.",traits:["Skilled","Precise","Patient"]},
  VOICE:{name:"The Voice",emoji:"🔥",tagline:"You make ideas move and people listen.",color:"#FBBF24",glow:"rgba(251,191,36,0.15)",description:"Words are your tools.",traits:["Articulate","Persuasive","Curious"]},
  MERCHANT:{name:"The Merchant",emoji:"💎",tagline:"You see value everywhere.",color:"#F59E0B",glow:"rgba(245,158,11,0.15)",description:"You understand value flows.",traits:["Sharp","Bold","Strategic"]},
  ARCHITECT:{name:"The Architect",emoji:"🏛️",tagline:"You design systems.",color:"#38BDF8",glow:"rgba(56,189,248,0.15)",description:"You think in frameworks.",traits:["Strategic","Visionary","Disciplined"]},
  HEALER:{name:"The Healer",emoji:"🌱",tagline:"You build to reduce pain.",color:"#4ADE80",glow:"rgba(74,222,128,0.15)",description:"You care deeply.",traits:["Compassionate","Driven","Grounded"]},
  PERFORMER:{name:"The Performer",emoji:"✨",tagline:"You create experiences.",color:"#F472B6",glow:"rgba(244,114,182,0.15)",description:"Emotion is your material.",traits:["Creative","Expressive","Bold"]}
};

// Keep questions unchanged
const QUESTIONS = [
{
q:"When you see something broken or missing in the world, your first instinct is:",
options:[
{text:"Break it apart and fix it yourself",w:{SOLVER:3,ARCHITECT:1}},
{text:"Find others who care about it too",w:{CONNECTOR:3,HEALER:1}},
{text:"Build something that solves it permanently",w:{MAKER:3,SOLVER:1}},
{text:"Talk or write about it until people pay attention",w:{VOICE:3,PERFORMER:1}},
]},
{
q:"What kind of work makes you lose track of time?",
options:[
{text:"Creating or crafting something from nothing",w:{MAKER:3,PERFORMER:1}},
{text:"Deep conversations and building relationships",w:{CONNECTOR:3,HEALER:1}},
{text:"Spotting an opportunity and making it real",w:{MERCHANT:3,SOLVER:1}},
{text:"Teaching, explaining, helping someone understand",w:{VOICE:3,HEALER:1}},
]},
{
q:"What frustrates you most about the world right now?",
options:[
{text:"Things are broken and inefficient when they don't need to be",w:{SOLVER:3,ARCHITECT:2}},
{text:"People are isolated with no support or community",w:{HEALER:3,CONNECTOR:2}},
{text:"Good talent and ideas die without direction",w:{ARCHITECT:2,MERCHANT:2}},
{text:"Important truths are not being told or heard",w:{VOICE:3,PERFORMER:2}},
]},
{
q:"In 10 years, what does your greatest impact look like?",
options:[
{text:"A product or system millions of people depend on",w:{SOLVER:2,MAKER:2,ARCHITECT:2}},
{text:"A movement or community that changed lives together",w:{CONNECTOR:3,HEALER:2}},
{text:"A business that generates real wealth and employs people",w:{MERCHANT:3,ARCHITECT:1}},
{text:"Work — art, ideas, stories — that changed how people think",w:{VOICE:2,PERFORMER:3}},
]},
{
q:"When you imagine yourself at your absolute best, you are:",
options:[
{text:"Deep in a hard problem, finally cracking it",w:{SOLVER:3,MAKER:1}},
{text:"In a room of people who trust and follow your lead",w:{CONNECTOR:2,ARCHITECT:1,MERCHANT:1}},
{text:"Creating something with total focus and flow",w:{MAKER:3,PERFORMER:2}},
{text:"Sitting with someone who needs help — and actually helping",w:{HEALER:3,VOICE:1}},
]}
];

function calcArchetype(answers){
  const scores={};
  Object.keys(ARCHETYPES).forEach(k=>scores[k]=0);
  answers.forEach((optIdx,qIdx)=>{
    const w=QUESTIONS[qIdx].options[optIdx].w;
    Object.entries(w).forEach(([k,v])=>scores[k]+=v);
  });
  return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
}

async function callAI(prompt){
  const res = await fetch("/api/path",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt})
  });
  return await res.json();
}

export default function PipuPath(){
  const [screen,setScreen]=useState("welcome");
  const [qIdx,setQIdx]=useState(0);
  const [answers,setAnswers]=useState([]);
  const [archKey,setArchKey]=useState(null);
  const [pathData,setPathData]=useState(null);
  const [busy,setBusy]=useState(false);

  const [showSave,setShowSave]=useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [saved,setSaved]=useState(false);

  const [checkin,setCheckin]=useState({tried:"",worked:"",stuck:""});
  const [checkinRes,setCheckinRes]=useState(null);

  const arch = archKey ? ARCHETYPES[archKey] : null;

  function pickAnswer(i){
    const next=[...answers,i];
    setAnswers(next);

    if(qIdx<QUESTIONS.length-1){
      setQIdx(qIdx+1);
    }else{
      generatePath(next);
    }
  }

  async function generatePath(finalAnswers){
    const key = calcArchetype(finalAnswers);
    setArchKey(key);
    setBusy(true);
    setScreen("generating");

    const data = await callAI(`
Return ONLY JSON:
{
 "path_title":"Title",
 "revelation":"Insight",
 "skill_one":"Skill",
 "skill_why":"Why",
 "first_move":"Move",
 "first_offer":"Offer",
 "trap":"Trap",
 "challenge":"Challenge"
}
`);

    setPathData(data);
    localStorage.setItem("pp_profile",JSON.stringify({archKey:key,pathData:data}));
    setBusy(false);
    setScreen("result");
  }

  async function submitCheckin(){
    setBusy(true);
    const data = await callAI(`
Return ONLY JSON:
{
 "acknowledgment":"Ack",
 "insight":"Insight",
 "adjustment":"Adjustment",
 "next_move":"Move",
 "momentum":8,
 "momentum_note":"Strong momentum"
}
`);
    setCheckinRes(data);
    setBusy(false);
    setScreen("checkin_result");
  }

  async function saveLead(){
    if(!name.trim() || !email.trim()) return alert("Enter name and email");

    await fetch("/api/savelead",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,email,archKey,answers,pathData})
    });

    setSaved(true);
  }

  return (
    <div style={{minHeight:"100vh",background:"#080400",color:"#F5ECD7",padding:"30px",fontFamily:"Arial"}}>
      <div style={{maxWidth:"720px",margin:"0 auto"}}>

        <div style={{color:"#F59E0B",letterSpacing:".35em",fontSize:"12px",marginBottom:"24px"}}>
          PIPUPATH
        </div>

        {screen==="welcome" && <>
          <h1 style={{fontSize:"58px",lineHeight:"1.05",marginBottom:"18px"}}>Discover your builder path.</h1>
          <p style={{opacity:.7,marginBottom:"28px"}}>5 questions. Your natural path revealed.</p>
          <button style={btn} onClick={()=>setScreen("quiz")}>Begin Discovery →</button>
        </>}

        {screen==="quiz" && <>
          <div style={{opacity:.55,marginBottom:"14px"}}>Question {qIdx+1} of {QUESTIONS.length}</div>
          <h2 style={{fontSize:"34px",marginBottom:"20px"}}>{QUESTIONS[qIdx].q}</h2>
          {QUESTIONS[qIdx].options.map((o,i)=>(
            <button key={i} style={opt} onClick={()=>pickAnswer(i)}>{o.text}</button>
          ))}
        </>}

        {screen==="generating" && <h2>Mapping your builder path...</h2>}

        {screen==="result" && arch && pathData && <>
          <h2 style={{fontSize:"40px"}}>{arch.emoji} {pathData.path_title}</h2>

          {card("Revelation",pathData.revelation)}
          {card("Skill",pathData.skill_one+" — "+pathData.skill_why)}
          {card("First Move",pathData.first_move)}
          {card("First Offer",pathData.first_offer)}
          {card("Trap",pathData.trap)}
          {card("30 Day Challenge",pathData.challenge)}

          {!showSave && !saved &&
            <button style={btn} onClick={()=>setShowSave(true)}>Save My Path →</button>
          }

          {showSave && !saved &&
            <div style={box}>
              <input style={input} placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
              <input style={input} placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} />
              <button style={btn} onClick={saveLead}>Save My Path →</button>
            </div>
          }

          {saved && card("Saved","Your builder path has been saved.")}

          <button style={ghost} onClick={()=>setScreen("checkin")}>Check In Progress →</button>
        </>}

        {screen==="checkin" && <>
          <h2 style={{fontSize:"38px"}}>Your Adjustment</h2>
          <textarea style={input} placeholder="What did you try?" value={checkin.tried} onChange={e=>setCheckin({...checkin,tried:e.target.value})}/>
          <textarea style={input} placeholder="What worked?" value={checkin.worked} onChange={e=>setCheckin({...checkin,worked:e.target.value})}/>
          <textarea style={input} placeholder="Where are you stuck?" value={checkin.stuck} onChange={e=>setCheckin({...checkin,stuck:e.target.value})}/>
          <button style={btn} onClick={submitCheckin}>{busy?"Analyzing...":"Get My Adjustment →"}</button>
        </>}

        {screen==="checkin_result" && checkinRes && <>
          {card("Acknowledgment",checkinRes.acknowledgment)}
          {card("Insight",checkinRes.insight)}
          {card("Adjustment",checkinRes.adjustment)}
          {card("Next Move",checkinRes.next_move)}
          {card("Momentum",checkinRes.momentum+"/10 - "+checkinRes.momentum_note)}
        </>}

      </div>
    </div>
  );
}

const btn={width:"100%",padding:"16px",background:"#F59E0B",color:"#080400",border:"none",fontWeight:"bold",marginTop:"12px",cursor:"pointer"};
const ghost={...btn,background:"transparent",color:"#F5ECD7",border:"1px solid #ffffff12"};
const opt={width:"100%",padding:"16px",textAlign:"left",background:"#ffffff08",color:"#F5ECD7",border:"1px solid #ffffff12",marginBottom:"10px",cursor:"pointer"};
const input={width:"100%",padding:"14px",marginBottom:"10px",background:"#ffffff08",color:"#F5ECD7",border:"1px solid #ffffff12"};
const box={padding:"16px",marginTop:"14px",background:"#ffffff08",border:"1px solid #ffffff12"};

function card(title,body){
  return <div style={{padding:"16px",marginBottom:"10px",background:"#ffffff08",border:"1px solid #ffffff12"}}>
    <div style={{opacity:.55,fontSize:"12px",marginBottom:"8px"}}>{title}</div>
    <div>{body}</div>
  </div>
}