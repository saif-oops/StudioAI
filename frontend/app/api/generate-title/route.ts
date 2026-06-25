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
            content: `Generate 5 highly clickable YouTube titles for this topic: "${topic}".

For each title, also give a CTR Score from 1-100 based on curiosity, emotion, specificity, and clickability.

Respond ONLY with valid JSON, no markdown, no extra text, in this exact format:
[
  {"title": "Title text here", "score": 92},
  {"title": "Title text here", "score": 87}
]`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API ERROR:", data);
      return Response.json({ success: false, error: "Failed to generate titles" });
    }

    let raw = data.choices[0].message.content.trim();

    // Strip markdown fences if the model adds them anyway
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

    const titles = JSON.parse(raw);

    return Response.json({ success: true, titles });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ success: false, error: "Failed to generate titles" });
  }
}