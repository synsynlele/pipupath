export function extractNarrative({

  recentMemories = [],

}) {

  // =========================
  // COUNTS
  // =========================

  const reflections =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "reflection"

    );

  const struggles =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "mission_struggle"

    );

  const completions =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "mission_completion"

    );

  const cognitiveSignals =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "magicpen_signal"

    );

  // =========================
  // DEFAULT
  // =========================

  let narrative =

    "Your recent behavior suggests active developmental movement and increasing self-awareness.";

  // =========================
  // EXECUTION
  // =========================

  if (
    completions.length >= 3
  ) {

    narrative =

      "Your recent behavioral patterns suggest increasing execution reliability and stronger forward momentum.";

  }

  // =========================
  // COGNITIVE
  // =========================

  if (
    cognitiveSignals.length >= 3
  ) {

    narrative =

      "Your recent thinking patterns suggest expanding strategic awareness, deeper internal processing and increasing long-term clarity.";

  }

  // =========================
  // STRUGGLE
  // =========================

  if (
    struggles.length >= 3
  ) {

    narrative =

      "Your recent activity suggests tension between ambition and sustainable execution. The current developmental priority is rebuilding consistent movement.";

  }

  // =========================
  // REFLECTIVE
  // =========================

  if (
    reflections.length >= 5
  ) {

    narrative =

      "Your reflections suggest active identity refinement and increasing awareness of the future you are trying to build.";

  }

  return narrative;

}