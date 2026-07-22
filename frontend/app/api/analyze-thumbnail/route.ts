import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const match = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!match) {
      return Response.json({ success: false, error: "Invalid image format" });
    }
    const mimeType = match[1];
    const base64Data = match[2];

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

    const prompt = `You are a YouTube thumbnail expert. Analyze this thumbnail for click-through-rate potential.

Respond ONLY with valid JSON, no markdown, no extra text, in this exact format:
{
  "score": 84,
  "strengths": ["point 1", "point 2", "point 3"],
  "improvements": ["point 1", "point 2", "point 3"]
}

Score should be 0-100. Give 3 strengths and 3 improvements based on contrast, text size/readability, face/subject visibility, color balance, and emotional appeal.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType
          }
        }
      ]
    });
    if (!response.text) {
      throw new Error("No response from AI");
    }
    let raw = response.text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

    const analysis = JSON.parse(raw);

    return Response.json({ success: true, analysis });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ success: false, error: "Failed to analyze thumbnail" });
  }
}
