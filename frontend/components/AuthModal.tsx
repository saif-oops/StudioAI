"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthProvider";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { X, Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const router = useRouter();

  if (!isAuthModalOpen) return null;

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    try {
      setResetLoading(true);
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      toast.success("Password reset email sent!", {
        description: `Check your inbox at ${email} for instructions to reset your password.`,
      });
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Failed to send reset email.";
      toast.error(msg);
    } finally {
      setResetLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      await signInWithPopup(auth, googleProvider);
      closeAuthModal();
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Error signing in with Google", error);
      const fbErr = error as { code?: string; message?: string };
      if (fbErr?.code === "auth/popup-closed-by-user") {
        // User just closed the popup, no need to show an aggressive error
        return;
      }
      if (fbErr?.code === "auth/popup-blocked") {
        toast.error("Popup blocked", { description: "Please allow popups for localhost to sign in." });
        return;
      }
      if (fbErr?.code === "auth/unauthorized-domain") {
        toast.error("Domain unauthorized", { description: "Add localhost to Authorized Domains in Firebase Console." });
        return;
      }
      if (fbErr?.code === "auth/operation-not-allowed") {
        toast.error("Sign-in method disabled", { description: "Enable Google sign-in in your Firebase Console." });
        return;
      }
      toast.error(fbErr?.message || "Failed to sign in with Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      closeAuthModal();
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Auth error", error);
      const fbErr = error as { code?: string; message?: string };
      if (fbErr?.code === "auth/invalid-credential" || fbErr?.code === "auth/wrong-password" || fbErr?.code === "auth/user-not-found") {
        toast.error("Invalid credentials", { description: isLogin ? "Email or password incorrect. If new, click 'Create Account'." : "Please check your details." });
        return;
      }
      if (fbErr?.code === "auth/email-already-in-use") {
        toast.error("Email in use", { description: "This email is already registered. Please sign in instead." });
        setIsLogin(true);
        return;
      }
      if (fbErr?.code === "auth/weak-password") {
        toast.error("Password too weak", { description: "Please use at least 6 characters." });
        return;
      }
      if (fbErr?.code === "auth/operation-not-allowed") {
        toast.error("Sign-in method disabled", { description: "Enable Email/Password in your Firebase Console." });
        return;
      }
      toast.error(fbErr?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f0f] shadow-2xl p-8 mx-4"
        >
          <button
            onClick={closeAuthModal}
            className="absolute right-6 top-6 text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center mb-8">
            <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-[#ff0000] shadow-[0_0_20px_rgba(255,0,0,0.4)] mb-6">
              <div className="ml-1 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isLogin ? "Welcome back" : "Create Account"}
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              {isLogin ? "Sign in to continue your adventure." : "Join Saflix AI Studio today."}
            </p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="relative flex items-center justify-center gap-3 w-full bg-white text-black font-semibold px-6 py-3.5 rounded-xl transition-all hover:bg-zinc-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mb-6"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-border-color"></div>
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Or Email</span>
            <div className="h-px flex-1 bg-border-color"></div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={16} className="text-zinc-500" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#151515] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={16} className="text-zinc-500" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#151515] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
              />
            </div>

            {isLogin && (
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={resetLoading}
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  {resetLoading ? "Sending link..." : resetSent ? "Reset link sent! Resend?" : "Forgot password?"}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-[#ff0000] hover:bg-[#cc0000] text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                isLogin ? "Sign In →" : "Create Account →"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-400">
              {isLogin ? "New to Saflix AI?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ff0000] font-semibold hover:underline"
              >
                {isLogin ? "Create Account" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
