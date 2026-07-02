"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import SpotlightCard from "@/components/bits/SpotlightCard";
import { getHistory, deleteHistoryItem, clearHistory, HistoryItem } from "@/lib/history";
import { History as HistoryIcon, Trash2, Calendar, FileText } from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    if (confirm("Delete all history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />

      <section className="flex-1 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <HistoryIcon className="text-accent" size={32} />
            History
          </h1>
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 rounded-xl border border-red-800/40 bg-red-950/20 px-4 py-2 text-sm text-red-400 hover:bg-red-950/40 hover:border-red-700/50 transition-colors"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>

        <p className="mt-2 text-muted">
          Your recently generated content
        </p>

        {history.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <HistoryIcon size={40} className="text-muted/40" />
            <p className="mt-4 text-muted">No history yet. Go generate something!</p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {history.map((item) => (
              <SpotlightCard
                key={item.id}
                className="rounded-xl border border-border-color bg-surface p-5 hover:border-accent/30"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-accent font-semibold uppercase tracking-wider">
                    <FileText size={12} />
                    {item.tool.replace("-", " ")}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>

                <p className="mt-2 font-medium">Topic: {item.input}</p>

                {item.tool === "title-generator" && (
                  <ul className="mt-3 space-y-1 text-sm text-muted">
                    {item.output.map((t: { title: string; score: number }, i: number) => (
                      <li key={i}>
                        • {t.title} — <span className="text-green-400 font-semibold">{t.score}%</span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-3 text-xs text-muted flex items-center gap-1.5">
                  <Calendar size={12} />
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </SpotlightCard>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
