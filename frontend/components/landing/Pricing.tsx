"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import { RAZORPAY_PRO_PAYMENT_URL } from "@/lib/constants";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for testing the waters and exploring AI.",
      price: "Free",
      period: "",
      features: [
        "3 Video Packs / month",
        "5 Shorts Scripts / month",
        "Title & Description Generators",
        "Standard PDF Exports",
        "Community Support",
      ],
      cta: "Start Free",
      href: "/dashboard",
      isExternal: false,
      highlight: false,
    },
    {
      name: "Pro Creator",
      description: "For creators who want to go viral consistently.",
      price: "$29",
      period: "/month",
      features: [
        "Unlimited Video Packs",
        "Unlimited Shorts & Hooks",
        "Full Trend Radar Access",
        "YouTube Feed Simulator",
        "Priority Generation Speed",
        "Premium PDF Blueprints",
      ],
      cta: "Upgrade to Pro",
      href: RAZORPAY_PRO_PAYMENT_URL,
      isExternal: true,
      highlight: true,
    },
    {
      name: "Agency",
      description: "For teams managing multiple channels.",
      price: "$99",
      period: "/month",
      features: [
        "Everything in Pro",
        "Custom Branding on PDFs",
        "AI Voice Generation (Soon)",
        "Team Collaboration (5 Users)",
        "Priority 24/7 Support",
      ],
      cta: "Contact Sales",
      href: "#contact",
      isExternal: false,
      highlight: false,
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff0000]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6"
          >
            Simple pricing, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-orange-500">infinite ROI.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            One viral video pays for a lifetime of Saflix. Choose your weapon.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 backdrop-blur-sm border ${
                plan.highlight
                  ? "bg-[#181818] border-[#ff0000]/50 shadow-2xl shadow-[#ff0000]/10 scale-100 md:scale-105 z-10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#ff0000] to-orange-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full flex items-center gap-1 shadow-lg">
                    <Sparkles size={12} /> Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground min-h-[40px]">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} className={plan.highlight ? "text-[#ff0000] shrink-0 mt-0.5" : "text-muted-foreground shrink-0 mt-0.5"} />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.isExternal ? (
                <a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all ${
                    plan.highlight
                      ? "bg-[#ff0000] text-white hover:bg-red-700 shadow-lg shadow-[#ff0000]/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <Link
                  href={plan.href}
                  className={`w-full flex items-center justify-center py-3.5 rounded-xl text-sm font-bold transition-all ${
                    plan.highlight
                      ? "bg-[#ff0000] text-white hover:bg-red-700 shadow-lg shadow-[#ff0000]/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {plan.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
