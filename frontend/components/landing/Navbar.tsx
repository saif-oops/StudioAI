"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, Menu } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen || authModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, authModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
    setAuthModal(null);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border-color bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-display font-bold text-black text-sm">
              S
            </div>
            <h1 className="font-display text-xl font-bold tracking-tight">
              Studio<span className="text-accent">AI</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => setAuthModal("login")}
              className="rounded-lg border border-border-color px-4 py-2 text-sm font-medium hover:bg-surface transition-colors cursor-pointer text-foreground"
            >
              Login
            </button>
            <button
              onClick={() => setAuthModal("signup")}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover transition-colors cursor-pointer"
            >
              Sign Up Free
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground p-1 z-50 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[73px] z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[73px] left-0 right-0 z-50 border-b border-border-color bg-background/95 p-6 shadow-2xl md:hidden flex flex-col gap-4 text-center"
            >
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-muted hover:text-foreground">How It Works</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-muted hover:text-foreground">Features</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-muted hover:text-foreground">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-muted hover:text-foreground">FAQ</a>
              
              <hr className="border-border-color/40 my-1" />
              
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-xl border border-border-color py-3 text-sm font-semibold hover:bg-surface transition-colors text-foreground block text-center"
              >
                Dashboard
              </Link>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModal("login");
                }}
                className="w-full rounded-xl border border-border-color py-3 text-sm font-semibold hover:bg-surface transition-colors cursor-pointer text-foreground animate-none"
              >
                Login
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModal("signup");
                }}
                className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-black hover:bg-accent-hover transition-colors cursor-pointer"
              >
                Sign Up Free
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {authModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModal(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border-color bg-surface p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setAuthModal(null)}
                className="absolute top-4 right-4 text-muted hover:text-foreground p-1.5 rounded-lg border border-border-color bg-background/50 cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>

              <div className="mb-6 flex justify-center">
                <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center font-display font-bold text-black text-lg">
                  S
                </div>
              </div>

              <h2 className="text-center font-display text-2xl font-bold text-foreground">
                {authModal === "login" ? "Welcome Back" : "Create Your Account"}
              </h2>
              <p className="text-center text-sm text-muted mt-1.5">
                {authModal === "login"
                  ? "Enter your credentials to access your studio"
                  : "Start creating optimized, high-CTR content today"}
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {authModal === "signup" && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-3.5 text-muted/60" size={18} />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl bg-background border border-border-color py-3 pl-12 pr-4 text-foreground outline-none focus:border-accent/50 transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-muted/60" size={18} />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-background border border-border-color py-3 pl-12 pr-4 text-foreground outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-muted/60" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl bg-background border border-border-color py-3 pl-12 pr-12 text-foreground outline-none focus:border-accent/50 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3 text-muted/60 hover:text-foreground cursor-pointer transition-colors p-1.5 rounded-lg"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-accent py-3.5 mt-2 font-display font-bold text-black hover:bg-accent-hover transition-colors cursor-pointer"
                >
                  {authModal === "login" ? "Sign In" : "Get Started Free"}
                </button>
              </form>

              <p className="text-center text-xs text-muted mt-6">
                {authModal === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      onClick={() => setAuthModal("signup")}
                      className="text-accent hover:underline font-semibold cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setAuthModal("login")}
                      className="text-accent hover:underline font-semibold cursor-pointer"
                    >
                      Login
                    </button>
                  </>
                )}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
