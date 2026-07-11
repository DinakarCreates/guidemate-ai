import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import {
  Sparkles,
  Flame,
  Clock,
  TrendingUp,
  Bell,
  Moon,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [dayStreak, setDayStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const nav = useNavigate();

  async function fetchProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Fetch Profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
    }

    // Fetch Active Roadmap
    const { data: roadmapData } = await supabase
      .from("roadmaps")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (roadmapData) {
      setRoadmap(roadmapData);
      const { data: completed } = await supabase
  .from("roadmap_steps")
  .select("*")
  .eq("roadmap_id", roadmapData.id)
  .eq("status", "completed");

if (completed) {
  setCompletedLessons(completed.length);

  const total = completed.reduce(
    (sum, item) => sum + (item.estimated_minutes || 0),
    0
  );

  setTotalMinutes(total);
  setTodayMinutes(total);
}

const created = new Date(user.created_at);
const now = new Date();

const diff = Math.floor(
  (now.getTime() - created.getTime()) /
    (1000 * 60 * 60 * 24)
);

setDayStreak(diff + 1);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    nav("/login");
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AppShell>
      <PageHeader title="Profile" />

      {/* User Card */}

      <section className="px-6">
        <div className="glass-card flex items-center gap-4 p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-xl font-bold text-primary-foreground">
            {profile?.full_name?.[0] || "G"}
          </div>

          <div>
            <p className="text-lg font-semibold">
              {profile?.full_name || "GuideMate User"}
            </p>

            <p className="text-xs text-muted-foreground">
              On day {dayStreak} of the journey
            </p>
          </div>
        </div>
      </section>

      {/* Future Vision */}

      <section className="mt-6 px-6">
        <div className="glass-card bg-gradient-card p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Future Vision
          </div>

          <p className="mt-3 text-[15px] font-medium leading-relaxed">
            {roadmap?.goal || profile?.future_vision}
          </p>
        </div>
      </section>
            {/* Motivation */}

      <section className="mt-6 px-6">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Motivation from GuideMate
          </div>

          <p className="mt-3 text-sm leading-7 whitespace-pre-line">
            {roadmap?.motivation ||
              "Stay consistent. Every lesson, every project, and every small step moves you closer to the future you're building."}
          </p>
        </div>
      </section>

      {/* Journey Statistics */}

      <section className="mt-6 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Journey Statistics
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {[
  {
    label: "Streak",
    value: dayStreak,
    icon: Flame,
  },
  {
    label: "Hours",
    value: Math.floor(totalMinutes / 60),
    icon: Clock,
  },
  {
    label: "Lessons",
    value: completedLessons,
    icon: TrendingUp,
  },
].map((s) => (
            <div
              key={s.label}
              className="glass-card p-4 text-center"
            >
              <s.icon className="mx-auto mb-2 h-4 w-4 text-primary" />

              <p className="text-xl font-bold">
                {s.value}
              </p>

              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Settings */}

      <section className="mt-6 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Settings
        </h2>

        <div className="glass-card divide-y divide-border/60">
          {[
            {
              icon: Bell,
              label: "Notifications",
              value: "Daily 8:00 AM",
            },
            {
              icon: Moon,
              label: "Appearance",
              value: "Dark",
            },
            {
              icon: LogOut,
              label: "Sign out",
            },
          ].map((s) => (
            <button
              key={s.label}
              onClick={
                s.label === "Sign out"
                  ? handleLogout
                  : undefined
              }
              className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-secondary/40"
            >
              <s.icon className="h-4 w-4 text-muted-foreground" />

              <span className="flex-1 text-sm">
                {s.label}
              </span>

              {s.value && (
                <span className="text-xs text-muted-foreground">
                  {s.value}
                </span>
              )}

              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>
          </AppShell>
  );
}