import { loadUserProfile, loadGrowthMemory } from "./memory";
import { buildRoadmapPrompt } from "./promptBuilder";
import { generateRoadmap } from "./agents/roadmap";
import {
  saveRoadmap,
  getActiveRoadmap,
} from "./services/roadmapService";
import { supabase } from "@/lib/supabase";

export async function guideMateBrain(task: string) {
  // Load user profile and growth memory
  const profile = await loadUserProfile();
  const memory = await loadGrowthMemory();

  // Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Check for an existing active roadmap
  const existingRoadmap = await getActiveRoadmap(user.id);

  if (existingRoadmap) {
    console.log("✅ Existing roadmap found.");

    return {
      profile,
      memory,
      roadmap: existingRoadmap,
      saved: true,
    };
  }

  console.log("🧠 No roadmap found. Generating new roadmap...");

  // Build AI prompt
  const prompt = buildRoadmapPrompt(profile, memory, task);

  // Generate roadmap
  const roadmap = await generateRoadmap(prompt);

  if (!roadmap) {
    return {
      profile,
      memory,
      roadmap: null,
      saved: false,
    };
  }

  // Save roadmap
  const savedRoadmap = await saveRoadmap(user.id, roadmap);

  return {
    profile,
    memory,
    roadmap: savedRoadmap,
    saved: true,
  };
}