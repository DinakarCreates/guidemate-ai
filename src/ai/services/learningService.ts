import { supabase } from "@/lib/supabase";

export async function getTodayStep(roadmapId: string) {
  const { data, error } = await supabase
    .from("roadmap_steps")
    .select("*")
    .eq("roadmap_id", roadmapId)
    .eq("status", "pending")
    .order("week", { ascending: true })
    .order("day", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function saveLesson(
  stepId: string,
  lesson: any
) {
  const { error } = await supabase
    .from("roadmap_steps")
    .update({
      lesson_json: lesson,
    })
    .eq("id", stepId);

  if (error) {
    console.error(error);
  }
}

export async function savePractice(
  stepId: string,
  practice: any
) {
  const { error } = await supabase
    .from("roadmap_steps")
    .update({
      practice_json: practice,
    })
    .eq("id", stepId);

  if (error) {
    console.error(error);
  }
}

export async function getLesson(stepId: string) {
  const { data, error } = await supabase
    .from("roadmap_steps")
    .select("lesson_json")
    .eq("id", stepId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data.lesson_json;
}

export async function getPractice(stepId: string) {
  const { data, error } = await supabase
    .from("roadmap_steps")
    .select("practice_json")
    .eq("id", stepId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data.practice_json;
}