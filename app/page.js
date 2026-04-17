"use client";

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// ARCHETYPES
// ─────────────────────────────────────────────
const ARCHETYPES = {
  SOLVER: {
    name: "The Solver",
    emoji: "⚡",
    tagline: "You fix what others walk past.",
    color: "#F97316",
    glow: "rgba(249,115,22,0.15)",
    traits: ["Analytical", "Relentless", "Resourceful"],
  },
  CONNECTOR: {
    name: "The Connector",
    emoji: "🌐",
    tagline: "People and ideas find their home through you.",
    color: "#10B981",
    glow: "rgba(16,185,129,0.15)",
    traits: ["Empathetic", "Influential", "Magnetic"],
  },
  MAKER: {
    name: "The Maker",
    emoji: "🔨",
    tagline: "Your hands and mind build what didn't exist.",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.15)",
    traits: ["Skilled", "Precise", "Patient"],
  },
  VOICE: {
    name: "The Voice",
    emoji: "🔥",
    tagline: "You make ideas move and people listen.",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.15)",
    traits: ["Articulate", "Persuasive", "Curious"],
  },
  MERCHANT: {
    name: "The Merchant",
    emoji: "💎",
    tagline: "You see value everywhere others see nothing.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.15)",
    traits: ["Sharp", "Bold", "Strategic"],
  },
  ARCHITECT: {
    name: "The Architect",
    emoji: "🏛️",
    tagline: "You design systems before others see the need.",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.15)",
    traits: ["Strategic", "Visionary", "Disciplined"],
  },
  HEALER: {
    name: "The Healer",
    emoji: "🌱",
    tagline: "You build to reduce human pain.",
    color: "#4ADE80",
    glow: "rgba(74,222,128,0.15)",
    traits: ["Compassionate", "Driven", "Grounded"],
  },
  PERFORMER: {
    name: "The Performer",
    emoji: "✨",
    tagline: "You create experiences that change people.",
    color: "#F472B6",
    glow: "rgba(244,114,182,0.15)",
    traits: ["Creative", "Expressive", "Bold"],
  },
};

// ─────────────────────────────────────────────
// QUESTIONS (UNCHANGED)
// ─────────────────────────────────────────────
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
  Object.keys(ARCHETYPES).forEach((k) => (scores[k] = 0));

  answers.forEach((optIdx, qIdx) => {
    const w = QUESTIONS[qIdx].options[optIdx].w;
    Object.entries(w).forEach(([t, s]) => {
      scores[t] += s;
    });
  });

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

async function callAI(prompt) {
  const res = await fetch("/api/path", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  return await res.json();
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=DM+Sans:wght@400;500&display=swap');

*{box-sizing:border-box;margin:0;padding:0}

.pp{
min-height:100vh;
background:#080400;
color:#F5ECD7;
font-family:'DM Sans',sans-serif;
display:flex;
align-items:center;
justify-content:center;
padding:24px 20px;
overflow:hidden;
position:relative;
}

.pp:before{
content:'';
position:fixed;
top:-20%;
left:-10%;
width:55%;
height:55%;
border-radius:50%;
background:radial-gradient(circle,rgba(245,158,11,.08),transparent 70%);
pointer-events:none;
}

.pp:after{
content:'';
position:fixed;
bottom:-25%;
right:-15%;
width:50%;
height:50%;
border-radius:50%;
background:radial-gradient(circle,rgba(249,115,22,.05),transparent 70%);
pointer-events:none;
}

.wrap{width:100%;max-width:580px;position:relative;z-index:2}

.logo{
font-size:11px;
letter-spacing:.35em;
text-transform:uppercase;
color:rgba(245,158,11,.65);
margin-bottom:44px;
}

h1,h2{
font-family:'Fraunces',serif;
line-height:1.05;
letter-spacing:-.02em;
}

h1{
font-size:clamp(38px,9vw,62px);
margin-bottom:18px;
font-weight:900;
}

h2{
font-size:clamp(28px,6vw,44px);
margin-bottom:18px;
font-weight:700;
}

em{font-style:italic;color:#F59E0B}

.lead{
font-size:16px;
line-height:1.65;
color:rgba(245,236,215,.58);
margin-bottom:34px;
}

.btn{
width:100%;
padding:16px;
border:none;
cursor:pointer;
background:#F59E0B;
color:#080400;
font-weight:700;
letter-spacing:.06em;
text-transform:uppercase;
}

.btn2{
width:100%;
padding:16px;
border:1px solid rgba(245,236,215,.1);
background:rgba(245,236,215,.03);
color:#F5ECD7;
margin-top:10px;
text-align:left;
cursor:pointer;
}

.badge{
display:inline-block;
padding:7px 14px;
border-radius:999px;
font-size:12px;
margin-bottom:18px;
font-weight:700;
}

.card{
padding:18px;
border:1px solid rgba(245,236,215,.08);
background:rgba(245,236,215,.03);
margin-top:10px;
}

.label{
font-size:11px;
letter-spacing:.15em;
text-transform:uppercase;
opacity:.45;
margin-bottom:8px;
}

.bar{
display:flex;
gap:6px;
margin-bottom:30px;
}

.seg{
flex:1;
height:2px;
background:rgba(255,255,255,.08);
}

.seg.on{background:#F59E0B}
`;

export default function Page() {
  const [screen, setScreen] = useState("welcome");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [archKey, setArchKey] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("pp_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setArchKey(parsed.archKey);
        setResult(parsed.result);
      } catch {}
    }
  }, []);

  async function choose(i) {
    const next = [...answers, i];
    setAnswers(next);

    if (qIdx < QUESTIONS.length - 1) {
      setQIdx(qIdx + 1);
      return;
    }

    const key = calcArchetype(next);
    const arch = ARCHETYPES[key];

    setArchKey(key);
    setScreen("loading");

    const prompt = `
Builder Type: ${arch.name}

Return ONLY JSON:
{
 "path_title":"Custom title",
 "revelation":"Powerful insight",
 "skill_one":"Best skill",
 "skill_why":"Why now",
 "first_move":"48hr action",
 "first_offer":"7 day offer",
 "trap":"Main trap",
 "challenge":"30 day challenge"
}
`;

    let data = await callAI(prompt);

    if (!data.path_title) {
      data = {
        path_title: "Your Builder Path",
        revelation: "You have strong natural potential that grows through action.",
        skill_one: "Consistency",
        skill_why: "Repeated action compounds.",
        first_move: "Take one visible bold action this week.",
        first_offer: "Help one person solve one problem.",
        trap: "Waiting too long.",
        challenge: "30 days of consistent output.",
      };
    }

    localStorage.setItem(
      "pp_profile",
      JSON.stringify({
        archKey: key,
        result: data,
      })
    );

    setResult(data);
    setScreen("result");
  }

  function reset() {
    localStorage.removeItem("pp_profile");
    setAnswers([]);
    setQIdx(0);
    setArchKey(null);
    setResult(null);
    setScreen("welcome");
  }

  const arch = archKey ? ARCHETYPES[archKey] : null;

  return (
    <>
      <style>{CSS}</style>

      <div className="pp">
        <div className="wrap">

          {screen === "welcome" && (
            <>
              <div className="logo">PipuPath</div>
              <h1>
                Discover your<br /><em>builder path.</em>
              </h1>
              <p className="lead">
                5 questions. Your natural archetype revealed. A specific path forward.
              </p>

              {result ? (
                <>
                  <button className="btn" onClick={() => setScreen("result")}>
                    Continue Previous Path →
                  </button>
                  <button className="btn2" onClick={reset}>
                    Start Fresh
                  </button>
                </>
              ) : (
                <button className="btn" onClick={() => setScreen("quiz")}>
                  Begin Discovery →
                </button>
              )}
            </>
          )}

          {screen === "quiz" && (
            <>
              <div className="logo">PipuPath</div>

              <div className="bar">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className={`seg ${i <= qIdx ? "on" : ""}`} />
                ))}
              </div>

              <div className="lead" style={{marginBottom:"12px"}}>
                Question {qIdx + 1} of {QUESTIONS.length}
              </div>

              <h2>{QUESTIONS[qIdx].q}</h2>

              {QUESTIONS[qIdx].options.map((opt, i) => (
                <button key={i} className="btn2" onClick={() => choose(i)}>
                  {opt.text}
                </button>
              ))}
            </>
          )}

          {screen === "loading" && (
            <>
              <div className="logo">PipuPath</div>
              <h2>Mapping your <em>builder path...</em></h2>
            </>
          )}

          {screen === "result" && arch && result && (
            <>
              <div className="logo">PipuPath</div>

              <div
                className="badge"
                style={{
                  background: arch.glow,
                  color: arch.color,
                  border: `1px solid ${arch.color}55`,
                }}
              >
                {arch.emoji} {arch.name}
              </div>

              <h2>{result.path_title}</h2>

              <div className="card">
                <div className="label">Your Revelation</div>
                {result.revelation}
              </div>

              <div className="card">
                <div className="label">Skill To Build First</div>
                <strong>{result.skill_one}</strong>
                <div style={{marginTop:"8px"}}>{result.skill_why}</div>
              </div>

              <div className="card">
                <div className="label">First Move</div>
                {result.first_move}
              </div>

              <div className="card">
                <div className="label">First Offer</div>
                {result.first_offer}
              </div>

              <div className="card">
                <div className="label">Trap</div>
                {result.trap}
              </div>

              <div className="card">
                <div className="label">30 Day Challenge</div>
                {result.challenge}
              </div>

              <button className="btn" style={{marginTop:"16px"}} onClick={reset}>
                Start Again
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
}