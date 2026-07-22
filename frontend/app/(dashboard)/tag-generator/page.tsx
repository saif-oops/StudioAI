"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tags, Search, OctagonAlert, CircleCheckBig, Sparkles, Copy, Check, Hash
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { addHistoryItem } from "@/lib/history";
import { toast } from "sonner";

export default function TagGenerator() {
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const generateTags = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setTags([]);
    try {
      const res = await fetch("/api/generate-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (data.success) {
        setTags(data.tags);
        toast.success("Tags Ready!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
        addHistoryItem({ tool: "tag-generator" as any, input: topic, output: data.tags });
      } else {
        toast.error("Generation Failed", { description: "Please try again.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const copyAllTags = () => {
    navigator.clipboard.writeText(tags.join(", "));
    setCopiedAll(true);
    toast.success("All tags copied!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
    setTimeout(() => setCopiedAll(false), 1500);
  };

  const copySingleTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-4xl">
        <PageHeader
          icon={Tags}
          iconColor="text-teal-400"
          iconBg="bg-teal-400/10"
          title="SEO Tag"
          titleHighlight="Generator"
          subtitle="Discover high-volume, low-competition tags for your YouTube videos to rank higher in search."
          badge="SEO AI"
        />

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card-surface rounded-2xl p-5 space-y-4"
        >
          <div>
            <label className="text-xs text-muted font-medium block mb-1.5">Video Topic or Title</label>
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="e.g. How to start a faceless YouTube channel..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generateTags()}
                className="input-base pl-10"
              />
            </div>
          </div>

          <button onClick={generateTags} disabled={loading || !topic.trim()} className="btn-primary">
            <Sparkles size={15} />
            {loading ? "Extracting Tags..." : "Generate SEO Tags"}
          </button>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="mt-5 glass-card-surface rounded-2xl p-5 min-h-40 flex flex-col items-center justify-center">
             <Tags size={24} className="text-teal-400 animate-bounce mb-3" />
             <p className="text-sm text-muted animate-pulse">Analyzing search volume and competition...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && tags.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-color py-16 text-center"
          >
            <div className="h-14 w-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-4">
              <Hash size={24} className="text-teal-400" />
            </div>
            <p className="font-semibold text-foreground text-sm">Boost Your SEO</p>
            <p className="mt-1 text-xs text-muted max-w-xs">
              Enter a topic to generate 15-25 highly optimized tags for your video.
            </p>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {!loading && tags.length > 0 && (
            <motion.div
              className="mt-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="glass-card-surface rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4 border-b border-border-color pb-4">
                  <div>
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <Tags size={16} className="text-teal-400" />
                      Optimized Tags
                      <span className="badge badge-accent">{tags.length} tags</span>
                    </h3>
                    <p className="text-[10px] text-muted mt-1">Copy all and paste directly into YouTube's tag box.</p>
                  </div>
                  <button
                    onClick={copyAllTags}
                    className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                      copiedAll ? "bg-green-600 text-white" : "bg-accent text-white hover:bg-accent-hover"
                    }`}
                  >
                    {copiedAll ? <><Check size={13} /> Copied All!</> : <><Copy size={13} /> Copy All Tags</>}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <motion.button
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.02 }}
                      onClick={() => copySingleTag(tag)}
                      title="Click to copy single tag"
                      className={`tag-chip ${copiedTag === tag ? "active bg-green-500/20 text-green-400 border-green-500/30" : ""}`}
                    >
                      {copiedTag === tag ? <Check size={10} /> : <Hash size={10} className="opacity-50" />}
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
