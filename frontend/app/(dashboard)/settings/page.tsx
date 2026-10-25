"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings as SettingsIcon, User, Bell, Shield, CreditCard,
  ChevronDown, ChevronUp, Check, Zap, Loader2, ExternalLink,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";
import { ref, get, update } from "firebase/database";
import { updatePassword, updateProfile } from "firebase/auth";
import { RAZORPAY_PRO_PAYMENT_URL } from "@/lib/constants";

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

const accentColors = [
  { label: "Red", value: "#ff0033" },
  { label: "Purple", value: "#8b5cf6" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Gold", value: "#ffd600" },
];

export default function Settings() {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState<string | null>("profile");
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [language, setLanguage] = useState("English");
  const [accentColor, setAccentColor] = useState("#ff0033");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [creditAlerts, setCreditAlerts] = useState(true);
  const [credits, setCredits] = useState<number>(150);
  const [tier, setTier] = useState<string>("Free");
  const [saved, setSaved] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      setName(user.displayName || "");
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef).then((snap) => {
        if (snap.exists()) {
          const val = snap.val();
          if (val.name) setName(val.name);
          if (val.niche) setNiche(val.niche);
          if (val.language) setLanguage(val.language);
          if (val.accentColor) setAccentColor(val.accentColor);
          if (val.emailNotifs !== undefined) setEmailNotifs(val.emailNotifs);
          if (val.creditAlerts !== undefined) setCreditAlerts(val.creditAlerts);
          if (val.credits !== undefined) setCredits(val.credits);
          if (val.tier) setTier(val.tier);
        }
      }).catch((err) => {
        console.warn("Settings fetch warning:", err);
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in first.");
      return;
    }
    setSaved(true);
    try {
      const userRef = ref(db, `users/${user.uid}`);
      await update(userRef, {
        name,
        niche,
        language,
        accentColor,
        emailNotifs,
        creditAlerts,
      });

      if (name && name !== user.displayName) {
        await updateProfile(user, { displayName: name });
      }

      toast.success("Settings saved!", { description: "Your profile has been saved to the cloud." });
    } catch (err: unknown) {
      console.error("Save error:", err);
      const msg = err instanceof Error ? err.message : "Failed";
      toast.error("Save notice", { description: "Updated locally. Cloud sync: " + msg });
    } finally {
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleUpdatePassword = async () => {
    if (!user) return;
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    try {
      setUpdatingPassword(true);
      await updatePassword(user, newPassword);
      toast.success("Password updated successfully!");
      setNewPassword("");
    } catch (err: unknown) {
      console.error(err);
      const isRecentLogin =
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code: string }).code === "auth/requires-recent-login";
      if (isRecentLogin) {
        toast.error("Security timeout", { description: "Please log out and log back in before changing your password." });
      } else {
        const msg = err instanceof Error ? err.message : "Failed to update password.";
        toast.error(msg);
      }
    } finally {
      setUpdatingPassword(false);
    }
  };

  const sections = [
    {
      id: "profile",
      title: "Profile",
      desc: "Your creator identity and preferences",
      icon: User,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      id: "youtube",
      title: "YouTube Integration",
      desc: "Connect your channel to sync analytics",
      icon: YoutubeIcon,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
    },
    {
      id: "appearance",
      title: "Appearance",
      desc: "Accent color and display preferences",
      icon: SettingsIcon,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      id: "notifications",
      title: "Notifications",
      desc: "Configure alerts and email preferences",
      icon: Bell,
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
    },
    {
      id: "billing",
      title: "Credits & Billing",
      desc: "Manage subscription and credit usage",
      icon: CreditCard,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
    },
    {
      id: "security",
      title: "Security",
      desc: "Password and API token management",
      icon: Shield,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
  ];

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 max-w-3xl">
        <PageHeader
          icon={SettingsIcon}
          iconColor="text-muted"
          iconBg="bg-white/5"
          title="Account"
          titleHighlight="Settings"
          subtitle="Manage your profile, integrations, appearance, and billing preferences."
        />

        <div className="space-y-3">
          {sections.map((section) => {
            const Icon = section.icon;
            const isOpen = expanded === section.id;

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="glass-card-surface rounded-2xl overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(section.id)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/2 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`h-10 w-10 rounded-xl ${section.iconBg} flex items-center justify-center`}>
                      <Icon className={section.iconColor} size={18} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm text-foreground">{section.title}</p>
                      <p className="text-xs text-muted mt-0.5">{section.desc}</p>
                    </div>
                  </div>
                  <div className="text-muted shrink-0">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-border-color space-y-4">
                        {/* Profile */}
                        {section.id === "profile" && (
                          <>
                            <div>
                              <label className="text-xs text-muted font-medium block mb-1.5">Display Name</label>
                              <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="input-base" />
                            </div>
                            <div>
                              <label className="text-xs text-muted font-medium block mb-1.5">Creator Niche</label>
                              <input type="text" placeholder="e.g. Tech, Gaming, Fitness..." value={niche} onChange={(e) => setNiche(e.target.value)} className="input-base" />
                            </div>
                            <div>
                              <label className="text-xs text-muted font-medium block mb-1.5">Language</label>
                              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="input-base">
                                {["English", "Hindi", "Spanish", "French", "German", "Portuguese"].map((l) => (
                                  <option key={l} value={l} style={{ background: "#111" }}>{l}</option>
                                ))}
                              </select>
                            </div>
                            <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
                              {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
                            </button>
                          </>
                        )}

                        {/* YouTube */}
                        {section.id === "youtube" && (
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <p className="text-sm font-medium text-foreground">Not connected</p>
                              <p className="text-xs text-muted mt-0.5">Connect to unlock real analytics data</p>
                            </div>
                            <button className="btn-primary text-xs px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">
                              Connect Channel
                            </button>
                          </div>
                        )}

                        {/* Appearance */}
                        {section.id === "appearance" && (
                          <>
                            <div>
                              <p className="text-xs text-muted font-medium mb-3">Accent Color</p>
                              <div className="flex gap-3">
                                {accentColors.map((c) => (
                                  <button
                                    key={c.value}
                                    onClick={() => setAccentColor(c.value)}
                                    title={c.label}
                                    className="relative h-9 w-9 rounded-xl border-2 transition-all"
                                    style={{
                                      background: c.value,
                                      borderColor: accentColor === c.value ? "white" : "transparent",
                                      boxShadow: accentColor === c.value ? `0 0 12px ${c.value}60` : "none",
                                    }}
                                  >
                                    {accentColor === c.value && (
                                      <Check size={14} className="text-white absolute inset-0 m-auto" />
                                    )}
                                  </button>
                                ))}
                              </div>
                              <p className="text-[10px] text-muted mt-2">Color theme change applies on next visit</p>
                            </div>
                          </>
                        )}

                        {/* Notifications */}
                        {section.id === "notifications" && (
                          <div className="space-y-4">
                            {[
                              { label: "Email Notifications", desc: "Receive generation reports", value: emailNotifs, set: setEmailNotifs },
                              { label: "Credit Alerts", desc: "Notify when credits run low", value: creditAlerts, set: setCreditAlerts },
                            ].map((pref) => (
                              <div key={pref.label} className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-foreground">{pref.label}</p>
                                  <p className="text-xs text-muted">{pref.desc}</p>
                                </div>
                                <button
                                  onClick={() => pref.set(!pref.value)}
                                  className={`relative h-6 w-11 rounded-full transition-colors ${pref.value ? "bg-accent" : "bg-border-color"}`}
                                >
                                  <motion.span
                                    animate={{ x: pref.value ? 20 : 2 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm"
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Billing */}
                        {section.id === "billing" && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-semibold text-foreground">{tier} Plan</p>
                                <p className="text-xs text-muted">{credits} AI credits available</p>
                              </div>
                              <span className="badge badge-accent">Active</span>
                            </div>

                            {/* Credit breakdown */}
                            <div>
                              <p className="text-xs text-muted font-medium mb-3">Live Credit Balance</p>
                              <div className="rounded-xl border border-border-color bg-white/2 p-3 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted">Available Credits</span>
                                  <span className="text-sm font-bold text-accent">{credits} / 150</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-border-color overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: "linear-gradient(90deg, #ff0000 0%, #ff4400 100%)" }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((credits / 150) * 100, 100)}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Zap size={16} className="text-accent" />
                                <div>
                                  <p className="text-sm font-semibold text-foreground">Upgrade to Pro</p>
                                  <p className="text-xs text-muted">1,000 credits/mo + priority generation</p>
                                </div>
                              </div>
                              <a
                                href={RAZORPAY_PRO_PAYMENT_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md"
                              >
                                <span>Upgrade</span>
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Security */}
                        {section.id === "security" && (
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs text-muted font-medium block mb-1.5">New Password</label>
                              <input
                                type="password"
                                placeholder="Enter at least 6 characters"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="input-base"
                              />
                            </div>
                            <button
                              onClick={handleUpdatePassword}
                              disabled={updatingPassword || !newPassword}
                              className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-50"
                            >
                              {updatingPassword ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <Check size={14} />
                              )}
                              Update Password
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
