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
            content: `You are a YouTube scriptwriting expert. For this video topic: "${topic}", generate:

1. A powerful "hook" - the first 5-10 seconds of the video that grabs attention immediately (1-2 sentences).
2. A script outline as a list of 5-7 steps/sections the video should cover, from intro to outro.

Respond ONLY with valid JSON, no markdown, no extra text, in this exact format:
{
  "hook": "hook text here",
  "outline": ["step 1", "step 2", "step 3"]
}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API ERROR:", data);
      return Response.json({ success: false, error: "Failed to generate script" });
    }

    let raw = data.choices[0].message.content.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

    const result = JSON.parse(raw);

    return Response.json({ success: true, result });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate script" });
  }
}