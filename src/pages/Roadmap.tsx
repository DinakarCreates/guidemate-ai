import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Check, Circle, Clock, CalendarDays, ArrowRight, Target } from "lucide-react";
import { roadmap } from "@/lib/demoData";

export default function Roadmap() {
  const [mode, setMode] = useState<"task" | "schedule">("task");

  return (
    <AppShell>
      <PageHeader title="Your roadmap" subtitle="A living plan that adapts with you." />

      <div className="px-6">
        <div className="glass-card overflow-hidden bg-gradient-card p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Target className="h-3.5 w-3.5" /> Long-term goal
          </div>
          <p className="mt-2 text-lg font-semibold leading-snug">{roadmap.longTermGoal}</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[32%] rounded-full bg-gradient-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">32%</span>
          </div>
        </div>
      </div>

      <section className="mt-8 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Milestones</h2>
        <ol className="space-y-3">
          {roadmap.milestones.map((m) => {
            const Icon = m.status === "done" ? Check : m.status === "current" ? Clock : Circle;
            return (
              <li key={m.title} className="glass-card flex items-center gap-4 p-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                    m.status === "done"
                      ? "bg-primary text-primary-foreground"
                      : m.status === "current"
                        ? "bg-primary/15 text-primary"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.weeks}</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{m.progress}%</span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-8 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Today's step</h2>
        <div className="glass-card bg-gradient-card p-5">
          <p className="text-lg font-semibold leading-snug">{roadmap.todayStep.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{roadmap.todayStep.why}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {roadmap.todayStep.minutes} min
            </span>
            <Link to="/home">
              <Button size="sm" className="rounded-xl bg-gradient-primary text-primary-foreground">
                Start <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 px-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground">Plan mode</h2>
          <div className="inline-flex rounded-xl border border-border/60 bg-card p-0.5">
            <button
              onClick={() => setMode("task")}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition ${mode === "task" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Task
            </button>
            <button
              onClick={() => setMode("schedule")}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition ${mode === "schedule" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Schedule
            </button>
          </div>
        </div>
        <div className="glass-card p-5">
          {mode === "task" ? (
            <ul className="space-y-3">
              {["Redesign onboarding of a familiar app", "Read: Progressive disclosure notes", "Sketch 3 layout variations"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <Circle className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-3 text-sm">
              {[
                { time: "09:00", task: "Lesson: Progressive disclosure" },
                { time: "12:30", task: "Practice quiz" },
                { time: "19:00", task: "Redesign task · 25 min" },
              ].map((row) => (
                <li key={row.time} className="flex items-center gap-4">
                  <span className="w-14 text-xs font-medium text-primary">{row.time}</span>
                  <span className="flex-1">{row.task}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mt-8 px-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <CalendarDays className="h-4 w-4" /> Journey timeline
        </h2>
        <div className="glass-card p-5">
          <div className="relative ml-2 space-y-5 border-l border-border/60 pl-5">
            {[
              { date: "Week 6 · Today", title: "Learning UI patterns", accent: true },
              { date: "Week 3", title: "Finished design foundations" },
              { date: "Week 1", title: "Started with GuideMate" },
            ].map((e, i) => (
              <div key={i} className="relative">
                <span
                  className={`absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 ${
                    e.accent ? "border-primary bg-primary" : "border-border bg-card"
                  }`}
                />
                <p className="text-xs text-muted-foreground">{e.date}</p>
                <p className="text-sm font-medium">{e.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
