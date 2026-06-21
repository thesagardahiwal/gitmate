"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Rocket, Copy } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Terminal } from "@/components/shared/terminal";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useLocalHistory } from "@/hooks/use-local-history";

const EXAMPLES = [
  "Built JWT authentication system with role-based access",
  "Fixed login validation bugs on mobile",
  "Created user dashboard layout",
];

export default function GenerateEverything() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    commit: string;
    branch: string;
    projectName: string;
    tagline: string;
  } | null>(null);

  const { saveHistory } = useLocalHistory();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a description of your changes.");
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const res = await fetch("/api/generate-everything", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResults(data);
      saveHistory({
        type: "generate-everything",
        input: description,
        output: data
      });
      toast.success("Generated all outputs successfully.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = () => {
    if (!results) return;
    const fullText = `Commit:\n${results.commit}\nBranch:\n${results.branch}\nProject:\n${results.projectName}\nTagline:\n${results.tagline}`;
    navigator.clipboard.writeText(fullText);
    toast.success("Copied everything to clipboard!");
  };

  useKeyboardShortcuts({
    onGenerate: handleGenerate,
    onCopy: handleCopyAll,
    onFocusInput: () => document.getElementById("generate-input")?.focus(),
  });

  return (
    <div className="w-full max-w-5xl py-12 mx-auto">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Generate Everything</h1>
        <p className="text-muted-foreground">
          Enter a single description to generate your commit, branch name, project name, and tagline instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <Card className="border border-border bg-card shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-secondary/30 border-b border-border pb-4">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Rocket className="h-4 w-4 text-muted-foreground" />
                Input Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Textarea
                id="generate-input"
                placeholder="e.g., Built JWT authentication system with role-based access and fixed login validation bugs"
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
            <CardFooter className="pt-0 flex gap-4">
              <Button onClick={handleGenerate} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate All"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Outputs</h2>
            {results && (
              <Button variant="outline" size="sm" onClick={handleCopyAll} className="gap-2">
                <Copy className="h-4 w-4" />
                Copy All
              </Button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-[#0D1117] border border-border rounded-xl p-4 flex flex-col gap-2">
                  <Skeleton className="h-4 w-1/4 bg-muted" />
                  <Skeleton className="h-4 w-3/4 bg-muted" />
                </div>
              ))}
            </div>
          ) : results ? (
            <div className="grid grid-cols-1 gap-4">
              <div className="h-28">
                <Terminal title="git commit -m" content={results.commit} />
              </div>
              <div className="h-28">
                <Terminal title="git checkout -b" content={results.branch} />
              </div>
              <div className="grid grid-cols-2 gap-4 h-28">
                <Terminal title="project_name" content={results.projectName} />
                <Terminal title="tagline" content={results.tagline} />
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-[300px] border border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground">
              Run generator to see outputs
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
