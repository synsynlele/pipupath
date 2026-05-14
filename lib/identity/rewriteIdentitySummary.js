import OpenAI
from "openai";

export async function rewriteIdentitySummary({

  profile,

  recentMemories = [],

  recentMissions = [],

}) {

  try {

    const openai =
      new OpenAI({

        apiKey:
          process.env.OPENAI_API_KEY,

      });

    // =========================
    // MEMORY CONTEXT
    // =========================

    const memoryContext =

      recentMemories

        .slice(0, 10)

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

        .slice(0, 5)

        .map(
          (mission) =>

            `- ${mission.description}`
        )

        .join("\n");

    // =========================
    // PROMPT
    // =========================

    const prompt = `

You are an elite developmental intelligence system.

Your task is to rewrite the user's evolving identity summary based on:
- behavioral patterns
- execution consistency
- reflections
- mission interactions
- developmental trajectory
- current growth stage

You are NOT:
- motivational
- therapeutic
- generic self-help

You ARE:
- psychologically intelligent
- observant
- strategically grounded
- developmental
- deeply human

The identity summary should:
- feel insightful
- feel precise
- feel adaptive
- feel alive
- feel grounded in behavior
- describe who the user is becoming

Avoid:
- hype
- clichés
- exaggerated praise
- corporate language

User Archetype:
${profile?.archetype}

Current Momentum:
${profile?.momentum}

Current Streak:
${profile?.streak}

Existing Identity Summary:
${profile?.identity_summary}

Recent Behavioral Signals:
${memoryContext || "None"}

Recent Missions:
${missionContext || "None"}

Return ONLY:
1 short identity evolution paragraph.

`;

    // =========================
    // OPENAI
    // =========================

    const response =
      await openai.chat.completions.create({

        model:
          "gpt-4.1-mini",

        messages: [

          {
            role:
              "system",

            content:

              "You rewrite evolving identity summaries for ambitious users.",

          },

          {
            role:
              "user",

            content:
              prompt,

          },

        ],

        temperature: 0.85,

      });

    return (

      response
        .choices?.[0]
        ?.message?.content ||

      "Your recent behavior suggests active developmental movement and increasing future awareness."

    );

  }

  catch (error) {

    console.error(error);

    return (

      "Your recent behavior suggests active developmental movement and increasing future awareness."

    );

  }

}