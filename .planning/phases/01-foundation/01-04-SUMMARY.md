---
phase: 01-foundation
plan: 04
subsystem: ui
tags: [nextjs, react, framer-motion, tailwindcss, playwright, typescript]

# Dependency graph
requires:
  - phase: 01-foundation/01-02
    provides: TopicCard, GlassCard, Button, Navigation components and topics data
  - phase: 01-foundation/01-03
    provides: Next.js static export config and build infrastructure
provides:
  - Homepage with hero, 7 topic card grid, and differentiators section
  - Topic page stubs (7 pages, SSG via generateStaticParams)
  - Custom 404 not-found page
  - E2E test implementations (9 tests covering homepage and mobile)
affects: [01-05-visual-checkpoint, phase-02-content]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Link-wrapping pattern for button-as-link (Button has no asChild prop)
    - useReducedMotion() gate on all Framer Motion animation props
    - Hero parallax via useScroll/useTransform (disabled for reduced motion)
    - whileInView viewport animations for below-fold sections
    - generateStaticParams returning all 7 topic slugs for SSG

key-files:
  created:
    - noesis/src/app/topics/[slug]/page.tsx
    - noesis/src/app/not-found.tsx
  modified:
    - noesis/src/app/page.tsx
    - noesis/src/app/layout.tsx
    - noesis/e2e/homepage.spec.ts
    - noesis/e2e/mobile.spec.ts

key-decisions:
  - "params in Next.js 16 app router are Promise<{slug}> — awaited in generateMetadata and page component"
  - "Topic page uses async function to await params (Next.js 16 requirement)"
  - "not-found.tsx uses &apos; HTML entity for apostrophe to avoid JSX lint warning"

patterns-established:
  - "Link-wrapping for button-as-link: <Link href='...'><Button>Label</Button></Link>"
  - "All Framer Motion animations gate on useReducedMotion() — disable if true"
  - "whileInView with viewport={{ once: true }} for scroll-triggered animations"

requirements-completed: [DSGN-01, DSGN-02, DSGN-03]

# Metrics
duration: 4min
completed: 2026-03-15
---

# Phase 1 Plan 04: Pages Summary

**Cinematic dark-mode homepage with hero, 7-card topic grid, and differentiators section; plus 7 SSG topic stubs and custom 404 — all verified via green Next.js 16 build**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-15T~15:31:33Z
- **Completed:** 2026-03-15T~15:35:09Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Homepage hero: Noesis headline, Socratic/BYOK subtitle, animated entrance, parallax glow, scroll indicator
- Topic grid: 7 TopicCard components in responsive 1/2/3/4-col grid, stagger-animated on scroll
- "What Makes Noesis Different" section with BYOK and Socratic Dialogue GlassCards
- Navigation added to root layout — sticky on every page
- 7 topic page stubs fully SSG via generateStaticParams, pre-generated in out/topics/
- Custom 404 page with back-to-home button
- 9 E2E test implementations replacing test.todo stubs (5 homepage, 4 mobile)

## Task Commits

Each task was committed atomically:

1. **Task 1: Homepage — hero, topic grid, differentiators** - `7321c79` (feat)
2. **Task 2: Topic page stubs, 404 page, and E2E test implementations** - `c688d16` (feat)

## Files Created/Modified

- `noesis/src/app/page.tsx` - Full homepage: hero, topic grid, differentiators, footer
- `noesis/src/app/layout.tsx` - Added Navigation import + render in root layout body
- `noesis/src/app/topics/[slug]/page.tsx` - Topic stub pages with generateStaticParams for 7 slugs
- `noesis/src/app/not-found.tsx` - Custom 404 with back-to-home button
- `noesis/e2e/homepage.spec.ts` - 5 implemented E2E tests (heading, 7 cards, nav scroll, differentiators, topic link)
- `noesis/e2e/mobile.spec.ts` - 4 implemented E2E tests (hamburger visibility, menu opens with 7 topics, 44px touch targets, no text overflow)

## Decisions Made

- Next.js 16 app router requires `params` to be a `Promise<{slug}>` — awaited inside `generateMetadata` and the page component (deviation from plan's sync signature)
- `not-found.tsx` uses `&apos;` HTML entity for apostrophe to satisfy JSX lint rules
- Link-wrapping pattern confirmed throughout — no asChild prop used anywhere

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated params type signature for Next.js 16 compatibility**
- **Found during:** Task 2 (topic page stub creation)
- **Issue:** Plan provided `{ params }: { params: { slug: string } }` but Next.js 16 app router requires params to be `Promise<{ slug: string }>`
- **Fix:** Changed component and generateMetadata signatures to use `Promise<{ slug: string }>` and added `await params` inside both functions
- **Files modified:** noesis/src/app/topics/[slug]/page.tsx
- **Verification:** Build succeeded with all 7 topic pages SSG
- **Committed in:** c688d16 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Next.js 16 async params)
**Impact on plan:** Necessary for correctness with Next.js 16. No scope creep.

## Issues Encountered

None beyond the Next.js 16 params async fix above.

## User Setup Required

None - no external service configuration required.

## Verification Checklist (for plan 01-05 visual checkpoint)

The following visual items remain for the 01-05 checkpoint to confirm:

- [ ] Hero renders with bold Noesis headline, subtitle, and two CTA buttons
- [ ] 7 topic cards visible in responsive grid with staggered entrance animation
- [ ] Navigation sticky and visible on scroll — hamburger shown at mobile viewport
- [ ] "What Makes Noesis Different" section with BYOK and Socratic Dialogue callouts
- [ ] Topic page stub renders with topic icon, title, description, placeholder content box
- [ ] Custom 404 page renders for unknown paths
- [ ] Squint test: pure noir background (#080808), electric blue accents (#00d9ff), glassmorphism cards
- [ ] Hero parallax fires on scroll (subtle background glow movement)
- [ ] All 7 /topics/[slug] URLs resolve (not 404)
- [ ] E2E tests pass: `npm run test:e2e` (requires dev server)

## Next Phase Readiness

- Homepage and navigation complete — users will see the full portal on first visit
- All 7 topic page stubs pre-generated and ready for Phase 2 content injection
- E2E test suite structured and ready to run against a live dev server
- No blockers for 01-05 visual checkpoint

---
*Phase: 01-foundation*
*Completed: 2026-03-15*
