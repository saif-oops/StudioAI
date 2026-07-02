import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Priya M.",
      role: "Tech Reviewer",
      text: "My CTR went up since I started using the title scores. Genuinely useful.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Marcus J.",
      role: "Content Strategist",
      text: "The script outlines save me at least an hour per video. Game changer.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Luna R.",
      role: "Vlogger",
      text: "I used to spend hours on thumbnails. Now it takes minutes.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80"
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
      <div className="text-center mb-14">
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Don&apos;t Just Take <span className="text-accent">Our Word</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.name} className="rounded-2xl border border-border-color bg-surface p-6">
            <div className="flex gap-1 text-highlight mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-foreground">{r.text}</p>
            <div className="mt-5 flex items-center gap-3">
              <img
                src={r.image}
                alt={r.name}
                className="h-10 w-10 rounded-full object-cover border border-border-color bg-surface"
              />
              <div>
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-muted">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}