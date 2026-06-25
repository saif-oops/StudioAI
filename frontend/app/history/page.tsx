"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getHistory, deleteHistoryItem, clearHistory, HistoryItem } from "../lib/history";

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
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <Header />

        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">History 📜</h1>
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              className="rounded-xl border border-red-800 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
            >
              Clear All
            </button>
          )}
        </div>

        <p className="mt-2 text-gray-400">
          Your recently generated content
        </p>

        {history.length === 0 ? (
          <p className="mt-10 text-gray-500">No history yet. Go generate something!</p>
        ) : (
          <div className="mt-8 space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-800 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase">
                    {item.tool.replace("-", " ")}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-2 font-medium">Topic: {item.input}</p>

                {item.tool === "title-generator" && (
                  <ul className="mt-3 space-y-1 text-sm text-gray-400">
                    {item.output.map((t: { title: string; score: number }, i: number) => (
                      <li key={i}>
                        • {t.title} — <span className="text-green-400">{t.score}%</span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-3 text-xs text-gray-600">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
