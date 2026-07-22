"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3, TrendingUp, Users, Play, Clock, Zap, Calendar,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid,
} from "recharts";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import SpotlightCard from "@/components/bits/SpotlightCard";
import { getHistory, HistoryItem } from "@/lib/history";

const toolColors: Record<string, string> = {
  "title-generator": "#3b82f6",
  "thumbnail-analyzer": "#22c55e",
  "thumbnail-generator": "#a855f7",
  "description-generator": "#f97316",
  "script-generator": "#ef4444",
};

const toolLabels: Record<string, string> = {
  "title-generator": "Titles",
  "thumbnail-analyzer": "Analyze",
  "thumbnail-generator": "Thumbnail",
  "description-generator": "Description",
  "script-generator": "Script",
};

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const timer = setInterval(() => {
      start += Math.ceil(value / 40);
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(start);
    }, 20);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl border border-border-color bg-surface px-3 py-2 shadow-xl text-xs">
        <p className="text-muted mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.value} {p.name === "count" ? "generations" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Tool usage breakdown
  const toolUsage: Record<string, number> = {};
  history.forEach((h) => { toolUsage[h.tool] = (toolUsage[h.tool] || 0) + 1; });
  const pieData = Object.entries(toolUsage).map(([tool, count]) => ({
    name: toolLabels[tool] || tool,
    value: count,
    color: toolColors[tool] || "#666",
  }));

  // Bar chart: usage by tool
  const barData = Object.entries(toolUsage).map(([tool, count]) => ({
    name: toolLabels[tool] || tool,
    count,
    color: toolColors[tool] || "#666",
  }));

  // Line chart: last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayKey = d.toLocaleDateString("en-US", { weekday: "short" });
    const count = history.filter((h) => {
      const hd = new Date(h.createdAt);
      return hd.toDateString() === d.toDateString();
    }).length;
    return { day: dayKey, count };
  });

  // Streak calculation
  let streak = 0;
  for (let i = 0; i < last7Days.length; i++) {
    const dayIdx = last7Days.length - 1 - i;
    if (last7Days[dayIdx].count > 0) streak++;
    else break;
  }

  const totalGenerations = history.length;
  const uniqueTools = Object.keys(toolUsage).length;

  const statCards = [
    { label: "Total Generations", value: totalGenerations, icon: Zap, color: "text-accent", bg: "bg-accent/10" },
    { label: "Tools Used", value: uniqueTools, icon: BarChart3, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Day Streak", value: streak, icon: Calendar, color: "text-highlight", bg: "bg-yellow-500/10" },
    { label: "This Week", value: last7Days.reduce((a, b) => a + b.count, 0), icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  const hasData = history.length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-5xl">
        <PageHeader
          icon={BarChart3}
          iconColor="text-highlight"
          iconBg="bg-yellow-500/10"
          title="Your"
          titleHighlight="Analytics"
          subtitle="Track your AI tool usage and content generation activity over time."
        />

        {/* Stat Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4, ease: "easeOut" }}
              >
                <SpotlightCard className="glass-card-surface rounded-2xl p-5 hover:border-accent/20 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted font-medium">{stat.label}</p>
                      <p className="mt-2 font-display text-3xl font-bold">
                        <AnimatedNumber value={stat.value} />
                      </p>
                    </div>
                    <div className={`h-9 w-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={stat.color} size={18} />
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {hasData ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {/* Bar chart: tool usage */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="glass-card-surface rounded-2xl p-5"
            >
              <h3 className="font-display text-sm font-bold mb-1">Tool Usage Breakdown</h3>
              <p className="text-xs text-muted mb-5">How many times you used each tool</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData} barCategoryGap="30%">
                  <XAxis dataKey="name" tick={{ fill: "#7a7a7a", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} opacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Line chart: last 7 days */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="glass-card-surface rounded-2xl p-5"
            >
              <h3 className="font-display text-sm font-bold mb-1">Activity — Last 7 Days</h3>
              <p className="text-xs text-muted mb-5">Generations per day this week</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={last7Days}>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                  <XAxis dataKey="day" tick={{ fill: "#7a7a7a", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#ff0033"
                    strokeWidth={2.5}
                    dot={{ fill: "#ff0033", r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#ff0033" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie chart: distribution */}
            {pieData.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="glass-card-surface rounded-2xl p-5"
              >
                <h3 className="font-display text-sm font-bold mb-1">Tool Distribution</h3>
                <p className="text-xs text-muted mb-4">Your most-used tools at a glance</p>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width={120} height={120}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={32} outerRadius={52} dataKey="value" strokeWidth={0}>
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} opacity={0.9} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2">
                    {pieData.map((d) => (
                      <div key={d.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full shrink-0" style={{ background: d.color }} />
                          <span className="text-xs text-muted">{d.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-foreground">{d.value}x</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* YouTube Channel placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              className="glass-card-surface rounded-2xl p-5 flex flex-col justify-center items-center text-center"
            >
              <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-3">
                <Play size={22} className="text-red-400" />
              </div>
              <h3 className="font-display text-sm font-bold">YouTube Channel Analytics</h3>
              <p className="mt-2 text-xs text-muted max-w-xs">
                Connect your YouTube channel in Settings to unlock views, watch time, subscribers, and CTR data.
              </p>
              <a href="/settings" className="mt-4 btn-secondary text-xs px-4 py-2 rounded-lg">
                Connect Channel
              </a>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 glass-card-surface rounded-2xl p-12 flex flex-col items-center text-center"
          >
            <div className="h-16 w-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-4">
              <BarChart3 size={28} className="text-highlight" />
            </div>
            <h3 className="font-display text-lg font-bold">No data yet</h3>
            <p className="mt-2 text-sm text-muted max-w-sm">
              Start generating content with any of the AI tools and your usage stats will appear here.
            </p>
            <a href="/title-generator" className="mt-5 btn-primary text-sm px-6 py-2.5">
              Start Generating
            </a>
          </motion.div>
        )}
      </section>
    </main>
  );
}
