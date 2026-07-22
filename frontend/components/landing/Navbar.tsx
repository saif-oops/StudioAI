"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-display font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #ff0033 0%, #ff4400 100%)" }}
          >
            S
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground leading-none">
              Studio<span className="gradient-text">AI</span>
            </span>
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
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden sm:block text-sm font-semibold text-muted hover:text-foreground transition-colors mr-2">
            Sign In
          </Link>
          <Link href="/dashboard" className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
            <Sparkles size={14} />
            Try for Free
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
