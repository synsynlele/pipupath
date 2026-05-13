import { supabase }
from "../supabase";

export async function getRecentMemories({

  userId,

  limit = 10,

}) {

  try {

    const {
      data,
    } = await supabase
      .from("behavioral_memory")
      .select("*")
      .eq("user_id", userId)
      .order(
        "created_at",
        {
          ascending: false,
        }
      )
      .limit(limit);

    return data || [];

  } catch (error) {

    console.error(error);

    return [];

  }

}