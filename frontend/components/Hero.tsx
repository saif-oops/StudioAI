export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(255,77,46,0.25) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--accent)] uppercase">
          Generate. Analyze. Go Viral.
        </p>

        <h1 className="mt-5 font-display text-5xl font-bold leading-[1.1] md:text-7xl">
          Create Videos That{" "}
          <span className="inline-block rounded-md border border-[var(--accent)]/50 bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
            Get Watched
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
          The all-in-one AI studio for YouTube creators. Generate titles, analyze thumbnails, write scripts, and grow faster — all in one place.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex">
            {["🧑", "👩", "🧔", "👨"].map((emoji, i) => (
              <div
                key={i}
                className="h-9 w-9 -ml-2 first:ml-0 flex items-center justify-center rounded-full border-2 border-[var(--background)] bg-[var(--surface)] text-sm"
              >
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--muted)]">
            <span className="font-bold text-[var(--accent)]">500+</span> creators already growing with Saflix
          </p>
        </div>

        <div className="mt-10 flex gap-4">
          <a href="/dashboard" className="rounded-xl bg-[var(--accent)] px-8 py-4 font-display font-bold text-black hover:bg-[var(--accent-hover)] transition-colors">
            Start Free →
          </a>
          <a href="#how-it-works" className="rounded-xl border border-[var(--border-color)] px-8 py-4 font-medium hover:bg-[var(--surface)] transition-colors">
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}