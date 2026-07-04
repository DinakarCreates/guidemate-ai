import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Target, Sparkles } from "lucide-react";

export default function Welcome() {
  return (
    <div className="app-shell">
      <div className="flex flex-1 flex-col justify-between px-6 pb-8 pt-16">
        <div className="animate-fade-in">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Personal AI companion
          </div>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight">
            Meet the version of you <span className="gradient-text">you're becoming.</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            GuideMate learns your future vision and walks with you every day — not another chatbot, a real companion.
          </p>
        </div>

        <div className="my-10 space-y-3 animate-fade-in">
          {[
            { Icon: Compass, title: "Understands your direction", desc: "A conversation, not a form." },
            { Icon: Target, title: "Builds your personal roadmap", desc: "Milestones you can actually follow." },
            { Icon: Sparkles, title: "Guides you daily", desc: "One clear step, every day." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="glass-card flex items-center gap-4 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Link to="/onboarding">
            <Button size="lg" className="w-full rounded-2xl bg-gradient-primary text-primary-foreground btn-glow hover:opacity-95">
              Begin your journey <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-center text-xs text-muted-foreground">Takes about 2 minutes.</p>
        </div>
      </div>
    </div>
  );
}
