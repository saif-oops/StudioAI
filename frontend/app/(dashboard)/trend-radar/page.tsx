"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Radar, Sparkles, RefreshCw, Target, TrendingUp, Activity, ArrowUpRight
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { toast } from "sonner";
import { addHistoryItem } from "@/lib/history";
import { useAuth } from "@/components/AuthProvider";
import { checkCredits, deductCredits } from "@/lib/credits";

type Trend = {
  title: string;
  growthPhase: string;
  competitionLevel: string;
  whyItsWorking: string;
  angleToTake: string;
  videoIdeas: string[];
};

const timeframes = ["This Month", "Next 3 Months", "This Year"];

const suggestions = [
  "Faceless Cash Cow Channels",
  "AI & Automation",
  "Personal Finance & Crypto",
  "Productivity & Notion",
  "Fitness & Calisthenics",
  "Gaming (Minecraft/Roblox)"
];

export default function TrendRadarPage() {
  const router = useRouter();
  const [niche, setNiche] = useState("");
  const [timeframe, setTimeframe] = useState("This Month");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [trends, setTrends] = useState<Trend[] | null>(null);

  const generateTrends = async () => {
    if (!niche.trim()) {
      toast.error("Please enter your channel's niche!");
      return;
    }
    if (!user) {
      toast.error("Please sign in to scan trends.");
      return;
    }

    const creditStatus = await checkCredits(user.uid, 1, { email: user.email, name: user.displayName });
    if (!creditStatus.allowed) {
      toast.error(creditStatus.error || "Not enough credits.");
      return;
    }

    setLoading(true);
    setTrends(null);

    try {
      const res = await fetch("/api/generate-trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, timeframe }),
      });

      const json = await res.json();
      if (json.success && json.trendData && json.trendData.trends) {
        setTrends(json.trendData.trends);
        await deductCredits(user.uid, 1);
        toast.success("Radar scan complete!", {
          description: "Found 4 emerging trends in your niche.",
          icon: <Radar className="text-blue-400" size={18} />
        });
        addHistoryItem({
          tool: "trend-radar",
          input: `${niche} (${timeframe})`,
          output: { trends: json.trendData.trends },
        });
      } else {
        throw new Error(json.error || "Failed to generate");
      }
    } catch (err) {
      console.error(err);
      toast.error("Scan Failed", {
        description: "Please check your network and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const sendIdeaToPack = (idea: string) => {
    // Save to local storage for the video-pack to pick up if we wanted to build that bridge
    // For now, we'll just redirect to the video pack with the idea copied to clipboard
    navigator.clipboard.writeText(idea);
    toast.success("Idea copied!", {
      description: "Redirecting to 1-Click Video Pack..."
    });
    setTimeout(() => {
      router.push("/video-pack");
    }, 1000);
  };

  const getGrowthColor = (phase: string) => {
    const p = phase.toLowerCase();
    if (p.includes("exploding")) return "text-[#ff0000] bg-[#ff0000]/10 border-[#ff0000]/20";
    if (p.includes("emerging")) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    return "text-blue-400 bg-blue-400/10 border-blue-400/20";
  };

  const getCompColor = (comp: string) => {
    const c = comp.toLowerCase();
    if (c.includes("low")) return "text-emerald-400";
    if (c.includes("medium")) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-6xl">
        <PageHeader
          icon={Radar}
          iconColor="text-blue-500"
          iconBg="bg-blue-500/10"
          title="Competitor &"
          titleHighlight="Trend Radar"
          subtitle="Scan your niche for emerging, low-competition micro-trends before they become saturated."
          badge="Market Intelligence"
        />

        {/* Input Controls */}
        <div className="glass-card-surface rounded-2xl p-6 md:p-8 space-y-6 border border-[#272727] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Niche Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted flex items-center gap-1.5">
              <Target size={14} className="text-blue-400" />
              What is your channel&apos;s exact niche?
            </label>
            <input
              type="text"
              placeholder="e.g. Faceless AI Cash Cow, Personal Finance for teens..."
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateTrends()}
              className="w-full bg-[#121212] border border-[#272727] focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none transition-colors"
            />
            {/* Suggestion Chips */}
            {!niche && (
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="text-xs text-muted flex items-center gap-1 py-1">Popular Niches:</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setNiche(s)}
                    className="text-xs bg-[#181818] hover:bg-[#272727] border border-[#272727] text-muted hover:text-white px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Timeframe */}
          <div className="w-full sm:w-1/3 space-y-1.5">
            <label className="text-xs text-muted font-medium flex items-center gap-1">
              <Activity size={12} /> Projection Timeframe
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full bg-[#121212] border border-[#272727] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {timeframes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Scan Button */}
          <div className="pt-4 flex items-center justify-between border-t border-[#272727]">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Scanning 10,000+ data points for emerging signals</span>
            </div>
            <button
              onClick={generateTrends}
              disabled={loading || !niche.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Running Radar Scan...
                </>
              ) : (
                <>
                  <Radar size={16} />
                  Scan Market Trends
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 bg-[#181818] rounded-2xl border border-[#272727]" />
            ))}
          </div>
        )}

        {/* Generated Output */}
        <AnimatePresence>
          {!loading && trends && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-6"
            >
              <div className="flex items-center gap-2 px-2">
                <TrendingUp size={20} className="text-blue-400" />
                <h3 className="text-lg font-bold text-white">Top 4 Emerging Micro-Trends</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trends.map((trend, idx) => (
                  <div key={idx} className="glass-card-surface rounded-2xl p-6 border border-[#272727] hover:border-blue-500/30 transition-all space-y-5 flex flex-col justify-between group">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${getGrowthColor(trend.growthPhase)} flex items-center gap-1`}>
                            <ArrowUpRight size={12} /> {trend.growthPhase}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#181818] border border-[#272727] text-muted flex items-center gap-1">
                            Comp: <span className={getCompColor(trend.competitionLevel)}>{trend.competitionLevel}</span>
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-white leading-tight">{trend.title}</h4>
                      </div>

                      {/* Analysis */}
                      <div className="space-y-3 bg-[#121212] rounded-xl p-4 border border-[#272727]">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 block mb-1">Why It&apos;s Working</span>
                          <p className="text-xs text-muted leading-relaxed">{trend.whyItsWorking}</p>
                        </div>
                        <div className="border-t border-[#272727] pt-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">Your Unique Angle</span>
                          <p className="text-xs text-white leading-relaxed">{trend.angleToTake}</p>
                        </div>
                      </div>
                    </div>

                    {/* Ideas */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted block mb-2 px-1">Highly Clickable Video Ideas</span>
                      {trend.videoIdeas.map((idea, i) => (
                        <div key={i} className="flex items-center justify-between gap-3 bg-[#181818] hover:bg-[#202020] border border-[#272727] rounded-lg p-2.5 transition-colors group/idea">
                          <p className="text-xs font-semibold text-white/90 line-clamp-2">{idea}</p>
                          <button
                            onClick={() => sendIdeaToPack(idea)}
                            title="Send to 1-Click Video Pack"
                            className="shrink-0 w-7 h-7 rounded-md bg-[#272727] hover:bg-[#ff0000] text-muted hover:text-white flex items-center justify-center transition-colors"
                          >
                            <Sparkles size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
