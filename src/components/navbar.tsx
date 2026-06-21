import Link from "next/link";
import { GitBranch } from "lucide-react";

const links = [
  { href: "/generate-everything", label: "Generate Everything" },
  { href: "/commit-generator", label: "Commit Generator" },
  { href: "/branch-generator", label: "Branch Generator" },
  { href: "/gitignore-generator", label: "GitIgnore Generator" },
  { href: "/project-name-generator", label: "Project Name Generator" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="flex h-16 w-full max-w-[1280px] mx-auto items-center px-4 md:px-8 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2 group">
            <GitBranch className="h-6 w-6 text-foreground group-hover:text-muted-foreground transition-colors" />
            <span className="font-semibold text-lg sm:inline-block">GitMate</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-muted-foreground text-foreground px-2 py-1 rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
