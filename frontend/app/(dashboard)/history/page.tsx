"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History as HistoryIcon, Trash2, FileText, Search,
  PenLine, Palette, Image as ImageIcon, Clapperboard, ChevronDown, ChevronUp, ExternalLink,
  Tags, Lightbulb, Flame, Radar, Sparkles,
} from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { getHistory, deleteHistoryItem, clearHistory, syncCloudHistory, HistoryItem } from "@/lib/history";
import { useAuth } from "@/components/AuthProvider";

const allTools = [
  "all",
  "title-generator",
  "script-generator",
  "video-pack",
  "shorts-generator",
  "trend-radar",
  "ideas-generator",
  "tag-generator",
  "thumbnail-analyzer",
  "thumbnail-generator",
  "description-generator",
];

const toolLabels: Record<string, string> = {
  all: "All",
  "title-generator": "Titles",
  "script-generator": "Script",
  "video-pack": "Video Pack",
  "shorts-generator": "Shorts",
  "trend-radar": "Trend Radar",
  "ideas-generator": "Ideas",
  "tag-generator": "Tags",
  "thumbnail-analyzer": "Analyzer",
  "thumbnail-generator": "Thumbnail",
  "description-generator": "Description",
};

const toolIcons: Record<string, React.ElementType> = {
  "title-generator": PenLine,
  "script-generator": Clapperboard,
  "video-pack": Sparkles,
  "shorts-generator": Flame,
  "trend-radar": Radar,
  "ideas-generator": Lightbulb,
  "tag-generator": Tags,
  "thumbnail-analyzer": Palette,
  "thumbnail-generator": ImageIcon,
  "description-generator": FileText,
};

const toolColors: Record<string, string> = {
  "title-generator": "text-blue-400",
  "script-generator": "text-red-400",
  "video-pack": "text-amber-400",
  "shorts-generator": "text-rose-400",
  "trend-radar": "text-cyan-400",
  "ideas-generator": "text-yellow-400",
  "tag-generator": "text-teal-400",
  "thumbnail-analyzer": "text-green-400",
  "thumbnail-generator": "text-purple-400",
  "description-generator": "text-orange-400",
};

const toolBgs: Record<string, string> = {
  "title-generator": "bg-blue-500/10",
  "script-generator": "bg-red-500/10",
  "video-pack": "bg-amber-500/10",
  "shorts-generator": "bg-rose-500/10",
  "trend-radar": "bg-cyan-500/10",
  "ideas-generator": "bg-yellow-500/10",
  "tag-generator": "bg-teal-500/10",
  "thumbnail-analyzer": "bg-green-500/10",
  "thumbnail-generator": "bg-purple-500/10",
  "description-generator": "bg-orange-500/10",
};

const toolPaths: Record<string, string> = {
  "title-generator": "/title-generator",
  "script-generator": "/script-generator",
  "video-pack": "/video-pack",
  "shorts-generator": "/shorts-generator",
  "trend-radar": "/trend-radar",
  "ideas-generator": "/ideas-generator",
  "tag-generator": "/tag-generator",
  "thumbnail-analyzer": "/thumbnail-analyzer",
  "thumbnail-generator": "/thumbnail-generator",
  "description-generator": "/description-generator",
};

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      setHistory(getHistory());
      if (user) {
        syncCloudHistory(user.uid).then((items) => {
          setHistory(items);
        });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [user]);

  const filtered = history.filter((h) => {
    const toolMatch = filter === "all" || h.tool === filter;
    const searchMatch = !search || h.input.toLowerCase().includes(search.toLowerCase());
    return toolMatch && searchMatch;
  });

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    if (confirm("Delete all history? This cannot be undone.")) {
      clearHistory();
      setHistory([]);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(id)) {
        n.delete(id);
      } else {
        n.add(id);
      }
      return n;
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-4xl">
        <PageHeader
          icon={HistoryIcon}
          iconColor="text-muted"
          iconBg="bg-white/5"
          title="Generation"
          titleHighlight="History"
          subtitle="Browse, search, and revisit all your previously generated content."
        >
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 rounded-lg border border-red-800/30 bg-red-950/15 px-3 py-2 text-xs text-red-400 hover:bg-red-950/30 transition-colors"
            >
              <Trash2 size={12} />
              Clear All
            </button>
          )}
        </PageHeader>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="relative mb-4"
        >
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base pl-9"
          />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="flex flex-wrap gap-2 mb-5"
        >
          {allTools.map((tool) => (
            <button
              key={tool}
              onClick={() => setFilter(tool)}
              className={`tag-chip ${filter === tool ? "active" : ""}`}
            >
              {toolLabels[tool]}
              {tool !== "all" && (
                <span className="ml-1 text-[9px] opacity-60">
                  ({history.filter((h) => h.tool === tool).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="h-16 w-16 rounded-2xl bg-white/4 flex items-center justify-center mb-4">
              <HistoryIcon size={28} className="text-muted/40" />
            </div>
            <p className="font-semibold text-foreground">
              {search || filter !== "all" ? "No results found" : "No history yet"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {search || filter !== "all"
                ? "Try a different search or filter"
                : "Start generating to see your history here!"}
            </p>
            {!search && filter === "all" && (
              <Link href="/title-generator" className="mt-4 btn-primary text-sm px-5 py-2.5">
                Start Generating
              </Link>
            )}
          </motion.div>
        )}

        {/* History List */}
        {filtered.length > 0 && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xs text-muted">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
            {filtered.map((item, idx) => {
              const Icon = toolIcons[item.tool] || FileText;
              const color = toolColors[item.tool] || "text-muted";
              const bg = toolBgs[item.tool] || "bg-white/5";
              const path = toolPaths[item.tool] || "/dashboard";
              const isExpanded = expanded.has(item.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.35 }}
                  className="glass-card-surface rounded-xl overflow-hidden hover:border-accent/20 transition-all"
                >
                  {/* Header row */}
                  <div className="flex items-center gap-3 px-4 py-3.5">
                    <div className={`h-9 w-9 shrink-0 rounded-xl ${bg} flex items-center justify-center`}>
                      <Icon size={15} className={color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold uppercase tracking-wide ${color}`}>
                          {item.tool?.replace(/-/g, " ") || "Unknown Tool"}
                        </span>
                        <span className="text-[10px] text-muted">{timeAgo(item.createdAt)}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate mt-0.5">{item.input}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Link
                        href={path}
                        title="Use Again"
                        className="h-7 w-7 flex items-center justify-center rounded-lg border border-border-color text-muted hover:text-accent hover:border-accent/30 transition-all"
                      >
                        <ExternalLink size={12} />
                      </Link>
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="h-7 w-7 flex items-center justify-center rounded-lg border border-border-color text-muted hover:text-foreground transition-all"
                      >
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="h-7 w-7 flex items-center justify-center rounded-lg border border-red-800/20 text-red-400/60 hover:text-red-400 hover:border-red-800/40 hover:bg-red-950/20 transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Expandable output */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1 border-t border-border-color">
                          {item.tool === "title-generator" && Array.isArray(item.output) && (
                            <ul className="space-y-1.5 mt-2">
                              {item.output.map((t: { title: string; score: number }, i: number) => (
                                <li key={i} className="flex items-center justify-between text-xs rounded-lg bg-background/50 px-3 py-2">
                                  <span className="text-foreground/80">{t.title}</span>
                                  <span className="text-green-400 font-bold ml-3 shrink-0">{t.score}%</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {item.tool === "thumbnail-analyzer" && item.output && (
                            <div className="mt-2 text-xs space-y-2">
                              <p className="font-semibold text-foreground">CTR Score: <span className="text-accent">{item.output.score}/100</span></p>
                              {item.output.strengths?.slice(0, 2).map((s: string, i: number) => (
                                <p key={i} className="text-green-400">✅ {s}</p>
                              ))}
                            </div>
                          )}
                          {(["description-generator", "script-generator", "thumbnail-generator"].includes(item.tool)) && item.output && (
                            <div className="mt-2 text-xs text-muted/80 leading-relaxed line-clamp-4">
                              {typeof item.output.description === "string"
                                ? item.output.description
                                : item.output.hook || JSON.stringify(item.output).slice(0, 200)}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>
    </main>
  );
}

