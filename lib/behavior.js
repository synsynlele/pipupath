// =========================
// BEHAVIORAL SIGNAL ENGINE
// =========================

export async function generateBehavioralSignals({

  reflectionCount = 0,

  averageReflectionDepth = 0,

  momentum = 0,

  cognitiveState = "",

  clarityScore = 0,

}) {

  const signals = [];

  // =========================
  // MOMENTUM DECLINE
  // =========================

  if (momentum <= 2) {

    signals.push({

      type:
        "Momentum",

      level:
        "medium",

      title:
        "Momentum appears unstable",

      message:
        "Reduce friction and focus on smaller consistent actions to restore behavioral movement.",
    });
  }

  // =========================
  // LOW CLARITY
  // =========================

  if (clarityScore <= 4) {

    signals.push({

      type:
        "Clarity",

      level:
        "medium",

      title:
        "Clarity appears reduced",

      message:
        "Your recent cognitive patterns suggest increasing uncertainty or mental overload.",
    });
  }

  // =========================
  // COGNITIVE FATIGUE
  // =========================

  if (
    cognitiveState ===
    "Cognitive Fatigue"
  ) {

    signals.push({

      type:
        "Recovery",

      level:
        "high",

      title:
        "Recovery may be necessary",

      message:
        "Your behavioral signals suggest mental exhaustion and reduced cognitive recovery.",
    });
  }

  // =========================
  // OVERTHINKING
  // =========================

  if (
    cognitiveState ===
    "Overthinking Loop"
  ) {

    signals.push({

      type:
        "Execution",

      level:
        "medium",

      title:
        "Action may restore clarity",

      message:
        "Your recent cognition suggests excessive internal looping. Simpler execution may reduce mental friction.",
    });
  }

  // =========================
  // GROWTH ORIENTATION
  // =========================

  if (
    cognitiveState ===
    "Growth Oriented"
  ) {

    signals.push({

      type:
        "Growth",

      level:
        "positive",

      title:
        "Growth alignment detected",

      message:
        "Your recent behavioral patterns suggest intentional self-development and future-oriented thinking.",
    });
  }

  // =========================
  // REFLECTIVE DEPTH
  // =========================

  if (
    reflectionCount >= 5 &&
    averageReflectionDepth >= 7
  ) {

    signals.push({

      type:
        "Reflection",

      level:
        "positive",

      title:
        "Strong reflective depth",

      message:
        "Consistent deep reflection is strengthening behavioral awareness and self-understanding.",
    });
  }

  // =========================
  // DEFAULT STATE
  // =========================

  if (signals.length === 0) {

    signals.push({

      type:
        "Stability",

      level:
        "stable",

      title:
        "Behavioral stability detected",

      message:
        "Your recent behavioral patterns appear relatively balanced and stable.",
    });
  }

  return signals;
}