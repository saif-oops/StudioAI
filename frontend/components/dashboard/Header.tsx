import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="relative mb-10 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] px-8 py-12">
      <div
        className="absolute inset-0 animated-glow"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,77,46,0.22) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,184,0,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-3 py-1">
            <Sparkles size={12} className="text-[var(--accent)]" />
            <span className="font-display text-xs font-semibold tracking-[0.15em] text-[var(--accent)] uppercase">
              Generate. Analyze. Go Viral.
            </span>
          </div>

          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Create Content That{" "}
            <span className="inline-block rounded-md border border-[var(--accent)]/50 bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
              Performs
            </span>
          </h2>

          <p className="mt-5 text-[var(--muted)]">
            Create better content with AI insights, built for creators who want to grow faster.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--background)] px-5 py-4">
            <p className="text-xs text-[var(--muted)]">AI Credits</p>
            <p className="mt-1 font-display text-lg font-bold text-[var(--highlight)]">
              120 / 150
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] font-display font-bold text-black">
            SA
          </div>
        </div>
      </div>
    </header>
  );
}