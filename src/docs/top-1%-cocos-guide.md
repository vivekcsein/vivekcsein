# Cocos Creator Development Standards

> A professional development guide for building scalable, maintainable, and production-ready games with Cocos Creator.

---

# Purpose

This document defines the coding standards, architecture guidelines, and best practices followed throughout this project.

Every contributor—whether a senior developer, junior developer, intern, or freelancer—is expected to follow these standards.

The goal is to ensure:

- Consistent code quality
- Easy onboarding
- Scalable architecture
- Easier debugging
- Better collaboration
- Production-ready code

---

# Development Philosophy

We do not write code simply to make the game work.

We write code that is:

- Readable
- Reusable
- Maintainable
- Testable
- Scalable

A feature may work today, but poorly structured code becomes expensive to maintain as the project grows.

Every decision should prioritize long-term maintainability over short-term convenience.

---

# TypeScript Compilation

Cocos Creator compiles TypeScript using **Babel** instead of the TypeScript compiler (`tsc`).

Specifically:

```
TypeScript
      ↓
@babel/plugin-transform-typescript
      ↓
JavaScript
```

Because of this:

- `tsconfig.json` is **not used for compilation**
- Babel removes TypeScript syntax but does not perform type analysis
- Every file is compiled independently (`isolatedModules`)
- Some TypeScript features are unsupported

This project follows Babel-compatible TypeScript only.

---

# Unsupported TypeScript Features

The following features must never be used:

❌ const enum

❌ export =

❌ import =

❌ Namespace variable declarations using let or var

❌ Declaration merging

❌ Cross-file namespace sharing

Use modern ES Modules instead.

---

# Project Coding Standards

## One Responsibility Per File

Every file should contain one primary class.

Good

```
PlayerController.ts
EnemyAI.ts
HealthComponent.ts
```

Avoid

```
Player.ts
Enemy.ts
UI.ts
Utilities.ts
Everything.ts
```

---

## One Component = One Job

Each component should solve one problem.

Good

```
Health
Movement
Weapon
Inventory
Animation
```

Avoid

```
PlayerManager
```

containing

- Health
- Inventory
- Audio
- Save
- Input
- UI
- Animation

---

## Prefer Composition

Use multiple small components.

```
Player

├── Health
├── Movement
├── Weapon
├── Animation
├── Audio
└── Inventory
```

Avoid deep inheritance chains.

---

## Keep Components Independent

Components should not tightly depend on each other.

Prefer events or interfaces over direct references whenever possible.

---

## Avoid Circular Imports

Never create dependencies like

```
Player
 ↓
Weapon
 ↓
Inventory
 ↓
Player
```

Circular imports make debugging difficult and increase maintenance costs.

---

## Naming Conventions

Classes

```
PlayerController
EnemySpawner
AudioManager
```

Components

```
HealthComponent
MovementComponent
```

Interfaces

```
IWeapon
IDamageable
```

Enums

```
GameState
PlayerType
WeaponType
```

Constants

```
MAX_SPEED
DEFAULT_HEALTH
PLAYER_LAYER
```

Private fields

```
_currentHealth
_targetNode
```

---

# Folder Structure

Features should be grouped by domain instead of file type.

Example

```
Player/

    PlayerController.ts

    HealthComponent.ts

    MovementComponent.ts

    WeaponComponent.ts

    PlayerAnimation.ts

    Player.prefab
```

Avoid

```
Scripts/

Sprites/

Prefabs/

EverythingMixed/
```

Feature-first architecture scales significantly better.

---

# Scene Organization

Scenes should remain clean.

Recommended hierarchy

```
Canvas

Environment

Player

Enemies

UI

Managers

Effects
```

Avoid placing hundreds of unrelated nodes directly under Canvas.

---

# Code Style

Always use

- ES Modules
- Strict typing
- Meaningful variable names
- Small functions
- Early returns
- Clear comments where necessary

Avoid

- Magic numbers
- Large update() methods
- Nested conditionals
- Global variables
- Anonymous logic blocks

---

# Update Method

Do not place all gameplay logic inside

```
update(deltaTime)
```

The update loop should remain lightweight.

Heavy calculations should be event-driven or executed only when required.

---

# Performance Guidelines

Every feature should be written with performance in mind.

Recommended practices

- Object Pooling
- Asset Reuse
- Lazy Loading
- Event-driven updates
- Node caching
- Minimize draw calls
- Avoid unnecessary allocations

---

# Error Handling

Never silently ignore errors.

Prefer

```
Validate input

↓

Log meaningful information

↓

Recover gracefully
```

Every unexpected state should be handled intentionally.

---

# Documentation

Every reusable system should include documentation explaining:

- Purpose
- Usage
- Public API
- Limitations
- Dependencies

Good documentation reduces onboarding time and improves long-term maintainability.

---

# Code Reviews

Every pull request should satisfy the following checklist:

- Follows project structure
- Uses meaningful names
- No duplicated logic
- No circular imports
- Components have one responsibility
- No unnecessary allocations
- No unused code
- Proper error handling
- Readable and documented

---

# Teaching Philosophy

New developers joining the project are encouraged to understand **why** a pattern exists rather than simply copying code.

The objective is to build developers who can reason about architecture, performance, and maintainability instead of relying on trial and error.

Code reviews, documentation, and mentorship are considered part of the development process—not optional extras.

---

# Development Principles

This project follows a simple philosophy:

> Write code for the next developer.

Readable code is better than clever code.

Simple code is better than complex code.

Maintainable code is better than quick code.

Consistency is better than personal preference.

Every line of code should make the project easier—not harder—to understand.

---
