import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Msg {
  role: "guide" | "user";
  text: string;
}

const script = [
  {
    prompt:
      "👋 Welcome to GuideMate.\n\nBefore we build your personalized AI roadmap, I'd love to know a little about you.\n\nTell us about yourself.\n\nExample:\n• Name: Dinakar\n• Age: 20\n• Current Status: 2nd Year B.Tech (ECE)\n• Daily Time Available: 2 hours\n• Current Experience: Beginner in AI & Python",
  },
  {
    prompt:
      "🚀 What future are you building?\n\nExample:\n\nLong-term Vision:\nBuild an AI startup that helps millions.\n\nShort-term Goal:\nLearn Python, AI and build my first AI project this year.",
  },
  {
    prompt:
      "💪 What will help you, and what may hold you back?\n\nExample:\n\nStrengths\n• Curious\n• Creative\n• Fast learner\n\nBarriers\n• Procrastination\n• Fear of failure\n• Inconsistency",
  },
  {
    prompt:
      "🧠 How do you learn best?\n\nExample:\n• Step-by-step explanations\n• Visual examples\n• Real projects\n• Practice questions\n• Analogies\n• Short lessons",
  },
];

export default function Onboarding() {
  const nav = useNavigate();

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "guide",
      text: script[0].prompt,
    },
  ]);

  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const [answers, setAnswers] = useState({
    about_me: "",
    future_goal: "",
    strengths_barriers: "",
    learning_preference: "",
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });

    inputRef.current?.focus();
  }, [messages, typing]);
  const send = async (text: string) => {
  if (!text.trim()) return;

  const updatedAnswers = { ...answers };

  switch (step) {
    case 0:
      updatedAnswers.about_me = text;
      break;

    case 1:
      updatedAnswers.future_goal = text;
      break;

    case 2:
      updatedAnswers.strengths_barriers = text;
      break;

    case 3:
      updatedAnswers.learning_preference = text;
      break;
  }

  setAnswers(updatedAnswers);

  setMessages((m) => [
    ...m,
    {
      role: "user",
      text,
    },
  ]);

  setInput("");
  setTyping(true);

  setTimeout(async () => {
    const next = step + 1;

    if (next < script.length) {
      setMessages((m) => [
        ...m,
        {
          role: "guide",
          text: script[next].prompt,
        },
      ]);

      setStep(next);
      setTyping(false);
      return;
    }

    setMessages((m) => [
      ...m,
      {
        role: "guide",
        text:
          "✨ Perfect. I'm building your Growth Profile and preparing your personalized roadmap...",
      },
    ]);

    setTyping(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name:
  user.user_metadata?.full_name ||
  user.email?.split("@")[0] ||
  "GuideMate User",

          about_me: updatedAnswers.about_me,
          future_goal: updatedAnswers.future_goal,
          strengths_barriers: updatedAnswers.strengths_barriers,
          learning_preference: updatedAnswers.learning_preference,

          onboarding_completed: true,
        });

      if (error) {
        console.error(error);
      } else {
        console.log("✅ Profile saved");
      }
    }

    setTimeout(() => {
      nav("/home");
    }, 1800);

  }, 700);
};
const current = script[step];

return (
  <div className="app-shell">

    <header className="flex items-center gap-3 px-6 pt-8 pb-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-primary">
        <Sparkles className="h-5 w-5 text-primary-foreground" />
      </div>

      <div className="flex-1">
        <p className="text-lg font-bold">GuideMate</p>
        <p className="text-xs text-muted-foreground">
          Step {step + 1} of {script.length}
        </p>
      </div>
    </header>

    {/* Progress Bar */}

    <div className="px-6">
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-gradient-primary transition-all duration-500"
          style={{
            width: `${((step + 1) / script.length) * 100}%`,
          }}
        />
      </div>
    </div>

    {/* Chat */}

    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto space-y-4 px-5 py-5 no-scrollbar"
    >
      {messages.map((m, i) => (
        <div
          key={i}
          className={`flex ${
            m.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-[88%] rounded-3xl px-4 py-3 whitespace-pre-line text-sm leading-7 ${
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-card border border-border/60 rounded-bl-md"
            }`}
          >
            {m.text}
          </div>
        </div>
      ))}

      {typing && (
        <div className="flex justify-start">
          <div className="rounded-3xl border border-border/60 bg-card px-4 py-3 flex gap-1">
            <span
              className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      )}
    </div>

    {/* Input */}

    <div className="border-t border-border/60 bg-background/80 backdrop-blur-xl p-4">

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-3 py-2"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
        />

        <Button
          type="submit"
          size="icon"
          className="rounded-xl h-10 w-10 bg-gradient-primary text-primary-foreground"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>

    </div>

  </div>
);
}