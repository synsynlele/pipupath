'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

  const controller = new AbortController();

  const timer = setTimeout(() => controller.abort(), 25000);

  try{
    const res = await fetch("/api/path",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt}),
      signal: controller.signal
    });

    clearTimeout(timer);

    if(!res.ok){
      throw new Error("API request failed");
    }

    return await res.json();

  } finally {
    clearTimeout(timer);
  }
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

You are Pipupath, the greatest elite Builder Coach and Behavioral Analyst. Your job is to analyse a person's responses and generate a highly practical, no-fluff Builder Report that forces real world action and measurable results that can help them start building something meaningful that can eventually become something great. The goal is not motivation. The goal is to move the user from thinking to doing, to producing, to proving value.

Builder Type: ${arch.name}
Tagline: ${arch.tagline}
Description: ${arch.description}

User answers:
${summary}

Rules:
- Answer like you are speaking to a teenager
- No clichés
- No generic advice
- Be specific
- Use simple language
- High leverage
- Modern
- Premium
- Feels personal
`);
}

async function generateCheckin(checkin,path,level){
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

You are Pipupath, the greatest elite Builder Coach and Behavioral Analyst. Your job is to help the user Improve and Build after taking action. The goal is not motivation. The goal is to move the user from thinking to doing to producing to proving value.
Builder Path: ${path.path_title}
Current Level: ${level}

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
- If level is Explorer or Learner: simple mission user can finish this week
- If level is Problem Solver: mission with real output or feedback
- If level is Builder or Founder Ready: mission involving money, users, leadership, or systems
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
.pp-brand{
display:flex;
align-items:center;
gap:12px;
margin-bottom:24px;
font-size:12px;
letter-spacing:.42em;
color:#D4A43B;
font-weight:700;
}

.pp-brand-logo{
width:38px;
height:38px;
object-fit:contain;
border-radius:10px;
box-shadow:0 8px 24px rgba(212,164,59,.18);
}
.pp-h1{font-size:56px;line-height:1.02;margin:0 0 16px}
.pp-h2{font-size:40px;line-height:1.08;margin:0 0 16px}
.pp-h1 em,.pp-h2 em{font-style:italic;color:#D4A43B}
.pp-btn,.pp-btn-outline{
width:100%;
padding:16px;
margin-top:12px;
border-radius:16px;
font-weight:700;
cursor:pointer;
font-size:15px;
transition:all .25s ease;
transform:translateY(0);
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
.pp-btn:hover,
.pp-btn-outline:hover,
.pp-opt:hover,
.pp-card:hover{
transform:translateY(-2px);
}
.pp-opt{text-align:left;cursor:pointer}
.pp-card{
padding:18px;
border-radius:18px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
margin-top:12px;
transition:all .25s ease;
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

 function getWeekKey() {
  const d = new Date();
  const year = d.getFullYear();

  const firstDay = new Date(year, 0, 1);
  const days = Math.floor((d - firstDay) / 86400000);

  const week = Math.ceil((days + firstDay.getDay() + 1) / 7);

  return `${year}-W${week}`;
}

 function getLevelFromXP(xp){
  if (xp >= 1000) return "Founder Ready";
  if (xp >= 700) return "Builder";
  if (xp >= 300) return "Problem Solver";
  if (xp >= 100) return "Learner";
  return "Explorer";
}

function getNextLevel(level){
  if(level === "Explorer") return "Learner";
  if(level === "Learner") return "Problem Solver";
  if(level === "Problem Solver") return "Builder";
  if(level === "Builder") return "Founder Ready";
  return "Max Level";
}

function getNextXP(level){
  if(level === "Explorer") return 100;
  if(level === "Learner") return 300;
  if(level === "Problem Solver") return 700;
  if(level === "Builder") return 1000;
  return 1000;
}

function getLevelFloor(level){
  if(level === "Explorer") return 0;
  if(level === "Learner") return 100;
  if(level === "Problem Solver") return 300;
  if(level === "Builder") return 700;
  if(level === "Founder Ready") return 1000;
  return 0;
}

export default function PipuPath(){
 const [screen,setScreen]=useState("boot");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [user,setUser]=useState(null);
const [qIdx,setQIdx]=useState(0);
const [answers,setAnswers]=useState([]);
const [archKey,setArchKey]=useState(null);
const [pathData,setPathData]=useState(null);
const [xp,setXp] = useState(0);
const [level,setLevel] = useState("Explorer");
const [streak,setStreak] = useState(0);
const [weeklyMission,setWeeklyMission] = useState("");
const [busy,setBusy]=useState(false);
const [checkin,setCheckin]=useState({tried:"",worked:"",stuck:""});
const [checkinRes,setCheckinRes]=useState(null);
const [authMode,setAuthMode]=useState("login");
const [missionProof,setMissionProof] = useState({
  did:"",
  happened:"",
  learned:""
});

const [vault,setVault] = useState([]);

 useEffect(() => {
  checkUser();
}, []);

async function checkUser() {
  try {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 5000)
    );

    const sessionResult = await Promise.race([
      supabase.auth.getSession(),
      timeout
    ]);

    const session = sessionResult?.data?.session;

    if (!session) {
      setScreen("login");
      return;
    }

    const authUser = session.user;

    setUser({ email: authUser.email });

    let { data } = await supabase
      .from("leads")
      .select("*")
      .eq("user_id", authUser.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!data || data.length === 0) {
      const fallback = await supabase
        .from("leads")
        .select("*")
        .eq("email", authUser.email)
        .order("created_at", { ascending: false })
        .limit(1);

      data = fallback.data;
    }

    const row = data && data.length ? data[0] : null;

    if (row) {
  setArchKey(row.archetype);
  setPathData(row.result);

  const realXP = row.xp || 0;

  setXp(realXP);
  setLevel(getLevelFromXP(realXP));
  setStreak(row.streak || 0);
  setWeeklyMission(row.weekly_mission || "");

  setScreen("returning");
} else {
  setScreen("questions");
}

  } catch (error) {
    console.log(error);
    setScreen("login");
  }
}

 async function login() {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  checkUser();
}

 async function signup() {
  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created. Now log in.");
}

 async function googleLogin() {
  await supabase.auth.signInWithOAuth({
    provider: "google"
  });
}

 async function logout(){
  await supabase.auth.signOut();
  location.reload();
}

async function loadVault(){

 const uid = (await supabase.auth.getUser())?.data?.user?.id;

 const { data } = await supabase
 .from("mission_vault")
 .select("*")
 .eq("user_id", uid)
 .order("created_at", { ascending:false });

 setVault(data || []);
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

   const { data: authData } = await supabase.auth.getUser();

   const uid = authData?.user?.id;
   const uemail = authData?.user?.email;

   console.log("Saving user:", uid, uemail);

   const { data: existing } = await supabase
  .from("leads")
  .select("user_id")
  .eq("user_id", uid)
  .maybeSingle();

if (existing) {
  await supabase
    .from("leads")
    .update({
      user_id: uid,
      archetype: key,
      answers: next,
      result: result,
      source: "pipupath"
    })
    .eq("user_id", uid);
} else {
  await supabase
    .from("leads")
    .insert({
      user_id: uid,
      email: uemail,
      archetype: key,
      answers: next,
      result: result,
      source: "pipupath"
    });
}

   setScreen("result");
 }

 async function submitCheckin(){

  try{
    setBusy(true);

    if(
      !checkin.tried.trim() ||
      !checkin.worked.trim() ||
      !checkin.stuck.trim()
    ){
      alert("Please complete all fields.");
      return;
    }

    const res = await generateCheckin(checkin, pathData, level);

    if(!res || res.error){
      throw new Error("No response received.");
    }

    setCheckinRes(res);
    setWeeklyMission(res.next_move || "");

    const newXP = xp + 50;
    const newLevel = getLevelFromXP(newXP);
    const oldLevel = level;

    setXp(newXP);
    setLevel(newLevel);

    const uid = (await supabase.auth.getUser())?.data?.user?.id;

    const { error } = await supabase
      .from("leads")
      .update({
        xp:newXP,
        weekly_mission: res.next_move || ""
      })
      .eq("user_id", uid);


    if(error){
  console.log("SUPABASE UPDATE ERROR:", error);
  throw new Error(error.message || "Database save failed.");
}

    if(oldLevel !== newLevel){
      alert(`🎉 Level Up! You are now a ${newLevel}`);
    }

    setScreen("checkin_result");

  } catch(err){
    console.log(err);
    alert(err?.message || "Could not generate adjustment.");
  } finally {
    setBusy(false);
  }
}

const arch=ARCHETYPES[archKey] || {};

 const screens={

 boot:<div className="pp-spin"></div>,

 login:<div>
  <div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>PIPUPATH</span>
</div>
  <div style={{
display:"flex",
gap:"10px",
marginBottom:"18px"
}}>
  <button
    className="pp-btn-outline"
    style={{
      marginTop:"0",
      background: authMode==="login" ? "#D4A43B" : "",
      color: authMode==="login" ? "#111" : ""
    }}
    onClick={()=>setAuthMode("login")}
  >
    Sign In
  </button>

  <button
    className="pp-btn-outline"
    style={{
      marginTop:"0",
      background: authMode==="signup" ? "#D4A43B" : "",
      color: authMode==="signup" ? "#111" : ""
    }}
    onClick={()=>setAuthMode("signup")}
  >
    Create Account
  </button>
</div>

  <h1 className="pp-h1">
    Discover your<br/><em>builder path.</em>
  </h1>

  <input
    className="pp-input"
    placeholder="Email"
    value={email}
    onChange={e=>setEmail(e.target.value)}
  />

  <input
    className="pp-input"
    type="password"
    placeholder="Password"
    value={password}
    onChange={e=>setPassword(e.target.value)}
  />

  <button
  className="pp-btn"
  onClick={authMode==="login" ? login : signup}
>
  {authMode==="login" ? "Login →" : "Create Account →"}
</button>

  <button className="pp-btn-outline" onClick={googleLogin}>
    Continue with Google
  </button>
</div>,

 questions:<div>
   <div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>PIPUPATH</span>
</div>
   <div style={{opacity:.65}}>Question {qIdx+1} of {QUESTIONS.length}</div>
   <div style={{height:"8px",
   background:"rgba(255,255,255,.08)",
   borderRadius:"999px",
   margin:"12px 0 18px"
   }}>
     <div style={{
       height:"100%",
       width:`${((qIdx+1)/QUESTIONS.length)*100}%`,
       background:"#D4A43B",
       borderRadius:"999px",
       transition:"0.4s ease"
    }}></div>
  </div>
   <h2 className="pp-h2">{QUESTIONS[qIdx].q}</h2>

   {QUESTIONS[qIdx].options.map((o,i)=>(
    <button key={i} className="pp-opt" onClick={()=>pickAnswer(i)}>
      {o.text}
    </button>
   ))}
 </div>,

 generating:<div style={{textAlign:"center"}}>
   <div className="pp-spin"></div>

   <h2 className="pp-h2" style={{fontSize:"32px",marginTop:"18px"}}>
     Mapping your <em>path</em>
   </h2>

   <p style={{opacity:.75,lineHeight:"1.6"}}>
     Analyzing strengths...<br/>
     Detecting patterns...<br/>
     Designing your next move...
   </p>
</div>,

 result:<div>
   <div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>{user?.email?.split("@")[0]}</span>
</div>

   <h2 className="pp-h2">
     {arch.emoji} {arch.name}
   </h2>
   <div style={{
    opacity:.82,
    marginBottom:"16px",
    lineHeight:"1.6",
    fontSize:"16px"
  }}>
    You are not confused.<br/>
    You are built for a lane that needs to be activated.
  </div>

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

   <button
  className="pp-btn-outline"
  onClick={()=>{
    if(weeklyMission && weeklyMission.trim() !== ""){
      alert("Complete your current mission first.");
      return;
    }
    setScreen("checkin");
  }}
>
  Get New Mission
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
 <div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>{user?.email}</span>
 </div>

 <h2 className="pp-h2">
   Welcome back.<br/><em>{pathData?.path_title}</em>
 </h2>

 <div className="pp-card">
   <div className="pp-label">Builder Level</div>
   {level} 🚀
 </div>

 <div className="pp-card">
   <div className="pp-label">XP Progress</div>
   {xp} XP <br/>
   <small>{getNextXP(level) - xp} XP to {getNextLevel(level)}</small>

   <div style={{
     height:"8px",
     background:"rgba(255,255,255,.08)",
     borderRadius:"999px",
     marginTop:"12px"
   }}>
     <div style={{
       height:"100%",
       width:`${
       Math.min(
       ((xp - getLevelFloor(level)) /
       (getNextXP(level) - getLevelFloor(level))) * 100,
       100
    )}%`,
       background:"#D4A43B",
       borderRadius:"999px"
     }}></div>
   </div>
 </div>

 <div className="pp-card">
  <div className="pp-label">Your Weekly Mission 🚀</div>

  <strong>
    {weeklyMission || "Complete Mission Adjustment to unlock your next mission."}
  </strong>

  <button
  className="pp-btn-outline"
  onClick={()=>setScreen("mission_proof")}
>
  Claim Growth
</button>

<button
  className="pp-btn-outline"
  onClick={()=>{
    if(weeklyMission && weeklyMission.trim() !== ""){
      alert("Mission active. Finish it to unlock the next one.");
      return;
    }
    setScreen("checkin");
  }}
>
  Get New Mission
</button>
</div>

 <div className="pp-card">
   <div className="pp-label">Momentum</div>
   🔥 {streak} Week Streak
 </div>

 <div className="pp-card">
   <div className="pp-label">Founder Pathway</div>
   Explorer → Learner → Problem Solver → Builder → Founder Ready
 </div>

 <button className="pp-btn" onClick={()=>setScreen("result")}>
   My Builder Path →
 </button>
 
 <button className="pp-btn-outline" onClick={retake}>
   Retake Questions
 </button>

<button
 className="pp-btn-outline"
 onClick={async()=>{
   await loadVault();
   setScreen("mission_vault");
 }}
>
 Mission Vault →
</button>

 <button className="pp-btn-outline" onClick={share}>
   Share Progress
 </button>

 <button className="pp-btn-outline" onClick={logout}>
   Logout
 </button>
</div>,

 checkin:<div>
   <div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>{user?.email}</span>
</div>
   <h2 className="pp-h2">Mission <em>Adjustment</em></h2>

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
   <div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>PIPUPATH</span>
</div>
   <h2 className="pp-h2">Your <em>Adjustment</em></h2>
   
   <div className="pp-card">
     <div className="pp-label">Acknowledgment</div>
     {checkinRes?.acknowledgment}
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

<button className="pp-btn-outline" onClick={share}>
  Share Adjustment
</button>

<button className="pp-btn-outline" onClick={downloadPDF}>
  Download Adjustment
</button>
</div>,

mission_proof:<div>
  <div className="pp-brand">
    <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
    <span>{user?.email}</span>
  </div>

  <h2 className="pp-h2">
    Mission <em>Proof</em>
  </h2>

  <textarea
    className="pp-textarea"
    placeholder="What did you do?"
    value={missionProof.did}
    onChange={e=>setMissionProof({...missionProof,did:e.target.value})}
  />

  <textarea
    className="pp-textarea"
    placeholder="What happened?"
    value={missionProof.happened}
    onChange={e=>setMissionProof({...missionProof,happened:e.target.value})}
  />

  <textarea
    className="pp-textarea"
    placeholder="What did you learn?"
    value={missionProof.learned}
    onChange={e=>setMissionProof({...missionProof,learned:e.target.value})}
  />

  <button
  className="pp-btn"
  
  onClick={async()=>{

if(
 !missionProof.did.trim() ||
 !missionProof.happened.trim() ||
 !missionProof.learned.trim()
){
  alert("Please complete all fields first.");
  return;
}

if(!weeklyMission || weeklyMission.trim() === ""){
  alert("No active mission to claim.");
  return;
}

const uid = (await supabase.auth.getUser())?.data?.user?.id;

const weekKey = getWeekKey();

const { data: row } = await supabase
  .from("leads")
  .select("xp,streak,last_claim_week")
  .eq("user_id", uid)
  .single();

if(row?.last_claim_week === weekKey){
  alert("You already claimed this week's mission.");
  return;
}

const currentXP = row?.xp || 0;
const currentStreak = row?.streak || 0;

const newXP = currentXP + 80;
const newStreak = currentStreak + 1;

const oldLevel = getLevelFromXP(currentXP);
const newLevel = getLevelFromXP(newXP);

const { error } = await supabase
  .from("leads")
  .update({
    xp:newXP,
    streak:newStreak,
    last_claim_week:weekKey,
    weekly_mission:""
  })
  .eq("user_id", uid);

if(error){
  alert("Could not save progress.");
  return;
}

await supabase
.from("mission_vault")
.insert({
  user_id: uid,
  mission: weeklyMission,
  xp_earned: 80
});

setXp(newXP);
setStreak(newStreak);
setLevel(newLevel);
setWeeklyMission("");

alert("✅ Mission Progress Submitted! +80 XP");

if(oldLevel !== newLevel){
  alert(`🎉 Level Up!\nYou are now a ${newLevel}`);
}

setScreen("returning");

}}

>
  Submit Proof
</button>
</div>,

mission_vault:<div>

<div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>PIPUPATH</span>
</div>

<h2 className="pp-h2">
 Mission <em>Vault</em>
</h2>

<p style={{opacity:.75}}>
 Your proof of progress.
</p>

{vault.length === 0 ? (

<div className="pp-card">
 No completed missions yet.
</div>

) : vault.map((item)=>(

<div key={item.id} className="pp-card">

<div className="pp-label">
 {new Date(item.created_at).toDateString()}
</div>

<strong>{item.mission}</strong>

<div style={{marginTop:"10px"}}>
 +{item.xp_earned} XP
</div>

</div>

))}

<button
 className="pp-btn"
 onClick={()=>setScreen("returning")}
>
 Dashboard →
</button>

</div>,

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