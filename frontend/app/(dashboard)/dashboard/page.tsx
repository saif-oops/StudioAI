"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import SpotlightCard from "@/components/bits/SpotlightCard";
import { PenLine, Palette, Clapperboard, Sparkles, BarChart3, TrendingUp, Zap } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Total Analyses", value: "127", suffix: "", icon: BarChart3, color: "text-blue-400" },
    { label: "Average CTR", value: "8.4", suffix: "%", icon: TrendingUp, color: "text-green-400" },
    { label: "AI Credits", value: "120", suffix: "/150", icon: Zap, color: "text-highlight" },
  ];

  const actions = [
    { name: "Generate a Title", path: "/title-generator", icon: PenLine, iconColor: "text-blue-400", bgGlow: "rgba(59, 130, 246, 0.15)" },
    { name: "Analyze Thumbnail", path: "/thumbnail-analyzer", icon: Palette, iconColor: "text-green-400", bgGlow: "rgba(16, 185, 129, 0.15)" },
    { name: "Write a Script", path: "/script-generator", icon: Clapperboard, iconColor: "text-red-400", bgGlow: "rgba(255, 0, 51, 0.15)" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8">
        <Header />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold flex items-center gap-2">
            Dashboard <Sparkles className="text-accent animate-pulse" size={28} />
          </h1>
          <p className="mt-2 text-muted">Welcome back to StudioAI</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <SpotlightCard
                key={stat.label}
                className="rounded-2xl border border-border-color bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-sm text-muted">{stat.label}</h3>
                  <Icon className={`${stat.color}`} size={18} />
                </div>
                <p className="mt-4 font-display text-4xl font-bold">
                  {stat.value}
                  <span className="text-accent">{stat.suffix}</span>
                </p>
              </SpotlightCard>
            );
          })}
        </div>

        <div className="mt-10">
          <h2 className="font-display text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <LinkWrapper key={action.path} href={action.path}>
                  <SpotlightCard
                    spotlightColor={action.bgGlow}
                    className="flex items-center gap-3 rounded-xl border border-border-color bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-accent-soft cursor-pointer"
                  >
                    <Icon className={`${action.iconColor}`} size={24} />
                    <span className="font-medium text-foreground">{action.name}</span>
                  </SpotlightCard>
                </LinkWrapper>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

// Simple internal wrapper to handle links gracefully with next/link
import Link from "next/link";
function LinkWrapper({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block">
      {children}
    </Link>
  );
}