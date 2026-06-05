import OpenAI from "openai";

const openai = new OpenAI({

apiKey:
process.env.OPENAI_API_KEY,

});

export async function POST(req){

try{

const body=
await req.json();

const {

input,
profile,
level,
streak,
completedCount,
missionHistory,
clarityHistory,
momentumState,
evolutionStage,
behaviorSignals,

}=body;


/* CLARITY */

const averageClarity=

clarityHistory?.length

?

Math.round(

clarityHistory.reduce(
(a,b)=>a+b,
0
)
/ clarityHistory.length

)

: null;


/* RECENT STATE */

const recentState=

behaviorSignals?.length

?

behaviorSignals[
behaviorSignals.length - 1
]?.mentalState

: null;


/* DIFFICULTY */

let difficulty=
"normal";

if(level >= 10){

difficulty=
"advanced";

}

else if(level >= 5){

difficulty=
"intermediate";

}

else{

difficulty=
"beginner";

}


/* ADAPTIVE MODE */

let adaptiveInstruction="";

if(recentState === "Cognitive Fatigue"){

adaptiveInstruction=`

The user may be emotionally exhausted.

Reduce complexity.
Reduce pressure.
Focus on recovery and small wins.

`;

}

else if(
recentState === "Overthinking Loop"
){

adaptiveInstruction=`

The user is overthinking.

Generate missions that encourage immediate execution and simpler decisions.

`;

}

else if(
averageClarity >= 8
){

adaptiveInstruction=`

The user currently has strong clarity.

Generate ambitious execution-focused missions with measurable output.

`;

}


const prompt=`

You are PipuPath AI.

You help young people become real builders.

DO NOT generate generic motivational advice.

The mission must feel:
- personal
- actionable
- realistic
- adaptive
- emotionally intelligent

USER PROFILE:
${JSON.stringify(profile)}

EVOLUTION STAGE:
${evolutionStage}

LEVEL:
${level}

STREAK:
${streak}

COMPLETED MISSIONS:
${completedCount}

MOMENTUM:
${momentumState}

AVERAGE CLARITY:
${averageClarity}

RECENT MENTAL STATE:
${recentState}

RECENT MISSIONS:
${JSON.stringify(missionHistory)}

USER GOAL:
"${input}"

ADAPTIVE INSTRUCTION:
${adaptiveInstruction}

Generate a mission appropriate for a ${difficulty} builder.

Return ONLY valid JSON in this exact format:

{

"title":"",

"description":"",

"why_this_matters":"",

"first_action":"",

"execution_steps":[
""
],

"tools_needed":[
""
],

"message_templates":[
""
],

"first_money_path":"",

"common_mistakes":[
""
],

"tomorrow_action":"",

"questType":"",

"xpReward":25,

"difficulty":"",

"questChain":{

"name":"",

"currentStep":1,

"totalSteps":5,

"futureSteps":[
""
]

}

}
Execution steps must be detailed.
Avoid generic advice.
Avoid motivational fluff.

`;

const completion=
await openai.chat.completions.create({

model:"gpt-4.1-mini",

temperature:0.7,

response_format:{
type:"json_object",
},

messages:[

{

role:"system",

content:
"You are an elite youth builder strategist.",

},

{

role:"user",

content:prompt,

},

],

});

const text=
completion
.choices[0]
.message.content;

const cleaned=
text
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();

const parsed=
JSON.parse(cleaned);

return Response.json(parsed);

}catch(error){

console.error(error);

return Response.json(

{
error:
"Failed to generate adaptive mission.",
},

{
status:500,
}

);

}

}