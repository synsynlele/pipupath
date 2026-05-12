import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
});

export async function POST(req) {

  try {

    const body =
      await req.json();

    const {
      reflection,
      difficulty,
      feeling,
    } = body;

    const prompt = `
You are a calm elite human development coach.

Analyze this reflection briefly.

Reflection:
${reflection}

Difficulty:
${difficulty}

Feeling:
${feeling}

Respond with:
- one short insight
- one behavioral observation
- one practical next step

Keep response under 120 words.
`;

    const completion =
      await openai.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      });

    return Response.json({
      insight:
        completion.choices[0]
          .message.content,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Failed to analyze reflection.",
      },
      {
        status: 500,
      }
    );
  }
}