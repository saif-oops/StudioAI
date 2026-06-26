export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `You are a YouTube SEO expert. For this video topic: "${topic}", generate:

1. A compelling, SEO-friendly YouTube video description (3-4 sentences, include a call-to-action like subscribe/comment, mention the topic naturally for SEO).
2. A list of 10-15 relevant SEO tags/keywords for this video.

Respond ONLY with valid JSON, no markdown, no extra text, in this exact format:
{
  "description": "description text here",
  "tags": ["tag1", "tag2", "tag3"]
}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API ERROR:", data);
      return Response.json({ success: false, error: "Failed to generate content" });
    }

    let raw = data.choices[0].message.content.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

    const result = JSON.parse(raw);

    return Response.json({ success: true, result });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate content" });
  }
}