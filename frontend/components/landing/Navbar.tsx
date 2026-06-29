import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border-color bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-display font-bold text-black text-sm">
            S
          </div>
          <h1 className="font-display text-xl font-bold tracking-tight">
            Saflix <span className="text-accent">AI</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </div>

        <div className="flex gap-3">
          <Link href="/dashboard" className="rounded-lg border border-border-color px-4 py-2 text-sm font-medium hover:bg-surface transition-colors">
            Login
          </Link>
          <Link href="/dashboard" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover transition-colors">
            Sign Up Free
          </Link>
        </div>
      </div>
    </nav>
  );
}