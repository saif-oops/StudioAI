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
  Zap,
  ChevronRight,
  Lightbulb,
  Tags,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Video Ideas", icon: Lightbulb, path: "/ideas-generator" },
  { name: "Tag Generator", icon: Tags, path: "/tag-generator" },
  { name: "Thumbnail Analyzer", icon: Palette, path: "/thumbnail-analyzer" },
  { name: "Thumbnail Generator", icon: ImageIcon, path: "/thumbnail-generator" },
  { name: "Title Generator", icon: PenLine, path: "/title-generator" },
  { name: "Description Generator", icon: FileText, path: "/description-generator" },
  { name: "Script Generator", icon: Clapperboard, path: "/script-generator" },
  { name: "History", icon: History, path: "/history" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

function SidebarLogo() {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div
        className="h-9 w-9 rounded-xl flex items-center justify-center font-display font-bold text-white text-sm shrink-0"
        style={{ background: "linear-gradient(135deg, #ff0033 0%, #ff4400 100%)" }}
      >
        S
      </div>
      <div>
        <h1 className="font-display text-base font-bold tracking-tight text-foreground leading-none">
          Studio<span className="gradient-text">AI</span>
        </h1>
        <p className="text-[10px] text-muted mt-0.5 leading-none">YouTube Creator Suite</p>
      </div>
    </div>
  );
}

function NavItem({
  item,
  active,
  onClick,
}: {
  item: (typeof menuItems)[0];
  active: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.path}
      onClick={onClick}
      className="relative block group"
    >
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-xl sidebar-link-active"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <div
        className={`relative z-10 flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
          active
            ? "text-accent"
            : "text-muted hover:text-foreground hover:bg-white/3"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon
            size={16}
            strokeWidth={active ? 2.2 : 1.8}
            className="shrink-0 transition-all"
          />
          <span className="truncate">{item.name}</span>
        </div>
        {active && (
          <ChevronRight size={12} className="text-accent opacity-60 shrink-0" />
        )}
      </div>
    </Link>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <SidebarLogo />

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5">
        <p className="px-3.5 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted/60">
          Tools
        </p>
        {menuItems.slice(0, 8).map((item) => (
          <NavItem
            key={item.path}
            item={item}
            active={pathname === item.path}
            onClick={onClose}
          />
        ))}

        <p className="px-3.5 mt-5 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted/60">
          Account
        </p>
        {menuItems.slice(8).map((item) => (
          <NavItem
            key={item.path}
            item={item}
            active={pathname === item.path}
            onClick={onClose}
          />
        ))}
      </nav>

      {/* Credits widget */}
      <div className="mt-6 rounded-xl border border-border-color bg-white/2 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center">
              <Zap size={12} className="text-accent" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">AI Credits</p>
              <p className="text-[10px] text-muted">Free Plan</p>
            </div>
          </div>
          <span className="text-xs font-bold text-accent">120/150</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-border-color overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #ff0033 0%, #ff4400 100%)" }}
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          />
        </div>

        <Link
          href="/settings"
          onClick={onClose}
          className="block w-full text-center rounded-lg border border-accent/20 bg-accent/5 py-1.5 text-xs font-semibold text-accent hover:bg-accent/10 transition-colors"
        >
          Upgrade Plan
        </Link>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border-color bg-background/95 backdrop-blur-md sticky top-0 z-30 w-full">
        <div className="flex items-center gap-2.5">
          <div
            className="h-7 w-7 rounded-lg flex items-center justify-center font-display font-bold text-white text-xs"
            style={{ background: "linear-gradient(135deg, #ff0033 0%, #ff4400 100%)" }}
          >
            S
          </div>
          <span className="font-display font-bold text-sm text-foreground">
            Studio<span className="gradient-text">AI</span>
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-border-color bg-surface text-muted hover:text-foreground transition-colors"
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.32 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-64 border-r border-border-color bg-background p-5 md:hidden overflow-y-auto"
            >
              <SidebarContent onClose={() => setIsOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 min-h-screen border-r border-border-color bg-background/80 backdrop-blur-sm p-5 flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
        <SidebarContent />
      </aside>
    </>
  );
}
