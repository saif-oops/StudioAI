"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-surface/30" />
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold md:text-5xl mb-4">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Start for free, upgrade when you need more power.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-surface rounded-3xl p-8 border border-border-color flex flex-col"
          >
            <h3 className="text-xl font-bold text-foreground mb-2">Creator Basic</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-display font-bold">$0</span>
              <span className="text-muted text-sm">/month</span>
            </div>
            <p className="text-sm text-muted mb-8 pb-8 border-b border-border-color">
              Perfect for getting started and testing the tools.
            </p>
            <ul className="space-y-4 mb-8 flex-1">
              {["150 AI Credits per month", "Basic Title Generation", "Standard Thumbnail Analysis", "5 Video Scripts per month"].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-5 w-5 rounded-full bg-surface flex items-center justify-center text-foreground">
                    <Check size={12} />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>
            <button className="w-full rounded-xl border border-border-color bg-surface py-3.5 text-sm font-semibold hover:bg-surface-hover transition-colors">
              Get Started Free
            </button>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-3xl p-8 border border-accent/30 bg-accent/5 flex flex-col"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              Pro Creator
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-display font-bold text-accent">$19</span>
              <span className="text-muted text-sm">/month</span>
            </div>
            <p className="text-sm text-muted mb-8 pb-8 border-b border-border-color">
              Everything you need to scale your channel fast.
            </p>
            <ul className="space-y-4 mb-8 flex-1">
              {["Unlimited AI Credits", "Advanced Tag Generator", "Priority Video Ideas", "Unlimited Script Generation", "High-res Thumbnail Gen"].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Check size={12} />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full py-3.5 text-sm">
              Upgrade to Pro
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
