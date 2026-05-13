import { supabase }
from "../supabase";

export async function storeGeneratedMission({

  userId,

  mission,

}) {

  try {

    await supabase
      .from("user_missions")
      .insert({

        user_id:
          userId,

        title:
          mission.title,

        description:
          mission.description,

        status:
          "active",

        mission_type:
          mission.missionType,

        intensity:
          mission.intensity,

      });

  } catch (error) {

    console.error(error);

  }

}