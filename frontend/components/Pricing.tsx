"use client";

import { useState } from "react";
import { Check, X, Zap, Crown, Star, Lightbulb } from "lucide-react";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      icon: Zap,
      name: "Free",
      desc: "Try it out, no card needed",
      priceMonthly: 0,
      priceYearly: 0,
      cta: "Start Free",
      highlighted: false,
      features: [
        { text: "5 credits / month", included: true },
        { text: "Title Generator", included: true },
        { text: "Description Generator", included: true },
        { text: "Thumbnail Analyzer", included: true },
        { text: "Watermark on thumbnails", included: true },
        { text: "Script Generator", included: false },
        { text: "Thumbnail Generator", included: false },
        { text: "Full history", included: false },
      ],
    },
    {
      icon: Star,
      name: "Pro",
      desc: "For creators posting weekly",
      priceMonthly: 12,
      priceYearly: 8,
      cta: "Choose Pro",
      highlighted: true,
      features: [
        { text: "60 credits / month", included: true },
        { text: "All 6 AI tools unlocked", included: true },
        { text: "No watermark", included: true },
        { text: "Full history (unlimited)", included: true },
        { text: "CTR score analytics", included: true },
        { text: "Priority generation speed", included: true },
        { text: "API access", included: false },
        { text: "Dedicated support", included: false },
      ],
    },
    {
      icon: Crown,
      name: "Creator+",
      desc: "For studios and teams",
      priceMonthly: 29,
      priceYearly: 19,
      cta: "Choose Creator+",
      highlighted: false,
      features: [
        { text: "Unlimited credits", included: true },
        { text: "All 6 AI tools unlocked", included: true },
        { text: "No watermark", included: true },
        { text: "Full history + export", included: true },
        { text: "CTR score analytics", included: true },
        { text: "Priority generation speed", included: true },
        { text: "Early access to new tools", included: true },
        { text: "Dedicated support", included: true },
      ],
    },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-8">
        <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--accent)] uppercase">
          Simple Pricing
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Plans for Every <span className="text-[var(--accent)]">Creator</span>
        </h2>
        <p className="mt-4 text-[var(--muted)]">
          Start free. Upgrade when you're ready to scale.
        </p>
      </div>

      <div className="mx-auto mb-12 max-w-2xl rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-5 text-center text-sm leading-relaxed">
        <Lightbulb size={16} className="text-[var(--accent)] inline-block mr-2 -mt-0.5" />
        Freelancers charge <span className="font-bold text-[var(--accent)]">$15-$40</span> for a video's title, description, and script. With Saflix Pro, you get <span className="font-bold text-[var(--highlight)]">60 credits/month</span> for just <span className="font-bold text-[var(--accent)]">$12</span> that's under $0.20 per credit.
      </div>

      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] p-1">
          <button
            onClick={() => setYearly(false)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${!yearly ? "bg-[var(--accent)] text-white" : "text-[var(--muted)]"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${yearly ? "bg-[var(--accent)] text-white" : "text-[var(--muted)]"}`}
          >
            Yearly <span className="text-xs opacity-80">Save 33%</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const price = yearly ? plan.priceYearly : plan.priceMonthly;
          return (
            <div key={plan.name} className={`relative rounded-2xl border p-8 ${plan.highlighted ? "border-[var(--accent)] bg-[var(--surface)]" : "border-[var(--border-color)] bg-[var(--surface)]"}`}>
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-4 py-1 text-xs font-bold text-white">
                  Most Popular
                </span>
              )}

              <Icon size={22} className="text-[var(--accent)]" strokeWidth={2} />
              <h3 className="mt-4 font-display text-2xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{plan.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">${price}</span>
                <span className="text-[var(--muted)] text-sm">/mo</span>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2 text-sm">
                    {f.included ? <Check size={16} className="text-[var(--accent)] shrink-0" /> : <X size={16} className="text-[var(--muted)]/40 shrink-0" />}
                    <span className={f.included ? "" : "text-[var(--muted)]/50"}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <a href="/dashboard" className={`mt-8 block w-full rounded-xl px-6 py-3 text-center font-semibold transition-colors ${plan.highlighted ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]" : "border border-[var(--border-color)] hover:bg-[var(--background)]"}`}>
                {plan.cta}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}