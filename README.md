# 🧭 GuideMate AI

# Your AI Mentor for Life

## 🐳 Docker Deployment

GuideMate can be containerized for hackathon submission and local production-style testing.

### Build the image

```bash
docker build \
  --build-arg VITE_SUPABASE_URL=your_supabase_url \
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key \
  --build-arg VITE_GEMINI_API_KEY=your_gemini_api_key \
  --build-arg VITE_FIREWORKS_API_KEY=your_fireworks_api_key \
  -t guidemate:latest .
```

### Run the container

```bash
docker run -p 8080:80 --name guidemate guidemate:latest
```

Then open http://localhost:8080 in your browser.

> The app uses the same Supabase-hosted backend and environment-variable-driven API configuration as the Vercel deployment. No authentication or environment logic was changed.

---

GuideMate AI is a personalized AI learning companion that acts as a long-term mentor instead of a traditional chatbot.

It creates personalized learning roadmaps, generates AI lessons and practice sessions, remembers previous conversations, and continuously adapts to every learner's journey.

---

# 🎯 Hackathon Vision

Learning today is fragmented.

Students watch videos, read blogs, ask AI questions, and take notes across multiple platforms. There is no single mentor that remembers who they are and guides them consistently.

GuideMate changes that.

Instead of giving one-time answers, GuideMate becomes a persistent AI mentor that understands the learner's goals, remembers their progress, and guides them every day.

---

# ✨ Features

## 🧭 Personalized AI Roadmaps

- AI-generated learning roadmap
- Daily learning steps
- Progress tracking
- Goal-based planning

---

## 🤖 GuideMate AI Mentor

- Long-term memory
- Personalized conversations
- Understands user goals
- Daily motivation
- Learning guidance
- Context-aware responses

---

## 📚 AI Lesson Generator

Each lesson includes:

- Personalized explanation
- Real-world example
- Memory hook
- Key takeaways

---

## 📝 AI Practice

- Practice questions generated from today's lesson
- Reinforces learning
- Personalized revision

---

## 📈 Progress Tracking

- Roadmap completion
- Journey progress
- Learning statistics
- Daily learning experience

---

# 🧠 AI Architecture

GuideMate uses multiple AI models for different tasks.

| Component | AI Model |
|-----------|----------|
| GuideMate Mentor | DeepSeek V4 Flash (Fireworks AI) |
| Roadmap Generation | Gemini 2.5 Flash |
| Lesson Generation | Gemini 2.5 Flash |
| Practice Generation | Gemini 2.5 Flash |

This hybrid architecture provides high-quality reasoning while keeping responses fast and cost-efficient.

---

# 🗄 Database

Supabase powers:

- Authentication
- User Profiles
- Personalized Roadmaps
- Roadmap Steps
- Lessons
- Practice
- GuideMate Memory System

---

# 🛠 Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Fireworks AI
- Google Gemini 2.5 Flash
- Lucide Icons

---

# 🚀 Future Vision

GuideMate is being designed as a lifelong AI mentor.

Future features include:

- 🎤 Voice conversations
- 🌍 Multi-language learning
- 📱 Mobile application
- 🎮 Gamification
- 👥 Community learning
- 💼 Career mentor
- 📊 Advanced analytics
- 🧠 Stronger long-term memory


# 🌟 Why GuideMate?

GuideMate isn't just another AI chatbot.

It remembers.

It guides.

It motivates.

It grows with the learner.

Our vision is to build an AI mentor that helps millions of learners become the best version of themselves.

---
# 🚀 Quick Start for Judges

Thank you for evaluating **GuideMate AI**!

To help you experience the application immediately, we've provided a demo account.

## Demo Credentials

**Email:** guideMatejudge@gmail.com

**Password:** 123456789

---

## Experience Flow

### 1. Login
Use the demo credentials above to log into GuideMate AI.

### 2. Complete AI Onboarding
Answer a few onboarding questions. GuideMate uses these responses to generate a personalized learning journey.

### 3. AI Roadmap Generation
Please wait **20–60 seconds** while GuideMate AI generates your personalized roadmap.

During this step, the AI creates:
- Personalized learning roadmap
- Weekly objectives
- Daily lessons
- Practice plans
- Learning progression

### 4. Explore the Roadmap
Navigate through the generated weekly roadmap and review the learning plan.

### 5. Start Learning
Click **Begin** on today's lesson to generate the day's AI-powered lesson and practice session.

### 6. Complete Practice
Attempt the generated practice questions to experience the adaptive learning workflow.

### 7. View Progress
Visit the **Profile** section to explore learner progress and profile information.

---

## Notes

- The first roadmap generation requires a short wait because the AI generates personalized content in real time.
- All generated content is tailored to the onboarding responses.
- If AI generation takes a little longer, please allow it to finish before refreshing the page.

Thank you for trying GuideMate AI!


# 👨‍💻 Built By

**Dinakar Tirumalasetty**

Solo Hackathon Project

GuideMate AI • 2026

---

## ⭐ Thank you for visiting GuideMate AI!

If you like this project, consider giving it a ⭐ on GitHub.


