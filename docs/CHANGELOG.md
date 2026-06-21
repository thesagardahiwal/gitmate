# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-06-21

### Added
- **Generate Everything**: A unified tab to generate a commit, branch, project name, and tagline simultaneously from a single description.
- **Command Palette (⌘K)**: Global navigation and quick-actions menu powered by `cmdk`.
- **Keyboard Shortcuts**: Global shortcuts for power users (`⌘↵` Generate, `⌘⇧C` Copy, `/` Focus, `Esc` Close).
- **Reusable Terminal UI**: All generated outputs now use a standard, highly-polished terminal component.
- **Local History**: Generations are now automatically stored in Local Storage and accessible via the Command Palette for instant reuse.
- **Example Prompts**: Clickable examples added to all generators for faster testing.

## [1.0.0] - 2026-06-21

### Added
- **Commit Message Generator**: AI-powered tool to generate conventional commit messages from plain descriptions.
- **Branch Name Generator**: Converts descriptions into standard, readable branch names.
- **Project Name Generator**: Brainstorms clever project names and taglines using AI.
- **GitIgnore Generator**: Client-side tool to compile and download `.gitignore` files based on selected tech stacks.
- **Developer-First UI**: Overhauled the UI to feature a strict, GitHub-inspired dark mode aesthetic with `IBM Plex` typography.
- **Comprehensive Documentation**: Added a full suite of onboarding, architectural, and API documentation.

### Changed
- Refactored `shadcn/ui` Button and Card components to align strictly with GitHub visual guidelines (sharp borders, specific hex palettes).
- Upgraded to Tailwind v4 native CSS variables mapped to standard hex codes.

### Fixed
- Fixed API routes encountering escaping errors with template literals during the Next.js `npm run build` process.
