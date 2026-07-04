import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Splash() {
  const nav = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => nav("/welcome"), 1800);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <div className="app-shell items-center justify-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 animate-fade-in">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-primary btn-glow animate-pulse-glow">
          <Sparkles className="h-10 w-10 text-primary-foreground" strokeWidth={2.2} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">GuideMate</h1>
          <p className="mt-2 text-sm text-muted-foreground">Become your future self.</p>
        </div>
      </div>
      <p className="pb-10 text-xs text-muted-foreground">v0.1 · Hackathon MVP</p>
    </div>
  );
}
