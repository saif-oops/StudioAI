export async function POST(req: Request) {
  try {
    const { photo, title, description, aspectRatio = "16:9" } = await req.json();

    // Extract base64 data (remove the "data:image/...;base64," prefix)
    const base64Data = photo.split(",")[1];
    const mimeType = photo.match(/data:(image\/\w+);base64/)?.[1] || "image/jpeg";

    const prompt = `Generate a hyper-realistic, professional YouTube thumbnail background plate.
CRITICAL RULES (READ CAREFULLY):
1. NO PEOPLE: DO NOT GENERATE ANY HUMANS, FACES, OR PEOPLE. The background must be completely empty of people.
2. NO TEXT: DO NOT GENERATE ANY WORDS, LETTERS, OR TEXT. We will add the text later.
3. Aspect Ratio: STRICTLY ${aspectRatio} widescreen landscape (1280x720).
4. Composition: The left side should have negative space (darker/less busy) for text. The right side should have interesting visual elements (like a glowing arrow, a bright light source, or thematic graphics).
5. Theme: ${description || "Dark cinematic neon theme with high contrast."}
REMEMBER: ABSOLUTELY NO PEOPLE AND NO TEXT. Make it look like the blank background plate of a viral educational/tech YouTube thumbnail.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data,
                  },
                },
              ],
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
    const parts = data.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p: any) => p.inlineData || p.inline_data);

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
