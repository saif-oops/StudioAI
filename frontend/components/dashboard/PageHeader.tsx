"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  badge?: string;
  badgeColor?: "accent" | "success" | "highlight";
  children?: React.ReactNode;
}

export default function PageHeader({
  icon: Icon,
  iconColor = "text-accent",
  iconBg = "bg-accent/10",
  title,
  titleHighlight,
  subtitle,
  badge,
  badgeColor = "accent",
  children,
}: PageHeaderProps) {
  const badgeClass =
    badgeColor === "success"
      ? "badge badge-success"
      : badgeColor === "highlight"
      ? "badge badge-highlight"
      : "badge badge-accent";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Icon Badge */}
          <div
            className={`h-12 w-12 shrink-0 rounded-2xl ${iconBg} flex items-center justify-center ring-1 ring-white/5 shadow-lg`}
          >
            <Icon className={iconColor} size={22} strokeWidth={2} />
          </div>

          {/* Title block */}
          <div>
            {badge && (
              <span className={`${badgeClass} mb-2 inline-flex`}>
                {badge}
              </span>
            )}
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight">
              {title}{" "}
              {titleHighlight && (
                <span className="gradient-text">{titleHighlight}</span>
              )}
            </h1>
            <p className="mt-1 text-sm text-muted leading-relaxed">{subtitle}</p>
          </div>
        </div>

        {/* Right slot (optional actions) */}
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>

      {/* Divider */}
      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-border-color to-transparent" />
    </motion.div>
  );
}

