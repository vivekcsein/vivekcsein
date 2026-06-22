# VS Code Keyboard Shortcuts Guide

> The highest-impact keyboard shortcuts every developer should memorize first.
>
> Learning these shortcuts can easily save **hours every week** and significantly improve your coding speed.

---

# ⭐ Priority Shortcuts (Learn These First)

These are the shortcuts I use almost every day.

| Shortcut                 | Action                   | Why it's useful                                                             |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------- |
| **Ctrl + Space**         | Trigger Suggestions      | Reopen IntelliSense suggestions if they disappear.                          |
| **Ctrl + P**             | Quick Open / Search File | Instantly search and open any file in the workspace.                        |
| **Ctrl + G**             | Go to Line               | Jump directly to a specific line number.                                    |
| **Alt + ↑ / ↓**          | Move Line Up/Down        | Rearrange code without copy-paste.                                          |
| **Shift + Alt + ↑ / ↓**  | Copy Line Up/Down        | Duplicate the current line quickly.                                         |
| **Ctrl + Shift + K**     | Delete Current Line      | Remove a line instantly without selecting it.                               |
| **Ctrl + O**             | Go to Symbol             | Navigate to functions, methods, classes, and variables in the current file. |
| **Ctrl + Shift + Space** | Trigger Parameter Hints  | Reopen function parameter hints.                                            |
| **Ctrl + K, R**          | Reveal in Explorer       | Locate the current file in the Explorer.                                    |
| **Ctrl + Shift + L**     | Select All Occurrences   | Edit every matching word at once (multi-cursor).                            |
| **Ctrl + /**             | Toggle Line Comment      | Comment or uncomment selected lines.                                        |
| **Ctrl + X**             | Cut Current Line         | Deletes (cuts) the current line when nothing is selected.                   |
| **Ctrl + J**             | Toggle Terminal          | Show or hide the integrated terminal.                                       |
| **Ctrl + `**             | Focus Terminal           | Open or focus the integrated terminal.                                      |

---

# Navigation

## Quick Open File

```
Ctrl + P
```

Search and open any file instantly.

Perfect for:

- Large projects
- Jumping between files
- Fuzzy searching filenames

---

## Go to Line

```
Ctrl + G
```

Jump directly to a specific line number.

Example

```
Ctrl + G

150
```

Moves directly to line **150**.

---

## Go to Symbol

```
Ctrl + O
```

Shows all symbols in the current file.

Useful for:

- Functions
- Methods
- Classes
- Interfaces
- Variables

---

## Reveal Current File

```
Ctrl + K, R
```

Highlights the current file in the Explorer.

Very useful when working in deeply nested folders.

---

# IntelliSense

## Trigger Suggestions

```
Ctrl + Space
```

Reopens the IntelliSense popup if it disappears.

Useful for:

- Autocomplete
- Variables
- Methods
- Imports
- Snippets

---

## Trigger Parameter Hints

```
Ctrl + Shift + Space
```

Shows function parameters again.

Example

```ts
fetch(url, options);
```

Displays parameter information while typing.

---

# Editing

## Move Line

```
Alt + ↑

Alt + ↓
```

Move the current line without cut and paste.

---

## Duplicate Line

```
Shift + Alt + ↑

Shift + Alt + ↓
```

Copies the current line above or below.

Great for:

- JSX
- HTML
- JSON
- Objects
- Arrays

---

## Delete Current Line

```
Ctrl + Shift + K
```

Deletes the current line instantly.

---

## Cut Current Line

```
Ctrl + X
```

When no text is selected, this cuts the entire line.

---

## Toggle Comment

```
Ctrl + /
```

Comments or uncomments the selected lines.

Works in almost every programming language.

---

## Select All Occurrences

```
Ctrl + Shift + L
```

Selects every occurrence of the current selection.

Perfect for:

- Renaming variables
- Updating JSX props
- Editing repeated text

---

# Terminal

## Toggle Terminal

```
Ctrl + J
```

Show or hide the integrated terminal panel.

---

## Focus Terminal

```
Ctrl + `
```

Open or focus the integrated terminal.

Useful when switching frequently between coding and command-line tasks.

---

# Multi-Cursor Editing

## Add Cursor Above

```
Ctrl + Alt + ↑
```

---

## Add Cursor Below

```
Ctrl + Alt + ↓
```

---

## Insert Cursor with Mouse

```
Alt + Click
```

---

## Select Next Occurrence

```
Ctrl + D
```

Selects the next matching word.

---

## Select All Occurrences

```
Ctrl + Shift + L
```

Select every matching occurrence in the file.

---

# Search

## Find

```
Ctrl + F
```

Search within the current file.

---

## Replace

```
Ctrl + H
```

Replace text in the current file.

---

## Global Search

```
Ctrl + Shift + F
```

Search across the entire project.

---

## Global Replace

```
Ctrl + Shift + H
```

Replace text across the entire workspace.

---

# File Management

## New File

```
Ctrl + N
```

---

## Open File

```
Ctrl + O
```

---

## Save

```
Ctrl + S
```

---

## Save All

```
Ctrl + K S
```

---

## Close File

```
Ctrl + W
```

---

## Reopen Closed Editor

```
Ctrl + Shift + T
```

---

# Code Folding

## Fold Region

```
Ctrl + Shift + [
```

Collapse the current code block.

---

## Unfold Region

```
Ctrl + Shift + ]
```

Expand the current code block.

---

## Fold All

```
Ctrl + K Ctrl + 0
```

Collapse all code regions.

---

## Unfold All

```
Ctrl + K Ctrl + J
```

Expand all folded regions.

---

# Refactoring

## Rename Symbol

```
F2
```

Safely rename variables, functions, classes, and files.

---

## Quick Fix

```
Ctrl + .
```

Displays available code actions and fixes.

---

## Format Document

```
Shift + Alt + F
```

Formats the entire file using the configured formatter (e.g., Prettier).

---

## Format Selection

```
Ctrl + K Ctrl + F
```

Formats only the selected code.

---

# Debugging

## Start Debugging

```
F5
```

---

## Stop Debugging

```
Shift + F5
```

---

## Toggle Breakpoint

```
F9
```

---

## Step Over

```
F10
```

---

## Step Into

```
F11
```

---

# Git

## Source Control

```
Ctrl + Shift + G
```

Open the Git Source Control panel.

---

# Explorer

## Toggle Sidebar

```
Ctrl + B
```

Hide or show the Explorer sidebar.

---

## Command Palette

```
Ctrl + Shift + P
```

Access every VS Code command from one place.

---

# Workspace

## Open Settings

```
Ctrl + ,
```

---

## Keyboard Shortcuts

```
Ctrl + K Ctrl + S
```

Open the keyboard shortcuts editor.

---

# My Top 10 Most Used Shortcuts

1. `Ctrl + P` → Quick Open
2. `Ctrl + Shift + P` → Command Palette
3. `Ctrl + Space` → IntelliSense
4. `Ctrl + D` → Select Next Occurrence
5. `Ctrl + Shift + L` → Select All Occurrences
6. `Alt + ↑ / ↓` → Move Line
7. `Shift + Alt + ↑ / ↓` → Duplicate Line
8. `Shift + Alt + F` → Format Document
9. `F2` → Rename Symbol
10. `Ctrl + /` → Toggle Comment

---

# Pro Tip

Instead of reaching for the mouse:

- Search files with **Ctrl + P**
- Execute commands with **Ctrl + Shift + P**
- Navigate code with **Ctrl + O**
- Rename safely with **F2**
- Use multi-cursor editing with **Ctrl + D** and **Ctrl + Shift + L**
- Auto-format with **Shift + Alt + F**

Mastering these shortcuts alone can make you **2–3× faster** in Visual Studio Code.
