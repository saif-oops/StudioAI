"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Flame, Check, Copy, Download, Lightbulb, PenLine, FileText,
  Tags, Clapperboard, Palette, ArrowRight, Zap, RefreshCw, CircleCheckBig, OctagonAlert
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { toast } from "sonner";
import { addHistoryItem } from "@/lib/history";
import { jsPDF } from "jspdf";

type VideoPack = {
  titles: { title: string; score: number; reason: string }[];
  description: string;
  tags: string[];
  scriptOutline: {
    hook: string;
    intro: string;
    mainPoints: string[];
    cta: string;
  };
  thumbnailConcept: {
    visualDescription: string;
    textOverlay: string;
    colorScheme: string;
  };
};

const tones = ["Viral & Engaging", "Educational & Deep", "Fast-Paced & Energetic", "Controversial & Bold", "Storytelling / Vlog"];
const niches = ["Tech & AI", "Gaming", "Finance & Crypto", "Lifestyle & Vlog", "Business & Marketing", "Fitness & Health"];
const suggestions = [
  "Why AI is replacing junior coders in 2026",
  "I let AI run my YouTube channel for 30 days",
  "The secret study routine of Harvard medical students",
  "How I built a $10,000/mo side hustle from scratch",
  "Why most YouTubers fail in their first 6 months"
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 90 ? "#22c55e" : score >= 80 ? "#ffd600" : "#f87171";
  const bg = score >= 90 ? "rgba(34,197,94,0.1)" : score >= 80 ? "rgba(255,214,0,0.1)" : "rgba(248,113,113,0.1)";
  const border = score >= 90 ? "rgba(34,197,94,0.3)" : score >= 80 ? "rgba(255,214,0,0.3)" : "rgba(248,113,113,0.3)";

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold shrink-0 shadow-sm"
      style={{ color, background: bg, border: `1px solid ${border}` }}
    >
      <Flame size={12} className="animate-pulse" />
      {score}% CTR
    </span>
  );
}

export default function VideoPackGenerator() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Viral & Engaging");
  const [niche, setNiche] = useState("Tech & AI");
  const [loading, setLoading] = useState(false);
  const [pack, setPack] = useState<VideoPack | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const generatePack = async () => {
    if (!topic.trim()) {
      toast.error("Topic Required", { description: "Please enter what your video is about.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      return;
    }
    setLoading(true);
    setPack(null);

    try {
      const res = await fetch("/api/generate-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone, niche }),
      });
      const data = await res.json();
      if (data.success && data.pack) {
        setPack(data.pack);
        addHistoryItem("1-Click Video Pack", topic, `Generated 3 titles, script outline, description, 20 tags, and thumbnail blueprint.`);
        toast.success("Viral Video Pack Ready!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
      } else {
        toast.error("Generation Failed", { description: data.error || "Please try again.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const copyAllTags = () => {
    if (!pack) return;
    const allTags = pack.tags.join(", ");
    handleCopy(allTags, "All 20 Tags");
  };

  const downloadKit = () => {
    if (!pack) return;
    try {
      const doc = new jsPDF();
      let y = 20;
      const margin = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxLineWidth = pageWidth - margin * 2;

      // Header Box
      doc.setFillColor(24, 24, 24);
      doc.rect(margin, y, maxLineWidth, 24, "F");
      
      // Header Title
      doc.setTextColor(255, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("SAFLIX AI STUDIO", margin + 6, y + 10);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.text("1-Click Viral Video Pack Production Report", margin + 6, y + 18);
      
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

      // Topic & Metadata
      addBodyText(`Topic: ${topic}`, true, [0, 0, 0]);
      addBodyText(`Niche: ${niche} | Tone: ${tone}`, false, [100, 100, 100]);
      y += 6;

      // 1. Viral Titles
      addSectionTitle("1. VIRAL TITLES (TOP 3 OPTIONS)");
      pack.titles.forEach((t, i) => {
        addBodyText(`Option ${i + 1}: "${t.title}" (${t.score}% CTR)`, true, [220, 38, 38]);
        addBodyText(`Why it works: ${t.reason}`, false, [80, 80, 80]);
        y += 3;
      });
      y += 4;

      // 2. Thumbnail Blueprint
      addSectionTitle("2. THUMBNAIL CONCEPT (16:9 HD)");
      addBodyText(`Text Overlay: "${pack.thumbnailConcept.textOverlay}"`, true, [0, 0, 0]);
      addBodyText(`Visual Breakdown: ${pack.thumbnailConcept.visualDescription}`, false);
      addBodyText(`Color Palette: ${pack.thumbnailConcept.colorScheme}`, false);
      y += 6;

      // 3. Script Outline
      addSectionTitle("3. COMPLETE SCRIPT STRUCTURE");
      addBodyText("[HOOK - 0:00 to 0:30]:", true, [0, 0, 0]);
      addBodyText(pack.scriptOutline.hook);
      y += 2;
      addBodyText("[INTRO]:", true, [0, 0, 0]);
      addBodyText(pack.scriptOutline.intro);
      y += 2;
      addBodyText("[MAIN TALKING POINTS]:", true, [0, 0, 0]);
      pack.scriptOutline.mainPoints.forEach((p) => {
        addBodyText(`• ${p}`);
      });
      y += 2;
      addBodyText("[CALL TO ACTION]:", true, [0, 0, 0]);
      addBodyText(pack.scriptOutline.cta);
      y += 6;

      // 4. Description
      addSectionTitle("4. SEO VIDEO DESCRIPTION & TIMESTAMPS");
      addBodyText(pack.description);
      y += 6;

      // 5. Tags
      addSectionTitle("5. 20 VIRAL SEO TAGS");
      addBodyText(pack.tags.join(", "), false, [100, 100, 100]);

      // Footer
      if (y > 275) { doc.addPage(); y = 20; }
      y += 10;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("Generated by Saflix AI Studio — All rights reserved.", margin, y);

      doc.save(`Saflix-Video-Pack-${topic.slice(0, 20).replace(/\s+/g, "-")}.pdf`);
      toast.success("Downloaded professional PDF report!");
    } catch (err) {
      console.error("PDF Export Error:", err);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const sendToThumbnailGenerator = () => {
    if (!pack) return;
    localStorage.setItem("saflix_thumbnail_prompt", `${pack.thumbnailConcept.visualDescription}. TEXT OVERLAY: "${pack.thumbnailConcept.textOverlay}". COLOR SCHEME: ${pack.thumbnailConcept.colorScheme}`);
    localStorage.setItem("saflix_thumbnail_title", pack.thumbnailConcept.textOverlay || topic);
    router.push("/thumbnail-generator");
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-6xl">
        <PageHeader
          icon={Sparkles}
          iconColor="text-[#ff0000]"
          iconBg="bg-[#ff0000]/10"
          title="1-Click Viral"
          titleHighlight="Video Pack"
          subtitle="Stop switching between 5 different tools. Enter your video topic once and generate your entire YouTube production package in seconds!"
          badge="5-in-1 Suite"
        />

        {/* Input Card */}
        <div className="glass-card-surface rounded-2xl p-6 md:p-8 space-y-6 border border-[#272727] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff0000]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Topic Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted flex items-center gap-1.5">
              <Lightbulb size={14} className="text-[#ff0000]" />
              What is your video about?
            </label>
            <div className="relative">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Why junior developers are struggling to find jobs in 2026 and how AI coding agents like Devin are changing the game..."
                rows={3}
                className="w-full rounded-xl border border-[#272727] bg-[#121212] p-4 text-sm text-foreground placeholder-muted focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000] transition-all resize-none shadow-inner"
              />
            </div>
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs text-muted font-medium self-center mr-1">Ideas:</span>
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setTopic(s)}
                  className="tag-chip text-xs hover:border-[#ff0000]/40 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tone & Niche Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted">
                Target Niche
              </label>
              <div className="flex flex-wrap gap-2">
                {niches.map((n) => (
                  <button
                    key={n}
                    onClick={() => setNiche(n)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      niche === n
                        ? "bg-[#ff0000] text-white shadow-md shadow-[#ff0000]/20 font-bold"
                        : "bg-[#181818] text-muted hover:text-white border border-[#272727]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted">
                Content Tone & Style
              </label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      tone === t
                        ? "bg-white text-black font-bold shadow-sm"
                        : "bg-[#181818] text-muted hover:text-white border border-[#272727]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-4 flex items-center justify-between border-t border-[#272727]">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Generates 5 complete assets in 1 click (15 credits)</span>
            </div>
            <button
              onClick={generatePack}
              disabled={loading}
              className="btn-primary flex items-center gap-2.5 px-8 py-3 text-sm font-bold rounded-full shadow-lg shadow-[#ff0000]/25 hover:scale-105 transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Generating Entire Pack...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate 1-Click Video Pack
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="mt-8 space-y-6">
            <div className="text-center py-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#181818] border border-[#272727] text-sm font-semibold text-accent animate-pulse mb-3">
                <Zap size={16} />
                AI is synthesizing your titles, script, SEO tags, and thumbnail...
              </div>
              <p className="text-xs text-muted">Analyzing viral algorithms for the &quot;{niche}&quot; category...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 rounded-2xl skeleton" />
              <div className="h-64 rounded-2xl skeleton" />
              <div className="h-80 md:col-span-2 rounded-2xl skeleton" />
            </div>
          </div>
        )}

        {/* Output Bento Grid */}
        {!loading && pack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-8"
          >
            {/* Top Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#181818] border border-[#272727]">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <CircleCheckBig size={18} className="text-emerald-400" />
                  Your Viral Video Package is Ready
                </h2>
                <p className="text-xs text-muted mt-0.5">Copy individual sections below or download the complete production script.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={generatePack}
                  className="btn-secondary text-xs px-4 py-2.5 flex items-center gap-1.5"
                >
                  <RefreshCw size={14} />
                  Regenerate Pack
                </button>
                <button
                  onClick={downloadKit}
                  className="btn-primary text-xs px-5 py-2.5 flex items-center gap-1.5 shadow-md"
                >
                  <Download size={14} />
                  Download Complete Kit (.PDF)
                </button>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: Titles (Span 2) */}
              <div className="lg:col-span-2 glass-card-surface rounded-2xl p-6 border border-[#272727] flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between border-b border-[#272727] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#ff0000]/10 flex items-center justify-center text-[#ff0000]">
                      <PenLine size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white">Top 3 Viral Title Options</h3>
                      <p className="text-xs text-muted">AI-scored based on curiosity gap &amp; search intent</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {pack.titles.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#121212] border border-[#272727] hover:border-[#3f3f3f] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm md:text-base text-white group-hover:text-accent transition-colors">
                            {t.title}
                          </span>
                        </div>
                        <p className="text-xs text-muted font-normal italic">&quot;{t.reason}&quot;</p>
                      </div>
                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <ScoreBadge score={t.score} />
                        <button
                          onClick={() => handleCopy(t.title, `Title #${idx + 1}`)}
                          className="h-8 w-8 rounded-lg bg-[#181818] border border-[#272727] flex items-center justify-center text-muted hover:text-white hover:border-[#ff0000] transition-colors"
                          title="Copy Title"
                        >
                          {copiedSection === `Title #${idx + 1}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Thumbnail Concept (Span 1) */}
              <div className="glass-card-surface rounded-2xl p-6 border border-[#272727] flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#181818] to-[#121212]">
                <div className="flex items-center justify-between border-b border-[#272727] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <Palette size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white">Thumbnail Blueprint</h3>
                      <p className="text-xs text-muted">16:9 Widescreen Layout</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  <div className="p-3 rounded-xl bg-[#0f0f0f] border border-[#272727] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-accent tracking-wider">Recommended Text Overlay</span>
                    <p className="text-lg font-black tracking-tight text-white font-display">&quot;{pack.thumbnailConcept.textOverlay}&quot;</p>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-muted">Visual Scene:</span>
                      <p className="text-foreground mt-0.5 leading-relaxed">{pack.thumbnailConcept.visualDescription}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-muted">Color Contrast:</span>
                      <p className="text-foreground mt-0.5">{pack.thumbnailConcept.colorScheme}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={sendToThumbnailGenerator}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-[#ff0000] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 hover:opacity-95 transition-opacity"
                >
                  <Sparkles size={14} />
                  Generate This in HD (1280x720)
                </button>
              </div>

              {/* Card 3: Complete Script Outline (Span 3) */}
              <div className="lg:col-span-3 glass-card-surface rounded-2xl p-6 border border-[#272727] space-y-5">
                <div className="flex items-center justify-between border-b border-[#272727] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Clapperboard size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white">Complete Video Script &amp; Structure</h3>
                      <p className="text-xs text-muted">Engineered for maximum audience retention</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(
                      `HOOK:\n${pack.scriptOutline.hook}\n\nINTRO:\n${pack.scriptOutline.intro}\n\nMAIN POINTS:\n${pack.scriptOutline.mainPoints.join("\n")}\n\nCTA:\n${pack.scriptOutline.cta}`,
                      "Complete Script"
                    )}
                    className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5"
                  >
                    {copiedSection === "Complete Script" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    Copy Script
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Hook */}
                  <div className="p-4 rounded-xl bg-[#121212] border-l-4 border-l-[#ff0000] border border-[#272727] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#ff0000] flex items-center gap-1">
                        <Flame size={14} />
                        The Hook (0:00 - 0:30)
                      </span>
                      <span className="text-[10px] bg-[#ff0000]/10 text-[#ff0000] px-2 py-0.5 rounded font-semibold">Critical 80% Retention</span>
                    </div>
                    <p className="text-sm text-white font-medium leading-relaxed">&quot;{pack.scriptOutline.hook}&quot;</p>
                  </div>

                  {/* Intro */}
                  <div className="p-4 rounded-xl bg-[#121212] border-l-4 border-l-blue-500 border border-[#272727] space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                      Channel Welcome &amp; Value Setup
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{pack.scriptOutline.intro}</p>
                  </div>
                </div>

                {/* Main Points */}
                <div className="p-4 rounded-xl bg-[#121212] border border-[#272727] space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted block">
                    Core Talking Points &amp; Flow
                  </span>
                  <div className="space-y-2">
                    {pack.scriptOutline.mainPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#181818] border border-[#272727]">
                        <span className="h-6 w-6 rounded-full bg-[#ff0000]/10 text-[#ff0000] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-foreground leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#181818] to-[#121212] border border-emerald-500/30 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Outro &amp; Call to Action (CTA)
                  </span>
                  <p className="text-sm font-semibold text-white">&quot;{pack.scriptOutline.cta}&quot;</p>
                </div>
              </div>

              {/* Card 4: SEO Description & Timestamps (Span 2) */}
              <div className="lg:col-span-2 glass-card-surface rounded-2xl p-6 border border-[#272727] space-y-4">
                <div className="flex items-center justify-between border-b border-[#272727] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white">SEO Video Description &amp; Chapters</h3>
                      <p className="text-xs text-muted">Formatted for YouTube Studio description box</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(pack.description, "SEO Description")}
                    className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5"
                  >
                    {copiedSection === "SEO Description" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    Copy Description
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-[#121212] border border-[#272727] max-h-80 overflow-y-auto font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed">
                  {pack.description}
                </div>
              </div>

              {/* Card 5: 20 SEO Tags (Span 1) */}
              <div className="glass-card-surface rounded-2xl p-6 border border-[#272727] flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between border-b border-[#272727] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <Tags size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white">20 Viral Tags</h3>
                      <p className="text-xs text-muted">High-ranking keywords</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-64 overflow-y-auto py-1">
                  {pack.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      onClick={() => handleCopy(tag, tag)}
                      className="px-2.5 py-1 rounded-md bg-[#181818] border border-[#272727] hover:border-[#ff0000] text-xs text-muted hover:text-white transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={copyAllTags}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#181818] border border-[#272727] hover:bg-[#272727] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedSection === "All 20 Tags" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  Copy All 20 Tags (Comma-separated)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </main>
  );
}
