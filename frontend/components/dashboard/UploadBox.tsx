"use client";

import { useState } from "react";
import { Upload, Sparkles } from "lucide-react";

type UploadBoxProps = {
  image: string | null;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  analyzeThumbnail: () => void;
};

export default function UploadBox({
  image,
  handleImageUpload,
  analyzeThumbnail,
}: UploadBoxProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (!file) return;
    const fakeEvent = {
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleImageUpload(fakeEvent);
  };

  return (
    <div className="mt-8 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-8">
      <h3 className="mb-6 text-xl font-display font-semibold">Upload Thumbnail</h3>

      {!image && (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
            dragActive
              ? "border-[var(--accent)] bg-[var(--accent-soft)]"
              : "border-[var(--border-color)] hover:border-[var(--accent)]/40"
          }`}
        >
          <Upload size={40} className="text-[var(--muted)]" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-semibold">Drag & Drop your thumbnail</p>
          <p className="mt-2 text-sm text-[var(--muted)]">or click to browse</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      )}

      {image && (
        <div className="space-y-6">
          <img
            src={image}
            alt="thumbnail preview"
            className="max-w-lg rounded-xl border border-[var(--border-color)]"
          />
          <button
            onClick={analyzeThumbnail}
            className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-3 font-display font-bold text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            <Sparkles size={18} />
            Analyze Thumbnail
          </button>
        </div>
      )}
    </div>
  );
}