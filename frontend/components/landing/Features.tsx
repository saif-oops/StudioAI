"use client";

import { motion } from "framer-motion";
import { Sparkles, Flame, Radar, ImageIcon, FileText, Zap, ArrowUpRight, Play } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 bg-transparent border-y border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white mb-6 backdrop-blur-md"
          >
            <Sparkles size={16} className="text-[#ff0000]" />
            <span>The Creator Arsenal</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6"
          >
            Everything you need to <span className="text-[#ff0000]">go viral.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Stop using 5 different tools. Saflix AI Studio combines scriptwriting, design, and market intelligence into one seamless dashboard.
          </motion.p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          
          {/* Box 1: 1-Click Pack (Large) */}
          <SpotlightCard className="md:col-span-2 md:row-span-2 p-8 flex flex-col justify-between group hover:border-[#ff0000]/50 transition-colors bg-[#0a0a0a]/80 backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff0000]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#ff0000]/10 transition-colors" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#ff0000]/10 border border-[#ff0000]/20 flex items-center justify-center mb-6">
                <Sparkles size={24} className="text-[#ff0000]" />
              </div>
              <h3 className="text-3xl font-bold text-white">The 1-Click Video Pack</h3>
              <p className="text-muted-foreground text-lg max-w-md">Type a topic. Get 3 viral titles, a complete script, an SEO description, 20 tags, and a thumbnail blueprint instantly.</p>
            </div>
            
            <div className="relative z-10 mt-8">
               <div className="bg-[#181818] border border-white/10 rounded-xl p-4 flex gap-4 transform group-hover:-translate-y-2 group-hover:rotate-1 transition-transform duration-500 shadow-2xl">
                 <div className="flex-1 space-y-3">
                   <div className="h-4 w-3/4 bg-white/10 rounded" />
                   <div className="h-4 w-1/2 bg-white/10 rounded" />
                 </div>
                 <div className="w-24 h-16 bg-[#ff0000]/20 border border-[#ff0000]/30 rounded-lg flex items-center justify-center">
                   <FileText size={20} className="text-[#ff0000]" />
                 </div>
               </div>
            </div>
          </SpotlightCard>

          {/* Box 2: Feed Simulator (Tall) */}
          <SpotlightCard className="md:col-span-1 md:row-span-2 p-8 flex flex-col justify-between group hover:border-blue-500/50 transition-colors bg-gradient-to-b from-[#111]/80 to-[#050505]/80 backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-colors" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <ImageIcon size={24} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Feed Simulator</h3>
              <p className="text-muted-foreground">A/B test your thumbnails against MrBeast & MKBHD in a simulated YouTube dark-mode feed before you upload.</p>
            </div>

            <div className="relative z-10 mt-8 flex-1 w-full bg-[#181818] border border-white/10 rounded-t-2xl p-3 translate-y-8 group-hover:translate-y-4 transition-transform duration-500">
               <div className="w-full h-24 bg-black border border-white/5 rounded-lg mb-2 flex items-center justify-center">
                 <Play size={24} className="text-[#ff0000]/50" />
               </div>
               <div className="flex gap-2">
                 <div className="w-6 h-6 rounded-full bg-white/10" />
                 <div className="space-y-1 flex-1">
                   <div className="w-full h-2 bg-white/20 rounded" />
                   <div className="w-2/3 h-2 bg-white/10 rounded" />
                 </div>
               </div>
            </div>
          </SpotlightCard>

          {/* Box 3: Shorts Studio (Wide) */}
          <SpotlightCard className="md:col-span-2 md:row-span-1 p-8 flex flex-col sm:flex-row justify-between items-center group hover:border-orange-500/50 transition-colors gap-8 bg-[#0a0a0a]/80 backdrop-blur-xl">
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-orange-500/10 transition-colors" />
            <div className="relative z-10 flex-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                <Flame size={24} className="text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Viral Shorts & Hooks Studio</h3>
              <p className="text-muted-foreground">Engineered for 80%+ retention. Generate 9:16 beat-by-beat vertical scripts with psychological hooks and infinite loop endings.</p>
            </div>
            
            <div className="relative z-10 w-full sm:w-1/3 bg-[#181818] border border-white/10 rounded-xl p-4 flex flex-col gap-2 transform group-hover:scale-105 transition-transform duration-500">
               <div className="flex items-center justify-between">
                 <span className="text-[10px] uppercase font-bold text-orange-500">Hook A/B</span>
                 <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">95% Ret.</span>
               </div>
               <div className="h-2 w-full bg-white/20 rounded" />
               <div className="h-2 w-4/5 bg-white/10 rounded" />
            </div>
          </SpotlightCard>

          {/* Box 4: Trend Radar */}
          <SpotlightCard className="md:col-span-1 md:row-span-1 p-8 flex flex-col justify-between group hover:border-emerald-500/50 transition-colors bg-[#0a0a0a]/80 backdrop-blur-xl">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Radar size={24} className="text-emerald-400" />
                </div>
                <ArrowUpRight size={24} className="text-muted-foreground group-hover:text-emerald-400 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white">Trend Radar</h3>
              <p className="text-muted-foreground text-sm">Scan your niche for exploding micro-trends and steal highly-clickable video ideas before they saturate.</p>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}
