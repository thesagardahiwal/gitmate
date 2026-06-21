import { useState, useEffect } from "react";

export type HistoryItem = {
  id: string;
  type: "commit" | "branch" | "project-name" | "gitignore" | "generate-everything";
  input: string;
  output: any;
  timestamp: number;
};

export function useLocalHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("gitmate-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveHistory = (item: Omit<HistoryItem, "id" | "timestamp">) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    
    setHistory((prev) => {
      // Keep only the last 10 items
      const newHistory = [newItem, ...prev].slice(0, 10);
      localStorage.setItem("gitmate-history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const deleteHistory = (id: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter(item => item.id !== id);
      localStorage.setItem("gitmate-history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return { history, saveHistory, deleteHistory };
}
