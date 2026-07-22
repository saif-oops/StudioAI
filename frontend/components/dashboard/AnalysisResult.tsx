"use client";

import { } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, Rocket, Zap, Check, TrendingUp } from "lucide-react";

type AnalysisResultProps = {
  analysis: {
    score: number;
    strengths: string[];
    improvements: string[];
  };
};

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;

  const color =
    score >= 80
      ? "#22c55e"
      : score >= 60
      ? "#ffd600"
      : "#ff0033";

  const label =
    score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-36 w-36">
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 128 128"
          fill="none"
        >
          {/* Track */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          {/* Fill */}
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
            style={{
              filter: `drop-shadow(0 0 6px ${color}80)`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.p
            className="font-display text-4xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{ color }}
          >
            {score}
          </motion.p>
          <p className="text-xs text-muted font-medium">/100</p>
        </div>
      </div>
      <span
        className="badge text-xs px-3 py-1 rounded-full font-semibold"
        style={{
          background: `${color}15`,
          color,
          border: `1px solid ${color}30`,
        }}
      >
        <TrendingUp size={11} />
        {label}
      </span>
    </div>
  );
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.45 } },
  };

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">AI Analysis Result</h2>
        <span className="badge badge-accent">
          <Sparkles size={11} />
          AI Powered
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {/* Score Card */}
        <motion.div
          className="glass-card-surface rounded-2xl p-6 flex flex-col items-center justify-center gradient-border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <p className="text-xs text-muted uppercase tracking-widest font-semibold mb-4">
            CTR Score
          </p>
          <ScoreRing score={analysis.score} />
        </motion.div>

        {/* Strengths */}
        <motion.div
          className="glass-card-surface rounded-2xl p-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-green-500/10">
              <Rocket size={14} className="text-green-400" />
            </span>
            Strengths
          </h3>
          <motion.div
            className="space-y-2.5"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {analysis.strengths.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2.5 rounded-xl bg-green-500/5 border border-green-500/10 p-3 text-sm"
              >
                <Check
                  size={14}
                  className="text-green-400 shrink-0 mt-0.5"
                />
                <span className="text-foreground/80 leading-snug">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Improvements */}
        <motion.div
          className="glass-card-surface rounded-2xl p-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-yellow-500/10">
              <Zap size={14} className="text-highlight" />
            </span>
            Improvements
          </h3>
          <motion.div
            className="space-y-2.5"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {analysis.improvements.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/10 p-3 text-sm"
              >
                <span className="text-highlight shrink-0 font-bold leading-snug mt-0.5">
                  ↑
                </span>
                <span className="text-foreground/80 leading-snug">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
