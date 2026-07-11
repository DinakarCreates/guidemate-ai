const API_KEY = import.meta.env.VITE_FIREWORKS_API_KEY;

const CHAT_MODEL = "accounts/fireworks/models/deepseek-v4-flash";

export async function generateText(prompt: string) {
  try {
    const response = await fetch(
      "https://api.fireworks.ai/inference/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          model: CHAT_MODEL,

          messages: [
            {
              role: "system",
              content:
                "You are GuideMate, a world-class AI mentor, teacher, startup advisor, coding assistant and learning coach.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.7,

          max_tokens: 4096,

          top_p: 0.9,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Fireworks Error:", error);

    return null;
  }
}