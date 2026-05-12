import { supabase } from "./supabase";

/* =========================
   SAVE REFLECTION
========================= */

export async function saveReflection({

  missionText,
  reflectionText,

  aiSummary,
  aiSentiment,

  aiEnergyScore,
  aiConsistencyScore,

  xpEarned = 0

}){

  const auth = await supabase.auth.getUser();

  const uid = auth?.data?.user?.id;

  if(!uid){
    throw new Error("No authenticated user");
  }

  const { data, error } = await supabase
    .from("reflection_history")
    .insert({

      user_id: uid,

      mission_text: missionText,
      reflection_text: reflectionText,

      ai_summary: aiSummary,
      ai_sentiment: aiSentiment,

      ai_energy_score: aiEnergyScore,
      ai_consistency_score: aiConsistencyScore,

      xp_earned: xpEarned

    })
    .select()
    .single();

  if(error){
    console.log(error);
    throw error;
  }

  return data;
}

/* =========================
   GET FULL HISTORY
========================= */

export async function getReflectionHistory(){

  const auth = await supabase.auth.getUser();

  const uid = auth?.data?.user?.id;

  if(!uid){
    return [];
  }

  const { data, error } = await supabase
    .from("reflection_history")
    .select("*")
    .eq("user_id", uid)
    .order("created_at", { ascending:false });

  if(error){
    console.log(error);
    return [];
  }

  return data || [];
}

/* =========================
   GET RECENT REFLECTIONS
========================= */

export async function getRecentReflections(limit = 5){

  const auth = await supabase.auth.getUser();

  const uid = auth?.data?.user?.id;

  if(!uid){
    return [];
  }

  const { data, error } = await supabase
    .from("reflection_history")
    .select("*")
    .eq("user_id", uid)
    .order("created_at", { ascending:false })
    .limit(limit);

  if(error){
    console.log(error);
    return [];
  }

  return data || [];
}