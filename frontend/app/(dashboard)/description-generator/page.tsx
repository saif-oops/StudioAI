"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import SpotlightCard from "@/components/bits/SpotlightCard";
import { addHistoryItem } from "@/lib/history";
import { FileText, Tag, Copy, Check, OctagonAlert, CircleCheckBig } from "lucide-react";
import { toast } from "sonner";

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
        toast.success("Generation Complete", {
          description: "Your SEO description and tags are ready.",
          icon: <CircleCheckBig className="text-emerald-400" size={18} />
        });

        addHistoryItem({
          tool: "description-generator" as any,
          input: topic,
          output: data.result,
        });
      } else {
        toast.error("Generation Failed", {
          description: "Failed to generate description. Please try again.",
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

  const copyText = (text: string, type: "description" | "tags") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success("Copied to Clipboard", {
      description: `The ${type} has been copied.`,
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
            <FileText className="text-accent" size={32} />
            Description Generator
          </h1>
          <p className="mt-2 text-muted">
            Generate SEO-friendly descriptions and tags for your video
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border-color bg-surface p-6">
          <input
            type="text"
            placeholder="Enter your video title or topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-xl bg-background border border-border-color p-4 text-foreground outline-none focus:border-accent/50 transition-colors"
          />

          <button
            onClick={generateContent}
            disabled={loading}
            className="mt-4 rounded-xl bg-accent px-6 py-3 font-display font-bold text-white hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Description & Tags"}
          </button>
        </div>

        {loading && (
          <div className="mt-8 space-y-4">
            <div className="h-32 rounded-xl border border-border-color bg-surface/50 animate-pulse" />
            <div className="h-16 rounded-xl border border-border-color bg-surface/50 animate-pulse" />
          </div>
        )}

        {!loading && description && (
          <div className="mt-8 space-y-6">
            <SpotlightCard className="rounded-xl border border-border-color bg-surface p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText size={16} className="text-accent" />
                  Description
                </h3>
                <button
                  onClick={() => copyText(description, "description")}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    copied === "description"
                      ? "bg-green-600 text-white"
                      : "bg-accent text-white hover:bg-accent-hover"
                  }`}
                >
                  {copied === "description" ? (
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
              <p className="text-muted whitespace-pre-line leading-relaxed">{description}</p>
            </SpotlightCard>

            <SpotlightCard className="rounded-xl border border-border-color bg-surface p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Tag size={16} className="text-accent" />
                  Tags
                </h3>
                <button
                  onClick={() => copyText(tags.join(", "), "tags")}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    copied === "tags"
                      ? "bg-green-600 text-white"
                      : "bg-accent text-white hover:bg-accent-hover"
                  }`}
                >
                  {copied === "tags" ? (
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
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-background border border-border-color px-3 py-1 text-sm text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>
        )}
      </section>
    </main>
  );
}