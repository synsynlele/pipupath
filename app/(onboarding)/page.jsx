"use client";

import { useState } from "react";
import Link from "next/link";

const builderClasses = [

{
name:"🛠 Vision Builder",
description:"You enjoy creating ideas and turning them into something real."
},

{
name:"👑 Path Leader",
description:"You naturally help people move forward."
},

{
name:"🎨 Creator Builder",
description:"You enjoy expressing ideas and making new things."
},

{
name:"🧩 Problem Solver",
description:"You enjoy fixing things and finding solutions."
}

];

export default function OnboardingPage() {

const [future,setFuture]=useState("");
const [skill,setSkill]=useState("");
const [challenge,setChallenge]=useState("");

const [selectedClass,setSelectedClass]=useState("");

return (

<main className="min-h-screen bg-[#050816] text-white px-6 py-10">

<div className="max-w-5xl mx-auto">

{/* TOP */}

<div className="text-center">

<div className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2">

<span className="text-sm text-yellow-400">

⚡ Welcome Builder

</span>

</div>

<h1 className="mt-8 text-4xl md:text-6xl font-bold">

Your journey starts now.

</h1>

<p className="mt-6 text-slate-300 text-lg max-w-2xl mx-auto">

Answer a few quick quests so PipuPath can understand you and unlock your first journey.

</p>

</div>

{/* QUESTS */}

<div className="mt-16 space-y-8">

{/* QUEST 1 */}

<div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

<p className="text-yellow-400">

🎯 Quest 1

</p>

<h2 className="mt-3 text-2xl font-semibold">

Imagine your future

</h2>

<p className="mt-3 text-slate-300">

What kind of life would make you excited to wake up every day?

</p>

<textarea
value={future}
onChange={(e)=>setFuture(e.target.value)}
placeholder="Write anything..."
className="w-full mt-6 rounded-2xl bg-black/20 border border-white/10 p-5 outline-none"
/>

</div>

{/* QUEST 2 */}

<div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

<p className="text-yellow-400">

⚡ Quest 2

</p>

<h2 className="mt-3 text-2xl font-semibold">

What would you love to improve?

</h2>

<input
value={skill}
onChange={(e)=>setSkill(e.target.value)}
placeholder="Confidence, money, leadership..."
className="w-full mt-6 rounded-2xl bg-black/20 border border-white/10 p-5 outline-none"
/>

</div>

{/* QUEST 3 */}

<div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

<p className="text-yellow-400">

🧩 Quest 3

</p>

<h2 className="mt-3 text-2xl font-semibold">

What feels hardest right now?

</h2>

<textarea
value={challenge}
onChange={(e)=>setChallenge(e.target.value)}
placeholder="Write honestly..."
className="w-full mt-6 rounded-2xl bg-black/20 border border-white/10 p-5 outline-none"
/>

</div>

{/* CLASS SELECTION */}

<div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

<p className="text-yellow-400">

⚔ Choose Your Builder Class

</p>

<h2 className="mt-3 text-2xl font-semibold">

Which feels most like you?

</h2>

<div className="grid md:grid-cols-2 gap-5 mt-8">

{builderClasses.map((item)=>(

<button

key={item.name}

onClick={()=>setSelectedClass(item.name)}

className={`

text-left
rounded-3xl
p-6
border
transition-all

${selectedClass===item.name

? "border-yellow-400 bg-yellow-400/10"

: "border-white/10 bg-black/20"}

`}

>

<h3 className="font-semibold text-lg">

{item.name}

</h3>

<p className="mt-3 text-sm text-slate-300">

{item.description}

</p>

</button>

))}

</div>

</div>

</div>

{/* BUTTON */}

<div className="mt-12 text-center">

<Link

href="/onboarding/identity"

className="

inline-flex
rounded-2xl
px-10
py-5
bg-yellow-500
text-black
font-bold
shadow-[0_10px_40px_rgba(234,179,8,.30)]

"

>

Unlock My Path ⚡

</Link>

</div>

</div>

</main>

);

}