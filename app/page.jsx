"use client";
import { useState, useEffect } from "react";

const TYPES = {
  SOLVER: {
    name: "The Solver",
    emoji: "⚡",
    desc: "You naturally solve broken things and attack problems directly."
  },
  CONNECTOR: {
    name: "The Connector",
    emoji: "🌐",
    desc: "You create value through people, networks and relationships."
  },
  MAKER: {
    name: "The Maker",
    emoji: "🔨",
    desc: "You love building things from ideas into reality."
  },
  VOICE: {
    name: "🔥 The Voice",
    emoji: "🔥",
    desc: "You move people through words, teaching and influence."
  }
};

const QUESTIONS = [
  {
    q: "When something is broken, what do you do?",
    a: [
      ["Fix it myself", "SOLVER"],
      ["Find people to help", "CONNECTOR"],
      ["Build a better version", "MAKER"],
      ["Talk about it publicly", "VOICE"]
    ]
  },
  {
    q: "What gives you energy most?",
    a: [
      ["Hard problems", "SOLVER"],
      ["Meeting people", "CONNECTOR"],
      ["Creating things", "MAKER"],
      ["Sharing ideas", "VOICE"]
    ]
  },
  {
    q: "What future sounds best?",
    a: [
      ["Systems solving big issues", "SOLVER"],
      ["Strong communities", "CONNECTOR"],
      ["Products people use", "MAKER"],
      ["Changing minds globally", "VOICE"]
    ]
  }
];

export default function Home() {
  const [step, setStep] = useState("start");
  const [q, setQ] = useState(0);
  const [score, setScore] = useState({});
  const [result, setResult] = useState(null);

  function choose(type) {
    const next = { ...score, [type]: (score[type] || 0) + 1 };
    setScore(next);

    if (q < QUESTIONS.length - 1) {
      setQ(q + 1);
    } else {
      let top = Object.keys(next).sort((a, b) => next[b] - next[a])[0];
      setResult(TYPES[top]);
      localStorage.setItem("pipu", JSON.stringify(TYPES[top]));
      setStep("result");
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem("pipu");
    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  return (
    <main style={{
      minHeight:"100vh",
      background:"#050300",
      color:"#fff",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding:"30px"
    }}>
      <div style={{maxWidth:"600px",width:"100%"}}>
        
        {step==="start" && (
          <>
            <h1 style={{fontSize:"55px"}}>PipuPath</h1>
            <p style={{opacity:.7,fontSize:"20px"}}>
              Discover the path you are built for.
            </p>
            <button onClick={()=>setStep("quiz")}
              style={btn}>
              Start Discovery
            </button>
          </>
        )}

        {step==="quiz" && (
          <>
            <h2>{QUESTIONS[q].q}</h2>
            {QUESTIONS[q].a.map((x,i)=>(
              <button key={i}
                onClick={()=>choose(x[1])}
                style={btn2}>
                {x[0]}
              </button>
            ))}
          </>
        )}

        {step==="result" && result && (
          <>
            <h1>{result.emoji} {result.name}</h1>
            <p style={{fontSize:"20px",opacity:.8}}>
              {result.desc}
            </p>

            <button
              style={btn}
              onClick={()=>{
                localStorage.removeItem("pipu");
                location.reload();
              }}>
              Start Again
            </button>
          </>
        )}
      </div>
    </main>
  );
}

const btn = {
  marginTop:"20px",
  padding:"15px 25px",
  background:"#f59e0b",
  color:"#000",
  border:"none",
  cursor:"pointer",
  fontSize:"18px"
};

const btn2 = {
  display:"block",
  width:"100%",
  marginTop:"15px",
  padding:"15px",
  background:"#111",
  color:"#fff",
  border:"1px solid #333",
  cursor:"pointer",
  textAlign:"left",
  fontSize:"17px"
};