export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.85,
        messages: [
          {
            role: "system",
            content: "Return only valid JSON. No markdown. No extra text."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    const raw = data.choices?.[0]?.message?.content || "{}";

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return Response.json(JSON.parse(cleaned));

  } catch (error) {
    return Response.json({
      path_title: "Your Builder Path",
      revelation: "You have strong potential that grows through disciplined action.",
      skill_one: "Consistency",
      skill_why: "Repeated effort compounds faster than talent.",
      first_move: "Take one visible bold step within 48 hours.",
      first_offer: "Help one person solve one painful problem.",
      trap: "Waiting too long before acting.",
      challenge: "30 days of visible progress."
    });
  }
}