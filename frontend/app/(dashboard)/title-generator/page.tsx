"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw, Flame, Check, Star, Sparkles, OctagonAlert,
  CircleCheckBig, PenLine, Copy, X, ArrowLeftRight,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { addHistoryItem } from "@/lib/history";
import { toast } from "sonner";

type TitleItem = { title: string; score: number };

const tones = ["Default", "Funny", "Serious", "Clickbait", "Professional"];
const suggestions = ["Tech Review", "Daily Vlog", "Tutorial", "Gaming", "Cooking Recipe", "Fitness Journey"];

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? "#22c55e" : score >= 70 ? "#ffd600" : "#f87171";
  const bg =
    score >= 85 ? "rgba(34,197,94,0.1)" : score >= 70 ? "rgba(255,214,0,0.1)" : "rgba(248,113,113,0.1)";
  const border =
    score >= 85 ? "rgba(34,197,94,0.25)" : score >= 70 ? "rgba(255,214,0,0.25)" : "rgba(248,113,113,0.25)";

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold"
      style={{ color, background: bg, border: `1px solid ${border}` }}
    >
      <Flame size={10} />
      {score}% CTR
    </span>
  );
}

function TitleLengthBadge({ title }: { title: string }) {
  const len = title.length;
  const label = len < 40 ? "Short" : len < 60 ? "Optimal" : "Long";
  const color = len < 40 ? "text-blue-400" : len < 60 ? "text-green-400" : "text-orange-400";
  return (
    <span className={`text-[10px] font-semibold ${color}`}>
      {len} chars · {label}
    </span>
  );
}

export default function TitleGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Default");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [kwInput, setKwInput] = useState("");
  const [titles, setTitles] = useState<TitleItem[]>([]);
  const [starred, setStarred] = useState<Set<number>>(new Set());
  const [pinned, setPinned] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const bestScore = titles.length > 0 ? Math.max(...titles.map((t) => t.score)) : 0;

  const fetchTitles = async () => {
    const res = await fetch("/api/generate-title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, tone }),
    });
    return res.json();
  };

  const generateTitles = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setStarred(new Set());
    setPinned([]);
    try {
      const data = await fetchTitles();
      if (data.success) {
        setTitles(data.titles);
        toast.success("Titles Ready!", { description: "5 high-CTR titles generated.", icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
        addHistoryItem({ tool: "title-generator", input: topic, output: data.titles });
      } else {
        toast.error("Generation Failed", { description: "Please try again.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const regenerateOne = async (index: number) => {
    setRegeneratingIndex(index);
    try {
      const data = await fetchTitles();
      if (data.success && data.titles.length > 0) {
        const replacement = data.titles[Math.floor(Math.random() * data.titles.length)];
        setTitles((prev) => { const u = [...prev]; u[index] = replacement; return u; });
      }
    } catch { /* */ }
    setRegeneratingIndex(null);
  };

  const copyTitle = (title: string, index: number) => {
    navigator.clipboard.writeText(title);
    setCopiedIndex(index);
    toast.success("Copied!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const toggleStar = (index: number) => {
    setStarred((prev) => {
      const n = new Set(prev);
      n.has(index) ? n.delete(index) : n.add(index);
      return n;
    });
  };

  const togglePin = (index: number) => {
    setPinned((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : prev.length < 2 ? [...prev, index] : prev
    );
  };

  const addKeyword = () => {
    if (kwInput.trim() && !keywords.includes(kwInput.trim())) {
      setKeywords((prev) => [...prev, kwInput.trim()]);
      setKwInput("");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-4xl">
        <PageHeader
          icon={PenLine}
          iconColor="text-blue-400"
          iconBg="bg-blue-400/10"
          title="Titles That"
          titleHighlight="Get Clicked"
          subtitle="Generate AI-powered YouTube titles with CTR scores, length indicators, and tone control."
          badge="AI Powered"
        />

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          className="glass-card-surface rounded-2xl p-5 space-y-4"
        >
          {/* Topic input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-muted font-medium">Video Topic</label>
              <span className={`text-[10px] font-semibold ${topic.length > 80 ? "text-red-400" : "text-muted"}`}>
                {topic.length}/100
              </span>
            </div>
            <input
              type="text"
              placeholder="e.g. I tried 10 AI tools for a month..."
              value={topic}
              maxLength={100}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateTitles()}
              className="input-base"
            />
            {/* Suggestions */}
            {!topic && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => setTopic(s)} className="tag-chip">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tone Selector */}
          <div>
            <p className="text-xs text-muted font-medium mb-2">Tone</p>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`tag-chip ${tone === t ? "active" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Keyword Boost */}
          <div>
            <p className="text-xs text-muted font-medium mb-2">Keyword Boost <span className="text-muted/50">(optional)</span></p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a keyword to include..."
                value={kwInput}
                onChange={(e) => setKwInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                className="input-base flex-1 py-2.5 text-xs"
              />
              <button onClick={addKeyword} className="btn-secondary px-4 py-2.5 text-xs rounded-xl">
                Add
              </button>
            </div>
            {keywords.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {keywords.map((kw) => (
                  <span key={kw} className="badge badge-accent flex items-center gap-1">
                    {kw}
                    <button onClick={() => setKeywords((prev) => prev.filter((k) => k !== kw))} className="ml-0.5 hover:text-red-300">
                      <X size={9} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button onClick={generateTitles} disabled={loading || !topic.trim()} className="btn-primary">
              <Sparkles size={15} />
              {loading ? "Generating..." : "Generate Titles"}
            </button>
            {titles.length > 0 && (
              <button onClick={generateTitles} disabled={loading} className="btn-secondary">
                <RefreshCw size={14} />
                Regenerate All
              </button>
            )}
          </div>
        </motion.div>

        {/* A/B Compare */}
        <AnimatePresence>
          {pinned.length === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-5 glass-card-surface rounded-2xl p-5"
            >
              <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                <ArrowLeftRight size={12} /> A/B Comparison
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {pinned.map((idx, i) => (
                  <div key={idx} className="rounded-xl border border-border-color bg-background/50 p-3">
                    <p className="text-[10px] text-muted font-bold uppercase mb-1.5">{i === 0 ? "Option A" : "Option B"}</p>
                    <p className="text-sm font-medium text-foreground">{titles[idx]?.title}</p>
                    <ScoreBadge score={titles[idx]?.score || 0} />
                  </div>
                ))}
              </div>
              <button onClick={() => setPinned([])} className="mt-3 text-xs text-muted hover:text-foreground transition-colors">
                Clear comparison
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading skeletons */}
        {loading && (
          <div className="mt-5 space-y-3">
            <p className="flex items-center gap-2 text-sm text-muted">
              <Sparkles size={14} className="text-accent animate-pulse" />
              AI is crafting your titles...
            </p>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 rounded-xl skeleton" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && titles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-color py-16 text-center"
          >
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
              <PenLine size={24} className="text-blue-400" />
            </div>
            <p className="font-semibold text-foreground text-sm">Ready to generate titles</p>
            <p className="mt-1 text-xs text-muted max-w-xs">
              Enter your video topic above and hit Generate to get 5 AI-scored titles.
            </p>
          </motion.div>
        )}

        {/* Results */}
        {!loading && titles.length > 0 && (
          <motion.div
            className="mt-5 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">{titles.length} titles generated</p>
              {starred.size > 0 && (
                <span className="badge badge-highlight">
                  <Star size={10} fill="currentColor" /> {starred.size} starred
                </span>
              )}
            </div>
            {titles.map((titleItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                className={`rounded-xl border p-4 transition-all duration-200 ${
                  titleItem.score === bestScore
                    ? "border-accent/40 bg-accent/5 shadow-[0_0_20px_rgba(255,0,51,0.08)]"
                    : "border-border-color bg-surface/40 hover:border-accent/25"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Labels row */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] text-muted">#{index + 1}</span>
                      {titleItem.score === bestScore && (
                        <span className="badge badge-accent">
                          <Star size={9} fill="currentColor" /> Best Pick
                        </span>
                      )}
                      {starred.has(index) && (
                        <span className="badge badge-highlight">
                          <Star size={9} fill="currentColor" /> Starred
                        </span>
                      )}
                      {pinned.includes(index) && (
                        <span className="badge" style={{ background: "rgba(168,85,247,0.1)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.25)" }}>
                          <ArrowLeftRight size={9} /> In Compare
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    {regeneratingIndex === index ? (
                      <div className="h-5 w-3/4 rounded skeleton" />
                    ) : (
                      <p className="font-medium text-sm leading-snug">{titleItem.title}</p>
                    )}

                    {/* Meta */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <ScoreBadge score={titleItem.score} />
                      {!regeneratingIndex && <TitleLengthBadge title={titleItem.title} />}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleStar(index)}
                      title={starred.has(index) ? "Unstar" : "Star"}
                      className={`h-8 w-8 rounded-lg border flex items-center justify-center transition-all ${
                        starred.has(index)
                          ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                          : "border-border-color text-muted hover:text-yellow-400 hover:border-yellow-500/20"
                      }`}
                    >
                      <Star size={13} fill={starred.has(index) ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => togglePin(index)}
                      title="Compare"
                      disabled={pinned.length >= 2 && !pinned.includes(index)}
                      className={`h-8 w-8 rounded-lg border flex items-center justify-center transition-all ${
                        pinned.includes(index)
                          ? "border-purple-500/30 bg-purple-500/10 text-purple-400"
                          : "border-border-color text-muted hover:text-purple-400 hover:border-purple-500/20 disabled:opacity-30"
                      }`}
                    >
                      <ArrowLeftRight size={12} />
                    </button>
                    <button
                      onClick={() => regenerateOne(index)}
                      disabled={regeneratingIndex === index}
                      title="Regenerate"
                      className="h-8 w-8 rounded-lg border border-border-color flex items-center justify-center text-muted hover:text-foreground hover:border-border-hover transition-all disabled:opacity-40"
                    >
                      <RefreshCw size={12} className={regeneratingIndex === index ? "animate-spin" : ""} />
                    </button>
                    <button
                      onClick={() => copyTitle(titleItem.title, index)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        copiedIndex === index
                          ? "bg-green-600 text-white"
                          : "bg-accent text-white hover:bg-accent-hover"
                      }`}
                    >
                      {copiedIndex === index ? <><Check size={11} /> Done</> : <><Copy size={11} /> Copy</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
