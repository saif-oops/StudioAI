"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function ThumbnailGenerator() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPhoto(previewUrl);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateThumbnail = async () => {
    if (!photoBase64 || !title) {
      alert("Please upload a photo and enter a title");
      return;
    }

    setLoading(true);
    setGeneratedImage(null);

    try {
      const response = await fetch("/api/generate-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo: photoBase64, title, description }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedImage(data.image);
      } else {
        alert(data.error || "Failed to generate thumbnail");
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
        <h1 className="text-4xl font-bold">Thumbnail Generator 🖼️</h1>
        <p className="mt-2 text-gray-400">Upload your photo, add a title, and let AI create your thumbnail</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-800 p-6 space-y-5">
            <div>
              <label className="block mb-2 text-sm text-gray-400">Upload Your Photo</label>
              {!photo ? (
                <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 transition">
                  <span className="text-3xl">📤</span>
                  <span className="mt-2 text-sm text-gray-400">Click to upload</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              ) : (
                <div className="space-y-3">
                  <img src={photo} alt="uploaded preview" className="h-40 rounded-xl border border-gray-700 object-cover" />
                  <button onClick={() => { setPhoto(null); setPhotoBase64(null); }} className="text-xs text-red-400 hover:text-red-300">
                    Remove photo
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Video Title</label>
              <input type="text" placeholder="e.g. I Tried AI Tools for 30 Days" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl bg-gray-900 p-3 text-white outline-none" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Description / Style (optional)</label>
              <textarea placeholder="e.g. tech theme, bold colors, shocked expression" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-xl bg-gray-900 p-3 text-white outline-none" />
            </div>
            <button onClick={generateThumbnail} disabled={loading} className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold disabled:opacity-50">
              {loading ? "Generating..." : "Generate Thumbnail ✨"}
            </button>
          </div>
          <div className="rounded-2xl border border-gray-800 p-6 flex items-center justify-center">
            {loading && <p className="text-gray-400">Creating your thumbnail...</p>}
            {!loading && generatedImage && (
              <div className="space-y-4 text-center">
                <img src={generatedImage} alt="generated thumbnail" className="rounded-xl border border-gray-700 max-w-full" />
                <a href={generatedImage} download="thumbnail.png" className="inline-block rounded-xl bg-green-600 px-6 py-2 font-semibold hover:bg-green-700">
                  Download
                </a>
              </div>
            )}
            {!loading && !generatedImage && (
              <p className="text-gray-500 text-sm text-center">Your generated thumbnail will appear here</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}