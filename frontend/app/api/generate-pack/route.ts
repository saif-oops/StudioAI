import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { topic, tone = "Viral & Engaging", niche = "General" } = await req.json();

    if (!topic || !topic.trim()) {
      return Response.json({ success: false, error: "Topic is required" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

    const prompt = `Act as a world-class YouTube strategist and viral producer. A creator wants a complete, ready-to-produce 1-Click Video Pack for the following topic: "${topic}".
Target Niche: ${niche}
Tone / Style: ${tone}

You must generate an entire video production package in ONE response. 
Respond ONLY with valid JSON, no markdown formatting outside JSON, no extra introductory text, in this EXACT format:
{
  "titles": [
    { "title": "Viral Clickable Title #1", "score": 96, "reason": "Why this hook works so well" },
    { "title": "High Curiosity Title #2", "score": 91, "reason": "Curiosity gap explanation" },
    { "title": "SEO Optimized Title #3", "score": 88, "reason": "Search traffic focused" }
  ],
  "description": "A complete, highly engaging YouTube video description of 150-200 words. Must include a catchy intro paragraph, bullet points of key takeaways, realistic video TIMESTAMPS starting at 0:00, and 5 relevant #hashtags at the bottom.",
  "tags": [
    "tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10",
    "tag11", "tag12", "tag13", "tag14", "tag15", "tag16", "tag17", "tag18", "tag19", "tag20"
  ],
  "scriptOutline": {
    "hook": "An explosive 3-5 sentence opening hook designed to achieve 80%+ 30-second retention.",
    "intro": "The channel welcome and quick value proposition for why the viewer must watch until the end.",
    "mainPoints": [
      "Point 1: Detailed breakdown of the first core section with example.",
      "Point 2: The surprising pivot or secret strategy.",
      "Point 3: The step-by-step action plan or final climax."
    ],
    "cta": "A natural, high-converting Call to Action for subscribing, liking, and commenting."
  },
  "thumbnailConcept": {
    "visualDescription": "Vivid description of what should be shown in the 16:9 1280x720 thumbnail (e.g. split screen, facial expression, background objects).",
    "textOverlay": "2-4 WORDS MAX",
    "colorScheme": "High contrast colors (e.g., dark black background with vibrant red/yellow highlights)."
  }
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

    const pack = JSON.parse(raw);

    return Response.json({ success: true, pack });
  } catch (error) {
    console.error("GENERATE PACK ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate video pack. Please try again." }, { status: 500 });
  }
}
