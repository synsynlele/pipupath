import { create }
from "zustand";

import { supabase }
from "@/lib/supabase";

const evolutionStages=[

"Explorer",

"Builder",

"Creator",

"Leader",

"World Builder"

];

const useProfileStore=
create((set,get)=>({

/* CORE */

onboardingCompleted:false,

builderProfile:null,

builderLevel:1,

builderXP:0,

completedCount:0,

streak:0,

lastCheckIn:null,

momentumState:"Rebuilding",

evolutionStage:"Explorer",

clarityHistory:[],

behaviorSignals:[],



/* ONBOARDING */

completeOnboarding:(profile)=>

set({

onboardingCompleted:true,

builderProfile:profile || null,

}),



/* PROFILE */

setBuilderProfile:(profile)=>

set({

builderProfile:profile,

}),



/* DAILY CHECK-IN */

dailyCheckIn:()=>

set((state)=>{

const today=
new Date()
.toDateString();

return{

lastCheckIn:today,

momentumState:

state.streak >= 14

? "Unstoppable"

: state.streak >= 7

? "Locked In"

: state.streak >= 3

? "Consistent"

: "Rebuilding",

};

}),



/* COMPLETE MISSION */

completeMission:
async ({
xp=25,
clarityScore=null,
mentalState=null,
}={})=>{

const {
data:authData,
}=await supabase.auth.getUser();

const user=
authData?.user;

if(!user) return;

set((state)=>{

const nextXP=
state.builderXP + xp;

const nextCompleted=
state.completedCount + 1;

const nextLevel=
Math.floor(nextXP / 100)+1;

const nextStreak=
state.streak + 1;


/* EVOLUTION */

let nextEvolution=
"Explorer";

if(nextLevel >= 3){

nextEvolution=
"Builder";

}

if(nextLevel >= 6){

nextEvolution=
"Creator";

}

if(nextLevel >= 10){

nextEvolution=
"Leader";

}

if(nextLevel >= 20){

nextEvolution=
"World Builder";

}


/* CLARITY */

const nextClarity=[

...state.clarityHistory,

clarityScore,

]
.filter(Boolean)
.slice(-20);


/* SIGNALS */

const nextSignals=[

...state.behaviorSignals,

{

date:
new Date()
.toISOString(),

mentalState,

clarityScore,

},

].slice(-30);


/* MOMENTUM */

let nextMomentum=
"Rebuilding";

if(nextStreak >= 14){

nextMomentum=
"Unstoppable";

}

else if(nextStreak >= 7){

nextMomentum=
"Locked In";

}

else if(nextStreak >= 3){

nextMomentum=
"Consistent";

}

else{

nextMomentum=
"Momentum Rising";

}


/* PERSIST */

supabase
.from("profiles")
.update({

completed_count:
nextCompleted,

streak:
nextStreak,

level:
nextLevel,

xp:
nextXP,

momentum:
nextMomentum,

current_stage:
nextEvolution,

})

.eq(
"id",
user.id
);


/* RETURN */

return{

builderXP:
nextXP,

completedCount:
nextCompleted,

streak:
nextStreak,

builderLevel:
nextLevel,

momentumState:
nextMomentum,

evolutionStage:
nextEvolution,

clarityHistory:
nextClarity,

behaviorSignals:
nextSignals,

};

});

},



/* HYDRATE */

hydrateProfile:(profile)=>

set({

onboardingCompleted:
profile?.onboarding_completed || false,

builderProfile:
profile || null,

builderLevel:
profile?.level || 1,

builderXP:
profile?.xp || 0,

completedCount:
profile?.completed_count || 0,

streak:
profile?.streak || 0,

momentumState:
profile?.momentum || "Rebuilding",

evolutionStage:
profile?.current_stage || "Explorer",

}),



/* LOGOUT */

logout:()=>

set({

onboardingCompleted:false,

builderProfile:null,

builderLevel:1,

builderXP:0,

completedCount:0,

streak:0,

lastCheckIn:null,

momentumState:"Rebuilding",

evolutionStage:"Explorer",

clarityHistory:[],

behaviorSignals:[],

}),

}));

export default useProfileStore;