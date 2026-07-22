"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadBoxProps {
  image: string | null;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  analyzeThumbnail: () => void;
  loading?: boolean;
}

export default function UploadBox({
  image,
  handleImageUpload,
  analyzeThumbnail,
  loading = false,
}: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    // Simulate a file input change event
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const fakeEvent = {
      target: { files: dataTransfer.files },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleImageUpload(fakeEvent);
  };

  const clearImage = () => {
    if (inputRef.current) inputRef.current.value = "";
    // trigger with null-like — parent handles via a separate clear prop if needed
    const fakeEvent = {
      target: { files: null },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleImageUpload(fakeEvent);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
      className="mt-6"
    >
      <AnimatePresence mode="wait">
        {!image ? (
          <motion.label
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`drop-zone flex h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
              isDragging
                ? "drag-over"
                : "border-border-color hover:border-accent/40 hover:bg-accent-soft"
            }`}
            style={{
              background: isDragging
                ? "rgba(255,0,51,0.05)"
                : "rgba(0,0,0,0.3)",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <motion.div
              animate={isDragging ? { scale: 1.15 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-colors ${
                  isDragging
                    ? "bg-accent/15 text-accent"
                    : "bg-white/5 text-muted"
                }`}
              >
                <Upload size={26} strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground text-sm">
                  {isDragging ? "Drop it here!" : "Drag & drop your thumbnail"}
                </p>
                <p className="mt-1 text-xs text-muted">
                  or{" "}
                  <span className="text-accent font-semibold">
                    click to browse
                  </span>{" "}
                  — PNG, JPG, WEBP supported
                </p>
              </div>
            </motion.div>
          </motion.label>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card-surface rounded-2xl p-5"
          >
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* Preview */}
              <div className="relative shrink-0">
                <img
                  src={image}
                  alt="Thumbnail preview"
                  className="h-40 w-auto max-w-xs rounded-xl object-cover border border-border-color shadow-lg"
                />
                <button
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-background border border-border-color flex items-center justify-center hover:bg-red-950/40 hover:border-red-800/40 hover:text-red-400 transition-all text-muted"
                >
                  <X size={13} />
                </button>
                {/* Image badge */}
                <span className="absolute bottom-2 left-2 badge badge-accent flex items-center gap-1">
                  <ImageIcon size={10} />
                  Ready
                </span>
              </div>

              {/* Info + action */}
              <div className="flex-1 flex flex-col justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Thumbnail uploaded
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Your image is ready for AI analysis. Click the button below
                    to get your CTR score, strengths, and improvement tips.
                  </p>
                </div>
                <button
                  onClick={analyzeThumbnail}
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto"
                >
                  <Sparkles size={16} />
                  {loading ? "Analyzing..." : "Analyze Thumbnail"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
