"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What is Saflix AI Studio?", a: "Saflix is an all-in-one AI toolkit for YouTube creators — generate titles, analyze and create thumbnails, write descriptions, tags, and scripts, all in one dashboard." },
    { q: "Is it free to use?", a: "Yes, the core tools are free to use. Some advanced features may require a paid plan as we grow." },
    { q: "Do I need design skills for the thumbnail tools?", a: "No. Just upload a photo and a title, and the AI handles the rest." },
    { q: "Can I save my generated content?", a: "Yes, every title, description, and script you generate is saved automatically in your History tab." },
  ];

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center mb-12">
        <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--accent)] uppercase">
          Got Questions?
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold">
          Frequently Asked <span className="text-[var(--accent)]">Questions</span>
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium"
            >
              {faq.q}
              <span className={`text-[var(--accent)] transition-transform ${openIndex === i ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            {openIndex === i && (
              <p className="px-5 pb-4 text-sm text-[var(--muted)]">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}