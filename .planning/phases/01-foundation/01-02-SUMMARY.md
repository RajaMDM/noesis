---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [nextjs, tailwind, react, framer-motion, lucide-react, vitest, testing-library, glassmorphism, design-tokens]

# Dependency graph
requires:
  - phase: 01-foundation/01-01
    provides: Next.js 15 scaffold with Vitest/Playwright config and static export
provides:
  - CSS design tokens via @theme directive (noir palette, accent-blue, glass surfaces, typography, shadows)
  - Root layout with Inter + JetBrains Mono fonts via next/font/google
  - GlassCard component (glassmorphism card container)
  - Button component (primary/outline/ghost variants with accent-blue glow)
  - Navigation component (sticky top bar, Topics dropdown, mobile hamburger with all 7 topics)
  - TopicCard component (Framer Motion hover lift, useReducedMotion accessibility)
  - topics.ts with 7 topic definitions (slug, title, description, Icon)
  - 15 passing unit tests (GlassCard x5, Button x5, Navigation x5)
affects:
  - 01-foundation/01-04 (homepage uses Navigation, TopicCard, topics array)
  - all future phases (all pages use GlassCard, Button, design tokens from globals.css)

# Tech tracking
tech-stack:
  added:
    - framer-motion (animation, useReducedMotion)
    - lucide-react (icon library — Database, GitMerge, ShieldCheck, Layers, ArrowLeftRight, Scale, Bot)
  patterns:
    - CSS @theme directive for design tokens (Tailwind v4 pattern)
    - CSS custom properties (--color-*, --radius-*, --shadow-*) referenced by components via var()
    - 'use client' directive on interactive components (Button, Navigation, TopicCard)
    - Class array with .filter(Boolean).join(' ') for conditional className assembly (GlassCard)
    - useReducedMotion() from Framer Motion for accessibility-aware animation

key-files:
  created:
    - noesis/src/lib/topics.ts
    - noesis/src/components/GlassCard.tsx
    - noesis/src/components/Button.tsx
    - noesis/src/components/Navigation.tsx
    - noesis/src/components/TopicCard.tsx
    - noesis/src/__tests__/components/GlassCard.test.tsx
    - noesis/src/__tests__/components/Button.test.tsx
    - noesis/src/__tests__/components/Navigation.test.tsx
  modified:
    - noesis/src/app/globals.css
    - noesis/src/app/layout.tsx
    - noesis/next.config.ts
    - noesis/package.json
    - noesis/vitest.config.ts
    - noesis/playwright.config.ts

key-decisions:
  - "Topic interface uses Icon: LucideIcon (component reference) rather than iconName: string — enables direct JSX rendering without a lookup map"
  - "Glassmorphism values: bg-[var(--color-glass-bg)] (rgba 255,255,255,0.05) + backdrop-blur-[10px] + border-[var(--color-glass-border)] (rgba 255,255,255,0.10)"
  - "Button disabled state uses native disabled attribute (browser handles pointer-events) rather than CSS-only pointer-events-none"
  - "Navigation dropdown is hover-triggered on desktop via onMouseEnter/Leave state — no library needed"
  - "TopicCard uses whileInView with viewport.once:true for staggered entrance — prevents re-animation on scroll back"

patterns-established:
  - "Design tokens pattern: all colors/radii/shadows in @theme directive in globals.css, consumed via var(--token-name) in components"
  - "Component variant pattern: object literal maps (variantClasses, sizeClasses) for Tailwind class lookup"
  - "Accessibility pattern: useReducedMotion() gates all Framer Motion animation props"
  - "Test pattern: vi.mock('next/link') in Navigation tests to avoid next.js router dependency"

requirements-completed: [DSGN-01, DSGN-02, DSGN-03]

# Metrics
duration: 8min
completed: 2026-03-15
---

# Phase 1 Plan 02: Design System Summary

**Noir glassmorphism design system with @theme CSS tokens, Inter/JetBrains Mono fonts, and 4 production-ready components (GlassCard, Button, Navigation, TopicCard) — 15 unit tests passing**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-15T15:23:00Z
- **Completed:** 2026-03-15T15:31:00Z
- **Tasks:** 2 (+ prerequisite 01-01 setup)
- **Files modified:** 13

## Accomplishments

- Design system tokens defined as CSS variables in globals.css @theme directive — all components reference shared tokens via var()
- Root layout loads Inter (body text) and JetBrains Mono (code/labels) via next/font/google with named CSS variable hooks
- 4 production-ready components: GlassCard, Button (3 variants), Navigation (sticky + hamburger), TopicCard (Framer Motion)
- topics.ts exports all 7 topic definitions as single source of truth for homepage and future topic pages
- 15 unit tests passing: GlassCard (5), Button (5), Navigation (5)

## Task Commits

Each task was committed atomically:

1. **Task 1: Design tokens in globals.css and root layout with fonts** - `225e232` (feat)
2. **Task 2: Core component library — GlassCard, Button, Navigation, TopicCard** - `86c02a3` (feat)

## Design Token Reference

For plan 01-04 (homepage) — key token names available:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-noir` | `#080808` | Body background |
| `--color-noir-95` | `#0d0d0d` | Nav background |
| `--color-noir-90` | `#141414` | Dropdown background |
| `--color-accent-blue` | `#00d9ff` | CTAs, buttons, icons |
| `--color-glass-bg` | `rgba(255,255,255,0.05)` | Card fill |
| `--color-glass-border` | `rgba(255,255,255,0.10)` | Card border |
| `--radius-sm` | `0.75rem` | Buttons, small elements |
| `--radius-md` | `1rem` | Cards |
| `--shadow-glow` | `0 0 20px rgba(0,217,255,0.6)` | Button hover glow |
| `--font-inter` | CSS var chain | Body text |
| `--font-mono` | CSS var chain | Code/labels |

## Component API Signatures

```typescript
// GlassCard
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

// Button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

// Navigation — no props (reads from topics.ts internally)
function Navigation(): JSX.Element

// TopicCard
interface TopicCardProps {
  topic: Topic;    // from src/lib/topics.ts
  index?: number;  // for staggered animation delay
}

// Topic (from src/lib/topics.ts)
interface Topic {
  slug: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}
```

## Files Created/Modified

- `noesis/src/app/globals.css` - Full @theme design token system replacing default scaffold
- `noesis/src/app/layout.tsx` - Inter + JetBrains Mono font loading, bg-noir body class
- `noesis/src/lib/topics.ts` - 7 topic definitions with Lucide icon components
- `noesis/src/components/GlassCard.tsx` - Glassmorphism card container
- `noesis/src/components/Button.tsx` - Primary/outline/ghost button variants
- `noesis/src/components/Navigation.tsx` - Sticky nav with Topics dropdown + mobile hamburger
- `noesis/src/components/TopicCard.tsx` - Motion card with GlassCard + topic data
- `noesis/src/__tests__/components/*.test.tsx` - 15 unit tests (3 files)

## Decisions Made

- Topic `Icon` is a LucideIcon component reference (not a string) to avoid string→component lookup overhead at render time
- Glassmorphism values are locked: 5% white background, 10px blur, 10% white border — follows CONTEXT.md "tasteful frost" guidance
- Navigation dropdown is pure React state (onMouseEnter/Leave) — no external library needed
- `useReducedMotion()` from Framer Motion gates all animation props on TopicCard — passes undefined/false when reduced motion preferred

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Completed 01-01 prerequisite setup before executing 01-02**
- **Found during:** Pre-execution check
- **Issue:** noesis/ directory existed (scaffolded) but lacked: static export config, framer-motion/lucide-react, vitest/playwright configs, and test stub files
- **Fix:** Applied all 01-01 task outputs (next.config.ts static export, npm installs, vitest.config.ts, playwright.config.ts, Wave 0 test stubs) before proceeding with 01-02 tasks
- **Files modified:** next.config.ts, package.json, vitest.config.ts, playwright.config.ts, e2e/, src/__tests__/
- **Verification:** `npm run build` produces out/, `npm run test` exits cleanly
- **Committed in:** 225e232 (Task 1 commit, bundled with globals.css and layout.tsx)

---

**Total deviations:** 1 auto-fixed (Rule 3 — blocking dependency)
**Impact on plan:** Necessary prerequisite work. No scope creep. All 01-02 deliverables implemented as specified.

## Issues Encountered

None — tests passed on first run, build succeeded without TypeScript errors.

## Next Phase Readiness

- Design tokens and component library ready for plan 01-04 (homepage)
- Navigation and TopicCard will be imported directly — no changes needed
- topics.ts is the single source of truth — plan 01-04 should import `topics` and map to `TopicCard`
- All 7 topic slugs available for routing in future phases: `data-sources`, `data-integration`, `data-quality`, `master-data-management`, `reverse-integration`, `data-governance`, `ai-in-data-management`

---
*Phase: 01-foundation*
*Completed: 2026-03-15*
