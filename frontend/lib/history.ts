import { auth, db } from "@/lib/firebase";
import { ref, set, remove, get } from "firebase/database";

export type HistoryItem = {
  id: string;
  tool:
    | "title-generator"
    | "thumbnail-analyzer"
    | "description-generator"
    | "script-generator"
    | "thumbnail-generator"
    | "ideas-generator"
    | "tag-generator"
    | "shorts-generator"
    | "trend-radar"
    | "video-pack";
  input: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  output: any;
  createdAt: number;
};

const STORAGE_KEY = "studioai_history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addHistoryItem(item: Omit<HistoryItem, "id" | "createdAt">): HistoryItem {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  const updated = [newItem, ...history].slice(0, 50);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  // Cloud sync to Realtime Database
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const historyRef = ref(db, `users/${currentUser.uid}/history/${newItem.id}`);
      set(historyRef, newItem).catch((err) => {
        console.warn("Cloud history sync warning:", err);
      });
    }
  } catch (err) {
    console.warn("Cloud history sync error:", err);
  }

  return newItem;
}

export function deleteHistoryItem(id: string) {
  const updated = getHistory().filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  // Cloud delete
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const historyRef = ref(db, `users/${currentUser.uid}/history/${id}`);
      remove(historyRef).catch((err) => {
        console.warn("Cloud history delete warning:", err);
      });
    }
  } catch (err) {
    console.warn("Cloud history delete error:", err);
  }
}

export function clearHistory() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }

  // Cloud clear
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const historyRef = ref(db, `users/${currentUser.uid}/history`);
      remove(historyRef).catch((err) => {
        console.warn("Cloud history clear warning:", err);
      });
    }
  } catch (err) {
    console.warn("Cloud history clear error:", err);
  }
}

/**
 * Fetches cloud history and merges with local storage.
 */
export async function syncCloudHistory(userId: string): Promise<HistoryItem[]> {
  try {
    const historyRef = ref(db, `users/${userId}/history`);
    const snap = await get(historyRef);
    if (snap.exists()) {
      const cloudData = snap.val();
      const cloudItems: HistoryItem[] = Object.values(cloudData);

      const localItems = getHistory();
      // Merge unique by id
      const map = new Map<string, HistoryItem>();
      [...localItems, ...cloudItems].forEach((item) => {
        if (item && item.id) map.set(item.id, item);
      });
      const merged = Array.from(map.values())
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 50);

      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      }
      return merged;
    }
  } catch (err) {
    console.warn("Cloud history fetch warning:", err);
  }
  return getHistory();
}
