---
name: Frontend Personal Skill
description: Enterprise-grade frontend engineering rules for Next.js + React + TypeScript + Bun projects by @vivekcsein. Use this skill for ANY project setup, scaffolding, file creation, component writing, API wiring, state management, animation, styling, or code-quality decisions in a TypeScript/Next.js/React project. Trigger whenever the user mentions AGENT.md, project structure, Next.js, React components, Axios setup, Zod schemas, Tailwind v4, GSAP animations, Framer Motion / motion/react, environment validation, folder layout, path aliases, or asks to scaffold / create / wire up any frontend feature. This is the source of truth — always read it before writing a single line of frontend code.
---

# Enterprise Frontend Engineering Rules

> Author: @vivekcsein | Read this entire file before writing any code.

---

## 0. AGENT BOOT SEQUENCE

Run this checklist **in order** before any task:

```
[ ] 1. Read this entire SKILL.md
[ ] 2. Read README.md for project-specific overrides
[ ] 3. Confirm runtime: Bun (preferred) > Node.js
[ ] 4. Confirm framework: Next.js (default) or Vite+React
[ ] 5. Confirm folder structure matches §2 exactly
[ ] 6. Check tsconfig.json path aliases match §2 imports
[ ] 7. Confirm eslint, prettier, tsconfig are at root
[ ] 8. Confirm env variables are validated via Zod (§6)
```

---

## 1. LANGUAGE & RUNTIME

### 1.1 Language

- ⛔ **HARD** — All code is **TypeScript**. No `.js` or `.jsx` files in `src/`.
- ⛔ **HARD** — Never use `any`. Use `unknown` + narrowing/typecast instead.
- ✅ SOFT — Prefer `type` over `interface` unless declaration merging is needed.
- ✅ SOFT — Export types from `src/types/` as `.d.ts` files. Never scatter types inside component files.

### 1.2 Runtime

- ✅ SOFT — Use **Bun** as default runtime and package manager (`bun install`, `bun run`, `bun test`).
- ✅ SOFT — Fall back to **Node.js** only when a package is incompatible with Bun.
- ⛔ **HARD** — Never mix `npm`, `yarn`, and `bun` lock files in the same repo.

### 1.3 TypeScript Config (required at root)

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@app/*": ["./src/app/*"],
      "@components/*": ["./src/components/*"],
      "@packages/*": ["./src/packages/*"],
      "@styles/*": ["./src/styles/*"],
      "@types/*": ["./src/types/*"],
    },
    "outDir": "dist",
    "skipLibCheck": true,
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"],
}
```

---

## 2. FOLDER STRUCTURE

⛔ **HARD** — All projects must follow this layout. No deviations without a documented reason in README.md.

```
<project-root>/
├── src/
│   ├── app/                          # Core application shell
│   │   ├── app.tsx                   # Root <App /> component
│   │   ├── api/                      # REST / GraphQL route handlers
│   │   │   └── [resource]/
│   │   │       ├── route.ts
│   │   │       └── [resource].service.ts
│   │   ├── game-server/              # Colyseus multiplayer (optional)
│   │   ├── chat-server/              # WebSocket chat (optional)
│   │   └── voice-server/             # Voice integration (optional)
│   │
│   ├── components/
│   │   ├── features/                 # Domain-specific composite components
│   │   │   └── [feature-name]/
│   │   │       ├── index.ts
│   │   │       ├── [Feature].tsx
│   │   │       └── [Feature].test.tsx
│   │   ├── layouts/
│   │   │   └── AppClientLayout.tsx
│   │   ├── providers/
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── AuthProvider.tsx
│   │   └── ui/
│   │       ├── buttons/
│   │       ├── inputs/
│   │       ├── images/
│   │       ├── svg/
│   │       ├── Shadcn/
│   │       └── index.ts
│   │
│   ├── packages/
│   │   ├── api/
│   │   │   └── axios.api.ts
│   │   ├── configs/
│   │   │   └── db.config.ts
│   │   ├── utils/
│   │   │   ├── shadcn.ts
│   │   │   └── format.ts
│   │   ├── hooks/
│   │   │   └── useBreakPoints.ts
│   │   ├── shadcn/
│   │   ├── env/
│   │   │   └── app.env.ts
│   │   ├── forms/
│   │   │   └── [FormName].form.ts
│   │   └── schemas/
│   │       └── [resource].schema.ts
│   │
│   ├── styles/
│   │   ├── globals.css               # Tailwind @import, CSS vars, base resets
│   │   ├── ui.css                    # CSS for components/ui
│   │   ├── app.css                   # CSS for rest of application
│   │   └── animation.css             # All animation keyframes & GSAP helpers
│   │
│   ├── types/
│   │   ├── api.d.ts
│   │   ├── env.d.ts
│   │   └── global.d.ts
│   │
│   ├── main.tsx
│   └── index.css
│
├── public/
├── tests/e2e/
├── .env.example
├── .env.local
├── .eslintrc.json
├── .prettierrc
├── components.ts
├── bunfig.toml
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── AGENT.md
└── README.md
```

### 2.1 Basic Setup

- ✅ SOFT — No need to recreate default files from `next.js` init. Focus on `/src`.

### 2.2 File Naming Conventions

| Type             | Convention                 | Example                         |
| ---------------- | -------------------------- | ------------------------------- |
| React component  | `PascalCase.tsx`           | `UserCard.tsx`                  |
| Utility/helper   | `camelCase.ts`             | `formatDate.ts`                 |
| Schema           | `kebab-case.schema.ts`     | `user.schema.ts`                |
| Route handler    | `route.ts`                 | `app/api/users/route.ts`        |
| Test file        | `*.test.tsx` / `*.spec.ts` | `Button.test.tsx`               |
| Type declaration | `camelCase.d.ts`           | `api.d.ts`                      |
| Barrel export    | `index.ts`                 | `components/ui/Button/index.ts` |
| Config           | `camelCase.config.ts`      | `tailwind.config.ts`            |

### 2.3 Import Alias Rules

⛔ **HARD** — Always use path aliases. Never use `../../..` relative paths across feature boundaries.

```typescript
// ✅ Correct
import { Button } from "@components/ui/Button";
import { userSchema } from "@packages/schemas/user.schema";
import type { User } from "@types/api";

// ⛔ Wrong
import { Button } from "../../../components/ui/Button";
```

---

## 3. REACT COMPONENT RULES

### 3.1 Syntax

⛔ **HARD** — All components use **arrow function syntax**. Never use the `function` keyword for components.

```typescript
// ✅ Correct
const UserCard = ({ name, email }: UserCardProps): JSX.Element => {
  return <div>{name}</div>
}
export default UserCard

// ⛔ Wrong
function UserCard({ name, email }) { ... }
```

### 3.2 Props Typing

⛔ **HARD** — Every component must have an explicit props type. Use `type`, not `interface`, unless you need declaration merging.

### 3.3 Component File Structure (order matters)

```typescript
// 1. React/library imports
// 2. Third-party imports
// 3. Internal imports (aliases only)
// 4. Type definitions (local to this file only)
// 5. Component
// 6. Subcomponents (if small and tightly coupled)
// 7. Default export at bottom
```

### 3.4 Client vs Server Components (Next.js)

- ✅ SOFT — Default to **Server Components**. Only add `'use client'` when you need interactivity, browser APIs, or Motion.
- ⛔ **HARD** — Never put global context providers in a Server Component.
- ⛔ **HARD** — Never use `useState` for continuous values (scroll, mouse position). Use `motion`'s `useMotionValue` / `useScroll`.

### 3.5 Hooks Rules

- ✅ SOFT — Custom hooks live in `src/packages/utils/hooks/` or co-located in the feature folder.
- ⛔ **HARD** — Never call hooks conditionally.

---

## 4. STYLING

### 4.1 Tailwind (default)

- ✅ SOFT — Use **Tailwind v4** for all new projects.
- ⛔ **HARD** — Do NOT use `tailwindcss` plugin in `postcss.config.js` for v4. Use `@tailwindcss/vite` or `@tailwindcss/nextjs`.
- ✅ SOFT — Use the `cn()` utility from `@packages/utils/cn`.

```typescript
// src/packages/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

### 4.2 CSS Variables

- ✅ SOFT — Define all design tokens as CSS variables in `globals.css`. Never hardcode hex values inline.
- ⛔ **HARD** — Color names must be compatible with shadcn color scheme. Avoid fancy names.

See → `references/globals-css-template.md` for the full variable reference.

### 4.3 No Inline Styles

- ✅ SOFT — Avoid `style={{}}` except for dynamic values that can't be expressed as Tailwind classes.
- ⛔ **HARD** — For complex components, extract styles to a typed `styles` object for maintainability.

---

## 5. HTTP & DATA FETCHING

### 5.1 HTTP Client

- ✅ SOFT — Use **Axios** for REST calls. Configure a singleton in `src/packages/api/axios.api.ts`.
- ✅ SOFT — All API response types must be typed — no `any`.

```typescript
// src/packages/api/axios.api.ts
import axios from "axios";
import { env } from "@packages/env/app.env";

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  // attach auth token
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err: unknown) => Promise.reject(err),
);
```

### 5.2 Server-Side Fetching (Next.js)

- ✅ SOFT — Use native `fetch` with `cache` and `next.revalidate` in Server Components. Reserve Axios for client-side or edge handlers.

### 5.3 Data Schemas

- ⛔ **HARD** — Every API response must be parsed through a **Zod schema** before use.

```typescript
// src/packages/schemas/user.schema.ts
import { z } from "zod";
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.coerce.date(),
});
export type User = z.infer<typeof UserSchema>;
```

---

## 6. ENVIRONMENT & CONFIG

### 6.1 Zod Env Validation

⛔ **HARD** — All `process.env` access must go through the validated env object. Direct `process.env.X` access outside `src/packages/env/` is forbidden.

```typescript
// src/packages/env/app.env.ts
import { z } from "zod";
const envSchema = z.object({
  APP_NAME: z.string().min(6).default("Web-App"),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_API_URL: z.string().url(),
});
export const env = envSchema.parse(process.env);
```

### 6.2 .env Files

| File              | Committed? | Purpose                    |
| ----------------- | ---------- | -------------------------- |
| `.env.example`    | ✅ Yes     | Template with dummy values |
| `.env.local`      | ⛔ No      | Local dev secrets          |
| `.env.production` | ⛔ No      | Prod secrets (CI/CD only)  |
| `.env.test`       | ✅ Yes     | Safe test values only      |

---

## 7. STATE MANAGEMENT

| Scope                     | Tool                                         |
| ------------------------- | -------------------------------------------- |
| Local component UI state  | `useState` / `useReducer`                    |
| Cross-component (shallow) | React Context (`src/components/providers/`)  |
| Global app state          | **Zustand**                                  |
| Server / async state      | **TanStack Query** (`@tanstack/react-query`) |
| Forms                     | **react-hook-form** + Zod resolver           |
| Continuous motion values  | `motion`'s `useMotionValue`, `useScroll`     |

⛔ **HARD** — Never use `useState` for values that change on every animation frame.

---

## 8. FORMS

```typescript
// src/packages/forms/SigninForm.form.ts
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const useLoginForm = () => useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
```

---

## 9. ANIMATIONS

> **Full animation details** → `references/animation-guide.md`

### 9.1 Library Selection

| Use Case                        | Library                    |
| ------------------------------- | -------------------------- |
| UI components, page transitions | `motion/react` (Framer)    |
| Complex timelines, scroll rigs  | **GSAP**                   |
| CSS-only micro-interactions     | Tailwind + `animation.css` |
| Continuous motion values        | `useMotionValue`           |

### 9.2 motion/react (Framer Motion)

- ✅ SOFT — Import as `import { motion } from 'motion/react'`.
- ⛔ **HARD** — Any component with `motion.*`, scroll listeners, or pointer physics **must** be a `'use client'` leaf.
- ✅ SOFT — Always respect `prefers-reduced-motion`:

```typescript
import { useReducedMotion } from 'motion/react'

const FadeIn = ({ children }: { children: React.ReactNode }) => {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}
```

### 9.3 GSAP — Quick Reference

⛔ **HARD** — Any component using GSAP **must** be `'use client'`. Register plugins inside `useEffect`, never at module scope in SSR contexts.

```typescript
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
      })
    }, containerRef)

    return () => ctx.revert() // ⚠️ Always clean up
  }, [])

  return (
    <div ref={containerRef}>
      <h1 className="hero-title">Hello</h1>
      <p className="hero-subtitle">World</p>
    </div>
  )
}
```

**Core rules:**

- Always use `gsap.context()` scoped to a `ref` — enables proper cleanup
- Always return `ctx.revert()` from `useEffect` cleanup
- Use `gsap.matchMedia()` for responsive + reduced-motion handling
- Prefer transform aliases (`x`, `y`, `scale`, `rotation`) over raw CSS transforms
- Use `autoAlpha` instead of `opacity` (also toggles `visibility`)

> For full GSAP docs (timelines, ScrollTrigger, stagger, easing reference) → `references/animation-guide.md`

### 9.4 CSS Animations (`src/styles/animation.css`)

All reusable keyframes and CSS animation utilities live in `animation.css`, imported from `globals.css`. This keeps animation logic centralized and tree-shakeable.

**GSAP-Complementary CSS Animations** — use for initial states, skeleton loaders, and micro-interactions that don't need JS orchestration:

```css
/* src/styles/animation.css */

/* ─── Easing tokens (used by both CSS and as GSAP ease strings) ─── */
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Duration scale */
  --dur-micro: 100ms;
  --dur-fast: 200ms;
  --dur-base: 300ms;
  --dur-slow: 500ms;
  --dur-crawl: 800ms;
}

/* ─── Entrance keyframes ─── */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scale-in-spring {
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  60% {
    opacity: 1;
    transform: scale(1.04);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes slide-in-bottom {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ─── Exit keyframes ─── */
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes fade-out-up {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-24px);
  }
}

@keyframes scale-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.92);
  }
}

/* ─── Looping / ambient ─── */
@keyframes pulse-opacity {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes pulse-scale {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes shimmer {
  from {
    background-position: -200% 0;
  }
  to {
    background-position: 200% 0;
  }
}

@keyframes bounce-y {
  0%,
  100% {
    transform: translateY(0);
    animation-timing-function: ease-in;
  }
  50% {
    transform: translateY(-12px);
    animation-timing-function: ease-out;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes wiggle {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-6deg);
  }
  75% {
    transform: rotate(6deg);
  }
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.15);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(1);
  }
}

/* ─── Draw / reveal ─── */
@keyframes draw-line {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@keyframes clip-reveal-x {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0% 0 0);
  }
}

@keyframes clip-reveal-y {
  from {
    clip-path: inset(100% 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

/* ─── Skeleton / loading ─── */
@keyframes skeleton-wave {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}

/* ─── Utility classes ─── */

/* Entrance */
.animate-fade-in {
  animation: fade-in var(--dur-base) var(--ease-out-expo) both;
}
.animate-fade-in-up {
  animation: fade-in-up var(--dur-base) var(--ease-out-expo) both;
}
.animate-fade-in-down {
  animation: fade-in-down var(--dur-base) var(--ease-out-expo) both;
}
.animate-fade-in-left {
  animation: fade-in-left var(--dur-base) var(--ease-out-expo) both;
}
.animate-fade-in-right {
  animation: fade-in-right var(--dur-base) var(--ease-out-expo) both;
}
.animate-scale-in {
  animation: scale-in var(--dur-base) var(--ease-out-expo) both;
}
.animate-scale-in-spring {
  animation: scale-in-spring var(--dur-slow) var(--ease-spring) both;
}
.animate-slide-bottom {
  animation: slide-in-bottom var(--dur-slow) var(--ease-out-expo) both;
}

/* Exit */
.animate-fade-out {
  animation: fade-out var(--dur-fast) var(--ease-in-expo) both;
}
.animate-fade-out-up {
  animation: fade-out-up var(--dur-fast) var(--ease-in-expo) both;
}
.animate-scale-out {
  animation: scale-out var(--dur-fast) var(--ease-in-expo) both;
}

/* Looping */
.animate-pulse-opacity {
  animation: pulse-opacity 2s ease-in-out infinite;
}
.animate-pulse-scale {
  animation: pulse-scale 2s ease-in-out infinite;
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.animate-bounce-y {
  animation: bounce-y 1s infinite;
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
.animate-wiggle {
  animation: wiggle 0.5s ease-in-out;
}
.animate-heartbeat {
  animation: heartbeat 1.3s ease-in-out infinite;
}

/* Draw */
.animate-draw-line {
  animation: draw-line var(--dur-slow) var(--ease-out-expo) both;
}
.animate-clip-x {
  animation: clip-reveal-x var(--dur-slow) var(--ease-out-expo) both;
}
.animate-clip-y {
  animation: clip-reveal-y var(--dur-slow) var(--ease-out-expo) both;
}

/* Shimmer (skeleton loader) */
.animate-shimmer {
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 25%,
    hsl(var(--border)) 50%,
    hsl(var(--muted)) 75%
  );
  background-size: 400px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

/* Skeleton wave */
.skeleton {
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 25%,
    hsl(var(--muted-foreground) / 0.15) 50%,
    hsl(var(--muted)) 75%
  );
  background-size: 400px 100%;
  animation: skeleton-wave 1.6s ease-in-out infinite;
  border-radius: var(--radius);
}

/* ─── Delay utilities ─── */
.delay-75 {
  animation-delay: 75ms;
}
.delay-100 {
  animation-delay: 100ms;
}
.delay-150 {
  animation-delay: 150ms;
}
.delay-200 {
  animation-delay: 200ms;
}
.delay-300 {
  animation-delay: 300ms;
}
.delay-500 {
  animation-delay: 500ms;
}
.delay-700 {
  animation-delay: 700ms;
}

/* ─── Duration overrides ─── */
.duration-fast {
  animation-duration: var(--dur-fast);
}
.duration-base {
  animation-duration: var(--dur-base);
}
.duration-slow {
  animation-duration: var(--dur-slow);
}
.duration-crawl {
  animation-duration: var(--dur-crawl);
}

/* ─── GSAP initial-state helpers ─── */
/* Apply before GSAP takes over to prevent flash-of-unstyled-content */
.gsap-hidden {
  opacity: 0;
}
.gsap-hidden-up {
  opacity: 0;
  transform: translateY(24px);
}
.gsap-hidden-down {
  opacity: 0;
  transform: translateY(-24px);
}
.gsap-hidden-left {
  opacity: 0;
  transform: translateX(24px);
}
.gsap-hidden-right {
  opacity: 0;
  transform: translateX(-24px);
}
.gsap-hidden-scale {
  opacity: 0;
  transform: scale(0.9);
}

/* ─── Reduced Motion override (always last) ─── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Usage patterns:**

```tsx
// Pure CSS entrance (no JS needed)
<div className="animate-fade-in-up delay-200">Content</div>

// Staggered children (CSS custom property)
<ul>
  {items.map((item, i) => (
    <li
      key={item.id}
      className="animate-fade-in-up"
      style={{ animationDelay: `${i * 80}ms` }}
    >
      {item.label}
    </li>
  ))}
</ul>

// Skeleton loader
<div className="skeleton h-6 w-3/4" />
<div className="skeleton h-4 w-1/2 mt-2" />

// GSAP initial state (prevents FOUC before GSAP runs)
<h1 className="hero-title gsap-hidden-up">Hero</h1>
```

### 9.5 GSAP + CSS Animation Integration Pattern

Use CSS animations for **mount/unmount** and GSAP for **scroll/interaction choreography** in the same component:

```typescript
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AnimatedSection = () => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered stagger — GSAP handles this
      gsap.from('.card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cards-grid',
          start: 'top 80%',
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref}>
      {/* Spinner uses CSS animation — no GSAP needed */}
      <div className="animate-spin w-6 h-6 border-2 border-primary rounded-full" />
      {/* Cards use gsap-hidden for FOUC prevention, GSAP animates them */}
      <div className="cards-grid">
        {cards.map((card) => (
          <div key={card.id} className="card gsap-hidden-up">
            {card.content}
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

## 10. ICONS

- ✅ SOFT — Default: **`lucide-react`**. Secondary (if needed): `@tabler/icons-react`.
- ⛔ **HARD** — Never hand-roll SVG icon paths.
- ⛔ **HARD** — Never mix icon families in the same project.

```typescript
// src/components/ui/images/LucidIcon.tsx
import type { LucideIcon } from 'lucide-react'

type IconProps = {
  icon: LucideIcon
  size?: number
  className?: string
}

const LucidIcon = ({ icon: IconComponent, size = 20, className }: IconProps) => (
  <IconComponent size={size} className={className} />
)

export default LucidIcon
```

---

## 11. CODE QUALITY & TOOLING

### ESLint (`.eslintrc.json`)

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:tailwindcss/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/consistent-type-imports": ["error", { "prefer": "type-imports" }],
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### Prettier (`.prettierrc`)

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Bun Config (`bunfig.toml`)

```toml
[install]
frozen = true

[test]
coverage = true
```

---

## 12. TESTING

| Layer              | Minimum Coverage |
| ------------------ | ---------------- |
| Utility functions  | 90%              |
| Feature components | 70%              |
| API route handlers | 80%              |

- Unit/integration: **Vitest** + **@testing-library/react**
- Pure TS utils: **Bun test**
- E2E: **Playwright** in `tests/e2e/`
- ⛔ **HARD** — Test files co-located with source.

---

## 13. GIT & COMMITS

- ✅ SOFT — Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.
- ✅ SOFT — **Husky** + **lint-staged** for pre-commit eslint + prettier.
- ⛔ **HARD** — Never commit `.env.local`, secrets, or `node_modules`.

---

## 14. ANTI-PATTERNS (NEVER DO)

| ⛔ Forbidden                   | ✅ Do instead                                |
| ------------------------------ | -------------------------------------------- |
| `any` type                     | `unknown` + narrowing                        |
| `function ComponentName()`     | `const ComponentName = () =>`                |
| `../../relative/deep/import`   | `@alias/path`                                |
| `process.env.X` directly       | `env.X` from `@packages/env`                 |
| Raw API data without schema    | Zod `.parse()` first                         |
| `useState` for scroll/pointer  | `useMotionValue` / `useScroll`               |
| Hand-rolled SVG icons          | Lucide icon library                          |
| Mixed icon families            | One family per project                       |
| `console.log` in production    | `console.warn` / `console.error` only        |
| Hardcoded hex colors           | CSS variables                                |
| Logic in `.tsx` files          | Extract to `@packages/utils/`                |
| GSAP outside `useEffect`       | Always inside `gsap.context()` + `useEffect` |
| GSAP without cleanup           | Always return `ctx.revert()`                 |
| CSS animations for scroll rigs | Use GSAP ScrollTrigger instead               |
| GSAP for simple hover states   | Use Tailwind transitions instead             |

---

## 15. AGENT DECISION TREE

```
Is this a React component?
  └─ YES → Needs browser APIs / state / motion?
              └─ YES → 'use client' leaf in src/components/
              └─ NO  → Server Component in src/app/ or src/components/
  └─ NO  → Utility / helper / schema?
              └─ YES → src/packages/  (.ts only, no JSX)
              └─ NO  → Type?
                          └─ YES → src/types/  (.d.ts)
                          └─ NO  → src/app/api/ (route handler)

Touches external data?
  └─ YES → Define Zod schema in src/packages/schemas/ first
           Then type the Axios/fetch call against that schema

Needs animation?
  └─ Simple hover / mount transition → Tailwind + animation.css class
  └─ Scroll-triggered / complex timeline → GSAP + ScrollTrigger
  └─ Page transitions / layout animations → motion/react
  └─ Continuous values (pointer, scroll pos) → useMotionValue

Needs env variables?
  └─ YES → Add to Zod schema in src/packages/env/app.env.ts first
           Then add to .env.example (dummy value only)
```

---

## 16. NEW FEATURE CHECKLIST

```
[ ] 1. Schema:    src/packages/schemas/[feature].schema.ts
[ ] 2. Service:   src/app/api/[feature]/[feature].service.ts
[ ] 3. Route:     src/app/api/[feature]/route.ts
[ ] 4. Hook:      src/packages/hooks/use[Feature].ts
[ ] 5. Component: src/components/features/[feature]/
[ ] 6. Barrel:    src/components/features/[feature]/index.ts
[ ] 7. Tests:     co-located *.test.tsx
[ ] 8. Env:       update .env.example if new vars added
[ ] 9. README:    update if public API changed
```

---

## 17. REFERENCES

For detailed specs, load on demand:

| File                                 | When to read                                                      |
| ------------------------------------ | ----------------------------------------------------------------- |
| `references/animation-guide.md`      | Writing GSAP timelines, ScrollTrigger rigs, motion/react patterns |
| `references/globals-css-template.md` | Full CSS variable token system, dark mode, fluid type scale       |
| `references/axios-patterns.md`       | Interceptor patterns, retry logic, multipart/file upload          |

---

_Last updated: enforced from project init. All rules apply to every new session unless overridden in README.md._
