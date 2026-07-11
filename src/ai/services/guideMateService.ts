import { supabase } from "@/lib/supabase";

export async function getGuideMateProfile(userId: string) {
  const { data, error } = await supabase
    .from("growth_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getGuideMateMemories(
  userId: string,
  limit = 12
) {
  const { data, error } = await supabase
    .from("growth_memory")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function saveGuideMateMemory({
  userId,
  title,
  memoryType,
  userMessage,
  aiSummary,
  content,
  importance = "medium",
}: {
  userId: string;
  title: string;
  memoryType: string;
  userMessage: string;
  aiSummary: string;
  content: string;
  importance?: string;
}) {
  const { data, error } = await supabase
    .from("growth_memory")
    .insert({
      user_id: userId,
      title,
      memory_type: memoryType,
      user_message: userMessage,
      ai_summary: aiSummary,
      content,
      importance,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getConversationHistory(
  userId: string,
  limit = 8
) {
  const { data, error } = await supabase
    .from("growth_memory")
    .select("user_message, ai_summary")
    .eq("user_id", userId)
    .eq("memory_type", "conversation")
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}
export async function loadConversationHistory(userId: string) {
  const { data, error } = await supabase
    .from("growth_memory")
    .select("user_message, content")
    .eq("user_id", userId)
    .eq("memory_type", "conversation")
    .order("created_at", { ascending: true })
    .limit(10);

  if (error) {
    console.error(error);
    return [];
  }

  const messages: any[] = [];

  data.forEach((row) => {
    if (row.user_message) {
      messages.push({
        role: "user",
        text: row.user_message,
      });
    }

    if (row.content) {
      messages.push({
        role: "guide",
        text: row.content,
      });
    }
  });

  return messages;
}