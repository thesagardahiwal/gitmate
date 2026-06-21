"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Technology, generateGitignore } from "@/lib/gitignore-templates";
import { Check, FileCode, Download } from "lucide-react";
import { toast } from "sonner";
import { Terminal } from "@/components/shared/terminal";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";

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
      toast.error("Please select at least one technology.");
      return;
    }
    const content = generateGitignore(selectedTechs);
    setGeneratedContent(content);
    toast.success("GitIgnore generated successfully.");
  };

  const handleDownload = () => {
    if (!generatedContent) {
      toast.error("Generate a file first!");
      return;
    }
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

  useKeyboardShortcuts({
    onGenerate: handleGenerate,
  });

  return (
    <div className="w-full max-w-5xl py-12 mx-auto">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">GitIgnore Generator</h1>
        <p className="text-muted-foreground">
          Select the technologies you are using to generate a standard .gitignore file instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="flex flex-col h-full border border-border bg-card shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="bg-secondary/30 border-b border-border pb-4">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileCode className="h-4 w-4 text-muted-foreground" />
              Select Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex-1">
            <div className="flex flex-wrap gap-2">
              {ALL_TECHNOLOGIES.map((tech) => {
                const isSelected = selectedTechs.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                      isSelected
                        ? "bg-primary/10 text-[#58A6FF] border-[#58A6FF]/30 shadow-sm"
                        : "bg-secondary text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                    {tech}
                  </button>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t border-border mt-auto px-6 py-4">
            <Button onClick={handleGenerate} className="w-full">
              Generate .gitignore
            </Button>
          </CardFooter>
        </Card>

        <div className="flex flex-col h-[500px] relative group/container">
          <Terminal title=".gitignore" content={generatedContent} />
          {generatedContent && (
            <div className="absolute top-12 right-6">
              <Button size="sm" className="gap-2 shadow-lg" onClick={handleDownload}>
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
