import { Sparkles, Rocket, Zap, Check } from "lucide-react";

type AnalysisResultProps = {
  analysis: {
    score: number;
    strengths: string[];
    improvements: string[];
  };
};

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  return (
    <div className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">AI Analysis Result</h2>
        <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-4 py-2 text-sm text-accent">
          <Sparkles size={14} />
          AI Powered
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border-color bg-surface p-8 transition-colors hover:border-accent/40">
          <p className="text-muted">CTR Score</p>
          <div className="mt-6 flex justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-10 border-accent">
              <div className="text-center">
                <p className="font-display text-5xl font-bold">{analysis.score}</p>
                <p className="text-muted">/100</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border-color bg-surface p-8 transition-colors hover:border-green-500/40">
          <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-bold">
            <Rocket size={20} className="text-green-400" />
            Strengths
          </h3>
          <div className="space-y-3">
            {analysis.strengths.map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl bg-background p-3 text-sm text-foreground">
                <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border-color bg-surface p-8 transition-colors hover:border-highlight/40">
          <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-bold">
            <Zap size={20} className="text-highlight" />
            Improvements
          </h3>
          <div className="space-y-3">
            {analysis.improvements.map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl bg-background p-3 text-sm text-foreground">
                <span className="text-highlight shrink-0">•</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}