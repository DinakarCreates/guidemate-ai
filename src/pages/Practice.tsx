import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, Trophy, RotateCcw } from "lucide-react";
import { quiz } from "@/lib/demoData";

export default function Practice() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quiz[i];

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 >= quiz.length) setDone(true);
    else { setI(i + 1); setPicked(null); }
  };

  const reset = () => { setI(0); setPicked(null); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / quiz.length) * 100);
    return (
      <AppShell>
        <PageHeader title="Practice" subtitle="Adaptive quiz complete." />
        <div className="px-6">
          <div className="glass-card bg-gradient-card p-6 text-center animate-scale-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary btn-glow">
              <Trophy className="h-7 w-7 text-primary-foreground" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Your score</p>
            <p className="mt-1 text-4xl font-bold gradient-text">{score}/{quiz.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {pct >= 80 ? "Excellent — you've mastered this." : pct >= 50 ? "Good progress — one more pass and it sticks." : "Let's revisit the lesson together."}
            </p>
          </div>

          <div className="mt-6 glass-card p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recommended next</p>
            <Link to="/learning" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <ArrowRight className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Empty states that teach</p>
                <p className="text-xs text-muted-foreground">7 min · builds on today's lesson</p>
              </div>
            </Link>
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={reset} variant="outline" size="lg" className="flex-1 rounded-2xl">
              <RotateCcw className="mr-1 h-4 w-4" /> Retry
            </Button>
            <Link to="/home" className="flex-1">
              <Button size="lg" className="w-full rounded-2xl bg-gradient-primary text-primary-foreground">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader title="Practice" subtitle={`Question ${i + 1} of ${quiz.length}`} />

      <div className="px-6">
        <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-primary transition-all duration-500"
            style={{ width: `${((i + (picked !== null ? 1 : 0)) / quiz.length) * 100}%` }}
          />
        </div>

        <div className="glass-card p-6 animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Question</p>
          <h2 className="mt-2 text-xl font-semibold leading-snug">{q.q}</h2>

          <div className="mt-6 space-y-2.5">
            {q.options.map((opt, idx) => {
              const isPicked = picked === idx;
              const isCorrect = idx === q.correct;
              const showState = picked !== null;
              return (
                <button
                  key={idx}
                  onClick={() => choose(idx)}
                  disabled={picked !== null}
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm transition ${
                    showState && isCorrect
                      ? "border-primary/60 bg-primary/10"
                      : showState && isPicked && !isCorrect
                        ? "border-destructive/60 bg-destructive/10"
                        : "border-border/60 bg-card hover:border-primary/40"
                  }`}
                >
                  <span>{opt}</span>
                  {showState && isCorrect && <Check className="h-4 w-4 text-primary" />}
                  {showState && isPicked && !isCorrect && <X className="h-4 w-4 text-destructive" />}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div className="mt-5 rounded-2xl bg-secondary p-4 text-sm text-muted-foreground animate-fade-in">
              {picked === q.correct
                ? "Nice — that's the essence of progressive disclosure."
                : "Not quite. The idea is to match complexity with a user's readiness."}
            </div>
          )}
        </div>

        {picked !== null && (
          <Button onClick={next} size="lg" className="mt-6 w-full rounded-2xl bg-gradient-primary text-primary-foreground btn-glow">
            {i + 1 >= quiz.length ? "See results" : "Next question"} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </AppShell>
  );
}
