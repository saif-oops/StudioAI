export default function StatsShowcase() {
  const stats = [
    {
      icon: "🎬",
      value: "6",
      label: "AI Tools",
      desc: "Everything a creator needs, in one studio.",
    },
    {
      icon: "⚡",
      value: "30s",
      label: "Avg. Generation Time",
      desc: "From idea to ready-to-use content.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-3">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6">
                  <div className="flex items-center gap-2 text-2xl font-display font-bold">
                    <span>{stat.icon}</span>
                    <span className="text-[var(--accent)]">{stat.value}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium">{stat.label}</p>
                  <p className="mt-4 text-xs text-[var(--muted)]">{stat.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex-1 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-8 flex flex-col justify-between">
              <h3 className="font-display text-3xl font-bold leading-tight">
                Unlock your channel&apos;s <span className="text-[var(--accent)]">full potential</span> with AI.
              </h3>
              <a href="/dashboard" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors">
                Get Started →
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-color)] min-h-[400px]">
            <video
              src="/videos/promo-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="font-display text-3xl font-bold text-white">
                Start Creating
              </h3>
              <a href="/dashboard" className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm hover:bg-black/60 transition-colors">
                Try it free →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}