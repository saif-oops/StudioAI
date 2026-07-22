"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Tag, Copy, Check, OctagonAlert, CircleCheckBig, Hash, TrendingUp,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { addHistoryItem } from "@/lib/history";
import { toast } from "sonner";

const audiences = ["General", "Gamers", "Tech", "Fitness", "Business", "Kids", "Food"];
const lengths = [
  { label: "Short", desc: "~150 words", value: "short" },
  { label: "Medium", desc: "~300 words", value: "medium" },
  { label: "Long", desc: "~500 words", value: "long" },
];

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function seoScore(desc: string, tags: string[]): { label: string; color: string } {
  const words = wordCount(desc);
  const score = (words > 200 ? 2 : words > 100 ? 1 : 0) + (tags.length > 8 ? 2 : tags.length > 4 ? 1 : 0);
  if (score >= 4) return { label: "High SEO", color: "text-green-400" };
  if (score >= 2) return { label: "Medium SEO", color: "text-yellow-400" };
  return { label: "Low SEO", color: "text-red-400" };
}

export default function DescriptionGenerator() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("General");
  const [length, setLength] = useState("medium");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<"description" | "tags" | null>(null);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const generateContent = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setDescription("");
    setTags([]);
    try {
      const res = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, audience, length }),
      });
      const data = await res.json();
      if (data.success) {
        setDescription(data.result.description);
        setTags(data.result.tags);
        toast.success("Ready!", { description: "Your SEO description and tags are ready.", icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
        addHistoryItem({ tool: "description-generator" as any, input: topic, output: data.result });
      } else {
        toast.error("Failed", { description: "Could not generate. Try again.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const copyText = (text: string, type: "description" | "tags") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success("Copied!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
    setTimeout(() => setCopied(null), 1500);
  };

  const copyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1200);
  };

  const hashtags = tags.map((t) => `#${t.replace(/\s+/g, "")}`);
  const seo = description ? seoScore(description, tags) : null;

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-4xl">
        <PageHeader
          icon={FileText}
          iconColor="text-orange-400"
          iconBg="bg-orange-400/10"
          title="Description"
          titleHighlight="Generator"
          subtitle="Create SEO-optimized YouTube descriptions with tags and hashtags — tuned to your audience."
        />

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          className="glass-card-surface rounded-2xl p-5 space-y-4"
        >
          <div>
            <label className="text-xs text-muted font-medium block mb-1.5">Video Title or Topic</label>
            <input
              type="text"
              placeholder="e.g. 10 AI Tools That Changed My Life..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateContent()}
              className="input-base"
            />
          </div>

          {/* Audience */}
          <div>
            <p className="text-xs text-muted font-medium mb-2">Target Audience</p>
            <div className="flex flex-wrap gap-2">
              {audiences.map((a) => (
                <button key={a} onClick={() => setAudience(a)} className={`tag-chip ${audience === a ? "active" : ""}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div>
            <p className="text-xs text-muted font-medium mb-2">Description Length</p>
            <div className="flex gap-2">
              {lengths.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLength(l.value)}
                  className={`flex-1 rounded-xl border px-3 py-2.5 text-center transition-all ${
                    length === l.value
                      ? "border-accent/40 bg-accent/8 text-accent"
                      : "border-border-color text-muted hover:border-border-hover hover:text-foreground"
                  }`}
                >
                  <p className="text-xs font-semibold">{l.label}</p>
                  <p className="text-[10px] mt-0.5 opacity-70">{l.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <button onClick={generateContent} disabled={loading || !topic.trim()} className="btn-primary w-full sm:w-auto">
            <FileText size={15} />
            {loading ? "Generating..." : "Generate Description & Tags"}
          </button>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="mt-5 space-y-3">
            <div className="h-40 rounded-2xl skeleton" />
            <div className="h-20 rounded-2xl skeleton" />
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {!loading && description && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 space-y-4"
            >
              {/* SEO Score */}
              {seo && (
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className={seo.color} />
                  <span className={`text-xs font-semibold ${seo.color}`}>{seo.label}</span>
                  <span className="text-xs text-muted">· {wordCount(description)} words · {tags.length} tags</span>
                </div>
              )}

              {/* Description */}
              <div className="glass-card-surface rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <FileText size={14} className="text-orange-400" />
                    Description
                  </h3>
                  <button
                    onClick={() => copyText(description, "description")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      copied === "description" ? "bg-green-600 text-white" : "bg-accent text-white hover:bg-accent-hover"
                    }`}
                  >
                    {copied === "description" ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                  </button>
                </div>
                <p className="text-sm text-muted/90 whitespace-pre-line leading-relaxed">{description}</p>
              </div>

              {/* Tags */}
              <div className="glass-card-surface rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Tag size={14} className="text-orange-400" />
                    Tags
                    <span className="badge badge-accent">{tags.length}</span>
                  </h3>
                  <button
                    onClick={() => copyText(tags.join(", "), "tags")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      copied === "tags" ? "bg-green-600 text-white" : "bg-accent text-white hover:bg-accent-hover"
                    }`}
                  >
                    {copied === "tags" ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy All</>}
                  </button>
                </div>
                <p className="text-[10px] text-muted mb-3">Click any tag to copy it individually</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => copyTag(tag)}
                      title="Click to copy"
                      className={`tag-chip ${copiedTag === tag ? "active" : ""}`}
                    >
                      {copiedTag === tag ? <Check size={10} /> : null}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hashtags */}
              {hashtags.length > 0 && (
                <div className="glass-card-surface rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <Hash size={14} className="text-blue-400" />
                      Hashtags
                    </h3>
                    <button
                      onClick={() => { navigator.clipboard.writeText(hashtags.join(" ")); toast.success("Hashtags copied!"); }}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold bg-surface border border-border-color hover:border-border-hover transition-all text-muted hover:text-foreground"
                    >
                      <Copy size={11} /> Copy All
                    </button>
                  </div>
                  <p className="text-sm text-blue-400/80 leading-relaxed">{hashtags.join(" ")}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
