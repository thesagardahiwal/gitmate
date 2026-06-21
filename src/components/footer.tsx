import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by <span className="font-medium text-foreground">Sagar Dahiwal</span>.
            <br className="md:hidden" />
            <span className="hidden md:inline">{" | "}</span>
            Email: <a href="mailto:your-email@example.com" className="font-medium underline underline-offset-4">your-email@example.com</a>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://digitalheroesco.com" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "default" }), "bg-primary hover:bg-primary/90")}>
            Built for Digital Heroes
          </Link>
        </div>
      </div>
    </footer>
  );
}
