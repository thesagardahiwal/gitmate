# GitMate 🚀

GitMate is a premium, open-source developer utility toolkit designed to streamline your daily Git workflow. Generate conventional commit messages, standard branch names, comprehensive `.gitignore` files, and catchy project names—all instantly using Google's Gemini AI.

## Why GitMate?
Developers spend countless hours debating branch names, structuring commit messages, and manually configuring gitignore templates. GitMate solves this problem by providing a centralized, lightning-fast toolkit that adheres to strict industry standards (like Conventional Commits) while offering a beautiful, GitHub-inspired interface.

### Key Features
- **🚀 Generate Everything**: Instantly generate a commit, branch, project name, and tagline simultaneously from a single description.
- **🤖 AI Commit Generator**: Convert plain English descriptions into strict Conventional Commits.
- **🌱 AI Branch Generator**: Instantly generate clean, readable branch names (e.g., `feat/add-jwt-auth`).
- **💡 AI Project Namer**: Brainstorm creative project names with taglines from simple prompts.
- **📁 Local GitIgnore Generator**: Generate and download standard `.gitignore` files for various tech stacks.
- **⌨️ Developer-First UX**: Navigate globally with `⌘K`, use global keyboard shortcuts, and access Local History directly from the Command Palette.

---

## Screenshots

*Screenshots will be added here.*

- **Landing Page**: `[Placeholder: Landing Page Screenshot]`
- **Generate Everything**: `[Placeholder: Generate Everything Screenshot]`
- **Command Palette**: `[Placeholder: Command Palette Screenshot]`
- **Commit Generator**: `[Placeholder: Commit Generator Screenshot]`
- **Branch Generator**: `[Placeholder: Branch Generator Screenshot]`
- **GitIgnore Generator**: `[Placeholder: GitIgnore Generator Screenshot]`
- **Project Name Generator**: `[Placeholder: Project Name Generator Screenshot]`

---

## Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **AI**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Deployment**: Ready for [Vercel](https://vercel.com/)

---

## Installation & Local Setup

### Prerequisites
- Node.js >= 18.17.0
- A Google Gemini API Key

### Step-by-Step Guide

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thesagardahiwal/gitmate.git
   cd gitmate
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure
A brief overview of the project's architecture:

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── api/              # Backend API handlers for Gemini AI
│   └── (routes)/         # Client-side Tool pages
├── components/           # Reusable UI components (Navbar, Footer, shadcn)
├── lib/                  # Utilities, Gemini service, and static templates
└── styles/               # Global CSS and Tailwind directives (globals.css)
```

---

## Usage Guide

1. **Generate Everything**: Navigate to `/generate-everything`. Enter your full task description to instantly receive all your git-related outputs at once, ready for "Copy All".
2. **Command Palette**: Press `⌘ + K` (Mac) or `Ctrl + K` (Windows) anywhere to open the global command palette for quick navigation and copying historical outputs.
3. **Commit Generator**: Navigate to `/commit-generator`. Enter a description like "Added JWT login and fixed logout bug". The AI returns multiple Conventional Commit options.
4. **Branch Generator**: Navigate to `/branch-generator`. Describe the feature you are building. The AI generates hyphenated, lowercase branch names.
5. **Project Name Generator**: Navigate to `/project-name-generator`. Describe your app idea to get catchy names and short taglines.
6. **GitIgnore Generator**: Navigate to `/gitignore-generator`. Select your stack. Instantly view the compiled `.gitignore` file and download it locally.

### Keyboard Shortcuts
- `⌘ + K`: Open Command Palette
- `⌘ + Enter`: Generate outputs
- `⌘ + Shift + C`: Copy active output
- `/`: Focus input textarea
- `Escape`: Close modals and inputs

---

## Deployment Guide
GitMate is optimized for zero-config deployment on Vercel.

1. Push your code to a GitHub repository.
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add your `GEMINI_API`.
5. Click **Deploy**. Vercel will automatically detect the Next.js framework and build the project.

---

## Future Improvements (v2)
- Add GitHub OAuth to directly commit and push changes to linked repositories.
- Custom templates for Commit Generation (e.g., Jira ticket formatting).
- Browser Extension to suggest branch names directly inside Jira/Linear.

---

## Author

**Sagar Dahiwal**
- **Email**: dahiwalsagar07@gmail.com
- **GitHub**: [@thesagardahiwal](https://github.com/thesagardahiwal)
- **Website**: [Digital Heroes](https://digitalheroesco.com)

---

> Built with ❤️ for developers who love clean Git logs.
