# Development Guide

Welcome to the GitMate development guide! This document outlines everything you need to know to get the application running locally and successfully build it for production.

## Local Setup

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/thesagardahiwal/gitmate.git
cd gitmate
\`\`\`

### 2. Install Dependencies
Ensure you are using Node.js v18.17.0 or higher.
\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables
GitMate utilizes Google's Gemini API for its intelligent features. 

1. Go to [Google AI Studio](https://aistudio.google.com/) and create an API Key.
2. In the root of the project, create a `.env.local` file.
3. Add your key:
   \`\`\`env
   GEMINI_API=your_actual_api_key_here
   \`\`\`

> [!WARNING]
> Never commit `.env.local` to version control. It is already included in `.gitignore`.

## Running the Project

Start the Next.js development server:
\`\`\`bash
npm run dev
\`\`\`
The application will be available at `http://localhost:3000`. Hot module reloading (HMR) is enabled by default via Turbopack.

## Build Process

Before deploying or submitting a Pull Request, verify that the project builds successfully. This step runs the TypeScript compiler and Next.js optimization processes.

\`\`\`bash
npm run build
\`\`\`

To test the production build locally:
\`\`\`bash
npm run start
\`\`\`

## Common Issues & Debugging Tips

### 1. `GEMINI_API_KEY is not defined`
If you encounter this warning in the terminal or see 500 errors when generating text:
- Verify that your `.env.local` file is named correctly.
- Ensure the key variable is exactly `GEMINI_API` (or whatever is defined in `src/lib/gemini.ts`).
- **Restart the development server.** Next.js only loads `.env` files upon server startup.

### 2. TypeScript Errors during `npm run build`
If the build fails due to a TypeScript error:
- Ensure all Lucide icons are imported correctly (`import { GitBranch } from "lucide-react"`).
- Check your Radix UI/Shadcn definitions.

### 3. UI Not Updating
If changes to `globals.css` or Tailwind classes aren't reflecting:
- You may need to clear the Next.js cache.
- Delete the `.next` directory and restart the dev server:
  \`\`\`bash
  rm -rf .next
  npm run dev
  \`\`\`
