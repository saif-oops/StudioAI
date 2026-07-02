"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { addHistoryItem } from "@/lib/history";

export default function DescriptionGenerator() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<"description" | "tags" | null>(null);

  const generateContent = async () => {
    if (!topic) return;
    setLoading(true);
    setDescription("");
    setTags([]);

    try {
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (data.success) {
        setDescription(data.result.description);
        setTags(data.result.tags);

        addHistoryItem({
          tool: "description-generator" as any,
          input: topic,
          output: data.result,
        });
      } else {
        alert("Failed to generate content");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  const copyText = (text: string, type: "description" | "tags") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <Header />

        <h1 className="text-4xl font-bold">Description Generator 📝</h1>
        <p className="mt-2 text-gray-400">
          Generate SEO-friendly descriptions and tags for your video
        </p>

        <div className="mt-8 rounded-2xl border border-gray-800 p-6">
          <input
            type="text"
            placeholder="Enter your video title or topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-xl bg-gray-900 p-4 text-white outline-none"
          />

          <button
            onClick={generateContent}
            disabled={loading}
            className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Description & Tags"}
          </button>
        </div>

        {loading && (
          <div className="mt-8 space-y-4">
            <div className="h-32 rounded-xl border border-gray-800 bg-gray-900/50 animate-pulse" />
            <div className="h-16 rounded-xl border border-gray-800 bg-gray-900/50 animate-pulse" />
          </div>
        )}

        {!loading && description && (
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-gray-800 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-300">Description</h3>
                <button
                  onClick={() => copyText(description, "description")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    copied === "description"
                      ? "bg-green-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {copied === "description" ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-gray-300 whitespace-pre-line">{description}</p>
            </div>

            <div className="rounded-xl border border-gray-800 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-300">Tags</h3>
                <button
                  onClick={() => copyText(tags.join(", "), "tags")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    copied === "tags"
                      ? "bg-green-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {copied === "tags" ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gray-900 border border-gray-700 px-3 py-1 text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}