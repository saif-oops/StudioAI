import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-color bg-background pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-4 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-display font-bold text-xs"
                style={{ background: "linear-gradient(135deg, #ff0033 0%, #ff4400 100%)" }}
              >
                S
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-foreground leading-none">
                Studio<span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted max-w-xs leading-relaxed">
              The complete AI toolkit for YouTube creators. Stop guessing, start growing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="#features" className="hover:text-accent transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border-color pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Saflix AI Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-muted">
            Made for Creators 🎬
          </div>
        </div>
      </div>
    </footer>
  );
}
