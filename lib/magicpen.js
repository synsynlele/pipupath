import { supabase }
from "./supabase";

// =========================
// SAVE ENTRY
// =========================

export async function saveMagicEntry({

  title,

  content,

  aiSummary = "",

  aiClarityScore = 0,

  aiEmotionalState = "",

}) {

  const {

    data: { user },

  } = await supabase.auth.getUser();

  if (!user) {

    throw new Error(
      "User not authenticated"
    );
  }

  const { data, error } =
    await supabase
      .from("magicpen_entries")
      .insert([

        {
          user_id: user.id,

          title,

          content,

          ai_summary: aiSummary,

          ai_clarity_score:
            aiClarityScore,

          ai_emotional_state:
            aiEmotionalState,
        },

      ])
      .select()
      .single();

  if (error) {

    console.error(error);

    throw error;
  }

  return data;
}

// =========================
// GET ENTRIES
// =========================

export async function getMagicEntries() {

  const {

    data: { user },

  } = await supabase.auth.getUser();

  if (!user) {

    throw new Error(
      "User not authenticated"
    );
  }

  const { data, error } =
    await supabase
      .from("magicpen_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", {
        ascending: false,
      });

  if (error) {

    console.error(error);

    throw error;
  }

  return data || [];
}

// =========================
// UPDATE ENTRY
// =========================

export async function updateMagicEntry({

  id,

  title,

  content,

  aiSummary = "",

  aiClarityScore = 0,

  aiEmotionalState = "",

}) {

  const { data, error } =
    await supabase
      .from("magicpen_entries")
      .update({

        title,

        content,

        ai_summary: aiSummary,

        ai_clarity_score:
          aiClarityScore,

        ai_emotional_state:
          aiEmotionalState,

        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

  if (error) {

    console.error(error);

    throw error;
  }

  return data;
}

// =========================
// DELETE ENTRY
// =========================

export async function deleteMagicEntry(
  id
) {

  const { error } =
    await supabase
      .from("magicpen_entries")
      .delete()
      .eq("id", id);

  if (error) {

    console.error(error);

    throw error;
  }

  return true;
}