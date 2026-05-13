import { supabase }
from "../supabase";

export async function storeMemory({

  userId,

  memoryType,

  content,

  importance = 1,

}) {

  if (!userId) return;

  await supabase
    .from("behavioral_memory")
    .insert({

      user_id:
        userId,

      memory_type:
        memoryType,

      content,

      importance,

    });

}