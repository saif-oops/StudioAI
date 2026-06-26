export async function GET() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: "Generate a simple image of a red apple on a white background" }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return Response.json({ status: response.status, data });
  } catch (error) {
    return Response.json({ error: String(error) });
  }
}