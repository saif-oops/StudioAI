"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon, Upload, Sparkles, Trash2, Download,
  OctagonAlert, CircleCheckBig, RefreshCw,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { toast } from "sonner";

const stylePresets = [
  { label: "Bold & Bright", value: "bold_bright", desc: "High contrast, vivid colors", color: "#f97316" },
  { label: "Dark Cinematic", value: "dark_cinematic", desc: "Moody, dramatic tones", color: "#818cf8" },
  { label: "Minimal Clean", value: "minimal_clean", desc: "Simple, elegant, modern", color: "#22c55e" },
  { label: "Gaming", value: "gaming", desc: "Intense, neon, action", color: "#ff0033" },
  { label: "Viral", value: "viral", desc: "Emoji, shock, curiosity", color: "#ffd600" },
];

const aspectRatios = [
  { label: "16:9", desc: "YouTube", value: "16:9" },
  { label: "1:1", desc: "Shorts", value: "1:1" },
  { label: "4:5", desc: "Stories", value: "4:5" },
];

export default function ThumbnailGenerator() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("bold_bright");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onloadend = () => setPhotoBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  const generateThumbnail = async () => {
    if (!photoBase64 || !title.trim()) {
      toast.error("Input Required", { description: "Please upload a photo and enter a title.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      return;
    }
    setLoading(true);
    setGeneratedImage(null);
    try {
      const res = await fetch("/api/generate-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo: photoBase64, title, description, style: selectedStyle, aspectRatio }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedImage(data.image);
        setHistory((prev) => [data.image, ...prev].slice(0, 3));
        toast.success("Thumbnail Generated!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
      } else {
        toast.error("Generation Failed", { description: data.error || "Please try again.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-5xl">
        <PageHeader
          icon={ImageIcon}
          iconColor="text-purple-400"
          iconBg="bg-purple-400/10"
          title="Thumbnail"
          titleHighlight="Generator"
          subtitle="Upload your photo, choose a style, and let AI create a click-worthy YouTube thumbnail."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Left: Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            className="glass-card-surface rounded-2xl p-5 space-y-5"
          >
            {/* Photo upload */}
            <div>
              <label className="text-xs text-muted font-medium block mb-2">Your Photo</label>
              {!photo ? (
                <label className="drop-zone flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border-color hover:border-accent/40 hover:bg-accent-soft transition-all">
                  <Upload size={24} className="text-muted mb-2 animate-bounce" />
                  <span className="text-xs text-muted">Click to upload photo</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              ) : (
                <div className="space-y-2">
                  <div className="relative inline-block">
                    <img src={photo} alt="preview" className="h-32 rounded-xl border border-border-color object-cover" />
                    <button
                      onClick={() => { setPhoto(null); setPhotoBase64(null); }}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border border-border-color flex items-center justify-center text-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="text-xs text-muted font-medium block mb-1.5">Video Title</label>
              <input
                type="text"
                placeholder="e.g. I Tried AI Tools for 30 Days..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-base"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs text-muted font-medium block mb-1.5">
                Style Hint <span className="text-muted/50">(optional)</span>
              </label>
              <textarea
                placeholder="e.g. tech theme, bold text, shocked expression, dark background..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="input-base resize-none"
              />
            </div>

            {/* Style Presets */}
            <div>
              <p className="text-xs text-muted font-medium mb-2">Style Preset</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {stylePresets.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedStyle(s.value)}
                    className={`rounded-xl border p-2.5 text-left transition-all ${
                      selectedStyle === s.value
                        ? "border-accent/40 bg-accent/6"
                        : "border-border-color hover:border-border-hover"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                      <span className="text-xs font-semibold text-foreground truncate">{s.label}</span>
                    </div>
                    <p className="text-[10px] text-muted truncate">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div>
              <p className="text-xs text-muted font-medium mb-2">Aspect Ratio</p>
              <div className="flex gap-2">
                {aspectRatios.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setAspectRatio(r.value)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-center transition-all ${
                      aspectRatio === r.value
                        ? "border-accent/40 bg-accent/8 text-accent"
                        : "border-border-color text-muted hover:border-border-hover"
                    }`}
                  >
                    <p className="text-xs font-bold">{r.label}</p>
                    <p className="text-[10px] text-muted mt-0.5">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={generateThumbnail} disabled={loading} className="btn-primary w-full">
              <Sparkles size={16} />
              {loading ? "Generating..." : "Generate Thumbnail"}
            </button>
          </motion.div>

          {/* Right: Preview */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Generated preview */}
            <div className="glass-card-surface rounded-2xl p-5 min-h-56 flex items-center justify-center">
              {loading && (
                <div className="text-center">
                  <Sparkles size={28} className="text-accent animate-pulse mx-auto mb-3" />
                  <p className="text-sm text-muted animate-pulse">Creating your thumbnail...</p>
                  <div className="mt-4 h-40 w-full rounded-xl skeleton" />
                </div>
              )}
              {!loading && generatedImage && (
                <div className="w-full space-y-4 text-center">
                  <img src={generatedImage} alt="Generated thumbnail" className="rounded-xl border border-border-color w-full shadow-lg" />
                  <div className="flex gap-2 justify-center">
                    <a
                      href={generatedImage}
                      download="thumbnail.png"
                      className="btn-primary text-sm px-5 py-2.5"
                    >
                      <Download size={14} />
                      Download
                    </a>
                    <button onClick={generateThumbnail} disabled={loading} className="btn-secondary text-sm px-4 py-2.5">
                      <RefreshCw size={14} />
                      Regenerate
                    </button>
                  </div>
                </div>
              )}
              {!loading && !generatedImage && (
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <ImageIcon size={28} className="text-purple-400" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Preview will appear here</p>
                  <p className="text-xs text-muted mt-1">Fill in the details and generate</p>
                </div>
              )}
            </div>

            {/* Generation history */}
            {history.length > 0 && (
              <div className="glass-card-surface rounded-2xl p-4">
                <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-3">Recent Generations</p>
                <div className="flex gap-3">
                  {history.map((img, i) => (
                    <button key={i} onClick={() => setGeneratedImage(img)} className="relative group">
                      <img src={img} alt={`Generation ${i + 1}`} className="h-16 w-24 rounded-lg object-cover border border-border-color group-hover:border-accent/40 transition-all" />
                      {i === 0 && <span className="absolute -top-1 -right-1 badge badge-accent text-[9px] px-1.5 py-0.5">Latest</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
