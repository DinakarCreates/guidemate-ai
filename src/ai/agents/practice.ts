import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function generatePractice(
  topic: string,
  profile: any
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are GuideMate AI.

Student Profile:

${JSON.stringify(profile, null, 2)}

Today's learning topic:

${topic}

Create exactly 5 multiple-choice questions.

Rules:
- Beginner friendly
- Questions should test understanding, not memorization
- Return ONLY valid JSON

{
  "questions": [
    {
      "question": "",
      "options": [
        "",
        "",
        "",
        ""
      ],
      "answer": 0,
      "explanation": ""
    }
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