---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [nextjs, typescript, tailwind, vitest, playwright, react-testing-library, framer-motion, lucide-react, static-export]

# Dependency graph
requires: []
provides:
  - Next.js 16 App Router app in noesis/ with TypeScript and Tailwind CSS
  - Static export configured via next.config.ts (output: export, env-var basePath)
  - Vitest unit test harness with jsdom and React Testing Library
  - Playwright E2E config targeting localhost:3000 with Desktop, Mobile, Tablet projects
  - Wave 0 test stubs for GlassCard, Navigation, Button components and homepage/mobile E2E
affects: [01-02, 01-03, 01-04, 01-05, 01-06]

# Tech tracking
tech-stack:
  added:
    - next@16.1.6 (App Router, TypeScript, Tailwind)
    - framer-motion@12 (animation library)
    - lucide-react@0.577 (icon library)
    - vitest@4 + @vitest/ui + jsdom (unit test runner)
    - @testing-library/react@16 + @testing-library/jest-dom@6 (component testing)
    - @vitejs/plugin-react (Vite/Vitest React transform)
    - @playwright/test@1.58 (E2E test runner, Chromium browser installed)
  patterns:
    - Static export via next.config.ts output:export — no server required
    - basePath driven by NEXT_PUBLIC_BASE_PATH env var — zero-code Vercel migration
    - Test stubs use describe.todo / test.todo — pending, never failing
    - Vitest configured with @/* path alias matching tsconfig

key-files:
  created:
    - noesis/next.config.ts
    - noesis/package.json
    - noesis/tsconfig.json
    - noesis/vitest.config.ts
    - noesis/playwright.config.ts
    - noesis/src/__tests__/setup.ts
    - noesis/src/__tests__/components/GlassCard.test.tsx
    - noesis/src/__tests__/components/Navigation.test.tsx
    - noesis/src/__tests__/components/Button.test.tsx
    - noesis/e2e/homepage.spec.ts
    - noesis/e2e/mobile.spec.ts
  modified: []

key-decisions:
  - "basePath controlled by NEXT_PUBLIC_BASE_PATH env var — GitHub Pages uses /noesis, Vercel uses empty string, zero code change needed"
  - "images.unoptimized: true required for static export — no Next.js Image Optimization server in SSG mode"
  - "Test stubs use describe.todo / test.todo pattern — vitest reports them as skipped, not failures, allowing Wave 0 setup without component implementation"
  - "trailingSlash: true ensures GitHub Pages path resolution works correctly for subdirectory deployments"

patterns-established:
  - "Static export pattern: next.config.ts output: export + basePath env var"
  - "Test stub pattern: describe.todo/test.todo for pending tests that will be implemented in later plans"
  - "Alias pattern: @/* maps to src/ in both tsconfig and vitest.config.ts"

requirements-completed: [INFRA-01, INFRA-03, DSGN-03]

# Metrics
duration: 3min
completed: 2026-03-15
---

# Phase 1 Plan 01: Scaffold Next.js 15 app + Wave 0 test infrastructure Summary

**Next.js 16 App Router scaffolded in noesis/ with static export config, Vitest unit harness, and Playwright E2E stubs — build produces out/ and test runner exits cleanly with all 8 Wave 0 files present**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-15T15:22:34Z
- **Completed:** 2026-03-15T15:25:37Z
- **Tasks:** 2
- **Files modified:** 25+

## Accomplishments
- Scaffolded Next.js 16 App Router project in noesis/ with TypeScript, Tailwind CSS, App Router
- Configured next.config.ts with static export and env-var-driven basePath (INFRA-03: Vercel migration = set one env var)
- Installed and configured Vitest with jsdom + React Testing Library for unit testing
- Installed and configured Playwright with Chromium, iPhone 14, iPad Pro projects for E2E
- Created all 8 Wave 0 test stub files per VALIDATION.md using describe.todo/test.todo pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 app and configure static export** - `f8a506f` (feat)
2. **Task 2: Create Vitest + Playwright config and Wave 0 test stubs** - `5f5e026` (feat)

## Files Created/Modified
- `noesis/next.config.ts` - Static export config: output: export, NEXT_PUBLIC_BASE_PATH, trailingSlash, images.unoptimized
- `noesis/package.json` - All scripts (dev, build, start, test, test:watch, test:e2e, lint) + all dependencies
- `noesis/tsconfig.json` - TypeScript config with @/* alias
- `noesis/vitest.config.ts` - Vitest with jsdom, React plugin, setupFiles, @/* alias
- `noesis/playwright.config.ts` - Desktop Chrome, iPhone 14, iPad Pro, localhost:3000, webServer auto-start
- `noesis/src/__tests__/setup.ts` - Imports @testing-library/jest-dom
- `noesis/src/__tests__/components/GlassCard.test.tsx` - 4 describe.todo stubs
- `noesis/src/__tests__/components/Navigation.test.tsx` - 5 describe.todo stubs
- `noesis/src/__tests__/components/Button.test.tsx` - 4 describe.todo stubs
- `noesis/e2e/homepage.spec.ts` - 5 test.todo stubs
- `noesis/e2e/mobile.spec.ts` - 5 test.todo stubs

## Decisions Made
- Used NEXT_PUBLIC_BASE_PATH env var pattern for basePath: GitHub Pages sets it to /noesis, Vercel sets it empty — zero code change for deployment platform switch
- images.unoptimized: true is required for static export (no Image Optimization server available in SSG)
- test.todo / describe.todo pattern used for stubs so Vitest and Playwright report them as pending (skipped), not as failures

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Playwright reinstall required due to corrupted node_modules**
- **Found during:** Task 1 (dependency installation)
- **Issue:** First install of @playwright/test left a corrupted playwright-core/lib/client directory, causing MODULE_NOT_FOUND error when importing @playwright/test
- **Fix:** Removed node_modules/@playwright, node_modules/playwright, node_modules/playwright-core and reinstalled @playwright/test cleanly
- **Files modified:** node_modules (not committed), package-lock.json
- **Verification:** `node -e "require('@playwright/test'); console.log('OK')"` returned OK
- **Committed in:** f8a506f (Task 1 commit, package-lock.json updated)

---

**Total deviations:** 1 auto-fixed (1 blocking - dependency install issue)
**Impact on plan:** Auto-fix was essential for correctness. No scope creep.

## Issues Encountered
- `npx playwright install --with-deps chromium` failed with MODULE_NOT_FOUND after initial install. Resolved by clean reinstall of playwright packages. Used `npx playwright install chromium` (without --with-deps) after fixing the base package.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- noesis/ Next.js app is buildable (`npm run build` produces out/)
- Test harness is ready: `npm run test` exits cleanly with Wave 0 stubs as pending
- Playwright is installed with Chromium browser ready for E2E
- All Wave 0 VALIDATION.md requirements satisfied
- Ready for Wave 1 plans (01-02 components, 01-03 CI/CD, etc.) to proceed

---
*Phase: 01-foundation*
*Completed: 2026-03-15*

## Self-Check: PASSED

- noesis/next.config.ts: FOUND
- noesis/vitest.config.ts: FOUND
- noesis/playwright.config.ts: FOUND
- noesis/out/ (build output): FOUND
- src/__tests__/setup.ts: FOUND
- GlassCard.test.tsx: FOUND
- e2e/homepage.spec.ts: FOUND
- e2e/mobile.spec.ts: FOUND
- Commit f8a506f: FOUND
- Commit 5f5e026: FOUND
