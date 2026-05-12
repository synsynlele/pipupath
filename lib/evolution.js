// =========================
// EVOLUTION INTELLIGENCE
// =========================

export async function generateEvolutionInsights({

  momentumHistory = [],

  cognitiveHistory = [],

  reflectionDepthHistory = [],

  consistencyHistory = [],

}) {

  const insights = [];

  // =========================
  // AVERAGES
  // =========================

  const averageMomentum =

    momentumHistory.length > 0

      ? momentumHistory.reduce(
          (a, b) => a + b,
          0
        ) /
        momentumHistory.length

      : 0;

  const averageReflectionDepth =

    reflectionDepthHistory.length > 0

      ? reflectionDepthHistory.reduce(
          (a, b) => a + b,
          0
        ) /
        reflectionDepthHistory.length

      : 0;

  const averageConsistency =

    consistencyHistory.length > 0

      ? consistencyHistory.reduce(
          (a, b) => a + b,
          0
        ) /
        consistencyHistory.length

      : 0;

  // =========================
  // GROWTH ACCELERATION
  // =========================

  if (

    averageMomentum >= 70 &&

    averageReflectionDepth >= 7 &&

    averageConsistency >= 7

  ) {

    insights.push({

      type:
        "Evolution",

      title:
        "Growth acceleration detected",

      message:
        "Your recent behavioral evolution suggests increasing alignment, stronger consistency and intentional personal growth.",
    });
  }

  // =========================
  // BURNOUT TENDENCY
  // =========================

  const fatigueCount =

    cognitiveHistory.filter(
      (state) =>
        state ===
        "Cognitive Fatigue"
    ).length;

  if (fatigueCount >= 4) {

    insights.push({

      type:
        "Recovery",

      title:
        "Recurring burnout tendency",

      message:
        "Your long-term evolution patterns suggest repeated cognitive exhaustion cycles. Sustainable pacing may be necessary.",
    });
  }

  // =========================
  // OVERTHINKING PATTERN
  // =========================

  const overthinkingCount =

    cognitiveHistory.filter(
      (state) =>
        state ===
        "Overthinking Loop"
    ).length;

  if (
    overthinkingCount >= 4
  ) {

    insights.push({

      type:
        "Execution",

      title:
        "Execution resistance pattern",

      message:
        "Your evolution history suggests recurring hesitation before action. Simpler execution loops may strengthen momentum.",
    });
  }

  // =========================
  // REFLECTION MATURITY
  // =========================

  if (
    averageReflectionDepth >= 8
  ) {

    insights.push({

      type:
        "Awareness",

      title:
        "Increasing reflective maturity",

      message:
        "Your behavioral evolution suggests growing self-awareness and deeper cognitive processing.",
    });
  }

  // =========================
  // STABILITY
  // =========================

  if (

    averageMomentum >= 50 &&

    fatigueCount <= 1

  ) {

    insights.push({

      type:
        "Stability",

      title:
        "Behavioral stability strengthening",

      message:
        "Your recent behavioral evolution suggests increasing internal stability and healthier growth pacing.",
    });
  }

  // =========================
  // DEFAULT
  // =========================

  if (insights.length === 0) {

    insights.push({

      type:
        "Evolution",

      title:
        "Evolution baseline forming",

      message:
        "The system is beginning to understand your long-term growth trajectory and behavioral evolution patterns.",
    });
  }

  return insights;
}