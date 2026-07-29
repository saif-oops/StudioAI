"use client";

import { motion } from "framer-motion";
import { Lightbulb, Tags, Palette, Image as ImageIcon, FileText, Clapperboard, PenLine } from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "Thumbnail Generator",
    desc: "Upload your photo/face and let AI generate viral custom thumbnails with interactive follow-up revisions.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: Lightbulb,
    title: "Video Ideas",
    desc: "Never run out of content. Get highly viral video concepts tailored to your channel's niche.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: PenLine,
    title: "Title Generator",
    desc: "Generate highly clickable titles optimized for curiosity, emotion, and maximum CTR.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Tags,
    title: "SEO Tags",
    desc: "Discover high-volume, low-competition keywords to rank your videos higher in search.",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
  },
  {
    icon: Palette,
    title: "Thumbnail Analyzer",
    desc: "Get an AI prediction of your thumbnail's click-through rate before you even publish.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Clapperboard,
    title: "Script Writer",
    desc: "Generate full video scripts with hooks, engaging body content, and strong calls to action.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold md:text-5xl mb-4">
            Everything you need to <span className="gradient-text">grow</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Stop guessing what works. Use AI to optimize every part of your video creation process.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card-surface rounded-2xl p-6 group transition-all hover:-translate-y-1 hover:border-accent/40"
            >
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${feat.bg} ${feat.color}`}>
                <feat.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feat.title}</h3>
              <p className="text-muted leading-relaxed text-sm">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
