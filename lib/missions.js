// =========================
// ADAPTIVE MISSION ENGINE
// =========================

export function generateMission(

  profile,

  orchestration = {},

  signals = [],

interventionHistory = []

) {

  const archetype =
    profile?.archetype || "";

  const momentum =
    profile?.momentum || 0;

  const streak =
    profile?.streak || 0;

  const cognitiveState =
    profile?.last_cognitive_state || "";

  const clarityScore =
    profile?.clarity_score || 5;

  // =========================
  // SIGNAL DETECTION
  // =========================

  const overwhelmDetected =

    signals.some(
      (signal) =>
        signal.title?.includes(
          "overwhelm"
        )
    );

  const instabilityDetected =

    signals.some(
      (signal) =>
        signal.title?.includes(
          "unstable"
        )
    );

  const momentumDetected =

    signals.some(
      (signal) =>
        signal.level ===
        "positive"
    );

const stabilizationRequired =

  orchestration?.stabilizationRequired ||

  false;

const cognitiveLoad =

  orchestration?.cognitiveLoad ||

  "normal";

const recentRecoveryCycles =

  interventionHistory.filter(
    (entry) =>
      entry.missionMode ===
      "recovery"
  ).length;

const repeatedStabilization =

  recentRecoveryCycles >= 3;

  // =========================
  // ORCHESTRATION PRIORITY
  // =========================

  if (
    orchestration?.missionMode ===
    "recovery"
  ) {

    return {

      type:
        "Recovery",

      title:
        overwhelmDetected

          ?

          "Reduce internal pressure gently today."

          :

          "Reduce internal pressure today.",

      description:

        overwhelmDetected

          ?

          repeatedStabilization

  ?

  "Your recent behavioral history suggests deeper stabilization and recovery should be prioritized carefully."

  :

  "Focus on calm stabilization, slower pacing and reduced behavioral pressure."

          :

          "Prioritize stabilization, recovery and sustainable pacing instead of intensity.",

      xpReward:

  stabilizationRequired

    ? 5

    : 8,
    };
  }

  if (
    orchestration?.missionMode ===
    "simplified"
  ) {

    return {

      type:
        "Stability",

      title:

        instabilityDetected

          ?

          "Rebuild consistency through one stable action."

          :

          "Complete one small aligned action.",

      description:

        instabilityDetected

          ?

          "Reduce behavioral volatility through simplicity, stability and intentional repetition."

          :

          "Reduce complexity and rebuild consistency through simple intentional movement.",

      xpReward:

  cognitiveLoad === "low"

    ? 6

    : 10,
    };
  }

  if (
    orchestration?.missionMode ===
    "expanded"
  ) {

    return {

      type:
        "Expansion",

      title:

        momentumDetected

          ?

          cognitiveLoad === "low"

  ?

  "Expand carefully while maintaining stability."

  :

  "Channel your current momentum into meaningful expansion."

          :

          "Pursue a higher-level growth challenge.",

      description:

        momentumDetected

          ?

          "Recent behavioral alignment suggests readiness for elevated challenge and growth."

          :

          "Your recent evolution suggests increasing alignment and readiness for greater challenge.",

      xpReward:

  momentumDetected

    ? 30

    : 25,
    };
  }

  // =========================
  // RECOVERY MISSIONS
  // =========================

  if (
    cognitiveState ===
      "Cognitive Fatigue" ||

    momentum <= 20
  ) {

    return {

      type:
        "Recovery",

      title:
        "Reduce cognitive pressure today.",

      description:
        "Focus on one small meaningful action instead of forcing intensity. Recovery restores sustainable growth.",

      xpReward:
        8,
    };
  }

  // =========================
  // OVERTHINKING MISSIONS
  // =========================

  if (
    cognitiveState ===
    "Overthinking Loop"
  ) {

    return {

      type:
        "Execution",

      title:
        "Convert thought into movement.",

      description:
        "Complete one action you have been mentally delaying. Simplicity restores clarity.",

      xpReward:
        12,
    };
  }

  // =========================
  // LOW CLARITY MISSIONS
  // =========================

  if (clarityScore <= 4) {

    return {

      type:
        "Clarity",

      title:
        "Create intentional mental space.",

      description:
        "Reduce noise, distractions and decision overload today. Clarity grows in quieter environments.",

      xpReward:
        10,
    };
  }

  // =========================
  // HIGH MOMENTUM MISSIONS
  // =========================

  if (
    momentum >= 70 &&
    streak >= 5
  ) {

    return {

      type:
        "Expansion",

      title:
        "Take on a more difficult growth challenge.",

      description:
        "Your recent behavior suggests increasing alignment and momentum. Expand your difficulty intentionally.",

      xpReward:
        20,
    };
  }

  // =========================
  // ARCHETYPE MISSIONS
  // =========================

  const archetypeMissions = {

    Builder: {

      title:
        "Build something useful today.",

      description:
        "Create, improve or organize something meaningful that compounds over time.",

      xpReward:
        15,
    },

    Commander: {

      title:
        "Lead with disciplined action.",

      description:
        "Strengthen structure, execution and consistency through intentional leadership.",

      xpReward:
        15,
    },

    Scholar: {

      title:
        "Transform learning into action.",

      description:
        "Apply one meaningful insight instead of endlessly consuming information.",

      xpReward:
        15,
    },

    Guide: {

      title:
        "Create meaningful human impact.",

      description:
        "Support, encourage or help someone intentionally today.",

      xpReward:
        15,
    },

  };

  // =========================
  // DEFAULT ARCHETYPE
  // =========================

  if (
    archetypeMissions[
      archetype
    ]
  ) {

    return {

      type:
        "Growth",

      ...archetypeMissions[
        archetype
      ],
    };
  }

  // =========================
  // FALLBACK
  // =========================

  return {

    type:
      "Alignment",

    title:
      "Complete one aligned action today.",

    description:
      "Small intentional actions repeated consistently shape identity over time.",

    xpReward:
      10,
  };
}