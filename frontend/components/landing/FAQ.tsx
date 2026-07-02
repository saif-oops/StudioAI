"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What is StudioAI?", a: "StudioAI is an all-in-one AI toolkit for YouTube creators. Generate titles, analyze and create thumbnails, write descriptions, tags, and scripts, all in one dashboard." },
    { q: "Is it free to use?", a: "Yes, the core tools are free to use. Some advanced features may require a paid plan as we grow." },
    { q: "Do I need design skills for the thumbnail tools?", a: "No. Just upload a photo and a title, and the AI handles the rest." },
    { q: "Can I save my generated content?", a: "Yes, every title, description, and script you generate is saved automatically in your History tab." },
  ];

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <div className="text-center mb-12">

        <h2 className="mt-3 font-display text-4xl font-bold">
          Frequently Asked <span className="text-accent">Questions</span>
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl border border-border-color bg-surface overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium cursor-pointer"
            >
              {faq.q}
              <span className={`text-accent transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <p className="px-5 pb-4 text-sm text-muted leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}