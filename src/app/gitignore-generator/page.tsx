"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Technology, generateGitignore } from "@/lib/gitignore-templates";
import { Copy, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const ALL_TECHNOLOGIES: Technology[] = [
  "Node.js",
  "React",
  "Next.js",
  "TypeScript",
  "MongoDB",
  "Express",
  "Python",
];

export default function GitIgnoreGenerator() {
  const [selectedTechs, setSelectedTechs] = useState<Technology[]>([]);
  const [generatedContent, setGeneratedContent] = useState("");

  const toggleTech = (tech: Technology) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleGenerate = () => {
    if (selectedTechs.length === 0) {
      toast.error("Please select at least one technology");
      return;
    }
    const content = generateGitignore(selectedTechs);
    setGeneratedContent(content);
    toast.success("GitIgnore generated!");
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".gitignore";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloading .gitignore");
  };

  return (
    <div className="container max-w-4xl py-12 px-4 mx-auto">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">GitIgnore Generator</h1>
        <p className="text-lg text-muted-foreground">
          Select the technologies you are using to generate a standard .gitignore file instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="flex flex-col h-full border-primary/20 shadow-sm">
          <CardHeader>
            <CardTitle>Select Technologies</CardTitle>
            <CardDescription>Click to select the frameworks and languages in your project.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex flex-wrap gap-3">
              {ALL_TECHNOLOGIES.map((tech) => {
                const isSelected = selectedTechs.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-background hover:bg-secondary border-border"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="h-4 w-4" />}
                    {tech}
                  </button>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} className="w-full" size="lg">
              Generate .gitignore
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col h-full border-primary/20 shadow-sm">
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>Your generated .gitignore will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <Textarea
              value={generatedContent}
              readOnly
              placeholder="Output will appear here..."
              className="min-h-[300px] font-mono text-sm resize-none bg-muted/50"
            />
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCopy}
              disabled={!generatedContent}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button
              className="flex-1"
              onClick={handleDownload}
              disabled={!generatedContent}
            >
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
