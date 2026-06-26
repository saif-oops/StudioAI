export default function Features() {
  const features = [
    { icon: "✏️", title: "Title Generator", desc: "Generate viral, high-CTR titles scored by AI.", color: "#3B82F6" },
    { icon: "🎨", title: "Thumbnail Analyzer", desc: "Get instant feedback on contrast, text, and emotion.", color: "#10B981" },
    { icon: "🖼️", title: "Thumbnail Generator", desc: "Upload your photo, AI creates a click-worthy thumbnail.", color: "#FF4D2E" },
    { icon: "📝", title: "Description Generator", desc: "SEO-friendly descriptions and tags in seconds.", color: "#A855F7" },
    { icon: "🎬", title: "Script Generator", desc: "Hooks and outlines that keep viewers watching.", color: "#FFB800" },
    { icon: "📜", title: "History", desc: "All your generated content saved in one place.", color: "#8B8B8E" },
  ];

  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-14">
        <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--accent)] uppercase">
          Everything You Need
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          One Studio. <span className="text-[var(--accent)]">Six Tools.</span>
        </h2>
        <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
          Stop switching between five different apps to make one video.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent)]/40 hover:-translate-y-1"
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
              style={{ backgroundColor: `${f.color}1a` }}
            >
              {f.icon}
            </div>
            <h3 className="mb-2 font-display text-lg font-bold">{f.title}</h3>
            <p className="text-sm text-[var(--muted)]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}