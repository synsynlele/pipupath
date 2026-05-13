import OpenAI
from "openai";

const openai =
  new OpenAI({

    apiKey:
      process.env
        .OPENAI_API_KEY,
  });

export async function POST(req) {

  try {

    const body =
      await req.json();

    const {

      archetype,

      missionMode,

      guidanceMode,

      cognitiveLoad,

      momentum,

      reflections,

      aspirations,

      emotionalState,

    } = body;

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

Maximum:
5 sentences.

`;

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

    return Response.json({

      success: true,

      insight:

        response
          .choices?.[0]
          ?.message
          ?.content
          ?.trim(),
    });

  }

  catch (error) {

    console.error(error);

    return Response.json({

      success: false,

      insight:
        "Your current behavioral patterns suggest that smaller intentional actions may restore clarity more effectively than excessive cognitive pressure.",
    });
  }
}