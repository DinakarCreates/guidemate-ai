import { model } from "../gemini";

export async function generateRoadmap(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("===== GEMINI RAW RESPONSE =====");
    console.log(text);
    console.log("===============================");
    const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
    const roadmap = JSON.parse(cleaned);
    return roadmap;
} catch (error) {
  console.error("Invalid JSON:", error);
  console.log("Gemini returned:");
  return null;
}
 
}