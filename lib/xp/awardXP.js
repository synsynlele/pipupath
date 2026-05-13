export function calculateLevel(xp) {

  return Math.floor(xp / 100) + 1;

}

export async function awardXP({
  supabase,
  userId,
  amount,
}) {

  const { data: profile }
    = await supabase
      .from("profiles")
      .select("xp, level")
      .eq("id", userId)
      .single();

  if (!profile) return;

  const newXP =
    (profile.xp || 0) + amount;

  const newLevel =
    calculateLevel(newXP);

  await supabase
    .from("profiles")
    .update({
      xp: newXP,
      level: newLevel,
    })
    .eq("id", userId);

}