"use server";

import { GoogleGenAI } from "@google/genai";

// Initialize the SDK. We use the GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateScript(topic: string, style: string, lengthStr: string) {
  try {
    const prompt = `You are an expert YouTube scriptwriter. Write a highly engaging, retention-optimized YouTube script about "${topic}".
The tone/style of the video should be: ${style}.
The length of the script should be roughly: ${lengthStr}.

Return the response as a valid JSON object with the following structure:
- "hook": A strong 3-5 second hook at the very beginning to grab attention (string).
- "outline": An array of strings, where each string is a clear, logical section of the main body content, including the intro and a call to action (CTA) at the end.

Only return the JSON object, no markdown formatting (like \`\`\`json).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let rawText = response.text || "{}";
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return { success: true, result: JSON.parse(rawText) };
  } catch (error: unknown) {
    console.error("Error generating script:", error);
    const errorMsg = error instanceof Error ? error.message : "Error generating script";
    return { success: false, error: errorMsg };
  }
}

export async function generateTitles(topic: string, tone: string) {
  try {
    const prompt = `You are an expert YouTube strategist and copywriter. Generate 5 highly clickable, viral-style YouTube video titles for a video about "${topic}".
The tone of the titles should be: ${tone}.

Return the response as a valid JSON array of objects. Each object must have:
- "title": The actual video title (string).
- "score": A CTR prediction score out of 100 based on how clickable it is (number).

Example format:
[
  { "title": "I Tried the Hardest Chess Strategy (And Won)", "score": 92 },
  { "title": "The Only Chess Opening You'll Ever Need", "score": 88 }
]

Only return the JSON array, no markdown formatting (like \`\`\`json).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let rawText = response.text || "[]";
    // Clean up potential markdown formatting if the model accidentally included it
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return { success: true, titles: JSON.parse(rawText) };
  } catch (error: unknown) {
    console.error("Error generating titles:", error);
    const errorMsg = error instanceof Error ? error.message : "Error generating titles";
    return { success: false, error: errorMsg };
  }
}
