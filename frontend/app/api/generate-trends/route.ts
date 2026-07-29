import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { niche, timeframe = "This Month" } = await req.json();

    if (!niche || !niche.trim()) {
      return Response.json({ success: false, error: "Niche is required" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

    const prompt = `You are an elite YouTube Strategist and Trend Analyst.
Identify the top 4 emerging, high-potential micro-trends for the following YouTube niche:
Niche: "${niche}"
Timeframe: "${timeframe}"

Focus on trends that are currently breaking out, NOT saturated mega-trends.
Return a valid JSON object in this exact schema without any markdown formatting, backticks, or extra commentary:
{
  "trends": [
    {
      "title": "Name of the micro-trend",
      "growthPhase": "Emerging / Exploding / Peaking",
      "competitionLevel": "Low / Medium / High",
      "whyItsWorking": "1 sentence explaining the psychological or market reason this is trending right now.",
      "angleToTake": "1 sentence on the unique angle the creator should take to stand out.",
      "videoIdeas": [
        "Highly clickable video idea 1",
        "Highly clickable video idea 2"
      ]
    }
  ]
}
Return exactly 4 trends in the array.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    let raw = response.text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

    const trendData = JSON.parse(raw);

    return Response.json({ success: true, trendData });
  } catch (error) {
    console.error("GENERATE TRENDS ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate trends. Please try again." }, { status: 500 });
  }
}
