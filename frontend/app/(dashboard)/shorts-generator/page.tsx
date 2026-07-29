"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, Sparkles, Copy, Download, Check, RefreshCw, Lightbulb,
  Clock, Target, Zap, CircleCheckBig, OctagonAlert, Smartphone, Repeat, Eye, Video
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { toast } from "sonner";
import { addHistoryItem } from "@/lib/history";
import { jsPDF } from "jspdf";

type ShortsData = {
  hooks: { type: string; text: string; retentionScore: number; reason: string }[];
  scriptBeats: { timestamp: string; section: string; script: string; visualCue: string }[];
  loopExplanation: string;
  caption: string;
};

const niches = ["Tech & AI", "Gaming", "Finance & Wealth", "Fitness & Health", "Education & How-To", "Lifestyle & Vlog"];
const durations = ["30 seconds (Quick Tip)", "45 seconds (Story / Case Study)", "60 seconds (Full Masterclass)"];
const styles = ["Curiosity Gap", "Controversial / Shock", "Secret Reveal", "Negative Warning", "Listicle Count-up"];

const suggestions = [
  "3 AI tools that feel illegal to know",
  "Why 99% of programmers fail their first coding interview",
  "How to turn $10 into $1000 using ChatGPT",
  "The secret iPhone feature Apple hid from you",
  "Stop drinking coffee before doing this morning routine"
];

export default function ShortsGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("Tech & AI");
  const [duration, setDuration] = useState("30 seconds (Quick Tip)");
  const [style, setStyle] = useState("Curiosity Gap");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ShortsData | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    toast.success(`Copied ${id}!`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const generateShorts = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a video topic!");
      return;
    }

    setLoading(true);
    setData(null);

    try {
      const res = await fetch("/api/generate-shorts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, niche, duration, style }),
      });

      const json = await res.json();
      if (json.success && json.shortsData) {
        setData(json.shortsData);
        toast.success("Viral Shorts Script Ready!", {
          description: "Engineered for 80%+ retention and infinite looping.",
          icon: <CircleCheckBig className="text-emerald-400" size={18} />
        });
        addHistoryItem({
          tool: "shorts-generator",
          input: `${topic} (${duration})`,
          output: json.shortsData,
        });
      } else {
        throw new Error(json.error || "Failed to generate");
      }
    } catch (err) {
      console.error(err);
      toast.error("Generation Failed", {
        description: "Please check your network and try again.",
        icon: <OctagonAlert className="text-red-400" size={18} />
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!data) return;
    try {
      const doc = new jsPDF();
      let y = 20;
      const margin = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxLineWidth = pageWidth - margin * 2;

      // Header
      doc.setFillColor(24, 24, 24);
      doc.rect(margin, y, maxLineWidth, 24, "F");
      
      doc.setTextColor(255, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("SAFLIX AI STUDIO", margin + 6, y + 10);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.text("Viral Shorts & Hooks Production Blueprint", margin + 6, y + 18);
      
      y += 34;

      const addSectionTitle = (title: string) => {
        if (y > 265) { doc.addPage(); y = 20; }
        doc.setFillColor(255, 0, 0);
        doc.rect(margin, y, 3, 7, "F");
        doc.setTextColor(30, 30, 30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(title, margin + 6, y + 5.5);
        y += 12;
      };

      const addBodyText = (text: string, isBold = false, color = [70, 70, 70]) => {
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        doc.setFontSize(10);
        doc.setTextColor(color[0], color[1], color[2]);
        const lines = doc.splitTextToSize(text, maxLineWidth);
        lines.forEach((line: string) => {
          if (y > 275) { doc.addPage(); y = 20; }
          doc.text(line, margin, y);
          y += 5.5;
        });
      };

      addBodyText(`Topic: ${topic}`, true, [0, 0, 0]);
      addBodyText(`Niche: ${niche} | Duration: ${duration} | Hook Style: ${style}`, false, [100, 100, 100]);
      y += 6;

      // 1. Hooks
      addSectionTitle("1. TOP 3 A/B TESTED VIRAL HOOKS");
      data.hooks.forEach((h, i) => {
        addBodyText(`Hook #${i + 1} (${h.type} - ${h.retentionScore}% Retention):`, true, [220, 38, 38]);
        addBodyText(`"${h.text}"`, true, [0, 0, 0]);
        addBodyText(`Why it works: ${h.reason}`, false, [100, 100, 100]);
        y += 4;
      });
      y += 2;

      // 2. Vertical Script
      addSectionTitle("2. BEAT-BY-BEAT VERTICAL SCRIPT (9:16)");
      data.scriptBeats.forEach((beat) => {
        addBodyText(`[${beat.timestamp}] - ${beat.section}`, true, [220, 38, 38]);
        addBodyText(`SAY: "${beat.script}"`, true, [20, 20, 20]);
        addBodyText(`VISUAL CUE: ${beat.visualCue}`, false, [100, 100, 100]);
        y += 4;
      });
      y += 2;

      // 3. Loop Explanation
      addSectionTitle("3. INFINITE LOOP ENDING STRATEGY");
      addBodyText(data.loopExplanation, false, [40, 40, 40]);
      y += 6;

      // 4. Caption
      addSectionTitle("4. RECOMMENDED CAPTION & HASHTAGS");
      addBodyText(data.caption, true, [0, 0, 0]);

      if (y > 275) { doc.addPage(); y = 20; }
      y += 10;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("Generated by Saflix AI Studio — All rights reserved.", margin, y);

      doc.save(`Saflix-Shorts-Script-${topic.slice(0, 20).replace(/\s+/g, "-")}.pdf`);
      toast.success("Downloaded Shorts PDF Blueprint!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF.");
    }
  };

  const copyFullScript = () => {
    if (!data) return;
    const full = `=== SAFLIX VIRAL SHORTS SCRIPT ===\nTOPIC: ${topic}\n\n` +
      data.scriptBeats.map(b => `[${b.timestamp}] (${b.section}):\nSAY: "${b.script}"\nVISUAL: ${b.visualCue}\n`).join("\n") +
      `\nCAPTION:\n${data.caption}`;
    handleCopy(full, "Full Script");
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-6xl">
        <PageHeader
          icon={Flame}
          iconColor="text-[#ff0000]"
          iconBg="bg-[#ff0000]/10"
          title="Viral Shorts &"
          titleHighlight="Hooks Studio"
          subtitle="Engineered for 80%+ retention on YouTube Shorts, Reels, and TikTok with infinite looping scripts and word-by-word visual cues."
          badge="Shorts Engine"
        />

        {/* Input Controls */}
        <div className="glass-card-surface rounded-2xl p-6 md:p-8 space-y-6 border border-[#272727] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff0000]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Topic Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted flex items-center gap-1.5">
              <Lightbulb size={14} className="text-[#ff0000]" />
              What is your Short / Vertical video about?
            </label>
            <input
              type="text"
              placeholder="e.g. 3 AI websites that feel illegal to know..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateShorts()}
              className="w-full bg-[#121212] border border-[#272727] focus:border-[#ff0000] rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none transition-colors"
            />
            {/* Suggestion Chips */}
            {!topic && (
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="text-xs text-muted flex items-center gap-1 py-1">Try:</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setTopic(s)}
                    className="text-xs bg-[#181818] hover:bg-[#272727] border border-[#272727] text-muted hover:text-white px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selector Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Niche */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted font-medium">Channel Niche</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-[#121212] border border-[#272727] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff0000]"
              >
                {niches.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted font-medium flex items-center gap-1">
                <Clock size={12} /> Target Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#121212] border border-[#272727] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff0000]"
              >
                {durations.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Hook Style */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted font-medium flex items-center gap-1">
                <Target size={12} /> Hook Strategy
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-[#121212] border border-[#272727] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff0000]"
              >
                {styles.map((st) => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-4 flex items-center justify-between border-t border-[#272727]">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Engineered for YouTube Shorts, Reels & TikTok</span>
            </div>
            <button
              onClick={generateShorts}
              disabled={loading || !topic.trim()}
              className="btn-primary text-sm px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-[#ff0000]/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Engineering Script...
                </>
              ) : (
                <>
                  <Flame size={16} />
                  Generate Shorts Script
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
            <div className="h-64 bg-[#181818] rounded-2xl border border-[#272727]" />
            <div className="lg:col-span-2 h-96 bg-[#181818] rounded-2xl border border-[#272727]" />
          </div>
        )}

        {/* Generated Output */}
        <AnimatePresence>
          {!loading && data && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-6"
            >
              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141414] border border-[#272727] rounded-2xl p-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff0000]" />
                  <span className="text-sm font-bold text-white">9:16 Vertical Production Kit Ready</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={copyFullScript}
                    className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5 border-[#272727]"
                  >
                    {copiedIndex === "Full Script" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    Copy Entire Script
                  </button>
                  <button
                    onClick={downloadPDF}
                    className="btn-primary text-xs px-5 py-2 flex items-center gap-1.5 shadow-md"
                  >
                    <Download size={14} />
                    Download Shorts Blueprint (.PDF)
                  </button>
                </div>
              </div>

              {/* Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Col: Hooks */}
                <div className="space-y-4">
                  <div className="glass-card-surface rounded-2xl p-5 border border-[#272727] space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 border-b border-[#272727] pb-3">
                      <Zap size={16} className="text-[#ff0000]" />
                      Top 3 Viral Hooks (A/B Test)
                    </h3>
                    <p className="text-xs text-muted">The first 3 seconds decide your virality. Choose your favorite opening hook:</p>

                    <div className="space-y-3">
                      {data.hooks.map((h, i) => (
                        <div key={i} className="bg-[#181818] border border-[#272727] hover:border-[#ff0000]/40 rounded-xl p-3.5 space-y-2 transition-all">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-[#ff0000] font-bold uppercase tracking-wide">{h.type}</span>
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                              {h.retentionScore}% Retention
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-white">"{h.text}"</p>
                          <p className="text-[11px] text-muted italic">Why: {h.reason}</p>
                          <button
                            onClick={() => handleCopy(h.text, `Hook #${i + 1}`)}
                            className="w-full mt-2 py-1.5 bg-[#202020] hover:bg-[#272727] rounded-lg text-xs font-medium text-muted hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                          >
                            {copiedIndex === `Hook #${i + 1}` ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                            Copy Hook
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Loop Card */}
                  <div className="glass-card-surface rounded-2xl p-5 border border-[#272727] space-y-3 bg-gradient-to-br from-[#141414] to-[#1a1010]">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#ff0000] flex items-center gap-1.5">
                      <Repeat size={14} /> Infinite Looping Strategy
                    </h4>
                    <p className="text-xs text-white leading-relaxed">{data.loopExplanation}</p>
                    <div className="pt-2 border-t border-[#272727]">
                      <span className="text-[11px] text-muted block mb-1">Viral Caption & Hashtags:</span>
                      <div className="flex items-center justify-between bg-[#121212] p-2.5 rounded-lg border border-[#272727]">
                        <span className="text-xs text-white font-mono truncate mr-2">{data.caption}</span>
                        <button
                          onClick={() => handleCopy(data.caption, "Caption")}
                          className="p-1 hover:text-white text-muted"
                        >
                          {copiedIndex === "Caption" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Col: Vertical Script Beat Timeline */}
                <div className="lg:col-span-2 glass-card-surface rounded-2xl p-6 border border-[#272727] space-y-6">
                  <div className="flex items-center justify-between border-b border-[#272727] pb-4">
                    <div className="flex items-center gap-2">
                      <Smartphone size={18} className="text-[#ff0000]" />
                      <h3 className="text-base font-bold text-white">9:16 Beat-by-Beat Vertical Script</h3>
                    </div>
                    <span className="text-xs text-muted font-mono">{duration}</span>
                  </div>

                  {/* Beats Timeline */}
                  <div className="space-y-4 relative before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-0.5 before:bg-[#272727]">
                    {data.scriptBeats.map((beat, idx) => (
                      <div key={idx} className="relative pl-9 space-y-2">
                        {/* Timeline Node */}
                        <div className="absolute left-1.5 top-1.5 w-4.5 h-4.5 rounded-full bg-[#ff0000] ring-4 ring-[#0f0f0f] flex items-center justify-center text-[10px] font-bold text-white shadow">
                          {idx + 1}
                        </div>

                        {/* Beat Header */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white bg-[#202020] px-2.5 py-1 rounded-md border border-[#272727]">
                            {beat.section}
                          </span>
                          <span className="text-xs font-mono text-[#ff0000] font-semibold">{beat.timestamp}</span>
                        </div>

                        {/* Spoken Script Box */}
                        <div className="bg-[#161616] border border-[#272727] rounded-xl p-4 space-y-2 shadow-inner">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted block">SAY OUT LOUD:</span>
                          <p className="text-base font-semibold text-white leading-relaxed">"{beat.script}"</p>
                        </div>

                        {/* Visual Cue Pill */}
                        <div className="bg-[#1f1515] border border-[#ff0000]/30 rounded-lg p-2.5 flex items-start gap-2">
                          <Video size={14} className="text-[#ff0000] shrink-0 mt-0.5" />
                          <div className="text-xs text-muted">
                            <span className="text-white font-semibold">ON SCREEN VISUAL CUE: </span>
                            {beat.visualCue}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
