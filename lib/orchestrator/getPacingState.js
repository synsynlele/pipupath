export function getPacingState({

  streak = 0,

  emotionalState,

  momentumState,

}) {

  // =========================
  // RECOVERY MODE
  // =========================

  if (

    streak < 3 ||

    emotionalState ===
      "overwhelmed" ||

    momentumState ===
      "low"

  ) {

    return {

      mode:
        "recovery",

      intensity:
        "low",

      dashboardDensity:
        "calm",

      guidanceTone:
        "stabilizing",

    };

  }

  // =========================
  // EXPANSION MODE
  // =========================

  if (

    streak >= 7 &&

    momentumState ===
      "high"

  ) {

    return {

      mode:
        "expansion",

      intensity:
        "high",

      dashboardDensity:
        "expanded",

      guidanceTone:
        "challenging",

    };

  }

  // =========================
  // STANDARD MODE
  // =========================

  return {

    mode:
      "standard",

    intensity:
      "medium",

    dashboardDensity:
      "balanced",

    guidanceTone:
      "grounded",

  };

}