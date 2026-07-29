"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const reviews = [
    {
      name: "Priya M.",
      role: "Tech Reviewer",
      text: "My CTR went up since I started using the title scores. Genuinely useful.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Marcus J.",
      role: "Content Strategist",
      text: "The script outlines save me at least an hour per video. Game changer.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Luna R.",
      role: "Vlogger",
      text: "I used to spend hours on thumbnails. Now it takes minutes.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "James T.",
      role: "Gaming Creator (1.2M Subs)",
      text: "The Shorts & Hooks studio is literally a cheat code for YouTube Shorts.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Sarah K.",
      role: "Faceless Channel",
      text: "I generate full production kits in seconds. This replaced my entire team.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "David O.",
      role: "Finance YouTuber",
      text: "The Trend Radar found a micro-trend that got me 500k views last week.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Elena V.",
      role: "Lifestyle Creator",
      text: "I didn't know anything about SEO. Now all my videos rank on the first page.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Brian C.",
      role: "Tech Tutorials",
      text: "Testing thumbnails in the dark mode feed simulator saves me from flops.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80"
    },
  ];

  // We duplicate the array to make the infinite loop seamless
  const infiniteReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 md:py-32 bg-[#020202] overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white mb-6"
        >
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span>Wall of Love</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-white"
        >
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">thousands</span> of creators.
        </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden flex">
        {/* Left Fade */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling Track */}
        <div className="flex gap-6 animate-marquee min-w-max px-4">
          {infiniteReviews.map((r, i) => (
            <div 
              key={i} 
              className="w-[350px] rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">"{r.text}"</p>
              </div>
              
              <div className="flex items-center gap-3">
                <img
                  src={r.image}
                  alt={r.name}
                  className="h-10 w-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <p className="font-semibold text-sm text-white">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Fade */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
