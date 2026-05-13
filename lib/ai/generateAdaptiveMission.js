import OpenAI
from "openai";

export async function generateAdaptiveMission({

  archetype,

  streak,

  identitySummary,

  currentFocus,

  recentReflection,

  recentMemories = [],

}) {

  const openai =
    new OpenAI({

      apiKey:
        process.env.OPENAI_API_KEY,

    });

  try {

    const memoryContext =

      recentMemories
        .map(
          (memory) =>
            `- ${memory.content}`
        )
        .join("\n");

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

Your mission is to generate ONE adaptive mission for the user.

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
- human
- intelligent
- emotionally precise
- calming but directional

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

MISSION GENERATION RULES:

If momentum is low:
- reduce pressure
- simplify the mission
- focus on stabilization
- prioritize completion

If momentum is high:
- increase meaningful challenge
- encourage courageous execution
- expand capacity carefully

If user shows signs of overwhelm:
- create grounding missions
- reduce cognitive load
- focus on clarity and movement

Return ONLY valid JSON.

Format:

{
  "title": "...",
  "description": "...",
  "missionType": "...",
  "intensity": "recovery | standard | expansion"
}

`;

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

    const content =

      response
        .choices?.[0]
        ?.message
        ?.content;

    return JSON.parse(content);

  } catch (error) {

    console.error(error);

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