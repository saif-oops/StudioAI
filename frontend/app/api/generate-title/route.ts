import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { topic, tone } = await req.json();

    const toneInstruction = tone && tone !== "Default"
      ? ` Write the titles in a ${tone.toLowerCase()} tone/style.`
      : "";

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

    const prompt = `Generate 5 highly clickable YouTube titles for this topic: "${topic}".${toneInstruction}

For each title, also give a CTR Score from 1-100 based on curiosity, emotion, specificity, and clickability.

Respond ONLY with valid JSON, no markdown, no extra text, in this exact format:
[
  {"title": "Title text here", "score": 92},
  {"title": "Title text here", "score": 87}
]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    if (!response.text) {
      throw new Error("No response from AI");
    }
    let raw = response.text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

    const titles = JSON.parse(raw);

    return Response.json({ success: true, titles });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate titles" });
  }
}
