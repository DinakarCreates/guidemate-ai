import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { demoUser } from "@/lib/demoData";

export default function Reflection() {
  return (
    <div className="app-shell">
      <div className="flex flex-1 flex-col px-6 pb-8 pt-10">
        <p className="text-xs uppercase tracking-widest text-primary">Your reflection</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Here's what I heard.</h1>

        <div className="mt-8 space-y-4 animate-fade-in">
          <div className="glass-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Current you</p>
            <p className="mt-2 text-[15px] leading-relaxed">{demoUser.currentYou}</p>
          </div>

          <div className="flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
              <ArrowDown className="h-4 w-4" />
            </div>
          </div>

          <div className="glass-card border-primary/40 bg-gradient-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Future you</p>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">{demoUser.futureYou}</p>
          </div>

          <div className="glass-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Primary barrier</p>
            <p className="mt-2 text-[15px] leading-relaxed">{demoUser.primaryBarrier}</p>
          </div>

          <div className="glass-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Summary</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{demoUser.summary}</p>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/roadmap">
            <Button size="lg" className="w-full rounded-2xl bg-gradient-primary text-primary-foreground btn-glow">
              Continue to your roadmap <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
