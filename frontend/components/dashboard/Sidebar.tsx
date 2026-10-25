"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { ref, onValue } from "firebase/database";
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
  Lightbulb,
  Tags,
  Search,
  Mic,
  Plus,
  Bell,
  Sparkles,
  Flame,
  Radar,
  ExternalLink,
} from "lucide-react";
import { RAZORPAY_PRO_PAYMENT_URL } from "@/lib/constants";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "1-Click Video Pack", icon: Sparkles, path: "/video-pack" },
  { name: "Shorts & Hooks", icon: Flame, path: "/shorts-generator" },
  { name: "Trend Radar", icon: Radar, path: "/trend-radar" },
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
    <div className="mb-6 flex items-center gap-2.5 px-2">
      <div className="flex h-7 w-10 items-center justify-center rounded-lg bg-[#ff0000] shadow-md shrink-0">
        <div className="ml-0.5 h-0 w-0 border-y-[4.5px] border-l-[8px] border-y-transparent border-l-white" />
      </div>
      <div className="flex items-baseline">
        <span className="font-display text-lg font-bold tracking-tight text-white">Saflix</span>
        <span className="ml-1 font-display text-lg font-normal tracking-tight text-white/90">Studio</span>
        <sup className="ml-0.5 font-bold tracking-wider text-[#ff0000] text-[10px]">AI</sup>
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
      className={`group flex items-center gap-4 rounded-xl px-3.5 py-3 transition-all duration-200 ${
        active 
          ? "bg-[#272727] text-white shadow-sm" 
          : "text-muted hover:bg-[#272727] hover:text-white"
      }`}
    >
      <Icon 
        size={20} 
        strokeWidth={active ? 2.5 : 2} 
        className={`transition-colors ${active ? "text-accent" : "text-muted group-hover:text-white"}`} 
      />
      <span className={`text-sm font-medium ${active ? "font-semibold" : ""}`}>
        {item.name}
      </span>
    </Link>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    const userRef = ref(db, `users/${user.uid}`);
    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists() && snapshot.val()?.credits !== undefined) {
          setCredits(snapshot.val().credits);
        } else {
          setCredits(150);
        }
      },
      (error) => {
        console.warn("Realtime Database credit read warning:", error);
        setCredits(150);
      }
    );
    return () => unsubscribe();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="md:hidden">
        <SidebarLogo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5">
        <p className="px-3.5 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted/60">
          Tools
        </p>
        {menuItems.slice(0, 9).map((item) => (
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
        {menuItems.slice(9).map((item) => (
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
              <p className="text-[10px] text-muted">YouTube Pro</p>
            </div>
          </div>
          <span className="text-xs font-bold text-accent">{credits !== null ? credits : "..."}/150</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-border-color overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #ff0000 0%, #ff4400 100%)" }}
            initial={{ width: 0 }}
            animate={{ width: `${credits !== null ? Math.min((credits / 150) * 100, 100) : 0}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          />
        </div>

        <a
          href={RAZORPAY_PRO_PAYMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full text-center rounded-lg border border-accent/30 bg-accent/10 py-1.5 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors shadow-sm"
        >
          <span>Upgrade to Pro</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {user && (
        <div className="mt-4 pt-4 border-t border-border-color">
          <div className="flex items-center gap-3 px-2 mb-3">
            <img 
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`} 
              alt="User" 
              className="w-8 h-8 rounded-full border border-border-color" 
            />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user.displayName || "User"}</p>
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex justify-center items-center gap-2 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
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
      {/* Universal YouTube Studio / Premium Top Bar (Fixed across entire window) */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#272727] bg-[#0f0f0f]/95 px-4 backdrop-blur-md md:px-6">
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#272727] text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-6 w-9 items-center justify-center rounded-lg bg-[#ff0000] shadow-md">
              <div className="ml-0.5 h-0 w-0 border-y-[4px] border-l-[8px] border-y-transparent border-l-white" />
            </div>
            <div className="flex items-baseline">
              <span className="font-display text-lg font-bold tracking-tight text-white">Saflix</span>
              <span className="ml-1 font-display text-lg font-normal tracking-tight text-white/90">Studio</span>
              <sup className="ml-0.5 font-bold tracking-wider text-[#ff0000] text-[10px]">AI</sup>
            </div>
          </Link>
        </div>

        {/* Center: YouTube Search Bar */}
        <div className="hidden max-w-xl flex-1 items-center justify-center md:flex px-6">
          <div className="flex w-full items-center rounded-full border border-[#303030] bg-[#121212] focus-within:border-[#3f3f3f] shadow-inner">
            <input
              type="text"
              placeholder="Search creator tools, video ideas, thumbnails, SEO tags..."
              className="w-full bg-transparent px-5 py-2 text-sm text-white placeholder-muted focus:outline-none"
            />
            <button className="flex h-9 w-14 items-center justify-center rounded-r-full border-l border-[#303030] bg-[#222222] text-muted hover:text-white transition-colors">
              <Search size={16} />
            </button>
          </div>
          <button className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#181818] hover:bg-[#272727] text-white transition-colors">
            <Mic size={16} />
          </button>
        </div>

        {/* Right: + Create Button, Notifications, Avatar */}
        <div className="flex items-center gap-2.5 md:gap-3">
          <Link
            href="/video-pack"
            className="flex items-center gap-2 rounded-full bg-[#272727] px-3.5 py-1.5 text-xs md:text-sm font-medium text-white hover:bg-[#3f3f3f] transition-all shadow-sm"
          >
            <Plus size={16} className="text-[#ff0000]" />
            <span className="hidden sm:inline">Create</span>
          </Link>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#272727] text-white transition-colors">
            <Bell size={18} />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff0000] text-[9px] font-bold text-white">
              9+
            </span>
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#ff0000] to-purple-600 p-0.5 shadow-md cursor-pointer">
            <div className="h-full w-full rounded-full bg-[#181818] flex items-center justify-center font-bold text-white text-xs">
              YT
            </div>
          </div>
        </div>
      </header>

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
              className="fixed bottom-0 left-0 top-0 z-50 w-64 border-r border-border-color bg-[#0f0f0f] p-5 md:hidden overflow-y-auto"
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#272727] text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <SidebarContent onClose={() => setIsOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Sticky under the 64px Top Bar) */}
      <aside className="hidden md:flex w-60 min-h-screen border-r border-[#272727] bg-[#0f0f0f] p-5 flex-col shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-30">
        <SidebarContent />
      </aside>
    </>
  );
}
