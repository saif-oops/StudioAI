import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    { name: "Priya M.", role: "Tech Reviewer", text: "My CTR went up since I started using the title scores. Genuinely useful.", initials: "PM" },
    { name: "Marcus J.", role: "Content Strategist", text: "The script outlines save me at least an hour per video. Game changer.", initials: "MJ" },
    { name: "Luna R.", role: "Vlogger", text: "I used to spend hours on thumbnails. Now it takes minutes.", initials: "LR" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-14">
        <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--accent)] uppercase">
          Loved By Creators
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Don&apos;t Just Take <span className="text-[var(--accent)]">Our Word</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.name} className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
            <div className="flex gap-1 text-[var(--highlight)] mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-[var(--foreground)]">{r.text}</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[var(--accent)] flex items-center justify-center font-display font-bold text-black text-sm">
                {r.initials}
              </div>
              <div>
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-[var(--muted)]">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}