"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb, TrendingUp, Target, OctagonAlert, CircleCheckBig, Sparkles, Copy, Check
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { addHistoryItem } from "@/lib/history";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { checkCredits, deductCredits } from "@/lib/credits";

type Idea = { title: string; description: string; viralityScore: number };

const audiences = ["General", "Gamers", "Tech Enthusiasts", "Entrepreneurs", "Students", "Fitness"];

export default function IdeasGenerator() {
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("General");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateIdeas = async () => {
    if (!niche.trim()) return;
    if (!user) {
      toast.error("Please sign in to generate video ideas.");
      return;
    }

    const creditStatus = await checkCredits(user.uid, 1, { email: user.email, name: user.displayName });
    if (!creditStatus.allowed) {
      toast.error(creditStatus.error || "Not enough credits.");
      return;
    }

    setLoading(true);
    setIdeas([]);
    try {
      const res = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, audience }),
      });
      const data = await res.json();
      if (data.success) {
        setIdeas(data.ideas);
        await deductCredits(user.uid, 1);
        toast.success("Ideas Ready!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
        addHistoryItem({ tool: "ideas-generator", input: niche, output: data.ideas });
      } else {
        toast.error("Generation Failed", { description: "Please try again.", icon: <OctagonAlert className="text-red-400" size={18} /> });
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const copyIdea = (idea: Idea, index: number) => {
    navigator.clipboard.writeText(`${idea.title}\n${idea.description}`);
    setCopiedIndex(index);
    toast.success("Copied!", { icon: <CircleCheckBig className="text-emerald-400" size={18} /> });
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-4xl">
        <PageHeader
          icon={Lightbulb}
          iconColor="text-yellow-400"
          iconBg="bg-yellow-400/10"
          title="Video Ideas"
          titleHighlight="Generator"
          subtitle="Never run out of content. Get 5 highly viral video concepts tailored to your niche and audience."
          badge="AI Brainstorm"
        />

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card-surface rounded-2xl p-5 space-y-4"
        >
          <div>
            <label className="text-xs text-muted font-medium block mb-1.5">Channel Niche / Topic</label>
            <input
              type="text"
              placeholder="e.g. Personal Finance, Tech Reviews, Minimalist Lifestyle..."
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateIdeas()}
              className="input-base"
            />
          </div>

          <div>
            <p className="text-xs text-muted font-medium mb-2">Target Audience</p>
            <div className="flex flex-wrap gap-2">
              {audiences.map((a) => (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className={`tag-chip ${audience === a ? "active" : ""}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <button onClick={generateIdeas} disabled={loading || !niche.trim()} className="btn-primary">
            <Sparkles size={15} />
            {loading ? "Brainstorming..." : "Generate Ideas"}
          </button>
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div className="mt-5 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 rounded-xl skeleton" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && ideas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-color py-16 text-center"
          >
            <div className="h-14 w-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-4">
              <Lightbulb size={24} className="text-yellow-400" />
            </div>
            <p className="font-semibold text-foreground text-sm">Need Inspiration?</p>
            <p className="mt-1 text-xs text-muted max-w-xs">
              Enter your niche above and let AI generate viral video concepts for you.
            </p>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {!loading && ideas.length > 0 && (
            <motion.div
              className="mt-5 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">Top 5 Concepts</p>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Target size={14} /> Audience: <span className="text-foreground">{audience}</span>
                </div>
              </div>
              {ideas.map((idea, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                  className="rounded-xl border border-border-color bg-surface/40 hover:border-accent/25 p-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold text-accent px-1.5 py-0.5 rounded bg-accent/10 uppercase tracking-wide">
                          Idea {index + 1}
                        </span>
                        <span className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${idea.viralityScore >= 90 ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                          <TrendingUp size={10} /> {idea.viralityScore}/100 Virality
                        </span>
                      </div>
                      <h3 className="font-medium text-sm text-foreground">{idea.title}</h3>
                      <p className="text-xs text-muted/90 mt-1 leading-relaxed">{idea.description}</p>
                    </div>
                    <button
                      onClick={() => copyIdea(idea, index)}
                      className={`h-8 w-8 shrink-0 flex items-center justify-center rounded-lg transition-all ${
                        copiedIndex === index ? "bg-green-600 text-white" : "border border-border-color bg-background hover:border-accent/30 hover:text-accent"
                      }`}
                    >
                      {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
