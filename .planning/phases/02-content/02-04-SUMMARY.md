---
phase: 02-content
plan: 04
subsystem: topic-pages
tags: [content-rendering, page-template, homepage-cta, diagram-integration, progress-strip]
dependency_graph:
  requires: [02-02, 02-03]
  provides: [fully-rendered-topic-pages, start-here-cta]
  affects: [homepage, all-7-topic-pages]
tech_stack:
  added: []
  patterns: [slug-to-diagram-map, topicContent-data-driven-template, conditional-optional-sections]
key_files:
  created: []
  modified:
    - noesis/src/app/topics/[slug]/page.tsx
    - noesis/src/app/page.tsx
decisions:
  - "diagramMap typed as Record<string, () => React.ReactElement> avoids React.ComponentType generic complexity while satisfying TypeScript"
  - "whitespace-pre-line applied to multi-paragraph overview and howAIApplies fields to preserve line breaks in the content data"
  - "Removed 'The Story Behind This' secondary hero button per CONTEXT.md direction to keep homepage focused"
metrics:
  duration: 101s
  completed_date: "2026-03-15"
  tasks_completed: 2
  files_modified: 2
requirements:
  - CONT-01
  - CONT-02
  - CONT-03
  - CONT-04
  - CONT-05
  - CONT-06
  - CONT-07
  - CONT-08
  - DISC-03
  - BRAND-02
  - BRAND-04
  - BRAND-05
---

# Phase 2 Plan 4: Topic Page Template & Homepage CTA Summary

**One-liner:** Shared Next.js server component template wires all 7 topicContent entries to full UI sections (Overview, How AI Applies, From the Field GlassCard, optional blocks, Architecture diagram, video, Further Reading, Where to Go Next, ProgressStrip) with slug-to-diagram map; homepage hero replaced with Start Here CTA linking to /topics/data-sources.

## What Was Built

### Task 1: Topic Page Template Rewrite (commit: ffa0d30)

Replaced the placeholder `page.tsx` shell with a full content-rendering server component. The new template:

- Imports `topicContent` and maps all 7 mandatory sections to UI components
- Builds a `diagramMap` keyed by slug so each topic renders its correct SVG diagram component
- Renders `ProgressStrip` and `VideoSection` (both `use client` components that hydrate on the client)
- Supports all optional topic-specific blocks: `tools` (Data Quality, MDM), `policyFramework` (Data Governance), `matchingAlgorithm` (MDM), `activationExamples` (Reverse Integration), `emergingTools` (AI in Data Management), `furtherReading`
- Derives `nextTopic` and `relatedTopicObjects` from `topics` array using slugs from `whereToGoNext`
- Uses `whitespace-pre-line` on multi-paragraph content fields so line breaks in the data strings render correctly

All 7 topic routes confirmed statically generated in build output: `/topics/data-sources`, `/topics/data-integration`, `/topics/data-quality`, `/topics/master-data-management`, `/topics/reverse-integration`, `/topics/data-governance`, `/topics/ai-in-data-management`.

**Files modified:** `noesis/src/app/topics/[slug]/page.tsx`

### Task 2: Homepage Start Here CTA (commit: a0366f9)

Updated the hero button group in `noesis/src/app/page.tsx`:

- Primary button: "Start Here" → `/topics/data-sources` (learning path entry point)
- Secondary button: "Explore All Topics" → `#topics` (topic grid anchor)
- Removed "The Story Behind This" button (linked to `#from-the-field`) per CONTEXT.md direction to keep the homepage focused

**Files modified:** `noesis/src/app/page.tsx`

## Verification Results

- `npm run build`: Exit 0. All 7 `/topics/*` routes statically generated. TypeScript compilation clean.
- `npm run test`: 72 tests passing (7 test files). No regressions.

## Deviations from Plan

None — plan executed exactly as written.

The plan specified an optional React type annotation approach (`React.ComponentType` vs `() => React.ReactElement`). Used `() => React.ReactElement` to avoid needing a React namespace import at the top of a server component, which is cleaner. This is a micro implementation choice within the plan's stated flexibility.

## Requirements Satisfied

| Req ID | Description | How Satisfied |
|--------|-------------|---------------|
| CONT-01 | 7 topic pages navigable | All 7 statically generated, linked from homepage and ProgressStrip |
| CONT-02 | Curated content per topic | topicContent entries rendered via shared template |
| CONT-03 | How AI Applies section | Mandatory section rendered on every topic page |
| CONT-04 | Learning path entry point | Start Here CTA on homepage → /topics/data-sources |
| CONT-05 | Free topic navigation | ProgressStrip renders all 7 as clickable links |
| CONT-06 | Visual aids — diagrams | diagramMap renders correct SVG component per topic |
| CONT-07 | Embedded video per topic | VideoSection renders LiteYouTubeEmbed for each topic |
| CONT-08 | Cross-topic concept links | Where to Go Next section + related topic links |
| DISC-03 | Where to Go Next section | Renders Next in Path card + Related topic cards |
| BRAND-02 | From the Field callout | GlassCard with blue badge + Raja attribution on every page |
| BRAND-04 | RSPDQ/MatchMind tool links | Tools section renders on Data Quality and MDM pages with links |
| BRAND-05 | Further Reading links | furtherReading array rendered on Data Quality page |

## Self-Check: PASSED

- noesis/src/app/topics/[slug]/page.tsx — FOUND
- noesis/src/app/page.tsx — FOUND
- Commit ffa0d30 (feat(02-04): rewrite topic page template) — FOUND
- Commit a0366f9 (feat(02-04): add Start Here CTA) — FOUND
