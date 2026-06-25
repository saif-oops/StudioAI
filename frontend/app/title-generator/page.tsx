"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { addHistoryItem } from "../lib/history";

type TitleItem = {
  title: string;
  score: number;
};

export default function TitleGenerator() {
  const [topic, setTopic] = useState("");
  const [titles, setTitles] = useState<TitleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fetchTitles = async () => {
    const response = await fetch("/api/generate-title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    return response.json();
  };

  const generateTitles = async () => {
    if (!topic) return;
    setLoading(true);

    try {
      const data = await fetchTitles();
      if (data.success) {
        setTitles(data.titles);

        addHistoryItem({
          tool: "title-generator",
          input: topic,
          output: data.titles,
        });
      } else {
        alert("Failed to generate titles");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  const regenerateAll = () => generateTitles();

  const regenerateOne = async (index: number) => {
    setRegeneratingIndex(index);

    try {
      const data = await fetchTitles();
      if (data.success && data.titles.length > 0) {
        const replacement = data.titles[Math.floor(Math.random() * data.titles.length)];
        setTitles((prev) => {
          const updated = [...prev];
          updated[index] = replacement;
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
    }

    setRegeneratingIndex(null);
  };

  const copyTitle = (title: string, index: number) => {
    navigator.clipboard.writeText(title);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const scoreColor = (score: number) => {
    if (score >= 85) return "text-green-400 border-green-400/30 bg-green-400/10";
    if (score >= 70) return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
    return "text-red-400 border-red-400/30 bg-red-400/10";
  };

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <Header />

        <h1 className="text-4xl font-bold">Title Generator ✨</h1>
        <p className="mt-2 text-gray-400">
          Generate high CTR YouTube titles using AI
        </p>

        <div className="mt-8 rounded-2xl border border-gray-800 p-6">
          <input
            type="text"
            placeholder="Enter video topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-xl bg-gray-900 p-4 text-white outline-none"
          />

          <div className="mt-4 flex gap-3">
            <button
              onClick={generateTitles}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Titles"}
            </button>

            {titles.length > 0 && (
              <button
                onClick={regenerateAll}
                disabled={loading}
                className="rounded-xl border border-gray-700 px-6 py-3 font-semibold hover:bg-gray-900 disabled:opacity-50"
              >
                🔄 Regenerate All
              </button>
            )}
          </div>
        </div>

        {loading && (
          <div className="mt-8 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl border border-gray-800 bg-gray-900/50 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && titles.length > 0 && (
          <div className="mt-8 space-y-4">
            {titles.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-gray-800 p-5"
              >
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">
                    🔥 Title #{index + 1}
                  </p>

                  {regeneratingIndex === index ? (
                    <div className="h-5 w-2/3 rounded bg-gray-800 animate-pulse" />
                  ) : (
                    <p className="font-medium">{item.title}</p>
                  )}

                  <span
                    className={`mt-2 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${scoreColor(
                      item.score
                    )}`}
                  >
                    CTR Score: {item.score}%
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => regenerateOne(index)}
                    disabled={regeneratingIndex === index}
                    title="Regenerate this title"
                    className="rounded-lg border border-gray-700 px-3 py-2 text-sm hover:bg-gray-900 disabled:opacity-50"
                  >
                    🔄
                  </button>

                  <button
                    onClick={() => copyTitle(item.title, index)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      copiedIndex === index
                        ? "bg-green-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {copiedIndex === index ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}