
export const ARCHETYPES = {
  SOLVER:{
    name:"The Solver",emoji:"⚡",tagline:"You fix what others walk past.",
    color:"#F97316",glow:"rgba(249,115,22,.15)",
    description:"Problems fuel you. You naturally diagnose friction and move toward resolution.",
    traits:["Analytical","Relentless","Resourceful"]
  },
  CONNECTOR:{
    name:"The Connector",emoji:"🌐",tagline:"People and ideas find their home through you.",
    color:"#10B981",glow:"rgba(16,185,129,.15)",
    description:"You create leverage through trust, relationships and alignment.",
    traits:["Empathetic","Influential","Magnetic"]
  },
  MAKER:{
    name:"The Maker",emoji:"🔨",tagline:"Your hands and mind build what did not exist.",
    color:"#A78BFA",glow:"rgba(167,139,250,.15)",
    description:"Creation is not optional for you. You feel alive when building.",
    traits:["Skilled","Precise","Patient"]
  },
  VOICE:{
    name:"The Voice",emoji:"🔥",tagline:"You make ideas move and people listen.",
    color:"#FBBF24",glow:"rgba(251,191,36,.15)",
    description:"Communication is your force multiplier.",
    traits:["Articulate","Persuasive","Curious"]
  },
  MERCHANT:{
    name:"The Merchant",emoji:"💎",tagline:"You see value where others see nothing.",
    color:"#F59E0B",glow:"rgba(245,158,11,.15)",
    description:"You understand opportunity, exchange and momentum.",
    traits:["Sharp","Bold","Strategic"]
  },
  ARCHITECT:{
    name:"The Architect",emoji:"🏛️",tagline:"You design systems before others see the need.",
    color:"#38BDF8",glow:"rgba(56,189,248,.15)",
    description:"You think in systems, frameworks and scale.",
    traits:["Strategic","Visionary","Disciplined"]
  },
  HEALER:{
    name:"The Healer",emoji:"🌱",tagline:"You build to reduce human pain.",
    color:"#4ADE80",glow:"rgba(74,222,128,.15)",
    description:"You are moved by human need and compelled to help.",
    traits:["Compassionate","Driven","Grounded"]
  },
  PERFORMER:{
    name:"The Performer",emoji:"✨",tagline:"You create experiences that change people.",
    color:"#F472B6",glow:"rgba(244,114,182,.15)",
    description:"Emotion, culture and expression are your tools.",
    traits:["Creative","Expressive","Bold"]
  }
};


export const QUESTIONS = [

{
question:"When something important needs to happen, what do you naturally do first?",
options:[
{text:"🚀 Start taking action immediately", type:"builder"},
{text:"🧠 Think deeply before acting", type:"strategist"},
{text:"🤝 Bring people together to help", type:"connector"},
{text:"🎨 Look for a creative new angle", type:"creator"}
]
},

{
question:"What kind of challenge excites you most?",
options:[
{text:"Building something useful", type:"builder"},
{text:"Solving a hard problem", type:"strategist"},
{text:"Leading people to win", type:"connector"},
{text:"Creating something original", type:"creator"}
]
},

{
question:"If you had one free Saturday, what sounds most satisfying?",
options:[
{text:"Start a side hustle or project", type:"builder"},
{text:"Learn a valuable skill", type:"strategist"},
{text:"Organize people for something meaningful or event", type:"connector"},
{text:"Design, write or make content", type:"creator"}
]
},

{
question:"What frustrates you most?",
options:[
{text:"Slow progress and wasted time", type:"builder"},
{text:"Bad decisions and confusion", type:"strategist"},
{text:"Disunity and poor leadership", type:"connector"},
{text:"Being boxed in or restricted", type:"creator"}
]
},

{
question:"Which future sounds best to you?",
options:[
{text:"Owning something valuable", type:"builder"},
{text:"Becoming a respected expert", type:"strategist"},
{text:"Leading something important", type:"connector"},
{text:"Having freedom through talent or skills", type:"creator"}
]
}

];

export function calculateArchetype(answers){

const scores = {
SOLVER:0,
CONNECTOR:0,
MAKER:0,
VOICE:0,
MERCHANT:0,
ARCHITECT:0,
HEALER:0,
PERFORMER:0
};

answers.forEach((answerIndex,i)=>{

const type = QUESTIONS[i].options[answerIndex]?.type;

if(i===0){
if(type==="builder") scores.MERCHANT +=2;
if(type==="strategist") scores.ARCHITECT +=2;
if(type==="connector") scores.CONNECTOR +=2;
if(type==="creator") scores.PERFORMER +=2;
}

if(i===1){
if(type==="builder") scores.MAKER +=2;
if(type==="strategist") scores.SOLVER +=2;
if(type==="connector") scores.VOICE +=2;
if(type==="creator") scores.PERFORMER +=2;
}

if(i===2){
if(type==="builder") scores.MERCHANT +=2;
if(type==="strategist") scores.ARCHITECT +=2;
if(type==="connector") scores.HEALER +=2;
if(type==="creator") scores.MAKER +=2;
}

if(i===3){
if(type==="builder") scores.MERCHANT +=2;
if(type==="strategist") scores.SOLVER +=2;
if(type==="connector") scores.HEALER +=2;
if(type==="creator") scores.PERFORMER +=2;
}

if(i===4){
if(type==="builder") scores.MERCHANT +=2;
if(type==="strategist") scores.ARCHITECT +=2;
if(type==="connector") scores.VOICE +=2;
if(type==="creator") scores.MAKER +=2;
}

});

const sorted = Object.entries(scores)
.sort((a,b)=>b[1]-a[1]);

const topScore = sorted[0][1];

const tied = sorted.filter(item => item[1] === topScore);

return tied[Math.floor(Math.random() * tied.length)][0];

}