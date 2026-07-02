"use client";

import { useState } from "react";
import { Palette, OctagonAlert, CircleCheckBig } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
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
        toast.success("Analysis Complete", {
          description: "Your thumbnail CTR insights are ready.",
          icon: <CircleCheckBig className="text-emerald-400" size={18} />
        });

        addHistoryItem({
          tool: "thumbnail-analyzer",
          input: "Uploaded thumbnail",
          output: data.analysis,
        });
      } else {
        toast.error("Analysis Failed", {
          description: "Failed to analyze thumbnail. Please try again.",
          icon: <OctagonAlert className="text-red-400" size={18} />
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        description: "An unexpected error occurred.",
        icon: <OctagonAlert className="text-red-400" size={18} />
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />

      <section className="flex-1 p-4 md:p-8">
        <div className="relative">
          <h1 className="mt-2 font-display text-4xl font-bold flex items-center gap-3">
            <Palette className="text-accent" size={32} />
            Improve Your <span className="text-accent">Click Rate</span>
          </h1>
          <p className="mt-2 text-muted">
            Upload your thumbnail and get instant AI insights
          </p>
        </div>

        <UploadBox
          image={image}
          handleImageUpload={handleImageUpload}
          analyzeThumbnail={analyzeThumbnail}
        />

        {loading && (
          <p className="mt-8 flex items-center gap-2 text-muted">
            Analyzing thumbnail...
          </p>
        )}

        {!loading && analyzed && <AnalysisResult analysis={analysis} />}
      </section>
    </main>
  );
}