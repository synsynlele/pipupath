"use client";

import { useState, useEffect } from "react";

const ARCHETYPES = {
  SOLVER: {
    name: "The Solver",
    emoji: "⚡",
    tagline: "You fix what others walk past.",
    color: "#F97316",
    description:
      "Problems don't frustrate you — they fuel you. You naturally attack broken systems."
  },
  CONNECTOR: {
    name: "The Connector",
    emoji: "🌐",
    tagline: "People and ideas find their home through you.",
    color: "#10B981",
    description:
      "You build through relationships, trust, and networks."
  },
  MAKER: {
    name: "The Maker",
    emoji: "🔨",
    tagline: "Your hands and mind build what didn't exist.",
    color: "#A78BFA",
    description:
      "You turn imagination into reality."
  },
  VOICE: {
    name: "The Voice",
    emoji: "🔥",
    tagline: "You make ideas move and people listen.",
    color: "#FBBF24",
    description:
      "Words are your leverage. You influence minds and movement."
  },
  MERCHANT: {
    name: "The Merchant",
    emoji: "💎",
    tagline: "You see value where others see nothing.",
    color: "#F59E0B",
    description:
      "You understand opportunity, exchange, and wealth creation."
  },
  ARCHITECT: {
    name: "The Architect",
    emoji: "🏛️",
    tagline: "You design systems before others see the need.",
    color: "#38BDF8",
    description:
      "You think in structures, systems, and scalable models."
  },
  HEALER: {
    name: "The Healer",
    emoji: "🌱",
    tagline: "You build to reduce human pain.",
    color: "#4ADE80",
    description:
      "You are motivated by helping people heal and thrive."
  },
  PERFORMER: {
    name: "The Performer",
    emoji: "✨",
    tagline: "You create experiences that change people.",
    color: "#F472B6",
    description:
      "You move culture through expression and presence."
  }
};

const QUESTIONS = [
  {
    q: "When you see something broken or missing in the world, your first instinct is:",
    options: [
      { text: "Break it apart and fix it yourself", w: { SOLVER: 3, ARCHITECT: 1 } },
      { text: "Find others who care about it too", w: { CONNECTOR: 3, HEALER: 1 } },
      { text: "Build something that solves it permanently", w: { MAKER: 3, SOLVER: 1 } },
      { text: "Talk or write about it until people pay attention", w: { VOICE: 3, PERFORMER: 1 } }
    ]
  },
  {
    q: "What kind of work makes you lose track of time?",
    options: [
      { text: "Creating or crafting something from nothing", w: { MAKER: 3, PERFORMER: 1 } },
      { text: "Deep conversations and building relationships", w: { CONNECTOR: 3, HEALER: 1 } },
      { text: "Spotting an opportunity and making it real", w: { MERCHANT: 3, SOLVER: 1 } },
      { text: "Teaching, explaining, helping someone understand", w: { VOICE: 3, HEALER: 1 } }
    ]
  },
  {
    q: "What frustrates you most about the world right now?",
    options: [
      { text: "Things are broken and inefficient when they don't need to be", w: { SOLVER: 3, ARCHITECT: 2 } },
      { text: "People are isolated with no support or community", w: { HEALER: 3, CONNECTOR: 2 } },
      { text: "Good talent and ideas die without direction", w: { ARCHITECT: 2, MERCHANT: 2 } },
      { text: "Important truths are not being told or heard", w: { VOICE: 3, PERFORMER: 2 } }
    ]
  },
  {
    q: "In 10 years, what does your greatest impact look like?",
    options: [
      { text: "A product or system millions of people depend on", w: { SOLVER: 2, MAKER: 2, ARCHITECT: 2 } },
      { text: "A movement or community that changed lives together", w: { CONNECTOR: 3, HEALER: 2 } },
      { text: "A business that generates real wealth and employs people", w: { MERCHANT: 3, ARCHITECT: 1 } },
      { text: "Work — art, ideas, stories — that changed how people think", w: { VOICE: 2, PERFORMER: 3 } }
    ]
  },
  {
    q: "When you imagine yourself at your absolute best, you are:",
    options: [
      { text: "Deep in a hard problem, finally cracking it", w: { SOLVER: 3, MAKER: 1 } },
      { text: "In a room of people who trust and follow your lead", w: { CONNECTOR: 2, ARCHITECT: 1, MERCHANT: 1 } },
      { text: "Creating something with total focus and flow", w: { MAKER: 3, PERFORMER: 2 } },
      { text: "Sitting with someone who needs help — and actually helping", w: { HEALER: 3, VOICE: 1 } }
    ]
  }
];

function calcArchetype(answers) {
  const scores = {};
  Object.keys(ARCHETYPES).forEach((k) => (scores[k] = 0));

  answers.forEach((optIdx, qIdx) => {
    const weights = QUESTIONS[qIdx].options[optIdx].w;
    Object.entries(weights).forEach(([type, val]) => {
      scores[type] += val;
    });
  });

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

async function generateAI(payload) {
  const res = await fetch("/api/path", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return await res.json();
}

export default function Home() {
  const [screen, setScreen] = useState("boot");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pipupath_result");
    if (saved) {
      setResult(JSON.parse(saved));
      setScreen("result");
    } else {
      setScreen("welcome");
    }
  }, []);

  async function chooseAnswer(i) {
    const next = [...answers, i];
    setAnswers(next);

    if (qIdx < QUESTIONS.length - 1) {
      setQIdx(qIdx + 1);
      return;
    }

    setBusy(true);
    setScreen("loading");

    const archetypeKey = calcArchetype(next);
    const archetype = ARCHETYPES[archetypeKey];

    const data = await generateAI({
      archetype,
      answers: next.map((x, idx) => ({
        question: QUESTIONS[idx].q,
        answer: QUESTIONS[idx].options[x].text
      }))
    });

    const finalData = { ...data, archetype };
    localStorage.setItem("pipupath_result", JSON.stringify(finalData));
    setResult(finalData);
    setBusy(false);
    setScreen("result");
  }

  function reset() {
    localStorage.removeItem("pipupath_result");
    setAnswers([]);
    setQIdx(0);
    setResult(null);
    setScreen("welcome");
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#080400",
      color: "#F5ECD7",
      padding: "30px",
      fontFamily: "Arial"
    }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>

        {screen === "welcome" && (
          <>
            <h1 style={{ fontSize: "52px" }}>PipuPath</h1>
            <p>Discover your builder path.</p>
            <button onClick={() => setScreen("quiz")}>Begin Discovery</button>
          </>
        )}

        {screen === "quiz" && (
          <>
            <h2>{QUESTIONS[qIdx].q}</h2>
            {QUESTIONS[qIdx].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => chooseAnswer(i)}
                style={{ display: "block", marginTop: "12px", width: "100%" }}
              >
                {opt.text}
              </button>
            ))}
          </>
        )}

        {screen === "loading" && (
          <>
            <h2>Generating your path...</h2>
          </>
        )}

        {screen === "result" && result && (
          <>
            <h1>{result.archetype.emoji} {result.archetype.name}</h1>
            <p>{result.title}</p>
            <p>{result.revelation}</p>

            <h3>First Skill</h3>
            <p>{result.skill}</p>

            <h3>First Move</h3>
            <p>{result.move}</p>

            <h3>7-Day Offer</h3>
            <p>{result.offer}</p>

            <h3>Trap</h3>
            <p>{result.trap}</p>

            <button onClick={reset}>Start Again</button>
          </>
        )}

      </div>
    </main>
  );
}