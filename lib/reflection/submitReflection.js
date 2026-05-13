import { supabase }
from "../supabase";

import {
  analyzeReflection
} from "../ai/analyzeReflection";

import {
  storeMemory
} from "../memory/storeMemory";

export async function submitReflection({

  userId,

  reflection,

  profile,

}) {

  try {

    // =========================
    // AI ANALYSIS
    // =========================

    const analysis =
      await analyzeReflection({

        reflection,

        archetype:
          profile.archetype,

        streak:
          profile.streak,

      });

    // =========================
    // STORE MEMORY
    // =========================

    await storeMemory({

      userId,

      memoryType:
        "reflection_analysis",

      content:
        analysis.memorySummary,

      importance: 4,

    });

    // =========================
    // UPDATE PROFILE
    // =========================

    await supabase
      .from("profiles")
      .update({

        updated_at:
          new Date().toISOString(),

        last_reflection:
          reflection,

        emotional_state:
          analysis.emotionalState,

        momentum_state:
          analysis.momentumState,

      })
      .eq("id", userId);

    return {

      success: true,

      analysis,

    };

  } catch (error) {

    console.error(error);

    return {

      success: false,

    };

  }

}