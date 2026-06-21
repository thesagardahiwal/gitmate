import { useEffect } from "react";

interface ShortcutOptions {
  onGenerate?: () => void;
  onCopy?: () => void;
  onFocusInput?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts({ onGenerate, onCopy, onFocusInput, onEscape }: ShortcutOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Enter
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        onGenerate?.();
      }
      
      // Cmd/Ctrl + Shift + C
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        onCopy?.();
      }
      
      // Focus Input (/)
      if (e.key === "/" && document.activeElement?.tagName !== "TEXTAREA" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        onFocusInput?.();
      }

      // Escape
      if (e.key === "Escape") {
        onEscape?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onGenerate, onCopy, onFocusInput, onEscape]);
}
