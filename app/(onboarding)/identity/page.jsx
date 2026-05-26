"use client";

import Link from "next/link";

export default function IdentityPage() {

const identity={

name:"🛠 Vision Builder",

summary:
"You enjoy creating ideas and imagining things that could become real. You care about building something meaningful and making a difference.",

strengths:[

"Creative thinking",

"Big ideas",

"Curiosity",

"Leadership potential"

],

watchOut:[

"Too many ideas at once",

"Overthinking",

"Difficulty starting"

],

quests:[

"Build projects",

"Create content",

"Solve problems",

"Lead people"

]

};

return(

<main className="min-h-screen bg-[#050816] text-white px-6 py-10">

<div className="max-w-5xl mx-auto">

{/* TOP */}

<div className="text-center">

<div className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2">

<span className="text-sm text-yellow-400">

⚔ Identity Unlocked

</span>

</div>

<h1 className="mt-8 text-5xl font-bold">

{identity.name}

</h1>

<p className="mt-8 text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">

{identity.summary}

</p>

</div>

{/* GRID */}

<div className="grid md:grid-cols-2 gap-8 mt-16">

{/* POWERS */}

<div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

<h2 className="text-2xl font-semibold">

⭐ Powers You Already Have

</h2>

<div className="mt-6 space-y-4">

{identity.strengths.map((item)=>(

<div
key={item}
className="rounded-2xl bg-black/20 p-4"
>

{item}

</div>

))}

</div>

</div>

{/* WATCH OUT */}

<div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

<h2 className="text-2xl font-semibold">

🧩 Things To Watch Out For

</h2>

<div className="mt-6 space-y-4">

{identity.watchOut.map((item)=>(

<div
key={item}
className="rounded-2xl bg-black/20 p-4"
>

{item}

</div>

))}

</div>

</div>

</div>

{/* QUESTS */}

<div className="rounded-[32px] border border-white/10 bg-white/5 p-8 mt-8">

<h2 className="text-2xl font-semibold">

🚀 Quests You May Enjoy

</h2>

<div className="flex flex-wrap gap-3 mt-6">

{identity.quests.map((item)=>(

<div
key={item}
className="rounded-full border border-white/10 px-5 py-3 bg-black/20"
>

{item}

</div>

))}

</div>

</div>

{/* FIRST QUEST */}

<div className="rounded-[32px] border border-yellow-400/20 bg-yellow-400/5 p-8 mt-8">

<p className="text-yellow-400">

🎯 First Quest Unlocked

</p>

<h2 className="mt-4 text-3xl font-semibold">

The Small Beginning

</h2>

<p className="mt-5 text-slate-300 leading-relaxed">

Write one thing you want your future self to thank you for.

Then take one small action today that moves you closer.

</p>

<div className="flex gap-4 mt-6">

<div className="rounded-full bg-black/20 px-5 py-3">

⭐ +25 Builder Points

</div>

<div className="rounded-full bg-black/20 px-5 py-3">

🧠 +10 Wisdom

</div>

</div>

</div>

{/* BUTTON */}

<div className="mt-12 text-center">

<Link

href="/dashboard"

className="
inline-flex
rounded-2xl
px-10
py-5
bg-yellow-500
text-black
font-bold
"

>

Begin My Journey ⚡

</Link>

</div>

</div>

</main>

)

}