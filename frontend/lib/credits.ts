import { ref, get, set, update } from "firebase/database";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { RAZORPAY_PRO_PAYMENT_URL } from "@/lib/constants";

export function notifyInsufficientCredits(message?: string) {
  toast.error(message || "Not enough credits.", {
    id: "insufficient-credits",
    description: "Upgrade to Pro to unlock 1,000 monthly credits & priority AI generation.",
    action: {
      label: "Upgrade Plan",
      onClick: () => window.open(RAZORPAY_PRO_PAYMENT_URL, "_blank"),
    },
  });
}

export interface CreditResult {
  allowed: boolean;
  credits: number;
  error?: string;
}

/**
 * Checks if a user has sufficient credits before generation.
 */
export async function checkCredits(
  userId: string,
  cost: number = 1,
  userData?: { email?: string | null; name?: string | null }
): Promise<CreditResult> {
  try {
    const userRef = ref(db, `users/${userId}`);
    const userSnap = await get(userRef);

    if (userSnap.exists()) {
      const credits = userSnap.val()?.credits ?? 150;
      if (credits < cost) {
        const errorMsg = `You need ${cost} credit${cost > 1 ? "s" : ""}, but only have ${credits} left.`;
        notifyInsufficientCredits(errorMsg);
        return {
          allowed: false,
          credits,
          error: errorMsg,
        };
      }
      return { allowed: true, credits };
    } else {
      // User doesn't have a record yet, initialize with 150
      const initialCredits = 150;
      await set(userRef, {
        email: userData?.email || "",
        name: userData?.name || "Creator",
        credits: initialCredits,
        tier: "Free",
        createdAt: new Date().toISOString(),
      });
      return { allowed: true, credits: initialCredits };
    }
  } catch (error) {
    console.warn("Credit check warning:", error);
    // Graceful fallback so creators aren't locked out on database issues
    return { allowed: true, credits: 150 };
  }
}

/**
 * Deducts credits after a successful generation.
 */
export async function deductCredits(userId: string, cost: number = 1): Promise<number> {
  try {
    const userRef = ref(db, `users/${userId}`);
    const userSnap = await get(userRef);
    if (userSnap.exists()) {
      const current = userSnap.val()?.credits ?? 150;
      const newCredits = Math.max(0, current - cost);
      await update(userRef, { credits: newCredits });
      return newCredits;
    }
  } catch (error) {
    console.warn("Credit deduction warning:", error);
  }
  return 150;
}
