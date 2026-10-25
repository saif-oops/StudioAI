"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openAuthModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border-color shadow-sm" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-10 items-center justify-center rounded-lg bg-[#ff0000] shadow-md">
            <div className="ml-0.5 h-0 w-0 border-y-[4.5px] border-l-[8px] border-y-transparent border-l-white" />
          </div>
          <div className="flex items-baseline">
            <span className="font-display text-lg font-bold tracking-tight text-white">Saflix</span>
            <span className="ml-1 font-display text-lg font-normal tracking-tight text-white/90">Studio</span>
            <sup className="ml-0.5 font-bold tracking-wider text-[#ff0000] text-[10px]">AI</sup>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            How it Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={openAuthModal}
            className="hidden sm:block text-sm font-semibold text-muted hover:text-foreground transition-colors mr-2 cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={openAuthModal}
            className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5 cursor-pointer"
          >
            <Sparkles size={14} />
            Try for Free
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
