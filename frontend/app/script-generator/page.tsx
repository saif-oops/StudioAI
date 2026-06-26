"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { addHistoryItem } from "../lib/history";

export default function ScriptGenerator() {
  const [topic, setTopic] = useState("");
  const [hook, setHook] = useState("");
  const [outline, setOutline] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const generateScript = async () => {
    if (!topic) return;
    setLoading(true);
    setHook("");
    setOutline([]);

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (data.success) {
        setHook(data.result.hook);
        setOutline(data.result.outline);

        addHistoryItem({
          tool: "script-generator" as any,
          input: topic,
          output: data.result,
        });
      } else {
        alert("Failed to generate script");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <Header />

        <h1 className="text-4xl font-bold">Script Generator 🎬</h1>
        <p className="mt-2 text-gray-400">
          Generate a hook and script outline for your video
        </p>

        <div className="mt-8 rounded-2xl border border-gray-800 p-6">
          <input
            type="text"
            placeholder="Enter your video topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-xl bg-gray-900 p-4 text-white outline-none"
          />

          <button
            onClick={generateScript}
            disabled={loading}
            className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Script"}
          </button>
        </div>

        {loading && (
          <div className="mt-8 space-y-4">
            <div className="h-20 rounded-xl border border-gray-800 bg-gray-900/50 animate-pulse" />
            <div className="h-48 rounded-xl border border-gray-800 bg-gray-900/50 animate-pulse" />
          </div>
        )}

        {!loading && hook && (
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-gray-800 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-300">🔥 Hook (First 5-10 seconds)</h3>
                <button
                  onClick={() => copyText(hook, "hook")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    copied === "hook" ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {copied === "hook" ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-gray-300">{hook}</p>
            </div>

            <div className="rounded-xl border border-gray-800 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-300">📋 Script Outline</h3>
                <button
                  onClick={() => copyText(outline.join("\n"), "outline")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    copied === "outline" ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {copied === "outline" ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <ol className="space-y-2 list-decimal list-inside">
                {outline.map((point, i) => (
                  <li key={i} className="text-gray-300">
                    {point}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}