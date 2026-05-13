import { supabase }
from "../supabase";

import {
  storeMemory
} from "../memory/storeMemory";

import {
  awardXP
} from "../xp/awardXP";

export async function completeMission({

  userId,

  missionId,

  xpReward = 25,

}) {

  try {

    // =========================
    // COMPLETE MISSION
    // =========================

    const {
      error: missionError,
    } = await supabase
      .from("user_missions")
      .update({

        status:
          "completed",

        completed_at:
          new Date().toISOString(),

      })
      .eq("id", missionId);

    if (missionError) {

      console.error(
        missionError
      );

      return {
        success: false,
      };
    }

    // =========================
    // AWARD XP
    // =========================

    await awardXP({

      supabase,

      userId,

      amount:
        xpReward,

    });

    // =========================
    // GET PROFILE
    // =========================

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (
      profileError ||
      !profile
    ) {

      console.error(
        profileError
      );

      return {
        success: false,
      };
    }

    // =========================
    // UPDATE STREAK
    // =========================

    const currentStreak =
      profile.streak || 0;

    const updatedStreak =
      currentStreak + 1;

    await supabase
      .from("profiles")
      .update({

        streak:
          updatedStreak,

        updated_at:
          new Date().toISOString(),

      })
      .eq("id", userId);

    // =========================
    // STORE MEMORY
    // =========================

    await storeMemory({

      userId,

      memoryType:
        "mission_completion",

      content:
        "User completed a meaningful mission and reinforced execution momentum.",

      importance: 3,

    });

    // =========================
    // RETURN UPDATED STATE
    // =========================

    return {

      success: true,

      xpReward,

      streak:
        updatedStreak,

    };

  } catch (error) {

    console.error(error);

    return {
      success: false,
    };

  }

}