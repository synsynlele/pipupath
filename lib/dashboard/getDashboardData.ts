import { createClient }
from "../supabase/server";

export async function getDashboardData() {

  const supabase =
    await createClient();

  // =========================
  // GET USER
  // =========================

  const {
    data: { user }
  } = await supabase.auth
    .getUser();

  if (!user) {

    return null;

  }

  // =========================
  // PROFILE
  // =========================

  const { data: profile }
    = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

  // =========================
  // STATS
  // =========================

  const { data: stats }
    = await supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", user.id)
      .single();

  // =========================
  // ACTIVE MISSIONS
  // =========================

  const { data: missions }
    = await supabase
      .from("user_missions")
      .select(`
        id,
        status,
        assigned_at,

        mission:missions (
          id,
          title,
          description,
          xp_reward,
          difficulty,
          category
        )
      `)
      .eq("user_id", user.id)
      .eq("status", "active");

  return {

    user,
    profile,
    stats,
    missions

  };

}