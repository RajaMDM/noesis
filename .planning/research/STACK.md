# STACK.md — Data Management Education Portal

**Domain:** Interactive educational portal with AI chat, visual learning, community content
**Deployment target:** Vercel (free tier → Pro/custom domain)
**Date:** 2026-03-15

---

## Recommended Stack

### Frontend Framework

| Choice | Library | Version | Confidence |
|--------|---------|---------|------------|
| ✅ Use | **Next.js** | 14.x / 15.x | HIGH |
| ✅ Use | **React** | 18.x / 19.x | HIGH |

**Rationale:** Next.js is the natural fit for Vercel deployment — first-class support, zero-config CI/CD, App Router for nested layouts (perfect for topic-based navigation), Server Components for fast initial loads, built-in API routes for any lightweight backend needs. Static generation for content pages, dynamic for AI chat routes.

**Don't use:** Create React App (deprecated), Vite-only SPA (loses SSR benefits for SEO and content pages), Remix (less Vercel-native).

---

### UI & Component Library

| Choice | Library | Version | Confidence |
|--------|---------|---------|------------|
| ✅ Use | **Tailwind CSS** | 3.x / 4.x | HIGH |
| ✅ Use | **shadcn/ui** | latest | HIGH |
| ✅ Use | **Radix UI** (via shadcn) | latest | HIGH |

**Rationale:** Tailwind gives full control over the dark/immersive aesthetic without fighting a component library's opinionated styles. shadcn/ui provides accessible, unstyled Radix primitives you copy into your codebase — no version lock-in, full customization. Perfect for a unique visual identity.

**Don't use:** Material UI or Chakra UI — too opinionated, hard to achieve a premium custom dark aesthetic without fighting the defaults. Styled-components — runtime CSS-in-JS has performance overhead.

---

### Animation & Motion

| Choice | Library | Version | Confidence |
|--------|---------|---------|------------|
| ✅ Use | **Framer Motion** | 11.x | HIGH |
| ✅ Use | **CSS animations** (Tailwind) | — | HIGH |

**Rationale:** Framer Motion is the standard for React animation — declarative, performant, works well with Next.js. Use for page transitions, component enter/exit, interactive diagram animations. Tailwind CSS animations for simpler cases (hover states, loading indicators).

**Don't use:** GSAP (heavier, more complex, license considerations for commercial). anime.js (less React-native).

---

### AI / Chat Integration (BYOK)

| Choice | Library | Version | Confidence |
|--------|---------|---------|------------|
| ✅ Use | **Vercel AI SDK** (`ai`) | 3.x | HIGH |
| ✅ Use | **OpenAI SDK** (client-side) | 4.x | HIGH |

**Rationale:** Vercel AI SDK provides streaming hooks (`useChat`, `useCompletion`) that work perfectly for both Standard Chat and Socratic Dialogue modes. It supports OpenAI, Anthropic, Google Gemini — all major BYOK providers. Keys stored in browser `localStorage` or `sessionStorage`, never sent to server. Streaming responses feel responsive.

**Don't use:** LangChain (over-engineered for this use case, heavy bundle). Rolling your own fetch loop — Vercel AI SDK handles edge cases (streaming, abort, retry).

---

### Content Architecture

| Choice | Library | Version | Confidence |
|--------|---------|---------|------------|
| ✅ Use | **MDX** (via `@next/mdx` or `contentlayer`) | latest | HIGH |
| ✅ Use | **Contentlayer2** | latest | MEDIUM |
| 🔄 Consider | **Sanity.io** (if community CMS needed) | latest | MEDIUM |

**Rationale:** MDX allows writing content as Markdown with embedded React components — perfect for interactive diagrams, callouts, and embedded videos within topic content. Contentlayer2 transforms MDX into typed data for Next.js. If community contributions grow complex, Sanity.io provides a proper headless CMS with a WYSIWYG editor.

**Don't use:** WordPress (wrong paradigm). Strapi (self-hosted, ops overhead). Plain JSON files at scale (hard to maintain).

---

### Diagrams & Visual Aids

| Choice | Library | Version | Confidence |
|--------|---------|---------|------------|
| ✅ Use | **Mermaid.js** | 10.x | HIGH |
| ✅ Use | **React Flow** | 11.x | HIGH |
| ✅ Use | **D3.js** (selective use) | 7.x | MEDIUM |

**Rationale:** Mermaid for authored diagrams (flowcharts, sequence diagrams in MDX content). React Flow for interactive node-graph visualizations (data pipeline flows, architecture diagrams users can explore). D3 for custom animated charts if needed — use sparingly due to complexity.

**Don't use:** Building diagrams as images — hard to maintain, not accessible, can't animate.

---

### Video Embedding

| Choice | Approach | Confidence |
|--------|---------|------------|
| ✅ Use | **YouTube / Vimeo embed** (via `next/image` + iframe) | HIGH |
| ✅ Use | **`react-player`** library | HIGH |

**Rationale:** react-player handles YouTube, Vimeo, and direct video URLs with a unified API. Lazy-loads by default — important for page performance when multiple videos exist.

---

### Search

| Choice | Library | Confidence |
|--------|---------|------------|
| ✅ Use | **Algolia** (free tier) or **Fuse.js** (local) | HIGH |

**Rationale:** Fuse.js for local fuzzy search (zero cost, works offline). Upgrade to Algolia when content volume grows — better relevance ranking, faceted search.

---

### Deployment & CI/CD

| Choice | Service | Confidence |
|--------|---------|------------|
| ✅ Use | **Vercel** (free → Pro) | HIGH |
| ✅ Use | **GitHub Actions** (optional extra CI) | MEDIUM |

**Rationale:** Vercel free tier: unlimited personal projects, preview deployments per PR, custom domain support on Pro. Automatic deploys from `main`. No server config needed.

**Migration path:** Vercel Pro ($20/mo) for custom domain, more bandwidth, team features. AWS/GCP if self-hosting becomes necessary at scale.

---

### Package Manager & Tooling

| Tool | Choice | Confidence |
|------|--------|------------|
| Package manager | **pnpm** | HIGH |
| Linting | **ESLint** + **Prettier** | HIGH |
| TypeScript | **Yes** | HIGH |

---

## Summary: Core Stack

```
Next.js 14/15 + React 18/19
Tailwind CSS + shadcn/ui + Radix UI
Framer Motion
Vercel AI SDK (BYOK chat)
MDX + Contentlayer2 (content)
Mermaid.js + React Flow (diagrams)
react-player (video)
Fuse.js → Algolia (search)
Vercel (hosting)
TypeScript + pnpm
```

---

*Confidence note: Stack recommendations based on knowledge as of early 2026. Verify specific version numbers at npm registry before pinning.*
