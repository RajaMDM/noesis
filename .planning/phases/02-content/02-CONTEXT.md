# Phase 2: Content - Context

**Gathered:** 2026-03-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Fill all 7 topic stubs with real, curated content. Each topic page becomes a thorough reference — curated explanations, real-world context, how AI applies, Raja's "From the Field" practitioner callout, a custom diagram, an embedded video, cross-topic links, and a "where to go next" navigation section. A "Start Here" CTA on the homepage opens the learning path. The chat interface, search, progress tracking, and community features are NOT part of this phase.

</domain>

<decisions>
## Implementation Decisions

### Topic Page Content Structure

- **Depth:** Thorough reference — 800–1200 words of curated content per topic, multiple sections. Not a primer. Practitioners and career-switchers should leave with genuine understanding.
- **Section optionality:** Sections can be optional or variable depending on the topic. Not all 7 topics need identical structure — MDM might get an entity relationship callout, Governance a policy framework block, etc. A core set of mandatory sections applies to all; beyond that, topic-specific blocks are allowed.
- **Mandatory sections (all 7 topics):**
  1. Overview / core explanation
  2. How AI applies to this domain
  3. "From the Field" callout (Raja's practitioner insight)
  4. Architecture diagram (mid-page, after explanation)
  5. Embedded video (supplementary, after written content)
  6. Cross-topic concept links (inline within content)
  7. Where to go next (related content + next in path)
- **Content storage:** Structured data files (TypeScript) — content lives in data files, a shared page template renders it. This separates content from layout, making future edits straightforward without touching component code. Each topic gets its own content file or a single `topic-content.ts` with keyed entries.

### Topic-Specific Content Blocks

- Room for topic-specific blocks beyond the mandatory set. Examples:
  - **MDM:** Entity relationship model callout, matching algorithm explainer
  - **Data Governance:** Policy framework / RACI template callout
  - **AI in Data Management:** Agent capability matrix or emerging tools list
  - **Reverse Integration:** Activation use-case examples (e.g., CRM sync, ad targeting)
- These are opt-in per topic — not forced onto topics where they don't fit.

### "From the Field" Callout

- **Voice:** First person — "I've seen...", "In one engagement...", "What surprised me was..." — Raja's direct voice, not a case study.
- **Length:** Full paragraph — 5–7 sentences. Tells a mini story: context → challenge/observation → lesson. Not a one-liner.
- **Anonymization:** Industry-level — "a Tier 1 bank in the GCC", "a global CPG company", "a mid-market logistics firm in Southeast Asia". Enough context to be vivid; no company names or identifying details.
- **Visual treatment:** GlassCard component with a prominent "From the Field" label badge at the top and "— Raja Shahnawaz Soni" attribution underneath the paragraph. The badge should use the electric blue accent to signal this is a signature section, not generic content.

### Learning Path UX

- **Entry point:** "Start Here" CTA on the homepage (existing hero area). Clicking it takes the user directly into Topic 1 (Data Sources) — no intermediate path-overview page. The journey begins immediately.
- **In-topic navigation:** Mini progress strip at the bottom of each topic page — shows all 7 topics as steps with the current topic highlighted, plus a "Next: [Topic Name] →" button. Users can see where they are in the full journey at a glance.
- **Path model:** Recommended order is fixed and displayed (1 → 2 → 3 → 4 → 5 → 6 → 7), but entirely advisory. Every topic is freely accessible — no gating, no "complete previous topic first" logic. The progress strip shows all 7 as clickable.
- **Homepage:** No full path visualization on the homepage. The topic grid communicates breadth; path logic emerges naturally as users navigate between topics. Keep the homepage focused.
- **Recommended path order:**
  1. Data Sources
  2. Data Integration
  3. Data Quality
  4. Master Data Management
  5. Reverse Integration
  6. Data Governance
  7. AI in Data Management

### Visual Aids — Diagrams

- **Approach:** Real custom SVG diagrams built in code (inline SVG or SVG components). No placeholder slots — Phase 2 ships real diagrams for all 7 topics.
- **Placement:** Mid-page, after the explanation sections. The diagram serves as a visual summary of what was just read — not a teaser before the content.
- **Style:** On-brand — noir background, electric blue lines/nodes, Inter labels. Diagrams should feel like they belong in the same design system as the rest of the page.
- **Examples by topic:**
  - Data Sources: Source taxonomy tree (databases → APIs → files → streams)
  - Data Integration: ETL/ELT pipeline flow
  - Data Quality: Quality dimensions wheel or pipeline
  - MDM: Hub-and-spoke entity model
  - Reverse Integration: Bidirectional data flow (warehouse → operational tools)
  - Data Governance: Governance framework layers (policies → stewards → tools)
  - AI in Data Management: AI capability overlay on the data stack

### Visual Aids — Video

- **Approach:** Curated YouTube embeds — Claude identifies strong candidate videos for each topic, Raja approves specific URLs before they go in. No placeholders shipped in this phase.
- **Placement:** After the written content — supplementary, "Go deeper" framing. Not a hero or primary learning element. A section heading like "Go Deeper" or "Watch: [Topic]" introduces it.
- **Embed treatment:** Responsive iframe embed, 16:9 ratio, rounded corners matching design system. Single video per topic in Phase 2 (more can be added in Phase 6 community contributions).

### Personal Brand Integration (BRAND requirements)

- **BRAND-01:** Raja's bio/credentials appear on an About page or a homepage section — name, credentials, speaker history, awards. This is separate from the "From the Field" callouts.
- **BRAND-02:** Every topic page has at least one "From the Field" callout (covered above).
- **BRAND-03:** Platform lineage (Data Alchemist → SYNAPTIQ → Noesis) is already visible on the homepage from Phase 1. Phase 2 maintains this in the footer/about section.
- **BRAND-04:** Raja's AI agents (RSPDQ, MatchMind) are linked contextually from the Data Quality and MDM topic pages — inline reference within the content, not a banner.
- **BRAND-05:** Raja's LinkedIn publications surfaced as supplementary reading links on relevant topics — similar treatment to video ("Further Reading" section).

### Claude's Discretion

- Exact wording of content within the structured data files (curated by Claude, informed by Raja's framing decisions)
- Specific YouTube video selection (Claude identifies candidates per topic — Raja approves)
- SVG diagram exact node layout and label positioning
- Cross-topic link placement within content prose
- Spacing and padding adjustments within the topic page template
- "Where to go next" copy and related topic selection logic

</decisions>

<specifics>
## Specific Ideas

- The "From the Field" GlassCard should be visually distinct from the surrounding content — slightly different tint or the electric blue badge creates enough contrast. It should feel like Raja is speaking directly to the reader, not like a pull quote from a textbook.
- The mini progress strip at the bottom can reuse the existing `topics` array from `lib/topics.ts` — map over it, highlight the current slug, render as a horizontal step indicator with topic icons.
- Content data files should be typed to match a `TopicContent` interface — ensures all mandatory sections are present and type-checked at build time, not runtime.
- SVG diagrams should be React components (not image files) — this lets them use CSS variables for colors and stay perfectly on-brand without a separate design tool export step.
- The "Start Here" CTA on the homepage links to `/topics/data-sources` — the first in the recommended sequence.
- LinkedIn publications (BRAND-05) can be a simple list of links in a "Further Reading" section alongside or below the video embed — no need for a separate component.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets (from Phase 1)

- **`GlassCard`** (`src/components/GlassCard.tsx`) — Used for "From the Field" callout. Accepts `className` for custom styling. Already has hover states and glassmorphism locked.
- **`Button`** (`src/components/Button.tsx`) — Used for "Next topic" CTA in progress strip. `variant="outline"` for secondary actions.
- **`Navigation`** (`src/components/Navigation.tsx`) — Sticky top nav already in place. Topic pages render inside existing layout.
- **`TopicCard`** (`src/components/TopicCard.tsx`) — Used on homepage. Progress strip at topic page bottom is a new component (different pattern — horizontal, step-based).
- **`lib/topics.ts`** — `topics` array with 7 entries (`slug`, `title`, `description`, `Icon`). Progress strip maps over this array. Content data files extend this or key off `slug`.

### Established Patterns

- **Link-wrapping:** `<Link href="..."><Button>Label</Button></Link>` — no `asChild`. Already established.
- **CSS tokens:** `--color-noir`, `--color-accent-blue`, `--color-glass-bg`, `--color-glass-border`, `--color-text-secondary`, `--color-text-muted`. Use these, don't hardcode colors.
- **Responsive pattern:** `px-4 sm:px-6 md:px-8` for page padding. `max-w-4xl mx-auto` for content width. Follow these.
- **Params pattern:** Next.js 16 requires `params: Promise<{slug: string}>` — already used in topic page.
- **Framer Motion:** `useReducedMotion()` gates animations. Follow this pattern on any new animated components.

### Integration Points

- Topic page shell (`src/app/topics/[slug]/page.tsx`) — the placeholder content block gets replaced with real content in Phase 2. Header and back-link stay.
- Homepage (`src/app/page.tsx`) — "Start Here" CTA added to hero area. No other homepage changes in Phase 2.
- `lib/topics.ts` — Extended or a parallel `lib/topic-content.ts` created for the rich content data.

</code_context>

### Testimonials (LinkedIn — Curated Selection)

**Selection criteria:** Recent preferred + best quality, combination of both. 6 testimonials selected from 20 received.

**Recent (2020–2025):**

1. **Sandeep Deshpande** — Senior Software Engineer @ Vivicta *(November 2025, worked on same team)*
   > "I'm truly grateful for the guidance and support I received from Raja, who has been an exceptional mentor in the early years of my career. His ability to simplify complex ideas, offer honest and actionable feedback, and lead by example has profoundly shaped both my professional growth and my communication skills. Raja consistently encouraged me to think bigger, stay focused, and approach challenges with confidence. I highly recommend Raja to anyone seeking a leader who inspires, empowers, and genuinely invests in people."

2. **Frederick Khoury** — Senior Solutions Engineer at Snowflake *(February 2022)*
   > "Meeting new people when joining a new company can sometimes be stressful, and I was very relieved that Raja has this calm and welcoming attitude that made my experience easy and pleasant. Raja is an expert in his field, which was clear from the get go, and that meant we got the job done right; but it doesn't end there because Raja also goes the extra mile. Any company in need of his skillset in Master Data Management would be lucky to have him."

3. **Venkitaraman S** — Senior Data Engineer at Coast Capital Savings, ex-Infosys *(September 2020, same team)*
   > "I have had the pleasure of working with Raja on a Customer 360 MDM implementation project for one of the leading Food distributors in North America during my tenure at Infosys. He is one of the best minds I have worked with. Learned a lot from him on MDM strategy and technical implementation and I was a witness to his solid grasp on the Informatica MDM multi-domain edition and CC360 tools! Highly energetic person and extremely comfortable to work with. I highly recommend Raja for any Data Management/Analytics initiatives."

**High-designation endorsers:**

4. **Mohit Juneja** — Global Service Manager @ The Adecco Group *(April 2018, different teams)*
   > "I've had the chance to work with Raja on several projects, and I have to say that it has always been a pleasure collaborating with him for the success of our customers. He is a great professional, nice to work with, pretty well organized, with a high sense of customer relationship, in addition to his high and various technical skills. Always willing to learn more, and to improve his way of doing things, he is also prompt in sharing his knowledge and ideas with all colleagues, with the sake of always improving the quality of our work. You can really rely on him in every circumstance."

5. **Nilay Mardikar** — Co-Founder, FinnovaNest *(December 2011, managed Raja directly)*
   > "Raja and I have been working together in various projects for a few years now. The first thing you notice about is his attitude — excellent!! You can throw a challenge at him and be assured that he will come out with flying colors. His ability to troubleshoot from a technical point of view is another strength I have seen. I am confident that he will continue to push the limits on his career growth more and more. I would be happy to work with him again! Top strengths: Great technical depth, Excellent Attitude, Personable."

6. **Deepak Manjarekar** — Global Head, Data HBU at Coforge *(February 2011, senior to Raja)*
   > "Raja is a dedicated software professional. He possesses a 'can do' attitude and is always ready for more work. Raja also has a lot of other good traits that makes him a favorite among his peer group. I have seen him add color to the team and becoming the binding glue for the group. At work, he has completed many assignments successfully and in some cases exhibited his leadership skills to complete the work on time!"

**Testimonials display:** A dedicated section on the homepage (or About page) — glassmorphism cards, quote text, recommender name + title, LinkedIn attribution. 3 shown by default (most recent), expand to show all 6.

---

### Company Logos

**From Raja's employment history (LinkedIn Experience):**
- **Alshaya Group** — Current employer (Data Architect, Aug 2021–Present)
- **MAGNOOS Information Systems LLC** — Senior Data Management Consultant (3+ years)
- **Infosys** — Senior Consultant (Aug 2016–Jun 2018)
- **Tietoevry** (formerly Tieto) — MDM Lead & Service Manager (5+ years)

**Platform/tool logos (from credential strip — already on homepage):**
- Informatica (IDMC)
- Microsoft (Power Platform)
- Salesforce (CRM)

**Logo display:** A "Trusted by / Built on" logo strip — monochrome/white logos on the noir background, subtle opacity. Placed on the homepage below the differentiators section or on the About page. Use official SVG logos sourced from company brand kits / Wikimedia. No logos used without public availability.

<deferred>
## Deferred Ideas

- Progress persistence (remembering which topics a user has visited) — Phase 3 (DISC-02)
- Interactive/animated diagram walkthroughs — v2 requirement (CONT-11)
- Multi-perspective content (beginner / practitioner / executive views) — v2 (CONT-10)
- About/Bio as a full dedicated page — can be a Phase 2 addition if lightweight, but not a blocker for topic content
- Community-contributed content on topic pages — Phase 6 (COMM-03)

</deferred>

---

*Phase: 02-content*
*Context gathered: 2026-03-15*
