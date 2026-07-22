"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, OctagonAlert, CircleCheckBig, RefreshCw, Share2 } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import UploadBox from "@/components/dashboard/UploadBox";
import AnalysisResult from "@/components/dashboard/AnalysisResult";
import { addHistoryItem } from "@/lib/history";
import { toast } from "sonner";

export default function ThumbnailAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState({
    score: 0,
    strengths: [] as string[],
    improvements: [] as string[],
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      // Clear
      setImage(null);
      setImageBase64(null);
      setAnalyzed(false);
      setAnalysis({ score: 0, strengths: [], improvements: [] });
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setAnalyzed(false);
    setAnalysis({ score: 0, strengths: [], improvements: [] });
    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  const analyzeThumbnail = async () => {
    if (!imageBase64) return;
    setLoading(true);
    try {
      const res = await fetch("/api/analyze-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      });
      const data = await res.json();
      if (data.success) {
        setAnalysis(data.analysis);
        setAnalyzed(true);
        toast.success("Analysis Complete", {
          description: "Your CTR insights are ready.",
          icon: <CircleCheckBig className="text-emerald-400" size={18} />,
        });
        addHistoryItem({ tool: "thumbnail-analyzer", input: "Uploaded thumbnail", output: data.analysis });
      } else {
        toast.error("Analysis Failed", { description: "Please try again.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const shareResults = () => {
    if (!analyzed) return;
    const text = `My YouTube thumbnail scored ${analysis.score}/100 on CTR!\n\nStrengths:\n${analysis.strengths.map((s) => `✅ ${s}`).join("\n")}\n\nImprovements:\n${analysis.improvements.map((i) => `⬆️ ${i}`).join("\n")}\n\nAnalyzed with StudioAI`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!", { description: "Share them anywhere." });
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-4xl">
        <PageHeader
          icon={Palette}
          iconColor="text-green-400"
          iconBg="bg-green-400/10"
          title="Improve Your"
          titleHighlight="Click Rate"
          subtitle="Upload your thumbnail and get instant AI analysis — CTR score, what's working, and what to fix."
          badge="Vision AI"
          badgeColor="success"
        >
          {analyzed && (
            <button onClick={shareResults} className="btn-secondary text-xs px-3 py-2 rounded-lg">
              <Share2 size={13} />
              Share Results
            </button>
          )}
          {analyzed && (
            <button onClick={analyzeThumbnail} disabled={loading} className="btn-secondary text-xs px-3 py-2 rounded-lg">
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              Re-analyze
            </button>
          )}
        </PageHeader>

        <UploadBox
          image={image}
          handleImageUpload={handleImageUpload}
          analyzeThumbnail={analyzeThumbnail}
          loading={loading}
        />

        {/* Loading state */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-4"
          >
            <p className="flex items-center gap-2 text-sm text-muted">
              <Palette size={14} className="text-accent animate-pulse" />
              AI is analyzing your thumbnail...
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-2xl skeleton" />
              ))}
            </div>
          </motion.div>
        )}

        {!loading && analyzed && <AnalysisResult analysis={analysis} />}
      </section>
    </main>
  );
}
