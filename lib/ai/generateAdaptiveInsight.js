import OpenAI
from "openai";

const openai =
  new OpenAI({

    apiKey:
      process.env.OPENAI_API_KEY,

  });

export async function generateAdaptiveInsight({

  archetype,

  streak,

  reflection,

}) {

  try {

    const prompt = `

You are an adaptive behavioral intelligence system.

User archetype:
${archetype}

Current streak:
${streak}

Recent reflection:
${reflection}

Generate short emotionally intelligent adaptive guidance.

Keep it:
- calm
- grounded
- psychologically intelligent
- concise

`;

    const response =
      await openai.chat.completions.create({

        model:
          "gpt-4.1-mini",

        messages: [

          {
            role: "user",
            content: prompt,
          },

        ],

        temperature: 0.7,

      });

    return (
      response
        .choices?.[0]
        ?.message
        ?.content ||

      "Small meaningful actions create momentum."
    );

  } catch (error) {

    console.error(error);

    return (
      "Small meaningful actions create momentum."
    );

  }

}