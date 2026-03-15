# Phase 1: Foundation - Context

**Gathered:** 2026-03-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the Next.js portal (Noesis) with a complete design system, GitHub Actions CI/CD pipeline, and GitHub Pages deployment. The output is a publicly accessible site with a consistent visual identity, responsive layout, and the design tokens/components that all subsequent phases build on. Content, AI features, and community are not part of this phase.

</domain>

<decisions>
## Implementation Decisions

### Visual Identity

- **Background:** Pure noir — true black or near-black (#080808 range). Maximum contrast, sharp, cinematic.
- **Accent color:** Electric blue/cyan. Drives CTAs, highlights, interactive elements, and active states.
- **Typography:** Inter for all body/UI text (supremely readable, industry standard). JetBrains Mono for code, data labels, and technical elements.
- **Gradients:** Subtle and atmospheric only — used in hero backgrounds and section gradients, never on text. Depth without distraction.

### Homepage Layout

- **Hero:** Bold statement headline about what Noesis is + subtitle about the Socratic/BYOK approach. Topic cards appear below the fold — gets visitors to the content fast without burying the pitch.
- **Topic presentation:** 7 cards in a responsive grid. Each card: icon, topic name, 1-line description. Clear, scannable.
- **Below-fold section:** "What makes Noesis different" — a brief, high-impact section explaining the BYOK chatbot and Socratic Dialogue differentiators. Builds trust before users dive in.
- No "How it works" walkthrough and no community callout on homepage for now — keep it focused.

### Navigation Structure

- **Pattern:** Sticky top navbar with logo on the left, nav links, and future slots for Chat and Community.
- **Topics access:** Single "Topics" dropdown link that expands to show all 7 topics. Keeps the navbar clean at 7 items.
- **Mobile:** Hamburger menu — opens a full-screen or slide-in menu with all topics and nav links. Standard, universally understood.

### Component Style

- **Card surfaces:** Glassmorphism — semi-transparent background, backdrop blur, subtle border (~1px white/10%). Premium, modern, works beautifully on pure-noir backgrounds.
- **Primary buttons:** Solid electric blue/cyan fill with a subtle outer glow on hover. Clear CTA, premium feel.
- **Motion:** Purposeful — entrance animations on page load, smooth hover transitions, subtle parallax on hero section. Framer Motion for key moments, CSS transitions for micro-interactions. Motion serves meaning, never decoration.
- **Border radius:** Rounded, 12–16px range across components. Modern and friendly, consistent with glassmorphism.

### Claude's Discretion

- Exact animation timing/easing curves (follow Framer Motion defaults as a baseline)
- Spacing scale and specific pixel values (derive from Tailwind defaults, adjust as needed)
- Icon library choice (Lucide React is standard with shadcn/ui)
- Exact hover state colors and transition durations
- Footer design and content
- Error and 404 page design

</decisions>

<specifics>
## Specific Ideas

- The noir + electric blue combination should feel like a premium data infrastructure tool (think Vercel dashboard, Linear, or Retool) — not like a colorful edu-tech platform (no Duolingo energy).
- Glassmorphism cards should be tasteful — a subtle frost effect, not over-blurred or garish. If it looks like a 2021 iOS widget, dial it back.
- The "What makes Noesis different" section should be concise — 2 feature callouts (BYOK + Socratic), not a feature matrix.
- Purposeful motion means: when the page loads, things animate in. When you hover a card, it lifts. Hero has a subtle depth shift on scroll. Nothing moves for the sake of moving.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets

- None — this is the first phase of the portal. The repo contains Python research scripts (`scripts/yt_research.py`, `scripts/notebooklm_pipeline.py`) which are unrelated to the portal. All portal code starts fresh in this phase.

### Established Patterns

- No existing portal patterns. This phase establishes the patterns all subsequent phases follow.
- Python scripts use a CLI/script pattern — not applicable to the Next.js portal.

### Integration Points

- GitHub repository is already initialized with git
- `.planning/` directory is in place — the portal app should live in a new directory (e.g., root or `/app`) separate from `/scripts`

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-15*
