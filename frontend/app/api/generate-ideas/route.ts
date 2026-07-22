import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { niche, audience } = await req.json();

    if (!niche) {
      return Response.json({ success: false, error: "Niche is required" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

    const prompt = `You are an expert YouTube strategist. Generate 5 highly viral and engaging video ideas for a channel in the following niche: "${niche}".
Target Audience: ${audience || "General"}

For each idea, provide:
1. title: A catchy, high-CTR video title.
2. description: A brief 1-2 sentence description of what the video is about.
3. viralityScore: A predicted score out of 100 based on current YouTube trends.

Respond ONLY with valid JSON, no markdown, no extra text, in this exact format:
[
  {
    "title": "Title here",
    "description": "Description here",
    "viralityScore": 95
  }
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

    const ideas = JSON.parse(raw);

    return Response.json({ success: true, ideas });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate video ideas" });
  }
}
