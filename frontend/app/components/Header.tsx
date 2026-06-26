export default function Header() {
  return (
    <header className="relative mb-8 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] px-8 py-12">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(255,77,46,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
            Generate. Analyze. Go Viral.
          </p>

          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            Create Content That{" "}
            <span className="inline-block rounded-md border border-[var(--accent)]/50 bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
              Performs
            </span>
          </h2>

          <p className="mt-4 text-[var(--muted)]">
            Create better content with AI insights, built for creators who want to grow faster.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--background)] px-4 py-3">
            <p className="text-xs text-[var(--muted)]">AI Credits</p>
            <p className="font-display font-bold text-[var(--highlight)]">
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