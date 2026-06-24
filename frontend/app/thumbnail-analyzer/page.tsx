"use client";

import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import AnalysisResult from "../components/AnalysisResult";

export default function ThumbnailAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzed, setAnalyzed] = useState(false);

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

    setAnalysis({
      score: 0,
      strengths: [],
      improvements: [],
    });
  };

  const analyzeThumbnail = () => {
    const fakeAIResponse = {
      score: 84,

      strengths: [
        "High Contrast",
        "Clear Subject Focus",
        "Good Color Balance",
      ],

      improvements: [
        "Increase text size",
        "Improve background separation",
        "Add stronger visual hook",
      ],
    };

    setAnalysis(fakeAIResponse);
    setAnalyzed(true);
  };

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <Header />

        <h1 className="text-4xl font-bold">
          Thumbnail Analyzer 🎨
        </h1>

        <p className="mt-2 text-gray-400">
          Improve your thumbnails with AI insights
        </p>

        <UploadBox
          image={image}
          handleImageUpload={handleImageUpload}
          analyzeThumbnail={analyzeThumbnail}
        />

        {analyzed && (
          <AnalysisResult
            analysis={analysis}
          />
        )}
      </section>
    </main>
  );
}