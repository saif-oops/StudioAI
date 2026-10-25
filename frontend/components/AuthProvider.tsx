"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, db } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Check and initialize user document in Realtime Database
          const userRef = ref(db, `users/${currentUser.uid}`);
          const userSnap = await get(userRef);
          
          if (!userSnap.exists()) {
            await set(userRef, {
              email: currentUser.email,
              name: currentUser.displayName,
              photoURL: currentUser.photoURL,
              credits: 150,
              tier: "Free",
              createdAt: new Date().toISOString(),
            });
          }
        } catch (dbError) {
          console.warn("Realtime Database sync notice (check database rules):", dbError);
        }
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Client-side route protection
  useEffect(() => {
    if (!loading) {
      if (!user && pathname.startsWith("/dashboard")) {
        router.push("/");
        const timer = setTimeout(() => {
          openAuthModal();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }

  // Prevent rendering protected routes until redirected if unauthorized
  if (!user && pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthModalOpen, openAuthModal, closeAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
}
