import { MousePointerClick, FileEdit, Sparkles, Copy } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: MousePointerClick, num: "01", title: "Pick a Tool", desc: "Choose from title, thumbnail, description, or script generator." },
    { icon: FileEdit, num: "02", title: "Add Your Topic", desc: "Type your video idea, upload a photo, or describe your style." },
    { icon: Sparkles, num: "03", title: "AI Generates", desc: "Get results in seconds — titles, scores, thumbnails, scripts." },
    { icon: Copy, num: "04", title: "Copy & Publish", desc: "Use it directly, regenerate, or save it to your history." },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-12 md:py-20">
      <div className="text-center mb-14">
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          How It <span className="text-accent">Works</span>
        </h2>
        <p className="mt-4 text-muted">
          From idea to published video in under a minute.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="relative">
              <div className="rounded-2xl border border-border-color bg-surface p-6 h-full">
                <div className="flex items-center justify-between">
                  <Icon size={22} className="text-accent" strokeWidth={2} />
                  <p className="font-display text-2xl font-bold text-accent/30">
                    {step.num}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 text-muted">
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
