# VS Code Setup Guide for Node.js Developer

> My personal Visual Studio Code configuration for modern software development.
>
> Optimized for:
>
> - React
> - Next.js
> - TypeScript
> - Node.js
> - Express
> - Tailwind CSS
> - Git
> - Docker
> - Full Stack Development

---

# Installation

Download Visual Studio Code

https://code.visualstudio.com/

---

# Recommended Font

## Font

```
Consolas Ligaturized v2
```

### Why?

- Programming ligatures
- Better readability
- Cleaner arrow functions
- More compact operators

Example

```
=>   → ligature

===

!==

<=

>=

&&

||

```

Settings

```json
"editor.fontFamily": "Consolas Ligaturized v2, Consolas, 'Courier New', monospace",
"editor.fontLigatures": true
```

---

# Recommended Theme

## Theme

✅ One Dark Pro

Beautiful dark theme with excellent syntax highlighting.

Alternative themes

- GitHub Dark
- Catppuccin
- Tokyo Night
- Night Owl
- Dracula Official

---

# Recommended Icon Theme

## Material Icon Theme

Provides icons for

- folders
- files
- frameworks
- package managers
- configuration files

Highly recommended.

---

# Essential VS Code Settings

```json
"emmet.includeLanguages": {
    "javascript": "javascriptreact"
},

"terminal.integrated.defaultProfile.windows": "Command Prompt",

"editor.fontFamily": "Consolas Ligaturized v2, Consolas, 'Courier New', monospace",

"editor.fontLigatures": true,

"editor.formatOnSave": true,

"files.autoSave": "afterDelay",

"editor.minimap.enabled": false,

"editor.bracketPairColorization.enabled": true,

"editor.guides.bracketPairs": true,

"editor.inlineSuggest.enabled": true,

"editor.stickyScroll.enabled": true,

"editor.cursorSmoothCaretAnimation": "on",

"editor.smoothScrolling": true,

"explorer.confirmDelete": false,

"explorer.confirmDragAndDrop": false
```

---

# Personal settings.json

> Copy your complete personal settings here.

```json

// Paste your personal vscode_settings.json here

```

---

# Essential Extensions

---

## Formatting

### Prettier

Extension ID

```
esbenp.prettier-vscode
```

Purpose

- Format on save
- Consistent code style
- Team standard formatting

---

## Linting

### ESLint

Extension ID

```
dbaeumer.vscode-eslint
```

Purpose

- Detect bugs
- Fix lint issues
- Improve code quality

---

## Git

### GitLens

Extension ID

```
eamodio.gitlens
```

Purpose

- Git blame
- Commit history
- Author tracking
- File history

---

### Git Graph

Beautiful Git history visualization.

---

## Live Server

Launch HTML projects instantly.

Best for

- HTML
- CSS
- JavaScript

---

## Live Share

Real-time collaborative coding.

Perfect for

- Interviews
- Pair programming
- Mentoring

---

# React Development

## ES7 React/Redux/GraphQL Snippets

Popular snippets for

- React
- Redux
- GraphQL

Huge productivity boost.

---

## Auto Rename Tag

Automatically renames paired HTML/JSX tags.

Example

```
<div>

↓

<section>

Closing tag updates automatically.
```

---

## Auto Close Tag

Automatically inserts closing tags.

---

## JavaScript (ES6) Code Snippets

Useful snippets for

- JavaScript
- ES6
- Async/Await
- Classes

---

# Tailwind CSS

## Tailwind CSS IntelliSense

Features

- Class autocomplete
- Hover preview
- Color preview
- Error detection

Must-have for Tailwind projects.

---

# CSS

## IntelliSense for CSS class names

Autocomplete for CSS classes.

Works well with

- Bootstrap
- CSS Modules
- SCSS

---

# Backend Development

## REST Client

Alternative to Postman.

Example

```http
GET http://localhost:3000/api/users
```

Run directly inside VS Code.

---

## Thunder Client

Lightweight API client.

Many developers prefer it over Postman.

Supports

- REST
- Environment variables
- Collections
- Authentication

---

# Containers

## Docker

Adds Docker support inside VS Code.

Features

- Build images
- Run containers
- Inspect logs

---

# Database

## SQLTools

Supports

- PostgreSQL
- MySQL
- SQLite
- MSSQL

Connect databases directly from VS Code.

---

# AI Coding

## GitHub Copilot (Paid)

Best AI coding assistant.

Features

- Code completion
- Chat
- Documentation
- Refactoring

---

## Blackbox AI

Free alternative.

Useful for

- Code generation
- AI search
- Snippets

---

## Continue

Open-source AI coding assistant.

Works with

- OpenAI
- Claude
- Gemini
- Ollama

Excellent for local models.

---

## Codeium / Windsurf Plugin

Free AI autocomplete.

Very fast.

---

# TypeScript

## Error Lens

Displays TypeScript errors inline.

Much faster debugging.

Highly recommended.

---

# Markdown

## Markdown All in One

Features

- Table of contents
- Keyboard shortcuts
- Auto numbering
- Preview improvements

---

# Images

## CodeSnap

Beautiful screenshots for

- Twitter
- LinkedIn
- Documentation

---

# Productivity

## Project Manager

Quickly switch between projects.

Huge time saver.

---

## TODO Highlight

Highlights

```
TODO
FIXME
NOTE
BUG
HACK
```

---

## Better Comments

Adds colored comment types.

Example

```ts
// !
```

```ts
// TODO
```

```ts
// NOTE
```

```ts
// QUESTION
```

---

## Path Intellisense

Autocomplete file paths.

---

## Import Cost

Shows bundle size of imported packages.

Very useful for frontend developers.

---

## npm Intellisense

Autocomplete npm package names.

---

## Turbo Console Log

Generate

```ts
console.log();
```

instantly.

Also removes logs automatically.

---

## Peacock

Change workspace colors.

Great when working with multiple VS Code windows.

---

## Bookmarks

Bookmark important lines.

Jump instantly.

---

# GitHub

## GitHub Pull Requests

Manage pull requests directly inside VS Code.

---

# Testing

## Jest

Adds support for

- Jest
- Test Explorer
- Inline test results

---

# YAML

## YAML

Better support for

- Docker Compose
- GitHub Actions
- Kubernetes

---

# JSON

## JSON Crack

Visualize JSON structures.

---

# C/C++

Microsoft official extension.

---

# Python

Microsoft Python extension.

---

# Java

Extension Pack for Java.

---

# Flutter

Awesome Flutter Snippets

---

# Unity

Unity Tools

---

# Power Mode

Fun extension with

- Particles
- Screen shake
- Explosions

Not recommended for everyday work.

---

# Brackets

Modern VS Code already supports bracket colorization.

No need for

❌ Bracket Pair Colorizer 2

❌ Rainbow Brackets

Enable

```json
"editor.bracketPairColorization.enabled": true
```

---

# Recommended Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "editor.linkedEditing": true,
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.autoSave": "afterDelay",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.inlineSuggest.enabled": true,
  "editor.stickyScroll.enabled": true,
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "selection",
  "editor.wordWrap": "on",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.smoothScrolling": true
}
```

---

# VS Code Profiles

Create separate profiles for different stacks.

Example

```
Frontend

Backend

Python

Game Development

AI Development

Competitive Programming
```

Each profile can have

- Different extensions
- Different themes
- Different settings

---

# My Personal Workspace

Recommended development stack

```
VS Code
↓
Git
↓
GitHub
↓
Node.js
↓
pnpm
↓
TypeScript
↓
React
↓
Next.js
↓
Tailwind CSS
↓
ESLint
↓
Prettier
↓
GitLens
↓
Thunder Client
↓
Docker
↓
SQLTools
↓
GitHub Copilot / Continue
```

---

# Extensions I Use Frequently

- Prettier
- ESLint
- GitLens
- Git Graph
- Material Icon Theme
- One Dark Pro
- Error Lens
- Tailwind CSS IntelliSense
- Path Intellisense
- Auto Rename Tag
- Auto Close Tag
- ES7 React Snippets
- Thunder Client
- REST Client
- CodeSnap
- Project Manager
- Better Comments
- TODO Highlight
- Import Cost
- npm Intellisense
- Turbo Console Log
- Peacock
- Docker
- SQLTools
- Live Share
- Continue
- GitHub Copilot
- Blackbox AI

---

# Notes

- Keep extensions minimal—only install what you use regularly.
- Use VS Code Profiles to separate work, personal, and experimental environments.
- Enable Settings Sync with GitHub or Microsoft to keep your setup consistent across devices.
- Regularly review and remove unused extensions to improve startup time and performance.
