"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useProfileStore from "@/stores/profileStore";

const builderClasses=[

{
name:"🛠 Vision Builder",
description:"You enjoy creating ideas and turning them into reality."
},

{
name:"👑 Path Leader",
description:"You naturally help people move forward."
},

{
name:"🎨 Creator Builder",
description:"You enjoy making and expressing ideas."
},

{
name:"🧩 Problem Solver",
description:"You enjoy fixing problems."
}

];

export default function OnboardingPage(){

const router=useRouter();

const {setBuilderProfile}=useProfileStore();

const [future,setFuture]=useState("");
const [skill,setSkill]=useState("");
const [challenge,setChallenge]=useState("");
const [selectedClass,setSelectedClass]=useState("");

function handleContinue(){

if(
!future.trim() ||
!skill.trim() ||
!challenge.trim() ||
!selectedClass
){

alert(
"Please complete all quests before continuing ⚡"
);

return;

}

setBuilderProfile({

identity:selectedClass,

summary:
`You want ${future}. You are interested in growing ${skill}.`,

executionStyle:
"You grow best through small actions repeated consistently.",

strengths:[

skill,
"Curiosity",
"Growth mindset"

],

risks:[

challenge

],

builderPaths:[

"Build projects",
"Create things",
"Solve problems"

],

nextFocus:

`Take one small action towards improving ${skill}`

});

router.push(
"/onboarding/identity"
);

}

return(

<main className="min-h-screen bg-[#050816] text-white px-6 py-10">

<div className="max-w-5xl mx-auto">

<div className="text-center">

<div className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2">

<span className="text-yellow-400">

⚡ Welcome Builder

</span>

</div>

<h1 className="mt-8 text-5xl font-bold">

Your journey starts now

</h1>

<p className="mt-6 text-slate-300">

Answer every quest to unlock your identity.

</p>

</div>

<div className="mt-16 space-y-8">

<div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

<p className="text-yellow-400">

🎯 Quest 1

</p>

<h2 className="mt-3 text-2xl font-semibold">

Imagine your future

</h2>

<textarea
value={future}
onChange={(e)=>setFuture(e.target.value)}
placeholder="Describe the future you want..."
className="w-full mt-6 rounded-2xl bg-black/20 border border-white/10 p-5"
/>

</div>

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
className="w-full mt-6 rounded-2xl bg-black/20 border border-white/10 p-5"
/>

</div>

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
className="w-full mt-6 rounded-2xl bg-black/20 border border-white/10 p-5"
/>

</div>

<div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

<h2 className="text-2xl font-semibold">

⚔ Choose Your Builder Class

</h2>

<div className="grid md:grid-cols-2 gap-5 mt-8">

{builderClasses.map((item)=>(

<button

key={item.name}

onClick={()=>setSelectedClass(item.name)}

className={`
rounded-3xl
p-6
text-left
border

${selectedClass===item.name

? "border-yellow-400 bg-yellow-400/10"

: "border-white/10 bg-black/20"}

`}

>

<h3 className="font-semibold">

{item.name}

</h3>

<p className="mt-3 text-slate-300 text-sm">

{item.description}

</p>

</button>

))}

</div>

</div>

</div>

<button

onClick={handleContinue}

className="
mt-10
rounded-2xl
bg-yellow-500
px-10
py-5
font-bold
text-black
"

>

Unlock My Path ⚡

</button>

</div>

</main>

);

}