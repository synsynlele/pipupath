import { supabase }
from "../supabase";

export async function getRecentMissions(
  userId
) {

  try {

    const {
      data,
    } = await supabase
      .from("user_missions")
      .select("*")
      .eq("user_id", userId)
      .order(
        "created_at",
        {
          ascending: false,
        }
      )
      .limit(5);

    return data || [];

  } catch (error) {

    console.error(error);

    return [];

  }

}