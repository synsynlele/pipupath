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
        .slice(0, 8)
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
    // TIME PRESSURE
    // =========================

    const TIME_ANCHORS = [

      "Before 6PM today",

      "Before sleeping tonight",

      "Within the next 24 hours",

      "Before tomorrow afternoon",

      "Within the next 72 hours",

      "This weekend",

    ];

    const randomTimeAnchor =

      TIME_ANCHORS[

        Math.floor(
          Math.random() *
          TIME_ANCHORS.length
        )

      ];


// =========================
// DIFFICULTY SCALING
// =========================

let difficultyState =
  "standard";

let difficultyGuidance =

  `
Generate missions that:
- are realistic
- create movement
- encourage execution
- build consistency
`;

if (
  streak <= 2
) {

  difficultyState =
    "recovery";

  difficultyGuidance =

    `
Generate missions that:
- are easier to start
- reduce execution friction
- rebuild consistency
- focus on movement over perfection
- avoid overwhelming pressure
`;

}

if (
  streak >= 5
) {

  difficultyState =
    "expansion";

  difficultyGuidance =

    `
Generate missions that:
- increase responsibility
- create strategic discomfort
- require initiative
- build leverage
- expand capability
- push execution standards higher
`;

}

    // =========================
    // ARCHETYPE EXECUTION STYLE
    // =========================

    const ARCHETYPE_GUIDANCE = {

      Builder: `
Focus on:
- creating
- building
- execution
- skill accumulation
- systems
- tangible output
`,

      Explorer: `
Focus on:
- exploration
- exposure
- possibility expansion
- testing environments
- discovery through movement
`,

      Leader: `
Focus on:
- responsibility
- initiative
- organizing
- difficult conversations
- creating order
`,

      Strategist: `
Focus on:
- leverage
- systems thinking
- analysis
- optimization
- strategic clarity
`,

      Creator: `
Focus on:
- creative courage
- expression
- publishing
- originality
- output consistency
`,

    };

    // =========================
    // PROMPT
    // =========================

    const prompt = `

You are PipuPath.

An elite developmental operating system helping ambitious young people become capable builders of meaningful futures.

You are NOT:
- a therapist
- a wellness app
- a motivational coach
- generic self-help

You ARE:
- strategically intelligent
- psychologically precise
- execution-oriented
- developmental
- demanding but adaptive
- deeply human

Generate ONE strategic adaptive mission.

The mission must:
- feel highly specific
- create real-world movement
- include execution
- include time pressure
- increase capability
- shape identity
- create momentum
- feel psychologically sharp
- feel realistic but ambitious
- avoid generic productivity language
- avoid vague inspiration
- avoid therapy tone

Mission structure:
1. Clear time anchor
2. Direct action
3. Strategic developmental purpose

The mission should feel like:
- a real assignment
- strategic developmental pressure
- identity construction
- future building

User Archetype:
${archetype}

Archetype Guidance:
${ARCHETYPE_GUIDANCE[archetype]}

Identity Summary:
${identitySummary}

Current Focus:
${currentFocus}

Momentum Streak:
${streak}

Recent Reflection:
${recentReflection || "None"}

Recent Behavioral Signals:
${memoryContext || "None"}

Recent Missions:
${missionContext || "None"}

Pacing State:
${JSON.stringify(pacingState)}

Difficulty State:
${difficultyState}

Difficulty Guidance:
${difficultyGuidance}

Use this time anchor naturally:
${randomTimeAnchor}

Return ONLY valid JSON.

Format:

{
  "title": "...",
  "description": "...",
  "missionType": "...",
  "intensity": "${difficultyState}"
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

              "You generate strategic developmental missions for ambitious young people.",

          },

          {
            role:
              "user",

            content:
              prompt,

          },

        ],

        temperature: 0.95,

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
    // FALLBACKS
    // =========================

    const fallbackMissions = {

      Builder: {

        title:
          "Build Tangible Momentum",

        description:
          "Before 7PM today, complete one concrete output related to a skill, business or system you want your future to depend on. Train execution consistency under imperfect conditions.",

      },

      Explorer: {

        title:
          "Expand Your Reality",

        description:
          "Within the next 72 hours, expose yourself to one unfamiliar environment, field or conversation that could expand your understanding of what is possible.",

      },

      Leader: {

        title:
          "Initiate Responsibility",

        description:
          "Before tomorrow afternoon, initiate one responsibility, difficult conversation or coordination effort that others usually avoid.",

      },

      Strategist: {

        title:
          "Map Leverage Clearly",

        description:
          "Within the next 24 hours, map the exact leverage chain required to achieve one major future goal: skills, relationships, capital and execution steps.",

      },

      Creator: {

        title:
          "Create Without Hiding",

        description:
          "Before sleeping tonight, publish, share or complete one unfinished creative output. Train consistency over perfection.",

      },

    };

    const fallback =

      fallbackMissions[
        archetype
      ] ||

      fallbackMissions.Builder;

    return {

      title:
        fallback.title,

      description:
        fallback.description,

      missionType:
        "strategic",

      intensity:
        "standard",

    };

  }

}