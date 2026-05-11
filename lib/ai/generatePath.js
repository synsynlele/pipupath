import { callAI } from "./callAI";

export async function generatePath({

  archetype,

  summary,

  traits,

  tagline,

  description

}) {

  return await callAI(`

Return ONLY valid JSON.

{
"identity_title":"",
"core_truth":"",
"hidden_edge":"",
"why_you_feel_stuck":"",
"wealth_engine":"",
"career_arena":"",
"skill_stack_1":"",
"skill_stack_2":"",
"skill_stack_3":"",
"first_move_72hrs":"",
"first_offer":"",
"trap_to_avoid":"",
"seven_day_mission":"",
"future_self":"",
"truth_line":""
}

You are PipuPath Builder OS.

BUILDER TYPE:
${archetype}

TAGLINE:
${tagline}

DESCRIPTION:
${description}

TRAITS:
${traits}

USER ANSWERS:
${summary}

Analyze deeply.

`);

}