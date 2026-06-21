"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2, GitBranch } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Terminal } from "@/components/shared/terminal";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useLocalHistory } from "@/hooks/use-local-history";

const EXAMPLES = [
  "Add authentication module",
  "Fix mobile navigation bug",
  "Update dependencies",
];

export default function BranchGenerator() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const { saveHistory } = useLocalHistory();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a task description.");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch("/api/branch-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResults(data.branches || []);
      saveHistory({ type: "branch", input: description, output: data.branches });
      toast.success("Generated branch names successfully.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  useKeyboardShortcuts({
    onGenerate: handleGenerate,
    onFocusInput: () => document.getElementById("branch-input")?.focus(),
  });

  return (
    <div className="w-full max-w-4xl py-12 mx-auto">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Branch Name Generator</h1>
        <p className="text-muted-foreground">
          Convert your feature or bug description into standard, readable git branch names.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <Card className="border border-border bg-card shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-secondary/30 border-b border-border pb-4">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                Task Description
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Textarea
                id="branch-input"
                placeholder="e.g., Add authentication module"
                className="min-h-[160px] resize-y bg-background font-mono text-sm border-border focus-visible:ring-1 focus-visible:ring-ring"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="mt-4 space-y-2">
                <span className="text-xs text-muted-foreground">Example Prompts:</span>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLES.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => setDescription(ex)}
                      className="text-xs font-mono text-muted-foreground/80 bg-secondary px-2 py-1 rounded-full border border-border hover:bg-muted hover:text-foreground transition-colors text-left"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button onClick={handleGenerate} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Branches"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex flex-col h-[400px]">
          <Terminal title="git checkout -b">
            {loading ? (
              <div className="space-y-4 w-full">
                <Skeleton className="h-4 w-3/4 bg-muted" />
                <Skeleton className="h-4 w-1/2 bg-muted" />
                <Skeleton className="h-4 w-2/3 bg-muted" />
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-0 w-full">
                {results.map((branch, index) => (
                  <div key={index} className="group flex items-start justify-between gap-4 py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-start gap-3">
                      <span className="text-[#238636] select-none">★</span>
                      <span className="text-foreground break-all">{branch}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleCopy(branch)} 
                      className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : null}
          </Terminal>
        </div>
      </div>
    </div>
  );
}
