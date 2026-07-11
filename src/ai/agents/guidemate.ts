import { generateText } from "@/ai/fireworks";
import { buildGuideMatePrompt } from "../promptBuilderGuideMate";
import {
  getGuideMateProfile,
  getGuideMateMemories,
  getConversationHistory,
  saveGuideMateMemory,
} from "../services/guideMateService";

export async function askGuideMate(
  userId: string,
  userMessage: string
) {
  try {
    // Load user profile
    const profile = await getGuideMateProfile(userId);

    // Load long-term memories
    const memories = await getGuideMateMemories(userId);

    // Load recent conversations
    const conversation = await getConversationHistory(userId);

    // Build GuideMate prompt
    const prompt = buildGuideMatePrompt(
      profile,
      memories,
      conversation,
      userMessage
    );

    // Generate AI response
    const response = await generateText(prompt);

    if (!response) {
      return {
        success: false,
        response: "Sorry, I couldn't generate a response.",
      };
    }

    // Generate a short memory summary
    const summaryPrompt = `
Create a memory for future conversations.

Return ONLY a concise summary (maximum 2 bullet points).

Focus on:
- User goals
- Problems
- Decisions
- Preferences
- Anything GuideMate should remember later

User:
${userMessage}

GuideMate:
${response}
`;

    const aiSummary =
      (await generateText(summaryPrompt)) ??
      "Conversation saved.";

    // Save conversation
    await saveGuideMateMemory({
      userId,
      title: userMessage.slice(0, 50),
      memoryType: "conversation",
      userMessage,
      aiSummary,
      content: response,
      importance:
  userMessage.length > 120
    ? "high"
    : "medium",
    });

    return {
      success: true,
      response,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      response: "Something went wrong.",
    };
  }
}