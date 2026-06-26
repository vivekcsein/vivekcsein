# Animation Guide Reference

Detailed patterns for GSAP, motion/react, and CSS animations in the enterprise frontend stack.

---

## Table of Contents

1. [GSAP Setup & Plugin Registration](#gsap-setup)
2. [GSAP Timelines](#gsap-timelines)
3. [ScrollTrigger Patterns](#scrolltrigger)
4. [GSAP Easing Reference](#gsap-easing)
5. [motion/react Patterns](#motion-react)
6. [CSS Animation Tokens](#css-tokens)
7. [Integration Patterns](#integration)
8. [Performance Checklist](#performance)

---

## 1. GSAP Setup & Plugin Registration {#gsap-setup}

```bash
bun add gsap
bun add -d @types/gsap  # if needed
```

### Plugin Registration (Next.js App Router)

```typescript
// src/packages/utils/gsap.ts  ← centralized registration
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Flip } from "gsap/Flip";

// Register once — safe to call multiple times
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, Flip);
}

export { gsap, ScrollTrigger, TextPlugin, Flip };
```

Import from this utility rather than re-registering in every component:

```typescript
import { gsap, ScrollTrigger } from "@packages/utils/gsap";
```

---

## 2. GSAP Timelines {#gsap-timelines}

### Basic sequence

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power2.out" },
    });

    tl.from(".nav", { y: -40, opacity: 0 })
      .from(".hero-h1", { y: 60, opacity: 0 }, "-=0.3")
      .from(".hero-p", { y: 40, opacity: 0 }, "-=0.3")
      .from(".hero-cta", { y: 30, opacity: 0, scale: 0.95 }, "-=0.2");
  }, containerRef);

  return () => ctx.revert();
}, []);
```

### Position parameter cheatsheet

| Syntax      | Meaning                                   |
| ----------- | ----------------------------------------- |
| `0`         | Absolute 0s from timeline start           |
| `"+=0.2"`   | 0.2s after previous tween ends            |
| `"-=0.3"`   | 0.3s before previous tween ends (overlap) |
| `"<"`       | Same start as previous tween              |
| `"<0.2"`    | 0.2s after previous tween **starts**      |
| `">"`       | When previous tween ends                  |
| `"myLabel"` | At a named label                          |

### Stagger pattern

```typescript
gsap.from(".card", {
  y: 50,
  opacity: 0,
  duration: 0.5,
  stagger: {
    amount: 0.4, // total stagger spread
    from: "start", // 'start' | 'end' | 'center' | 'random' | index
    ease: "power1.in",
  },
});
```

---

## 3. ScrollTrigger Patterns {#scrolltrigger}

### Basic scroll-triggered entrance

```typescript
gsap.from(".section-title", {
  y: 50,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".section-title",
    start: "top 85%", // element top hits 85% of viewport
    end: "top 50%",
    once: true, // only animate once
  },
});
```

### Parallax

```typescript
gsap.to(".bg-layer", {
  yPercent: -30,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true, // ties animation to scroll position
  },
});
```

### Pin a section

```typescript
ScrollTrigger.create({
  trigger: ".sticky-panel",
  start: "top top",
  end: "+=600", // pin for 600px of scroll
  pin: true,
  pinSpacing: true,
});
```

### Batch (for lists/grids)

```typescript
ScrollTrigger.batch(".item", {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 40,
      stagger: 0.08,
      duration: 0.5,
    });
  },
  start: "top 90%",
  once: true,
});
```

---

## 4. GSAP Easing Reference {#gsap-easing}

Built-in: `power1`–`power4` · `back` · `bounce` · `circ` · `elastic` · `expo` · `sine`

Each has `.in`, `.out`, `.inOut`.

| Easing                | Character                            |
| --------------------- | ------------------------------------ |
| `power2.out`          | Standard deceleration (most UI)      |
| `power3.out`          | Snappier deceleration                |
| `power4.out`          | Very snappy, dramatic deceleration   |
| `expo.out`            | Extreme deceleration from fast start |
| `back.out(1.7)`       | Slight overshoot on arrival          |
| `elastic.out(1, 0.3)` | Wobbly spring, use sparingly         |
| `bounce.out`          | Bouncy landing, use for playful UIs  |
| `none`                | Linear — scrub animations            |

---

## 5. motion/react Patterns {#motion-react}

```typescript
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
```

### Variants pattern (recommended)

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const AnimatedList = ({ items }: { items: string[] }) => (
  <motion.ul variants={containerVariants} initial="hidden" animate="visible">
    {items.map((item) => (
      <motion.li key={item} variants={itemVariants}>
        {item}
      </motion.li>
    ))}
  </motion.ul>
)
```

### AnimatePresence (mount/unmount)

```typescript
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )}
</AnimatePresence>
```

### Scroll-linked transform

```typescript
const { scrollYProgress } = useScroll()
const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
const scale  = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

return <motion.div style={{ opacity, scale }}>{children}</motion.div>
```

### Layout animations

```typescript
// Automatic FLIP animation on layout change
<motion.div layout layoutId="card-content">
  {expanded ? <FullContent /> : <Summary />}
</motion.div>
```

---

## 6. CSS Animation Tokens {#css-tokens}

All tokens are defined in `src/styles/animation.css`.

### Duration scale

| Token         | Value | Use case                 |
| ------------- | ----- | ------------------------ |
| `--dur-micro` | 100ms | Hover micro-feedback     |
| `--dur-fast`  | 200ms | Small toggles, dropdowns |
| `--dur-base`  | 300ms | Standard transitions     |
| `--dur-slow`  | 500ms | Modals, page sections    |
| `--dur-crawl` | 800ms | Dramatic hero entrances  |

### Easing tokens (match GSAP strings)

| CSS Token         | CSS Value                                | GSAP equivalent |
| ----------------- | ---------------------------------------- | --------------- |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)`          | `expo.out`      |
| `--ease-in-expo`  | `cubic-bezier(0.7, 0, 0.84, 0)`          | `expo.in`       |
| `--ease-in-out`   | `cubic-bezier(0.65, 0, 0.35, 1)`         | `power2.inOut`  |
| `--ease-spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)`      | `back.out(1.7)` |
| `--ease-bounce`   | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | `back.out(2.5)` |

### Keyframe catalogue

| Class                     | Animation         | Loop?  |
| ------------------------- | ----------------- | ------ |
| `animate-fade-in`         | Fade in           | No     |
| `animate-fade-in-up`      | Rise + fade       | No     |
| `animate-fade-in-down`    | Drop + fade       | No     |
| `animate-fade-in-left`    | Slide from right  | No     |
| `animate-fade-in-right`   | Slide from left   | No     |
| `animate-scale-in`        | Scale up + fade   | No     |
| `animate-scale-in-spring` | Spring scale      | No     |
| `animate-slide-bottom`    | Slide from below  | No     |
| `animate-fade-out`        | Fade out          | No     |
| `animate-fade-out-up`     | Rise out + fade   | No     |
| `animate-scale-out`       | Scale down + fade | No     |
| `animate-pulse-opacity`   | Pulse opacity     | ✅ Yes |
| `animate-spin`            | Rotate 360        | ✅ Yes |
| `animate-bounce-y`        | Vertical bounce   | ✅ Yes |
| `animate-float`           | Gentle float      | ✅ Yes |
| `animate-wiggle`          | Wiggle rotation   | No     |
| `animate-heartbeat`       | Double-pump scale | ✅ Yes |
| `animate-draw-line`       | Width 0 → 100%    | No     |
| `animate-clip-x`          | Clip reveal X     | No     |
| `animate-clip-y`          | Clip reveal Y     | No     |
| `animate-shimmer`         | Shimmer highlight | ✅ Yes |
| `skeleton`                | Skeleton wave     | ✅ Yes |

### GSAP initial-state helpers (FOUC prevention)

Apply these **before** GSAP runs to prevent flash of unstyled content:

| Class               | Initial state                   |
| ------------------- | ------------------------------- |
| `gsap-hidden`       | `opacity: 0`                    |
| `gsap-hidden-up`    | `opacity: 0; translateY(24px)`  |
| `gsap-hidden-down`  | `opacity: 0; translateY(-24px)` |
| `gsap-hidden-left`  | `opacity: 0; translateX(24px)`  |
| `gsap-hidden-right` | `opacity: 0; translateX(-24px)` |
| `gsap-hidden-scale` | `opacity: 0; scale(0.9)`        |

---

## 7. Integration Patterns {#integration}

### Decision matrix

| Scenario                             | Solution                     |
| ------------------------------------ | ---------------------------- |
| Simple hover state                   | Tailwind `hover:` classes    |
| Mount/unmount transition             | `animate-*` CSS class        |
| Multiple elements entering on scroll | GSAP + ScrollTrigger.batch   |
| Complex narrative timeline (hero)    | GSAP timeline                |
| Page-level route transition          | motion/react AnimatePresence |
| Layout shift (expand/collapse)       | motion/react layout          |
| Continuous scroll-linked parallax    | GSAP scrub                   |
| Loading skeleton                     | `.skeleton` CSS class        |
| Spinner / loading indicator          | `animate-spin` CSS class     |
| Progress bar                         | motion/react or GSAP         |

### CSS + GSAP handoff (no FOUC)

```tsx
// 1. Apply gsap-hidden class in JSX
// 2. GSAP handles the entrance — CSS just sets the initial state
<h1 className="hero-title gsap-hidden-up">Big Headline</h1>;

// In useEffect:
gsap.to(".hero-title", {
  y: 0,
  opacity: 1,
  duration: 0.8,
  ease: "power3.out",
  clearProps: "transform,opacity", // Clean up inline styles after animation
});
```

---

## 8. Performance Checklist {#performance}

- ✅ Animate `transform` and `opacity` only — compositor-safe
- ✅ Use `will-change: transform` on actively animating elements (remove after)
- ✅ Use `gsap.context()` scoped to a ref — prevents leaks and enables cleanup
- ✅ Always call `ctx.revert()` in useEffect cleanup
- ✅ Use `ScrollTrigger.refresh()` after dynamic content loads
- ✅ Use `once: true` on ScrollTrigger for entrance-only animations
- ✅ Prefer `stagger` over manually delayed individual tweens
- ✅ Use `gsap.matchMedia()` for responsive + reduced-motion in one call
- ⛔ Never animate `width`, `height`, `top`, `left` when transforms suffice
- ⛔ Never set `will-change` on every element
- ⛔ Never leave ScrollTrigger instances alive after component unmount
- ⛔ Never use GSAP outside `useEffect` / `useLayoutEffect` in React
