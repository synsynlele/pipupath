export function synthesizeBehavior({

  memories = [],

}) {

  // =========================
  // COUNTS
  // =========================

  const completions =

    memories.filter(

      (memory) =>

        memory.memory_type ===
        "mission_completion"

    ).length;

  const struggles =

    memories.filter(

      (memory) =>

        memory.memory_type ===
        "mission_struggle"

    ).length;

  const skips =

    memories.filter(

      (memory) =>

        memory.memory_type ===
        "mission_skip"

    ).length;

  const reflections =

    memories.filter(

      (memory) =>

        memory.memory_type ===
        "reflection"

    ).length;

  const magicPenSignals =

    memories.filter(

      (memory) =>

        memory.memory_type ===
        "magicpen_signal"

    ).length;

  // =========================
  // SYNTHESIS
  // =========================

  const synthesis = [];

  // =========================
  // COMPLETION PATTERN
  // =========================

  if (
    completions >= 3
  ) {

    synthesis.push(

      "Your recent behavioral patterns suggest growing execution consistency and momentum stability."

    );

  }

  // =========================
  // STRUGGLE PATTERN
  // =========================

  if (
    struggles >= 2
  ) {

    synthesis.push(

      "Recent behavioral signals suggest periods of cognitive resistance and execution friction."

    );

  }

  // =========================
  // SKIP PATTERN
  // =========================

  if (
    skips >= 2
  ) {

    synthesis.push(

      "Your adaptive pacing may improve when pressure and cognitive intensity are reduced."

    );

  }

  // =========================
  // REFLECTION PATTERN
  // =========================

  if (
    reflections >= 3
  ) {

    synthesis.push(

      "Reflective processing appears to improve your clarity and behavioral awareness over time."

    );

  }

  // =========================
  // MAGICPEN PATTERN
  // =========================

  if (
    magicPenSignals >= 3
  ) {

    synthesis.push(

      "Your cognitive writing patterns suggest increasing self-awareness and internal clarity."

    );

  }

  // =========================
  // FALLBACK
  // =========================

  if (
    synthesis.length === 0
  ) {

    synthesis.push(

      "Your adaptive environment is still learning your behavioral patterns and momentum rhythms."

    );

  }

  return synthesis;

}