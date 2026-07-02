"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function Dashboard() {
  const stats = [
    { label: "Total Analyses", value: "127", suffix: "" },
    { label: "Average CTR", value: "8.4", suffix: "%" },
    { label: "AI Credits", value: "900", suffix: "" },
  ];

  const actions = [
    { name: "Generate a Title", path: "/title-generator", icon: "✏️" },
    { name: "Analyze Thumbnail", path: "/thumbnail-analyzer", icon: "🎨" },
    { name: "Write a Script", path: "/script-generator", icon: "🎬" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <section className="flex-1 p-8">
        <Header />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold">
            Dashboard <span className="text-accent">👋</span>
          </h1>
          <p className="mt-2 text-muted">Welcome back to Saflix AI</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border-color bg-surface p-6 transition-colors hover:border-accent/40">
              <h3 className="text-sm text-muted">{stat.label}</h3>
              <p className="mt-4 font-display text-4xl font-bold">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {actions.map((action) => (
              <a key={action.path} href={action.path} className="flex items-center gap-3 rounded-xl border border-border-color bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-accent-soft">
                <span className="text-2xl">{action.icon}</span>
                <span className="font-medium">{action.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}