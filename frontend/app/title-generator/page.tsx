"use client";

import { useState } from "react";
import { RefreshCw, Flame, Check, Star, Sparkles } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { addHistoryItem } from "../lib/history";

type TitleItem = {
  title: string;
  score: number;
};

export default function TitleGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Default");
  const [titles, setTitles] = useState<TitleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const tones = ["Default", "Funny", "Serious", "Clickbait", "Professional"];
  const suggestions = ["Tech Review", "Daily Vlog", "Tutorial", "Gaming", "Cooking Recipe"];

  const fetchTitles = async () => {
    const response = await fetch("/api/generate-title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, tone }),
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
        addHistoryItem({ tool: "title-generator", input: topic, output: data.titles });
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
    if (score >= 70) return "text-[var(--highlight)] border-[var(--highlight)]/30 bg-[var(--highlight)]/10";
    return "text-red-400 border-red-400/30 bg-red-400/10";
  };

  const bestScore = titles.length > 0 ? Math.max(...titles.map((t) => t.score)) : 0;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <Header />

        <div className="relative">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
            Title Generator
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold">
            Titles That <span className="text-[var(--accent)]">Get Clicked</span>
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Generate high CTR YouTube titles using AI
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
          <input
            type="text"
            placeholder="Enter video topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-xl bg-[var(--background)] border border-[var(--border-color)] p-4 text-[var(--foreground)] outline-none focus:border-[var(--accent)]/50 transition-colors"
          />

          {!topic && (
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setTopic(s)}
                  className="rounded-full border border-[var(--border-color)] px-3 py-1.5 text-xs text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--foreground)] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="mt-4">
            <p className="mb-2 text-xs text-[var(--muted)]">Tone</p>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    tone === t
                      ? "bg-[var(--accent)] text-white"
                      : "border border-[var(--border-color)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={generateTitles}
              disabled={loading}
              className="rounded-xl bg-[var(--accent)] px-6 py-3 font-display font-bold text-white hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Titles"}
            </button>

            {titles.length > 0 && (
              <button
                onClick={regenerateAll}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] px-6 py-3 font-semibold hover:bg-[var(--background)] transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} />
                Regenerate All
              </button>
            )}
          </div>
        </div>

        {loading && (
          <div className="mt-8 space-y-4">
            <p className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <Sparkles size={14} className="text-[var(--accent)] animate-pulse" />
              AI is crafting your titles...
            </p>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] animate-pulse" />
            ))}
          </div>
        )}

        {!loading && titles.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-color)] py-16 text-center">
            <Sparkles size={28} className="text-[var(--muted)]" />
            <p className="mt-3 text-[var(--muted)]">
              Enter a topic above to generate your first batch of titles
            </p>
          </div>
        )}

        {!loading && titles.length > 0 && (
          <div className="mt-8 space-y-4">
            {titles.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-xl border p-5 transition-colors ${
                  item.score === bestScore
                    ? "border-[var(--accent)]/50 bg-[var(--accent-soft)]"
                    : "border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)]/30"
                }`}
              >
                <div className="flex-1">
                  <p className="flex items-center gap-1 text-xs text-[var(--muted)] mb-1">
                    <Flame size={12} className="text-[var(--accent)]" />
                    Title #{index + 1}
                    {item.score === bestScore && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-bold text-white">
                        <Star size={10} fill="currentColor" /> Best Pick
                      </span>
                    )}
                  </p>

                  {regeneratingIndex === index ? (
                    <div className="h-5 w-2/3 rounded bg-[var(--border-color)] animate-pulse" />
                  ) : (
                    <p className="font-medium">{item.title}</p>
                  )}

                  <span className={`mt-2 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${scoreColor(item.score)}`}>
                    CTR Score: {item.score}%
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => regenerateOne(index)}
                    disabled={regeneratingIndex === index}
                    title="Regenerate this title"
                    className="rounded-lg border border-[var(--border-color)] p-2.5 hover:bg-[var(--background)] transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={14} className={regeneratingIndex === index ? "animate-spin" : ""} />
                  </button>

                  <button
                    onClick={() => copyTitle(item.title, index)}
                    className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      copiedIndex === index ? "bg-green-600 text-white" : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                    }`}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check size={14} /> Copied!
                      </>
                    ) : (
                      "Copy"
                    )}
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