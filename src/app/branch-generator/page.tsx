"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function BranchGenerator() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

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
      toast.success("Generated branch names!");
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
    <div className="container max-w-3xl py-12 px-4 mx-auto">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Branch Name Generator</h1>
        <p className="text-lg text-muted-foreground">
          Convert your feature or bug description into standard, readable git branch names.
        </p>
      </div>

      <Card className="border-primary/20 shadow-sm mb-8">
        <CardHeader>
          <CardTitle>Describe your task</CardTitle>
          <CardDescription>What are you working on?</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder='e.g., "Add authentication module"'
            className="min-h-[120px] resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CardContent>
        <CardFooter>
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

      {(loading || results.length > 0) && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Suggestions</h2>
          
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-3">
              {results.map((branch, index) => (
                <Card key={index} className="flex flex-row items-center justify-between p-4 bg-muted/50">
                  <p className="font-mono text-sm break-all pr-4">{branch}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(branch)} className="shrink-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
