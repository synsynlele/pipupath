import OpenAI from "openai";

const openai =
  new OpenAI({

    apiKey:
      process.env.OPENAI_API_KEY,
  });

export async function POST(req) {

  try {

    const body =
      await req.json();

    const {
      answers,
    } = body;

    const prompt = `

You are a world-class behavioral strategist and builder intelligence analyst.

Your job is to deeply analyze a person's behavioral patterns, execution tendencies, value creation potential, and likely builder direction.

Do NOT use motivational language.
Do NOT sound generic.
Do NOT use fake personality-test language.

The response should feel psychologically accurate, grounded, and highly observant.

Analyze:

- cognitive direction
- execution strengths
- consistency risks
- natural value creation style
- social operating tendency
- ideal growth environment
- likely monetizable paths
- growth bottlenecks

Then produce JSON ONLY in this structure:

{
  "identity": "",
  "summary": "",
  "strengths": [],
  "risks": [],
  "builderPaths": [],
  "growthEnvironment": "",
  "executionStyle": "",
  "nextFocus": ""
}

User Answers:

${JSON.stringify(
  answers,
  null,
  2
)}

`;

    const completion =
      await openai.chat.completions.create({

        model:
          "gpt-4.1-mini",

        messages: [

          {
            role: "system",
            content:
              "You are an elite behavioral intelligence system.",
          },

          {
            role: "user",
            content:
              prompt,
          },
        ],

        temperature: 0.7,
      });

    const raw =
      completion
        .choices[0]
        .message.content;

    const parsed =
      JSON.parse(raw);

    return Response.json(parsed);

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Failed to analyze builder.",
      },
      {
        status: 500,
      }
    );
  }
}