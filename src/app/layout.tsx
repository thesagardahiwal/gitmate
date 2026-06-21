import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { CommandPalette } from "@/components/command-palette";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "GitMate - Developer Git Toolkit",
  description: "Generate Git commit messages, branch names, project names, and gitignore files instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full dark`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col w-full max-w-[1280px] mx-auto px-4 md:px-8">
          {children}
        </main>
        <Footer />
        <Toaster theme="dark" toastOptions={{
          className: "bg-[#161B22] border-[#30363D] text-[#E6EDF3] font-mono shadow-xl rounded-md",
        }} />
        <CommandPalette />
      </body>
    </html>
  );
}
