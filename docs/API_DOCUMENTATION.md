# API Documentation

GitMate leverages Next.js Route Handlers to communicate securely with the Google Gemini API. These routes are internal to the application but structured as standard RESTful endpoints.

## Base URL
All API routes are hosted under the \`/api\` directory path relative to the domain (e.g., \`http://localhost:3000/api/\`).

---

## 1. Commit Generator

**Endpoint:** \`POST /api/commit-generator\`  
**Purpose:** Generates a list of Conventional Commit messages from a plain text description of code changes.

### Request Body
\`\`\`json
{
  "description": "Added JWT authentication and fixed login validation"
}
\`\`\`

### Success Response
**Status:** \`200 OK\`
\`\`\`json
{
  "messages": [
    "feat(auth): add JWT authentication",
    "fix(auth): resolve login validation",
    "feat: implement secure JWT authentication",
    "fix: correct login validation logic",
    "chore(auth): setup JWT and login validation"
  ]
}
\`\`\`

### Error Response
**Status:** \`400 Bad Request\`
\`\`\`json
{
  "error": "Description is required"
}
\`\`\`
**Status:** \`500 Internal Server Error\`
\`\`\`json
{
  "error": "Failed to generate commits"
}
\`\`\`

---

## 2. Branch Name Generator

**Endpoint:** \`POST /api/branch-generator\`  
**Purpose:** Converts feature or bug descriptions into standard, hyphenated Git branch names.

### Request Body
\`\`\`json
{
  "description": "Fix navigation bar rendering issue on mobile"
}
\`\`\`

### Success Response
**Status:** \`200 OK\`
\`\`\`json
{
  "branches": [
    "fix/mobile-navigation-rendering",
    "bugfix/navbar-mobile-view",
    "fix/navbar-rendering-issue",
    "hotfix/mobile-nav",
    "fix/mobile-nav-bar"
  ]
}
\`\`\`

---

## 3. Project Name Generator

**Endpoint:** \`POST /api/project-name-generator\`  
**Purpose:** Brainstorms catchy project names and taglines based on a software concept.

### Request Body
\`\`\`json
{
  "description": "A developer tool that generates git commits using AI"
}
\`\`\`

### Success Response
**Status:** \`200 OK\`
\`\`\`json
{
  "projects": [
    {
      "name": "GitMate",
      "tagline": "The ultimate git productivity toolkit."
    },
    {
      "name": "CommitAI",
      "tagline": "Automate your commit history with intelligence."
    }
  ]
}
\`\`\`

---

## Note on GitIgnore Generator
The GitIgnore generation is handled entirely on the client-side (`src/lib/gitignore-templates.ts`) to ensure instantaneous generation speeds and offline support. It does not utilize an API route.
