export async function POST(req: Request) {
  try {
    const { photo, title, description, aspectRatio = "16:9" } = await req.json();

    // Extract base64 data (remove the "data:image/...;base64," prefix)
    const base64Data = photo.split(",")[1];
    const mimeType = photo.match(/data:(image\/\w+);base64/)?.[1] || "image/jpeg";

    const prompt = `Create a professional, high click-through-rate YouTube thumbnail using the person in the provided photo. 
CRITICAL SIZE & ASPECT RATIO REQUIREMENT: The generated image MUST be strictly in a ${aspectRatio} widescreen landscape aspect ratio (optimized for standard YouTube thumbnail resolution of 1280x720 pixels). Do NOT generate square or vertical images unless explicitly requested.
Title text to feature prominently: "${title}".
${description ? `Style/context: ${description}.` : ""}
Make it eye-catching with bold text, strong contrast, and an engaging composition typical of viral 1280x720 YouTube thumbnails.`;

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
