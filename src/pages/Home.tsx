import { Link, useNavigate, useLocation } from "react-router-dom";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Dumbbell,
  Flame,
  Clock,
  ArrowRight,
  Lock,
  TrendingUp,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState, useRef } from "react";
import { guideMateBrain } from "@/ai/brain";
import { getTodayStep } from "@/ai/services/roadmapService";
import { MessageCircle, Send, Plus } from "lucide-react";
import { askGuideMate } from "@/ai/agents/guidemate";
import {loadConversationHistory,} from "@/ai/services/guideMateService";

export default function Home() {
  const nav = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useState<"plan" | "guide">("plan");
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showGuideInfo, setShowGuideInfo] = useState(false);
  const [userId, setUserId] = useState("");

  const [profile, setProfile] = useState<any>(null);
  const [todayStep, setTodayStep] = useState<any>(null);
  const [nextStep, setNextStep] = useState<any>(null);

  const [todayMinutes, setTodayMinutes] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const [dayStreak, setDayStreak] = useState(0);
  const [greeting, setGreeting] = useState("Welcome");
  const chatEndRef = useRef<HTMLDivElement>(null);
  

//for scrolling to bottom of chat when new message is added
useEffect(() => {
  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, sending]);

// Load Home Data on Component Mount
  useEffect(() => {

loadHome();

}, []);
useEffect(() => {
  if (location.state?.openGuideMate) {
    setTab("guide");

    if (location.state?.prompt) {
      setMessage(location.state.prompt);
    }

    nav(location.pathname, {
      replace: true,
      state: {},
    });
  }
}, [location, nav]);

  async function loadHome() {
    const hour = new Date().getHours();

    if (hour < 12)
      setGreeting("Good Morning");
    else if (hour < 17)
      setGreeting("Good Afternoon");
    else
      setGreeting("Good Evening");

    const brain = await guideMateBrain("Create today's roadmap");
    const {data: { user }, } = await supabase.auth.getUser();

    if (!brain || !user) return;
    setProfile(brain.profile);
    setUserId(user.id);
const history = await loadConversationHistory(user.id);

if (history.length > 0) {
  setMessages(history);
} else {
  setMessages([
    {
      role: "guide",
      text: `Hello ${brain.profile.full_name} 👋

I'm GuideMate.

I'm here to help you with:

• Learning
• Coding
• Career Planning
• Startup Ideas
• Productivity
• Discipline
• Interview Preparation

How can I help you today?`,
    },
  ]);
}
    
    //---------------------------------------
    // Today's Lesson
    //---------------------------------------

    const today = await getTodayStep(brain.roadmap.id);
    console.log("Roadmap:", brain.roadmap);
    console.log("Today's Step:", today);

    setTodayStep(today);

    //---------------------------------------
    // Next Lesson
    //---------------------------------------

    if (today) {
      const { data: next } = await supabase
        .from("roadmap_steps")
        .select("*")
        .eq("roadmap_id", today.roadmap_id)
        .gt("day", today.day)
        .order("day")
        .limit(1)
        .single();

      setNextStep(next);
    }

    //---------------------------------------
    // Progress
    //---------------------------------------

    const { data: completed } = await supabase
      .from("roadmap_steps")
      .select("*")
      .eq("roadmap_id", today?.roadmap_id)
      .eq("status", "completed");

    if (completed) {
      setCompletedLessons(completed.length);

      const total = completed.reduce(
        (sum, item) => sum + (item.estimated_minutes || 0),
        0
      );

      setTotalMinutes(total);
      setTodayMinutes(total);
    }

    //---------------------------------------
    // Day Streak
    //---------------------------------------

    if (user.created_at) {
      const created = new Date(user.created_at);
      const now = new Date();

      const diff = Math.floor(
        (now.getTime() - created.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      setDayStreak(diff + 1);
    }
  }

  async function beginLesson() {
    nav("/learning");
  }

  async function unlockNextLesson() {
    if (!todayStep) return;

    await supabase
      .from("roadmap_steps")
      .update({
        status: "completed",
      })
      .eq("id", todayStep.id);

    loadHome();
  }

 async function sendPresetMessage(text: string) {
  if (sending || !userId) return;

  setMessage("");

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text,
    },
  ]);

  setSending(true);

  try {
    const result = await askGuideMate(userId, text);

    const latestHistory = await loadConversationHistory(userId);

    setMessages(latestHistory);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "guide",
        text: "Sorry, something went wrong.",
      },
    ]);
  } finally {
    setSending(false);
  }
}
async function sendMessage() {
  const text = message.trim();
  if (!text) return;
  setMessage("");
  await sendPresetMessage(text);
}
  return (
  <AppShell>

    {/* Header */}
    

    <header className="flex items-center justify-between px-6 pb-2 pt-8">

      <div>
        <p className="text-xs text-muted-foreground">
          {greeting}
        </p>

        <h1 className="text-2xl font-bold tracking-tight">
          {profile?.full_name || "Mate"}
        </h1>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs">

        <Flame className="h-3.5 w-3.5 text-primary" />

        <span className="font-semibold">
          {dayStreak}
        </span>

        <span className="text-muted-foreground">
          Day Streak
        </span>

      </div>

    </header>

    <section className="mt-4 px-6">

<div className="glass-card flex overflow-hidden p-1">

<button

onClick={()=>setTab("plan")}

className={`flex-1 rounded-xl py-3 text-sm font-semibold transition

${tab==="plan"

?"bg-primary text-primary-foreground"

:"text-muted-foreground"}

`}

>

Action Plan

</button>

<button

onClick={()=>setTab("guide")}

className={`flex-1 rounded-xl py-3 text-sm font-semibold transition

${tab==="guide"

?"bg-primary text-primary-foreground"

:"text-muted-foreground"}

`}

>

GuideMate AI

</button>

</div>

</section>


    {/* Today's Mission */}

  {tab==="plan" && ( <>  <section className="mt-5 px-6">

      <div className="glass-card bg-gradient-card p-5">

        <div className="flex items-center justify-between">

          <p className="text-xs uppercase tracking-widest text-primary">
            Today's Mission
          </p>

          <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] text-primary">

            Week {todayStep?.week} • Day {todayStep?.day}

          </span>

        </div>

        <h2 className="mt-3 text-xl font-semibold leading-snug">

          {todayStep?.title || "Generating today's lesson..."}

        </h2>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">

          {todayStep?.description}

        </p>

        <div className="mt-5 rounded-xl border border-border/60 bg-secondary/40 p-3">

          <p className="text-xs uppercase tracking-wide text-primary">

            Week

          </p>

          <p className="mt-1 text-sm font-medium">

            {todayStep?.week_title}

          </p>

          <p className="mt-2 text-xs text-muted-foreground">

            For this week's objective and expected outcome,
            visit your Roadmap.

          </p>

        </div>

        <div className="mt-5 flex items-center justify-between">

          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-xs">

            <Clock className="h-3.5 w-3.5" />

            {todayStep?.estimated_minutes || 100} min

          </span>

          <Button

            onClick={beginLesson}

            className="rounded-xl bg-gradient-primary text-primary-foreground"

          >

            Begin

            <ArrowRight className="ml-2 h-4 w-4" />

          </Button>

        </div>

      </div>

    </section>



    {/* Journey Progress */}

    <section className="mt-7 px-6">

      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">

        Journey Progress

      </h2>

      <div className="grid grid-cols-3 gap-3">

        <div className="glass-card p-4 text-center">

          <Clock className="mx-auto mb-2 h-5 w-5 text-primary" />

          <p className="text-xl font-bold">

            {todayMinutes}

          </p>

          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">

            Today

          </p>

        </div>

        <div className="glass-card p-4 text-center">

          <BookOpen className="mx-auto mb-2 h-5 w-5 text-primary" />

          <p className="text-xl font-bold">

            {completedLessons}

          </p>

          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">

            Lessons

          </p>

        </div>

        <div className="glass-card p-4 text-center">

          <TrendingUp className="mx-auto mb-2 h-5 w-5 text-primary" />

          <p className="text-xl font-bold">

            {Math.floor(totalMinutes / 60)}h

          </p>

          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">

            Total

          </p>

        </div>

      </div>

    </section>



    {/* Next Lesson */}

    <section className="mt-7 px-6">

      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">

        Next Lesson

      </h2>

      <div className="glass-card p-5">

        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">

          <Lock className="h-3.5 w-3.5" />

          Locked

        </div>

        <p className="mt-3 text-sm text-muted-foreground">

          Week {nextStep?.week} • Day {nextStep?.day}

        </p>

        <h3 className="mt-2 text-lg font-semibold">

          {nextStep?.title || "Next lesson"}

        </h3>

        <p className="mt-3 text-sm text-muted-foreground">

          Complete today's lesson only if you feel confident.

          Unlocking will move your journey forward.

        </p>

        <div className="mt-5 flex justify-end">

          <Button

            onClick={unlockNextLesson}

            variant="outline"

            className="rounded-xl"

          >

            Unlock

          </Button>

        </div>

      </div>

    </section>



    {/* Quick Actions */}

    <section className="mt-7 px-6 pb-8">

      <div className="grid grid-cols-2 gap-3">

        <Link
          to="/learning"
          className="glass-card flex items-center gap-3 p-4"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">

            <BookOpen className="h-5 w-5" />

          </div>

          <div>

            <p className="text-sm font-semibold">

              Learning

            </p>

            <p className="text-[11px] text-muted-foreground">

              Today's Lesson

            </p>

          </div>

        </Link>

        <Link
          to="/practice"
          className="glass-card flex items-center gap-3 p-4"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/20 text-accent">

            <Dumbbell className="h-5 w-5" />

          </div>

          <div>

            <p className="text-sm font-semibold">

              Practice

            </p>

            <p className="text-[11px] text-muted-foreground">

              Adaptive Quiz

            </p>

          </div>

        </Link>

      </div>

    </section> </>

)}

{tab==="guide" && (

<>

<section className="mt-5 px-6">

<div className="glass-card p-4">

<button
onClick={() => setShowGuideInfo(!showGuideInfo)}
className="flex w-full items-center justify-between"
>

<p className="font-semibold text-primary">
GuideMate Tips
</p>

<span className="text-xs text-muted-foreground">
{showGuideInfo ? "Show Less ▲" : "Show More ▼"}
</span>

</button>

{showGuideInfo && (

<p className="mt-4 text-sm leading-7 text-muted-foreground">

GuideMate helps you become closer to your future version.

Ask for learning help, coding, interview preparation,
career guidance, productivity or startup advice.

The more you chat, the better GuideMate understands you.

</p>

)}

</div>

</section>


<section className="mt-5 px-6">

<div className="glass-card p-4">

<div className="flex items-center gap-3">

<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15">

<MessageCircle className="h-5 w-5 text-primary"/>

</div>

<div>

<p className="font-semibold">

GuideMate AI

</p>

<p className="text-xs text-muted-foreground">

Hello {profile?.full_name || "there"} 👋

How can I help today?

</p>

</div>

</div>



<div className="mt-5 flex flex-wrap gap-2">

<button

onClick={() => sendPresetMessage("Plan my day")}

className="rounded-full border px-3 py-2 text-xs"

>

Plan my day

</button>

<button

onClick={() => sendPresetMessage("Explain today's lesson")}

className="rounded-full border px-3 py-2 text-xs"

>

Today's lesson

</button>

<button

onClick={() => sendPresetMessage("Create my timetable")}

className="rounded-full border px-3 py-2 text-xs"

>

Timetable

</button>

<button

onClick={() => sendPresetMessage("Help me become disciplined")}

className="rounded-full border px-3 py-2 text-xs"

>

Discipline

</button>

</div>

</div>

</section>



<section className="mt-5 px-6">

<div className="glass-card h-[470px] overflow-y-auto p-4 space-y-4">

{messages.map((m,index)=>(

<div
key={index}
className={`flex ${

m.role==="user"

?

"justify-end"

:

"justify-start"

}`}

>
<div

className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6

${

m.role==="user"

?

"bg-primary text-primary-foreground"

:

"bg-secondary"

}

`}

>

{m.text}

</div>

</div>

))}
{sending && (
  <div className="flex justify-start">
    <div className="max-w-[80%] rounded-2xl bg-secondary px-4 py-3 text-sm">
      GuideMate is thinking...
    </div>
  </div>
)}
<div ref={chatEndRef} />
</div>

</section>



<section className="mt-5 px-6 pb-8">

<div className="glass-card p-3">

<div className="flex items-center gap-2">

<Button

size="icon"

variant="outline"

className="rounded-xl"

>

<Plus className="h-4 w-4"/>

</Button>



<input
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }}
  placeholder="Ask GuideMate anything..."
  className="flex-1 bg-transparent px-2 py-2 outline-none"
/>



<Button
onClick={sendMessage}
size="icon"
disabled={sending}
className="rounded-xl"
>

<Send className="h-4 w-4"/>

</Button>

</div>

<p className="mt-2 text-[11px] text-muted-foreground">

GuideMate may occasionally make mistakes. Verify important information.

</p>

</div>

</section>

</>

)}
    

  </AppShell>
);}