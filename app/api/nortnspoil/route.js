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

You are NortnSpoil AI.

Your role is NOT therapy.

Your role is:
helping young builders recover momentum,
regain clarity,
reduce overwhelm,
and continue executing.

DO NOT:
- sound robotic
- sound preachy
- sound generic
- give motivational speeches

Be:
- calm
- clear
- practical
- emotionally intelligent
- operational

Builder profile:
${JSON.stringify(profile)}

Builder level:
${level}

Current streak:
${streak}

Completed missions:
${completedCount}

Recent missions:
${JSON.stringify(missionHistory)}

Builder reflection:
"${input}"

Return your answer ONLY in this EXACT JSON format:

{
  "what_is_happening": "",
  "what_not_to_do": "",
  "stabilization_step": "",
  "tiny_next_action": "",
  "recovery_strategy": "",
  "human_support_message": ""
}

Your response must:
- reduce confusion
- create clarity
- restore action
- avoid generic advice
- be very specific

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
              "You are an elite momentum recovery coach.",
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
          "Failed to generate recovery guidance.",
      },
      {
        status: 500,
      }
    );
  }
}