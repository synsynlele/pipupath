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
question:"When something important needs to happen, what do you naturally do first?",
options:[
{text:"🚀 Start taking action immediately", type:"builder"},
{text:"🧠 Think deeply before acting", type:"strategist"},
{text:"🤝 Bring people together to help", type:"connector"},
{text:"🎨 Look for a creative new angle", type:"creator"}
]
},

{
question:"What kind of challenge excites you most?",
options:[
{text:"Building something useful", type:"builder"},
{text:"Solving a hard problem", type:"strategist"},
{text:"Leading people to win", type:"connector"},
{text:"Creating something original", type:"creator"}
]
},

{
question:"If you had one free Saturday, what sounds most satisfying?",
options:[
{text:"Start a side hustle or project", type:"builder"},
{text:"Learn a valuable skill", type:"strategist"},
{text:"Organize people for something meaningful or event", type:"connector"},
{text:"Design, write or make content", type:"creator"}
]
},

{
question:"What frustrates you most?",
options:[
{text:"Slow progress and wasted time", type:"builder"},
{text:"Bad decisions and confusion", type:"strategist"},
{text:"Disunity and poor leadership", type:"connector"},
{text:"Being boxed in or restricted", type:"creator"}
]
},

{
question:"Which future sounds best to you?",
options:[
{text:"Owning something valuable", type:"builder"},
{text:"Becoming a respected expert", type:"strategist"},
{text:"Leading something important", type:"connector"},
{text:"Having freedom through talent or skills", type:"creator"}
]
}

];

function calculateArchetype(answers){

const scores = {
SOLVER:0,
CONNECTOR:0,
MAKER:0,
VOICE:0,
MERCHANT:0,
ARCHITECT:0,
HEALER:0,
PERFORMER:0
};

answers.forEach((answerIndex,i)=>{

const type = QUESTIONS[i].options[answerIndex]?.type;

if(i===0){
if(type==="builder") scores.MERCHANT +=2;
if(type==="strategist") scores.ARCHITECT +=2;
if(type==="connector") scores.CONNECTOR +=2;
if(type==="creator") scores.PERFORMER +=2;
}

if(i===1){
if(type==="builder") scores.MAKER +=2;
if(type==="strategist") scores.SOLVER +=2;
if(type==="connector") scores.VOICE +=2;
if(type==="creator") scores.PERFORMER +=2;
}

if(i===2){
if(type==="builder") scores.MERCHANT +=2;
if(type==="strategist") scores.ARCHITECT +=2;
if(type==="connector") scores.HEALER +=2;
if(type==="creator") scores.MAKER +=2;
}

if(i===3){
if(type==="builder") scores.MERCHANT +=2;
if(type==="strategist") scores.SOLVER +=2;
if(type==="connector") scores.HEALER +=2;
if(type==="creator") scores.PERFORMER +=2;
}

if(i===4){
if(type==="builder") scores.MERCHANT +=2;
if(type==="strategist") scores.ARCHITECT +=2;
if(type==="connector") scores.VOICE +=2;
if(type==="creator") scores.MAKER +=2;
}

});

const sorted = Object.entries(scores)
.sort((a,b)=>b[1]-a[1]);

const topScore = sorted[0][1];

const tied = sorted.filter(item => item[1] === topScore);

return tied[Math.floor(Math.random() * tied.length)][0];

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

 const arch = ARCHETYPES[key];

 const summary = answers
 .map((a,i)=>`Q${i+1}: ${QUESTIONS[i].options[a].text}`)
 .join("\n");

 return await callAI(`
Return ONLY valid JSON.

{
"identity_title":"",
"core_truth":"",
"hidden_edge":"",
"why_you_feel_stuck":"",
"wealth_engine":"",
"career_arena":"",
"skill_stack_1":"",
"skill_stack_2":"",
"skill_stack_3":"",
"first_move_72hrs":"",
"first_offer":"",
"trap_to_avoid":"",
"seven_day_mission":"",
"future_self":"",
"truth_line":""
}

You are PipuPath Builder OS.

You are an elite builder coach, behavioral strategist, talent analyst, and economic pathfinder.

Your job is to analyze this person deeply and give them a practical identity-based growth report that helps them build a meaningful future.

This is not entertainment.
This is not motivation fluff.
This is a real unlock report.

BUILDER TYPE:
${arch.name}

TAGLINE:
${arch.tagline}

DESCRIPTION:
${arch.description}

TRAITS:
${arch.traits?.join(", ")}

USER ANSWERS:
${summary}

ANALYZE:

1. How they naturally win
2. Hidden strengths others miss
3. Why they may feel stuck
4. Best way to create income
5. Best career arenas
6. Skills with highest leverage
7. Immediate next move
8. Biggest trap
9. Future version if disciplined

RULES:

- deeply insightful
- sharp
- practical
- specific
- modern tone
- premium feel
- simple language
- speak directly to user
- no vague clichés
- no generic career lists
- no fake hype
- help them move fast
- sound like someone who truly understands talent
- useful for ages 16 to 40
- connect identity to economics
- make it emotionally resonant but grounded
`);
}

async function generateCheckin(path,tried,worked,stuck){

 return await callAI(`
Return ONLY valid JSON.

{
"acknowledgment":"",
"diagnosis":"",
"blindspot":"",
"hook":"",
"question":"",
"learn":"",
"solve":"",
"proof":"",
"difficulty":"",
"momentum_score":0,
"why_this_matters":"",
"truth_line":""
}

You are PipuPath Mission OS.

You are an elite growth coach focused on helping ambitious people make weekly progress.

Your job is to analyze their last attempt and prescribe the smartest next mission.

USER IDENTITY:

Title: ${path.identity_title}
Truth: ${path.core_truth}
Wealth Engine: ${path.wealth_engine}
Trap: ${path.trap_to_avoid}

CHECK-IN DATA:

What They Tried:
${tried}

What Worked:
${worked}

Where They Got Stuck:
${stuck}

ANALYZE:

1. What progress was made
2. Hidden mistake or blindspot
3. Best next mission this week
4. Proof standard for success
5. Correct difficulty level
6. Why this mission matters now
7. Motivational truth grounded in reality

RULES:

- practical
- sharp
- no fluff
- no generic advice
- mission must be actionable
- mission should create growth, proof, skill, money, clarity or network
- realistic for 7 days
- simple language
- premium coach tone
- momentum_score must be number from 1 to 10
`);
}

async function generateBusinessPlan(type, problem, revenue){
  return await callAI(`
Return ONLY valid JSON.

{
"score":0,
"stage":"",
"summary":"",
"top_bottleneck":"",
"hidden_opportunity":"",
"cashflow_risk":"",
"founder_blindspot":"",
"quick_win_48hrs":"",
"mission1":"",
"mission2":"",
"mission3":"",
"mission4":"",
"mission5":"",
"tool1":"",
"tool2":"",
"tool3":"",
"tool4":"",
"thirty_day_plan":"",
"avoid_this":"",
"motivation_truth":""
}

You are PipuPath SME OS.

You are an elite small business growth strategist for African and emerging-market businesses.

Business Type: ${type}
Main Problem: ${problem}
Revenue Level: ${revenue}

Analyze:
1. Offer strength
2. Demand weakness
3. Sales leaks
4. Repeat customer potential
5. Cash flow risk
6. Founder bottleneck
7. Fastest growth lever
8. Best affordable tools
9. 30-day realistic plan

Rules:
- no fluff
- practical
- sharp
- specific
- simple language
- realistic for low budgets
- missions should help revenue or growth
- tools must be common and useful
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
width:100%;
padding:16px;
margin-top:10px;
border-radius:16px;
background:rgba(255,255,255,.06);
border:1px solid rgba(255,255,255,.12);
color:#F7E8C5;
font-size:15px;
appearance:none;
-webkit-appearance:none;
-moz-appearance:none;
}
.pp-input option{
background:#111;
color:#F7E8C5;
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
line-height:1.6;
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

const BIZ_CATEGORIES = {
  "Food & Drinks": [
    "Bakery",
    "Restaurant",
    "Fast Food",
    "Catering",
    "Drinks / Juice",
    "Snacks"
  ],

  "Fashion": [
    "Boutique",
    "Tailoring",
    "Shoes",
    "Jewelry",
    "Thrift"
  ],

  "Beauty": [
    "Barbing Salon",
    "Hair Salon",
    "Nails",
    "Spa",
    "Makeup Artist"
  ],

  "Education": [
    "School",
    "Lesson Center",
    "Coaching",
    "Skill Academy",
    "Online Course"
  ],

  "Retail / Trading": [
    "Mini Mart",
    "Electronics",
    "Household Goods",
    "Phone Accessories",
    "Mixed Shop"
  ],

  "Services": [
    "Graphic Design",
    "Digital Marketing",
    "Cleaning",
    "Logistics",
    "Photography",
    "Consultancy"
  ],

  "Agriculture": [
    "Poultry",
    "Crop Farming",
    "Fish Farming",
    "Food Processing",
    "Produce Trading"
  ],

  "Other": [
    "Other"
  ]
};

export default function PipuPath(){
 const [screen,setScreen]=useState("chooser");
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
const [bizCategory,setBizCategory] = useState("");
const [bizSubcategory,setBizSubcategory] = useState("");
const [bizType,setBizType] = useState("");
const [bizProblem,setBizProblem] = useState("");
const [bizRevenue,setBizRevenue] = useState("");
const [bizResult,setBizResult] = useState(null);
const [feedback,setFeedback] = useState("");

 useEffect(() => {
  checkUserSilent();
}, []);

async function submitBusiness(){

  if(!bizCategory || !bizSubcategory || !bizProblem || !bizRevenue){
    alert("Please complete all fields.");
    return;
  }

  try{
    setBusy(true);
    setScreen("generating");

    const fullType = bizCategory + " - " + bizSubcategory;

setBizType(fullType);

const result = await generateBusinessPlan(
  fullType,
  bizProblem,
  bizRevenue
);

    setBizResult(result);

    const uid = (await supabase.auth.getUser())?.data?.user?.id;

    if(uid){
      await supabase.from("business_profiles").insert({
        user_id: uid,
        business_type: fullType,
        main_problem: bizProblem,
        revenue_range: bizRevenue,
        result: result
      });
    }

    setScreen("business_result");

  } catch(error){
    console.log(error);
    alert("Could not analyze business.");
    setScreen("business");
  } finally {
    setBusy(false);
  }
}


async function checkUserSilent() {
  try {
    const { data } = await supabase.auth.getSession();

    if (data?.session?.user) {
      checkUser();
    }
  } catch (error) {
    console.log(error);
  }
}

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
  setPathData(row.result || {});

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
   const title=pathData?.identity_title || "My Builder Path";
   window.open(
    `https://wa.me/?text=${encodeURIComponent("I discovered my growth path on PipuPath: "+title)}`,
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

   const key=calculateArchetype(next);
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

    const res = await generateCheckin(
  pathData,
  checkin.tried,
  checkin.worked,
  checkin.stuck
);

    if(!res || res.error){
      throw new Error("No response received.");
    }

    setCheckinRes(res);
    setWeeklyMission(res);

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
        weekly_mission: res
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

async function saveFeedback(type){

  setFeedback(type);

  const uid = (await supabase.auth.getUser())?.data?.user?.id;

  if(uid){
    await supabase.from("feedback").insert({
      user_id: uid,
      type: type
    });
  }

  alert("Thanks for the feedback.");
}

const arch=ARCHETYPES[archKey] || {};

 const screens={

chooser:<div>

<div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>PIPUPATH</span>
</div>

<h1 className="pp-h1">
What do you want to<br/><em>grow today?</em>
</h1>

<p style={{opacity:.75,marginBottom:"20px"}}>
Choose your growth path.
</p>

<button
className="pp-btn"
onClick={()=>setScreen("login")}
>
Myself →
</button>

<button
className="pp-btn-outline"
onClick={()=>setScreen("business")}
>
My Business →
</button>

</div>,

admin:<div>

<div className="pp-brand">
<span>PIPUPATH DATA</span>
</div>

<h2 className="pp-h2">
Trust <em>Dashboard</em>
</h2>

<div className="pp-card">
<div className="pp-label">Total Users</div>
Coming Next
</div>

<div className="pp-card">
<div className="pp-label">Repeat Users</div>
Coming Next
</div>

<div className="pp-card">
<div className="pp-label">Top Problems</div>
Coming Next
</div>

<button
className="pp-btn"
onClick={()=>setScreen("chooser")}
>
Home
</button>

</div>,

business:<div>

<div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>PIPUPATH SME</span>
</div>

<h2 className="pp-h2">
Grow Your <em>Business</em>
</h2>

<p style={{opacity:.75,marginBottom:"12px"}}>
Get a practical growth report in 60 seconds.
</p>

<div className="pp-card">
<div className="pp-label">Step 1 of 4</div>
What kind of business is this?
</div>

<select
className="pp-input"
value={bizCategory}
onChange={(e)=>{
  setBizCategory(e.target.value);
  setBizSubcategory("");
}}
>
<option value="">Choose Category</option>

{Object.keys(BIZ_CATEGORIES).map((cat)=>(
<option key={cat} value={cat}>
{cat}
</option>
))}
</select>

{bizCategory && (

<>
<div className="pp-card">
<div className="pp-label">Step 2 of 4</div>
Choose business type
</div>

<select
className="pp-input"
value={bizSubcategory}
onChange={(e)=>setBizSubcategory(e.target.value)}
>
<option value="">Choose Type</option>

{BIZ_CATEGORIES[bizCategory].map((item)=>(
<option key={item} value={item}>
{item}
</option>
))}
</select>
</>

)}

{bizSubcategory && (

<>
<div className="pp-card">
<div className="pp-label">Step 3 of 4</div>
What is slowing growth?
</div>

<select
className="pp-input"
value={bizProblem}
onChange={(e)=>setBizProblem(e.target.value)}
>
<option value="">Choose Problem</option>
<option>Need more customers</option>
<option>Low sales</option>
<option>Customers don’t return</option>
<option>No online presence</option>
<option>Cash flow stress</option>
<option>Team issues</option>
<option>Too disorganized</option>
<option>Not sure what to do next</option>
</select>
</>

)}

{bizProblem && (

<>
<div className="pp-card">
<div className="pp-label">Step 4 of 4</div>
Monthly revenue
</div>

<select
className="pp-input"
value={bizRevenue}
onChange={(e)=>setBizRevenue(e.target.value)}
>
<option value="">Choose Revenue</option>
<option>Not selling yet</option>
<option>Under ₦100k</option>
<option>₦100k - ₦500k</option>
<option>₦500k - ₦2m</option>
<option>₦2m+</option>
</select>
</>

)}

<button
className="pp-btn"
onClick={submitBusiness}
>
Analyze My Business →
</button>

<button
className="pp-btn-outline"
onClick={()=>{
 setBizCategory("");
 setBizSubcategory("");
 setBizProblem("");
 setBizRevenue("");
 setScreen("chooser");
}}
>
Back
</button>

</div>,

business_result:<div>

<div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>PIPUPATH SME</span>
</div>

<h2 className="pp-h2">
{bizType}<br/><em>Growth Report</em>
</h2>

<div className="pp-card">
<div className="pp-label">Growth Score</div>
<strong>{bizResult?.score}/100</strong>
</div>

<div className="pp-card">
<div className="pp-label">Business Stage</div>
{bizResult?.stage}
</div>

<div className="pp-card">
<div className="pp-label">Executive Summary</div>
{bizResult?.summary}
</div>

<div className="pp-card">
<div className="pp-label">Biggest Bottleneck</div>
{bizResult?.top_bottleneck}
</div>

<div className="pp-card">
<div className="pp-label">Hidden Opportunity</div>
{bizResult?.hidden_opportunity}
</div>

<div className="pp-card">
<div className="pp-label">Cashflow Risk</div>
{bizResult?.cashflow_risk}
</div>

<div className="pp-card">
<div className="pp-label">Founder Blindspot</div>
{bizResult?.founder_blindspot}
</div>

<div className="pp-card">
<div className="pp-label">Quick Win (48 Hours)</div>
{bizResult?.quick_win_48hrs}
</div>

<div className="pp-card">
<div className="pp-label">This Week Missions</div>

1. {bizResult?.mission1}<br/><br/>
2. {bizResult?.mission2}<br/><br/>
3. {bizResult?.mission3}<br/><br/>
4. {bizResult?.mission4}<br/><br/>
5. {bizResult?.mission5}

</div>

<div className="pp-card">
<div className="pp-label">Tools To Use</div>

• {bizResult?.tool1}<br/>
• {bizResult?.tool2}<br/>
• {bizResult?.tool3}<br/>
• {bizResult?.tool4}

</div>

<div className="pp-card">
<div className="pp-label">30 Day Growth Plan</div>
{bizResult?.thirty_day_plan}
</div>

<div className="pp-card">
<div className="pp-label">Avoid This Mistake</div>
{bizResult?.avoid_this}
</div>

<div className="pp-card">
<div className="pp-label">Truth</div>
<strong>{bizResult?.motivation_truth}</strong>
</div>

<button
className="pp-btn"
onClick={()=>setScreen("business")}
>
Run Again →
</button>

<button
className="pp-btn-outline"
onClick={()=>setScreen("chooser")}
>
Home
</button>

<button
className="pp-btn-outline"
onClick={()=>{
window.open(
`https://wa.me/?text=${encodeURIComponent("I used PipuPath to analyze my business growth path.")}`,
"_blank"
);
}}
>
Share Result
</button>

<div style={{height:"8px"}}></div>
<button
className="pp-btn-outline"
onClick={()=>setScreen("login")}
>
Save My Growth Profile →
</button>

</div>,

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

 <button
className="pp-btn-outline"
onClick={()=>setScreen("chooser")}
>
← Back
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

   <div style={{
opacity:.72,
fontSize:"14px",
marginBottom:"10px",
lineHeight:"1.5"
}}>
Answer based on how you naturally act, not who you wish to be.
</div>
   <h2 className="pp-h2">{QUESTIONS[qIdx].question}</h2>

   {QUESTIONS[qIdx].options.map((o,i)=>(
    <button key={i} className="pp-opt" onClick={()=>pickAnswer(i)}>
      {o.text}
    </button>
   ))}

    {qIdx > 0 && (
<button
className="pp-btn-outline"
onClick={()=>{
setQIdx(qIdx - 1);
setAnswers(answers.slice(0,-1));
}}
>
← Back
</button>
)}
   
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
{arch.emoji} {pathData?.identity_title}
</h2>

<div style={{
opacity:.82,
marginBottom:"16px",
lineHeight:"1.6",
fontSize:"16px"
}}>
You are not behind.<br/>
You are under-aligned.
</div>

<div className="pp-traits">
{arch.traits?.map(t=>(
<span key={t} className="pp-trait">{t}</span>
))}
</div>

<div className="pp-card">
<div className="pp-label">Core Truth</div>
{pathData?.core_truth}
</div>

<div className="pp-card">
<div className="pp-label">Hidden Edge</div>
{pathData?.hidden_edge}
</div>

<div className="pp-card">
<div className="pp-label">Why You Feel Stuck</div>
{pathData?.why_you_feel_stuck}
</div>

<div className="pp-card">
<div className="pp-label">Wealth Engine</div>
{pathData?.wealth_engine}
</div>

<div className="pp-card">
<div className="pp-label">Best Career Arena</div>
{pathData?.career_arena}
</div>

<div className="pp-card">
<div className="pp-label">Skill Stack To Build</div>

1. {pathData?.skill_stack_1}<br/>
2. {pathData?.skill_stack_2}<br/>
3. {pathData?.skill_stack_3}

</div>

<div className="pp-card">
<div className="pp-label">First Move (72 Hours)</div>
{pathData?.first_move_72hrs}
</div>

<div className="pp-card">
<div className="pp-label">First Offer</div>
{pathData?.first_offer}
</div>

<div className="pp-card">
<div className="pp-label">Trap To Avoid</div>
{pathData?.trap_to_avoid}
</div>

<div className="pp-card">
<div className="pp-label">7 Day Mission</div>
{pathData?.seven_day_mission}
</div>

<div className="pp-card">
<div className="pp-label">Future Self</div>
{pathData?.future_self}
</div>

<div className="pp-card">
<div className="pp-label">Truth</div>
<strong>{pathData?.truth_line}</strong>
</div>

<button
className="pp-btn"
onClick={()=>setScreen("returning")}
>
Dashboard →
</button>

<button
className="pp-btn-outline"
onClick={retake}
>
Retake Questions
</button>

<button
className="pp-btn-outline"
onClick={share}
>
Share
</button>

<button
className="pp-btn-outline"
onClick={downloadPDF}
>
Download
</button>

<div className="pp-card">

<div className="pp-label">
Was this result useful?
</div>

<button
className="pp-btn-outline"
onClick={()=>saveFeedback("useful")}
>
👍 Useful
</button>

<button
className="pp-btn-outline"
onClick={()=>saveFeedback("okay")}
>
😐 Okay
</button>

<button
className="pp-btn-outline"
onClick={()=>saveFeedback("weak")}
>
👎 Weak
</button>

</div>

</div>,

 returning:<div>
 <div className="pp-brand">
  <img src="/logo.png" alt="PipuPath" className="pp-brand-logo" />
  <span>{user?.email}</span>
 </div>

 <h2 className="pp-h2">
   Welcome back.<br/><em>{pathData?.identity_title}</em>
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
    {weeklyMission?.hook ? (
<>
<strong>Hook:</strong><br/>
{weeklyMission.hook}

<br/><br/>

<strong>Question:</strong><br/>
{weeklyMission.question}

<br/><br/>

<strong>Learn:</strong><br/>
{weeklyMission.learn}

<br/><br/>

<strong>Solve:</strong><br/>
{weeklyMission.solve}
</>
) : (
"Complete Mission Adjustment to unlock your next mission."
)}
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

<button
className="pp-btn"
onClick={()=>setScreen("returning")}
>
Dashboard →
</button>
</div>

 <div className="pp-card">
   <div className="pp-label">Momentum</div>
   🔥 {streak} Week Streak
 </div>

 <div className="pp-card">
  <div className="pp-label">Completed Missions</div>
  {Math.floor(xp / 80)}
</div>

<div className="pp-card">
  <div className="pp-label">Growth Score</div>
  {Math.min(100, 20 + Math.floor(xp / 10))}/100
</div>

<div className="pp-card">
  <div className="pp-label">Next Milestone</div>
  Reach {getNextXP(level)} XP to become {getNextLevel(level)}
</div>

 <div className="pp-card">
<div className="pp-label">This Week Goal</div>
Return 3 times and complete 1 mission.
</div>

 <div className="pp-card">
   <div className="pp-label">Founder Pathway</div>
   Explorer → Learner → Problem Solver → Builder → Founder Ready
 </div>

 <button className="pp-btn" onClick={()=>setScreen("result")}>
   My Identity Report →
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

<h2 className="pp-h2">
Your <em>Next Mission</em>
</h2>

<div className="pp-card">
<div className="pp-label">Acknowledgment</div>
{checkinRes?.acknowledgment}
</div>

<div className="pp-card">
<div className="pp-label">Diagnosis</div>
{checkinRes?.diagnosis}
</div>

<div className="pp-card">
<div className="pp-label">Blindspot</div>
{checkinRes?.blindspot}
</div>

<div className="pp-card">
<div className="pp-label">Mission Name</div>
<strong>{checkinRes?.mission_name}</strong>
</div>

<div className="pp-card">
<div className="pp-label">Next Move</div>
{checkinRes?.next_move}
</div>

<div className="pp-card">
<div className="pp-label">Proof Of Completion</div>
{checkinRes?.proof_of_completion}
</div>

<div className="pp-card">
<div className="pp-label">Difficulty</div>
{checkinRes?.difficulty}
</div>

<div className="pp-card">
<div className="pp-label">Momentum Score</div>
{checkinRes?.momentum_score}/10
</div>

<div className="pp-card">
<div className="pp-label">Why This Matters</div>
{checkinRes?.why_this_matters}
</div>

<div className="pp-card">
<div className="pp-label">Truth</div>
<strong>{checkinRes?.truth_line}</strong>
</div>

<button
className="pp-btn"
onClick={()=>setScreen("mission_proof")}
>
Start Mission +80 XP →
</button>

<button
className="pp-btn-outline"
onClick={downloadPDF}
>
Download Mission
</button>

<button
className="pp-btn-outline"
onClick={share}
>
Share Progress
</button>

<button
className="pp-btn-outline"
onClick={()=>setScreen("returning")}
>
Dashboard
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

if(!weeklyMission || !weeklyMission.solve){
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
  mission: weeklyMission.solve,
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

<button
 className="pp-btn"
 onClick={()=>setScreen("returning")}
>
 Dashboard →
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