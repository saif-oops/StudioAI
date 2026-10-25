import Link from "next/link";
import { Mail } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
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

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.67-.75 1.67-1.67a1.67 1.67 0 1 0-1.67 1.67m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function TelegramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border-color bg-background pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-5 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-10 items-center justify-center rounded-lg bg-[#ff0000] shadow-md">
                <div className="ml-0.5 h-0 w-0 border-y-[4.5px] border-l-[8px] border-y-transparent border-l-white" />
              </div>
              <div className="flex items-baseline">
                <span className="font-display text-lg font-bold tracking-tight text-white">Saflix</span>
                <span className="ml-1 font-display text-lg font-normal tracking-tight text-white/90">Studio</span>
                <sup className="ml-0.5 font-bold tracking-wider text-[#ff0000] text-[10px]">AI</sup>
              </div>
            </Link>
            <p className="text-sm text-muted max-w-xs leading-relaxed mb-6">
              The complete AI toolkit for modern YouTube creators. Script, optimize, analyze, and scale with ease.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/saif-oops"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-colors"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/saifali005/?isSelfProfile=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 transition-colors"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://instagram.com/beingsaifali1_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10 transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://t.me/SaifBM_7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-[#229ED9] hover:border-[#229ED9]/40 hover:bg-[#229ED9]/10 transition-colors"
              >
                <TelegramIcon />
              </a>
              <a
                href="mailto:saif1125748@gmail.com"
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-red-400 hover:border-red-400/40 hover:bg-red-400/10 transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="#features" className="hover:text-accent transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link></li>
              <li><Link href="#contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a
                  href="https://github.com/saif-oops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/saifali005/?isSelfProfile=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0A66C2] transition-colors flex items-center gap-2"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/beingsaifali1_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E1306C] transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/SaifBM_7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#229ED9] transition-colors flex items-center gap-2"
                >
                  <TelegramIcon className="w-3.5 h-3.5" />
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a href="mailto:saif1125748@gmail.com" className="hover:text-accent transition-colors">
                  saif1125748@gmail.com
                </a>
              </li>
              <li><Link href="#faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link href="#contact" className="hover:text-accent transition-colors">Inquiries</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-color pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Saflix AI Studio. Created by{" "}
            <a
              href="https://www.linkedin.com/in/saifali005/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline font-medium"
            >
              Saif Ali
            </a>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-muted">
            Made for YouTube Creators 🎬
          </div>
        </div>
      </div>
    </footer>
  );
}
