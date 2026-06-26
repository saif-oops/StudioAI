"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex">
      <Sidebar />
      <section className="flex-1 p-8">
        <Header />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold">
            Dashboard <span className="text-[var(--accent)]">👋</span>
          </h1>
          <p className="mt-2 text-[var(--muted)]">Welcome back to Saflix AI</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)]/40">
              <h3 className="text-sm text-[var(--muted)]">{stat.label}</h3>
              <p className="mt-4 font-display text-4xl font-bold">
                {stat.value}
                <span className="text-[var(--accent)]">{stat.suffix}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {actions.map((action) => (
              <a key={action.path} href={action.path} className="flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--accent-soft)]">
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