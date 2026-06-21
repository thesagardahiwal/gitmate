# Architecture

GitMate is a monolithic Next.js application leveraging the App Router. It uses Server-side API Routes (Route Handlers) to securely communicate with the Google Gemini API, ensuring API keys are never exposed to the client.

## Folder Structure

\`\`\`text
src/
├── app/
│   ├── api/
│   │   ├── branch-generator/route.ts       # Branch API
│   │   ├── commit-generator/route.ts       # Commit API
│   │   └── project-name-generator/route.ts # Project Name API
│   ├── branch-generator/page.tsx           # Client UI
│   ├── commit-generator/page.tsx           # Client UI
│   ├── gitignore-generator/page.tsx        # Client UI
│   ├── project-name-generator/page.tsx     # Client UI
│   ├── globals.css                         # Global CSS & Tailwind Config
│   ├── layout.tsx                          # Root Layout (Providers, Fonts)
│   └── page.tsx                            # Landing Page
├── components/
│   ├── ui/                                 # shadcn UI components
│   ├── footer.tsx                          # Global Footer
│   └── navbar.tsx                          # Global Navbar
└── lib/
    ├── gemini.ts                           # Gemini AI Service Singleton
    ├── gitignore-templates.ts              # Local GitIgnore Logic
    └── utils.ts                            # Tailwind class mergers (cn)
\`\`\`

## Component Architecture
We strictly utilize React Server Components (RSC) where possible (e.g., `layout.tsx`, `page.tsx`). For interactive tool pages that require state (`useState`), event handling, and fetching data from our internal APIs, we use Client Components denoted by the `"use client"` directive.

## API Layer
The API layer acts as a proxy between the client interface and the Gemini LLM. 
It receives simple JSON payloads, validates them, constructs highly specific system prompts, and returns formatted JSON data to the client.

## State Management
State is kept entirely local to the components using React `useState`. Due to the simplicity of the data flows, global state managers (like Redux or Zustand) are unnecessary and omitted to maintain a lightweight bundle size.

## Gemini Integration Flow

\`\`\`mermaid
graph TD
    Client[Client Browser UI] -->|POST JSON Payload| API[Next.js API Route Handler]
    API -->|Constructs Prompt + System Instructions| Gemini[Google Gemini API]
    Gemini -->|Returns Cleaned Text/JSON| API
    API -->|Returns Standardized JSON| Client
    Client -->|Renders in Terminal UI| DOM[Screen]
\`\`\`

## Design Decisions
- **No Database**: To ensure blazing fast speeds, zero login friction, and absolute privacy, we do not store any user inputs or generated outputs in a database.
- **Forced Dark Mode**: A conscious UX decision to ensure the tool feels like a native IDE or CLI environment.
- **Serverless**: Deployed natively on Vercel's serverless edge network for automatic scaling and zero dev-ops overhead.
