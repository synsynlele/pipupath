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
          model: "gpt-5.4-mini",
          temperature: 0.9,
          messages: [
            {
              role: "system",
              content:
                "Return only valid JSON. No markdown. No commentary."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const data = await response.json();

    const raw =
      data?.choices?.[0]?.message?.content || "{}";

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return Response.json(JSON.parse(cleaned));

  } catch (error) {

    // Weekly Check-In fallback
    if (
      prompt?.includes("momentum") ||
      prompt?.includes("Adjustment")
    ) {
      return Response.json({
        acknowledgment:
          "You are still in motion. That matters.",
        insight:
          "Your effort is real, but focus needs tightening.",
        adjustment:
          "Remove low-value distractions this week.",
        next_move:
          "Choose one priority and finish it fast.",
        momentum: 7,
        momentum_note:
          "Progress exists, but consistency decides.",
      });
    }

    // Builder Path fallback
    return Response.json({
      path_title: "The Builder Path",
      revelation:
        "You grow fastest when action becomes consistent.",
      skill_one: "Execution",
      skill_why:
        "Ideas only matter when turned into outcomes.",
      wealth_path:
        "Solve painful problems repeatedly.",
      career_path:
        "Roles where ownership matters.",
      first_move:
        "Take one visible bold step in 48 hours.",
      first_offer:
        "Help one person solve one problem.",
      trap:
        "Overthinking instead of shipping.",
      challenge:
        "30 days of daily visible progress."
    });
  }
}