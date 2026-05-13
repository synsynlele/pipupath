import { supabase }
from "../supabase";

// =========================
// GET ENTRIES
// =========================

export async function getMagicEntries() {

  try {

    const {

      data: {
        user
      }

    } = await supabase.auth.getUser();

    if (!user) return [];

    const {
      data,
      error,
    } = await supabase

      .from("magic_entries")

      .select("*")

      .eq(
        "user_id",
        user.id
      )

      .order(
        "updated_at",
        {
          ascending: false,
        }
      );

    if (error) {

      console.error(error);

      return [];

    }

    return data || [];

  }

  catch (error) {

    console.error(error);

    return [];

  }

}

// =========================
// SAVE ENTRY
// =========================

export async function saveMagicEntry({

  title,

  content,

  aiSummary,

  aiClarityScore,

  aiEmotionalState,

}) {

  try {

    const {

      data: {
        user
      }

    } = await supabase.auth.getUser();

    if (!user) return null;

    const {
      data,
      error,
    } = await supabase

      .from("magic_entries")

      .insert({

        user_id:
          user.id,

        title,

        content,

        ai_summary:
          aiSummary,

        ai_clarity_score:
          aiClarityScore,

        ai_emotional_state:
          aiEmotionalState,

      })

      .select()

      .single();

    if (error) {

      console.error(error);

      return null;

    }

    return data;

  }

  catch (error) {

    console.error(error);

    return null;

  }

}

// =========================
// UPDATE ENTRY
// =========================

export async function updateMagicEntry({

  id,

  title,

  content,

  aiSummary,

  aiClarityScore,

  aiEmotionalState,

}) {

  try {

    const {
      data,
      error,
    } = await supabase

      .from("magic_entries")

      .update({

        title,

        content,

        ai_summary:
          aiSummary,

        ai_clarity_score:
          aiClarityScore,

        ai_emotional_state:
          aiEmotionalState,

        updated_at:
          new Date(),

      })

      .eq("id", id)

      .select()

      .single();

    if (error) {

      console.error(error);

      return null;

    }

    return data;

  }

  catch (error) {

    console.error(error);

    return null;

  }

}