import OpenAI
from "openai";

export async function POST(
  req
) {

  try {

    const openai =
      new OpenAI({

        apiKey:
          process.env.OPENAI_API_KEY,

      });

    const body =
      await req.json();

    const {

      writing,

      archetype,

    } = body;

    const prompt = `

You are an elite cognitive strategist helping ambitious young people think more clearly, deeply and strategically.

The user is exploring ideas, identity, ambition, direction or internal conflict.

Your job is to:
- sharpen their thinking
- expose deeper patterns
- challenge weak assumptions
- identify hidden leverage
- increase clarity
- expand perspective
- avoid therapy tone
- avoid generic motivation
- sound intelligent and grounded

User Archetype:
${archetype}

User Writing:
${writing}

Return ONLY:

1 sharp cognitive expansion response.

`;

    const response =
      await openai.chat.completions.create({

        model:
          "gpt-4.1-mini",

        messages: [

          {
            role:
              "system",

            content:

              "You help ambitious people think strategically and clearly.",

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

    const insight =

      response.choices?.[0]
        ?.message?.content ||

      "Your thinking suggests tension between ambition and clarity. Greater specificity may unlock stronger execution momentum.";

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
          "Cognitive analysis failed",

      },

      {

        status: 500,

      }

    );

  }

}