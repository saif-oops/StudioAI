"use client";

import Link from "next/link";
import { Mail, Globe, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative border-t border-border-color bg-surface py-10 md:py-16 overflow-hidden">
      {/* Background glow orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,0,51,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand section */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-display font-bold text-black text-sm">
                S
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                Studio<span className="text-accent">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted">
              Premium AI tools crafted for creators to generate titles, scripts, and analyze thumbnails for viral growth.
            </p>
            <div className="flex gap-4 pt-2 text-muted">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="#features" className="hover:text-accent transition-colors">Features</Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-accent transition-colors">Pricing</Link>
              </li>
              <li>
                <span className="text-muted/40 cursor-not-allowed">Roadmap (Soon)</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#how-it-works" className="hover:text-accent flex items-center gap-1 transition-colors">
                  Vision <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent flex items-center gap-1 transition-colors">
                  Documentation <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent flex items-center gap-1 transition-colors">
                  Architecture <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-accent" />
                <span>support@studioai.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe size={14} className="text-accent" />
                <span>studioai.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-border-color/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {currentYear} StudioAI. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-accent cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-accent cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
