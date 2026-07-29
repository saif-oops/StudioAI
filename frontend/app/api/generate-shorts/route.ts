import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { topic, niche = "General", duration = "30 seconds", style = "Curiosity Gap" } = await req.json();

    if (!topic || !topic.trim()) {
      return Response.json({ success: false, error: "Topic is required" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

    const prompt = `You are an elite YouTube Shorts and TikTok viral scriptwriter who specializes in 80%+ retention and infinite loops.
Create a complete Shorts production plan for the following topic:
Topic: "${topic}"
Niche: "${niche}"
Target Duration: "${duration}"
Primary Hook Style: "${style}"

You must return a valid JSON object in this exact schema without any markdown formatting, backticks, or extra commentary:
{
  "hooks": [
    {
      "type": "Controversial / Shock",
      "text": "Exact hook script (1-2 sentences)",
      "retentionScore": 95,
      "reason": "Why this psychological trigger keeps viewers from scrolling"
    },
    {
      "type": "Curiosity Gap",
      "text": "Exact hook script (1-2 sentences)",
      "retentionScore": 91,
      "reason": "Why this creates an irresistible question in the brain"
    },
    {
      "type": "Direct Action / Secret",
      "text": "Exact hook script (1-2 sentences)",
      "retentionScore": 88,
      "reason": "Why promising immediate reward drives watch time"
    }
  ],
  "scriptBeats": [
    {
      "timestamp": "0:00 - 0:03",
      "section": "THE HOOK (PATTERN INTERRUPT)",
      "script": "What to say out loud during this beat.",
      "visualCue": "Exact visual action, text overlay style, or sound effect to use on screen."
    },
    {
      "timestamp": "0:03 - 0:15",
      "section": "THE BUILD UP / CONFLICT",
      "script": "What to say out loud during this beat.",
      "visualCue": "Exact visual action, text overlay style, or sound effect to use on screen."
    },
    {
      "timestamp": "0:15 - 0:25",
      "section": "THE PAYOFF / SECRET REVEAL",
      "script": "What to say out loud during this beat.",
      "visualCue": "Exact visual action, text overlay style, or sound effect to use on screen."
    },
    {
      "timestamp": "0:25 - 0:30",
      "section": "THE INFINITE LOOP ENDING",
      "script": "Final sentence that loops naturally back into the first sentence of the hook.",
      "visualCue": "Exact visual action, text overlay style, or sound effect to use on screen."
    }
  ],
  "loopExplanation": "Explain in 1 sentence how the final sentence connects back to the beginning so viewers watch it twice.",
  "caption": "A punchy 1-sentence caption with 4 high-ranking hashtags including #Shorts"
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

    const shortsData = JSON.parse(raw);

    return Response.json({ success: true, shortsData });
  } catch (error) {
    console.error("GENERATE SHORTS ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate Shorts script. Please try again." }, { status: 500 });
  }
}
