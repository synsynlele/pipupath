"use client";

import {
  getPacingState
}
from "../lib/orchestrator/getPacingState";

export function useAdaptiveEnvironment({

  profile,

  orchestration,

}) {

  // =========================
  // SAFE PROFILE
  // =========================

  const streak =
    profile?.streak || 0;

  const emotionalState =
    profile?.emotional_state ||

    "stable";

  const momentumState =
    profile?.momentum_state ||

    "standard";

  // =========================
  // PACING
  // =========================

  const pacingState =
    getPacingState({

      streak,

      emotionalState,

      momentumState,

    });

  // =========================
  // RECOVERY
  // =========================

  if (
    pacingState.mode ===
    "recovery"
  ) {

    return {

      mode:
        "recovery",

      density:
        "spacious",

      visualIntensity:
        "soft",

      emotionalTone:
        "stabilizing",

      motionLevel:
        "minimal",

      layoutStyle:
        "calm",

      containerSpacing:
        "py-5 md:py-6",

      contentWidth:
        "max-w-4xl",

      typography:
        "relaxed",

      cardStyle:
        "soft",

      interactionPressure:
        "low",

    };

  }

  // =========================
  // EXPANSION
  // =========================

  if (
    pacingState.mode ===
    "expansion"
  ) {

    return {

      mode:
        "expansion",

      density:
        "dynamic",

      visualIntensity:
        "elevated",

      emotionalTone:
        "challenging",

      motionLevel:
        "moderate",

      layoutStyle:
        "expanded",

      containerSpacing:
        "py-10 md:py-12",

      contentWidth:
        "max-w-6xl",

      typography:
        "strong",

      cardStyle:
        "elevated",

      interactionPressure:
        "high",

    };

  }

  // =========================
  // STANDARD
  // =========================

  return {

    mode:
      "standard",

    density:
      "balanced",

    visualIntensity:
      "balanced",

    emotionalTone:
      "grounded",

    motionLevel:
      "normal",

    layoutStyle:
      "balanced",

    containerSpacing:
      "py-6 md:py-8",

    contentWidth:
      "max-w-5xl",

    typography:
      "balanced",

    cardStyle:
      "standard",

    interactionPressure:
      "medium",

  };

}