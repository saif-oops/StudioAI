"use client";

import { useState } from "react";
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

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <Header />

        <h1 className="text-4xl font-bold">Thumbnail Analyzer 🎨</h1>
        <p className="mt-2 text-gray-400">
          Improve your thumbnails with AI insights
        </p>

        <UploadBox
          image={image}
          handleImageUpload={handleImageUpload}
          analyzeThumbnail={analyzeThumbnail}
        />

        {loading && (
          <p className="mt-8 text-gray-400">Analyzing thumbnail...</p>
        )}

        {!loading && analyzed && <AnalysisResult analysis={analysis} />}
      </section>
    </main>
  );
}