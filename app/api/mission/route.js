import OpenAI
from "openai";

const openai =
  new OpenAI({

    apiKey:
      process.env.OPENAI_API_KEY,

  });

export async function POST(
  req
) {

  try {

    const body =
      await req.json();

    const {

      archetype,

      aspirations,

      momentum,

      emotionalState,

      missionMode,

    } = body;

    // =========================
    // PROMPT
    // =========================

    const prompt = `

You are an elite adaptive behavioral strategist.

Generate ONE powerful but realistic daily mission.

The mission must:
- feel human
- feel psychologically intelligent
- reduce overwhelm
- create momentum
- match emotional condition
- be practical
- be specific
- avoid generic self-help

User State:

Archetype:
${archetype}

Aspirations:
${aspirations}

Momentum:
${momentum}

Emotional State:
${emotionalState}

Mission Mode:
${missionMode}

Return ONLY the mission text.
No numbering.
No explanations.
No markdown.

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
              "You generate adaptive behavioral missions.",

          },

          {
            role:
              "user",

            content:
              prompt,

          },

        ],

        temperature: 0.8,

      });

    const mission =

      response.choices?.[0]
        ?.message?.content ||

      "Identify one meaningful action that would reduce internal friction today and complete it before the day ends.";

    return Response.json({

      success: true,

      mission,

    });

  } catch (error) {

    console.error(error);

    return Response.json(

      {

        success: false,

        error:
          "Mission generation failed",

      },

      {

        status: 500,

      }

    );

  }

}