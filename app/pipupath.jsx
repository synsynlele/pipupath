import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// 8 UNIVERSAL BUILDER ARCHETYPES
// Same in Lagos. Same in Tokyo. Same in São Paulo.
// ─────────────────────────────────────────────
const ARCHETYPES = {
  SOLVER: {
    name: "The Solver",
    emoji: "⚡",
    tagline: "You fix what others walk past.",
    color: "#F97316",
    glow: "rgba(249,115,22,0.15)",
    description: "Problems don't frustrate you — they fuel you. You cannot rest knowing something broken exists. Your instinct is to understand deeply, then act decisively.",
    traits: ["Analytical", "Relentless", "Resourceful"],
  },
  CONNECTOR: {
    name: "The Connector",
    emoji: "🌐",
    tagline: "People and ideas find their home through you.",
    color: "#10B981",
    glow: "rgba(16,185,129,0.15)",
    description: "You are a living bridge. Where others see strangers, you see potential partnerships. You build the networks that become the infrastructure of everything.",
    traits: ["Empathetic", "Influential", "Magnetic"],
  },
  MAKER: {
    name: "The Maker",
    emoji: "🔨",
    tagline: "Your hands and mind build what didn't exist.",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.15)",
    description: "Creation is not a choice for you — it's a compulsion. Physical things, digital things, designed things — you need to build to feel alive.",
    traits: ["Skilled", "Precise", "Patient"],
  },
  VOICE: {
    name: "The Voice",
    emoji: "🔥",
    tagline: "You make ideas move and people listen.",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.15)",
    description: "Words are your weapons and your medicine. You don't just share ideas — you make people feel them. Teaching, storytelling, writing: these are your tools of change.",
    traits: ["Articulate", "Persuasive", "Curious"],
  },
  MERCHANT: {
    name: "The Merchant",
    emoji: "💎",
    tagline: "You see value everywhere others see nothing.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.15)",
    description: "Exchange, trade, opportunity — these excite you. You naturally understand value flows and can find the deal where others see a dead end. Wealth is your language.",
    traits: ["Sharp", "Bold", "Strategic"],
  },
  ARCHITECT: {
    name: "The Architect",
    emoji: "🏛️",
    tagline: "You design systems before others see the need.",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.15)",
    description: "You think in structures, frameworks, and systems. Before others see the problem, you've drawn the blueprint. Order and strategy flow naturally from you.",
    traits: ["Strategic", "Visionary", "Disciplined"],
  },
  HEALER: {
    name: "The Healer",
    emoji: "🌱",
    tagline: "You build to reduce human pain.",
    color: "#4ADE80",
    glow: "rgba(74,222,128,0.15)",
    description: "Human suffering is not abstract to you — it's personal. You build because people are hurting and you cannot look away. Your work makes lives whole.",
    traits: ["Compassionate", "Driven", "Grounded"],
  },
  PERFORMER: {
    name: "The Performer",
    emoji: "✨",
    tagline: "You create experiences that change people.",
    color: "#F472B6",
    glow: "rgba(244,114,182,0.15)",
    description: "Life, culture, and emotion are your raw material. You build experiences that people carry inside them long after they leave. Art and impact are one and the same.",
    traits: ["Creative", "Expressive", "Bold"],
  },
};

// ─────────────────────────────────────────────
// DISCOVERY QUESTIONS
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

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function calcArchetype(answers) {
  const scores = {};
  Object.keys(ARCHETYPES).forEach((k) => (scores[k] = 0));
  answers.forEach((optIdx, qIdx) => {
    const w = QUESTIONS[qIdx].options[optIdx].w;
    Object.entries(w).forEach(([t, s]) => { scores[t] = (scores[t] || 0) + s; });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content[0].text;
  return JSON.parse(text.replace(/```json[\s\S]*?```|```/g, "").trim());
}

async function generatePath(archetypeKey, answers) {
  const arch = ARCHETYPES[archetypeKey];
  const qa = answers.map((optIdx, qIdx) => ({
    q: QUESTIONS[qIdx].q,
    a: QUESTIONS[qIdx].options[optIdx].text,
  }));

  return callClaude(`You are PipuPath — a clarity-to-action guide for builders worldwide.

Builder type detected: ${arch.name} — "${arch.tagline}"
Core description: ${arch.description}

Their discovery answers:
${qa.map((x, i) => `Q${i + 1}: ${x.q}\nAnswer: ${x.a}`).join("\n\n")}

Generate their personalized builder path. Return ONLY valid JSON, no markdown, no extra text:

{
  "path_title": "A specific evocative title for their personal path (e.g. 'The Community Systems Builder' or 'The Pattern-Breaking Merchant')",
  "revelation": "2 sentences of powerful insight about their natural wiring. Should feel like a mirror — something they've always known but never heard said clearly.",
  "skill_one": "The single most important skill for them to develop first — be specific",
  "skill_why": "One sentence explaining why this skill above all others right now",
  "first_move": "One concrete action they can take in the next 48 hours. Name exact platforms, people types, or actions. No vague advice.",
  "first_offer": "The simplest way they can create real value and potentially earn within 7 days. Be specific to their archetype.",
  "trap": "The most dangerous trap this builder type falls into. Be brutally honest. This should sting a little.",
  "challenge": "A specific 30-day challenge for their type that will prove something important to themselves"
}

Different answers must produce meaningfully different paths. Speak directly to who they actually are. No generic advice.`);
}

async function generateCheckin(archetypeKey, checkin, path) {
  const arch = ARCHETYPES[archetypeKey];
  return callClaude(`You are PipuPath — a clarity-to-action builder guide.

Builder: ${arch.name} — ${path.path_title}
Their original first move was: ${path.first_move}
Their 30-day challenge was: ${path.challenge}

Check-in report:
- What they tried: ${checkin.tried}
- What worked: ${checkin.worked}  
- Where they got stuck: ${checkin.stuck}

Return ONLY valid JSON, no markdown:

{
  "acknowledgment": "One sentence validating specifically what they did — not generic praise",
  "insight": "One sharp insight about what their results actually reveal about them as a builder",
  "adjustment": "One specific change to make this week based on what worked and what didn't",
  "next_move": "Their single most important next action — concrete and specific",
  "momentum": 7,
  "momentum_note": "One sentence explaining the momentum score"
}`);
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pp {
    min-height: 100vh;
    background: #080400;
    color: #F5ECD7;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 20px;
    position: relative;
    overflow: hidden;
  }

  .pp-bg-glow {
    position: fixed; pointer-events: none; border-radius: 50%;
  }
  .pp-bg-glow-1 {
    top: -20%; left: -10%; width: 55%; height: 55%;
    background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%);
  }
  .pp-bg-glow-2 {
    bottom: -25%; right: -15%; width: 50%; height: 50%;
    background: radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%);
  }

  .pp-wrap {
    width: 100%; max-width: 580px; position: relative; z-index: 1;
  }

  .pp-logo {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.35em; text-transform: uppercase;
    color: rgba(245,158,11,0.6);
    margin-bottom: 44px;
  }

  .pp-h1 {
    font-family: 'Fraunces', serif;
    font-weight: 900;
    font-size: clamp(38px, 9vw, 62px);
    line-height: 1.02;
    color: #F5ECD7;
    margin-bottom: 18px;
    letter-spacing: -0.02em;
  }
  .pp-h1 em { font-style: italic; color: #F59E0B; }

  .pp-h2 {
    font-family: 'Fraunces', serif;
    font-weight: 700;
    font-size: clamp(28px, 6vw, 44px);
    line-height: 1.1;
    color: #F5ECD7;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  .pp-h2 em { font-style: italic; color: #F59E0B; }

  .pp-lead {
    font-size: 16px; color: rgba(245,236,215,0.55);
    line-height: 1.65; margin-bottom: 36px;
  }

  .pp-btn {
    display: inline-block; background: #F59E0B; color: #080400;
    border: none; padding: 15px 36px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    cursor: pointer; border-radius: 2px;
    transition: background 0.2s, transform 0.15s;
  }
  .pp-btn:hover { background: #FCD34D; transform: translateY(-2px); }
  .pp-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .pp-btn-outline {
    display: inline-block; background: transparent;
    color: rgba(245,236,215,0.45);
    border: 1px solid rgba(245,236,215,0.12);
    padding: 12px 28px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
    letter-spacing: 0.05em;
    cursor: pointer; border-radius: 2px;
    transition: all 0.2s;
  }
  .pp-btn-outline:hover { border-color: rgba(245,236,215,0.35); color: #F5ECD7; }

  .pp-btns { display: flex; flex-direction: column; gap: 10px; }

  .pp-bar { display: flex; gap: 5px; margin-bottom: 36px; }
  .pp-bar-seg {
    height: 2px; flex: 1; border-radius: 2px;
    background: rgba(245,236,215,0.08);
    transition: background 0.4s;
  }
  .pp-bar-seg.done { background: rgba(245,158,11,0.35); }
  .pp-bar-seg.active { background: #F59E0B; }

  .pp-qnum {
    font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(245,236,215,0.25); margin-bottom: 20px;
  }

  .pp-question {
    font-family: 'Fraunces', serif; font-weight: 700;
    font-size: clamp(20px, 5vw, 28px); line-height: 1.35;
    color: #F5ECD7; margin-bottom: 28px;
  }

  .pp-opts { display: flex; flex-direction: column; gap: 10px; }

  .pp-opt {
    padding: 16px 18px;
    background: rgba(245,236,215,0.03);
    border: 1px solid rgba(245,236,215,0.09);
    border-radius: 3px; cursor: pointer;
    font-size: 14px; font-family: 'DM Sans', sans-serif;
    color: rgba(245,236,215,0.7); text-align: left;
    line-height: 1.5; transition: all 0.18s;
  }
  .pp-opt:hover { background: rgba(245,158,11,0.09); border-color: rgba(245,158,11,0.35); color: #F5ECD7; }
  .pp-opt.chosen { background: rgba(245,158,11,0.14); border-color: #F59E0B; color: #F5ECD7; }

  .pp-spin-wrap { text-align: center; padding: 40px 0; }
  .pp-spin {
    width: 44px; height: 44px; margin: 0 auto 28px;
    border: 2px solid rgba(245,158,11,0.2);
    border-top-color: #F59E0B;
    border-radius: 50%;
    animation: ppSpin 0.9s linear infinite;
  }
  @keyframes ppSpin { to { transform: rotate(360deg); } }

  .pp-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; border-radius: 100px;
    font-size: 12px; font-weight: 500; letter-spacing: 0.08em;
    text-transform: uppercase; margin-bottom: 20px;
  }

  .pp-traits { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 24px; }
  .pp-trait {
    padding: 3px 11px; border-radius: 100px;
    font-size: 11px; letter-spacing: 0.05em;
    color: rgba(245,236,215,0.5);
    background: rgba(245,236,215,0.05);
  }

  .pp-card {
    background: rgba(245,236,215,0.03);
    border: 1px solid rgba(245,236,215,0.08);
    border-radius: 4px; padding: 18px 20px; margin-bottom: 10px;
  }
  .pp-card-label {
    font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(245,236,215,0.35); margin-bottom: 8px;
  }
  .pp-card-body {
    font-size: 14px; line-height: 1.65; color: #F5ECD7;
  }
  .pp-card-body strong { color: #F59E0B; }
  .pp-card-body small {
    font-size: 13px; color: rgba(245,236,215,0.5); display: block; margin-top: 4px;
  }
  .pp-card.accent { border-left-width: 3px; }

  .pp-divider {
    height: 1px; background: rgba(245,236,215,0.07); margin: 28px 0;
  }

  .pp-scroll { max-height: 90vh; overflow-y: auto; scrollbar-width: none; }
  .pp-scroll::-webkit-scrollbar { display: none; }

  .pp-textarea {
    width: 100%; min-height: 80px;
    background: rgba(245,236,215,0.03);
    border: 1px solid rgba(245,236,215,0.09);
    border-radius: 3px; padding: 13px 15px;
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    color: #F5ECD7; resize: vertical; outline: none;
    transition: border-color 0.2s; margin-bottom: 10px;
    line-height: 1.5;
  }
  .pp-textarea:focus { border-color: rgba(245,158,11,0.4); }
  .pp-textarea::placeholder { color: rgba(245,236,215,0.25); }

  .pp-label {
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(245,236,215,0.35); margin-bottom: 7px; display: block;
  }

  .pp-momentum {
    font-family: 'Fraunces', serif; font-size: 48px; font-weight: 900;
    line-height: 1; color: #F59E0B;
  }

  .pp-in { animation: ppIn 0.38s ease both; }
  @keyframes ppIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pp-kaec {
    margin-top: 32px; font-size: 11px; letter-spacing: 0.08em;
    color: rgba(245,236,215,0.2); text-align: center;
  }
  .pp-kaec a { color: rgba(245,158,11,0.4); text-decoration: none; }
  .pp-kaec a:hover { color: rgba(245,158,11,0.7); }
`;

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
export default function PipuPath() {
  const [screen, setScreen] = useState("boot");
  const [qIdx, setQIdx]     = useState(0);
  const [answers, setAnswers] = useState([]);
  const [chosen, setChosen]   = useState(null);
  const [archKey, setArchKey] = useState(null);
  const [pathData, setPathData] = useState(null);
  const [checkin, setCheckin]   = useState({ tried: "", worked: "", stuck: "" });
  const [checkinRes, setCheckinRes] = useState(null);
  const [busy, setBusy]   = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const arch = archKey ? ARCHETYPES[archKey] : null;

  // Boot: check storage for returning user
  useEffect(() => {
    (async () => {
      try {
        const saved = await window.storage.get("pp_profile");
        if (saved) {
          const p = JSON.parse(saved.value);
          setArchKey(p.archKey);
          setPathData(p.pathData);
          setScreen("returning");
        } else {
          setScreen("welcome");
        }
      } catch {
        setScreen("welcome");
      }
    })();
  }, []);

  function go(s) { setAnimKey(k => k + 1); setScreen(s); }

  async function resetProfile() {
    try { await window.storage.delete("pp_profile"); } catch {}
    setArchKey(null); setPathData(null);
    setAnswers([]); setQIdx(0); setChosen(null);
    go("welcome");
  }

  function pickAnswer(optIdx) {
    setChosen(optIdx);
    setTimeout(async () => {
      const next = [...answers, optIdx];
      setAnswers(next);
      setChosen(null);

      if (qIdx < QUESTIONS.length - 1) {
        setQIdx(q => q + 1);
        setAnimKey(k => k + 1);
      } else {
        const key = calcArchetype(next);
        setArchKey(key);
        go("generating");
        try {
          const path = await generatePath(key, next);
          setPathData(path);
          await window.storage.set("pp_profile", JSON.stringify({ archKey: key, pathData: path }));
        } catch {}
        go("result");
      }
    }, 280);
  }

  async function submitCheckin() {
    if (!checkin.tried || !checkin.worked || !checkin.stuck) return;
    setBusy(true);
    try {
      const res = await generateCheckin(archKey, checkin, pathData);
      setCheckinRes(res);
      go("checkin_result");
    } catch {}
    setBusy(false);
  }

  // ── SCREENS ──────────────────────────────────

  const screens = {

    boot: (
      <div className="pp-spin-wrap">
        <div className="pp-spin" />
      </div>
    ),

    welcome: (
      <div className="pp-in" key={animKey}>
        <div className="pp-logo">PipuPath</div>
        <h1 className="pp-h1">Discover your<br /><em>builder path.</em></h1>
        <p className="pp-lead">
          5 questions. Your natural archetype revealed. A specific path forward — no matter where in the world you are.
        </p>
        <button className="pp-btn" onClick={() => go("questions")}>
          Begin Discovery →
        </button>
        <div className="pp-kaec">
          By <a href="https://www.kaec.com.ng" target="_blank" rel="noreferrer">KAEC Nigerian Schools</a> — Where Builders Are Raised
        </div>
      </div>
    ),

    returning: (
      <div className="pp-in" key={animKey}>
        <div className="pp-logo">PipuPath</div>
        {arch && (
          <div className="pp-badge" style={{ background: arch.glow, color: arch.color, border: `1px solid ${arch.color}40` }}>
            {arch.emoji} {arch.name}
          </div>
        )}
        <h2 className="pp-h2">
          Welcome back,<br /><em>{pathData?.path_title || arch?.name}</em>
        </h2>
        <p className="pp-lead">What have you built since we last spoke?</p>
        <div className="pp-btns">
          <button className="pp-btn" onClick={() => go("checkin")}>Check In Progress →</button>
          <button className="pp-btn-outline" onClick={() => go("result")}>View My Path</button>
          <button className="pp-btn-outline" onClick={resetProfile}>Start Fresh</button>
        </div>
      </div>
    ),

    questions: (
      <div className="pp-in" key={`q${qIdx}-${animKey}`}>
        <div className="pp-logo">PipuPath</div>
        <div className="pp-bar">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`pp-bar-seg ${i < qIdx ? "done" : i === qIdx ? "active" : ""}`} />
          ))}
        </div>
        <div className="pp-qnum">Question {qIdx + 1} of {QUESTIONS.length}</div>
        <div className="pp-question">{QUESTIONS[qIdx].q}</div>
        <div className="pp-opts">
          {QUESTIONS[qIdx].options.map((opt, i) => (
            <button key={i} className={`pp-opt ${chosen === i ? "chosen" : ""}`} onClick={() => pickAnswer(i)}>
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    ),

    generating: (
      <div className="pp-spin-wrap pp-in" key={animKey}>
        <div className="pp-logo">PipuPath</div>
        <div className="pp-spin" />
        <p style={{ fontSize: "13px", color: "rgba(245,236,215,0.35)", letterSpacing: "0.05em" }}>
          Mapping your builder path...
        </p>
      </div>
    ),

    result: arch ? (
      <div className="pp-scroll pp-in" key={animKey}>
        <div className="pp-logo" style={{ marginBottom: "28px" }}>PipuPath</div>

        <div className="pp-badge" style={{ background: arch.glow, color: arch.color, border: `1px solid ${arch.color}40` }}>
          {arch.emoji} {arch.name}
        </div>

        <h2 className="pp-h2" style={{ marginBottom: "10px" }}>
          {pathData?.path_title || arch.name}
        </h2>

        <div className="pp-traits">
          {arch.traits.map(t => <span key={t} className="pp-trait">{t}</span>)}
        </div>

        {pathData?.revelation && (
          <div className="pp-card accent" style={{ borderLeftColor: arch.color, marginBottom: "16px" }}>
            <div className="pp-card-label">Your Revelation</div>
            <div className="pp-card-body">{pathData.revelation}</div>
          </div>
        )}

        {pathData ? (
          <>
            <div className="pp-card">
              <div className="pp-card-label">Skill to Build First</div>
              <div className="pp-card-body">
                <strong>{pathData.skill_one}</strong>
                <small>{pathData.skill_why}</small>
              </div>
            </div>

            <div className="pp-card accent" style={{ borderLeftColor: arch.color }}>
              <div className="pp-card-label">Your First Move — 48 Hours</div>
              <div className="pp-card-body">{pathData.first_move}</div>
            </div>

            <div className="pp-card">
              <div className="pp-card-label">First Earning Opportunity — 7 Days</div>
              <div className="pp-card-body">{pathData.first_offer}</div>
            </div>

            <div className="pp-card" style={{ borderColor: "rgba(249,115,22,0.2)" }}>
              <div className="pp-card-label">⚠ Your Trap</div>
              <div className="pp-card-body" style={{ color: "rgba(245,236,215,0.65)" }}>{pathData.trap}</div>
            </div>

            <div className="pp-card">
              <div className="pp-card-label">30-Day Challenge</div>
              <div className="pp-card-body">{pathData.challenge}</div>
            </div>
          </>
        ) : (
          <div className="pp-card">
            <div className="pp-card-body">{arch.description}</div>
          </div>
        )}

        <div className="pp-divider" />
        <button className="pp-btn" style={{ width: "100%" }} onClick={() => go("checkin")}>
          Check In Progress →
        </button>
      </div>
    ) : null,

    checkin: (
      <div className="pp-in" key={animKey}>
        <div className="pp-logo">PipuPath</div>
        {arch && (
          <div className="pp-badge" style={{ background: arch.glow, color: arch.color, border: `1px solid ${arch.color}40`, marginBottom: "20px" }}>
            {arch.emoji} Builder Check-In
          </div>
        )}
        <h2 className="pp-h2" style={{ marginBottom: "8px" }}>
          Progress<br /><em>Check-In</em>
        </h2>
        <p className="pp-lead" style={{ marginBottom: "24px" }}>
          No judgment. Just honesty. This is how growth compounds.
        </p>

        <label className="pp-label">What did you actually try?</label>
        <textarea className="pp-textarea" rows={3}
          placeholder="What specific action did you take? Be concrete."
          value={checkin.tried}
          onChange={e => setCheckin(p => ({ ...p, tried: e.target.value }))} />

        <label className="pp-label">What worked?</label>
        <textarea className="pp-textarea" rows={3}
          placeholder="What got a response, showed movement, or surprised you?"
          value={checkin.worked}
          onChange={e => setCheckin(p => ({ ...p, worked: e.target.value }))} />

        <label className="pp-label">Where are you stuck?</label>
        <textarea className="pp-textarea" rows={3}
          placeholder="What blocked you or didn't work the way you expected?"
          value={checkin.stuck}
          onChange={e => setCheckin(p => ({ ...p, stuck: e.target.value }))} />

        <div className="pp-btns">
          <button className="pp-btn" onClick={submitCheckin} disabled={busy || !checkin.tried || !checkin.worked || !checkin.stuck}>
            {busy ? "Analyzing..." : "Get My Adjustment →"}
          </button>
          <button className="pp-btn-outline" onClick={() => go(pathData ? "returning" : "result")}>Back</button>
        </div>
      </div>
    ),

    checkin_result: (
      <div className="pp-scroll pp-in" key={animKey}>
        <div className="pp-logo" style={{ marginBottom: "28px" }}>PipuPath</div>

        <h2 className="pp-h2" style={{ marginBottom: "24px" }}>
          Your<br /><em>Adjustment</em>
        </h2>

        {checkinRes && (
          <>
            <div className="pp-card accent" style={{ borderLeftColor: arch?.color || "#F59E0B" }}>
              <div className="pp-card-label">Acknowledgment</div>
              <div className="pp-card-body">{checkinRes.acknowledgment}</div>
            </div>

            <div className="pp-card">
              <div className="pp-card-label">What Your Results Reveal</div>
              <div className="pp-card-body">{checkinRes.insight}</div>
            </div>

            <div className="pp-card">
              <div className="pp-card-label">This Week — Make This Change</div>
              <div className="pp-card-body">{checkinRes.adjustment}</div>
            </div>

            <div className="pp-card accent" style={{ borderLeftColor: arch?.color || "#F59E0B" }}>
              <div className="pp-card-label">Next Move</div>
              <div className="pp-card-body">{checkinRes.next_move}</div>
            </div>

            <div className="pp-card">
              <div className="pp-card-label">Momentum</div>
              <div className="pp-momentum">{checkinRes.momentum}<span style={{ fontSize: "20px", opacity: 0.4 }}>/10</span></div>
              <div className="pp-card-body" style={{ marginTop: "8px", color: "rgba(245,236,215,0.55)", fontSize: "13px" }}>
                {checkinRes.momentum_note}
              </div>
            </div>
          </>
        )}

        <div className="pp-divider" />
        <div className="pp-btns">
          <button className="pp-btn" onClick={() => {
            setCheckin({ tried: "", worked: "", stuck: "" });
            setCheckinRes(null);
            go("returning");
          }}>Back to My Path →</button>
        </div>
      </div>
    ),
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="pp">
        <div className="pp-bg-glow pp-bg-glow-1" />
        <div className="pp-bg-glow pp-bg-glow-2" />
        <div className="pp-wrap">
          {screens[screen] || screens.welcome}
        </div>
      </div>
    </>
  );
}
