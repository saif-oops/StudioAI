const STYLE_PROMPTS: Record<string, string> = {
  bold_bright: "Bold and bright theme: high-contrast vivid colors (orange/yellow/blue pops), punchy saturated lighting, energetic feel.",
  dark_cinematic: "Dark cinematic theme: moody dramatic tones, deep shadows, cool blue/purple grading, high contrast rim lighting.",
  minimal_clean: "Minimal clean theme: simple elegant modern background, soft gradients, lots of negative space, understated and premium looking.",
  gaming: "Gaming theme: intense neon accents (red/purple/cyan), sharp glowing edges, high-energy action feel.",
  viral: "Viral/shock theme: bright saturated colors, bold graphic shapes, high curiosity visual energy.",
};

export async function POST(req: Request) {
  try {
    const { photo, title, description, style, aspectRatio = "16:9" } = await req.json();

    if (!photo || typeof photo !== "string" || !photo.includes(",")) {
      return Response.json({ success: false, error: "A valid photo is required." });
    }
    if (!title || typeof title !== "string" || !title.trim()) {
      return Response.json({ success: false, error: "A title is required." });
    }

    const themeInstruction = description?.trim()
      ? description
      : STYLE_PROMPTS[style] || STYLE_PROMPTS.dark_cinematic;

    const prompt = `Generate a hyper-realistic, professional YouTube thumbnail background plate.
CRITICAL RULES (READ CAREFULLY):
1. NO PEOPLE: DO NOT GENERATE ANY HUMANS, FACES, OR PEOPLE. The background must be completely empty of people. This is a background plate only — a real person will be composited on top separately afterward, so any person you generate here will conflict with that and ruin the image.
2. NO TEXT: DO NOT GENERATE ANY WORDS, LETTERS, OR TEXT. We will add the text later.
3. Aspect Ratio: STRICTLY ${aspectRatio} widescreen landscape (1280x720).
4. Composition: The left side should have negative space (darker/less busy) for text. The right side should have interesting visual elements (like a glowing arrow, a bright light source, or thematic graphics).
5. Theme: ${themeInstruction}
REMEMBER: ABSOLUTELY NO PEOPLE AND NO TEXT. Make it look like the blank background plate of a viral educational/tech YouTube thumbnail.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("API ERROR:", data);
      return Response.json({
        success: false,
        error: data.error?.message || "Failed to generate thumbnail",
      });
    }

    // Find the image part in the response
    interface GeminiPart {
      inlineData?: { data?: string; mimeType?: string };
      inline_data?: { data?: string; mime_type?: string };
    }
    const parts = (data.candidates?.[0]?.content?.parts || []) as GeminiPart[];
    const imagePart = parts.find((p) => p.inlineData || p.inline_data);

    if (!imagePart) {
      return Response.json({
        success: false,
        error: "No image returned by the model",
      });
    }

    const imageData = imagePart.inlineData?.data || imagePart.inline_data?.data;
    const imageMime = imagePart.inlineData?.mimeType || imagePart.inline_data?.mime_type || "image/png";

    const resultImage = `data:${imageMime};base64,${imageData}`;

    return Response.json({ success: true, image: resultImage });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate thumbnail" });
  }
}
