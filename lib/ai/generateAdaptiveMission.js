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

  pacingState = {},

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

An elite developmental operating system for ambitious humans trying to build identity, sharpen capability, increase clarity, develop discipline and create meaningful impact.

You are NOT:
- a wellness app
- a therapist
- a motivational coach
- a productivity bro
- generic self-help

You ARE:
- strategically intelligent
- psychologically sharp
- developmental
- adaptive
- grounded
- ambitious
- deeply human

Your task is to generate ONE strategic adaptive mission.

The mission should:
- create meaningful movement
- strengthen identity
- increase capability
- sharpen clarity
- reinforce discipline
- encourage courageous execution
- feel psychologically precise
- feel realistic but ambitious
- avoid generic productivity language
- avoid therapy tone
- avoid cliché motivation
- avoid sounding corporate

The mission should feel like:
- a meaningful strategic move
- identity expansion
- future construction
- personal evolution
- directional clarity

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

MISSION ADAPTATION RULES:

If momentum is low:
- simplify execution
- preserve ambition
- focus on movement not perfection
- rebuild execution confidence

If momentum is high:
- increase challenge carefully
- encourage strategic boldness
- expand capability and responsibility

If reflection suggests confusion:
- prioritize clarity-generating actions

If reflection suggests fear:
- encourage meaningful confrontation

If reflection suggests stagnation:
- prioritize forward movement

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
    // OPENAI
    // =========================

    const response =
      await openai.chat.completions.create({

        model:
          "gpt-4.1",

        messages: [

          {
            role:
              "system",

            content:

              "You generate strategic developmental missions for ambitious humans.",

          },

          {
            role:
              "user",

            content:
              prompt,

          },

        ],

        temperature: 0.9,

      });

    // =========================
    // PARSE
    // =========================

    const content =

      response
        .choices?.[0]
        ?.message
        ?.content;

    return JSON.parse(content);

  }

  catch (error) {

    console.error(error);

    // =========================
    // FALLBACK
    // =========================

    return {

      title:
        "Strategic Forward Movement",

      description:
        "Identify one meaningful action that would strengthen your future trajectory and complete it before the day ends.",

      missionType:
        "strategic",

      intensity:
        "standard",

    };

  }

}