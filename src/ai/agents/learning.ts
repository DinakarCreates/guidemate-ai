import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function generateLesson(
  topic: string,
  profile: any
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are GuideMate AI.

The student profile:

${JSON.stringify(profile, null, 2)}

Today's learning topic:

${topic}

Generate ONE personalized lesson.

Return ONLY valid JSON.

{
"title":"",
"minutes":8,
"summary":"",
"example":"",
"memoryHook":"",
"keyPoints":[
"",
"",
""
]
}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  const clean = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(clean);
}