import { createClient }
from "@/lib/supabase/server";

interface AwardXPParams {
  userId: string;

  amount: number;

  eventType: string;

  metadata?: any;
}

// ======================================
// LEVEL FORMULA
// ======================================

function calculateLevel(xp: number) {

  return Math.floor(
    Math.sqrt(xp / 100)
  ) + 1;

}

// ======================================
// XP ENGINE
// ======================================

export async function awardXP({
  userId,
  amount,
  eventType,
  metadata
}: AwardXPParams) {

  const supabase =
    await createClient();

  // ======================================
  // GET PROFILE
  // ======================================

  const {
    data: profile,
    error: profileError
  } = await supabase
    .from("profiles")
    .select(`
      xp,
      level
    `)
    .eq("id", userId)
    .single();

  if (profileError || !profile) {

    throw new Error(
      "Profile not found"
    );

  }

  // ======================================
  // CALCULATE NEW VALUES
  // ======================================

  const currentXP =
    profile.xp || 0;

  const newXP =
    currentXP + amount;

  const newLevel =
    calculateLevel(newXP);

  const leveledUp =
    newLevel > profile.level;

  // ======================================
  // LOG EVENT
  // ======================================

  const { error: eventError }
    = await supabase
      .from("user_events")
      .insert({
        user_id: userId,

        event_type: eventType,

        event_data: metadata || {},

        xp_delta: amount
      });

  if (eventError) {

    throw new Error(
      eventError.message
    );

  }

  // ======================================
  // UPDATE PROFILE
  // ======================================

  const { error: updateError }
    = await supabase
      .from("profiles")
      .update({

        xp: newXP,

        level: newLevel,

        last_active_at:
          new Date().toISOString()

      })
      .eq("id", userId);

  if (updateError) {

    throw new Error(
      updateError.message
    );

  }

  // ======================================
  // RETURN STATE
  // ======================================

  return {

    success: true,

    xp: newXP,

    level: newLevel,

    leveledUp

  };

}