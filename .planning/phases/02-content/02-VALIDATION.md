---
phase: 2
slug: content
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-15
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.0 + Playwright 1.58.2 (established in Phase 1) |
| **Config file** | `noesis/vitest.config.ts` + `noesis/playwright.config.ts` (existing) |
| **Quick run command** | `cd noesis && npm run test` |
| **Full suite command** | `cd noesis && npm run test && npm run test:e2e` |
| **Estimated runtime** | ~25s unit / ~3m full suite |

---

## Sampling Rate

- **After every task commit:** Run `cd noesis && npm run test`
- **After every plan wave:** Run `cd noesis && npm run test && npm run test:e2e`
- **Before `/gsd:verify-work`:** Full suite must be green + visual approval of all 7 topic pages
- **Max feedback latency:** 30 seconds (unit only)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 0 | CONT-01, CONT-02 | unit | `vitest run src/__tests__/topics.test.ts` | ❌ Wave 0 | ⬜ pending |
| 2-01-02 | 01 | 0 | CONT-02, BRAND-02 | unit | `vitest run src/__tests__/topic-content.test.ts` | ❌ Wave 0 | ⬜ pending |
| 2-01-03 | 01 | 0 | CONT-06 | unit | `vitest run src/__tests__/diagrams.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-01-04 | 01 | 0 | CONT-07 | unit | `vitest run src/__tests__/video.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-01-05 | 01 | 0 | CONT-03, CONT-04, CONT-05, DISC-03 | e2e | `playwright test e2e/topics.spec.ts` | ❌ Wave 0 | ⬜ pending |
| 2-01-06 | 01 | 0 | CONT-08 | e2e | `playwright test e2e/links.spec.ts` | ❌ Wave 0 | ⬜ pending |
| 2-02-01 | 02 | 1 | CONT-01, CONT-02 | unit | `vitest run src/__tests__/topic-content.test.ts` | ❌ Wave 0 | ⬜ pending |
| 2-02-02 | 02 | 1 | CONT-04 | e2e | `playwright test e2e/topics.spec.ts` | ❌ Wave 0 | ⬜ pending |
| 2-03-01 | 03 | 1 | CONT-06 | unit | `vitest run src/__tests__/diagrams.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-04-01 | 04 | 1 | CONT-07 | unit | `vitest run src/__tests__/video.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-05-01 | 05 | 2 | BRAND-01, BRAND-03 | e2e | `playwright test e2e/homepage.spec.ts` | ❌ Wave 0 | ⬜ pending |
| 2-05-02 | 05 | 2 | BRAND-04 | e2e | `playwright test e2e/topics.spec.ts` | ❌ Wave 0 | ⬜ pending |
| 2-05-03 | 05 | 2 | BRAND-05 | e2e | `playwright test e2e/topics.spec.ts` | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/topics.test.ts` — validates topics array (7 slugs, unique, correct shape)
- [ ] `src/__tests__/topic-content.test.ts` — validates all 7 topics in topicContent have mandatory sections (slug, overview, howAIApplies, fromTheField, architecture, video, whereToGoNext, relatedTopics)
- [ ] `src/__tests__/diagrams.test.tsx` — renders each of the 7 SVG diagram components without errors
- [ ] `src/__tests__/video.test.tsx` — VideoSection component renders with valid YouTube ID prop
- [ ] `e2e/topics.spec.ts` — all 7 topic pages load (200 OK), content visible, progress strip renders, no 404s
- [ ] `e2e/links.spec.ts` — cross-topic links in content navigate to correct pages without 404
- [ ] `e2e/homepage.spec.ts` — "Start Here" CTA links to /topics/data-sources; About section visible

*Note: Playwright is already configured from Phase 1 (playwright.config.ts exists). Ensure baseURL points to localhost:3000.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| "From the Field" callout reads as genuine first-person practitioner voice | BRAND-02 | Subjective tone/quality check | Read each callout aloud — does it sound like Raja speaking from experience, not a textbook? |
| SVG diagrams visually accurate and on-brand | CONT-06 | Visual design judgment | Load each topic page, verify diagram uses electric blue/noir colors, nodes are labeled correctly, layout is clean |
| YouTube videos appropriate, high-quality, publicly available | CONT-07 | External content approval | Raja approves each video URL before embed goes live; verify video plays without region-lock |
| Testimonials display properly on homepage | BRAND-01 | Visual + content review | Verify GlassCard styling, attribution text correct, LinkedIn source clear |
| Company logos display at correct opacity, no distortion | BRAND-01 | Visual design check | Verify logos are monochrome/white, scaled proportionally, no pixelation on retina displays |
| Learning path "Start Here" → Data Sources CTA prominent in hero | CONT-04 | Visual placement check | Verify button visible above fold on mobile and desktop without scrolling |
| Cross-topic links feel natural in prose, not forced | CONT-08 | Content quality check | Read content of 2–3 topics; verify links appear in context, not as a list at the bottom |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
