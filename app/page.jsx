'use client';

import { useEffect, useState } from "react";

const ARCHETYPES = {
  SOLVER:{name:"The Solver",tagline:"You fix what others ignore.",description:"You turn chaos into clarity."},
  CONNECTOR:{name:"The Connector",tagline:"You bring people and ideas together.",description:"Relationships become outcomes through you."},
  MAKER:{name:"The Maker",tagline:"You build what does not yet exist.",description:"Creation is your natural language."},
  VOICE:{name:"The Voice",tagline:"You move minds and shape attention.",description:"Words become force in your hands."},
  MERCHANT:{name:"The Merchant",tagline:"You spot value early.",description:"You know how to turn opportunity into wealth."},
  ARCHITECT:{name:"The Architect",tagline:"You design systems that scale.",description:"You think beyond tasks into structures."},
  HEALER:{name:"The Healer",tagline:"You reduce pain and restore people.",description:"Care becomes transformation through you."},
  PERFORMER:{name:"The Performer",tagline:"You create moments people remember.",description:"Energy and emotion move through you."}
};

const QUESTIONS = [
  {
    q:"When something is broken, what do you naturally do?",
    options:[
      {text:"Fix it",w:{SOLVER:3}},
      {text:"Gather people",w:{CONNECTOR:3}},
      {text:"Build a better version",w:{MAKER:3}},
      {text:"Speak up about it",w:{VOICE:3}}
    ]
  },
  {
    q:"What kind of work energizes you most?",
    options:[
      {text:"Creating products",w:{MAKER:3}},
      {text:"Helping people grow",w:{HEALER:3}},
      {text:"Making ideas profitable",w:{MERCHANT:3}},
      {text:"Designing systems",w:{ARCHITECT:3}}
    ]
  },
  {
    q:"What feels easiest for you?",
    options:[
      {text:"Solving hard problems",w:{SOLVER:3}},
      {text:"Influencing people",w:{VOICE:3}},
      {text:"Connecting people",w:{CONNECTOR:3}},
      {text:"Entertaining others",w:{PERFORMER:3}}
    ]
  },
  {
    q:"What impact do you want in the future?",
    options:[
      {text:"Innovation",w:{MAKER:3}},
      {text:"Wealth creation",w:{MERCHANT:3}},
      {text:"Changing lives",w:{HEALER:3}},
      {text:"Building movements",w:{CONNECTOR:3}}
    ]
  }
];

function calcArchetype(answers){
  const scores = {};
  Object.keys(ARCHETYPES).forEach(k => scores[k]=0);

  answers.forEach((ans,qIdx)=>{
    const weights = QUESTIONS[qIdx].options[ans].w;
    Object.entries(weights).forEach(([k,v]) => scores[k]+=v);
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

async function generatePath(key){
  const arch = ARCHETYPES[key];

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

You are the greatest human potential coach and strategist in the world.

Builder Type: ${arch.name}
Tagline: ${arch.tagline}
Description: ${arch.description}

Rules:
- No generic advice
- No clichés
- Be sharp, elite, modern
- Make user feel deeply understood
- Give realistic leverage
- Powerful enough to screenshot
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

You are the greatest elite performance coach.

Builder Path: ${path.path_title}

Tried: ${checkin.tried}
Worked: ${checkin.worked}
Stuck: ${checkin.stuck}

Rules:
- Diagnose fast
- No vague motivation
- Be brutally useful
`);
}

const CSS = `
body{margin:0}
*{box-sizing:border-box}
.pp{min-height:100vh;background:linear-gradient(180deg,#050300,#0c0903);color:#F7E8C5;font-family:Arial,sans-serif;padding:28px;display:flex;justify-content:center;align-items:center}
.pp-wrap{max-width:640px;width:100%}
.pp-logo{font-size:12px;letter-spacing:.42em;color:#D4A43B;margin-bottom:26px}
.pp-h1{font-size:58px;line-height:1.02;margin:0 0 16px}
.pp-h2{font-size:40px;line-height:1.08;margin:0 0 16px}
.pp-h1 em,.pp-h2 em{font-style:italic;color:#D4A43B}
.pp-lead{opacity:.78;line-height:1.6;margin-bottom:22px}
.pp-btn,.pp-btn-outline{width:100%;padding:16px;margin-top:12px;font-weight:700;cursor:pointer;border-radius:16px;font-size:15px}
.pp-btn{background:#D4A43B;color:#080400;border:none}
.pp-btn-outline{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.09);color:#F7E8C5}
.pp-opt{width:100%;padding:16px;margin-bottom:10px;text-align:left;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:#F7E8C5;border-radius:16px;cursor:pointer}
.pp-card{padding:18px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:18px;margin-bottom:12px}
.pp-card-label{font-size:11px;opacity:.55;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px}
.pp-input,.pp-textarea{width:100%;padding:15px;margin-bottom:10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:#F7E8C5;border-radius:16px}
.pp-textarea{min-height:96px}
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

  function downloadPDF(){
    window.print();
  }

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

    setScreen("returning");
  }

  async function submitCheckin(){
    setBusy(true);
    const res=await generateCheckin(checkin,pathData);
    setCheckinRes(res);
    setBusy(false);
    setScreen("checkin_result");
  }

  const screens = {
    boot:<div className="pp-spin"></div>,

    login:(<div>
      <div className="pp-logo">PIPUPATH</div>
      <h1 className="pp-h1">Start your<br/><em>builder journey.</em></h1>
      <input className="pp-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/>
      <button className="pp-btn" onClick={login}>Continue →</button>
    </div>),

    questions:(<div>
      <div className="pp-logo">PIPUPATH</div>
      <div style={{opacity:.6,marginBottom:14}}>Question {qIdx+1} of {QUESTIONS.length}</div>
      <h2 className="pp-h2">{QUESTIONS[qIdx].q}</h2>
      {QUESTIONS[qIdx].options.map((o,i)=>(
        <button key={i} className="pp-opt" onClick={()=>pickAnswer(i)}>{o.text}</button>
      ))}
    </div>),

    generating:(<div style={{textAlign:"center"}}>
      <div className="pp-spin"></div>
      <p style={{marginTop:18}}>Mapping your premium builder path...</p>
    </div>),

    returning:(<div>
      <div className="pp-logo">{user?.email}</div>
      <h2 className="pp-h2">Welcome back,<br/><em>{pathData?.path_title}</em></h2>
      <button className="pp-btn" onClick={()=>setScreen("result")}>Open Dashboard →</button>
      <button className="pp-btn-outline" onClick={()=>setScreen("checkin")}>Weekly Check-In</button>
      <button className="pp-btn-outline" onClick={retake}>Retake Questions</button>
      <button className="pp-btn-outline" onClick={logout}>Logout</button>
    </div>),

    result:(<div>
      <div className="pp-logo">{user?.email}</div>
      <h2 className="pp-h2">{pathData?.path_title}</h2>
      <div className="pp-card">{pathData?.revelation}</div>
      <div className="pp-card">{pathData?.first_move}</div>
      <button className="pp-btn" onClick={()=>setScreen("returning")}>Dashboard →</button>
      <button className="pp-btn-outline" onClick={()=>setScreen("checkin")}>Weekly Check-In</button>
      <button className="pp-btn-outline" onClick={retake}>Retake Questions</button>
      <button className="pp-btn-outline" onClick={downloadPDF}>Download</button>
    </div>),

    checkin:(<div>
      <div className="pp-logo">PIPUPATH</div>
      <h2 className="pp-h2">Weekly <em>Adjustment</em></h2>
      <textarea className="pp-textarea" placeholder="What did you try?" value={checkin.tried} onChange={e=>setCheckin({...checkin,tried:e.target.value})}/>
      <textarea className="pp-textarea" placeholder="What worked?" value={checkin.worked} onChange={e=>setCheckin({...checkin,worked:e.target.value})}/>
      <textarea className="pp-textarea" placeholder="Where are you stuck?" value={checkin.stuck} onChange={e=>setCheckin({...checkin,stuck:e.target.value})}/>
      <button className="pp-btn" onClick={submitCheckin}>{busy?"Analyzing...":"Get My Adjustment →"}</button>
    </div>),

    checkin_result:(<div>
      <div className="pp-logo">PIPUPATH</div>
      <h2 className="pp-h2">Your <em>Adjustment</em></h2>
      <div className="pp-card">{checkinRes?.diagnosis}</div>
      <div className="pp-card">{checkinRes?.next_move}</div>
      <button className="pp-btn" onClick={()=>setScreen("returning")}>Dashboard →</button>
    </div>)
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