"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  PenLine, Palette, Clapperboard, BarChart3, TrendingUp,
  Zap, Sparkles, ArrowRight, FileText, Image as ImageIcon,
  Clock, History,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import SpotlightCard from "@/components/bits/SpotlightCard";
import { getHistory, HistoryItem } from "@/lib/history";
import { useAuth } from "@/components/AuthProvider";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { RAZORPAY_PRO_PAYMENT_URL } from "@/lib/constants";

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.45 } },
};

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
}

const toolIconMap: Record<string, React.ElementType> = {
  "title-generator": PenLine,
  "thumbnail-analyzer": Palette,
  "thumbnail-generator": ImageIcon,
  "description-generator": FileText,
  "script-generator": Clapperboard,
};
const toolColorMap: Record<string, string> = {
  "title-generator": "text-blue-400",
  "thumbnail-analyzer": "text-green-400",
  "thumbnail-generator": "text-purple-400",
  "description-generator": "text-orange-400",
  "script-generator": "text-red-400",
};

export default function Dashboard() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const { user } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHistory(getHistory());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!user) return;
    const userRef = ref(db, `users/${user.uid}`);
    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists() && snapshot.val()?.credits !== undefined) {
          setCredits(snapshot.val().credits);
        } else {
          setCredits(150);
        }
      },
      () => setCredits(150)
    );
    return () => unsubscribe();
  }, [user]);

  const totalGenerations = history.length;

  const stats = [
    { label: "Total Generations", value: totalGenerations, suffix: "", icon: BarChart3, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Average CTR", value: 84, suffix: "%", icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "AI Credits Left", value: credits !== null ? credits : 150, suffix: " / 150", icon: Zap, color: "text-accent", bg: "bg-accent/10" },
  ];

  const actions = [
    { name: "Generate Title", desc: "High CTR YouTube titles", path: "/title-generator", icon: PenLine, color: "text-blue-400", bg: "bg-blue-500/10", glow: "rgba(59,130,246,0.12)" },
    { name: "Analyze Thumbnail", desc: "Get AI feedback & score", path: "/thumbnail-analyzer", icon: Palette, color: "text-green-400", bg: "bg-green-500/10", glow: "rgba(16,185,129,0.12)" },
    { name: "Write Script", desc: "Hook + full outline", path: "/script-generator", icon: Clapperboard, color: "text-red-400", bg: "bg-red-500/10", glow: "rgba(239,68,68,0.12)" },
    { name: "Write Description", desc: "SEO-friendly + tags", path: "/description-generator", icon: FileText, color: "text-orange-400", bg: "bg-orange-500/10", glow: "rgba(249,115,22,0.12)" },
    { name: "Generate Thumbnail", desc: "AI-generated artwork", path: "/thumbnail-generator", icon: ImageIcon, color: "text-purple-400", bg: "bg-purple-500/10", glow: "rgba(168,85,247,0.12)" },
    { name: "View Analytics", desc: "Usage & performance", path: "/analytics", icon: BarChart3, color: "text-highlight", bg: "bg-yellow-500/10", glow: "rgba(234,179,8,0.12)" },
  ];

  const recentHistory = history.slice(0, 5);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />

      <section className="flex-1 p-4 md:p-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted uppercase tracking-widest font-semibold mb-1">
                Welcome back 👋
              </p>
              <h1 className="font-display text-3xl font-bold">
                Your <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="mt-1 text-sm text-muted">
                {totalGenerations > 0
                  ? `You've made ${totalGenerations} generation${totalGenerations > 1 ? "s" : ""} so far. Keep going!`
                  : "Start generating content to see your stats here."}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 badge badge-accent">
              <Sparkles size={12} className="animate-pulse" />
              AI Ready
            </div>
          </div>
          <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-border-color to-transparent" />
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-3"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={item}>
                <SpotlightCard className="glass-card-surface rounded-2xl p-5 hover:border-accent/30 transition-all group">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted font-medium">{stat.label}</p>
                      <p className="mt-3 font-display text-3xl font-bold">
                        <AnimatedNumber value={stat.value} />
                        <span className="text-accent text-lg">{stat.suffix}</span>
                      </p>
                    </div>
                    <div className={`h-9 w-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={stat.color} size={18} />
                    </div>
                  </div>
                  {stat.label === "AI Credits Left" && (
                    <div className="mt-3 space-y-2">
                      <div className="h-1.5 w-full rounded-full bg-border-color overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${credits !== null ? Math.min((credits / 150) * 100, 100) : 100}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                        />
                      </div>
                      <div className="flex justify-between items-center pt-0.5">
                        <span className="text-[10px] text-muted font-medium">Free Plan</span>
                        <a
                          href={RAZORPAY_PRO_PAYMENT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-semibold text-accent hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          Upgrade Plan ⚡
                        </a>
                      </div>
                    </div>
                  )}
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold">Quick Actions</h2>
            <span className="text-xs text-muted">{actions.length} tools available</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {actions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.path}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + idx * 0.05, duration: 0.4, ease: "easeOut" }}
                >
                  <Link href={action.path} className="block group">
                    <SpotlightCard
                      spotlightColor={action.glow}
                      className="flex items-center gap-3.5 rounded-xl border border-border-color bg-surface/50 p-4 transition-all duration-200 hover:border-accent/30 hover:bg-accent-soft hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className={`h-10 w-10 shrink-0 rounded-xl ${action.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <Icon className={action.color} size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground">{action.name}</p>
                        <p className="text-xs text-muted mt-0.5 truncate">{action.desc}</p>
                      </div>
                      <ArrowRight size={14} className="text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                    </SpotlightCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent History */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <History size={18} className="text-muted" />
              Recent Activity
            </h2>
            <Link href="/history" className="text-xs text-accent hover:underline flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>

          {recentHistory.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border-color py-10 text-center">
              <Clock size={28} className="text-muted/40 mx-auto mb-3" />
              <p className="text-sm text-muted">No activity yet — generate something!</p>
              <Link href="/title-generator" className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent hover:underline">
                Start with Title Generator <ArrowRight size={11} />
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentHistory.map((h, idx) => {
                const Icon = toolIconMap[h.tool] || FileText;
                const color = toolColorMap[h.tool] || "text-muted";
                const timeAgo = (() => {
                  const diff = Date.now() - h.createdAt;
                  if (diff < 60000) return "Just now";
                  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
                  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
                  return `${Math.floor(diff / 86400000)}d ago`;
                })();

                return (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + idx * 0.06, duration: 0.35 }}
                    className="flex items-center gap-3.5 rounded-xl border border-border-color bg-surface/30 px-4 py-3 hover:border-accent/20 transition-all"
                  >
                    <div className={`h-8 w-8 shrink-0 rounded-lg bg-surface-2 flex items-center justify-center`}>
                      <Icon size={14} className={color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate capitalize">
                        {h.tool?.replace(/-/g, " ") || "Unknown Tool"}
                      </p>
                      <p className="text-xs text-muted truncate">{h.input}</p>
                    </div>
                    <span className="text-[10px] text-muted shrink-0">{timeAgo}</span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
