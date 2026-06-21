"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { GitBranch } from "lucide-react";

const links = [
  { href: "/commit-generator", label: "Commit Generator" },
  { href: "/branch-generator", label: "Branch Generator" },
  { href: "/gitignore-generator", label: "GitIgnore Generator" },
  { href: "/project-name-generator", label: "Project Name Generator" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8 mx-auto justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <GitBranch className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">GitMate</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground font-medium" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile Nav would go here, omitting for simplicity unless requested */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
