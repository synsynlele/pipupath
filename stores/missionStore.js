import { create } from "zustand";

const useMissionStore = create((set) => ({

missions: [],

activeQuestChain:null,

setMissions: (missions) =>
set({
missions,
}),

setQuestChain:(chain)=>

set({

activeQuestChain:chain,

}),

addMission: (mission) =>

set((state) => ({

missions:[

{

id:Date.now(),

completed:false,

createdAt:
new Date().toISOString(),

chainId:
mission.chainId || null,

chainStep:
mission.chainStep || null,

nextQuest:
mission.nextQuest || null,

xpReward:
mission.xpReward || 25,

difficulty:
mission.difficulty || "normal",

questType:
mission.questType || "growth",

reflection:null,

proof:null,

...mission,

},

...state.missions,

],

})),

completeMission:(id,data={})=>

set((state)=>{

const currentMission=
state.missions.find(
(m)=>m.id===id
);

if(!currentMission){

return{
missions:
state.missions
};

}


/* COMPLETE CURRENT */

const updatedMissions=
state.missions.map(
(mission)=>

mission.id===id

?{

...mission,

completed:true,

status:"completed",

completed_at:
new Date(),

reflection:
data.reflection || null,

reflectionInsight:
data.reflectionInsight || null,

mentalState:
data.mentalState || null,

clarityScore:
data.clarityScore || null,

}

:mission

);


/* AUTO NEXT QUEST */

let nextMission=null;

if(

currentMission.future_steps &&
currentMission.future_steps.length > 0

){

const nextStep=
currentMission.future_steps[0];

const remainingSteps=
currentMission.future_steps.slice(1);

nextMission={

id:Date.now(),

title:nextStep,

description:
`Continue your ${currentMission.chain_name} journey.`,

completed:false,

createdAt:
new Date().toISOString(),

xpReward:
currentMission.xpReward || 25,

difficulty:
currentMission.difficulty || "normal",

questType:
currentMission.questType || "Builder Quest",

chain_name:
currentMission.chain_name,

chain_step:
(currentMission.chain_step || 1) + 1,

chain_total_steps:
currentMission.chain_total_steps || 1,

future_steps:
remainingSteps,

};

}


/* RETURN */

return{

missions:

nextMission

?

[

nextMission,

...updatedMissions,

]

:

updatedMissions,

};

}),

getActiveMissions:()=>

set((state)=>({

missions:
state.missions.filter(
(mission)=>
!mission.completed
),

})),

}));

export default useMissionStore;