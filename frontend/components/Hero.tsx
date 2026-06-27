"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";

export default function Hero() {
  const words = ["Get Watched", "Go Viral", "Get Clicked", "Stand Out"];
  const badges = ["6 AI Tools, One Studio", "Titles Scored by AI", "From Idea to Upload", "Built for Creators"];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const [badgeIndex, setBadgeIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [typing, setTyping] = useState(true);

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

  // Top badge typewriter effect
  useEffect(() => {
    const currentWord = badges[badgeIndex];
    let charIndex = 0;
    let timeout: NodeJS.Timeout;

    if (typing) {
      const typeChar = () => {
        if (charIndex <= currentWord.length) {
          setTypedText(currentWord.slice(0, charIndex));
          charIndex++;
          timeout = setTimeout(typeChar, 50);
        } else {
          timeout = setTimeout(() => setTyping(false), 1800);
        }
      };
      typeChar();
    } else {
      const deleteChar = () => {
        if (charIndex <= currentWord.length) {
          setTypedText(currentWord.slice(0, currentWord.length - charIndex));
          charIndex++;
          timeout = setTimeout(deleteChar, 25);
        } else {
          setBadgeIndex((prev) => (prev + 1) % badges.length);
          setTyping(true);
        }
      };
      deleteChar();
    }

    return () => clearTimeout(timeout);
  }, [typing, badgeIndex]);

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

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 animated-glow"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,0,51,0.35) 0%, rgba(255,40,20,0.15) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium min-w-[260px] justify-center"
          style={glassStyle}
        >
          <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-bold text-white shrink-0">
            New
          </span>
          <span className="inline-block whitespace-nowrap">
            {typedText}
            <span className="inline-block w-[2px] h-4 bg-[var(--accent)] ml-0.5 align-middle animate-pulse" />
          </span>
        </div>

        <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--accent)] uppercase">
          Generate. Analyze. Go Viral.
        </p>

        <h1 className="mt-5 font-display text-5xl font-bold leading-[1.1] md:text-7xl">
          Create Videos That{" "}
          <span className="inline-block rounded-md px-3 py-1 text-[var(--accent)]" style={glassStyle}>
            <span style={transitionStyle(12, 6)} className="inline-block">
              {words[index]}
            </span>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
          The all-in-one AI studio for YouTube creators. Generate titles, analyze thumbnails, write scripts, and grow faster — all in one place.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-9 w-9 -ml-2 first:ml-0 flex items-center justify-center rounded-full border-2 border-[var(--background)] bg-[var(--surface)]"
              >
                <User size={16} className="text-[var(--muted)]" strokeWidth={2} />
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--muted)]">
            <span className="font-bold text-[var(--accent)]">500+</span> creators already growing with Saflix
          </p>
        </div>

        <div className="mt-10 flex gap-4">
          <a href="/dashboard" className="rounded-xl bg-[var(--accent)] px-8 py-4 font-display font-bold text-white hover:bg-[var(--accent-hover)] transition-colors">
            Start Free →
          </a>
          <a href="#how-it-works" className="rounded-xl border border-[var(--border-color)] px-8 py-4 font-medium hover:bg-[var(--surface)] transition-colors">
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}