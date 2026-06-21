"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Technology, generateGitignore } from "@/lib/gitignore-templates";
import { Copy, Download, Check, FileCode } from "lucide-react";
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
      toast.error("Please select at least one technology.");
      return;
    }
    const content = generateGitignore(selectedTechs);
    setGeneratedContent(content);
    toast.success("GitIgnore generated successfully.");
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

        <div className="flex flex-col h-full bg-[#0D1117] border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center px-4 py-2.5 border-b border-border bg-[#161B22] justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#30363D]"></div>
                <div className="w-3 h-3 rounded-full bg-[#30363D]"></div>
                <div className="w-3 h-3 rounded-full bg-[#30363D]"></div>
              </div>
              <div className="text-xs text-muted-foreground font-mono">.gitignore</div>
            </div>
            {generatedContent && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={handleCopy}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={handleDownload}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-0 relative">
            {generatedContent ? (
              <Textarea
                value={generatedContent}
                readOnly
                className="w-full h-full min-h-[300px] font-mono text-sm resize-none bg-transparent border-0 focus-visible:ring-0 p-4 text-[#E6EDF3] leading-relaxed rounded-none"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50 gap-3">
                <FileCode className="h-8 w-8 opacity-20" />
                <p className="text-xs font-mono">Output will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
