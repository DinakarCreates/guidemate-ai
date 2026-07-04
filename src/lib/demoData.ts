export const demoUser = {
  name: "Alex",
  currentYou: "A curious learner working in marketing who feels stuck and wants more meaning from work.",
  futureYou: "A confident product designer building thoughtful digital experiences for a living.",
  primaryBarrier: "Inconsistent daily practice and self-doubt when starting new projects.",
  summary:
    "You have creativity and taste but need a clear system that turns curiosity into daily craft. GuideMate will build that rhythm with you.",
  strengths: ["Curiosity", "Visual taste", "Empathy for users", "Consistent when supported"],
  barriers: ["Perfectionism", "Weekend inconsistency", "Overwhelm with tools"],
  learningStyle: "Visual, example-driven, short lessons under 10 minutes",
  streak: 12,
  minutesToday: 24,
  totalHours: 46,
  lessonsCompleted: 28,
};

export const roadmap = {
  longTermGoal: "Become a hireable product designer in 6 months",
  milestones: [
    { title: "Design foundations", weeks: "Weeks 1–3", progress: 100, status: "done" as const },
    { title: "UI patterns & systems", weeks: "Weeks 4–7", progress: 62, status: "current" as const },
    { title: "First real case study", weeks: "Weeks 8–12", progress: 0, status: "upcoming" as const },
    { title: "Portfolio & outreach", weeks: "Weeks 13–20", progress: 0, status: "upcoming" as const },
    { title: "Interviews & offer", weeks: "Weeks 21–24", progress: 0, status: "upcoming" as const },
  ],
  todayStep: {
    title: "Redesign a familiar app's onboarding",
    minutes: 25,
    why: "Applies today's lesson on progressive disclosure to a real product.",
  },
};

export const conversation = [
  { role: "guide" as const, text: "Good morning, Alex. Ready for a small step toward your future self?" },
  { role: "user" as const, text: "Yes — I have about 30 minutes." },
  { role: "guide" as const, text: "Perfect. Let's finish today's onboarding redesign. I'll walk with you." },
];

export const lesson = {
  title: "Progressive disclosure",
  minutes: 8,
  summary: "Show only what users need, when they need it. Reveal depth over time.",
  example:
    "Notion hides advanced formatting behind a `/` menu instead of a cluttered toolbar. New users see a blank page; power users summon everything.",
  memoryHook: "Think of a magician: the trick works because you don't see everything at once.",
  keyPoints: [
    "Reduce cognitive load on first use",
    "Reveal complexity through interaction, not layout",
    "Every hidden thing must be discoverable",
  ],
};

export const quiz = [
  {
    q: "A user opens your app for the first time. What should they see?",
    options: [
      "Every feature so they know what's possible",
      "One clear next action",
      "A tour of all screens",
      "A settings page",
    ],
    correct: 1,
  },
  {
    q: "Progressive disclosure works because it…",
    options: ["Hides bugs", "Matches user readiness with complexity", "Saves screen space", "Is easier to build"],
    correct: 1,
  },
  {
    q: "Which pattern is a good example?",
    options: ["A 40-item toolbar", "A `/` command menu", "A settings mega-menu", "All at once"],
    correct: 1,
  },
];
