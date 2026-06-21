import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Code2, Mail, Keyboard } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center justify-between gap-6 py-8 px-4 md:px-8 text-sm text-muted-foreground">
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <div className="flex items-center gap-6">
            <span className="font-medium">© {new Date().getFullYear()} Sagar Dahiwal</span>
            
            <div className="flex items-center gap-4">
              <a href="mailto:dahiwalsagar07@gmail.com" className="hover:text-foreground flex items-center gap-1.5 transition-colors">
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a href="https://github.com/thesagardahiwal/gitmate" target="_blank" rel="noreferrer" className="hover:text-foreground flex items-center gap-1.5 transition-colors">
                <Code2 className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="https://digitalheroesco.com" 
              target="_blank" 
              rel="noreferrer" 
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "font-medium")}
            >
              Built for Digital Heroes
            </Link>
          </div>
        </div>

        <div className="w-full pt-4 border-t border-border flex items-center justify-center md:justify-start gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-foreground/70"><Keyboard className="h-3 w-3" /> Shortcuts:</div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="bg-muted px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">⌘K</kbd> Command Palette</span>
            <span className="flex items-center gap-1"><kbd className="bg-muted px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">⌘↵</kbd> Generate</span>
            <span className="flex items-center gap-1"><kbd className="bg-muted px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">⌘⇧C</kbd> Copy</span>
            <span className="flex items-center gap-1"><kbd className="bg-muted px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">/</kbd> Focus</span>
            <span className="flex items-center gap-1"><kbd className="bg-muted px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">Esc</kbd> Close</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
