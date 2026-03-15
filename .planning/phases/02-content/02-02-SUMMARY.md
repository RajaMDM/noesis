---
phase: 02-content
plan: 02
subsystem: content-schema
tags: [content, typescript, components, topic-content, progress-strip, video-embed]
dependency_graph:
  requires:
    - 02-01 (test infrastructure, react-lite-youtube-embed installed)
    - noesis/src/lib/topics.ts (slug source of truth)
  provides:
    - noesis/src/lib/topic-content.ts (TopicContent interface + 7 topic entries)
    - noesis/src/components/ProgressStrip.tsx (7-step learning path indicator)
    - noesis/src/components/VideoSection.tsx (privacy-respecting YouTube embed)
  affects:
    - 02-03 (SVG diagrams read architectureCaption from TopicContent)
    - 02-06 (topic page wiring consumes all three artifacts)
tech_stack:
  added: []
  patterns:
    - TypeScript Record<string, TopicContent> keyed by slug for build-time completeness enforcement
    - Default import for react-lite-youtube-embed (library exports default only in CJS)
    - useReducedMotion() from framer-motion gating transition-all duration-200 on ProgressStrip links
key_files:
  created:
    - noesis/src/lib/topic-content.ts
    - noesis/src/components/ProgressStrip.tsx
    - noesis/src/components/VideoSection.tsx
  modified:
    - noesis/src/__tests__/topic-content.test.ts
    - noesis/src/__tests__/video.test.tsx
decisions:
  - "LiteYouTubeEmbed uses default export (not named) — library CJS bundle exports {PlayerError, PlayerState, default}; named import resolves to undefined in jsdom"
  - "TopicContent.whereToGoNext.nextTopicSlug typed as string | null (not string) to handle ai-in-data-management as last topic"
  - "architectureCaption field name used (vs architecture in RESEARCH.md example) to match PLAN.md interface spec exactly"
metrics:
  duration: "343 seconds (~6 minutes)"
  completed: "2026-03-15"
  tasks: 2
  files: 5
requirements_satisfied:
  - CONT-01
  - CONT-02
  - CONT-03
  - CONT-04
  - CONT-05
  - CONT-07
  - CONT-08
  - DISC-03
  - BRAND-02
  - BRAND-04
  - BRAND-05
---

# Phase 2 Plan 02: Content Schema and Shared UI Components Summary

**One-liner:** Strict TypeScript TopicContent interface with 7 fully-populated topic entries (real curated content, ~250w overview each) plus ProgressStrip and VideoSection UI components; 72 tests green, build succeeds.

## What Was Built

### Task 1: TopicContent Schema + 7 Topic Entries

Created `noesis/src/lib/topic-content.ts` defining:

- `FromTheField` interface: `{ text: string; anonymization: string }`
- `TopicContent` interface with 9 mandatory fields enforced at build time plus 5 optional topic-specific blocks (`tools`, `policyFramework`, `matchingAlgorithm`, `activationExamples`, `emergingTools`, `furtherReading`)
- `topicContent: Record<string, TopicContent>` — 7 entries keyed by slug

**Content per topic:**

| Topic | Overview | fromTheField Context |
|-------|----------|---------------------|
| data-sources | Source diversity, schema heterogeneity, discovery imperative | Major retail conglomerate in the GCC, 70+ brands |
| data-integration | ETL vs ELT, iPaaS, schema-on-read vs write | Mid-market logistics company in Southeast Asia, 12 ERPs |
| data-quality | 6 quality dimensions, cascading consequences | Global CPG company, 25 countries, 80+ cleanup spreadsheets |
| master-data-management | Hub-and-spoke, MDM styles, match-and-merge | Leading food distribution company in North America, 4.2M records |
| reverse-integration | Data activation, warehouse-as-origin pattern | Global specialty retail brand in the GCC, loyalty platform |
| data-governance | Policies, stewardship, regulatory drivers | Tier 1 bank in the GCC, post-merger integration |
| ai-in-data-management | AI for data / data for AI / AI-native architectures | Large retail group in the GCC, 40,000+ data assets, CDGC pilot |

**Topic-specific optional blocks populated:**
- `data-quality`: `tools` (RSPDQ, Great Expectations), `furtherReading` (LinkedIn article placeholder)
- `master-data-management`: `tools` (MatchMind), `matchingAlgorithm` (tiered matching explainer)
- `reverse-integration`: `activationExamples` (4 activation use cases)
- `data-governance`: `policyFramework` (5 core governance artifacts)
- `ai-in-data-management`: `emergingTools` (Informatica CDGC, Fabric Copilot, dbt+LLM, vector DBs)

Updated `topic-content.test.ts` with 28 real tests (7 topics × 4 assertions) — all green.

### Task 2: ProgressStrip + VideoSection Components

**ProgressStrip.tsx** (`'use client'`):
- Maps over `topics` array from `lib/topics.ts` for slug-safe navigation
- `<nav aria-label="Learning path">` wrapping `<ol>` for semantic step order
- `aria-current="step"` on active item, `aria-label="Step N: Title"` on each link
- Three visual states: active (accent-blue fill), past (accent-blue border), future (glass border + hover)
- `useReducedMotion()` gates `duration-200` transition class
- Mobile-responsive: step numbers visible at all sizes, title text hidden on `< sm`

**VideoSection.tsx** (`'use client'`):
- Default import of `LiteYouTubeEmbed` (required — library has no named export in CJS)
- CSS imported: `react-lite-youtube-embed/dist/LiteYouTubeEmbed.css`
- Props: `{ youtubeId: string; title: string }`
- "Go Deeper" h2 heading + descriptive subtitle
- Rounded container with glass border wrapping the embed

Updated `video.test.tsx` with 3 real tests — all green.

## Test Results

```
Test Files: 7 passed (7)
Tests:      72 passed (72)
```

Build: `npm run build` exits 0 — all 7 topic pages prerendered as static HTML.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed LiteYouTubeEmbed named import resolving to undefined**
- **Found during:** Task 2, running video.test.tsx
- **Issue:** `import { LiteYouTubeEmbed } from 'react-lite-youtube-embed'` — the library's CJS bundle exports `{ PlayerError, PlayerState, default }` only. The named export `LiteYouTubeEmbed` does not exist; it resolves to `undefined` in jsdom, causing "Element type is invalid" render error.
- **Fix:** Changed to `import LiteYouTubeEmbed from 'react-lite-youtube-embed'` (default import)
- **Files modified:** `noesis/src/components/VideoSection.tsx`
- **Commit:** 2b7c504

## Self-Check: PASSED

- `noesis/src/lib/topic-content.ts`: FOUND
- `noesis/src/components/ProgressStrip.tsx`: FOUND
- `noesis/src/components/VideoSection.tsx`: FOUND
- `noesis/src/__tests__/topic-content.test.ts`: FOUND
- `noesis/src/__tests__/video.test.tsx`: FOUND
- Commit `e6ec221`: FOUND
- Commit `2b7c504`: FOUND
- 72 tests: ALL PASSED
- `npm run build`: EXIT 0
