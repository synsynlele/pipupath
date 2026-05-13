import OpenAI
from "openai";

export async function POST(
  req
) {

  try {

    // =========================
    // OPENAI
    // =========================

    const openai =
      new OpenAI({

        apiKey:
          process.env.OPENAI_API_KEY,

      });

    // =========================
    // BODY
    // =========================

    const body =
      await req.json();

    const {

      reflection,

      archetype,

      momentum,

      missionMode,

    } = body;

    // =========================
    // PROMPT
    // =========================

    const prompt = `

You are an elite adaptive developmental strategist.

A young ambitious user is reflecting on their current state.

Your job is to:
- interpret the reflection
- identify behavioral patterns
- identify emotional trajectory
- identify momentum shifts
- give grounded strategic insight
- avoid therapy tone
- avoid generic self-help
- sound intelligent, calm and sharp
- help the user move forward

User Archetype:
${archetype}

Momentum:
${momentum}

Mission Mode:
${missionMode}

Reflection:
${reflection}

Return ONLY:

1 short adaptive insight paragraph.

`;

    // =========================
    // OPENAI RESPONSE
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

              "You generate adaptive developmental insights.",

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

    // =========================
    // RESULT
    // =========================

    const insight =

      response.choices?.[0]
        ?.message?.content ||

      "Your reflection suggests an active transition between internal evaluation and meaningful forward movement.";

    return Response.json({

      success: true,

      insight,

    });

  }

  catch (error) {

    console.error(error);

    return Response.json(

      {

        success: false,

        error:
          "Reflection analysis failed",

      },

      {

        status: 500,

      }

    );

  }

}