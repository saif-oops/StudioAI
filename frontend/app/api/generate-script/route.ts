import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

    const prompt = `You are a YouTube scriptwriting expert. For this video topic: "${topic}", generate:

1. A powerful "hook" - the first 5-10 seconds of the video that grabs attention immediately (1-2 sentences).
2. A script outline as a list of 5-7 steps/sections the video should cover, from intro to outro.

Respond ONLY with valid JSON, no markdown, no extra text, in this exact format:
{
  "hook": "hook text here",
  "outline": ["step 1", "step 2", "step 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    if (!response.text) {
      throw new Error("No response from AI");
    }
    let raw = response.text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

    const result = JSON.parse(raw);

    return Response.json({ success: true, result });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate script" });
  }
}
