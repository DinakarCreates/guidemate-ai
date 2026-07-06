import { Link } from "react-router-dom";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, Brain, MessageCircle, ArrowRight, Clock, Check } from "lucide-react";
import { lesson } from "@/lib/demoData";

export default function Learning() {
  const upcoming = [
    { title: "Visual hierarchy", minutes: 6, done: true },
    { title: "Progressive disclosure", minutes: 8, active: true },
    { title: "Empty states that teach", minutes: 7 },
    { title: "Micro-interactions", minutes: 10 },
  ];

  return (
    <AppShell>
      <PageHeader title="Learning" subtitle="Short, personalized lessons based on how you learn." />

      <section className="px-6">
        <div className="glass-card bg-gradient-card p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <BookOpen className="h-3.5 w-3.5" /> Today's lesson
          </div>
          <h2 className="mt-2 text-xl font-bold leading-tight">{lesson.title}</h2>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {lesson.minutes} min read
          </div>
          <p className="mt-4 text-[15px] leading-relaxed">{lesson.summary}</p>
        </div>
      </section>

      <section className="mt-5 px-6">
        <div className="glass-card p-5">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5 text-primary" /> Example
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{lesson.example}</p>
        </div>
      </section>

      <section className="mt-4 px-6">
        <div className="glass-card p-5">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-accent" /> Memory hook
          </p>
          <p className="text-sm italic leading-relaxed">"{lesson.memoryHook}"</p>
        </div>
      </section>

      <section className="mt-4 px-6">
        <div className="glass-card p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Summary</p>
          <ul className="space-y-2">
            {lesson.keyPoints.map((k) => (
              <li key={k} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-4 px-6">
        <button className="glass-card flex w-full items-center gap-3 p-4 text-left transition hover:border-primary/40">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Ask GuideMate</p>
            <p className="text-xs text-muted-foreground">Get a personal explanation on this lesson</p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </section>

      <section className="mt-6 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Up next</h2>
        <div className="glass-card divide-y divide-border/60">
          {upcoming.map((u) => (
            <div key={u.title} className="flex items-center gap-3 p-4">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  u.done ? "bg-primary text-primary-foreground" : u.active ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
                }`}
              >
                {u.done ? <Check className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{u.title}</p>
                <p className="text-xs text-muted-foreground">{u.minutes} min</p>
              </div>
              {u.active && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">Now</span>}
            </div>
          ))}
        </div>
      </section>

      <div className="px-6 py-6">
        <Link to="/practice">
          <Button size="lg" className="w-full rounded-2xl bg-gradient-primary text-primary-foreground btn-glow">
            Practice this lesson <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </AppShell>
  );
}
