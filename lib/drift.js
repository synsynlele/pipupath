// =========================
// BEHAVIORAL DRIFT ENGINE
// =========================

export async function detectBehavioralDrift({

  currentMomentum = 0,

  averageMomentum = 0,

  currentReflectionDepth = 0,

  averageReflectionDepth = 0,

  recentCognitiveState = "",

  historicalFatigueCount = 0,

}) {

  const drifts = [];

  // =========================
  // MOMENTUM DECLINE
  // =========================

  if (

    averageMomentum >= 50 &&

    currentMomentum <=
      averageMomentum - 20

  ) {

    drifts.push({

      type:
        "Momentum",

      level:
        "medium",

      title:
        "Momentum drift detected",

      message:
        "Your recent behavioral movement appears lower than your historical baseline. Simpler recovery actions may restore consistency.",
    });
  }

  // =========================
  // REFLECTION DECLINE
  // =========================

  if (

    averageReflectionDepth >= 7 &&

    currentReflectionDepth <=
      averageReflectionDepth - 3

  ) {

    drifts.push({

      type:
        "Awareness",

      level:
        "medium",

      title:
        "Reflective depth appears reduced",

      message:
        "Your recent reflections suggest lower cognitive processing depth than your historical pattern.",
    });
  }

  // =========================
  // FATIGUE ESCALATION
  // =========================

  if (

    recentCognitiveState ===
      "Cognitive Fatigue" &&

    historicalFatigueCount >= 3

  ) {

    drifts.push({

      type:
        "Recovery",

      level:
        "high",

      title:
        "Burnout progression risk",

      message:
        "Your behavioral history suggests recurring fatigue patterns combined with current cognitive exhaustion.",
    });
  }

  // =========================
  // OVERTHINKING ESCALATION
  // =========================

  if (
    recentCognitiveState ===
    "Overthinking Loop"
  ) {

    drifts.push({

      type:
        "Execution",

      level:
        "medium",

      title:
        "Execution friction increasing",

      message:
        "Your recent cognition suggests increasing internal looping before action.",
    });
  }

  // =========================
  // STABILITY
  // =========================

  if (

    currentMomentum >=
      averageMomentum &&

    recentCognitiveState !==
      "Cognitive Fatigue"

  ) {

    drifts.push({

      type:
        "Stability",

      level:
        "positive",

      title:
        "Behavioral stability maintained",

      message:
        "Your recent behavior remains relatively aligned with your historical growth trajectory.",
    });
  }

  // =========================
  // DEFAULT
  // =========================

  if (drifts.length === 0) {

    drifts.push({

      type:
        "Alignment",

      level:
        "stable",

      title:
        "Behavioral alignment stable",

      message:
        "No significant behavioral drift patterns are currently detected.",
    });
  }

  return drifts;
}