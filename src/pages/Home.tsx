import { Link } from "react-router-dom";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { BookOpen, Dumbbell, Sparkles, Send, TrendingUp, Flame, Clock, ArrowRight } from "lucide-react";
import { demoUser, roadmap, conversation } from "@/lib/demoData";
import { useState } from "react";

export default function Home() {
  const [msgs, setMsgs] = useState(conversation);
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "guide", text: "Let's break that into one small next action. What's the first 5-minute step you could take?" }]);
    }, 600);
  };

  return (
    <AppShell>
      <header className="flex items-center justify-between px-6 pb-2 pt-8">
        <div>
          <p className="text-xs text-muted-foreground">Good morning</p>
          <h1 className="text-2xl font-bold tracking-tight">{demoUser.name}</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs">
          <Flame className="h-3.5 w-3.5 text-primary" />
          <span className="font-semibold">{demoUser.streak}</span>
          <span className="text-muted-foreground">day streak</span>
        </div>
      </header>

      <section className="px-6 pt-4">
        <div className="glass-card bg-gradient-card p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Today's step
          </div>
          <p className="mt-3 text-lg font-semibold leading-snug">{roadmap.todayStep.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{roadmap.todayStep.why}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {roadmap.todayStep.minutes} min
            </span>
            <Button size="sm" className="rounded-xl bg-gradient-primary text-primary-foreground">
              Begin <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-6 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Journey progress</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Today", value: `${demoUser.minutesToday}m`, icon: Clock },
            { label: "Lessons", value: demoUser.lessonsCompleted, icon: BookOpen },
            { label: "Total", value: `${demoUser.totalHours}h`, icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <s.icon className="mx-auto mb-1.5 h-4 w-4 text-primary" />
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Talk with GuideMate</h2>
        <div className="glass-card overflow-hidden">
          <div className="max-h-72 space-y-2 overflow-y-auto p-4 no-scrollbar">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex items-center gap-2 border-t border-border/60 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask GuideMate anything…"
              className="flex-1 rounded-xl bg-secondary px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button type="submit" size="icon" className="h-9 w-9 rounded-xl bg-gradient-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      <section className="mt-6 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Quick actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/learning" className="glass-card flex items-center gap-3 p-4 transition hover:border-primary/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Learn</p>
              <p className="text-[11px] text-muted-foreground">Today's lesson</p>
            </div>
          </Link>
          <Link to="/practice" className="glass-card flex items-center gap-3 p-4 transition hover:border-primary/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/20 text-accent">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Practice</p>
              <p className="text-[11px] text-muted-foreground">Adaptive quiz</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mt-6 px-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Recent progress</h2>
        <div className="glass-card divide-y divide-border/60">
          {[
            { title: "Completed: Layout hierarchy", time: "Yesterday" },
            { title: "Quiz score: 8/10", time: "2 days ago" },
            { title: "Milestone: Design foundations", time: "1 week ago" },
          ].map((r) => (
            <div key={r.title} className="flex items-center justify-between p-4">
              <p className="text-sm">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.time}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
