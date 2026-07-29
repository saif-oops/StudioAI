"use client";

import { motion } from "framer-motion";

export default function MarqueeBackground() {
  const text = "GO VIRAL • BUILD BRANDS • DOMINATE YOUTUBE • SAFLIX AI STUDIO • ";
  
  return (
    <div className="absolute top-1/4 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none z-0 -rotate-3 opacity-5 mix-blend-screen">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Adjust speed here
        }}
        className="flex"
      >
        <span className="text-[12rem] font-black tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px white" }}>
          {text}
        </span>
        <span className="text-[12rem] font-black tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px white" }}>
          {text}
        </span>
      </motion.div>
    </div>
  );
}
