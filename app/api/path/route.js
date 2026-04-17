export async function POST(req) {
  try {
    const { archetype, answers } = await req.json();

    const prompt = `
You are PipuPath.

Builder Type:
${archetype.name}
${archetype.tagline}

Answers:
${answers.map((x, i) => `${i + 1}. ${x.question} => ${x.answer}`).join("\n")}

Return ONLY valid JSON:

{
  "title":"Custom personal path title",
  "revelation":"Powerful insight about this person",
  "skill":"Most important skill to build now",
  "move":"Best next move in 48 hours",
  "offer":"Simple way to earn value in 7 days",
  "trap":"Main danger this type faces"
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        temperature: 0.8,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content.trim();

    return Response.json(JSON.parse(text));

  } catch (error) {
    return Response.json({
      title: "Your Builder Path",
      revelation: "You have strong potential that needs focused action.",
      skill: "Consistency",
      move: "Take one bold practical step this week.",
      offer: "Help one person solve a real problem.",
      trap: "Waiting too long before acting."
    });
  }
}