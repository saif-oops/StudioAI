"use client";

import Link from "next/link";
import { MoveLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-0 animated-glow pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,0,51,0.15) 0%, transparent 60%)",
        }}
      />
      
      <div className="relative z-10 max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft border border-accent/20 mb-6">
          <HelpCircle className="text-accent" size={32} />
        </div>
        <h1 className="font-display text-7xl font-bold tracking-tight text-foreground">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Page Not Found</h2>
        <p className="mt-3 text-muted">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-display font-bold text-white hover:bg-accent-hover transition-colors"
          >
            <MoveLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
