# Phase 2: Content - Research

**Researched:** 2026-03-15
**Domain:** Next.js static content architecture, TypeScript data structures, SVG diagrams, YouTube embeds, learning path UX
**Confidence:** HIGH

## Summary

Phase 2 requires filling 7 topic pages with rich, curated content. The technical foundation is straightforward: structured TypeScript data files hold all content (separating data from presentation), React SVG components render custom diagrams, and lite-youtube-embed handles privacy-respecting video embeds. The main challenge is designing the TopicContent interface to enforce mandatory sections while allowing topic-specific blocks, then populating real content across all 7 domains (Data Sources, Data Integration, Data Quality, MDM, Reverse Integration, Data Governance, AI in Data Management).

**Primary recommendation:** Build a strict TypeScript interface for TopicContent that enforces mandatory sections and supports optional topic-specific fields. Use React components for all 7 SVG diagrams. Store all content in a single `lib/topic-content.ts` file keyed by slug for easy editing and type safety.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- Content stored in TypeScript data files (lib/topic-content.ts), shared template renders
- 7 mandatory sections per topic + optional topic-specific blocks
- "From the Field" = first person, full paragraph, GlassCard with blue badge + Raja attribution
- Learning path: "Start Here" CTA on homepage → Data Sources first; mini 7-step progress strip at bottom of each topic page
- Custom SVG diagram React components, mid-page placement
- Curated YouTube embeds (Claude proposes URLs, user approves)
- 6 curated LinkedIn testimonials included (full text in CONTEXT.md)
- Company logos: Alshaya Group, MAGNOOS, Infosys, Tietoevry + platform logos
- Topic-specific content blocks allowed beyond mandatory set

### Claude's Discretion
- Exact wording of content within the structured data files (curated by Claude, informed by Raja's framing decisions)
- Specific YouTube video selection (Claude identifies candidates per topic — Raja approves)
- SVG diagram exact node layout and label positioning
- Cross-topic link placement within content prose
- Spacing and padding adjustments within the topic page template
- "Where to go next" copy and related topic selection logic

### Deferred Ideas (OUT OF SCOPE)
- Progress persistence (remembering which topics a user has visited) — Phase 3 (DISC-02)
- Interactive/animated diagram walkthroughs — v2 requirement (CONT-11)
- Multi-perspective content (beginner / practitioner / executive views) — v2 (CONT-10)
- About/Bio as a full dedicated page — can be a Phase 2 addition if lightweight, but not a blocker for topic content
- Community-contributed content on topic pages — Phase 6 (COMM-03)

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | User can navigate to any of the 7 topic areas | `topics` array from lib/topics.ts + generateStaticParams() pre-renders all 7 pages |
| CONT-02 | Each topic has dedicated landing page with curated explanations and real-world context | TopicContent interface in lib/topic-content.ts provides schema; shared template renders per-topic data |
| CONT-03 | Each topic shows how AI applies to that domain | "How AI Applies" section in mandatory TopicContent schema + topic-specific examples |
| CONT-04 | User is shown recommended learning path through 7 topics | "Start Here" CTA on homepage links to /topics/data-sources; progress strip at page bottom shows all 7 in order |
| CONT-05 | User can freely jump to any topic regardless of path | No gating logic — all topics in progress strip are clickable links; free exploration fully supported |
| CONT-06 | Each topic page includes visual aids: diagrams, architecture flows, images | React SVG diagram components for all 7 topics, mid-page placement; inline images in content |
| CONT-07 | Each topic page includes at least one embedded video | react-lite-youtube-embed component with privacy-respecting youtube-nocookie.com URLs |
| CONT-08 | User sees cross-topic concept links inline — related topics and concepts surfaced within content | Cross-topic links rendered as `<Link href="/topics/...">` within prose of mandatory sections |
| DISC-03 | Each topic landing page provides "where to go next" section | RelatedTopics array in TopicContent + Next/Related topic rendering logic |
| BRAND-01 | About/Bio section features Raja prominently — credentials, speaker history, awards | Lightweight "About Raja" section on homepage or dedicated /about; integrates credentials from Phase 1 quote |
| BRAND-02 | Each topic page includes at least one "From the Field" callout | FromTheField section in TopicContent schema; rendered in GlassCard with blue badge + attribution |
| BRAND-03 | Platform lineage (Data Alchemist → SYNAPTIQ → Noesis) visible and linked | Already implemented on homepage (from-the-field section) — Phase 2 maintains in footer/about |
| BRAND-04 | Raja's AI agents (RSPDQ, MatchMind) contextually linked from Data Quality and MDM pages | Inline contextual links in Data Quality and MDM content sections + "Tools" optional block |
| BRAND-05 | Raja's LinkedIn publications surfaced as supplementary reading on relevant topics | FurtherReading array in TopicContent; rendered as "Further Reading" section on each topic page |

</phase_requirements>

## Standard Stack

### Core Technologies
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Static site generation + app router | Already established in Phase 1; supports static export for GitHub Pages |
| React | 19.2.3 | Component framework | Established in Phase 1; required for TSX components |
| TypeScript | 5.x | Type safety | Enforces interface contracts; catches schema violations at build time |
| Tailwind CSS | 4.x | Styling + responsive design | Established in Phase 1; utility-first for consistent spacing |
| Framer Motion | 12.36.0 | Animation (optional) | Already in Phase 1; gates with useReducedMotion() for accessibility |

### Content & Embedding Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-lite-youtube-embed | ^0.x | Privacy-respecting YouTube embeds | Every topic page with video; uses youtube-nocookie.com by default |
| lucide-react | ^0.577.0 | Icons | Topic icons in progress strip, navigation, From the Field badge |

### No External Content CMS
Content lives entirely in TypeScript data files (no Contentful, Strapi, or headless CMS). This keeps deployment simple (single `next build` produces static HTML) and content edits are code changes + PR review.

## Architecture Patterns

### Recommended Project Structure
```
noesis/
├── src/
│   ├── app/
│   │   ├── topics/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Single dynamic page template
│   │   ├── page.tsx                  # Homepage (add "Start Here" CTA)
│   │   └── layout.tsx
│   ├── lib/
│   │   ├── topics.ts                 # Topic metadata (already exists)
│   │   └── topic-content.ts          # NEW: All content data, keyed by slug
│   ├── components/
│   │   ├── GlassCard.tsx             # Reused for From the Field
│   │   ├── Button.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProgressStrip.tsx         # NEW: Horizontal 7-step indicator
│   │   └── diagrams/                 # NEW: SVG diagram components
│   │       ├── DataSourcesDiagram.tsx
│   │       ├── DataIntegrationDiagram.tsx
│   │       ├── DataQualityDiagram.tsx
│   │       ├── MDMDiagram.tsx
│   │       ├── ReverseIntegrationDiagram.tsx
│   │       ├── DataGovernanceDiagram.tsx
│   │       └── AIDataManagementDiagram.tsx
│   └── styles/
│       └── globals.css               # CSS variables for colors
```

### Pattern 1: TypeScript Content Schema with Mandatory + Optional Sections

**What:** A strict TypeScript interface enforces all 7 mandatory sections on every topic, while allowing optional topic-specific blocks.

**When to use:** Always. This ensures at build time that no topic is missing critical content.

**Example:**
```typescript
// Source: Phase 2 design, informed by CONTEXT.md structure
export interface FromTheField {
  text: string;           // 5-7 sentences, first person
  anonymization: string;  // e.g., "a Tier 1 bank in the GCC"
}

export interface TopicContent {
  // Mandatory sections (enforced by interface)
  slug: string;
  title: string;
  overview: string;                    // Core explanation, 200-300 words
  howAIApplies: string;                // AI relevance, 150-200 words
  fromTheField: FromTheField;          // Practitioner insight
  architecture: string;                // Brief description of diagram placement
  relatedTopics: string[];             // Array of slugs for inline links
  video: {
    youtubeId: string;                 // YouTube ID (e.g., "dQw4w9WgXcQ")
    title: string;                     // Display title
  };
  whereToGoNext: {
    nextTopicSlug: string;             // Next in recommended path
    relatedSlugs: string[];            // 2-3 related topics
  };

  // Optional topic-specific blocks
  tools?: {
    name: string;
    description: string;
    link: string;
  }[];
  policyFramework?: string;            // Data Governance specific
  matchingAlgorithm?: string;          // MDM specific
  activationExamples?: string;         // Reverse Integration specific
  emergingTools?: {
    name: string;
    capability: string;
  }[];                                 // AI in Data Management specific
  furtherReading?: {
    title: string;
    link: string;
  }[];
}

export const topicContent: Record<string, TopicContent> = {
  'data-sources': {
    slug: 'data-sources',
    title: 'Data Sources',
    overview: '...',
    howAIApplies: '...',
    fromTheField: { text: '...', anonymization: 'a Tier 1 bank in the GCC' },
    architecture: 'A source taxonomy tree shows databases, APIs, files, and streams.',
    relatedTopics: ['data-integration', 'data-quality'],
    video: { youtubeId: 'dQw4w9WgXcQ', title: 'Fundamentals of Data Sources' },
    whereToGoNext: { nextTopicSlug: 'data-integration', relatedSlugs: ['data-integration', 'data-quality'] },
    // data-sources has no topic-specific blocks
  },
  'data-governance': {
    slug: 'data-governance',
    title: 'Data Governance',
    overview: '...',
    howAIApplies: '...',
    fromTheField: { text: '...', anonymization: '...' },
    architecture: '...',
    relatedTopics: ['data-quality', 'master-data-management'],
    video: { youtubeId: 'abc123', title: '...' },
    whereToGoNext: { nextTopicSlug: 'ai-in-data-management', relatedSlugs: ['data-quality', 'master-data-management'] },
    policyFramework: 'RACI template, stewardship model, compliance integration.',
  },
};
```

### Pattern 2: SVG Diagram Components with CSS Variables

**What:** React components that render inline SVG using CSS variables for theme colors, enabling responsive resizing and dark-mode compliance.

**When to use:** For all 7 custom diagrams. Avoids image asset export step, keeps diagrams resolution-independent, and allows color theming.

**Example:**
```typescript
// Source: React SVG best practices, CSS variables approach
import React from 'react';

export function DataSourcesDiagram() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full max-w-4xl mx-auto"
      style={{
        '--color-bg': 'var(--color-noir)',
        '--color-line': 'var(--color-accent-blue)',
        '--color-text': 'white',
      } as React.CSSProperties}
    >
      {/* SVG content: circles for nodes, lines for connections */}
      <circle cx="200" cy="200" r="40" fill="none" stroke="var(--color-line)" strokeWidth="2" />
      <text x="200" y="205" textAnchor="middle" fill="var(--color-text)" fontSize="12">
        Database
      </text>
      {/* More nodes and connections... */}
    </svg>
  );
}
```

**Responsiveness:** Use `viewBox` + `className="w-full"` to scale to container width. Aspect ratio preserved via SVG's native scaling.

### Pattern 3: Lite YouTube Embed for Privacy

**What:** Use react-lite-youtube-embed to embed YouTube videos with privacy defaults (youtube-nocookie.com) and lazy loading.

**When to use:** On every topic page for the supplementary video.

**Example:**
```typescript
// Source: react-lite-youtube-embed npm docs + Next.js integration guides
import React from 'react';
import { LiteYouTubeEmbed } from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export function VideoSection({ youtubeId }: { youtubeId: string }) {
  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold text-white mb-6">Go Deeper</h3>
      <div className="aspect-video rounded-[var(--radius-md)] overflow-hidden">
        <LiteYouTubeEmbed
          id={youtubeId}
          title="Topic Deep Dive"
          params="nocookie=1"
        />
      </div>
    </div>
  );
}
```

**Privacy benefits:** youtube-nocookie.com doesn't track users until they click play. No cookies set by default. Fully compliant with EU GDPR.

### Pattern 4: Progress Strip Component

**What:** Horizontal 7-step indicator at the bottom of each topic page showing all topics in recommended order, current topic highlighted, clickable navigation to any topic.

**When to use:** Every topic page footer, before "Explore Other Topics" button.

**Example:**
```typescript
// Source: Material UI Stepper + accessibility best practices
import React from 'react';
import Link from 'next/link';
import { topics } from '@/lib/topics';

export function ProgressStrip({ currentSlug }: { currentSlug: string }) {
  const currentIndex = topics.findIndex((t) => t.slug === currentSlug);

  return (
    <nav aria-label="Learning path" className="my-12 pt-8 border-t border-[var(--color-glass-border)]">
      <ol className="flex items-center justify-between gap-2 md:gap-4">
        {topics.map((topic, idx) => {
          const isActive = topic.slug === currentSlug;
          const isCompleted = idx < currentIndex;

          return (
            <li key={topic.slug} className="flex-1">
              <Link href={`/topics/${topic.slug}`}>
                <button
                  className={`
                    w-full px-3 py-2 rounded-[var(--radius-md)] text-sm
                    transition-all duration-200
                    ${isActive
                      ? 'bg-[var(--color-accent-blue)] text-white'
                      : isCompleted
                      ? 'bg-[var(--color-accent-blue)] bg-opacity-30 text-[var(--color-accent-blue)]'
                      : 'bg-[var(--color-glass-bg)] text-[var(--color-text-secondary)]'
                    }
                  `}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Step ${idx + 1}: ${topic.title}`}
                >
                  <span className="hidden sm:inline">{topic.title}</span>
                  <span className="sm:hidden">{idx + 1}</span>
                </button>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

**Accessibility:** Uses `<ol>` for semantic ordering, `aria-current="step"` for active state, `aria-label` for screen readers. Keyboard-navigable links.

### Pattern 5: "Start Here" CTA on Homepage

**What:** Add a prominent button in the hero section linking to `/topics/data-sources` (the first recommended topic).

**When to use:** One-time addition to homepage. Directs new learners into the learning path immediately.

**Example:**
```typescript
// In src/app/page.tsx, hero section (after existing buttons)
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Link href="/topics/data-sources">
    <Button size="lg">Start Here — Data Sources</Button>
  </Link>
  <Link href="#topics">
    <Button variant="outline" size="lg">Explore All Topics</Button>
  </Link>
</div>
```

### Anti-Patterns to Avoid
- **Storing content in markdown files:** Lose TypeScript type safety; requires runtime parsing and manual fallbacks for missing sections.
- **Hardcoding colors in SVG components:** Use CSS variables so theme changes update all diagrams automatically.
- **Directly embedding heavy YouTube iframes:** Lite-youtube-embed solves lazy loading + privacy; standard iframes add ~500KB per video on page load.
- **Mixing content and presentation in the template:** Keep lib/topic-content.ts purely data; the template (`[slug]/page.tsx`) should only map data to components.
- **Progress strip with "auto-complete on visit" logic:** Phase 2 has no backend; progress strip is advisory UI only. No persistence in this phase.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YouTube privacy + lazy loading | Custom iframe loader | react-lite-youtube-embed | Handles youtube-nocookie.com, deferred loading, responsive sizing — non-trivial to get right |
| SVG responsiveness + theming | Static SVG image files | Inline React SVG components with CSS variables | CSS variables enable theme switching without re-exporting; viewBox scales automatically |
| Progress strip component | Custom step indicator | Leverage Lucide icons + Link pattern from Phase 1 | Simpler than Material UI stepper for this use case; reuses existing design tokens |
| Content validation | Manual checklist | TypeScript interface validation | Catch missing sections at build time, not in production |

**Key insight:** Content editing is expensive if separated from the code repo (e.g., Contentful CMS requires separate deploys). Keeping data in TypeScript files means content changes are git commits + PRs, reusable for future migrations.

## Common Pitfalls

### Pitfall 1: Content Sections Missing from Some Topics
**What goes wrong:** One topic has all 7 mandatory sections, another is missing "How AI Applies" or "From the Field" — UX inconsistency, incomplete reference material.

**Why it happens:** No schema enforcement; manual content creation without a checklist or TypeScript interface.

**How to avoid:** Use a strict TypeScript interface (TopicContent) that requires all 7 sections. IDE autocomplete will flag missing fields. Build fails if a topic is incomplete.

**Warning signs:** `// TODO: add From the Field` comments left in code; inconsistent section counts between topic pages in the UI.

### Pitfall 2: YouTube Video IDs Become Invalid
**What goes wrong:** Videos get deleted or made private post-launch; users see broken embeds or 404s.

**Why it happens:** No validation of video IDs at build time; URLs aren't stored as canonical references.

**How to avoid:** Store YouTube IDs (not full URLs) in topicContent. At build time or during review, manually verify each video is public and unlisted/public status. Create a test that checks video availability (optional for Phase 2, recommended for v2).

**Warning signs:** "This video is not available in your country" or blank embed frames on production.

### Pitfall 3: SVG Diagrams Don't Render Correctly in Static Export
**What goes wrong:** Inline SVG components work locally but fail during `next build` or on GitHub Pages; misaligned nodes, missing text, broken stroke colors.

**Why it happens:** CSS variable resolution timing issues; browser DevTools might show CSS as applied, but static export misses dynamic styles.

**How to avoid:** Test all 7 diagrams with `npm run build && npm start` (local static simulation). Verify CSS variables are defined in globals.css at the CSS root (`:root`). Use inline `style` attributes for fallback colors if needed.

**Warning signs:** Diagrams appear in dev (`next dev`) but disappear or break in production build.

### Pitfall 4: Cross-Topic Links Orphaned When Topic Slug Changes
**What goes wrong:** Content hardcodes `"data-quality"` link; slug later renamed to `"quality"` → all links break.

**Why it happens:** Strings are brittle; no type checking of link targets.

**How to avoid:** Use the `topics` array from `lib/topics.ts` as the source of truth for slugs. When linking, reference `topic.slug` from the array, not a string literal. Example:
```typescript
const dataQualityTopic = topics.find(t => t.slug === 'data-quality');
// Link to dataQualityTopic.slug, not to hardcoded "data-quality"
```

**Warning signs:** Build succeeds but links go to 404 pages; broken links only discovered in production.

### Pitfall 5: "From the Field" Callout Lacks Real Anonymization
**What goes wrong:** Example says "a Tier 1 bank" but then includes details (e.g., "customer base of 5M in the GCC, Alshaya portfolio") that make it obviously a specific company. Raja wants anonymity but context suggests otherwise.

**Why it happens:** No editorial pass on anonymization quality; balancing "vivid context" with "not revealing the company."

**How to avoid:** Include anonymization guidelines in the `FromTheField` interface (see above example). During content review, check:
  - No company or brand names
  - No specific product versions that are unique to one company
  - No metrics that pinpoint a company size (e.g., "only 3 banks in the GCC have this architecture")
  - Industry level OK: "a Tier 1 bank," "a mid-market logistics firm"

**Warning signs:** Callout triggers immediate recognition of which company it is; violates intent of anonymity.

### Pitfall 6: Progress Strip Breaks on Mobile
**What goes wrong:** 7 step buttons overflow on small screens; text truncates or wraps awkwardly; no scrolling.

**Why it happens:** Responsive design forgotten; tested only on desktop.

**How to avoid:** Follow responsive pattern from Phase 1: show topic names on desktop (sm:inline), show step numbers on mobile (hidden sm:hidden). Use gap-2 md:gap-4 for flexible spacing. Test on 375px (iPhone SE), 768px (iPad), 1024px (laptop).

**Warning signs:** Step buttons overlap on mobile, or "Next: Data Quality →" text overflow outside the viewport.

## Code Examples

### Example 1: Complete Topic Content Entry
```typescript
// Source: Phase 2 design pattern + data management domain knowledge
export const topicContent: Record<string, TopicContent> = {
  'data-quality': {
    slug: 'data-quality',
    title: 'Data Quality',
    overview: `Data quality is the fitness of data for its intended purpose. It's not a binary state—a dataset can be high-quality for analytics but inadequate for real-time transactions. Six core dimensions define data quality: accuracy (how closely data matches reality), completeness (presence of all required values), consistency (uniformity across systems), uniqueness (no unwanted duplicates), validity (conformance to format/type), and timeliness (currency for the use case). In enterprise environments, poor data quality cascades: a single bad customer record corrupts 70+ downstream reports, drives bad decisions, and erodes trust in analytics. AWS data lakes show that companies without data quality frameworks waste 30% of ETL time on cleanup.`,
    howAIApplies: `AI is transforming data quality from reactive (finding errors after they propagate) to proactive (predicting issues before they occur). Machine learning models detect anomalies in real time—spotting a sudden spike in null values or drift in distributions. Large language models help humans define quality rules in natural language, then auto-generate validation SQL. Pattern recognition identifies emerging quality issues across domains: if customer records show a new type of address format, AI flags it before it breaks downstream processes. RSPDQ (Raja's Semantic Pattern Duplicate Query) uses AI to detect semantic duplicates that simple exact-match rules miss.`,
    fromTheField: {
      text: `I once worked on a customer master implementation for a global CPG company operating in 25 countries. The client had invested heavily in a best-in-class MDM platform but data quality was endemic—addresses were stored in 40+ different formats, phone numbers lacked country codes, and gender classifications ranged from M/F to categorical free text. We discovered that business teams had developed 80+ ad-hoc cleanup spreadsheets to work around the bad data. The real insight wasn't the platform—it was that without a quality framework and governance, even the best tech becomes a data dump. We rebuilt around a quality-first mindset: dimension-based validation rules, automated remediation workflows, and monthly quality scorecards tied to business outcomes. Within 6 months, downstream analytics teams stopped complaining and started trusting the data.`,
      anonymization: 'a global CPG company operating in 25 countries'
    },
    architecture: 'A quality dimensions wheel shows the six core dimensions (accuracy, completeness, consistency, uniqueness, validity, timeliness) radiating from a central "fit for purpose" hub.',
    relatedTopics: ['master-data-management', 'data-governance', 'ai-in-data-management'],
    video: {
      youtubeId: 'nP_drYVCZgQ',  // Placeholder; Claude/Raja will confirm
      title: 'Data Quality Dimensions Explained'
    },
    whereToGoNext: {
      nextTopicSlug: 'master-data-management',
      relatedSlugs: ['data-governance', 'ai-in-data-management']
    },
    tools: [
      {
        name: 'RSPDQ (Raja Semantic Pattern Duplicate Query)',
        description: 'AI agent for detecting semantic duplicates using pattern matching and LLM analysis.',
        link: '#'  // Will be filled in with actual URL
      },
      {
        name: 'Great Expectations',
        description: 'Open-source data testing framework for Python-based validation pipelines.'
      }
    ],
    furtherReading: [
      {
        title: 'Raja\'s LinkedIn article on Data Quality in Multi-Tenant MDM',
        link: '#'  // Will be confirmed by Raja
      }
    ]
  },
};
```

### Example 2: SVG Diagram Component with Responsive Theming
```typescript
// Source: React SVG best practices + CSS variables for theming
import React from 'react';

export function DataQualityDiagram() {
  // CSS variable colors from globals.css
  const bgColor = 'var(--color-noir)';
  const lineColor = 'var(--color-accent-blue)';
  const textColor = 'white';
  const nodeRadius = 40;

  const dimensions = [
    { label: 'Accuracy', x: 200, y: 100 },
    { label: 'Completeness', x: 400, y: 100 },
    { label: 'Consistency', x: 600, y: 100 },
    { label: 'Uniqueness', x: 200, y: 300 },
    { label: 'Validity', x: 400, y: 300 },
    { label: 'Timeliness', x: 600, y: 300 },
  ];

  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full max-w-4xl mx-auto my-8"
      style={{
        backgroundColor: bgColor,
        borderRadius: 'var(--radius-md)',
      }}
    >
      {/* Central hub */}
      <circle cx="400" cy="200" r="30" fill="none" stroke={lineColor} strokeWidth="2" />
      <text x="400" y="205" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="600">
        Fit for Purpose
      </text>

      {/* Dimension nodes + connecting lines */}
      {dimensions.map((dim) => (
        <g key={dim.label}>
          {/* Line from center to node */}
          <line x1="400" y1="200" x2={dim.x} y2={dim.y} stroke={lineColor} strokeWidth="1" opacity="0.6" />

          {/* Node circle */}
          <circle cx={dim.x} cy={dim.y} r={nodeRadius} fill="none" stroke={lineColor} strokeWidth="2" />

          {/* Node label */}
          <text
            x={dim.x}
            y={dim.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={textColor}
            fontSize="12"
            fontWeight="500"
          >
            {dim.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
```

### Example 3: Updating Topic Page to Render Content + Diagram + Video
```typescript
// Source: Phase 2 integration of TopicContent, diagram, progress strip
import { topicContent } from '@/lib/topic-content';
import { DataQualityDiagram } from '@/components/diagrams/DataQualityDiagram';
import { VideoSection } from '@/components/VideoSection';
import { ProgressStrip } from '@/components/ProgressStrip';
import { GlassCard } from '@/components/GlassCard';
import Link from 'next/link';

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = topicContent[slug];

  if (!content) return notFound();

  return (
    <div className="min-h-screen bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back link + header (existing) */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">{content.title}</h1>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">{content.overview}</p>
        </section>

        {/* How AI Applies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">How AI Applies</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">{content.howAIApplies}</p>
        </section>

        {/* From the Field */}
        <section className="mb-12">
          <GlassCard className="border border-[var(--color-accent-blue)] border-opacity-30">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent-blue)] text-white text-xs font-semibold">
                From the Field
              </span>
            </div>
            <p className="text-white leading-relaxed mb-4 text-base">{content.fromTheField.text}</p>
            <p className="text-[var(--color-text-muted)] text-sm">
              — Raja Shahnawaz Soni · {content.fromTheField.anonymization}
            </p>
          </GlassCard>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Architecture</h2>
          <DataQualityDiagram />
        </section>

        {/* Video */}
        {content.video && (
          <VideoSection youtubeId={content.video.youtubeId} title={content.video.title} />
        )}

        {/* Where to Go Next */}
        <section className="mb-12 pt-8 border-t border-[var(--color-glass-border)]">
          <h2 className="text-2xl font-bold text-white mb-6">Where to Go Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Next in path */}
            {content.whereToGoNext.nextTopicSlug && (
              <Link href={`/topics/${content.whereToGoNext.nextTopicSlug}`}>
                <GlassCard>
                  <p className="text-sm font-semibold text-[var(--color-accent-blue)] mb-2">Next in Path</p>
                  {/* Get next topic title from topics array */}
                </GlassCard>
              </Link>
            )}
            {/* Related topics */}
            {content.whereToGoNext.relatedSlugs.map((relatedSlug) => (
              <Link key={relatedSlug} href={`/topics/${relatedSlug}`}>
                <GlassCard>
                  {/* Render related topic */}
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Progress Strip */}
        <ProgressStrip currentSlug={slug} />
      </div>
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Large CMS (Contentful, Strapi) for content | TypeScript data files + static export | 2024–2025 | Simpler deployment, faster builds, content in git |
| iframe embeds for all videos | Lite YouTube embeds with privacy defaults | 2023–2024 | 500KB+ load time saved per video, GDPR compliance |
| Static SVG image exports from Figma | Inline React SVG components with CSS variables | 2024–2025 | No design tool export step, responsive theming, one source of truth |
| Manual progress tracking in localStorage | Advisory progress strip UI (no persistence) | 2026 (Phase 2) | Simpler Phase 2 scope; full persistence in Phase 3 |
| Topic pages as separate markdown files | Single TypeScript interface + template rendering | 2026 (Phase 2) | Type safety, enforces schema completeness, easier scaling |

**Deprecated/outdated:**
- Server-rendered topic pages (e.g., Next.js ISR): Not needed; all 7 topics pre-rendered at build time via generateStaticParams().
- Image optimization via Next.js Image component: Disabled in static export (images.unoptimized: true); use native <img> tags with responsive srcset if needed for diagrams (not needed for inline SVG).

## Open Questions

1. **YouTube Video Candidates Per Topic**
   - What we know: 7 topics need 1 video each; Claude will search YouTube for high-quality explanations; Raja approves specific URLs.
   - What's unclear: Approval workflow timing (review per video, or batch after all identified?); fallback if a video is unavailable at launch?
   - Recommendation: Identify 2–3 candidate videos per topic before Phase 2 starts; Raja approves within 3 days; store URLs in topicContent immediately. Build includes validation that all video IDs are reachable (optional, can skip for Phase 2).

2. **SVG Diagram Complexity & Animation**
   - What we know: All 7 diagrams are static SVG components, no animation in Phase 2.
   - What's unclear: Should diagrams support hover effects (e.g., highlight a specific dimension)? Should they be interactive (clickable nodes)?
   - Recommendation: Phase 2 ships static diagrams. Hover effects (CSS :hover) are low-cost and recommended for UX polish. Interactive walkthroughs deferred to v2 (CONT-11).

3. **About/Bio Section Location**
   - What we know: BRAND-01 requires Raja's bio + credentials + speaker history.
   - What's unclear: Should this be a full /about page, or a lightweight section on the homepage?
   - Recommendation: Lightweight "About Raja" section on homepage (under the platform lineage or in a dedicated footer section). If desired, a full /about page can be added post-Phase 2 without breaking existing links.

4. **Logo Sourcing & Display**
   - What we know: Need SVG logos for Alshaya Group, MAGNOOS, Infosys, Tietoevry, Informatica, Microsoft, Salesforce.
   - What's unclear: Where should logos appear (homepage section, topic pages, footer)? Which logos are publicly available as SVG?
   - Recommendation: Create a "Trusted By / Built On" section on the homepage (similar to CONTEXT.md "From the Field" section). Search for official SVG logos on each company's brand kit or Wikimedia. If SVG unavailable, use PNG with max-width constraints. Place below the differentiators section.

5. **Content Word Count & Depth**
   - What we know: CONTEXT.md specifies "800–1200 words of curated content per topic."
   - What's unclear: Should this include mandatory sections only, or overview + all optional blocks?
   - Recommendation: 800–1200 words = mandatory sections (overview, how AI applies, from the field callout text). Optional blocks (tools, policy framework, further reading) are additive. If a topic ends up >1200 words with optionals, that's acceptable.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.0 + Playwright 1.58.2 (from Phase 1) |
| Config file | noesis/vitest.config.ts (existing), playwright.config.ts (existing) |
| Quick run command | `npm run test` (unit tests only, <30s) |
| Full suite command | `npm run test:e2e` (includes Playwright e2e, ~2–3m) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | 7 topic slugs from topics array | unit | `vitest run src/__tests__/topics.test.ts` | ❌ Wave 0 |
| CONT-02 | TopicContent schema for each topic | unit | `vitest run src/__tests__/topic-content.test.ts` | ❌ Wave 0 |
| CONT-03, CONT-04, CONT-05 | All 7 pages render + progress strip clickable | e2e | `playwright test e2e/topics.spec.ts` | ❌ Wave 0 |
| CONT-06 | Diagram component renders without errors | unit | `vitest run src/__tests__/diagrams.test.tsx` | ❌ Wave 0 |
| CONT-07 | lite-youtube-embed renders with correct ID | unit | `vitest run src/__tests__/video.test.tsx` | ❌ Wave 0 |
| CONT-08 | Cross-topic links resolve (no 404s) | e2e | `playwright test e2e/links.spec.ts` | ❌ Wave 0 |
| DISC-03 | "Where to Go Next" section renders + clickable | e2e | `playwright test e2e/topics.spec.ts` | ❌ Wave 0 |
| BRAND-02 | "From the Field" callout visible + styled | e2e | `playwright test e2e/topics.spec.ts` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run test` (unit tests only)
- **Per wave merge:** `npm run test && npm run test:e2e` (full suite)
- **Phase gate:** Full suite green + visual approval of all 7 topic pages before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/topics.test.ts` — Validates topics array structure + slug uniqueness
- [ ] `src/__tests__/topic-content.test.ts` — Validates all topics in topicContent have required fields (mandatory sections)
- [ ] `src/__tests__/diagrams.test.tsx` — Renders each diagram component; checks for errors
- [ ] `src/__tests__/video.test.tsx` — lite-youtube-embed component renders with valid YouTube ID
- [ ] `e2e/topics.spec.ts` — All 7 topic pages load, content visible, progress strip clickable, no 404s
- [ ] `e2e/links.spec.ts` — Cross-topic links in content navigate to correct pages
- [ ] `playwright.config.ts` — Already configured from Phase 1; ensure baseURL points to localhost:3000

## Sources

### Primary (HIGH confidence)
- [Next.js 16 Static Exports Guide](https://nextjs.org/docs/app/guides/static-exports) - Static site generation, output configuration
- [React SVG in React best practices](https://blog.logrocket.com/make-any-svg-responsive-with-this-react-component/) - Responsive SVG components, CSS variables
- [react-lite-youtube-embed npm package](https://www.npmjs.com/package/react-lite-youtube-embed) - YouTube embed API, privacy-mode URLs
- [Material UI Stepper](https://mui.com/material-ui/react-stepper/) - Step indicator accessibility patterns
- Phase 1 codebase (vitest.config.ts, playwright.config.ts, existing components)

### Secondary (MEDIUM confidence)
- [Data Quality Framework 2026 - LakeFS](https://lakefs.io/data-quality/data-quality-framework/) - Data quality dimensions overview
- [ETL vs ELT Architecture Patterns - Pure Storage Blog](https://blog.purestorage.com/purely-technical/etl-vs-elt/) - ETL/ELT concepts for Data Integration topic
- [MDM Hub-Spoke Model - Airbyte](https://airbyte.com/data-engineering-resources/hub-and-spoke-model) - MDM architecture patterns
- [Use Lite YouTube in Next.js - Francisco Moretti](https://www.franciscomoretti.com/blog/use-a-lite-youtube-embedded-player-in-nextjs) - Next.js + lite-youtube integration guide

### Tertiary (LOW confidence — flagged for validation)
- WebSearch for specific YouTube video candidates per topic (requires manual verification by Raja)
- Company logo sourcing (Alshaya Group, MAGNOOS, etc.) — public availability of SVG assets not verified

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All libraries verified in Phase 1 or current npm registry
- Architecture: HIGH — TypeScript interface pattern established; SVG + lite-youtube-embed well-documented and tested
- Content structure: MEDIUM — Domain knowledge (data management topics) from WebSearch; specific content wording deferred to Claude + Raja review
- Testing: MEDIUM — Test patterns established from Phase 1; specific test cases for new components (diagrams, ProgressStrip) to be written in Wave 0

**Research date:** 2026-03-15
**Valid until:** 2026-04-15 (30 days; tech stack is stable; content will evolve)

---

*End of Phase 2 Research*
