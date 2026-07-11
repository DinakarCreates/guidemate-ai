import { supabase } from "@/lib/supabase";

export async function saveMemory(
  memoryType: string,
  title: string,
  content: string,
  importance: string = "medium"
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  const existing = await findMemory(memoryType, title);
  let data;
let error;

if (existing) {
  ({ data, error } = await supabase
    .from("growth_memory")
    .update({
      content,
      importance,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existing.id)
    .select()
    .single());
} else {
  ({ data, error } = await supabase
    .from("growth_memory")
    .insert({
      user_id: user.id,
      memory_type: memoryType,
      title,
      content,
      importance,
    })
    .select()
    .single());
}

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
export async function getMemories(memoryType?: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  let query = supabase
    .from("growth_memory")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (memoryType) {
    query = query.eq("memory_type", memoryType);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
export async function deleteMemory(id: string) {
  const { error } = await supabase
    .from("growth_memory")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}
export async function loadUserProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
export async function loadGrowthMemory() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("growth_memory")
    .select("*")
    .eq("user_id", user.id)
    .order("importance", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
export async function findMemory(
  memoryType: string,
  title: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("growth_memory")
    .select("*")
    .eq("user_id", user.id)
    .eq("memory_type", memoryType)
    .eq("title", title)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}