# Architecture Patterns: Interactive Educational Portal

**Domain:** Interactive educational portal with AI chat, community content, rich visuals
**Researched:** 2026-03-15
**Confidence:** MEDIUM-HIGH (based on Next.js official patterns + industry standard BYOK/streaming architecture)

## Executive Summary

Modern educational portals with AI features are structured around three primary layers:

1. **Content Layer** — Static and dynamic topic content, managed as MDX with file-based or headless CMS architecture
2. **Interactive Layer** — React components for visualization, navigation, and interaction; client-side state for chat and keys
3. **API Layer** — Minimal server-side logic; most AI inference happens client-side via BYOK; backend handles content serving, community moderation, and non-sensitive data

This architecture prioritizes **zero backend AI costs** (BYOK model), **fast content delivery** (static generation + ISR), and **secure key handling** (client-side storage only).

---

## Recommended Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel CDN / Edge                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────┐        ┌──────────────────────┐  │
│  │   Static Content      │        │   Dynamic Routes      │  │
│  │   (SSG + ISR)         │        │   (Server Components) │  │
│  ├───────────────────────┤        ├──────────────────────┤  │
│  │ • Topic pages (MDX)   │        │ • Community search    │  │
│  │ • Navigation metadata │        │ • User preferences    │  │
│  │ • Diagram assets      │        │ • Moderation queue    │  │
│  │ • Search index        │        │ • Analytics           │  │
│  └───────────────────────┘        └──────────────────────┘  │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │            React Client (App Router, Next.js)            │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │                                                           │ │
│  │ ┌────────────────────────────────────────────────────┐  │ │
│  │ │          Layout & Navigation                       │  │ │
│  │ │ • Header (logo, search, theme toggle)             │  │ │
│  │ │ • Sidebar (topic tree, learning path)             │  │ │
│  │ │ • Footer (resources, community links)             │  │ │
│  │ └────────────────────────────────────────────────────┘  │ │
│  │                                                           │ │
│  │ ┌──────────────────┐  ┌──────────────────────────────┐  │ │
│  │ │  Content Area    │  │   AI Chat Sidebar            │  │ │
│  │ ├──────────────────┤  ├──────────────────────────────┤  │ │
│  │ │ • Rendered MDX   │  │ • Chat Mode Selector         │  │ │
│  │ │ • Diagrams       │  │   - Standard Q&A             │  │ │
│  │ │ • Videos         │  │   - Socratic Dialogue        │  │ │
│  │ │ • Community      │  │ • Message thread             │  │ │
│  │ │   contributions  │  │ • API Key manager (UI)       │  │ │
│  │ │ • Interactive    │  │ • Provider selector          │  │ │
│  │ │   elements       │  │ • System prompt editor       │  │ │
│  │ └──────────────────┘  └──────────────────────────────┘  │ │
│  │                                                           │ │
│  │ ┌─────────────────────────────────────────────────────┐  │ │
│  │ │   Client-Side State Management (React Context)      │  │ │
│  │ ├─────────────────────────────────────────────────────┤  │ │
│  │ │ • API Keys (encrypted localStorage)                │  │ │
│  │ │ • Chat history (session storage)                   │  │ │
│  │ │ • User preferences (theme, learning path)          │  │ │
│  │ │ • Selected provider config                         │  │ │
│  │ │ • Socratic mode state                              │  │ │
│  │ └─────────────────────────────────────────────────────┘  │ │
│  │                                                           │ │
│  │ ┌─────────────────────────────────────────────────────┐  │ │
│  │ │   Streaming Chat Engine (Client-Side)              │  │ │
│  │ ├─────────────────────────────────────────────────────┤  │ │
│  │ │ • Direct API calls to OpenAI / Anthropic / etc.    │  │ │
│  │ │ • CORS proxy optional (for browser security)       │  │ │
│  │ │ • Streaming response handler (useChat hook)        │  │ │
│  │ │ • Message formatting & markdown rendering          │  │ │
│  │ │ • Socratic prompt injection logic                  │  │ │
│  │ └─────────────────────────────────────────────────────┘  │ │
│  │                                                           │ │
│  └─────────────────────────────────────────────────────────┘  │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    Next.js API Routes (Minimal)              │
├─────────────────────────────────────────────────────────────┤
│ • GET /api/docs/[slug]     → Fetch MDX content metadata      │
│ • GET /api/search          → Search content index            │
│ • POST /api/community      → Submit/moderate contributions   │
│ • GET /api/learning-path   → User progress (if tracked)      │
│ • GET /api/config          → Frontend config (providers)     │
│ • DELETE /api/cache        → Invalidate ISR pages            │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│              External Services (Zero Backend AI Cost)        │
├─────────────────────────────────────────────────────────────┤
│ Client → OpenAI / Anthropic / Google API (user's keys)       │
│ Client → Optional: CORS proxy layer (if needed for security) │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Boundaries

### Core Components & Responsibilities

| Component | Responsibility | Communicates With |
|-----------|---|---|
| **Layout System** | Root layout, sidebar nav, header, footer structure | Content pages, Chat sidebar |
| **Content Renderer** | MDX compilation, markdown to React, diagram rendering | MDX files in filesystem |
| **Topic Pages** | Dynamic route handler for each topic; SSG with ISR | Content Renderer, API routes for metadata |
| **Search Component** | Full-text search across topic index | Client-side search index, API route |
| **Sidebar Navigation** | Topic tree, learning path tracking, active state | Router, Context API (current topic) |
| **Chat Interface** | Message UI, message input, streaming response display | Streaming Chat Engine, Context (chat state) |
| **Chat Mode Selector** | Toggle between Standard Q&A and Socratic Dialogue | Context (mode state), Streaming engine |
| **API Key Manager** | Encrypt/decrypt keys, selector for provider, store in localStorage | Context API, localStorage, Streaming engine |
| **Streaming Chat Engine** | Direct API calls, response streaming, error handling | LLM APIs (user's keys), Message formatter |
| **Message Formatter** | Markdown rendering, syntax highlighting, LaTeX support | Chat Interface |
| **Community Content Panel** | Display user contributions, moderation UI (if admin) | API route (/api/community) |
| **Interactive Diagrams** | SVG/Canvas elements, animations, interactivity | React state, Framer Motion or similar |
| **Image & Video Container** | Optimize, lazy-load, embed videos from YouTube/Vimeo | Next.js Image component |
| **Socratic Prompt Engine** | Inject system prompts that enforce question-only responses | Context (Socratic config), Streaming engine |

### Data Flow

```
User Action (read topic, ask question, toggle mode)
    ↓
React Component event handler
    ↓
Update Client Context (state)
    ↓
If content fetch:
  ├→ Server Component renders
  ├→ Fetch data (file system or API)
  └→ Return cached/fresh content
    ↓
If chat interaction:
  ├→ Retrieve API key from localStorage
  ├→ Retrieve provider & model config from Context
  ├→ Call LLM API directly (browser → OpenAI/Anthropic/etc)
  ├→ Stream response via ReadableStream
  └→ Display in Chat Interface
    ↓
If Socratic mode:
  ├→ Wrap user message with system prompt (question-enforcement)
  ├→ Send modified prompt to LLM
  └→ Ensure response is questions only
    ↓
If community contribution:
  ├→ POST to /api/community with content
  ├→ Server validates, flags for moderation
  └→ Update community panel once approved
    ↓
Render to user
```

---

## Recommended Architecture Patterns

### Pattern 1: Static Content with Incremental Static Regeneration (ISR)

**What:** Topic pages are pre-rendered at build time, then revalidated on-demand at intervals.

**When:** All topic content (Data Sources, Data Integration, etc.) that changes infrequently (weekly/monthly).

**Example:**

```typescript
// app/topics/[slug]/page.tsx
import { getMDXContent } from '@/lib/mdx';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const topics = await getAllTopics();
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export default async function TopicPage({ params }) {
  const { content, metadata } = await getMDXContent(`topics/${params.slug}.mdx`);

  return (
    <article>
      <h1>{metadata.title}</h1>
      {/* Render MDX */}
      {content}
    </article>
  );
}
```

**Benefit:** Fast page loads (cached on CDN), no dynamic server rendering needed, automatic invalidation.

---

### Pattern 2: Client-Side BYOK with Encrypted Storage

**What:** API keys are stored in the browser's encrypted localStorage, never sent to server.

**When:** All AI chat interactions via OpenAI, Anthropic, Google APIs.

**Example:**

```typescript
// lib/keyManagement.ts
import crypto from 'crypto-js'; // or libsodium.js for browser

export function encryptApiKey(key: string, password: string): string {
  return crypto.AES.encrypt(key, password).toString();
}

export function decryptApiKey(encrypted: string, password: string): string {
  return crypto.AES.decrypt(encrypted, password).toString(crypto.enc.Utf8);
}

export function storeApiKey(provider: 'openai' | 'anthropic' | 'google',
                            key: string,
                            masterPassword: string) {
  const encrypted = encryptApiKey(key, masterPassword);
  localStorage.setItem(`key_${provider}`, encrypted);
}
```

**Client-Side Usage:**

```typescript
// app/chat/useChat.ts (React hook)
export function useApiCall() {
  const [apiKey, setApiKey] = useState<string>('');

  const callLLM = async (messages: ChatMessage[]) => {
    const key = decryptApiKey(
      localStorage.getItem(`key_${provider}`),
      userPassword
    );

    // Direct API call in browser — NO server-side proxying
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: messages,
        stream: true,
      }),
    });

    // Handle streaming response
    const reader = response.body?.getReader();
    // ...
  };

  return { callLLM };
}
```

**Benefit:** Zero server-side inference costs, privacy-first (platform never sees user keys), maximum provider flexibility.

**Caveat:** Browser CORS may require optional reverse proxy for some providers. Optional edge function to proxy if needed:

```typescript
// app/api/llm-proxy/route.ts (only if CORS is blocker)
export async function POST(req: Request) {
  const { messages, apiKey, provider } = await req.json();

  // Forward to LLM API with user's key
  const response = await fetch(`https://api.${provider}.com/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ messages }),
  });

  // Return streaming response to client
  return new Response(response.body, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}
```

---

### Pattern 3: MDX-Based Content with File System as Source of Truth

**What:** Topics are MDX files in the repo; compile at build time; git history is content versioning.

**When:** All topic pages, guides, examples.

**Example Structure:**

```
app/
├── topics/
│   ├── [slug]/
│   │   └── page.tsx
│   └── layout.tsx
content/
├── topics/
│   ├── data-sources.mdx
│   ├── data-integration.mdx
│   ├── data-quality.mdx
│   ├── master-data-management.mdx
│   ├── reverse-integration.mdx
│   ├── data-governance.mdx
│   └── ai-in-data-management.mdx
lib/
└── mdx.ts (compile MDX at build time)
```

**Example MDX File:**

```mdx
---
title: Data Integration
slug: data-integration
order: 2
difficulty: intermediate
---

# Data Integration

## What It Is

Data integration is the process of combining data from different sources...

<DiagramComponent type="integration-flow" />

## Common Patterns

<TableOfContents />

### Batch vs. Real-Time

This is a core distinction...

<InteractiveDiagram source="batch-vs-realtime" />

## How AI Helps

<AISidecar question="What challenges does real-time integration create?" />
```

**Benefit:** Git-versioned content, fast compile times, full control over formatting, community PRs are just Markdown edits.

---

### Pattern 4: Socratic Dialogue Mode with System Prompt Injection

**What:** A distinct chat mode that injects a system prompt forcing the AI to ask questions instead of providing answers.

**When:** All Socratic Q&A interactions; user explicitly toggles this mode.

**Example:**

```typescript
// lib/socraticPrompt.ts
export const SOCRATIC_SYSTEM_PROMPT = `
You are a Socratic tutor guiding a learner through data management concepts.
Your role is NEVER to provide direct answers. Instead:

1. Ask clarifying questions about what the learner already knows
2. Guide them to think through the problem themselves
3. When they're stuck, ask a leading question that points toward the insight
4. Celebrate when they arrive at the answer through their own reasoning

Rules:
- NO direct answers. Ever. Use questions instead.
- NO lists of facts. Use questions to help them discover patterns.
- Ask one question at a time.
- Wait for their response before proceeding.

Remember: Your job is to teach them to think, not to tell them what to think.
`;

export function wrapWithSocraticMode(userMessage: string): string {
  return `
    System: ${SOCRATIC_SYSTEM_PROMPT}

    User: ${userMessage}
  `;
}
```

**Usage in Chat:**

```typescript
const messages = [
  { role: 'system', content: SOCRATIC_SYSTEM_PROMPT },
  { role: 'user', content: userMessage },
];

// Send to LLM with this system prompt
const response = await callLLM(messages, apiKey, provider);
```

**UI Distinction:**

```tsx
// Chat interface shows which mode is active
<ChatModeToggle
  modes={[
    { label: 'Standard Q&A', value: 'standard', active: true },
    { label: 'Socratic Dialogue', value: 'socratic' },
  ]}
  onSelect={(mode) => setMode(mode)}
/>
```

**Benefit:** Clear separation of chat experiences; distinct learning outcomes; users explicitly choose their learning style.

---

### Pattern 5: Community Content as Federated Contributions

**What:** Users submit topic contributions (examples, alternative explanations, diagrams); moderation queue visible to admins.

**When:** Community-contributed learning resources.

**Architecture:**

```
Client submits contribution
    ↓
POST /api/community/submit
    ↓
Server validates (no code injection, size limits)
    ↓
Store in "pending" collection (Firebase/Supabase/DB)
    ↓
Notify admins; show in moderation dashboard
    ↓
Admin reviews and approves
    ↓
Approved contributions compiled into next build or cached
    ↓
Displayed alongside official content with attribution
```

**Example:**

```typescript
// app/api/community/submit/route.ts
export async function POST(req: Request) {
  const { topicSlug, content, contributorName, email } = await req.json();

  // Validate
  if (!topicSlug || !content) return new Response('Invalid', { status: 400 });

  // Store pending
  const contribution = {
    id: crypto.randomUUID(),
    topicSlug,
    content,
    contributorName,
    email,
    status: 'pending',
    createdAt: new Date(),
  };

  await db.collection('pending_contributions').add(contribution);

  return new Response(
    JSON.stringify({ message: 'Submitted for review', id: contribution.id }),
    { status: 201 }
  );
}
```

**Benefit:** Scales content without a dedicated team; community ownership; clear moderation trail.

---

### Pattern 6: Dynamic Learning Path with Client-Side Tracking

**What:** Users see a recommended path (Data Sources → Data Integration → Data Quality → etc.) but can freely explore any topic.

**When:** Navigation and learning progress.

**Example:**

```typescript
// lib/learningPath.ts
export const RECOMMENDED_PATH = [
  { slug: 'data-sources', title: 'Data Sources' },
  { slug: 'data-integration', title: 'Data Integration' },
  { slug: 'data-quality', title: 'Data Quality' },
  { slug: 'master-data-management', title: 'Master Data Management' },
  { slug: 'reverse-integration', title: 'Reverse Integration' },
  { slug: 'data-governance', title: 'Data Governance' },
  { slug: 'ai-in-data-management', title: 'AI in Data Management' },
];

// Client-side context
export function useLearningProgress() {
  const [visited, setVisited] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem('visited_topics') || '[]'))
  );

  const markComplete = (slug: string) => {
    visited.add(slug);
    localStorage.setItem('visited_topics', JSON.stringify([...visited]));
  };

  const getProgress = () => {
    const total = RECOMMENDED_PATH.length;
    const completed = RECOMMENDED_PATH.filter((t) => visited.has(t.slug)).length;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  return { visited, markComplete, getProgress };
}
```

**Benefit:** Personalized UX without backend; entirely client-side; no privacy concerns.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Server-Side AI Key Management

**What:** Storing user API keys on the server to proxy LLM requests.

**Why Bad:**
- Violates privacy assumptions (platform sees all user keys)
- Turns platform into expensive SaaS (platform pays for inference)
- Requires server scaling; no longer Vercel free tier friendly
- If server is compromised, all user keys exposed

**Instead:**
- Store keys in browser encrypted localStorage
- Call LLM APIs directly from client (minimal CORS issues)
- Optional: Use edge function only as transparent proxy if needed
- Educate users: "Your API key never leaves your device"

---

### Anti-Pattern 2: Rendering All Content Server-Side

**What:** Using `getServerSideProps` for every topic page.

**Why Bad:**
- Defeats the purpose of Vercel (edge caching disabled)
- Every page load is a full server round-trip
- No CDN caching; slow cold starts
- Difficult to scale for global learners

**Instead:**
- Use Static Generation (SSG) + ISR for topic pages
- Revalidate every 1-24 hours depending on update frequency
- On-demand revalidation when content is pushed

---

### Anti-Pattern 3: Mixing Socratic and Standard Chat in One Interface

**What:** Same chat interface toggling between modes.

**Why Bad:**
- Confusing UX (which mode am I in? Did AI switch modes?)
- Easy to forget mode selection between messages
- Hard to maintain distinct system prompts

**Instead:**
- Separate chat components or tabs
- Clear visual indicator (color, icon) showing active mode
- Warn user when switching modes ("Chat history will be cleared")

---

### Anti-Pattern 4: Storing Chat History Server-Side Without User Consent

**What:** Platform keeps copies of all chat interactions.

**Why Bad:**
- Privacy concern (user and platform vendor conversations)
- GDPR/compliance complexity
- Unnecessary storage costs
- Users don't expect it (BYOK implies client-side only)

**Instead:**
- Chat history lives in browser localStorage/sessionStorage only
- Optional: Local IndexedDB for larger histories
- No server-side chat logs unless explicitly opt-in
- Clear UI: "Chat history is stored on this device only"

---

### Anti-Pattern 5: Building Custom CMS When MDX File-System Works

**What:** Adding a database layer for content management.

**Why Bad:**
- Adds infrastructure complexity
- Requires admin UI, database schema, migrations
- Content versioning is harder (git history is simpler)
- Slows content publishing (write DB, wait for cache invalidation)

**Instead:**
- Use MDX files in git
- Community contributions via GitHub PRs or moderation queue (stored separately)
- Build is content publication

---

## Scalability Considerations

| Concern | At 100 Users | At 10K Users | At 1M Users |
|---------|---|---|---|
| **Content Serving** | SSG + Vercel CDN (free tier) | Still SSG + CDN; monitor cache hit rates | Still SSG; may need custom domain + Vercel Pro for SLA |
| **Search** | Client-side index (~200KB json) | Still client-side; may lazy-load index | Same; index may hit 5MB+ (consider Algolia/meilisearch) |
| **Chat History** | Browser localStorage (5-10MB limit) | Same; educate users about limits | Same; optional sync to optional backend (opt-in) |
| **Community Contributions** | Store in Firebase free tier | Monitor read/write quotas; may upgrade | Dedicated database; consider moderation queue SLA |
| **Analytics** | Vercel Web Vitals | Same; may add Plausible Analytics | Same; consider Segment for event tracking |
| **Auth (optional later)** | No auth needed initially | Still no auth; contributions anonymous | If needed: Clerk or Auth0; BYOK remains keyless |

**Key Insight:** This architecture scales to 1M+ users without backend cost explosion because:
- Content is static (CDN-friendly)
- AI inference is user-paid (BYOK)
- User data is client-stored (no database scaling)
- Moderation is async (no real-time guarantee)

---

## Build Order Implications

### Phase 1: Foundation (Weeks 1-2)

**Build First:**
1. Next.js app structure with App Router
2. MDX content pipeline (compile topics → React)
3. Topic pages with SSG + revalidation
4. Basic navigation (sidebar, topic list)

**Why:** Everything else depends on being able to render content. Can't test chat without content context.

**Dependencies:** None (greenfield)

**Output:** Users can browse all 7 topics with static content.

---

### Phase 2: Interactive Content (Weeks 3-4)

**Build Next:**
1. Interactive diagram components
2. Image/video optimization and embedding
3. Table of contents and scroll spy
4. Search index generation

**Why:** Content is now readable; enhance readability and navigation.

**Dependencies:** Phase 1 (needs rendered content to enhance)

**Output:** Rich, navigable topic pages with visuals and search.

---

### Phase 3: AI Chat Foundation (Weeks 5-6)

**Build Next:**
1. Client-side API key manager (encrypt/decrypt, localStorage)
2. Provider selector (OpenAI, Anthropic, Google)
3. Chat interface UI (message list, input, streaming display)
4. Streaming response handler (useChat hook pattern)

**Why:** All pieces needed for BYOK to work; no backend required yet.

**Dependencies:** Phase 1 (context for chat) + some Phase 2 (diagrams referenced in chat)

**Output:** Users can chat about topics; keys stored securely; zero backend AI cost.

---

### Phase 4: Socratic Dialogue (Week 7)

**Build Next:**
1. Socratic mode UI component (toggle, separate chat context)
2. System prompt injection for Socratic behavior
3. Distinct visual styling (separate from Standard Q&A)
4. Testing with real LLM to verify question-only behavior

**Why:** Core differentiator; distinct from Phase 3; can be added after basic chat works.

**Dependencies:** Phase 3 (needs working chat first)

**Output:** Users can toggle Socratic mode; AI withholds answers, asks questions.

---

### Phase 5: Community Contributions (Weeks 8-9)

**Build Next:**
1. Community submission form
2. Moderation queue backend (Firebase/Supabase)
3. Admin dashboard for approvals
4. Integrating approved contributions into topic pages

**Why:** Requires backend; separate from core platform.

**Dependencies:** Phase 1 (needs topic structure) + Phase 3 (optional: chat references contrib)

**Output:** Community can submit examples; platform can moderate and display them.

---

### Phase 6: Polish & Launch (Week 10+)

**Build Last:**
1. Dark mode + theme system (Tailwind CSS)
2. Mobile responsiveness
3. Analytics (Vercel + optional Plausible)
4. SEO (structured data, Open Graph)
5. Performance tuning (Core Web Vitals)

**Why:** Polish after all features exist; late-stage work.

**Dependencies:** All earlier phases

**Output:** Polished, performant, launchable product.

---

## Key Architecture Decisions

| Decision | Rationale | Implication |
|----------|-----------|-------------|
| **MDX for content** | Git-versioned, community-editable, compiles to React | No database for content; simple git workflow |
| **SSG + ISR** | Fast CDN delivery, automatic caching, on-demand revalidation | Content updates visible within 1 hour; no dynamic server rendering |
| **BYOK AI** | Privacy-first, zero inference cost, provider flexibility | Keys never touch our servers; users pay for own usage |
| **Client-side chat** | Streaming responses, real-time UX, no backend latency | Browser CORS may require optional proxy; minimal backend |
| **Socratic as distinct mode** | Clear UX, distinct prompts, different learning outcome | Requires separate system prompt & UI component |
| **Vercel + free tier** | Low cost at launch, automatic CI/CD, edge functions available | Minimal server logic; upgrade path available if needed |
| **Community queue (async)** | Scales without overhead, transparent moderation | Contributions not instant; maintains editorial control |

---

## Sources

- **Next.js Official Docs** (2025): App Router, SSG, ISR patterns — retrieval confirmed
- **Vercel Documentation** (2025): Deployment architecture, edge functions, free tier capabilities
- **Industry Standard Patterns**:
  - BYOK architecture: Established practice in privacy-first SaaS (e.g., Vercel AI SDK community patterns)
  - Streaming chat: Standard in modern AI UX (OpenAI, Anthropic, Google APIs support streaming)
  - MDX for documentation: Widely adopted (Nextra, Astro Starlight, custom Next.js implementations)
  - ISR for educational content: Recommended by Next.js for frequently-viewed static content

---

## Confidence Assessment

| Area | Confidence | Notes |
|---|---|---|
| **Frontend Layer** | HIGH | Next.js App Router is current standard; MDX is established; React patterns are stable |
| **BYOK Architecture** | HIGH | Client-side key storage is proven pattern; streaming APIs well-documented by providers |
| **Content Delivery** | HIGH | SSG + ISR is Next.js standard; ISR is appropriate for this use case |
| **Socratic Pattern** | MEDIUM | System prompt injection works but quality depends heavily on LLM model; requires tuning |
| **Community Integration** | MEDIUM | Async moderation is sound; exact implementation (Firebase vs. other DB) needs phase-specific research |
| **Scalability Claims** | MEDIUM | Applies to current constraints (Vercel free); upgrade path exists but untested |

---

## Gaps & Phase-Specific Research

1. **Database Choice for Community** (Phase 5)
   - Firebase vs. Supabase vs. custom Postgres
   - Moderation workflow automation
   - Contribution attribution & linking

2. **Search Implementation** (Phase 2)
   - Client-side index (MiniSearch, Lunr) vs. Algolia
   - Performance at scale (index size > 5MB)

3. **Analytics & Telemetry** (Phase 6)
   - Privacy-first tracking (Plausible vs. built-in Vercel Web Vitals)
   - Learning outcome metrics

4. **Socratic Prompt Tuning** (Phase 4)
   - Which LLM models enforce "questions only" best?
   - Cost of model choices (GPT-4 vs. Claude vs. Llama)
   - User feedback on dialogue quality

5. **Authentication & Personalization** (Future)
   - Optional user accounts for progress tracking
   - Auth provider (Clerk, Auth0, self-hosted)
   - Data privacy implications
