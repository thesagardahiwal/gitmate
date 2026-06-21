"use client";

import { Copy, TerminalSquare } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface TerminalProps {
  title?: string;
  content?: string;
  children?: React.ReactNode;
}

export function Terminal({ title = "gitmate-output", content, children }: TerminalProps) {
  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="bg-[#0D1117] border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full group/terminal transition-colors hover:border-[#58A6FF]/30">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-[#161B22]">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#30363D]"></div>
            <div className="w-3 h-3 rounded-full bg-[#30363D]"></div>
            <div className="w-3 h-3 rounded-full bg-[#30363D]"></div>
          </div>
          <div className="text-xs text-muted-foreground font-mono">{title}</div>
        </div>
        {content && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleCopy} 
            className="h-6 w-6 text-muted-foreground hover:text-foreground opacity-0 group-hover/terminal:opacity-100 transition-opacity"
            aria-label="Copy terminal content"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      
      <div className="p-4 flex-1 font-mono text-sm overflow-y-auto whitespace-pre-wrap break-words text-[#E6EDF3] leading-relaxed relative">
        {content ? (
          <div>
            <span className="text-[#58A6FF] mr-2">$</span>
            {content}
          </div>
        ) : children ? (
          children
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50 gap-3">
            <TerminalSquare className="h-8 w-8 opacity-20" />
            <p className="text-xs">Output will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
