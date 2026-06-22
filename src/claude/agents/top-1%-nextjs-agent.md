# AGENT.md — Enterprise Frontend Engineering Rules

> This file is the **source of truth** for every agentic session. Read it fully before writing a single line.  
> Non-negotiable rules are marked **⛔ HARD**. Best-practice rules are marked **✅ SOFT**.

---

## 0. AGENT BOOT SEQUENCE

Before doing anything in a new project or task, run this checklist **in order**:

```
[ ] 1. Read this entire AGENT.md
[ ] 2. Read README.md for project-specific overrides
[ ] 3. Confirm runtime: Bun (preferred) > Node.js
[ ] 4. Confirm framework: Next.js (default) or Vite+React
[ ] 5. Confirm the folder structure matches §2 exactly
[ ] 6. Check that tsconfig.json paths aliases match §2 imports
[ ] 7. Check that eslint, prettier, and tsconfig are at root
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

- ✅ SOFT — Use **Bun** as the default runtime and package manager (`bun install`, `bun run`, `bun test`).
- ✅ SOFT — Fall back to **Node.js** only when a package is incompatible with Bun.
- ⛔ **HARD** — Never mix `npm`, `yarn`, and `bun` lock files in the same repo. Pick one and commit it.

### 1.3 TypeScript Config (required at root)

```jsonc
// tsconfig.json (root)
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
      "@types/*": ["./src/types/*"],
      "@styles/*": ["./src/styles/*"],
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

⛔ **HARD** — All projects **must** follow this layout. No deviations without a documented reason in README.md.

```
<project-root>/
├── src/
│   ├── app/                        # Core application shell
│   │   ├── app.tsx                 # Root <App /> component
│   │   ├── api/                    # REST / GraphQL route handlers
│   │   │   └── [resource]/
│   │   │       ├── route.ts        # Next.js App Router handler
│   │   │       └── [resource].service.ts
│   │   ├── game-server/            # Colyseus multiplayer (optional)
│   │   ├── chat-server/            # WebSocket chat (optional)
│   │   └── voice-server/           # Voice integration (optional)
│   │
│   ├── components/                 # ALL React components (.tsx)
│   │   ├── features/               # Domain-specific composite components
│   │   │   └── [feature-name]/
│   │   │       ├── index.ts        # Barrel export
│   │   │       ├── [Feature].tsx
│   │   │       └── [Feature].test.tsx
│   │   ├── layouts/                # Page shells, wrappers, grids
│   │   │   └── RootLayout.tsx
│   │   ├── providers/              # React context providers
│   │   │   └── ThemeProvider.tsx
│   │   └── ui/                     # Atomic / headless UI primitives
│   │       ├── Button/
│   │       │   ├── index.ts
│   │       │   ├── Button.tsx
│   │       │   └── Button.test.tsx
│   │       ├── Shadcn/             # shadcn components
│   │       └── ...
│   │
│   ├── packages/                   # Shared TS utilities (.ts, NO .tsx)
│   │   ├── configs/                # DB, Redis, third-party SDK configs
│   │   │   └── db.ts
│   │   ├── utils/                  # Pure helper functions
│   │   │   ├── cn.ts               # Tailwind class merger
│   │   │   └── format.ts
│   │   ├── shadcn/                 # shadcn registry helpers
│   │   ├── env/                    # Zod environment validation
│   │   │   └── index.ts
│   │   ├── forms/                  # react-hook-form + zod resolvers
│   │   │   └── [FormName].form.ts
│   │   └── schemas/                # Zod schemas + inferred types
│   │       └── [resource].schema.ts
│   │
│   ├── styles/
│   │   └── globals.css             # Tailwind @import, CSS vars, base resets
│   │
│   ├── types/                      # Global TS declarations (.d.ts only)
│   │   ├── api.d.ts
│   │   ├── env.d.ts
│   │   └── global.d.ts
│   │
│   ├── main.tsx                    # ReactDOM.createRoot entry (Vite)
│   └── index.css                   # Vite CSS entry (imports globals.css)
│
├── public/                         # Static assets (images, fonts, icons)
├── tests/                          # E2E tests (Playwright)
│   └── e2e/
├── .env.example                    # Committed env template (no secrets)
├── .env.local                      # Never committed (gitignored)
├── .eslintrc.json
├── .prettierrc
├── bunfig.toml                     # Bun configuration
├── next.config.ts                  # Next.js config (if applicable)
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json
├── AGENT.md                        ← this file
└── README.md
```

### 2.1 File Naming Conventions

| Type             | Convention                 | Example                         |
| ---------------- | -------------------------- | ------------------------------- |
| React component  | `PascalCase.tsx`           | `UserCard.tsx`                  |
| Utility / helper | `camelCase.ts`             | `formatDate.ts`                 |
| Schema           | `kebab-case.schema.ts`     | `user.schema.ts`                |
| Route handler    | `route.ts`                 | `app/api/users/route.ts`        |
| Test file        | `*.test.tsx` / `*.spec.ts` | `Button.test.tsx`               |
| Type declaration | `camelCase.d.ts`           | `api.d.ts`                      |
| Barrel export    | `index.ts`                 | `components/ui/Button/index.ts` |
| Config           | `camelCase.config.ts`      | `tailwind.config.ts`            |

### 2.2 Import Alias Rules

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
function UserCard({ name, email }) {
  return <div>{name}</div>
}
```

### 3.2 Props Typing

⛔ **HARD** — Every component must have an explicit props type. Use `type`, not `interface`, unless you need declaration merging.

```typescript
// ✅ Correct
type UserCardProps = {
  name: string
  email: string
  onSelect?: (id: string) => void
  children?: React.ReactNode
}

const UserCard = ({ name, email, onSelect, children }: UserCardProps) => { ... }
```

### 3.3 Component File Structure (order matters)

```typescript
// 1. React/library imports
import { useState, useCallback } from 'react'

// 2. Third-party imports
import { motion } from 'motion/react'

// 3. Internal imports (aliases only)
import { cn } from '@packages/utils/cn'
import type { User } from '@types/api'

// 4. Type definitions (local to this file only)
type Props = { ... }

// 5. Component
const MyComponent = (props: Props) => { ... }

// 6. Subcomponents (if small and tightly coupled)

// 7. Default export at bottom
export default MyComponent
```

### 3.4 Client vs Server Components (Next.js)

- ✅ SOFT — Default to **Server Components**. Only add `'use client'` when you need interactivity, browser APIs, or Motion.
- ⛔ **HARD** — Never put global context providers in a Server Component. Wrap them in a `'use client'` leaf.
- ⛔ **HARD** — Never use `useState` for continuous values (scroll, mouse position). Use `motion`'s `useMotionValue` / `useScroll`.

### 3.5 Hooks Rules

- ✅ SOFT — Custom hooks live in `src/packages/utils/hooks/` or co-located in the feature folder.
- ✅ SOFT — Prefix with `use` strictly. No exceptions.
- ⛔ **HARD** — Never call hooks conditionally.

---

## 4. STYLING

### 4.1 Tailwind (default)

- ✅ SOFT — Use **Tailwind v4** for all new projects.
- ⛔ **HARD** — Do NOT use `tailwindcss` plugin in `postcss.config.js` for v4. Use `@tailwindcss/vite` (Vite) or `@tailwindcss/nextjs` (Next.js).
- ✅ SOFT — Use the `cn()` utility from `@packages/utils/cn` (combines `clsx` + `tailwind-merge`).

```typescript
// src/packages/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

### 4.2 CSS Variables

- ✅ SOFT — Define all design tokens as CSS variables in `globals.css`. Never hardcode hex values inline.

```css
/* src/styles/globals.css */
@layer base {
  :root {
    --background: 0 0% 98%;
    --foreground: 260 30% 15%;

    --card: 0 0% 100%;
    --card-foreground: 260 30% 15%;

    --primary: 262 83% 64%;
    --primary-foreground: 0 0% 100%;

    --secondary: 262 60% 95%;
    --secondary-foreground: 260 60% 30%;

    --accent: 262 70% 75%;
    --accent-foreground: 260 60% 25%;

    --muted: 262 50% 96%;
    --muted-foreground: 260 30% 50%;

    --border: 220 14% 90%;
    --input: 210 40% 96%;
    --ring: 262 83% 64%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    /* ── Shape ── */
    --radius: 0.5rem;
  }

  /* 🌙 DARK MODE (DEFAULT) */
  @media (prefers-color-scheme: dark) {
    .dark {
      --background: 258 40% 8%;
      --foreground: 260 30% 95%;

      --card: 258 40% 12%;
      --card-foreground: 260 30% 95%;

      --primary: 263 70% 70%;
      --primary-foreground: 258 40% 8%;

      --secondary: 240 40% 20%;
      --secondary-foreground: 262 70% 75%;

      --accent: 262 60% 50%;
      --accent-foreground: 0 0% 100%;

      --muted: 258 40% 15%;
      --muted-foreground: 260 20% 65%;

      --border: 258 30% 20%;
      --input: 258 30% 15%;
      --ring: 263 70% 70%;

      --destructive: 0 70% 55%;
      --destructive-foreground: 0 0% 100%;
    }
  }

  :root {
    /* 🔥 Fluid type scale */
    --fs-h1: clamp(1.8rem, 3.5vw + 0.5rem, 2.8rem);
    --fs-h2: clamp(1.5rem, 2.8vw + 0.4rem, 2.2rem);
    --fs-h3: clamp(1.25rem, 2vw + 0.3rem, 1.6rem);
    --fs-h4: clamp(1.05rem, 1.2vw + 0.2rem, 1.2rem);
    --fs-h5: 0.95rem;
    --fs-h6: 0.85rem;

    --fs-body: clamp(0.95rem, 0.6vw + 0.85rem, 1rem);
    --fs-small: clamp(0.8rem, 0.4vw + 0.75rem, 0.875rem);

    /* 📏 Line heights */
    --lh-tight: 1.2;
    --lh-normal: 1.6;
    --lh-relaxed: 1.7;

    /* space  */
    --space-1: 0.5rem;
    --space-2: 1rem;
    --space-3: 1.5rem;
  }
}
```

### 4.3 No Inline Styles

- ✅ SOFT — Avoid `style={{}}` except for dynamic values that cannot be expressed as Tailwind classes (e.g. CSS custom property injection from JS).

---

## 5. HTTP & DATA FETCHING

### 5.1 HTTP Client

- ✅ SOFT — Use **Axios** for REST calls. Configure a singleton instance in `src/packages/configs/axios.ts`.
- ✅ SOFT — All API response types must be typed — no `any`.

```typescript
// src/packages/configs/axios.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  // attach auth token
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err: unknown) => {
    // centralised error handling
    return Promise.reject(err);
  },
);
```

### 5.2 Server-Side Fetching (Next.js)

- ✅ SOFT — Use native `fetch` with `cache` and `next.revalidate` options in Server Components. Reserve Axios for client-side or edge route handlers.

### 5.3 Data Schemas

- ⛔ **HARD** — Every API response must be parsed through a **Zod schema** before use. Never trust raw network data.

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
// src/packages/env/app.ts
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

| Scope                     | Tool                                           |
| ------------------------- | ---------------------------------------------- |
| Local component UI state  | `useState` / `useReducer`                      |
| Cross-component (shallow) | React Context (in `src/components/providers/`) |
| Global app state          | **Zustand** (preferred)                        |
| Server / async state      | **TanStack Query** (`@tanstack/react-query`)   |
| Forms                     | **react-hook-form** + Zod resolver             |
| Continuous motion values  | `motion`'s `useMotionValue`, `useScroll`       |

⛔ **HARD** — Never use `useState` for values that change on every animation frame (pointer position, scroll offset, physics simulations).

---

## 8. FORMS

```typescript
// src/packages/forms/LoginForm.form.ts
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

## 9. TESTING

### 9.1 Unit + Integration

- ✅ SOFT — Use **Vitest** + **@testing-library/react** for components and hooks.
- ✅ SOFT — Use **Bun test** for pure TypeScript utility functions.
- ⛔ **HARD** — Test files live co-located with their source: `Button.tsx` → `Button.test.tsx`.

### 9.2 E2E

- ✅ SOFT — Use **Playwright** for E2E tests in `tests/e2e/`.

### 9.3 Coverage Targets

| Layer                           | Minimum |
| ------------------------------- | ------- |
| Utility functions (`packages/`) | 90%     |
| Feature components              | 70%     |
| API route handlers              | 80%     |

---

## 10. ICONS

- ✅ SOFT — Default icon library: **`@lucid-icons/react`**
- ✅ SOFT — Secondary (if needed): `@tabler/icons-react`
- ⛔ **HARD** — Never hand-roll SVG icon paths.
- ⛔ **HARD** — Never mix icon families in the same project.
- ✅ SOFT — Standardize `size` and `weight` globally via a wrapper component.

```typescript
// src/components/ui/Icon/Icon.tsx
import type { Icon as LucidIcon } from '@lucid-icons/react'

type IconProps = {
  icon: LucidIcon
  size?: number
  className?: string
}

const Icon = ({ icon: IconComponent, size = 20, className }: IconProps) => (
  <IconComponent size={size} weight="regular" className={className} />
)

export default Icon
```

---

## 11. ANIMATIONS

- ✅ SOFT — Use **`motion/react`** (`import { motion } from 'motion/react'`).
- ⛔ **HARD** — Any component with `motion.*`, scroll listeners, or pointer physics **must** be a leaf with `'use client'`.
- ✅ SOFT — Always respect `prefers-reduced-motion`:

```typescript
import { useReducedMotion } from 'motion/react'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const FadeIn = ({ children }: { children: React.ReactNode }) => {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      variants={reduceMotion ? undefined : variants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}
```

---

## 12. CODE QUALITY & TOOLING (root config files)

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
frozen = true   # equivalent of --frozen-lockfile

[test]
coverage = true
```

---

## 13. GIT & COMMITS

- ✅ SOFT — Use **Conventional Commits**: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.
- ✅ SOFT — Use **Husky** + **lint-staged** to run `eslint --fix` + `prettier --write` on pre-commit.
- ⛔ **HARD** — Never commit `.env.local`, secrets, or `node_modules`.

---

## 14. ANTI-PATTERNS (NEVER DO)

| ⛔ Forbidden                  | ✅ Do instead                         |
| ----------------------------- | ------------------------------------- |
| `any` type                    | `unknown` + narrowing                 |
| `function ComponentName()`    | `const ComponentName = () =>`         |
| `../../relative/deep/import`  | `@alias/path`                         |
| `process.env.X` directly      | `env.X` from `@packages/env`          |
| Raw API data without schema   | Zod `.parse()` first                  |
| `useState` for scroll/pointer | `useMotionValue` / `useScroll`        |
| Hand-rolled SVG icons         | Icon library                          |
| Mixed icon families           | One family per project                |
| `console.log` in production   | `console.warn` / `console.error` only |
| Hardcoded hex colors          | CSS variables                         |
| Logic in `.tsx` files         | Extract to `@packages/utils/`         |

---

## 15. AGENT DECISION TREE

When asked to build or modify something, run through this:

```
Is this a React component?
  └─ YES → Does it need browser APIs / state / motion?
              └─ YES → 'use client' leaf in src/components/
              └─ NO  → Server Component in src/app/ or src/components/
  └─ NO  → Is it a utility / helper / schema?
              └─ YES → src/packages/  (.ts only, no JSX)
              └─ NO  → Is it a type?
                          └─ YES → src/types/  (.d.ts)
                          └─ NO  → src/app/api/ (route handler)

Does it touch external data?
  └─ YES → Define Zod schema in src/packages/schemas/ first
           Then type the Axios/fetch call against that schema

Does it need env variables?
  └─ YES → Add to Zod schema in src/packages/env/index.ts first
           Then add to .env.example (dummy value only)
```

---

## 16. ADDING A NEW FEATURE — CHECKLIST

```
[ ] 1. Create schema:  src/packages/schemas/[feature].schema.ts
[ ] 2. Create service: src/app/api/[feature]/[feature].service.ts
[ ] 3. Create route:   src/app/api/[feature]/route.ts
[ ] 4. Create hook:    src/packages/utils/hooks/use[Feature].ts
[ ] 5. Create feature component: src/components/features/[feature]/
[ ] 6. Export via barrel: src/components/features/[feature]/index.ts
[ ] 7. Add unit tests co-located
[ ] 8. Update .env.example if new env vars added
[ ] 9. Update README.md if public API changed
```

---

_Last updated: enforced from project init. All rules apply to every new session unless overridden in README.md._
