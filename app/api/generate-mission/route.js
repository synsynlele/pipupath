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
  input,
  profile,
  level,
  streak,
  completedCount,
  missionHistory,
} = body;

    const prompt = `

You are PipuPath AI.

Your job is to help young people become real builders.

DO NOT give motivational generic advice.

Your response MUST be:
- practical
- detailed
- step-by-step
- execution-focused
- beginner-friendly
- specific

The user profile:
${JSON.stringify(profile)}

Builder level:
${level}

Builder streak:
${streak}

Completed missions:
${completedCount}

Recent mission history:
${JSON.stringify(missionHistory)}

The user's current goal/problem:
"${input}"

Generate a response in this EXACT JSON format:

{
  "title": "",
  "why_this_matters": "",
  "first_action": "",
  "execution_steps": [
    ""
  ],
  "tools_needed": [
    ""
  ],
  "message_templates": [
    ""
  ],
  "first_money_path": "",
  "common_mistakes": [
    ""
  ],
  "tomorrow_action": ""
}

Execution steps must be VERY detailed.

Message templates must be real examples.

First money path must explain EXACTLY how the user can begin earning.

Avoid generic motivational statements.

`;

    const completion =
      await openai.chat.completions.create({

        model:
          "gpt-4.1-mini",

        temperature: 0.7,

response_format: {
  type: "json_object",
},

        messages: [

          {
            role: "system",

            content:
              "You are an elite youth builder coach.",
          },

          {
            role: "user",

            content: prompt,
          },
        ],
      });

    const text =
  completion.choices[0]
    .message.content;

const cleaned =
  text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

const parsed =
  JSON.parse(cleaned);

    return Response.json(parsed);

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Failed to generate mission.",
      },
      {
        status: 500,
      }
    );
  }
}