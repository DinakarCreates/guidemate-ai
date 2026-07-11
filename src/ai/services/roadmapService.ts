import { supabase } from "@/lib/supabase";

export async function getActiveRoadmap(userId: string) {
  const { data, error } = await supabase
    .from("roadmaps")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
export async function getTodayStep(roadmapId: string) {

  const { data, error } = await supabase
    .from("roadmap_steps")
    .select("*")
    .eq("roadmap_id", roadmapId)
    .eq("status", "pending")
    .order("week", { ascending: true })
    .order("day", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function saveRoadmap(
  userId: string,
  roadmap: any
) {
  const { data: roadmapData, error } = await supabase
    .from("roadmaps")
    .insert({
      user_id: userId,
      title: roadmap.title,
      goal: roadmap.goal,
      estimated_duration: roadmap.estimatedDuration,
      motivation: roadmap.motivation,
      raw_json: roadmap,
      status: "active",
      version: 1,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  const roadmapId = roadmapData.id;

  const steps: any[] = [];

  for (const week of roadmap.weeks) {
    for (const day of week.days) {
      steps.push({
        roadmap_id: roadmapId,
        week: week.week,
        day: day.day,
        title: day.title,
        description: day.description,
        estimated_minutes: day.estimatedMinutes,
        status: "pending",
      });
    }
  }

  const { error: stepsError } = await supabase
    .from("roadmap_steps")
    .insert(steps);

  if (stepsError) {
    console.error(stepsError);
  }

  return roadmapData;
}