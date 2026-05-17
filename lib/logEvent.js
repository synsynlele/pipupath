import { supabase }
from "@/lib/supabase";

export async function logEvent({

  userId,

  type,

  title,

  metadata = {},
}) {

  try {

    await supabase
      .from("builder_events")
      .insert({

        user_id:
          userId,

        type,

        title,

        metadata,
      });

  } catch (error) {

    console.error(
      "Failed to log event:",
      error
    );
  }
}