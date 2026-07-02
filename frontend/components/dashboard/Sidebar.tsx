"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  const sidebarContent = (
    <>
      <div className="mb-12 flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center font-display font-bold text-black">
          S
        </div>
        <h1 className="font-display text-xl font-bold tracking-tight text-foreground">
          Studio<span className="text-accent">AI</span>
        </h1>
      </div>

      <nav className="space-y-1.5 flex-1">
        {menuItems.map((item) => {
          const active = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)} className="relative block">
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-accent-soft border border-accent/30"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <div
                className={`relative z-10 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-xl border border-border-color bg-surface p-4">
        <p className="text-xs text-muted">Free Plan</p>
        <div className="mt-2 h-1.5 w-full rounded-full bg-border-color overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-accent" />
        </div>
        <p className="mt-2 text-xs text-muted">Upgrade for more credits</p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border-color bg-background sticky top-0 z-30 w-full">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-display font-bold text-black text-sm">
            S
          </div>
          <span className="font-display font-bold text-foreground">StudioAI</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-1">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-64 bg-background border-r border-border-color p-6 flex flex-col md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 min-h-screen border-r border-border-color bg-background p-6 flex-col shrink-0 sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
}