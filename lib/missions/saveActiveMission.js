import { supabase }
from "../supabase";

export async function saveActiveMission({

  userId,

  mission,

}) {

  try {

    // =========================
    // CLEAR OLD ACTIVE
    // =========================

    await supabase

      .from(
        "user_active_missions"
      )

      .update({

        status:
          "archived",

      })

      .eq(
        "user_id",
        userId
      )

      .eq(
        "status",
        "active"
      );

    // =========================
    // SAVE NEW
    // =========================

    const {
      data,
      error,
    } = await supabase

      .from(
        "user_active_missions"
      )

      .insert({

        user_id:
          userId,

        title:
          mission.title,

        description:
          mission.description,

        mission_type:
          mission.missionType,

        intensity:
          mission.intensity,

      })

      .select()

      .single();

    if (error) {

      console.error(error);

      return null;

    }

    return data;

  } catch (error) {

    console.error(error);

    return null;

  }

}