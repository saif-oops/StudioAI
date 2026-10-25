"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clapperboard, Flame, ClipboardList, Copy, Check,
  OctagonAlert, CircleCheckBig, Download, Clock, ChevronDown, ChevronRight,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { addHistoryItem } from "@/lib/history";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { ref, get, update, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { generateScript as generateScriptAI } from "@/app/actions/ai";
import { notifyInsufficientCredits } from "@/lib/credits";

const styles = ["Educational", "Entertainment", "Tutorial", "Vlog", "Documentary", "Motivational"];
const videoLengths = [
  { label: "Short", desc: "< 5 min", value: "short", words: 300 },
  { label: "Medium", desc: "~10 min", value: "medium", words: 600 },
  { label: "Long", desc: "20+ min", value: "long", words: 1200 },
];

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function readTime(words: number) {
  const mins = Math.ceil(words / 130);
  return `~${mins} min read`;
}

export default function ScriptGenerator() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("Educational");
  const [videoLength, setVideoLength] = useState("medium");
  const [hook, setHook] = useState("");
  const [outline, setOutline] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const { user } = useAuth();

  const generateScript = async () => {
    if (!topic.trim()) return;
    if (!user) {
      toast.error("You must be logged in to generate scripts.");
      return;
    }

    setLoading(true);
    setHook("");
    setOutline([]);
    setExpandedItems(new Set());
    
    try {
      // 1. Check credits
      let credits = 150;
      let userRef: ReturnType<typeof ref> | null = null;
      try {
        userRef = ref(db, `users/${user.uid}`);
        const userSnap = await get(userRef);
        if (userSnap.exists()) {
          credits = userSnap.val().credits ?? 150;
        } else {
          await set(userRef, {
            email: user.email,
            name: user.displayName,
            credits: 150,
            tier: "Free",
            createdAt: new Date().toISOString(),
          });
        }
      } catch (dbErr) {
        console.warn("Credit check warning:", dbErr);
      }

      if (credits < 1) {
        notifyInsufficientCredits("Not enough credits to generate a script.");
        setLoading(false);
        return;
      }
      
      // 2. Call AI Action
      const selectedLengthDesc = videoLengths.find((l) => l.value === videoLength)?.desc || "";
      const data = await generateScriptAI(topic, style, selectedLengthDesc);
      
      if (data.success && data.result) {
        setHook(data.result.hook);
        setOutline(data.result.outline);
        
        // 3. Deduct credit
        try {
          if (userRef) {
            await update(userRef, { credits: Math.max(0, credits - 1) });
          }
        } catch (updateErr) {
          console.warn("Credit update warning:", updateErr);
        }
        
        toast.success("Script Ready!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
        addHistoryItem({ tool: "script-generator", input: topic, output: data.result });
      } else {
        toast.error("Failed to generate", { description: data.error || "Try again.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
    }
    setLoading(false);
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    toast.success("Copied!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
    setTimeout(() => setCopied(null), 1500);
  };

  const toggleExpand = (idx: number) => {
    setExpandedItems((prev) => {
      const n = new Set(prev);
      if (n.has(idx)) {
        n.delete(idx);
      } else {
        n.add(idx);
      }
      return n;
    });
  };

  const downloadScript = () => {
    const content = `SCRIPT: ${topic}\n\n=== HOOK ===\n${hook}\n\n=== OUTLINE ===\n${outline.map((p, i) => `${i + 1}. ${p}`).join("\n")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `script-${topic.slice(0, 20).replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Script downloaded!");
  };

  const hookWords = wordCount(hook);
  const outlineWords = outline.join(" ").split(/\s+/).length;
  const selectedLength = videoLengths.find((l) => l.value === videoLength);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-4xl">
        <PageHeader
          icon={Clapperboard}
          iconColor="text-red-400"
          iconBg="bg-red-400/10"
          title="Script"
          titleHighlight="Generator"
          subtitle="Generate a powerful hook and structured script outline — tailored to your style and video length."
        >
          {hook && (
            <button onClick={downloadScript} className="btn-secondary text-xs px-3 py-2 rounded-lg">
              <Download size={13} />
              Download .txt
            </button>
          )}
        </PageHeader>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          className="glass-card-surface rounded-2xl p-5 space-y-4"
        >
          <div>
            <label className="text-xs text-muted font-medium block mb-1.5">Video Topic</label>
            <input
              type="text"
              placeholder="e.g. How to build a morning routine that actually works..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateScript()}
              className="input-base"
            />
          </div>

          {/* Style */}
          <div>
            <p className="text-xs text-muted font-medium mb-2">Video Style</p>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <button key={s} onClick={() => setStyle(s)} className={`tag-chip ${style === s ? "active" : ""}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Video Length */}
          <div>
            <p className="text-xs text-muted font-medium mb-2">Video Length</p>
            <div className="flex gap-2">
              {videoLengths.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setVideoLength(l.value)}
                  className={`flex-1 rounded-xl border px-3 py-2.5 text-center transition-all ${
                    videoLength === l.value
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

          <button onClick={generateScript} disabled={loading || !topic.trim()} className="btn-primary w-full sm:w-auto">
            <Clapperboard size={15} />
            {loading ? "Generating..." : "Generate Script"}
          </button>
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div className="mt-5 space-y-3">
            <div className="h-24 rounded-2xl skeleton" />
            <div className="h-56 rounded-2xl skeleton" />
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {!loading && hook && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 space-y-4"
            >
              {/* Meta bar */}
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {readTime(hookWords + outlineWords)}
                </span>
                <span className="h-3 w-px bg-border-color" />
                <span>{hookWords + outlineWords} words total</span>
                <span className="h-3 w-px bg-border-color" />
                <span className="badge badge-accent">{style}</span>
                <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--muted)", border: "1px solid var(--border-color)" }}>
                  {selectedLength?.desc}
                </span>
              </div>

              {/* Hook */}
              <div className="glass-card-surface rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <span className="h-6 w-6 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Flame size={13} className="text-accent" />
                    </span>
                    Hook
                    <span className="text-[10px] text-muted font-normal">· first 5–10 seconds</span>
                  </h3>
                  <button
                    onClick={() => copyText(hook, "hook")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      copied === "hook" ? "bg-green-600 text-white" : "bg-accent text-white hover:bg-accent-hover"
                    }`}
                  >
                    {copied === "hook" ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                  </button>
                </div>
                <p className="text-sm text-muted/90 leading-relaxed italic">&ldquo;{hook}&rdquo;</p>
                <p className="mt-2 text-[10px] text-muted">{hookWords} words</p>
              </div>

              {/* Outline */}
              <div className="glass-card-surface rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <span className="h-6 w-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <ClipboardList size={13} className="text-blue-400" />
                    </span>
                    Script Outline
                  </h3>
                  <button
                    onClick={() => copyText(outline.map((p, i) => `${i + 1}. ${p}`).join("\n"), "outline")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      copied === "outline" ? "bg-green-600 text-white" : "bg-accent text-white hover:bg-accent-hover"
                    }`}
                  >
                    {copied === "outline" ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                  </button>
                </div>

                <div className="space-y-2">
                  {outline.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
                      className="rounded-xl border border-border-color overflow-hidden"
                    >
                      <button
                        onClick={() => toggleExpand(i)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/2 transition-colors"
                      >
                        <span className="h-6 w-6 shrink-0 rounded-lg bg-surface-2 flex items-center justify-center text-xs font-bold text-accent">
                          {i + 1}
                        </span>
                        <span className="flex-1 text-sm font-medium text-foreground">{point}</span>
                        {expandedItems.has(i) ? (
                          <ChevronDown size={14} className="text-muted shrink-0" />
                        ) : (
                          <ChevronRight size={14} className="text-muted shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedItems.has(i) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3 pt-1 border-t border-border-color">
                              <p className="text-xs text-muted leading-relaxed">
                                Expand on: <span className="font-medium text-foreground/70">{point}</span>. 
                                Cover key points, examples, and call-to-action relevant to your {style.toLowerCase()} style.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
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
