"use server";

import { createClient } from "@/lib/supabase/server";

import { awardXP } from "@/lib/xp/awardXP";

export async function completeMission(
  userMissionId: string
) {

  const supabase = await createClient();

  // GET AUTH USER

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // GET USER MISSION

  const { data: userMission, error } = await supabase
    .from("user_missions")
    .select(`
      id,
      status,
      mission:missions (
        xp_reward
      )
    `)
    .eq("id", userMissionId)
    .single();

  if (error || !userMission) {
    throw new Error("Mission not found");
  }

  // PREVENT DOUBLE COMPLETION

  if (userMission.status === "completed") {
    return {
      success: true
    };
  }

  // COMPLETE MISSION

  await supabase
    .from("user_missions")
    .update({
      status: "completed",
      completed_at: new Date().toISOString()
    })
    .eq("id", userMissionId);

  // GET XP REWARD

  const xpReward =
    (userMission.mission as any)?.xp_reward || 25;

  // AWARD XP

  await awardXP({
    userId: user.id,
    amount: xpReward,
    eventType: "mission_completed",
    metadata: {
      userMissionId
    }
  });

  // GET CURRENT STATS

  const { data: stats } = await supabase
    .from("user_stats")
    .select("total_missions_completed")
    .eq("user_id", user.id)
    .single();

  // UPDATE STATS

  await supabase
    .from("user_stats")
    .update({
      total_missions_completed:
        (stats?.total_missions_completed || 0) + 1
    })
    .eq("user_id", user.id);

  return {
    success: true
  };
}