// =========================
// IDENTITY INTELLIGENCE
// =========================

export async function generateIdentityReport(
  archetype
) {

  const prompts = {

    SOLVER: {
      title:
        "You naturally move toward difficult problems.",

      strength:
        "You create value by resolving friction.",

      warning:
        "Overthinking can delay execution.",

      leverage:
        "Build expertise people depend on.",

      mission:
        "Solve one real problem for someone this week.",
    },

    MAKER: {
      title:
        "You are wired to build useful things.",

      strength:
        "You learn best through creation.",

      warning:
        "Perfectionism can slow momentum.",

      leverage:
        "Ship small useful projects consistently.",

      mission:
        "Create and publish one useful thing.",
    },

    VOICE: {
      title:
        "Your words and presence influence people.",

      strength:
        "You move ideas emotionally.",

      warning:
        "Attention without substance becomes weakness.",

      leverage:
        "Learn persuasion and communication deeply.",

      mission:
        "Teach one idea publicly this week.",
    },

    MERCHANT: {
      title:
        "You naturally recognize opportunity and value.",

      strength:
        "You understand exchange instinctively.",

      warning:
        "Chasing money without skill creates fragility.",

      leverage:
        "Develop rare and useful capabilities.",

      mission:
        "Make your first small sale or offer.",
    },

    ARCHITECT: {
      title:
        "You think in systems and long-term leverage.",

      strength:
        "You organize complexity clearly.",

      warning:
        "Planning without execution becomes stagnation.",

      leverage:
        "Build systems others can operate.",

      mission:
        "Design a repeatable system this week.",
    },

    HEALER: {
      title:
        "You are motivated by reducing human pain.",

      strength:
        "People trust your care and insight.",

      warning:
        "Neglecting yourself creates burnout.",

      leverage:
        "Develop skills that create measurable impact.",

      mission:
        "Help someone solve a meaningful problem.",
    },

    CONNECTOR: {
      title:
        "You create leverage through relationships.",

      strength:
        "You align people and opportunities naturally.",

      warning:
        "Too much social energy can reduce focus.",

      leverage:
        "Build strong strategic networks.",

      mission:
        "Create one valuable introduction this week.",
    },

    PERFORMER: {
      title:
        "You shape emotion, energy and culture.",

      strength:
        "You create memorable experiences.",

      warning:
        "Validation seeking can weaken discipline.",

      leverage:
        "Turn creativity into consistent output.",

      mission:
        "Publish one creative piece publicly.",
    },

  };

  return prompts[archetype];
}

// =========================
// MAGICPEN INTERPRETATION
// =========================

export async function interpretMagicWriting(
  text
) {

  const lower =
    text.toLowerCase();

  // =========================
  // DETECT OVERTHINKING
  // =========================

  const overthinkingWords = [

    "confused",

    "stuck",

    "unsure",

    "overthinking",

    "afraid",

    "fear",

    "worried",

    "anxious",

  ];

  // =========================
  // DETECT CLARITY
  // =========================

  const clarityWords = [

    "clear",

    "focused",

    "decided",

    "understand",

    "certain",

    "aligned",

    "disciplined",

  ];

  // =========================
  // DETECT BURNOUT
  // =========================

  const burnoutWords = [

    "tired",

    "exhausted",

    "drained",

    "burnout",

    "overwhelmed",

    "stressed",

  ];

  // =========================
  // DETECT GROWTH
  // =========================

  const growthWords = [

    "growth",

    "improve",

    "better",

    "future",

    "evolve",

    "discipline",

    "purpose",

  ];

  // =========================
  // SCORES
  // =========================

  let overthinkingScore = 0;

  let clarityScore = 0;

  let burnoutScore = 0;

  let growthScore = 0;

  // =========================
  // ANALYZE
  // =========================

  overthinkingWords.forEach(
    (word) => {

      if (lower.includes(word)) {

        overthinkingScore++;
      }
    }
  );

  clarityWords.forEach(
    (word) => {

      if (lower.includes(word)) {

        clarityScore++;
      }
    }
  );

  burnoutWords.forEach(
    (word) => {

      if (lower.includes(word)) {

        burnoutScore++;
      }
    }
  );

  growthWords.forEach(
    (word) => {

      if (lower.includes(word)) {

        growthScore++;
      }
    }
  );

  // =========================
  // DETERMINE STATE
  // =========================

  let state =
    "Reflective Processing";

  if (
    burnoutScore >= 2
  ) {

    state =
      "Cognitive Fatigue";
  }

  else if (
    overthinkingScore >= 2
  ) {

    state =
      "Overthinking Loop";
  }

  else if (
    clarityScore >= 2
  ) {

    state =
      "Clarity Emerging";
  }

  else if (
    growthScore >= 2
  ) {

    state =
      "Growth Oriented";
  }

  // =========================
  // GENERATE INSIGHT
  // =========================

  let insight =
    "Your writing suggests active self-reflection and cognitive processing.";

  if (
    state ===
    "Overthinking Loop"
  ) {

    insight =
      "Your writing suggests mental looping and uncertainty. Simpler decisions and focused action may restore clarity.";
  }

  if (
    state ===
    "Cognitive Fatigue"
  ) {

    insight =
      "Your writing reflects emotional and cognitive exhaustion. Recovery and reduced mental pressure may be necessary.";
  }

  if (
    state ===
    "Clarity Emerging"
  ) {

    insight =
      "Your writing suggests increasing internal clarity and stronger behavioral alignment.";
  }

  if (
    state ===
    "Growth Oriented"
  ) {

    insight =
      "Your writing reflects intentional growth, self-awareness and future-oriented thinking.";
  }

  // =========================
  // FINAL CLARITY SCORE
  // =========================

  const finalClarity =
    Math.min(
      10,
      Math.max(
        1,
        clarityScore +
        growthScore +
        3
      )
    );

  return {

    state,

    insight,

    clarity:
      finalClarity,
  };
}