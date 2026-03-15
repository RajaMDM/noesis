---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-15
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 1.x + React Testing Library + Playwright |
| **Config file** | `vitest.config.ts` (Wave 0 installs) |
| **Quick run command** | `npm run test` |
| **Full suite command** | `npm run test && npm run test:e2e` |
| **Estimated runtime** | ~15 seconds (unit), ~60 seconds (E2E) |

---

## Sampling Rate

- **After every task commit:** Run `npm run test`
- **After every plan wave:** Run `npm run test && npm run test:e2e`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 0 | INFRA-01 | unit | `npm run test` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 0 | DSGN-03 | unit | `npm run test` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 1 | INFRA-01 | E2E | `npm run test:e2e` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 1 | DSGN-01 | visual | manual | N/A | ⬜ pending |
| 1-01-05 | 01 | 1 | DSGN-02 | E2E | `npm run test:e2e` | ❌ W0 | ⬜ pending |
| 1-01-06 | 01 | 1 | DSGN-03 | unit | `npm run test` | ❌ W0 | ⬜ pending |
| 1-02-01 | 02 | 2 | INFRA-02 | integration | `npm run test:ci` | ❌ W0 | ⬜ pending |
| 1-02-02 | 02 | 2 | INFRA-03 | manual | manual | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — Vitest configuration with React Testing Library setup
- [ ] `src/__tests__/setup.ts` — Test setup file (extends jest-dom matchers)
- [ ] `playwright.config.ts` — Playwright E2E configuration targeting localhost:3000
- [ ] `src/__tests__/components/GlassCard.test.tsx` — Unit tests for GlassCard component
- [ ] `src/__tests__/components/Navigation.test.tsx` — Unit tests for Navigation component
- [ ] `src/__tests__/components/Button.test.tsx` — Unit tests for Button component
- [ ] `e2e/homepage.spec.ts` — E2E test: homepage renders, nav works, responsive layout
- [ ] `e2e/mobile.spec.ts` — E2E test: mobile viewport, hamburger menu, touch targets

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dark-mode immersive aesthetic matches design spec | DSGN-01 | Visual quality judgment; colors, gradients, glassmorphism appearance | Open deployed URL, verify #080808 background, electric blue accent, glassmorphism cards look premium (Vercel/Linear feel — NOT Duolingo) |
| Framer Motion animations fire correctly | DSGN-01 | Animation timing and easing cannot be fully tested with automated tools | Load page fresh, verify: (1) hero entrance animation, (2) card hover lift, (3) parallax on scroll. Check no jank on mobile. |
| One-step Vercel migration | INFRA-03 | Requires Vercel account and deployment to verify | Connect GitHub repo to Vercel, deploy with zero code changes. Confirm build succeeds from static export config. |
| Fonts load correctly (Inter + JetBrains Mono) | DSGN-03 | Font rendering is visual | Inspect font-family in DevTools; verify Inter for body, JetBrains Mono for code/data labels. Check FOUT/FOIT behavior. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
