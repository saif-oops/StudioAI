export type HistoryItem = {
  id: string;
  tool: "title-generator" | "thumbnail-analyzer" | "description-generator" | "script-generator" | "thumbnail-generator" | "ideas-generator" | "tag-generator";
  input: string;
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

export function addHistoryItem(item: Omit<HistoryItem, "id" | "createdAt">) {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  const updated = [newItem, ...history].slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newItem;
}

export function deleteHistoryItem(id: string) {
  const updated = getHistory().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
