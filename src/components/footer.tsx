import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Code2, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-4 md:px-8 text-sm text-muted-foreground">
        
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

        <div className="flex items-center gap-4 mt-4 md:mt-0">
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
    </footer>
  );
}
