export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.8,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const text = data.choices[0].message.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return Response.json(JSON.parse(text));
  } catch (error) {
    return Response.json({
      path_title: "Your Builder Path",
      revelation:
        "You have real potential that grows through focused execution.",
      skill_one: "Consistency",
      skill_why: "Repeated action compounds faster than talent.",
      first_move: "Take one practical public action in the next 48 hours.",
      first_offer: "Help one real person solve one real problem.",
      trap: "Waiting too long before acting.",
      challenge: "30 days of visible action.",
    });
  }
}