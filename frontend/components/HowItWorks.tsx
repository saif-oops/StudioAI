export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Pick a Tool", desc: "Choose from title, thumbnail, description, or script generator." },
    { num: "02", title: "Add Your Topic", desc: "Type your video idea, upload a photo, or describe your style." },
    { num: "03", title: "AI Generates", desc: "Get results in seconds — titles, scores, thumbnails, scripts." },
    { num: "04", title: "Copy & Publish", desc: "Use it directly, regenerate, or save it to your history." },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-14">
        <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--accent)] uppercase">
          Simple Process
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          How It <span className="text-[var(--accent)]">Works</span>
        </h2>
        <p className="mt-4 text-[var(--muted)]">
          From idea to published video in under a minute.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {steps.map((step, i) => (
          <div key={step.num} className="relative">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 h-full">
              <p className="font-display text-3xl font-bold text-[var(--accent)]/30">
                {step.num}
              </p>
              <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 text-[var(--muted)]">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}