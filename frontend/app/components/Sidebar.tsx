"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: "🏠", path: "/dashboard" },
    { name: "Thumbnail Analyzer", icon: "🎨", path: "/thumbnail-analyzer" },
    { name: "Thumbnail Generator", icon: "🖼️", path: "/thumbnail-generator" },
    { name: "Title Generator", icon: "✏️", path: "/title-generator" },
    { name: "Description Generator", icon: "📝", path: "/description-generator" },
    { name: "Script Generator", icon: "🎬", path: "/script-generator" },
    { name: "History", icon: "📜", path: "/history" },
    { name: "Analytics", icon: "📊", path: "/analytics" },
    { name: "Settings", icon: "⚙️", path: "/settings" },
  ];

  return (
    <aside className="w-64 min-h-screen border-r border-[var(--border-color)] bg-[var(--background)] p-6 flex flex-col">
      <div className="mb-10 flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-[var(--accent)] flex items-center justify-center font-display font-bold text-black">
          S
        </div>
        <h1 className="font-display text-xl font-bold tracking-tight">
          Saflix <span className="text-[var(--accent)]">AI</span>
        </h1>
      </div>

      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/30"
                  : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-4">
        <p className="text-xs text-[var(--muted)]">Free Plan</p>
        <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--border-color)] overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-[var(--accent)]" />
        </div>
        <p className="mt-2 text-xs text-[var(--muted)]">Upgrade for more credits</p>
      </div>
    </aside>
  );
}