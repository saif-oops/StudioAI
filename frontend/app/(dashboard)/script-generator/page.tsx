"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import SpotlightCard from "@/components/bits/SpotlightCard";
import { addHistoryItem } from "@/lib/history";
import { Clapperboard, Flame, ClipboardList, Copy, Check, OctagonAlert, CircleCheckBig } from "lucide-react";
import { toast } from "sonner";

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
        toast.success("Generation Complete", {
          description: "Your script outline and hook are ready.",
          icon: <CircleCheckBig className="text-emerald-400" size={18} />
        });

        addHistoryItem({
          tool: "script-generator" as any,
          input: topic,
          output: data.result,
        });
      } else {
        toast.error("Generation Failed", {
          description: "Failed to generate script. Please try again.",
          icon: <OctagonAlert className="text-red-400" size={18} />
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        description: "An unexpected error occurred.",
        icon: <OctagonAlert className="text-red-400" size={18} />
      });
    }

    setLoading(false);
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    toast.success("Copied to Clipboard", {
      description: `The script ${key} has been copied.`,
      icon: <CircleCheckBig className="text-emerald-400" size={18} />
    });
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />

      <section className="flex-1 p-4 md:p-8">
        <div className="relative">
          <h1 className="mt-2 font-display text-4xl font-bold flex items-center gap-3">
            <Clapperboard className="text-accent" size={32} />
            Script Generator
          </h1>
          <p className="mt-2 text-muted">
            Generate a hook and script outline for your video
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border-color bg-surface p-6">
          <input
            type="text"
            placeholder="Enter your video topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-xl bg-background border border-border-color p-4 text-foreground outline-none focus:border-accent/50 transition-colors"
          />

          <button
            onClick={generateScript}
            disabled={loading}
            className="mt-4 rounded-xl bg-accent px-6 py-3 font-display font-bold text-white hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Script"}
          </button>
        </div>

        {loading && (
          <div className="mt-8 space-y-4">
            <div className="h-20 rounded-xl border border-border-color bg-surface/50 animate-pulse" />
            <div className="h-48 rounded-xl border border-border-color bg-surface/50 animate-pulse" />
          </div>
        )}

        {!loading && hook && (
          <div className="mt-8 space-y-6">
            <SpotlightCard className="rounded-xl border border-border-color bg-surface p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Flame size={16} className="text-accent" />
                  Hook (First 5-10 seconds)
                </h3>
                <button
                  onClick={() => copyText(hook, "hook")}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    copied === "hook" ? "bg-green-600 text-white" : "bg-accent text-white hover:bg-accent-hover"
                  }`}
                >
                  {copied === "hook" ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-muted leading-relaxed">{hook}</p>
            </SpotlightCard>

            <SpotlightCard className="rounded-xl border border-border-color bg-surface p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <ClipboardList size={16} className="text-accent" />
                  Script Outline
                </h3>
                <button
                  onClick={() => copyText(outline.join("\n"), "outline")}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    copied === "outline" ? "bg-green-600 text-white" : "bg-accent text-white hover:bg-accent-hover"
                  }`}
                >
                  {copied === "outline" ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy
                    </>
                  )}
                </button>
              </div>
              <ol className="space-y-2 list-decimal list-inside text-muted">
                {outline.map((point, i) => (
                  <li key={i} className="text-muted leading-relaxed">
                    {point}
                  </li>
                ))}
              </ol>
            </SpotlightCard>
          </div>
        )}
      </section>
    </main>
  );
}