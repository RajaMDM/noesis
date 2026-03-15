# Requirements: Noesis

**Defined:** 2026-03-15
**Core Value:** A learner exploring any data management topic leaves with genuine understanding — not just information — through AI-guided discovery, rich visuals, and a Socratic AI that teaches by asking, not telling.

---

## v1 Requirements

### Content & Topics

- [ ] **CONT-01**: User can navigate to any of the 7 topic areas (Data Sources, Data Integration, Data Quality, Master Data Management, Reverse Integration, Data Governance, AI in Data Management)
- [ ] **CONT-02**: Each topic has a dedicated landing page with curated explanations and real-world context
- [ ] **CONT-03**: Each topic shows how AI applies to and is evolving that specific domain
- [ ] **CONT-04**: User is shown a recommended learning path through the 7 topics (guided progression)
- [ ] **CONT-05**: User can freely jump to any topic regardless of recommended path (free exploration override)
- [ ] **CONT-06**: Each topic page includes visual aids: diagrams, architecture flows, and/or images
- [ ] **CONT-07**: Each topic page includes at least one embedded video (YouTube or Vimeo)
- [ ] **CONT-08**: User sees cross-topic concept links inline — related topics and concepts surfaced within content

### Discovery & Navigation

- [ ] **DISC-01**: User can search across all topics and content using full-text search
- [ ] **DISC-02**: User sees which topics they have visited / marked complete (progress tracking)
- [ ] **DISC-03**: Each topic landing page provides a clear "where to go next" section (related content links)

### AI — Standard Chat (BYOK)

- [ ] **CHAT-01**: User can enter their own API key for OpenAI, Anthropic, or Google (Bring Your Own Key)
- [ ] **CHAT-02**: API key is stored client-side only — never transmitted to Noesis servers
- [ ] **CHAT-03**: User can select their AI provider from a supported list (OpenAI, Anthropic, Google)
- [ ] **CHAT-04**: Chat interface is context-aware — AI knows which topic page the user is currently on
- [ ] **CHAT-05**: User can ask questions and receive answers in standard Q&A chat mode
- [ ] **CHAT-06**: Chat responses stream in real-time (not a full-page reload per response)
- [ ] **CHAT-07**: User receives a clear error message if their API key is invalid or rate-limited

### AI — Socratic Dialogue

- [ ] **SOCR-01**: User can switch into Socratic Dialogue mode from the chat interface
- [ ] **SOCR-02**: In Socratic mode, the AI never directly answers questions — it responds only with guiding questions
- [ ] **SOCR-03**: Socratic mode has visually distinct UI from Standard Chat (different color, label, layout)
- [ ] **SOCR-04**: Socratic dialogue maintains context across turns — AI builds on previous questions in the session
- [ ] **SOCR-05**: User can exit Socratic mode and return to Standard Chat at any time

### Community Content

- [ ] **COMM-01**: User can submit a content contribution (article, diagram, example, explanation) for review
- [ ] **COMM-02**: Admin can view, approve, or reject community submissions via a moderation queue
- [ ] **COMM-03**: Approved community content is published to the relevant topic page
- [ ] **COMM-04**: Community-contributed content is visually labeled as community-sourced

### Design & UX

- [x] **DSGN-01**: Portal uses a rich, immersive dark-mode aesthetic with gradients and motion/animation
- [x] **DSGN-02**: Portal is fully responsive and usable on mobile and tablet
- [x] **DSGN-03**: Design system is consistent across all pages (typography, spacing, color, components)

### Hosting & Infrastructure

- [x] **INFRA-01**: Portal is deployed and publicly accessible via GitHub Pages (free, no account required beyond GitHub)
- [x] **INFRA-02**: Deployments trigger automatically from git pushes via GitHub Actions (CI/CD)
- [x] **INFRA-03**: Architecture supports one-step migration to Vercel (free, signs in with GitHub) or AWS/GCP without rebuild

---

## v2 Requirements

### Learning Depth

- **CONT-09**: Interactive diagrams — user can explore nodes, expand concepts, trace data flows
- **CONT-10**: Multi-perspective content — same concept explained at beginner / practitioner / executive level
- **CONT-11**: Animated walkthroughs of complex data processes (e.g., MDM matching, integration pipeline)

### Community Growth

- **COMM-05**: Community contributors have visible profiles and contribution history
- **COMM-06**: Content quality badges (verified by expert, community-reviewed)
- **COMM-07**: Users can suggest corrections or improvements to existing content

### AI Enhancements

- **CHAT-08**: Socratic dialogue tracks learning progress across sessions — remembers prior conversations
- **CHAT-09**: AI suggests next topic based on user's current learning context

### Platform

- **PLAT-01**: Custom domain (e.g., noesis.ai or noesisdata.com)
- **PLAT-02**: User accounts and persistent progress synced across devices

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Formal certifications / assessments | Not defined; defeats Socratic philosophy of intrinsic understanding |
| Gamification (badges, streaks, points) | Wrong for practitioner audience; signals low-quality ed-tech |
| Live sessions / real-time collaboration | Async-first for launch; high operational complexity |
| AI-generated curriculum | Platform content is human-curated; AI teaches, not authors |
| Mobile native app | Web-first; no native app until web proves value |
| Monetization / paywalls | Open platform at launch; business model after traction |
| Code execution environments | Link to external tools; avoids hosting/security complexity |
| LLM-generated images or diagrams | Quality unpredictable; community + curated diagrams preferred |

---

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| CONT-05 | Phase 2 | Pending |
| CONT-06 | Phase 2 | Pending |
| CONT-07 | Phase 2 | Pending |
| CONT-08 | Phase 2 | Pending |
| DISC-01 | Phase 3 | Pending |
| DISC-02 | Phase 3 | Pending |
| DISC-03 | Phase 2 | Pending |
| CHAT-01 | Phase 4 | Pending |
| CHAT-02 | Phase 4 | Pending |
| CHAT-03 | Phase 4 | Pending |
| CHAT-04 | Phase 4 | Pending |
| CHAT-05 | Phase 4 | Pending |
| CHAT-06 | Phase 4 | Pending |
| CHAT-07 | Phase 4 | Pending |
| SOCR-01 | Phase 5 | Pending |
| SOCR-02 | Phase 5 | Pending |
| SOCR-03 | Phase 5 | Pending |
| SOCR-04 | Phase 5 | Pending |
| SOCR-05 | Phase 5 | Pending |
| COMM-01 | Phase 6 | Pending |
| COMM-02 | Phase 6 | Pending |
| COMM-03 | Phase 6 | Pending |
| COMM-04 | Phase 6 | Pending |
| DSGN-01 | Phase 1 | Complete |
| DSGN-02 | Phase 1 | Complete |
| DSGN-03 | Phase 1 | Complete |
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 33 total
- Mapped to phases: 33
- Unmapped: 0

---
*Requirements defined: 2026-03-15*
*Last updated: 2026-03-15 — traceability populated after roadmap creation*
