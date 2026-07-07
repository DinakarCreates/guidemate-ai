import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabase";


interface Msg { role: "guide" | "user"; text: string; }

const script: { prompt: string; suggestions?: string[] }[] = [
  { prompt: "Hi, I'm GuideMate. Before anything else — what future version of yourself are you trying to become?", suggestions: ["A product designer", "A founder", "A fitter, calmer me"] },
  { prompt: "Beautiful. Where are you today in that journey? What feels stuck?", suggestions: ["I keep starting over", "I lack a plan", "I don't have time"] },
  { prompt: "What do you already do well? Name one strength you can build on.", suggestions: ["I'm curious", "I'm consistent when I have a plan", "I have taste"] },
  { prompt: "And the biggest thing in your way — what's your main barrier right now?", suggestions: ["Self-doubt", "Distraction", "No feedback loop"] },
  { prompt: "Last one. How do you learn best?", suggestions: ["Short lessons with examples", "Doing over reading", "Deep dives"] },
];

export default function Onboarding() {
  const nav = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([{ role: "guide", text: script[0].prompt }]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [answers, setAnswers] = useState({
  future_vision: "",
  current_state: "",
  strengths: [] as string[],
  barriers: [] as string[],
  learning_preference: "",
});
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages, typing]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const updatedAnswers = { ...answers };

switch (step) {
  case 0:
    updatedAnswers.future_vision = text;
    break;

  case 1:
    updatedAnswers.current_state = text;
    break;

  case 2:
    updatedAnswers.strengths = [text];
    break;

  case 3:
    updatedAnswers.barriers = [text];
    break;

  case 4:
    updatedAnswers.learning_preference = text;
    break;
}

setAnswers(updatedAnswers);
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(async() => {
      const next = step + 1;
      if (next < script.length) {
        setMessages((m) => [...m, { role: "guide", text: script[next].prompt }]);
        setStep(next);
        setTyping(false);
      }else {
  setMessages((m) => [
    ...m,
    {
      role: "guide",
      text: "Thank you. Give me a moment — I'm shaping your reflection."
    }
  ]);

  setTyping(false);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { error } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: user.email?.split("@")[0] || "GuideMate User",
        future_vision: updatedAnswers.future_vision,
        strengths: updatedAnswers.strengths,
        barriers: updatedAnswers.barriers,
        learning_preference: updatedAnswers.learning_preference,
        current_state: updatedAnswers.current_state,  
        onboarding_completed: true,
      });

    if (error) {
      console.error(error);
    } else {
      console.log("Profile saved!");
    }
  }

  setTimeout(() => nav("/reflection"), 1400);
}
    }, 700);
  };

  const current = script[step];

  return (
    <div className="app-shell">
      <header className="flex items-center gap-3 px-6 pb-4 pt-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold">GuideMate</p>
          <p className="text-xs text-muted-foreground">Getting to know you · {step + 1}/{script.length}</p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex animate-fade-in ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card text-foreground rounded-bl-md border border-border/60"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-3xl border border-border/60 bg-card px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "120ms" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "240ms" }} />
            </div>
          </div>
        )}
      </div>

      {current?.suggestions && !typing && (
        <div className="flex gap-2 overflow-x-auto px-5 pb-3 no-scrollbar">
          {current.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="shrink-0 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-border/60 bg-background/80 p-4 backdrop-blur-xl">
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-3 py-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your reply…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button type="submit" size="icon" className="h-9 w-9 rounded-xl bg-gradient-primary text-primary-foreground">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
