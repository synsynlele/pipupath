import OpenAI
from "openai";

export async function generateAdaptiveMission({

  archetype,

  streak,

  identitySummary,

  currentFocus,

  recentReflection,

  recentMemories = [],

  recentMissions = [],

}) {

  const openai =
    new OpenAI({

      apiKey:
        process.env.OPENAI_API_KEY,

    });

  try {

    // =========================
    // MEMORY CONTEXT
    // =========================

    const memoryContext =

      recentMemories
        .map(
          (memory) =>
            `- ${memory.content}`
        )
        .join("\n");

    // =========================
    // MISSION CONTEXT
    // =========================

    const missionContext =

      recentMissions
        .map(
          (mission) =>

            `- ${mission.title}: ${mission.description}`
        )
        .join("\n");

    // =========================
    // PROMPT
    // =========================

    const prompt = `

You are PipuPath.

An elite adaptive behavioral intelligence system designed to help humans evolve through clarity, momentum, self-awareness and meaningful execution.

You are NOT:
- a productivity app
- a motivational coach
- a generic AI assistant

You ARE:
- psychologically intelligent
- emotionally aware
- strategically adaptive
- calm and grounded
- focused on long-term identity evolution

Your task is to generate ONE adaptive mission.

The mission should:
- feel deeply relevant
- reduce overwhelm
- create meaningful forward movement
- reinforce identity
- adapt to current momentum state
- avoid generic productivity language
- avoid hype
- avoid corporate tone
- avoid toxic self-improvement language

The mission should feel:
- emotionally precise
- psychologically intelligent
- calming but directional
- deeply human

USER STATE:

Archetype:
${archetype}

Identity Summary:
${identitySummary}

Current Focus:
${currentFocus}

Momentum Streak:
${streak}

Recent Reflection:
${recentReflection || "No reflection provided"}

Behavioral Memories:
${memoryContext || "No behavioral memory yet"}

Recent Missions:
${missionContext || "No recent missions"}

Pacing State:
${JSON.stringify(pacingState)}

MISSION GENERATION RULES:

If momentum is low:
- reduce pressure
- simplify the mission
- prioritize completion
- stabilize momentum

If momentum is high:
- encourage courageous execution
- increase meaningful challenge
- expand carefully

If reflection suggests overwhelm:
- reduce cognitive load
- create grounding movement
- simplify the objective

Avoid repeating recent missions unless continuity is strategically useful.

Return ONLY valid JSON.

Format:

{
  "title": "...",
  "description": "...",
  "missionType": "...",
  "intensity": "recovery | standard | expansion"
}

`;

    // =========================
    // OPENAI REQUEST
    // =========================

    const response =
      await openai.chat.completions.create({

        model:
          "gpt-4.1",

        messages: [

          {
            role: "user",
            content: prompt,
          },

        ],

        temperature: 0.9,

      });

    // =========================
    // RESPONSE
    // =========================

    const content =

      response
        .choices?.[0]
        ?.message
        ?.content;

    return JSON.parse(content);

  } catch (error) {

    console.error(error);

    // =========================
    // SAFE FALLBACK
    // =========================

    return {

      title:
        "Small Forward Movement",

      description:
        "Complete one meaningful unfinished task today.",

      missionType:
        "stabilization",

      intensity:
        "recovery",

    };

  }

}