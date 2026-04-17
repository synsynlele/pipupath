"use client";

import { useState, useEffect } from "react";

const ARCHETYPES = {
  SOLVER: {
    name: "The Solver",
    emoji: "⚡",
    tagline: "You fix what others walk past.",
    color: "#F97316",
    glow: "rgba(249,115,22,0.15)",
    description:
      "Problems don't frustrate you — they fuel you. You cannot rest knowing something broken exists.",
    traits: ["Analytical", "Relentless", "Resourceful"],
  },
  CONNECTOR: {
    name: "The Connector",
    emoji: "🌐",
    tagline: "People and ideas find their home through you.",
    color: "#10B981",
    glow: "rgba(16,185,129,0.15)",
    description:
      "You build through trust, people, and networks.",
    traits: ["Empathetic", "Influential", "Magnetic"],
  },
  MAKER: {
    name: "The Maker",
    emoji: "🔨",
    tagline: "Your hands and mind build what didn't exist.",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.15)",
    description:
      "Creation is your instinct. You turn ideas into reality.",
    traits: ["Skilled", "Precise", "Patient"],
  },
  VOICE: {
    name: "The Voice",
    emoji: "🔥",
    tagline: "You make ideas move and people listen.",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.15)",
    description:
      "Words are your leverage.",
    traits: ["Articulate", "Persuasive", "Curious"],
  },
  MERCHANT: {
    name: "The Merchant",
    emoji: "💎",
    tagline: "You see value everywhere others see nothing.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.15)",
    description:
      "You understand value, trade, and opportunity.",
    traits: ["Sharp", "Bold", "Strategic"],
  },
  ARCHITECT: {
    name: "The Architect",
    emoji: "🏛️",
    tagline: "You design systems before others see the need.",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.15)",
    description:
      "You think in scalable systems.",
    traits: ["Strategic", "Visionary", "Disciplined"],
  },
  HEALER: {
    name: "The Healer",
    emoji: "🌱",
    tagline: "You build to reduce human pain.",
    color: "#4ADE80",
    glow: "rgba(74,222,128,0.15)",
    description:
      "You care deeply about helping people thrive.",
    traits: ["Compassionate", "Driven", "Grounded"],
  },
  PERFORMER: {
    name: "The Performer",
    emoji: "✨",
    tagline: "You create experiences that change people.",
    color: "#F472B6",
    glow: "rgba(244,114,182,0.15)",
    description:
      "You move people emotionally and culturally.",
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
  Object.keys(ARCHETYPES).forEach((k) => (scores[k] = 0));

  answers.forEach((optIdx, qIdx) => {
    const w = QUESTIONS[qIdx].options[optIdx].w;
    Object.entries(w).forEach(([type, val]) => {
      scores[type] += val;
    });
  });

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

async function askAI(prompt) {
  const res = await fetch("/api/path", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  return await res.json();
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{margin:0}
.pp{
min-height:100vh;
background:#080400;
color:#F5ECD7;
font-family:Arial,sans-serif;
display:flex;
justify-content:center;
padding:30px 20px;
}
.pp-wrap{width:100%;max-width:620px}
.pp-logo{font-size:12px;letter-spacing:.35em;color:rgba(245,158,11,.6);margin-bottom:30px}
.pp-h1{font-size:54px;line-height:1.05;margin-bottom:14px}
.pp-h2{font-size:38px;line-height:1.1;margin-bottom:16px}
.pp-lead{opacity:.7;line-height:1.6;margin-bottom:28px}
.pp-btn{
width:100%;
padding:15px;
border:none;
cursor:pointer;
background:#F59E0B;
color:#080400;
font-weight:700;
margin-top:12px;
}
.pp-btn-outline{
width:100%;
padding:15px;
border:1px solid rgba(255,255,255,.12);
background:transparent;
color:#F5ECD7;
margin-top:12px;
cursor:pointer;
}
.pp-opt{
width:100%;
padding:16px;
margin-top:10px;
text-align:left;
background:rgba(255,255,255,.03);
color:#F5ECD7;
border:1px solid rgba(255,255,255,.08);
cursor:pointer;
}
.pp-card{
padding:18px;
margin-top:12px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
}
.pp-small{opacity:.6;font-size:13px;margin-bottom:6px}
.pp-badge{margin-bottom:18px;font-weight:700}
`;

export default function Page() {
  const [screen, setScreen] = useState("boot");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [archKey, setArchKey] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("pp_profile");
    if (saved) {
      const data = JSON.parse(saved);
      setArchKey(data.archKey);
      setResult(data.result);
      setScreen("result");
    } else {
      setScreen("welcome");
    }
  }, []);

  async function pickAnswer(i) {
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
Tagline: ${arch.tagline}

Answers:
${next.map((x, idx) => `${idx + 1}. ${QUESTIONS[idx].q} => ${QUESTIONS[idx].options[x].text}`).join("\n")}

Return only JSON:

{
 "path_title":"Custom path title",
 "revelation":"2 sentence insight",
 "skill_one":"Best skill now",
 "skill_why":"Why this skill",
 "first_move":"Best next move in 48 hours",
 "first_offer":"Simple value offer in 7 days",
 "trap":"Biggest trap",
 "challenge":"30 day challenge"
}
`;

    const ai = await askAI(prompt);

    localStorage.setItem(
      "pp_profile",
      JSON.stringify({
        archKey: key,
        result: ai,
      })
    );

    setResult(ai);
    setScreen("result");
  }

  function reset() {
    localStorage.removeItem("pp_profile");
    setAnswers([]);
    setQIdx(0);
    setResult(null);
    setArchKey(null);
    setScreen("welcome");
  }

  const arch = archKey ? ARCHETYPES[archKey] : null;

  return (
    <>
      <style>{CSS}</style>

      <div className="pp">
        <div className="pp-wrap">

          {screen === "welcome" && (
            <>
              <div className="pp-logo">PIPUPATH</div>
              <h1 className="pp-h1">Discover your builder path.</h1>
              <p className="pp-lead">
                5 questions. Your natural archetype revealed. A specific path forward.
              </p>
              <button className="pp-btn" onClick={() => setScreen("quiz")}>
                Begin Discovery →
              </button>
            </>
          )}

          {screen === "quiz" && (
            <>
              <div className="pp-logo">PIPUPATH</div>
              <div className="pp-small">
                Question {qIdx + 1} of {QUESTIONS.length}
              </div>
              <h2 className="pp-h2">{QUESTIONS[qIdx].q}</h2>

              {QUESTIONS[qIdx].options.map((opt, i) => (
                <button
                  key={i}
                  className="pp-opt"
                  onClick={() => pickAnswer(i)}
                >
                  {opt.text}
                </button>
              ))}
            </>
          )}

          {screen === "loading" && (
            <>
              <div className="pp-logo">PIPUPATH</div>
              <h2 className="pp-h2">Mapping your builder path...</h2>
            </>
          )}

          {screen === "result" && result && arch && (
            <>
              <div className="pp-logo">PIPUPATH</div>

              <div className="pp-badge">
                {arch.emoji} {arch.name}
              </div>

              <h2 className="pp-h2">{result.path_title}</h2>

              <div className="pp-card">
                <div className="pp-small">Your Revelation</div>
                {result.revelation}
              </div>

              <div className="pp-card">
                <div className="pp-small">Skill To Build First</div>
                <strong>{result.skill_one}</strong>
                <div style={{ marginTop: 8 }}>{result.skill_why}</div>
              </div>

              <div className="pp-card">
                <div className="pp-small">Your First Move</div>
                {result.first_move}
              </div>

              <div className="pp-card">
                <div className="pp-small">First Earning Opportunity</div>
                {result.first_offer}
              </div>

              <div className="pp-card">
                <div className="pp-small">Your Trap</div>
                {result.trap}
              </div>

              <div className="pp-card">
                <div className="pp-small">30 Day Challenge</div>
                {result.challenge}
              </div>

              <button className="pp-btn" onClick={reset}>
                Start Again
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
}