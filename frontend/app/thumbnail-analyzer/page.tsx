"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import AnalysisResult from "../components/AnalysisResult";
import { addHistoryItem } from "../lib/history";

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
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setAnalyzed(false);
    setAnalysis({ score: 0, strengths: [], improvements: [] });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const analyzeThumbnail = async () => {
    if (!imageBase64) return;
    setLoading(true);

    try {
      const response = await fetch("/api/analyze-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.analysis);
        setAnalyzed(true);

        addHistoryItem({
          tool: "thumbnail-analyzer",
          input: "Uploaded thumbnail",
          output: data.analysis,
        });
      } else {
        alert("Failed to analyze thumbnail");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <Header />

        <div className="relative">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
            Thumbnail Analyzer
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold flex items-center gap-3">
            <Palette className="text-[var(--accent)]" size={32} />
            Improve Your <span className="text-[var(--accent)]">Click Rate</span>
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Upload your thumbnail and get instant AI insights
          </p>
        </div>

        <UploadBox
          image={image}
          handleImageUpload={handleImageUpload}
          analyzeThumbnail={analyzeThumbnail}
        />

        {loading && (
          <p className="mt-8 flex items-center gap-2 text-[var(--muted)]">
            Analyzing thumbnail...
          </p>
        )}

        {!loading && analyzed && <AnalysisResult analysis={analysis} />}
      </section>
    </main>
  );
}