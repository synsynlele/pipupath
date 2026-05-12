export function generateMission(
  profile
) {

  const archetype =
    profile?.archetype;

  const momentum =
    profile?.momentum || 0;

  const xp =
    profile?.xp || 0;

  // LOW MOMENTUM
  if (momentum < 20) {

    return {
      title:
        "Rebuild Momentum",
      description:
        "Complete one small meaningful action today.",
      xpReward: 10,
    };
  }

  // MID XP MISSIONS
  if (xp > 50 && xp < 200) {

    if (archetype === "MAKER") {

      return {
        title:
          "Ship Something Useful",
        description:
          "Publish a small useful creation publicly.",
        xpReward: 20,
      };
    }

    if (archetype === "VOICE") {

      return {
        title:
          "Teach Publicly",
        description:
          "Share one meaningful insight online.",
        xpReward: 20,
      };
    }

    if (archetype === "MERCHANT") {

      return {
        title:
          "Create Value",
        description:
          "Make an offer or solve a paid problem.",
        xpReward: 20,
      };
    }
  }

  // DEFAULT MISSIONS
  const defaults = {

    SOLVER: {
      title:
        "Solve a Real Problem",
      description:
        "Help someone remove friction today.",
      xpReward: 15,
    },

    MAKER: {
      title:
        "Build Daily",
      description:
        "Create something useful today.",
      xpReward: 15,
    },

    VOICE: {
      title:
        "Communicate Clearly",
      description:
        "Teach or explain one idea publicly.",
      xpReward: 15,
    },

    MERCHANT: {
      title:
        "Exchange Value",
      description:
        "Find one opportunity to create value.",
      xpReward: 15,
    },

    ARCHITECT: {
      title:
        "Design a Better System",
      description:
        "Improve one process or workflow.",
      xpReward: 15,
    },

    HEALER: {
      title:
        "Improve Someone's Day",
      description:
        "Help someone meaningfully today.",
      xpReward: 15,
    },

    CONNECTOR: {
      title:
        "Create Connection",
      description:
        "Introduce two people strategically.",
      xpReward: 15,
    },

    PERFORMER: {
      title:
        "Create Emotional Impact",
      description:
        "Publish something expressive today.",
      xpReward: 15,
    },
  };

  return (
    defaults[archetype] || {
      title:
        "Move Forward",
      description:
        "Complete one meaningful action today.",
      xpReward: 10,
    }
  );
}