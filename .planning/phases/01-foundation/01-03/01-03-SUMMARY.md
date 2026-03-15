---
phase: 01-foundation
plan: 03
subsystem: infra
tags: [github-actions, github-pages, ci-cd, nextjs, static-export]

# Dependency graph
requires:
  - phase: 01-01
    provides: noesis/ Next.js app with static export and NEXT_PUBLIC_BASE_PATH env var pattern
provides:
  - GitHub Actions CI/CD workflow (.github/workflows/deploy.yml) that auto-deploys on push to main
  - .nojekyll files preventing Jekyll processing on GitHub Pages
  - INFRA-03: Vercel migration path requiring only env var change, zero code changes
affects:
  - 01-02
  - 01-04
  - 01-05
  - all future phases (every push to main auto-deploys)

# Tech tracking
tech-stack:
  added:
    - actions/checkout@v4
    - actions/setup-node@v4
    - actions/upload-pages-artifact@v3
    - actions/deploy-pages@v4
  patterns:
    - working-directory per-job default to isolate monorepo subdirectory builds
    - NEXT_PUBLIC_BASE_PATH env var controls basePath — no code change for platform migration (INFRA-03)
    - concurrency group "pages" prevents simultaneous deployment races

key-files:
  created:
    - .github/workflows/deploy.yml
    - noesis/public/.nojekyll
    - noesis/.nojekyll
  modified: []

key-decisions:
  - "NEXT_PUBLIC_BASE_PATH=/NotebookLM for GitHub Pages; set to empty string in Vercel dashboard for migration — zero code change (INFRA-03)"
  - "path: ./noesis/out in upload step is relative to repo root, not working-directory — must be prefixed"
  - ".nojekyll placed in noesis/public/ so Next.js copies it to out/ during static export"
  - "concurrency cancel-in-progress: false prevents cancelling in-progress deployments (safe default)"

patterns-established:
  - "Pattern: GitHub Actions working-directory default to isolate build commands to subdirectory"
  - "Pattern: upload-pages-artifact path must be repo-root-relative, not working-directory-relative"

requirements-completed:
  - INFRA-01
  - INFRA-02
  - INFRA-03

# Metrics
duration: 1min
completed: 2026-03-15
---

# Phase 1 Plan 03: CI/CD Pipeline Summary

**GitHub Actions workflow deploying Noesis Next.js static export to GitHub Pages on every main push, with NEXT_PUBLIC_BASE_PATH env var enabling zero-code Vercel migration (INFRA-03)**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-03-15T15:22:57Z
- **Completed:** 2026-03-15T15:23:40Z
- **Tasks:** 1 of 1
- **Files modified:** 3

## Accomplishments

- GitHub Actions CI/CD pipeline created with build and deploy jobs targeting GitHub Pages
- `.nojekyll` in `noesis/public/` ensures Next.js static files survive GitHub Pages serving without Jekyll interference
- INFRA-03 satisfied: switching to Vercel requires only setting `NEXT_PUBLIC_BASE_PATH=''` in Vercel dashboard — zero code changes in the repo

## Task Commits

Each task was committed atomically:

1. **Task 1: GitHub Actions deploy workflow and .nojekyll** - `a111227` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified

- `.github/workflows/deploy.yml` - Full CI/CD pipeline: checkout, Node 20 setup, npm ci, Next.js build, upload artifact, deploy to Pages
- `noesis/public/.nojekyll` - Empty file; Next.js copies public/ to out/ at build time, so .nojekyll ends up in the artifact
- `noesis/.nojekyll` - Fallback reference at noesis root

## Decisions Made

- Used `NEXT_PUBLIC_BASE_PATH: /NotebookLM` matching the GitHub repo name — if repo is renamed, only this value needs updating (no code changes, INFRA-03)
- Upload artifact `path` is `./noesis/out` (repo-root-relative) not `./out` — required because `working-directory` only applies to `run` steps, not `uses` steps
- `concurrency.cancel-in-progress: false` chosen to never cancel an in-progress deployment (safe default for pages)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**Before the first push to main, the human must:**

1. Go to GitHub repo Settings → Pages → Source: set to **GitHub Actions** (not "Deploy from a branch")
2. Confirm the repo name is `NotebookLM` — if different, update `NEXT_PUBLIC_BASE_PATH` in `.github/workflows/deploy.yml`
3. Verify GitHub Actions permissions: Settings → Actions → General → Workflow permissions must allow `Read and write` or the workflow's explicit `pages: write` / `id-token: write` permissions are sufficient

**Vercel migration (when needed):**
- Add environment variable `NEXT_PUBLIC_BASE_PATH=` (empty value) in Vercel project settings
- No code changes required — the workflow's env var is only for GitHub Pages

**Expected GitHub Pages URL after first successful deploy:**
`https://{github-username}.github.io/NotebookLM/`

## Next Phase Readiness

- CI/CD pipeline is wired and ready to deploy once plan 01-01 (Next.js scaffold) completes
- Every subsequent plan's work will ship automatically on merge to main
- No blockers for plans 01-02 through 01-05 to proceed in parallel

---
*Phase: 01-foundation*
*Completed: 2026-03-15*
