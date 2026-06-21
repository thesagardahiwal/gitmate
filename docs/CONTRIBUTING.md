# Contributing to GitMate

First off, thank you for considering contributing to GitMate! We love receiving pull requests from the community.

## Branch Naming Convention

We use a strict prefix-based branch naming convention (which GitMate itself can help you generate!).

Format: `<type>/<short-description>`

Types:
- `feat/`: For new features
- `fix/`: For bug fixes
- `docs/`: For documentation changes
- `chore/`: For maintenance tasks (dependencies, build scripts)
- `refactor/`: For code refactoring without feature changes

Example: `feat/add-github-oauth`

## Commit Message Convention

We strictly follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. You can use the GitMate Commit Generator to format your messages!

Format: `<type>(<scope>): <description>`

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Formatting, missing semi-colons, etc (no code change)
- `refactor`: Refactoring production code
- `chore`: Updating build tasks, package manager configs, etc.

Example: `feat(ui): add syntax highlighting to generated output`

## Pull Request Process

1. Fork the repository and create your branch from `main`.
2. Make your changes and ensure your code is well documented using JSDoc.
3. Run `npm run build` to guarantee no breaking typing errors were introduced.
4. Push your branch and open a Pull Request against `main`.
5. Ensure your PR title follows the Conventional Commit format.
6. A maintainer will review your code. Please address any requested changes promptly.

## Coding Standards

- **TypeScript Strict Mode**: All code must comply with TypeScript strict mode. Do not use `any` unless absolutely necessary (and if so, explain why).
- **React Components**: Use Server Components by default. Use `"use client"` only for components requiring interactivity, hooks, or DOM APIs.
- **Styling**: Stick to the Tailwind utility classes defined in the global design system. Do not introduce arbitrary colors or hex codes directly in the JSX (unless copying exact GitHub specs as defined in `globals.css`).
- **Formatting**: We use standard Prettier rules. Ensure your editor is configured to format on save.
