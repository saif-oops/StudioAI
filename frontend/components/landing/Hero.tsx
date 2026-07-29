"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const words = ["Goes Viral", "Gets Clicked", "Stands Out", "Grows Fast"];
  const badges = ["8 AI Tools, One Studio", "Titles Scored by AI", "From Idea to Upload", "Built for Creators"];

  const [index, setIndex] = useState(0);
  const [badgeIdx, setBadgeIdx] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    const badgeInterval = setInterval(() => {
      setBadgeIdx((prev) => (prev + 1) % badges.length);
    }, 4000);
    return () => {
      clearInterval(wordInterval);
      clearInterval(badgeInterval);
    };
  }, []);

  const creatorImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80"
  ];

  const glassStyle = {
    background: "rgba(255,0,51,0.07)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    boxShadow:
      "0 0 0 1px rgba(255,0,51,0.15), 0 0 16px rgba(255,0,51,0.25), 0 0 40px rgba(255,0,51,0.1)",
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
      {/* Background Glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(255,0,51,0.15) 0%, transparent 60%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center px-6 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </span>
          <div className="relative h-5 overflow-hidden flex items-center min-w-[180px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={badgeIdx}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute text-sm font-medium text-accent"
              >
                {badges[badgeIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl font-bold leading-[1.15] md:text-7xl lg:text-[5rem] tracking-tight"
        >
          Create Content That{" "}
          <br className="hidden md:block" />
          <span className="relative inline-flex items-center justify-center mt-2 md:mt-4 rounded-2xl px-6 py-2 text-accent whitespace-nowrap min-w-[280px] md:min-w-[400px]" style={glassStyle}>
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 0.35 }}
                className="whitespace-nowrap inline-block font-display"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg text-muted/90 md:text-xl"
        >
          The all-in-one AI suite for YouTube creators. Generate viral ideas, high-CTR titles, SEO tags, and stunning thumbnails in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/dashboard" className="btn-primary text-base px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2">
            <Sparkles size={18} />
            Start Creating Free
          </Link>
          <Link href="#features" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2 group">
            See Features <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-4 border-t border-border-color pt-10 w-full max-w-3xl mx-auto"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-muted">Trusted by creators worldwide</p>
          <div className="flex items-center gap-10 opacity-50 grayscale">
            {/* Logos placeholders */}
            <span className="font-display font-bold text-xl">YouTube</span>
            <span className="font-display font-bold text-xl">Twitch</span>
            <span className="font-display font-bold text-xl">TikTok</span>
            <span className="font-display font-bold text-xl">Instagram</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
