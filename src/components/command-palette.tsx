"use client";

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { 
  GitCommit, GitBranch, FileCode, FolderGit2, 
  Rocket, Copy, Search, X
} from "lucide-react"
import { useLocalHistory } from "@/hooks/use-local-history"
import { toast } from "sonner"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { history } = useLocalHistory()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  const copyLast = (type: string) => {
    const last = history.find(h => h.type === type);
    if (!last || !last.output) {
      toast.error(`No recent ${type} found to copy`);
      return;
    }
    
    let textToCopy = "";
    if (type === "commit") {
      textToCopy = Array.isArray(last.output) ? last.output[0] : last.output;
    } else if (type === "branch") {
      textToCopy = Array.isArray(last.output) ? last.output[0] : last.output;
    } else if (type === "project-name") {
      textToCopy = Array.isArray(last.output) ? last.output[0]?.name : last.output;
    }
    
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      toast.success("Copied to clipboard!");
    } else {
      toast.error("Could not parse history item.");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div className="w-full max-w-2xl bg-[#161B22] border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <Command label="Global Command Palette" className="flex flex-col w-full h-full bg-transparent">
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input 
              autoFocus 
              placeholder="Type a command or search..." 
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground text-foreground border-none focus:ring-0"
            />
            <button onClick={() => setOpen(false)} className="p-2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results found.</Command.Empty>
            
            <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
              <Command.Item onSelect={() => runCommand(() => router.push("/generate-everything"))} className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground">
                <Rocket className="mr-2 h-4 w-4" /> Generate Everything
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push("/commit-generator"))} className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground">
                <GitCommit className="mr-2 h-4 w-4" /> Commit Generator
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push("/branch-generator"))} className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground">
                <GitBranch className="mr-2 h-4 w-4" /> Branch Generator
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push("/gitignore-generator"))} className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground">
                <FileCode className="mr-2 h-4 w-4" /> GitIgnore Generator
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push("/project-name-generator"))} className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground">
                <FolderGit2 className="mr-2 h-4 w-4" /> Project Name Generator
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground mt-2">
              <Command.Item onSelect={() => runCommand(() => copyLast("commit"))} className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground">
                <Copy className="mr-2 h-4 w-4" /> Copy Last Commit
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => copyLast("branch"))} className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground">
                <Copy className="mr-2 h-4 w-4" /> Copy Last Branch
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => copyLast("project-name"))} className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground">
                <Copy className="mr-2 h-4 w-4" /> Copy Last Project Name
              </Command.Item>
            </Command.Group>
            
            <Command.Group heading="Theme" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground mt-2">
              <Command.Item onSelect={() => runCommand(() => toast("GitMate is optimized exclusively for Dark Mode!"))} className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground">
                <div className="w-4 h-4 rounded-full bg-[#161B22] border border-border mr-2"></div> Dark Mode
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => toast("GitMate is optimized exclusively for Dark Mode!"))} className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground">
                <div className="w-4 h-4 rounded-full bg-white border border-border mr-2"></div> Light Mode
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
