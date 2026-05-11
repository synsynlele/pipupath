import { createClient } from "@/lib/supabase/server";

export async function assignStarterMissions(
  userId: string
) {

  const supabase = await createClient();

  // CHECK EXISTING

  const { data: existing } = await supabase
    .from("user_missions")
    .select("id")
    .eq("user_id", userId);

  if (existing && existing.length > 0) {
    return;
  }

  // GET MISSIONS

  const { data: missions } = await supabase
    .from("missions")
    .select("id")
    .limit(3);

  if (!missions) return;

  // CREATE USER MISSIONS

  const inserts = missions.map((mission) => ({
    user_id: userId,
    mission_id: mission.id
  }));

  await supabase
    .from("user_missions")
    .insert(inserts);
}