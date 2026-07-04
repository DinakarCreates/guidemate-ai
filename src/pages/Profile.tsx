import { Link } from "react-router-dom";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, ShieldAlert, GraduationCap, Flame, Clock, TrendingUp, Bell, Moon, LogOut, ChevronRight } from "lucide-react";
import { demoUser } from "@/lib/demoData";

export default function Profile() {
  return (
    <AppShell>
      <PageHeader title="Profile" />

      <section className="px-6">
        <div className="glass-card flex items-center gap-4 p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-xl font-bold text-primary-foreground">
            {demoUser.name[0]}
          </div>
          <div>
            <p className="text-lg font-semibold">{demoUser.name}</p>
            <p className="text-xs text-muted-foreground">On day {demoUser.streak} of the journey</p>
          </div>
        </div>
      </section>

      <section className="mt-6 px-6">
        <div className="glass-card bg-gradient-card p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Future vision
          </div>
          <p className="mt-2 text-[15px] font-medium leading-relaxed">{demoUser.futureYou}</p>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 px-6">
        <div className="glass-card p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-primary" /> Strengths
          </div>
          <ul className="space-y-1.5">
            {demoUser.strengths.map((s) => (
              <li key={s} className="text-xs text-foreground">· {s}</li>
            ))}
          </ul>
        </div>
        <div className="glass-card p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ShieldAlert className="h-3.5 w-3.5 text-accent" /> Barriers
          </div>
          <ul className="space-y-1.5">
            {demoUser.barriers.map((b) => (
              <li key={b} className="text-xs text-foreground">· {b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-4 px-6">
        <div className="glass-card p-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-primary" /> Learning preferences
          </div>
          <p className="text-sm leading-relaxed">{demoUser.learningStyle}</p>
        </div>
      </section>

      <section className="mt-6 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Journey statistics</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Streak", value: demoUser.streak, icon: Flame },
            { label: "Hours", value: demoUser.totalHours, icon: Clock },
            { label: "Lessons", value: demoUser.lessonsCompleted, icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <s.icon className="mx-auto mb-1.5 h-4 w-4 text-primary" />
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Settings</h2>
        <div className="glass-card divide-y divide-border/60">
          {[
            { icon: Bell, label: "Notifications", value: "Daily 8:00 AM" },
            { icon: Moon, label: "Appearance", value: "Dark" },
            { icon: LogOut, label: "Sign out" },
          ].map((s) => (
            <button key={s.label} className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-secondary/40">
              <s.icon className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-sm">{s.label}</span>
              {s.value && <span className="text-xs text-muted-foreground">{s.value}</span>}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

      <div className="px-6 py-6">
        <Link to="/">
          <Button variant="outline" size="lg" className="w-full rounded-2xl">
            Restart demo
          </Button>
        </Link>
      </div>
    </AppShell>
  );
}
