"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { removeBackground } from "@imgly/background-removal";
import {
  Image as ImageIcon, Upload, Sparkles, Trash2, Download,
  OctagonAlert, CircleCheckBig, RefreshCw, Eye, X, Tv, Smartphone, CheckCircle2
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { toast } from "sonner";

const mockCompetitors = [
  {
    title: "I Spent $1,000,000 On AI Coding Robots!",
    creator: "MrBeast",
    views: "14M views",
    time: "1 day ago",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    thumb: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    duration: "14:20",
    verified: true,
  },
  {
    title: "The Uncomfortable Truth About AI in 2026...",
    creator: "Marques Brownlee",
    views: "3.2M views",
    time: "3 days ago",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    thumb: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    duration: "18:05",
    verified: true,
  },
  {
    title: "How I Manage 10 Businesses With One AI Agent",
    creator: "Ali Abdaal",
    views: "890K views",
    time: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80",
    thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    duration: "22:11",
    verified: true,
  },
  {
    title: "10 AI Coding Tools Replacing Junior Developers",
    creator: "Fireship",
    views: "1.5M views",
    time: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=80",
    thumb: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    duration: "08:42",
    verified: true,
  },
  {
    title: "Why You Will Lose Your Job in 2026 (And How To Survive)",
    creator: "Alex Hormozi",
    views: "2.1M views",
    time: "5 days ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    duration: "31:15",
    verified: true,
  }
];

const stylePresets = [
  { label: "Bold & Bright", value: "bold_bright", desc: "High contrast, vivid colors", color: "#f97316" },
  { label: "Dark Cinematic", value: "dark_cinematic", desc: "Moody, dramatic tones", color: "#818cf8" },
  { label: "Minimal Clean", value: "minimal_clean", desc: "Simple, elegant, modern", color: "#22c55e" },
  { label: "Gaming", value: "gaming", desc: "Intense, neon, action", color: "#ff0033" },
  { label: "Viral", value: "viral", desc: "Emoji, shock, curiosity", color: "#ffd600" },
];

const aspectRatios = [
  { label: "16:9", desc: "1280x720 HD", value: "16:9 (1280x720)" },
  { label: "1:1", desc: "1080x1080", value: "1:1 (1080x1080)" },
  { label: "9:16", desc: "1080x1920", value: "9:16 (1080x1920)" },
];

export default function ThumbnailGenerator() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("bold_bright");
  const [aspectRatio, setAspectRatio] = useState("16:9 (1280x720)");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [refinePrompt, setRefinePrompt] = useState("");
  const [showFeedPreview, setShowFeedPreview] = useState(false);
  const [feedMode, setFeedMode] = useState<"desktop" | "mobile">("desktop");
  const compositeRef = useRef<HTMLDivElement>(null);
  const [extractedPhoto, setExtractedPhoto] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  useEffect(() => {
    const savedPrompt = localStorage.getItem("saflix_thumbnail_prompt");
    const savedTitle = localStorage.getItem("saflix_thumbnail_title");
    if (savedPrompt) {
      setDescription(savedPrompt);
      localStorage.removeItem("saflix_thumbnail_prompt");
    }
    if (savedTitle) {
      setTitle(savedTitle);
      localStorage.removeItem("saflix_thumbnail_title");
    }
  }, []);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoBase64(reader.result as string);
    reader.readAsDataURL(file);

    setIsExtracting(true);
    toast("Extracting Subject...", { description: "Removing background from your photo..." });
    try {
      const blob = await removeBackground(file);
      const extractedUrl = URL.createObjectURL(blob);
      setExtractedPhoto(extractedUrl);
      toast.success("Subject Extracted!");
    } catch (error) {
      console.error("BG removal failed", error);
      toast.error("Background removal failed", { description: "Using original photo." });
      setExtractedPhoto(url);
    }
    setIsExtracting(false);
  };

  const generateThumbnail = async (isRefinement = false) => {
    if (!photoBase64 || !title.trim()) {
      toast.error("Input Required", { description: "Please upload a photo and enter a title.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      return;
    }
    if (isRefinement && !refinePrompt.trim()) {
      toast.error("Prompt Required", { description: "Please enter what you want to change.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      return;
    }
    setLoading(true);
    const descToSend = isRefinement
      ? `${description}. IMPORTANT REFINEMENT / MODIFICATION INSTRUCTIONS: ${refinePrompt}`
      : description;

    if (!isRefinement) {
      setGeneratedImage(null);
    }

    try {
      const res = await fetch("/api/generate-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo: photoBase64, title, description: descToSend, style: selectedStyle, aspectRatio }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedImage(data.image);
        setHistory((prev) => [data.image, ...prev].slice(0, 3));
        if (isRefinement) setRefinePrompt("");
        toast.success(isRefinement ? "Thumbnail Refined!" : "Thumbnail Generated!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
      } else {
        toast.error("Generation Failed", { description: data.error || "Please try again.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const downloadImage1280x720 = async () => {
    if (!generatedImage || !compositeRef.current) return;
    try {
      const node = compositeRef.current;
      const scale = 1280 / node.offsetWidth;
      const dataUrl = await toPng(node, {
        pixelRatio: scale,
        quality: 0.95,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "saflix-youtube-thumbnail-1280x720.png";
      a.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      toast.error("Failed to download image");
    }
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

            <button onClick={() => generateThumbnail(false)} disabled={loading} className="btn-primary w-full">
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
                  <div className="relative w-full aspect-video rounded-xl border border-border-color shadow-lg overflow-hidden bg-black group">
                    <div 
                      ref={compositeRef} 
                      className="absolute inset-0 w-full h-full bg-cover bg-center flex items-center" 
                      style={{ backgroundImage: `url(${generatedImage})` }}
                    >
                      {/* Middle Layer: Extracted Subject */}
                      {extractedPhoto && (
                        <div className="absolute right-0 bottom-0 h-[90%] w-[55%] flex justify-end items-end pointer-events-none">
                          <img src={extractedPhoto} alt="Subject" className="object-contain object-bottom h-full max-w-full drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]" />
                        </div>
                      )}
                      
                      {/* Top Layer: Typography */}
                      <div className="w-[55%] flex flex-col justify-center pl-[6%] z-10 relative pointer-events-none">
                         {title && title.split(" ").map((word, i) => (
                           <div key={i} className="w-fit bg-[#ffeb3b] text-black font-black uppercase text-[4.5vw] sm:text-[3.5vw] md:text-[2.5vw] lg:text-[2.5vw] xl:text-[2.2vw] leading-none tracking-tighter px-[4%] py-[2%] mb-[2%] transform -rotate-3 shadow-[min(0.5vw,8px)_min(0.5vw,8px)_0px_0px_rgba(0,0,0,1)] border-[min(0.2vw,4px)] border-black">
                             {word}
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={downloadImage1280x720}
                      className="btn-primary text-sm px-5 py-2.5 flex items-center gap-1.5"
                    >
                      <Download size={14} />
                      Download (1280x720)
                    </button>
                    <button
                      onClick={() => setShowFeedPreview(true)}
                      className="btn-secondary text-sm px-4 py-2.5 flex items-center gap-1.5 bg-[#ff0000]/10 border-[#ff0000]/30 text-[#ff0000] hover:bg-[#ff0000]/20 font-semibold shadow-lg"
                    >
                      <Eye size={14} />
                      Preview in YouTube Feed
                    </button>
                    <button onClick={() => generateThumbnail(false)} disabled={loading} className="btn-secondary text-sm px-4 py-2.5 flex items-center gap-1.5">
                      <RefreshCw size={14} />
                      Regenerate
                    </button>
                  </div>
                  {/* AI Refinement Box */}
                  <div className="mt-4 pt-4 border-t border-border-color text-left">
                    <label className="text-xs text-muted font-semibold mb-2 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-accent" />
                      Refine with AI (Interactive Revisions)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={refinePrompt}
                        onChange={(e) => setRefinePrompt(e.target.value)}
                        placeholder="e.g. Make background darker, add neon glow around text..."
                        className="input-field flex-1 text-xs py-2"
                        onKeyDown={(e) => e.key === "Enter" && generateThumbnail(true)}
                      />
                      <button
                        onClick={() => generateThumbnail(true)}
                        disabled={loading || !refinePrompt.trim()}
                        className="btn-primary text-xs px-4 py-2 whitespace-nowrap"
                      >
                        Refine
                      </button>
                    </div>
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

      {/* YouTube Feed A/B Test Simulator Modal */}
      <AnimatePresence>
        {showFeedPreview && generatedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f0f0f] border border-[#272727] rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6 my-8"
            >
              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#272727] pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold flex items-center gap-2">
                    <span className="bg-[#ff0000] text-white text-xs px-2 py-0.5 rounded font-black tracking-wider">LIVE</span>
                    YouTube Home Feed Simulator
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    Test how your 1280x720 thumbnail stands out against top creators in YouTube's Dark Theme before publishing!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="flex bg-[#272727] p-1 rounded-xl">
                    <button
                      onClick={() => setFeedMode("desktop")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        feedMode === "desktop" ? "bg-[#ff0000] text-white" : "text-muted hover:text-white"
                      }`}
                    >
                      <Tv size={14} /> Desktop Grid
                    </button>
                    <button
                      onClick={() => setFeedMode("mobile")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        feedMode === "mobile" ? "bg-[#ff0000] text-white" : "text-muted hover:text-white"
                      }`}
                    >
                      <Smartphone size={14} /> Mobile Feed
                    </button>
                  </div>

                  <button
                    onClick={() => setShowFeedPreview(false)}
                    className="p-2 bg-[#272727] hover:bg-[#ff0000] text-white rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Mock YouTube Grid */}
              <div className={
                feedMode === "desktop"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                  : "max-w-md mx-auto space-y-6"
              }>
                {/* SLOT 1: YOUR VIDEO */}
                <div className="group cursor-pointer flex flex-col space-y-3 bg-[#181818]/80 p-3 rounded-2xl border-2 border-[#ff0000] shadow-[0_0_20px_rgba(255,0,0,0.2)] relative">
                  <div className="absolute -top-3 -left-2 bg-[#ff0000] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-lg z-10 flex items-center gap-1 animate-pulse">
                    <CheckCircle2 size={12} /> Your Video (A/B Test)
                  </div>
                  
                  {/* Thumb Box */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
                    <img src={generatedImage} alt="Your Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[11px] font-bold px-1.5 py-0.5 rounded">
                      12:45
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="flex gap-3 items-start pt-1">
                    <div className="w-9 h-9 rounded-full bg-[#ff0000] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow">
                      S
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      <h4 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-[#ff0000] transition-colors">
                        {title || "AI Thumbnail That Will Get You 1,000,000 Views Guaranteed"}
                      </h4>
                      <div className="text-xs text-muted flex items-center gap-1">
                        <span>Saflix AI Studio</span>
                        <CheckCircle2 size={12} className="text-muted shrink-0" />
                      </div>
                      <p className="text-xs text-muted">2.4M views • 2 hours ago</p>
                    </div>
                  </div>
                </div>

                {/* COMPETITORS */}
                {mockCompetitors.map((comp, idx) => (
                  <div key={idx} className="group cursor-pointer flex flex-col space-y-3 p-3 rounded-2xl hover:bg-[#181818]/40 transition-colors">
                    {/* Thumb Box */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                      <img src={comp.thumb} alt={comp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[11px] font-bold px-1.5 py-0.5 rounded">
                        {comp.duration}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex gap-3 items-start pt-1">
                      <img src={comp.avatar} alt={comp.creator} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <div className="space-y-1 overflow-hidden">
                        <h4 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-white transition-colors">
                          {comp.title}
                        </h4>
                        <div className="text-xs text-muted flex items-center gap-1">
                          <span>{comp.creator}</span>
                          {comp.verified && <CheckCircle2 size={12} className="text-muted shrink-0" />}
                        </div>
                        <p className="text-xs text-muted">{comp.views} • {comp.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
