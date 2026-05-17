export function generateMission(
  input,
  profile
) {

  const text =
    input.toLowerCase();

  const identity =
    profile?.identity || "";

  const strengths =
    profile?.strengths || [];

  let title =
    "Start Building Publicly";

  let description =
    "Create and publish something valuable online this week.";

  let steps = [

    "Choose one topic you care about",

    "Create one small valuable piece of content",

    "Publish it publicly",

    "Ask 3 people for feedback",
  ];

  let income =
    "Offer your skills or knowledge as a beginner service.";

  // CREATIVE BUILDER

  if (
    identity.includes("Creative")
  ) {

    title =
      "Build Your Creative Presence";

    description =
      "Use your creativity publicly and consistently.";

    steps = [

      "Create 3 portfolio pieces",

      "Publish them online",

      "Document your process publicly",

      "Reach out to potential clients",
    ];

    income =
      "Offer beginner creative services online.";
  }

  // TECHNICAL BUILDER

  if (
    identity.includes("Technical")
  ) {

    title =
      "Build Your First Useful Tool";

    description =
      "Use technology to solve a real problem.";

    steps = [

      "Identify one small painful problem",

      "Build a simple solution",

      "Share it publicly",

      "Improve based on feedback",
    ];

    income =
      "Offer digital building or automation services.";
  }

  // IMPACT BUILDER

  if (
    identity.includes("Impact")
  ) {

    title =
      "Teach Something Valuable";

    description =
      "Turn your knowledge into value for others.";

    steps = [

      "Choose one thing you understand well",

      "Create educational content",

      "Help people publicly",

      "Build authority consistently",
    ];

    income =
      "Start tutoring, coaching, or consulting.";
  }

  // USER INPUT OVERRIDE

  if (
    text.includes("video") ||
    text.includes("youtube")
  ) {

    title =
      "Launch Your Creator Journey";

    description =
      "Build consistency as a creator.";

    steps = [

      "Choose a content niche",

      "Create 5 short videos",

      "Post consistently for 7 days",

      "Study audience response",
    ];

    income =
      "Offer editing or creator support services.";
  }

  if (
    text.includes("ai") ||
    text.includes("software") ||
    text.includes("coding")
  ) {

    title =
      "Build Your First Digital Product";

    description =
      "Turn technical curiosity into practical execution.";

    steps = [

      "Choose one tiny useful idea",

      "Build MVP quickly",

      "Share publicly",

      "Collect real feedback",
    ];

    income =
      "Offer beginner tech or automation services.";
  }

  return {
    title,
    description,
    steps,
    income,
    strengths,
  };
}