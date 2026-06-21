"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2, FolderGit2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Terminal } from "@/components/shared/terminal";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useLocalHistory } from "@/hooks/use-local-history";

interface ProjectName {
  name: string;
  tagline: string;
}

const EXAMPLES = [
  "A developer tool that generates git commits using AI",
  "A habit tracker app focused on mental health",
  "A command line interface for Docker management",
];

export default function ProjectNameGenerator() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ProjectName[]>([]);
  const { saveHistory } = useLocalHistory();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a project description.");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch("/api/project-name-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResults(data.projects || []);
      saveHistory({ type: "project-name", input: description, output: data.projects });
      toast.success("Generated project names successfully.");
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
    onFocusInput: () => document.getElementById("project-input")?.focus(),
  });

  return (
    <div className="w-full max-w-5xl py-12 mx-auto">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Project Name Generator</h1>
        <p className="text-muted-foreground">
          Brainstorm clever and catchy names for your next big idea.
        </p>
      </div>

      <Card className="border border-border bg-card shadow-sm rounded-xl overflow-hidden mb-10">
        <CardHeader className="bg-secondary/30 border-b border-border pb-4">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <FolderGit2 className="h-4 w-4 text-muted-foreground" />
            Project Description
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Textarea
            id="project-input"
            placeholder="e.g., A developer tool that automatically generates git commit messages using AI."
            className="min-h-[120px] resize-y bg-background font-mono text-sm border-border focus-visible:ring-1 focus-visible:ring-ring"
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
          <Button onClick={handleGenerate} disabled={loading} className="w-full md:w-auto ml-auto px-8">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Names"
            )}
          </Button>
        </CardFooter>
      </Card>

      {(loading || results.length > 0) && (
        <div className="min-h-[300px]">
          <Terminal title="terminal - suggestions">
            <div className="p-2 w-full">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-md bg-muted" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {results.map((project, index) => (
                    <div key={index} className="group relative p-4 rounded-md border border-border bg-secondary/30 hover:border-[#58A6FF]/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-mono text-lg font-semibold text-[#58A6FF]">{project.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCopy(project.name)} 
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 text-muted-foreground hover:text-foreground hover:bg-secondary"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-sans">{project.tagline}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Terminal>
        </div>
      )}
    </div>
  );
}
