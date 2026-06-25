export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are a YouTube thumbnail expert. Analyze this thumbnail for click-through-rate potential.

Respond ONLY with valid JSON, no markdown, no extra text, in this exact format:
{
  "score": 84,
  "strengths": ["point 1", "point 2", "point 3"],
  "improvements": ["point 1", "point 2", "point 3"]
}

Score should be 0-100. Give 3 strengths and 3 improvements based on contrast, text size/readability, face/subject visibility, color balance, and emotional appeal.`,
              },
              {
                type: "image_url",
                image_url: { url: image },
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API ERROR:", data);
      return Response.json({ success: false, error: "Failed to analyze thumbnail" });
    }

    let raw = data.choices[0].message.content.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

    const analysis = JSON.parse(raw);

    return Response.json({ success: true, analysis });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ success: false, error: "Failed to analyze thumbnail" });
  }
}