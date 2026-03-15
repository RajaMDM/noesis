# Roadmap: Noesis

## Overview

Noesis ships in six phases aligned to the dependency order of its features. Infrastructure and design come first — nothing else can exist without them. Content follows, giving learners real material to explore. Discovery layer and BYOK chat are layered on top. The Socratic Dialogue mode, the platform's primary differentiator, ships once the chat foundation is solid. Community contribution closes the loop, letting practitioners grow the library without a content team.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Next.js project with design system, CI/CD, and GitHub Pages deployment
- [ ] **Phase 2: Content** - All 7 topic areas with curated explanations, visual aids, embedded video, and guided learning path
- [ ] **Phase 3: Discovery** - Full-text search across all topics and per-user progress tracking
- [ ] **Phase 4: BYOK Chat** - Client-side API key storage with context-aware streaming chat (OpenAI, Anthropic, Google)
- [ ] **Phase 5: Socratic Dialogue** - Distinct AI mode that teaches exclusively through guiding questions, never answers
- [ ] **Phase 6: Community** - Contribution submission, curator moderation queue, and published community content

## Phase Details

### Phase 1: Foundation
**Goal**: A publicly deployed portal with a design system that all future phases build on
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, DSGN-01, DSGN-02, DSGN-03
**Success Criteria** (what must be TRUE):
  1. Visiting the public URL renders a working Noesis page with the dark-mode immersive aesthetic
  2. Pushing to the main branch automatically triggers a GitHub Actions build and redeploys to GitHub Pages
  3. The site is fully usable on mobile and tablet without layout breakage
  4. Every page shares a consistent design language (typography, spacing, color, component library)
  5. The project can be migrated to Vercel deployment with no code changes — only environment/config changes
**Plans**: 5 plans

Plans:
- [ ] 01-01-PLAN.md — Scaffold Next.js 15 app and Wave 0 test infrastructure (Vitest + Playwright)
- [ ] 01-02-PLAN.md — Design system: CSS tokens, GlassCard, Button, Navigation, TopicCard components
- [ ] 01-03-PLAN.md — GitHub Actions CI/CD pipeline for automated GitHub Pages deployment
- [ ] 01-04-PLAN.md — Homepage (hero + topic grid + differentiators) and topic page stubs
- [ ] 01-05-PLAN.md — Full test suite, deployment trigger, and human visual/responsive verification

### Phase 2: Content
**Goal**: Learners can explore all 7 data management topics with curated content, visual aids, and a guided learning path
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, DISC-03
**Success Criteria** (what must be TRUE):
  1. User can navigate to a dedicated landing page for each of the 7 topics (Data Sources, Data Integration, Data Quality, Master Data Management, Reverse Integration, Data Governance, AI in Data Management)
  2. Each topic page shows curated explanations, real-world context, and how AI applies to that specific domain
  3. A recommended learning path guides new users through all 7 topics in logical progression
  4. User can bypass the recommended path and jump directly to any topic at any time
  5. Each topic page includes at least one diagram or architecture flow and at least one embedded video
  6. Inline cross-topic concept links appear within content so learners can follow related ideas
**Plans**: TBD

### Phase 3: Discovery
**Goal**: Learners can find content quickly and track what they have already explored
**Depends on**: Phase 2
**Requirements**: DISC-01, DISC-02
**Success Criteria** (what must be TRUE):
  1. User can search across all topics using a text search box and see relevant results with topic labels
  2. User sees a visible indicator on visited or self-marked-complete topics so they know where they have been
**Plans**: TBD

### Phase 4: BYOK Chat
**Goal**: Learners can bring their own AI API key and have context-aware, streaming conversations while reading any topic
**Depends on**: Phase 3
**Requirements**: CHAT-01, CHAT-02, CHAT-03, CHAT-04, CHAT-05, CHAT-06, CHAT-07
**Success Criteria** (what must be TRUE):
  1. User can enter and save an API key for OpenAI, Anthropic, or Google directly in the browser — the key never leaves the client
  2. User can select their AI provider from a supported list before starting a chat session
  3. Chat responses stream in real-time without a page reload
  4. The AI knows which topic page the user is currently reading and incorporates that context into responses
  5. User receives a clear, actionable error message when their API key is invalid or rate-limited
**Plans**: TBD

### Phase 5: Socratic Dialogue
**Goal**: Learners can switch into a mode where the AI guides them to insight through questions only — never giving direct answers
**Depends on**: Phase 4
**Requirements**: SOCR-01, SOCR-02, SOCR-03, SOCR-04, SOCR-05
**Success Criteria** (what must be TRUE):
  1. User can switch into Socratic mode from within the chat interface with a single action
  2. In Socratic mode, every AI response is a guiding question — the AI never states a direct answer regardless of what the user asks
  3. Socratic mode has a visually distinct appearance from Standard Chat (different color scheme, label, or layout treatment) so the user always knows which mode is active
  4. The AI builds on previous questions within the session — later questions reflect what the learner has already explored
  5. User can exit Socratic mode and return to Standard Chat at any time without losing the current session
**Plans**: TBD

### Phase 6: Community
**Goal**: Practitioners can submit content contributions and maintainers can review, approve, and publish them to the portal
**Depends on**: Phase 5
**Requirements**: COMM-01, COMM-02, COMM-03, COMM-04
**Success Criteria** (what must be TRUE):
  1. User can submit a content contribution (article, diagram, example, or explanation) linked to a specific topic
  2. An admin can view all pending submissions in a moderation queue and approve or reject each one
  3. Approved submissions appear on the relevant topic page without requiring a manual code deployment
  4. Published community content is visually labeled as community-sourced so learners can distinguish it from curated content
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/5 | In Progress|  |
| 2. Content | 0/TBD | Not started | - |
| 3. Discovery | 0/TBD | Not started | - |
| 4. BYOK Chat | 0/TBD | Not started | - |
| 5. Socratic Dialogue | 0/TBD | Not started | - |
| 6. Community | 0/TBD | Not started | - |

---
*Roadmap created: 2026-03-15*
*Requirements coverage: 33/33 v1 requirements mapped*
*Phase 1 planned: 2026-03-15 — 5 plans, 4 waves*
