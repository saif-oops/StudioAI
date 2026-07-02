import { PenLine, Palette, ImageIcon, FileText, Clapperboard, History } from "lucide-react";

export default function Features() {
  const features = [
    { icon: PenLine, title: "Title Generator", desc: "Generate viral, high-CTR titles scored by AI.", color: "#3B82F6" },
    { icon: Palette, title: "Thumbnail Analyzer", desc: "Get instant feedback on contrast, text, and emotion.", color: "#10B981" },
    { icon: ImageIcon, title: "Thumbnail Generator", desc: "Upload your photo, AI creates a click-worthy thumbnail.", color: "#FF0033" },
    { icon: FileText, title: "Description Generator", desc: "SEO-friendly descriptions and tags in seconds.", color: "#A855F7" },
    { icon: Clapperboard, title: "Script Generator", desc: "Hooks and outlines that keep viewers watching.", color: "#FFD600" },
    { icon: History, title: "History", desc: "All your generated content saved in one place.", color: "#8B8B8E" },
  ];

  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-14">
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          One Studio. <span className="text-accent">Six Tools.</span>
        </h2>
        <p className="mt-4 text-muted max-w-xl mx-auto">
          Stop switching between five different apps to make one video.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="group rounded-2xl border border-border-color bg-surface p-6 transition-all hover:border-accent/40 hover:-translate-y-1"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${f.color}1a` }}
              >
                <Icon size={22} style={{ color: f.color }} strokeWidth={2} />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold">{f.title}</h3>
              <p className="text-sm text-muted">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}