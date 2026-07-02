"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Palette,
  Image as ImageIcon,
  PenLine,
  FileText,
  Clapperboard,
  History,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Thumbnail Analyzer", icon: Palette, path: "/thumbnail-analyzer" },
    { name: "Thumbnail Generator", icon: ImageIcon, path: "/thumbnail-generator" },
    { name: "Title Generator", icon: PenLine, path: "/title-generator" },
    { name: "Description Generator", icon: FileText, path: "/description-generator" },
    { name: "Script Generator", icon: Clapperboard, path: "/script-generator" },
    { name: "History", icon: History, path: "/history" },
    { name: "Analytics", icon: BarChart3, path: "/analytics" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside className="w-64 min-h-screen border-r border-[var(--border-color)] bg-[var(--background)] p-6 flex flex-col">
      <div className="mb-12 flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-[var(--accent)] flex items-center justify-center font-display font-bold text-black">
          S
        </div>
        <h1 className="font-display text-xl font-bold tracking-tight">
          Saflix <span className="text-[var(--accent)]">AI</span>
        </h1>
      </div>

      <nav className="space-y-1.5 flex-1">
        {menuItems.map((item) => {
          const active = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path} className="relative block">
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/30"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <div
                className={`relative z-10 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {item.name}
              </div>
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