import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, GitBranch, GitCommit, FileCode, FolderGit2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-20 px-4 md:pt-32">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-24 space-y-8">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">
          GitMate
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
          Git utilities developers actually use.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Generate commit messages, branch names, gitignore files, and project names in seconds.
        </p>
        
        {/* Fake Terminal Preview */}
        <div className="max-w-xl mx-auto mt-8 text-left bg-[#0D1117] border border-border rounded-lg overflow-hidden shadow-sm">
          <div className="flex items-center px-4 py-2 border-b border-border bg-[#161B22]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F85149]"></div>
              <div className="w-3 h-3 rounded-full bg-[#E3B341]"></div>
              <div className="w-3 h-3 rounded-full bg-[#238636]"></div>
            </div>
            <div className="ml-4 text-xs text-muted-foreground font-mono">bash</div>
          </div>
          <div className="p-4 font-mono text-sm space-y-2">
            <div className="text-foreground">
              <span className="text-[#58A6FF]">$</span> gitmate generate commit
            </div>
            <div className="text-[#238636] flex items-center gap-2">
              <span>✓</span> feat(auth): add JWT authentication
            </div>
          </div>
        </div>

        <div className="pt-8">
          <Button asChild size="lg" className="text-base px-8 h-12 shadow-sm rounded-md transition-all hover:shadow-md">
            <Link href="/commit-generator">
              Start Generating <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group outline-none">
            <Card className="h-full rounded-xl bg-card border border-border transition-all duration-200 group-hover:bg-secondary group-hover:border-muted-foreground/30 shadow-none hover:shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-medium text-foreground">{tool.name}</CardTitle>
                </div>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}

const tools = [
  {
    name: "Commit Generator",
    description: "Generate conventional commit messages from plain English descriptions using AI.",
    href: "/commit-generator",
    icon: GitCommit,
  },
  {
    name: "Branch Generator",
    description: "Create standard, readable branch names from feature or bug descriptions.",
    href: "/branch-generator",
    icon: GitBranch,
  },
  {
    name: "GitIgnore Generator",
    description: "Generate .gitignore files locally based on the technologies you are using.",
    href: "/gitignore-generator",
    icon: FileCode,
  },
  {
    name: "Project Name Generator",
    description: "Brainstorm clever and catchy names for your next big project with AI.",
    href: "/project-name-generator",
    icon: FolderGit2,
  },
];
