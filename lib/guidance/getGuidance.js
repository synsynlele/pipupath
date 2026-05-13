export function getGuidance(
  profile
) {

  if (!profile) {

    return (
      "Small meaningful actions create long-term transformation."
    );
  }

  const archetype =
    profile.archetype;

  const streak =
    profile.streak || 0;

  // =========================
  // LOW MOMENTUM
  // =========================

  if (streak < 3) {

    return (
      "Momentum returns through small completed actions. Focus on completion today."
    );
  }

  // =========================
  // HIGH MOMENTUM
  // =========================

  if (streak >= 7) {

    return (
      "Your consistency is compounding. This is a good time to push into bigger execution."
    );
  }

  // =========================
  // ARCHETYPE GUIDANCE
  // =========================

  if (
    archetype ===
    "Visionary Builder"
  ) {

    return (
      "Small completed actions build momentum faster than perfect plans."
    );
  }

  if (
    archetype ===
    "Deep Thinker"
  ) {

    return (
      "You already understand enough to move forward. Progress comes through action."
    );
  }

  if (
    archetype ===
    "Strategic Leader"
  ) {

    return (
      "Direction becomes powerful when paired with consistency."
    );
  }

  if (
    archetype ===
    "Human Developer"
  ) {

    return (
      "Helping others matters most when you continue growing too."
    );
  }

  // =========================
  // DEFAULT
  // =========================

  return (
    "Small meaningful actions create long-term transformation."
  );

}