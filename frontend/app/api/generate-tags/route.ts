import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return Response.json({ success: false, error: "Video topic is required" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

    const prompt = `You are an expert YouTube SEO specialist. Generate optimal YouTube tags for a video about: "${topic}".

Provide a list of 15 to 25 highly relevant, high-search-volume, and low-competition tags.
Include a mix of short-tail (broad) and long-tail (specific) keywords.

Respond ONLY with a valid JSON array of strings, no markdown, no extra text, in this exact format:
["tag1", "tag2", "long tail tag 3"]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    
    if (!response.text) {
      throw new Error("No response from AI");
    }
    
    let raw = response.text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

    const tags = JSON.parse(raw);

    return Response.json({ success: true, tags });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate tags" });
  }
}
