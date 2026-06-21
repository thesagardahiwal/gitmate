"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2, FolderGit2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectName {
  name: string;
  tagline: string;
}

export default function ProjectNameGenerator() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ProjectName[]>([]);

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
            placeholder="e.g., A developer tool that automatically generates git commit messages using AI."
            className="min-h-[120px] resize-y bg-background font-mono text-sm border-border focus-visible:ring-1 focus-visible:ring-ring"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
        <div className="bg-[#0D1117] border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center px-4 py-2.5 border-b border-border bg-[#161B22]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#30363D]"></div>
              <div className="w-3 h-3 rounded-full bg-[#30363D]"></div>
              <div className="w-3 h-3 rounded-full bg-[#30363D]"></div>
            </div>
            <div className="ml-4 text-xs text-muted-foreground font-mono">terminal - suggestions</div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-md bg-muted" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      )}
    </div>
  );
}
