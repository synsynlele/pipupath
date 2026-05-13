import OpenAI
from "openai";

export async function analyzeReflection({

  reflection,

  archetype,

  streak,

}) {

  const openai =
    new OpenAI({

      apiKey:
        process.env.OPENAI_API_KEY,

    });

  try {

    const prompt = `

You are PipuPath.

An elite adaptive behavioral intelligence system.

Your task is to analyze the user's reflection and extract behavioral signals.

You are NOT:
- a therapist
- a productivity app
- a motivational coach

You ARE:
- emotionally intelligent
- psychologically aware
- behaviorally adaptive
- calm and grounded

Analyze the user's reflection carefully.

Detect:
- emotional state
- momentum state
- cognitive overload
- confidence level
- execution resistance
- behavioral drift
- stabilization need

USER STATE:

Archetype:
${archetype}

Momentum Streak:
${streak}

Reflection:
${reflection}

Return ONLY valid JSON.

Format:

{
  "emotionalState": "...",
  "momentumState": "...",
  "needsStabilization": true,
  "confidenceLevel": "...",
  "guidanceDirection": "...",
  "memorySummary": "..."
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

        temperature: 0.7,

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

      emotionalState:
        "unclear",

      momentumState:
        "stable",

      needsStabilization:
        false,

      confidenceLevel:
        "moderate",

      guidanceDirection:
        "Focus on one meaningful step.",

      memorySummary:
        "User is maintaining gradual forward movement.",

    };

  }

}