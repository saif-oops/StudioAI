"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Flame, LayoutDashboard } from "lucide-react";
import MarqueeBackground from "./MarqueeBackground";

export default function Hero() {
  const words = ["Goes Viral", "Gets Clicked", "Grows Fast", "Builds Brands"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
      <MarqueeBackground />
      {/* Background Deep Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none blur-[120px] rounded-full bg-gradient-to-b from-[#ff0000] to-purple-600 -z-10" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#ff0000]/30 bg-[#ff0000]/10 px-4 py-1.5 text-sm font-medium text-[#ff0000] mb-6 backdrop-blur-md"
            >
              <Sparkles size={16} />
              <span>The #1 AI Production Studio for Creators</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Create Content That <br className="hidden sm:block" />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-1 bg-gradient-to-r from-[#ff0000] to-orange-500 blur-lg opacity-30 rounded-lg"></span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative bg-gradient-to-r from-[#ff0000] via-orange-500 to-yellow-500 bg-clip-text text-transparent inline-block"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Stop guessing the algorithm. Saflix AI Studio generates highly-clickable titles, thumbnails, scripts, and SEO metadata in exactly 1 click.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/dashboard" className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-gray-100 w-full sm:w-auto overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                Start Creating Free
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#features" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 w-full sm:w-auto backdrop-blur-sm">
                See How It Works
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground font-medium"
            >
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                ].map((src, i) => (
                  <img key={i} src={src} alt="Creator" className="w-10 h-10 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <p>Trusted by <span className="text-white font-bold">10,000+</span> creators</p>
            </motion.div>
          </div>

          {/* Right Floating 3D Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: -5 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative perspective-1000 z-10 hidden md:block"
          >
            <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl shadow-[#ff0000]/20 p-2 overflow-hidden transform-style-3d group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0000]/10 to-transparent opacity-50" />
              
              {/* Fake Dashboard Header */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4 px-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-auto w-1/2 h-6 bg-white/5 rounded-md flex items-center justify-center text-[10px] text-muted-foreground">saflix-ai.studio</div>
              </div>

              {/* Fake Dashboard Content */}
              <div className="grid grid-cols-3 gap-4 p-2 relative z-10">
                <div className="col-span-1 space-y-3">
                  <div className="h-8 bg-white/5 rounded-lg flex items-center px-3 gap-2 text-xs text-white font-medium border border-white/10"><LayoutDashboard size={12} className="text-muted-foreground"/> Dashboard</div>
                  <div className="h-8 bg-[#ff0000]/20 rounded-lg flex items-center px-3 gap-2 text-xs text-[#ff0000] font-bold border border-[#ff0000]/30"><Sparkles size={12} className="text-[#ff0000]"/> Video Pack</div>
                  <div className="h-8 bg-white/5 rounded-lg flex items-center px-3 gap-2 text-xs text-gray-400 font-medium border border-white/5"><Flame size={12} className="text-muted-foreground"/> Shorts Studio</div>
                </div>
                <div className="col-span-2 space-y-3">
                  <div className="bg-gradient-to-br from-[#181818] to-[#121212] rounded-xl border border-white/10 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#ff0000]/50 transition-colors">
                     <div className="flex items-center justify-between mb-2">
                       <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Generated Title</div>
                       <div className="px-1.5 py-0.5 bg-emerald-500/20 rounded border border-emerald-500/30 flex items-center justify-center text-[9px] font-bold text-emerald-400">94% CTR</div>
                     </div>
                     <p className="text-sm font-bold text-white leading-tight">I Survived 50 Hours In Antarctica (NO GEAR)</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col items-center justify-center gap-2">
                       <span className="text-[10px] text-gray-400 font-medium w-full text-left">Thumbnail Concept</span>
                       <div className="w-full aspect-video bg-black rounded-md border border-white/5 relative overflow-hidden flex items-center justify-center">
                         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black" />
                         <span className="text-[8px] font-bold text-white z-10">MRBEAST STYLE</span>
                       </div>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-3">
                       <span className="text-[10px] text-gray-400 font-medium block mb-2">SEO Description</span>
                       <div className="space-y-1.5">
                         <p className="text-[7px] text-gray-300 leading-tight">In this video, I attempt the most dangerous challenge of my life...</p>
                         <p className="text-[7px] text-[#ff0000] font-bold mt-2">#Antarctica #Challenge</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element 1 */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 -top-6 bg-[#ff0000] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#ff0000]/30 flex items-center gap-1 border border-white/20"
              >
                <Zap size={10} fill="currentColor" /> 1-Click Pack Ready
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-6 bottom-12 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1 border border-white/20"
              >
                 89% Hook Retention
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
