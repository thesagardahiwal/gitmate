"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2 } from "lucide-react";
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
      toast.success("Generated project names!");
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
    <div className="container max-w-4xl py-12 px-4 mx-auto">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Project Name Generator</h1>
        <p className="text-lg text-muted-foreground">
          Brainstorm clever and catchy names for your next big idea.
        </p>
      </div>

      <Card className="border-primary/20 shadow-sm mb-12">
        <CardHeader>
          <CardTitle>Describe your project</CardTitle>
          <CardDescription>What is it and who is it for?</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder='e.g., "A tool that generates git commit messages"'
            className="min-h-[120px] resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={loading} className="w-full" size="lg">
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
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Suggestions</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((project, index) => (
                <Card key={index} className="flex flex-col h-full bg-muted/30 hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-primary">{project.name}</CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(project.name)} className="h-8 w-8 -mt-2 -mr-2">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{project.tagline}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
