import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, GitBranch, GitCommit, FileCode, FolderGit2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-16 px-4 md:pt-32">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-24 space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 pb-2">
          GitMate
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Generate commit messages, branch names, gitignore files, and project names in seconds.
        </p>
        <div className="pt-8">
          <Link href="/commit-generator" className={cn(buttonVariants({ size: "lg" }), "rounded-full text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1")}>
            Start Generating <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:-translate-y-1 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl">{tool.name}</CardTitle>
                </div>
                <CardDescription className="text-base pt-2">{tool.description}</CardDescription>
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
