export function generateBuilderProfile(answers) {

  const combined =
    Object.values(answers)
      .join(" ")
      .toLowerCase();

  // DEFAULTS

  let identity =
    "Visionary Builder";

  let strengths = [
    "Creativity",
    "Communication",
    "Ideas",
  ];

  let skills = [
    "Content Creation",
    "Storytelling",
    "Branding",
  ];

  let mission =
    "Create and publish your first short-form content piece this week.";

  let earningPath =
    "Offer simple content creation or editing services to local businesses or creators.";

  // TECH / PROBLEM SOLVER

  if (
    combined.includes("technology") ||
    combined.includes("coding") ||
    combined.includes("software") ||
    combined.includes("problem")
  ) {

    identity =
      "Technical Builder";

    strengths = [
      "Logic",
      "Systems Thinking",
      "Problem Solving",
    ];

    skills = [
      "Web Development",
      "AI Tools",
      "Automation",
    ];

    mission =
      "Build and publish a simple digital tool or landing page.";

    earningPath =
      "Start freelancing by building simple websites or automations for small businesses.";
  }

  // DESIGN / CREATOR

  if (
    combined.includes("design") ||
    combined.includes("video") ||
    combined.includes("creative") ||
    combined.includes("fashion")
  ) {

    identity =
      "Creative Builder";

    strengths = [
      "Creativity",
      "Visual Thinking",
      "Expression",
    ];

    skills = [
      "Video Editing",
      "Graphic Design",
      "Content Creation",
    ];

    mission =
      "Create 3 portfolio pieces and publish them online.";

    earningPath =
      "Offer design, editing, or social media content services.";
  }

  // TEACHER / LEADER

  if (
    combined.includes("teach") ||
    combined.includes("help") ||
    combined.includes("lead") ||
    combined.includes("community")
  ) {

    identity =
      "Impact Builder";

    strengths = [
      "Leadership",
      "Communication",
      "Empathy",
    ];

    skills = [
      "Public Speaking",
      "Coaching",
      "Education",
    ];

    mission =
      "Teach something valuable publicly this week.";

    earningPath =
      "Start tutoring, coaching, or building educational content.";
  }

  return {
    identity,
    strengths,
    skills,
    mission,
    earningPath,
  };
}