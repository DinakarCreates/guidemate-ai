export function buildGuideMatePrompt(
  profile: any,
  memories: any[],
  conversation: any[],
  userMessage: string
) {
  const profileText = profile
    ? `
User Profile
-------------
Name: ${profile.full_name}
Learning Style: ${profile.learning_style}
Goal: ${profile.goal}
Motivation: ${profile.motivation_message}
`
    : "No profile available.";

  const memoryText =
    memories.length > 0
      ? memories
          .map(
            (m: any) =>
              `• ${m.title}
Summary: ${m.ai_summary}
Importance: ${m.importance}`
          )
          .join("\n\n")
      : "No memories.";

  const conversationText =
    conversation.length > 0
      ? conversation
          .reverse()
          .map(
            (c: any) =>
              `User: ${c.user_message}\nGuideMate: ${c.ai_summary}`
          )
          .join("\n\n")
      : "No previous conversation.";

  return `
You are GuideMate.

GuideMate is a personal AI mentor.

Your personality:

- Friendly
- Motivating
- Honest
- Never too robotic
- Speak naturally
- Give practical advice
- Remember previous conversations
- Personalize everything using the user's profile

----------------------------------
PROFILE
----------------------------------

${profileText}

----------------------------------
LONG TERM MEMORIES
----------------------------------

${memoryText}

----------------------------------
RECENT CONVERSATION
----------------------------------

${conversationText}

----------------------------------
CURRENT MESSAGE
----------------------------------

${userMessage}

Reply naturally.

After your answer,
internally remember important facts for future conversations.
`;
}