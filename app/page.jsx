"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

const QUESTIONS = [
  {
    q: "When you see something broken or missing in the world, your first instinct is:",
    options: [
      "Break it apart and fix it yourself",
      "Find others who care about it too",
      "Build something that solves it permanently",
      "Talk or write about it until people pay attention"
    ]
  },
  {
    q: "What kind of work makes you lose track of time?",
    options: [
      "Creating or crafting something from nothing",
      "Deep conversations and building relationships",
      "Spotting an opportunity and making it real",
      "Teaching, explaining, helping someone understand"
    ]
  },
  {
    q: "What frustrates you most about the world right now?",
    options: [
      "Things are broken and inefficient when they don't need to be",
      "People are isolated with no support or community",
      "Good talent and ideas die without direction",
      "Important truths are not being told or heard"
    ]
  },
  {
    q: "In 10 years, what does your greatest impact look like?",
    options: [
      "A product or system millions of people depend on",
      "A movement or community that changed lives together",
      "A business that generates real wealth and employs people",
      "Work — art, ideas, stories — that changed how people think"
    ]
  },
  {
    q: "When you imagine yourself at your absolute best, you are:",
    options: [
      "Deep in a hard problem, finally cracking it",
      "In a room of people who trust and follow your lead",
      "Creating something with total focus and flow",
      "Sitting with someone who needs help — and actually helping"
    ]
  }
];

export default function Home() {
  const [screen, setScreen] = useState("welcome");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const [showSave, setShowSave] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  function choose(option) {
    const next = [...answers, option];
    setAnswers(next);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      generateResult(next);
    }
  }

  async function generateResult(finalAnswers) {
    setBusy(true);
    setScreen("loading");

    const prompt = `
User answers:
${finalAnswers.join(", ")}

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
`;

    const res = await fetch("/api/path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    setResult(data);
    setBusy(false);
    setScreen("result");
  }

  async function saveLead() {
    if (!name.trim() || !email.trim()) {
      alert("Enter name and email.");
      return;
    }

    await supabase.from("leads").insert([
      {
        name,
        email,
        archetype: "builder",
        answers,
        result
      }
    ]);

    setSaved(true);
  }

  function restart() {
    setScreen("welcome");
    setStep(0);
    setAnswers([]);
    setResult(null);
    setBusy(false);
    setShowSave(false);
    setName("");
    setEmail("");
    setSaved(false);
  }

  return (
    <div style={wrap}>
      <div style={inner}>

        <div style={logo}>PIPUPATH</div>

        {screen === "welcome" && (
          <>
            <h1 style={h1}>Discover your builder path.</h1>
            <p style={lead}>
              5 questions. Get a personalized growth path instantly.
            </p>

            <button style={btn} onClick={() => setScreen("quiz")}>
              Begin Discovery →
            </button>
          </>
        )}

        {screen === "quiz" && (
          <>
            <div style={small}>
              Question {step + 1} of {QUESTIONS.length}
            </div>

            <h2 style={h2}>{QUESTIONS[step].q}</h2>

            {QUESTIONS[step].options.map((o, i) => (
              <button key={i} style={opt} onClick={() => choose(o)}>
                {o}
              </button>
            ))}
          </>
        )}

        {screen === "loading" && (
          <>
            <h2 style={h2}>Generating your path...</h2>
          </>
        )}

        {screen === "result" && result && (
          <>
            <h2 style={h2}>{result.path_title}</h2>

            {card("Revelation", result.revelation)}
            {card("Skill", result.skill_one + " — " + result.skill_why)}
            {card("First Move", result.first_move)}
            {card("First Offer", result.first_offer)}
            {card("Trap", result.trap)}
            {card("30 Day Challenge", result.challenge)}

            {!showSave && !saved && (
              <button style={btn} onClick={() => setShowSave(true)}>
                Save My Path →
              </button>
            )}

            {showSave && !saved && (
              <div style={box}>
                <div style={small}>Save progress + receive future upgrades</div>

                <input
                  style={input}
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  style={input}
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button style={btn} onClick={saveLead}>
                  Save My Path →
                </button>
              </div>
            )}

            {saved && (
              <div style={box}>
                Your path has been saved successfully.
              </div>
            )}

            <button style={ghost} onClick={restart}>
              Start Again
            </button>
          </>
        )}

      </div>
    </div>
  );
}

const wrap = {
  minHeight: "100vh",
  background: "#080400",
  color: "#F5ECD7",
  padding: "30px",
  fontFamily: "Arial"
};

const inner = {
  maxWidth: "720px",
  margin: "0 auto"
};

const logo = {
  color: "#F59E0B",
  letterSpacing: ".35em",
  fontSize: "12px",
  marginBottom: "24px"
};

const h1 = {
  fontSize: "56px",
  marginBottom: "18px"
};

const h2 = {
  fontSize: "38px",
  marginBottom: "18px"
};

const lead = {
  opacity: .75,
  lineHeight: 1.6,
  marginBottom: "24px"
};

const small = {
  opacity: .55,
  marginBottom: "10px",
  fontSize: "12px"
};

const btn = {
  width: "100%",
  padding: "16px",
  background: "#F59E0B",
  color: "#080400",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "12px"
};

const ghost = {
  width: "100%",
  padding: "16px",
  background: "transparent",
  color: "#F5ECD7",
  border: "1px solid #ffffff12",
  cursor: "pointer",
  marginTop: "12px"
};

const opt = {
  width: "100%",
  padding: "16px",
  textAlign: "left",
  background: "#ffffff08",
  color: "#F5ECD7",
  border: "1px solid #ffffff12",
  marginBottom: "10px",
  cursor: "pointer"
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "10px",
  background: "#ffffff08",
  color: "#F5ECD7",
  border: "1px solid #ffffff12"
};

const box = {
  padding: "16px",
  marginTop: "14px",
  background: "#ffffff08",
  border: "1px solid #ffffff12"
};

function card(title, body) {
  return (
    <div style={{
      padding: "16px",
      marginBottom: "10px",
      background: "#ffffff08",
      border: "1px solid #ffffff12"
    }}>
      <div style={{
        opacity: .55,
        fontSize: "12px",
        marginBottom: "8px"
      }}>
        {title}
      </div>
      <div>{body}</div>
    </div>
  );
}