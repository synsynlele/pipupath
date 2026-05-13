export function generateDailyMissions({

  archetype,

  streak = 0,

}) {

  // =========================
  // BUILDERS
  // =========================

  if (
    archetype ===
    "Visionary Builder"
  ) {

    // LOW MOMENTUM

    if (streak < 3) {

      return [

        {

          title:
            "Small Forward Movement",

          description:
            "Complete one unfinished meaningful task today.",

        },

      ];

    }

    // HIGH MOMENTUM

    return [

      {

        title:
          "Build Something Bold",

        description:
          "Push one meaningful idea into reality today.",

      },

    ];

  }

  // =========================
  // THINKERS
  // =========================

  if (
    archetype ===
    "Deep Thinker"
  ) {

    if (streak < 3) {

      return [

        {

          title:
            "Clarity Reset",

          description:
            "Write clearly about one thing slowing your progress.",

        },

      ];

    }

    return [

      {

        title:
          "Decisive Action",

        description:
          "Act on something you have been overthinking.",

      },

    ];

  }

  // =========================
  // LEADERS
  // =========================

  if (
    archetype ===
    "Strategic Leader"
  ) {

    return [

      {

        title:
          "Create Direction",

        description:
          "Bring structure to one important area today.",

      },

    ];

  }

  // =========================
  // GUIDES
  // =========================

  if (
    archetype ===
    "Human Developer"
  ) {

    return [

      {

        title:
          "Meaningful Support",

        description:
          "Help someone move forward intentionally today.",

      },

    ];

  }

  // =========================
  // DEFAULT
  // =========================

  return [

    {

      title:
        "Move Forward",

      description:
        "Take one meaningful step today.",

    },

  ];

}