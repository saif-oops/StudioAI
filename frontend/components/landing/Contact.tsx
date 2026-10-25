"use client";

import { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Send,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

// Custom SVG Icons for accurate branding
function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.67-.75 1.67-1.67a1.67 1.67 0 1 0-1.67 1.67m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function TelegramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const email = "saif1125748@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!", {
      description: email,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMessage.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    const subject = encodeURIComponent(`Saflix AI Inquiry from ${formName || "Creator"}`);
    const body = encodeURIComponent(
      `Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client...", {
      description: "Send your inquiry directly to " + email,
    });
  };

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-semibold text-red-400 mb-4 shadow-inner">
            <Sparkles size={12} />
            Let&apos;s Connect
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
            Have Questions or <span className="gradient-text">Feedback?</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted max-w-xl mx-auto">
            Reach out directly for support, feature suggestions, or collaborations. Send a message or connect through any of our channels.
          </p>
        </div>

        {/* Email & Direct Message Block */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-3xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
          {/* Left: Email & Socials */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6">
                <Mail size={22} />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Drop an Email
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Prefer email or direct message? Send a note anytime and I&apos;ll get back to you as soon as possible.
              </p>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between gap-3 mb-6">
                <span className="text-sm font-mono text-zinc-300 truncate">
                  {email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium text-white transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social Channels */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Connect Directly
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://github.com/saif-oops"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
                  >
                    <GithubIcon className="w-4 h-4 text-white" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/saifali005/?isSelfProfile=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-[#0A66C2]/20 bg-[#0A66C2]/10 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/20 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://instagram.com/beingsaifali1_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-[#E1306C]/20 bg-[#E1306C]/10 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/20 transition-all"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://t.me/SaifBM_7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-[#229ED9]/20 bg-[#229ED9]/10 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-[#229ED9] hover:border-[#229ED9]/40 hover:bg-[#229ED9]/20 transition-all"
                  >
                    <TelegramIcon className="w-4 h-4 text-[#229ED9]" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-muted">
                ⚡ Typical response time: <span className="text-white font-medium">Within 24 hours</span>
              </p>
            </div>
          </div>

          {/* Right: Quick Inquiry Form */}
          <div className="lg:col-span-3 lg:border-l lg:border-white/5 lg:pl-10">
            <h4 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-red-400" />
              Quick Message
            </h4>

            <form onSubmit={handleSendForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help you grow on YouTube?"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer"
              >
                <Send size={15} />
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
