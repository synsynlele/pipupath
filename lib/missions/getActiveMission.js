import { supabase }
from "../supabase";

export async function getActiveMission(
  userId
) {

  try {

    const {
      data,
      error,
    } = await supabase

      .from(
        "user_active_missions"
      )

      .select("*")

      .eq(
        "user_id",
        userId
      )

      .eq(
        "status",
        "active"
      )

      .order(
        "created_at",
        {
          ascending: false,
        }
      )

      .limit(1)

      .single();

    if (error) {

      return null;

    }

    return data;

  } catch (error) {

    console.error(error);

    return null;

  }

}