import { supabase }
from "../supabase";

import {
  generateDailyMissions
} from "../missions/generateDailyMissions";

export async function getDashboardData(
  userId
) {

  const { data: profile }
    = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

  if (!profile) {

    return null;
  }

  const { data: missions }
    = await supabase
      .from("user_missions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active");

  let activeMissions =
    missions || [];

  // Generate starter missions
  if (activeMissions.length === 0) {

    const generated =
      generateDailyMissions({

  archetype:
    profile.archetype,

  streak:
    profile.streak,

});

    const inserts =
      generated.map((mission) => ({

        user_id:
          userId,

        title:
          mission.title,

        description:
          mission.description,

        archetype:
          profile.archetype,

        status:
          "active",

      }));

    await supabase
      .from("user_missions")
      .insert(inserts);

    activeMissions =
      inserts;
  }

  return {

    profile,

    missions:
      activeMissions,

  };

}