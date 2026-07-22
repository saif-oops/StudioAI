import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

    const prompt = `You are a YouTube SEO expert. For this video topic: "${topic}", generate:

1. A compelling, SEO-friendly YouTube video description (3-4 sentences, include a call-to-action like subscribe/comment, mention the topic naturally for SEO).
2. A list of 10-15 relevant SEO tags/keywords for this video.

Respond ONLY with valid JSON, no markdown, no extra text, in this exact format:
{
  "description": "description text here",
  "tags": ["tag1", "tag2", "tag3"]
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
    return Response.json({ success: false, error: "Failed to generate content" });
  }
}
