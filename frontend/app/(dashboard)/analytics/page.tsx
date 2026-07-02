"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import SpotlightCard from "@/components/bits/SpotlightCard";
import { BarChart3, TrendingUp, Users, Play, Clock } from "lucide-react";

export default function Analytics() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8">
        <div className="relative">
          <h1 className="mt-2 font-display text-4xl font-bold flex items-center gap-3">
            <BarChart3 className="text-accent" size={32} />
            Analytics
          </h1>
          <p className="mt-2 text-muted">
            Track your content performance
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <SpotlightCard className="rounded-2xl border border-border-color bg-surface p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm text-muted">Views</h3>
              <Play className="text-blue-400" size={18} />
            </div>
            <p className="mt-4 font-display text-3xl font-bold">45.2K</p>
            <p className="mt-2 text-xs text-green-400 font-semibold">+12.3% this week</p>
          </SpotlightCard>

          <SpotlightCard className="rounded-2xl border border-border-color bg-surface p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm text-muted">Watch Time</h3>
              <Clock className="text-purple-400" size={18} />
            </div>
            <p className="mt-4 font-display text-3xl font-bold">1.8K hrs</p>
            <p className="mt-2 text-xs text-green-400 font-semibold">+8.1% this week</p>
          </SpotlightCard>

          <SpotlightCard className="rounded-2xl border border-border-color bg-surface p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm text-muted">Subscribers</h3>
              <Users className="text-green-400" size={18} />
            </div>
            <p className="mt-4 font-display text-3xl font-bold">+340</p>
            <p className="mt-2 text-xs text-green-400 font-semibold">+24.5% this week</p>
          </SpotlightCard>

          <SpotlightCard className="rounded-2xl border border-border-color bg-surface p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm text-muted">Avg. CTR</h3>
              <TrendingUp className="text-highlight" size={18} />
            </div>
            <p className="mt-4 font-display text-3xl font-bold">8.4%</p>
            <p className="mt-2 text-xs text-red-400 font-semibold">-0.5% this week</p>
          </SpotlightCard>
        </div>

        <SpotlightCard className="mt-8 rounded-2xl border border-border-color bg-surface p-6 h-64 flex flex-col justify-center items-center text-center">
          <BarChart3 className="text-muted/40 mb-3" size={48} />
          <h3 className="font-display text-lg font-bold">Audience Retention & Advanced Charts</h3>
          <p className="mt-2 text-sm text-muted max-w-sm">Connect your YouTube Channel in Settings to unlock deep analytical insights.</p>
        </SpotlightCard>
      </section>
    </main>
  );
}