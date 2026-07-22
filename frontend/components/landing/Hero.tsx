"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const words = ["Get Watched", "Goes Viral", "Get Clicked", "Stand Out"];
  const badges = ["6 AI Tools, One Studio", "Titles Scored by AI", "From Idea to Upload", "Built for Creators"];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [badgeIdx, setBadgeIdx] = useState(0);

  // Bottom word rotation (unchanged behavior)
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeIdx((prev) => (prev + 1) % badges.length);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const transitionStyle = (offset: number, blurAmount: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1) translateY(0px)" : `scale(0.94) translateY(${offset}px)`,
    filter: visible ? "blur(0px)" : `blur(${blurAmount}px)`,
    transition:
      "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
  });

  const glassStyle = {
    background: "rgba(255,0,51,0.07)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    boxShadow:
      "0 0 0 1px rgba(255,0,51,0.15), 0 0 16px rgba(255,0,51,0.25), 0 0 40px rgba(255,0,51,0.1)",
  };

  const creatorImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80"
  ];

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 animated-glow"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,0,51,0.35) 0%, rgba(255,40,20,0.15) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <div
          className="mb-6 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium border border-accent/25 bg-accent/5 backdrop-blur-md shadow-[0_0_12px_rgba(255,0,51,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider scale-95 origin-center shrink-0">
            New
          </span>
          <span className="h-3 w-px bg-accent/20" />
          <div className="relative h-5 overflow-hidden flex items-center justify-start min-w-[155px] md:min-w-[170px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={badgeIdx}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute text-xs text-foreground/90 font-medium whitespace-nowrap"
              >
                {badges[badgeIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <h1 className="mt-5 font-display text-5xl font-bold leading-[1.1] md:text-7xl">
          Create Videos That{" "}
          <span className="inline-block rounded-md px-3 py-1 text-accent" style={glassStyle}>
            <span style={transitionStyle(12, 6)} className="inline-block">
              {words[index]}
            </span>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted">
          The all-in-one AI studio for YouTube creators. Generate titles, analyze thumbnails, write scripts, and grow faster — all in one place.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex pl-2">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://images.unsplash.com/photo-${
                  i === 1 ? "1534528741775-53994a69daeb" :
                  i === 2 ? "1507003211169-0a1dd7228f2d" :
                  i === 3 ? "1494790108377-be9c29b29330" :
                  "1500648767791-00dcc994a43e"
                }?auto=format&fit=crop&w=120&h=120&q=80`}
                alt={`Creator ${i + 1}`}
                className="h-9 w-9 -ml-2 first:ml-0 rounded-full border-2 border-background object-cover bg-surface"
              />
            ))}
          </div>
          <p className="text-sm text-muted text-center sm:text-left">
            <span className="font-bold text-accent">500+</span> creators already growing with StudioAI
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <a
            href="/dashboard"
            className="rounded-xl bg-accent px-8 py-4 font-display font-bold text-white hover:bg-accent-hover transition-colors text-center whitespace-nowrap flex items-center justify-center gap-1"
          >
            Start Free <span>→</span>
          </a>
          <a
            href="#how-it-works"
            className="rounded-xl border border-border-color px-8 py-4 font-medium hover:bg-surface transition-colors text-center whitespace-nowrap flex items-center justify-center"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
