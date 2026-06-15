"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BuilderShell from "@/components/layout/BuilderShell";
import BuilderCard from "@/components/ui/BuilderCard";
import GlowButton from "@/components/ui/GlowButton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import useMissionStore from "@/stores/missionStore";
import useProfileStore from "@/stores/profileStore";
import { interpretMagicWriting }
from "@/lib/ai";

import { supabase }
from "@/lib/supabase";

export default function JourneyPage() {

const router=useRouter();

const [selectedMission,setSelectedMission]=useState(null);

const [reflection,setReflection]=useState("");

const {
  missions,
  addMission,
  completeMission,
  setMissions
}=useMissionStore();

const {

builderProfile,
builderLevel,
builderXP,
evolutionStage,
clarityHistory,
streak,
momentumState,
dailyCheckIn,
lastCheckIn,

completeMission:
completeProfileMission,

}=useProfileStore();


useEffect(() => {

  const today =
    new Date()
      .toDateString();

  if (
    lastCheckIn !== today
  ) {

    dailyCheckIn();

  }

}, []);

useEffect(() => {

  async function loadMissions() {

    const {
      data: authData,
    } =
      await supabase.auth.getUser();

    const user =
      authData?.user;

    if (!user) return;

    const {
      data,
      error,
    } =
      await supabase
        .from("user_missions")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .eq(
          "status",
          "active"
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) {

      console.error(error);

      return;
    }

    setMissions(data || []);

  }

  loadMissions();

}, []);




/* AUTO DAILY QUEST */

return(

<ProtectedRoute>

<BuilderShell
title="Journey Map"
subtitle="Build yourself one quest at a time"
>

<div className="flex flex-col pb-32">


{/* HERO */}

<div>

<div className="mb-5 inline-flex rounded-full border border-yellow-400/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">

⚡ Builder Journey Active

</div>

<h1 className="text-5xl font-bold leading-tight text-white">

Build momentum
<span className="block">

one quest at a time.

</span>

</h1>

<p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">

Your quests, growth, skills and future progress live here.

</p>

</div>


{/* EVOLUTION */}

<div className="mt-10">

<BuilderCard>

<div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

<div>

<div className="mb-3 inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">

⚡ EVOLUTION STAGE

</div>

<h2 className="text-4xl font-bold text-white">

{evolutionStage}

</h2>

<p className="mt-4 max-w-xl text-slate-400 leading-relaxed">

Your identity evolves through action, consistency and real-world growth.

</p>

</div>


{/* XP */}

<div className="w-full max-w-md">

<div className="flex items-center justify-between text-sm">

<p className="text-slate-400">

Builder XP

</p>

<p className="text-slate-300">

{builderXP} XP

</p>

</div>

<div className="mt-3 h-4 overflow-hidden rounded-full bg-white/5">

<div

className="
h-full
rounded-full
bg-gradient-to-r
from-yellow-400
via-blue-400
to-violet-500
transition-all
duration-500
"

style={{

width:
`${Math.min(
(builderXP % 100),
100
)}%`

}}

 />

</div>

<p className="mt-3 text-sm text-slate-500">

Next level unlocks at {(builderLevel * 100)} XP

</p>

</div>

</div>

</BuilderCard>

</div>


{/* TODAY QUEST */}

<div className="mt-10">

<BuilderCard>

<div className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs text-green-300">

🔥 MISSION SPOTLIGHT

</div>

<h2 className="text-3xl font-bold text-white">

{missions?.[0]?.title || "No Mission Selected"}

</h2>

<p className="mt-5 text-slate-400 leading-relaxed">

{
missions?.[0]?.description ||
"Use MagicPen to create your next mission."
}

Then take one small action toward it.

</p>

<div className="mt-6 flex flex-wrap gap-3">

<div className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-slate-300">

⭐ +25 Builder Points

</div>

<div className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-slate-300">

🧠 +10 Wisdom

</div>

</div>

</BuilderCard>

</div>

{/* UNLOCK SYSTEM */}

<div className="mt-10">

<BuilderCard>

<div className="flex flex-col gap-8 lg:flex-row lg:justify-between">

{/* CURRENT ACCESS */}

<div className="flex-1">

<div className="mb-3 inline-flex rounded-full border border-yellow-400/20 bg-yellow-500/10 px-4 py-2 text-xs text-yellow-300">

🔓 CURRENT EVOLUTION ACCESS

</div>

<h2 className="text-3xl font-bold text-white">

{evolutionStage} Privileges

</h2>

<p className="mt-4 max-w-xl text-slate-400 leading-relaxed">

As your identity evolves, new systems, missions and opportunities unlock automatically.

</p>

<div className="mt-6 space-y-3">

<div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-slate-300">

✅ Adaptive AI Missions

</div>

<div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-slate-300">

✅ Reflection Intelligence

</div>

<div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-slate-300">

✅ Quest Chains

</div>

{builderLevel >= 3 && (

<div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-4 text-cyan-100">

✅ Advanced Builder Campaigns

</div>

)}

{builderLevel >= 5 && (

<div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 px-5 py-4 text-violet-100">

✅ Creator Missions Unlocked

</div>

)}

{builderLevel >= 10 && (

<div className="rounded-2xl border border-green-400/20 bg-green-500/10 px-5 py-4 text-green-100">

✅ Leadership Quests Unlocked

</div>

)}

</div>

</div>

</div>

</BuilderCard>

</div>






{/* WEEKLY TEAM CHALLENGE */}

<div className="mt-10">

<BuilderCard>

<div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

{/* LEFT */}

<div className="max-w-2xl">

<div className="mb-3 inline-flex rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-2 text-xs text-pink-300">

⚔ WEEKLY TEAM CHALLENGE

</div>

<h2 className="text-4xl font-bold leading-tight text-white">

Build Something
<span className="block">

That Helps Someone

</span>

</h2>

<p className="mt-6 text-slate-400 leading-relaxed">

Builders grow fastest when they become useful.

This week, create something that genuinely helps another person.

It can be:

</p>

<div className="mt-6 grid gap-3 sm:grid-cols-2">

<div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-slate-300">

🎥 A helpful video

</div>

<div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-slate-300">

🎨 A useful design

</div>

<div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-slate-300">

💡 A simple solution

</div>

<div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-slate-300">

🤝 An act of service

</div>

</div>

</div>


{/* RIGHT */}

<div className="w-full max-w-sm space-y-4">

<div className="rounded-3xl border border-white/10 bg-black/20 p-6">

<p className="text-sm uppercase tracking-wide text-slate-500">

Challenge Reward

</p>

<h3 className="mt-4 text-4xl font-bold text-white">

+150 XP

</h3>

<p className="mt-3 text-slate-400">

Gain bonus evolution progress for completing the challenge.

</p>

</div>


<div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-6">

<p className="text-sm uppercase tracking-wide text-cyan-300">

Builder Impact

</p>

<p className="mt-4 text-cyan-100 leading-relaxed">

Unlock future collaboration missions and team-based campaigns.

</p>

</div>


<GlowButton

onClick={async()=>{

const {
data:authData
}=await supabase
.auth
.getUser();

const user=
authData?.user;

if(!user) return;


/* CHECK IF ALREADY JOINED */

const {
data:existing
}=await supabase
.from("user_missions")
.select("id")
.eq(
"user_id",
user.id
)
.eq(
"category",
"weekly_challenge")
.eq(
"status",
"active")
.limit(1);


if(
existing &&
existing.length > 0
){

alert(
"You already joined this week's challenge."
);

return;

}


/* CREATE CHALLENGE MISSION */

const {
error
}=await supabase
.from("user_missions")
.insert({

user_id:
user.id,

title:
"Build Something That Helps Someone",

description:
"Create something useful that genuinely helps another person this week.",

category:
"weekly_challenge",

xp_reward:
150,

status:
"active",

archetype:
"Builder",

steps:[
"Choose someone to help",
"Create something useful",
"Deliver it",
"Reflect on impact"
],

});


if(error){

console.error(error);

alert(
"Failed to join challenge."
);

return;

}


/* RELOAD ACTIVE MISSIONS */

const {
data:missionsData
}=await supabase
.from("user_missions")
.select("*")
.eq(
"user_id",
user.id
)
.eq(
"status",
"active"
);

setMissions(
missionsData || []
);

alert(
"Challenge joined successfully!"
);

}}

>

Join Challenge

</GlowButton>
</div>

</div>

</BuilderCard>

</div>


{/* TOOLS */}

<div className="grid md:grid-cols-3 gap-6 mt-10">

<BuilderCard>

<h3 className="text-xl font-semibold text-white">

🪄 MagicPen

</h3>

<p className="mt-4 text-slate-400">

Receive guidance and future insights.

</p>

<div className="mt-6">

<GlowButton
onClick={()=>router.push("/magicpen")}
>

Open

</GlowButton>

</div>

</BuilderCard>


<BuilderCard>

<h3 className="text-xl font-semibold text-white">

📚 Mission Vault

</h3>

<p className="mt-4 text-slate-400">

View all completed and active quests.

</p>

<div className="mt-6">

<GlowButton
onClick={()=>router.push("/vault")}
>

Open

</GlowButton>

</div>

</BuilderCard>

</div>


{/* MISSIONS */}

<div className="mt-12">

<h2 className="text-3xl font-bold text-white">

Active Missions

</h2>

<div className="space-y-6 mt-6">

{missions.length === 0 ? (

<BuilderCard>

<h3>
No Active Missions
</h3>

<p>

Generate a new mission
with MagicPen to continue
your builder journey.

</p>

<Link href="/magicpen">

<GlowButton>

Open MagicPen

</GlowButton>

</Link>

</BuilderCard>

) : (

missions
  .filter(
    mission =>
      mission.status ===
      "active"
  )
  .slice(0, 3)
  .map((mission) => (

<BuilderCard
  key={mission.id}
>

<div className="flex flex-col gap-6">

{/* HEADER */}

<div>

<div className="mb-3 inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">

{mission.questType || "Builder Quest"}

</div>

<h3 className="text-2xl font-semibold text-white">

{mission.title}

</h3>

<p className="mt-4 text-slate-400 leading-relaxed">

{mission.description}

</p>

</div>


{/* QUEST CHAIN */}

{mission.chain_name && (

<div className="rounded-3xl border border-violet-400/10 bg-violet-500/10 p-5">

<div className="flex items-center justify-between">

<div>

<div className="mb-2 inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">

⚔ QUEST CHAIN

</div>

<h4 className="text-xl font-semibold text-white">

{mission.chain_name}

</h4>

<p className="mt-2 text-slate-400">

Step {mission.chain_step} of {mission.chain_total_steps}

</p>

</div>

<div className="w-40">

<div className="h-3 overflow-hidden rounded-full bg-white/5">

<div

className="
h-full
rounded-full
bg-gradient-to-r
from-violet-400
via-blue-400
to-cyan-400
"

style={{

width:
`${(

mission.chain_step /

mission.chain_total_steps

) * 100}%`

}}

 />

</div>

</div>

</div>


{mission.future_steps?.length > 0 && (

<div className="mt-5">

<p className="text-xs uppercase tracking-wide text-slate-500">

Upcoming Steps

</p>

<div className="mt-4 space-y-3">

{mission.future_steps
.slice(0,3)
.map((step,index)=>(

<div

key={index}

className="
rounded-2xl
border
border-white/10
bg-black/20
px-4
py-3
text-sm
text-slate-300
"

>

🔓 {step}

</div>

))}

</div>

</div>

)}

</div>

)}


{/* XP */}

<div className="flex flex-wrap gap-3">

<div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">

⭐ +{mission.xpReward || 25} XP

</div>

<div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">

⚡ {mission.difficulty || "normal"}

</div>

</div>


{/* COMPLETE */}

{mission.status !== "completed" && (

<div className="pt-4">

<GlowButton
onClick={()=>{
setSelectedMission(mission);
}}
>

Complete Quest

</GlowButton>

</div>

)}


{/* COMPLETED */}

{mission.completed && (

<div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-5">

<p className="font-semibold text-green-300">

✅ Quest Completed

</p>

{mission.reflection && (

<div className="mt-4 space-y-4">

<p className="text-slate-300 leading-relaxed">

{mission.reflection}

</p>

{mission.reflectionInsight && (

<div className="rounded-2xl border border-blue-400/10 bg-blue-500/10 p-4">

<p className="text-blue-100 leading-relaxed">

{mission.reflectionInsight}

</p>

</div>

)}

</div>

)}

</div>

)}

</div>

</BuilderCard>

))

)}

</div>

</div>

<div className="mt-6 flex flex-wrap gap-3">

<button

className="
rounded-2xl
border
border-cyan-400/20
bg-cyan-500/10
px-5
py-3
text-sm
font-medium
text-cyan-100
transition-all
hover:bg-cyan-500/20
"

>

🌍 Share To Builder Feed

</button>

<button

className="
rounded-2xl
border
border-white/10
bg-white/5
px-5
py-3
text-sm
font-medium
text-slate-300
transition-all
hover:bg-white/10
"

>

📸 Add Project Screenshot

</button>

</div>

{/* COMPLETE QUEST MODAL */}

{

selectedMission && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">

<div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0B1120] p-8">

<h2 className="text-3xl font-bold text-white">

Complete Quest

</h2>

<p className="mt-4 text-slate-400">

What did you learn or accomplish from this quest?

</p>

<textarea

value={reflection}

onChange={(e)=>
setReflection(
e.target.value
)
}

placeholder="Write your reflection..."

className="
mt-6
w-full
rounded-2xl
border
border-white/10
bg-white/5
p-5
text-white
outline-none
min-h-[140px]
"

/>

<div className="mt-8 flex gap-4">

<button

onClick={async ()=>{

const analysis =
  await interpretMagicWriting(
    reflection
  );

console.log(
  selectedMission
);

/* MARK CURRENT STEP COMPLETE */

await supabase
  .from("user_missions")
  .update({

    status:
      "completed",

    completed_at:
      new Date()
        .toISOString(),

  })
  .eq(
    "id",
    selectedMission.id
  );

/* ADD XP TO PROFILE */

const earnedXP =
  selectedMission.xp_reward || 25;

const newXP =
  (builderXP || 0) +
  earnedXP;

let newLevel = 1;
let newStage = "Explorer";

if (newXP >= 1500) {

  newLevel = 5;
  newStage = "Architect";

} else if (newXP >= 700) {

  newLevel = 4;
  newStage = "Leader";

} else if (newXP >= 300) {

  newLevel = 3;
  newStage = "Creator";

} else if (newXP >= 100) {

  newLevel = 2;
  newStage = "Builder";

}

await supabase
  .from("profiles")
  .update({

    xp: newXP,

    level:
      newLevel,

    current_stage:
      newStage,

    completed_count:
      (
        builderProfile?.completed_count ||
        0
      ) + 1,

  })
  .eq(
    "id",
    selectedMission.user_id
  );


if (

  selectedMission.future_steps &&
  selectedMission.future_steps.length > 0

) {

  const nextStep =
    selectedMission.future_steps[0];

  const remainingSteps =
    selectedMission.future_steps.slice(1);

  await supabase
    .from("user_missions")
    .insert({

      user_id:
        selectedMission.user_id,

      title:
        nextStep,

      description:
        `Continue your ${selectedMission.chain_name} journey.`,

      archetype:
        selectedMission.archetype,

      category:
        selectedMission.category,

      xp_reward:
        selectedMission.xp_reward,

      status:
        "active",

      chain_name:
        selectedMission.chain_name,

      chain_step:
        (selectedMission.chain_step || 1) + 1,

      chain_total_steps:
        selectedMission.chain_total_steps,

      future_steps:
        remainingSteps,

    });

}

/* LOCAL UPDATE */

completeMission(
  selectedMission.id,
  {

    reflection,

    reflectionInsight:
      analysis.insight,

    mentalState:
      analysis.state,

    clarityScore:
      analysis.clarity,

  }
);


await completeProfileMission({

  xp:
    selectedMission.xp_reward || 25,

  clarityScore:
    analysis.clarity,

  mentalState:
    analysis.state,

});


setSelectedMission(null);

setReflection("");

}}

className="
rounded-2xl
bg-yellow-500
px-6
py-4
font-semibold
text-black
"

>

Finish Quest ⚡

</button>

<button

onClick={()=>{
setSelectedMission(null);
}}

className="
rounded-2xl
border
border-white/10
bg-white/5
px-6
py-4
text-slate-300
"

>

Cancel

</button>

</div>

</div>

</div>

)

}

</div>

</BuilderShell>

</ProtectedRoute>

);

}