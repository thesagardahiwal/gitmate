# Project Overview

## Business Problem
Maintaining a clean, readable, and standardized Git history is notoriously difficult, especially for teams. Developers often waste time debating branching conventions, looking up boilerplate `.gitignore` syntax, or struggling to format Conventional Commits correctly.

## Target Audience
- **Software Engineers** looking to speed up their daily Git workflow.
- **Team Leads** enforcing standard conventions across large codebases.
- **Open Source Maintainers** standardizing contributor guidelines.

## Features
1. **Commit Message Generator**: Uses LLMs to parse natural language descriptions into strict Conventional Commits (e.g., `feat(auth): ...`).
2. **Branch Name Generator**: Enforces consistent branch naming syntax based on task descriptions.
3. **Project Naming Tool**: Aids in the brainstorming phase for new repositories by generating creative names and taglines.
4. **GitIgnore Builder**: Compiles a comprehensive `.gitignore` locally by combining standard templates (Node, Python, React, etc.).

## User Flow
1. **Landing**: User arrives at the calm, dark-themed homepage showcasing a terminal preview.
2. **Selection**: User selects the desired utility from the top navigation or hero grid.
3. **Input**: User inputs plain text or selects predefined tags (for GitIgnore).
4. **Execution**: The input is securely passed to the Next.js API route, which constructs a strict prompt for the Gemini AI (or processes it locally).
5. **Output**: Results are streamed/returned into a terminal-like UI window.
6. **Action**: User one-click copies the result to their clipboard or downloads the generated file directly.

## Goals
- **Speed**: Output must be generated in seconds with zero authentication barriers.
- **Aesthetics**: The UI must inherently feel like a developer tool, not a marketing page.
- **Standardization**: Outputs must adhere strictly to industry standards.

## Future Roadmap
- **Q3**: Introduction of CLI companion tool (`npm i -g gitmate-cli`).
- **Q4**: Direct GitHub API integration for creating Pull Requests and Branches directly from the GitMate UI.
