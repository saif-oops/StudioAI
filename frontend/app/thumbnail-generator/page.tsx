"use client";

import { useState } from "react";
import { ImageIcon, Upload, Sparkles, Download, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <Header />

        <div className="relative">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
            Thumbnail Generator
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold flex items-center gap-3">
            <ImageIcon className="text-[var(--accent)]" size={32} />
            Create <span className="text-[var(--accent)]">Click-Worthy</span> Thumbnails
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Upload your photo, add a title, and let AI create your thumbnail
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 space-y-5">
            <div>
              <label className="block mb-2 text-sm text-[var(--muted)]">Upload Your Photo</label>
              {!photo ? (
                <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-color)] hover:border-[var(--accent)]/40 transition-colors">
                  <Upload size={32} className="text-[var(--muted)]" strokeWidth={1.5} />
                  <span className="mt-2 text-sm text-[var(--muted)]">Click to upload</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              ) : (
                <div className="space-y-3">
                  <img src={photo} alt="uploaded preview" className="h-40 rounded-xl border border-[var(--border-color)] object-cover" />
                  <button onClick={() => { setPhoto(null); setPhotoBase64(null); }} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300">
                    <X size={12} /> Remove photo
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm text-[var(--muted)]">Video Title</label>
              <input
                type="text"
                placeholder="e.g. I Tried AI Tools for 30 Days"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl bg-[var(--background)] border border-[var(--border-color)] p-3 text-[var(--foreground)] outline-none focus:border-[var(--accent)]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-[var(--muted)]">Description / Style (optional)</label>
              <textarea
                placeholder="e.g. tech theme, bold colors, shocked expression"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-xl bg-[var(--background)] border border-[var(--border-color)] p-3 text-[var(--foreground)] outline-none focus:border-[var(--accent)]/50 transition-colors"
              />
            </div>

            <button
              onClick={generateThumbnail}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-display font-bold text-white hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
            >
              <Sparkles size={18} />
              {loading ? "Generating..." : "Generate Thumbnail"}
            </button>
          </div>

          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 flex items-center justify-center">
            {loading && (
              <div className="text-center">
                <Sparkles size={28} className="mx-auto text-[var(--accent)] animate-pulse" />
                <p className="mt-3 text-[var(--muted)]">Creating your thumbnail...</p>
              </div>
            )}

            {!loading && generatedImage && (
              <div className="space-y-4 text-center">
                <img src={generatedImage} alt="generated thumbnail" className="rounded-xl border border-[var(--border-color)] max-w-full" />
                <a href={generatedImage} download="thumbnail.png" className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-2 font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">
                  <Download size={16} />
                  Download
                </a>
              </div>
            )}

            {!loading && !generatedImage && (
              <div className="text-center">
                <ImageIcon size={28} className="mx-auto text-[var(--muted)]" strokeWidth={1.5} />
                <p className="mt-3 text-sm text-[var(--muted)]">Your generated thumbnail will appear here</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}