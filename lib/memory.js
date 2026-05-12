// =========================
// PERSISTENT MEMORY ENGINE
// =========================

export async function detectBehaviorPatterns({

  momentumHistory = [],

  cognitiveHistory = [],

  reflectionDepthHistory = [],

}) {

  const patterns = [];

  // =========================
  // MOMENTUM ANALYSIS
  // =========================

  const averageMomentum =

    momentumHistory.length > 0

      ? momentumHistory.reduce(
          (a, b) => a + b,
          0
        ) /
        momentumHistory.length

      : 0;

  if (
    averageMomentum <= 30
  ) {

    patterns.push({

      type:
        "Momentum",

      title:
        "Recurring momentum instability",

      insight:
        "Your behavioral history suggests inconsistent momentum cycles and reduced sustainability.",
    });
  }

  // =========================
  // COGNITIVE FATIGUE
  // =========================

  const fatigueCount =

    cognitiveHistory.filter(
      (state) =>
        state ===
        "Cognitive Fatigue"
    ).length;

  if (fatigueCount >= 3) {

    patterns.push({

      type:
        "Recovery",

      title:
        "Repeated cognitive fatigue detected",

      insight:
        "Your recent behavioral memory suggests recurring mental exhaustion patterns.",
    });
  }

  // =========================
  // OVERTHINKING
  // =========================

  const overthinkingCount =

    cognitiveHistory.filter(
      (state) =>
        state ===
        "Overthinking Loop"
    ).length;

  if (
    overthinkingCount >= 3
  ) {

    patterns.push({

      type:
        "Execution",

      title:
        "Recurring overthinking patterns",

      insight:
        "You appear to repeatedly enter cognitive looping before execution.",
    });
  }

  // =========================
  // REFLECTION DEPTH
  // =========================

  const averageDepth =

    reflectionDepthHistory.length > 0

      ? reflectionDepthHistory.reduce(
          (a, b) => a + b,
          0
        ) /
        reflectionDepthHistory.length

      : 0;

  if (
    averageDepth >= 7
  ) {

    patterns.push({

      type:
        "Reflection",

      title:
        "Strong reflective depth",

      insight:
        "Your long-term behavioral memory suggests increasing self-awareness and deeper reflection patterns.",
    });
  }

  // =========================
  // STABLE GROWTH
  // =========================

  if (
    averageMomentum >= 60 &&
    averageDepth >= 6
  ) {

    patterns.push({

      type:
        "Growth",

      title:
        "Stable growth trajectory",

      insight:
        "Your behavioral history suggests increasing alignment, consistency and intentional growth.",
    });
  }

  // =========================
  // DEFAULT
  // =========================

  if (patterns.length === 0) {

    patterns.push({

      type:
        "Stability",

      title:
        "Behavioral baseline forming",

      insight:
        "The system is beginning to understand your long-term behavioral patterns.",
    });
  }

  return patterns;
}