import { openai }
from "./openai";

// =========================
// GENERATE ADAPTIVE INSIGHT
// =========================

export async function generateAdaptiveInsight({

  archetype,

  missionMode,

  guidanceMode,

  cognitiveLoad,

  momentum,

  reflections,

  aspirations,

  emotionalState,

}) {

  try {

    // =========================
    // BUILD CONTEXT
    // =========================

    const context = `

User Archetype:
${archetype}

Current Mission Mode:
${missionMode}

Current Guidance Mode:
${guidanceMode}

Current Cognitive Load:
${cognitiveLoad}

Current Momentum:
${momentum}

Current Emotional State:
${emotionalState}

User Aspirations:
${aspirations}

Recent Reflections:
${reflections}

`;

    // =========================
    // SYSTEM PROMPT
    // =========================

    const systemPrompt = `

You are the intelligence layer of PipuPath,
an adaptive life progression operating system.

Your role is NOT to motivate.

Your role is to:
- identify hidden behavioral patterns
- create clarity
- reduce cognitive noise
- reveal strategic leverage
- help the user regain alignment
- help the user organize their life forward

IMPORTANT RULES:

- Be emotionally perceptive.
- Be concise.
- Be psychologically accurate.
- Avoid generic self-help language.
- Avoid sounding robotic.
- Avoid sounding like therapy.
- Avoid exaggerated positivity.
- Avoid clichés.

Your response should feel:
calm,
clear,
specific,
human,
strategically useful.

Maximum:
5 sentences.

`;

    // =========================
    // OPENAI CALL
    // =========================

    const response =
      await openai.chat.completions.create({

        model:
          "gpt-4.1-mini",

        messages: [

          {
            role: "system",
            content:
              systemPrompt,
          },

          {
            role: "user",
            content:
              context,
          },

        ],

        temperature: 0.8,

        max_tokens: 180,

      });

    // =========================
    // FINAL OUTPUT
    // =========================

    return response
      .choices?.[0]
      ?.message
      ?.content
      ?.trim();

  }

  catch (error) {

    console.error(
      "INSIGHT ENGINE ERROR:",
      error
    );

    return "Your current behavioral patterns suggest that clarity may emerge more effectively through smaller intentional actions rather than excessive cognitive pressure.";
  }
}