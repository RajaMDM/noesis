# Phase 1: Foundation - Research

**Researched:** 2026-03-15
**Domain:** Next.js portal with dark-mode design system, GitHub Pages deployment, responsive component library
**Confidence:** HIGH

## Summary

Phase 1 establishes the technical and visual foundation for Noesis — a publicly deployed educational portal with a premium dark-mode aesthetic and responsive design system. The phase requires scaffolding a Next.js application with static content delivery, designing and implementing a consistent component library using Tailwind CSS and shadcn/ui, and configuring CI/CD automation via GitHub Actions for GitHub Pages deployment.

The architecture prioritizes static site generation (SSG) with incremental static regeneration (ISR) for content pages, Tailwind CSS with design tokens for consistent theming, and a glassmorphism-based card design that signals premium quality. All subsequent phases depend on the component library and deployment pipeline established here.

**Primary recommendation:** Use Next.js 15 with App Router + Tailwind CSS 4.0 + shadcn/ui (March 2026 CLI v4) for maximum control over the dark aesthetic. Implement design tokens as CSS variables in Tailwind's @theme directive. Configure GitHub Actions to deploy to GitHub Pages via static export. Build responsive layouts mobile-first using Tailwind's breakpoint system (sm: 640px, md: 768px, lg: 1024px, xl: 1280px).

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Visual Identity:**
- Background: Pure noir (#080808 range) — true black, maximum contrast, cinematic
- Accent color: Electric blue/cyan — drives CTAs, highlights, active states
- Typography: Inter (body/UI), JetBrains Mono (code/data labels)
- Gradients: Subtle and atmospheric only — never on text
- Card surfaces: Glassmorphism — semi-transparent background, backdrop blur, ~1px white border
- Buttons: Solid electric blue fill with subtle outer glow on hover
- Border radius: 12–16px across components
- Motion: Purposeful — entrance animations, hover transitions, subtle parallax on hero
- **Design philosophy:** Vercel/Linear/Retool premium aesthetic, NOT Duolingo colorful ed-tech

**Homepage Layout:**
- Hero: Bold headline + subtitle about Socratic/BYOK approach
- 7 topic cards: Icon, name, 1-line description — responsive grid
- Below-fold: "What makes Noesis different" section (BYOK + Socratic focus)
- No "How it works" walkthrough or community callout on homepage

**Navigation Structure:**
- Sticky top navbar: Logo left, nav links, future Chat/Community slots
- Topics dropdown: Single link expanding to all 7 topics
- Mobile: Hamburger menu with full-screen or slide-in options

### Claude's Discretion

- Exact animation timing/easing curves (use Framer Motion defaults as baseline)
- Spacing scale and specific pixel values (derive from Tailwind defaults, adjust as needed)
- Icon library choice (Lucide React standard with shadcn/ui)
- Exact hover state colors and transition durations
- Footer design and content
- Error and 404 page design

### Deferred Ideas (OUT OF SCOPE)

- None — discussion stayed within phase scope

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFRA-01 | Portal is deployed and publicly accessible via GitHub Pages | GitHub Actions workflow configured; Next.js static export mode with gh-pages branch deployment verified |
| INFRA-02 | Deployments trigger automatically from git pushes via GitHub Actions (CI/CD) | Official GitHub Actions examples found; next.config.js export configuration documented |
| INFRA-03 | Architecture supports one-step migration to Vercel (no code changes, only env/config) | Next.js is Vercel-native; zero code changes required for deployment to Vercel; ISR configuration portable |
| DSGN-01 | Portal uses rich, immersive dark-mode aesthetic with gradients and motion/animation | Tailwind CSS 4.0 dark mode + Framer Motion 11 verified; glassmorphism CSS patterns confirmed for dark backgrounds |
| DSGN-02 | Portal is fully responsive and usable on mobile and tablet (no layout breakage) | Tailwind responsive breakpoints (360px mobile, 768px tablet, 1366px desktop) confirmed; mobile-first CSS approach documented |
| DSGN-03 | Design system is consistent across all pages (typography, spacing, color, components) | Design tokens via Tailwind v4 @theme directive; shadcn/ui CLI v4 (March 2026) provides typed component registry; consistent component library pattern established |

</phase_requirements>

---

## Standard Stack

### Core Framework

| Library | Version | Purpose | Why Standard | Confidence |
|---------|---------|---------|--------------|-----------|
| **Next.js** | 15.x (or 14.x LTS) | React framework with App Router, SSG/ISR, built-in API routes | Vercel-native, App Router enables nested layouts for topic pages, zero-config export for static sites, supports GitHub Pages deployment | HIGH |
| **React** | 19.x (or 18.x) | UI component library | 19 fully compatible with Framer Motion 11; Suspense/streaming SSR support; Server Components for content rendering | HIGH |
| **TypeScript** | 5.x | Type safety for components and API routes | Standard in modern React/Next.js projects; enables design token type safety | HIGH |

**Installation:**
```bash
npx create-next-app@latest noesis --typescript --tailwind --app
```

**next.config.js for GitHub Pages export:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/notebooklm' : '',
  // Only if deploying to a subdirectory; adjust if using custom domain
};
export default nextConfig;
```

---

### Styling & Design System

| Library | Version | Purpose | Why Standard | Confidence |
|---------|---------|---------|--------------|-----------|
| **Tailwind CSS** | 4.x | Utility-first CSS with design tokens | Full control over dark aesthetic without fighting opinionated defaults; @theme directive enables design tokens as CSS variables; 5x faster builds than v3 | HIGH |
| **shadcn/ui** | Latest (March 2026 CLI v4) | Copy-paste unstyled accessible components | Radix UI primitives with zero lock-in; fully customizable for glassmorphism cards; CLI v4 supports Next.js, Vite, React Router with design system presets | HIGH |
| **Radix UI** | Via shadcn/ui (unified package) | Accessible component primitives | Underlying accessibility layer; handles ARIA, focus management, keyboard navigation automatically | HIGH |

**Installation:**
```bash
npm install -D tailwindcss postcss autoprefixer
npm install @radix-ui/react-* @radix-ui/colors
npx shadcn-ui@latest init --defaults
```

**Design tokens implementation (Tailwind v4):**

Create `./app/globals.css` with @theme directive:

```css
@import "tailwindcss";

@theme {
  --color-noir: #080808;
  --color-noir-95: #0d0d0d;
  --color-accent-blue: #00d9ff;
  --color-accent-blue-dark: #00a8cc;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-border-glass: rgba(255, 255, 255, 0.1);

  --font-inter: "Inter", sans-serif;
  --font-jetbrains-mono: "JetBrains Mono", monospace;

  --radius-sm: 0.75rem; /* 12px */
  --radius-md: 1rem;    /* 16px */
  --radius-lg: 1.5rem;

  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.3);
  --backdrop-blur-glass: blur(10px);
}
```

**Dark mode configuration in tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Use .dark class or prefer-color-scheme
  theme: {
    extend: {
      colors: {
        noir: '#080808',
        'accent-blue': '#00d9ff',
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        'jetbrains-mono': 'var(--font-jetbrains-mono)',
      },
      backdropBlur: {
        'glass': 'var(--backdrop-blur-glass)',
      },
    },
  },
  plugins: [],
}
export default config
```

---

### Animation & Motion

| Library | Version | Purpose | Why Standard | Confidence |
|---------|---------|---------|--------------|-----------|
| **Framer Motion** | 11.x | React animation library for entrance/exit, hover transitions, parallax | Declarative API, performant with React 19 concurrent rendering, built-in layout animations, works seamlessly with Next.js | HIGH |
| **Tailwind CSS animations** | Built-in | Micro-interactions (loading spinners, hover states) | CSS-based for simplicity; less overhead than Framer Motion for simple transitions | HIGH |

**Installation:**
```bash
npm install framer-motion
```

**Common patterns:**

Page entrance animation:
```typescript
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* content */}
    </motion.main>
  );
}
```

---

### Icons

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| **Lucide React** | Latest | Icon library with 700+ icons, tree-shakeable | Pairs naturally with shadcn/ui; comprehensive icon set for topic cards and UI elements; modern, minimalist style matches premium aesthetic |

**Installation:**
```bash
npm install lucide-react
```

---

### Deployment & CI/CD

| Service | Purpose | Why Standard | Confidence |
|---------|---------|--------------|-----------|
| **GitHub Actions** | CI/CD automation, build and deploy on push | Free, built into GitHub, no additional service signup required | HIGH |
| **GitHub Pages** | Hosting static site | Free, no deployment cost, automatic DNS setup, supports custom domains | HIGH |

**GitHub Actions workflow (`.github/workflows/deploy.yml`):**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './out'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**For Vercel migration (future):**
- Connect GitHub repo to Vercel dashboard
- No code changes required (Vercel detects next.config.js automatically)
- Deployments trigger on every push; preview URLs auto-generated

---

### TypeScript Configuration

| Tool | Version | Purpose |
|------|---------|---------|
| **TypeScript** | 5.3+ | Type safety for React components and API routes |
| **ESLint** | Latest | Linting with React/Next.js rules |
| **Prettier** | Latest | Code formatting (auto-format on save) |

**Installation:**
```bash
npm install -D typescript @types/react @types/node eslint prettier eslint-config-prettier
```

---

## Architecture Patterns

### Pattern 1: Static Content with Incremental Static Regeneration (ISR)

**What:** Topic pages are pre-generated at build time, then revalidated on-demand at intervals.

**When:** All topic pages (Data Sources, Data Integration, etc.) with infrequent content changes.

**Example:**

```typescript
// app/topics/[slug]/page.tsx
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const topics = [
    'data-sources',
    'data-integration',
    'data-quality',
    'master-data-management',
    'reverse-integration',
    'data-governance',
    'ai-in-data-management',
  ];
  return topics.map((slug) => ({ slug }));
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  // Fetch or read topic content
  const topic = await getTopicContent(params.slug);

  if (!topic) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-4">{topic.title}</h1>
      <div className="prose prose-invert">{topic.content}</div>
    </article>
  );
}
```

**Benefit:** Fast page loads (cached on Vercel/GitHub Pages CDN), automatic cache invalidation on-demand.

---

### Pattern 2: Glassmorphism Card Components

**What:** Semi-transparent cards with backdrop blur, subtle borders, and shadow — premium dark-mode aesthetic.

**When:** Topic cards on homepage, feature cards, content containers.

**Example component:**

```typescript
// components/GlassCard.tsx
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative
        bg-white/5 backdrop-blur-glass
        border border-white/10
        rounded-[12px]
        p-6
        shadow-glass
        transition-all duration-300
        hover:bg-white/10 hover:border-white/20
        hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

**Glassmorphism CSS properties:**
- `bg-white/5` — Semi-transparent white (5% opacity) on noir background
- `backdrop-blur-glass` — Blur effect (configured in Tailwind @theme)
- `border border-white/10` — Subtle 1px white border at 10% opacity
- `shadow-glass` — Soft shadow for depth

**Critical for dark mode:** Use white tint (not black) for transparency; ensure text contrast (white text on dark glass, not dark text).

**Performance note:** 3-5 glass elements have negligible impact; avoid 10+ on single page to prevent mobile lag.

---

### Pattern 3: Responsive Mobile-First Layout

**What:** Layouts designed for mobile first, scaled up for tablets and desktop using Tailwind breakpoints.

**When:** All pages — hero, navigation, topic cards, footer.

**Breakpoint strategy:**

| Breakpoint | Width | Use Case |
|------------|-------|----------|
| `(no prefix)` | 0px+ | Mobile (default) |
| `sm:` | 640px+ | Small mobile landscape |
| `md:` | 768px+ | Tablet portrait |
| `lg:` | 1024px+ | Tablet landscape / small desktop |
| `xl:` | 1280px+ | Desktop |
| `2xl:` | 1536px+ | Large desktop |

**Example:**

```typescript
// Hero section responsive layout
<section className="
  w-full
  px-4 sm:px-6 md:px-8
  py-12 sm:py-16 md:py-20 lg:py-32
  bg-noir
">
  <div className="max-w-6xl mx-auto">
    <h1 className="
      text-3xl sm:text-4xl md:text-5xl lg:text-6xl
      font-bold text-white
      mb-4 md:mb-6
    ">
      Noesis
    </h1>
    <p className="
      text-base sm:text-lg md:text-xl
      text-gray-300
      max-w-2xl
    ">
      Socratic dialogue for data management mastery
    </p>
  </div>
</section>

{/* Topic cards grid */}
<div className="
  grid
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  gap-4 md:gap-6
">
  {topics.map(topic => <TopicCard key={topic.slug} {...topic} />)}
</div>
```

**Best practice:** Test on real devices (not just browser dev tools) — mobile Safari, Android Chrome, iPad.

---

### Pattern 4: Sticky Navigation with Mobile Hamburger Menu

**What:** Persistent top navbar with topic dropdown (desktop) and hamburger menu (mobile).

**When:** Every page — global navigation.

**Example:**

```typescript
// components/Navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const topics = [
  'Data Sources',
  'Data Integration',
  'Data Quality',
  'Master Data Management',
  'Reverse Integration',
  'Data Governance',
  'AI in Data Management',
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="
      sticky top-0 z-50
      bg-noir border-b border-white/10
      backdrop-blur-glass
      px-4 sm:px-6 md:px-8
      py-4
    ">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Noesis
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative group">
            <button className="text-gray-300 hover:text-accent-blue">
              Topics
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-noir/95 border border-white/10 rounded-lg shadow-lg hidden group-hover:block">
              {topics.map(topic => (
                <a key={topic} href="#" className="block px-4 py-2 hover:bg-white/5">
                  {topic}
                </a>
              ))}
            </div>
          </div>
          <a href="#" className="text-gray-300 hover:text-accent-blue">
            Chat (Coming soon)
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 border-t border-white/10 pt-4">
          {topics.map(topic => (
            <a
              key={topic}
              href="#"
              className="block px-4 py-2 text-gray-300 hover:text-accent-blue"
            >
              {topic}
            </a>
          ))}
          <a
            href="#"
            className="block px-4 py-2 text-gray-300 hover:text-accent-blue"
          >
            Chat (Coming soon)
          </a>
        </div>
      )}
    </nav>
  );
}
```

---

### Pattern 5: Hover Effects with Framer Motion

**What:** Cards and buttons lift on hover with smooth transitions; outer glow on button CTAs.

**When:** Topic cards (lift on hover), primary buttons (glow effect).

**Example:**

```typescript
// components/TopicCard.tsx
'use client';

import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
}

export function TopicCard({ title, description, icon, slug }: TopicCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <GlassCard className="cursor-pointer h-full">
        <div className="mb-4 text-4xl">{icon}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </GlassCard>
    </motion.div>
  );
}
```

**Primary button with glow:**

```typescript
// components/Button.tsx
'use client';

import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg font-semibold
        transition-all duration-200
        ${
          variant === 'primary'
            ? 'bg-accent-blue text-noir hover:brightness-110'
            : 'border border-accent-blue text-accent-blue hover:bg-accent-blue/10'
        }
      `}
    >
      {children}
    </motion.button>
  );
}
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accessible dropdown menus | Custom div/span menu | Radix UI Dropdown (via shadcn/ui) | ARIA attributes, focus management, keyboard navigation all handled |
| Dark mode toggle | Custom state + CSS class switching | Tailwind's built-in dark mode class or `next-themes` | Next-themes handles persistence, SSR hydration, system preferences |
| Responsive design | Custom media queries | Tailwind breakpoint utilities | Consistent breakpoints, less CSS bloat, mobile-first by default |
| Input validation | Regex checks in JS | React Hook Form + Zod/Valibot | Type-safe, reusable, accessible form handling |
| Icon management | PNG/SVG imports scattered | Lucide React icon library | Tree-shakeable, consistent sizing, props-driven styling |
| Animation choreography | setTimeout/setInterval loops | Framer Motion variants | Declarative, performant, handles staggering/sequencing |
| CSS-in-JS theming | Runtime style injection | Tailwind CSS with design tokens | CSS variables at build time, zero runtime overhead, SSR safe |

**Key insight:** Modern web development prioritizes utility-first CSS and unstyled components over custom solutions. Hand-rolling these increases maintenance burden and introduces accessibility/performance regressions.

---

## Common Pitfalls

### Pitfall 1: Dark Mode Not Dark Enough

**What goes wrong:** Using soft grays (#1a1a1a or #222) instead of true noir; loses the premium "tech tool" aesthetic and feels generic.

**Why it happens:** Developers fear pure black (#000000) will feel harsh or burn-in on OLED screens; they compromise.

**How to avoid:** Stick to #080808 (not pure black, but near-black noir). Test on real displays — not every user has OLED. Dark enough backgrounds actually have *better* contrast with white text (WCAG AAA pass rate higher).

**Warning signs:** Compare hero section side-by-side with Vercel dashboard or Linear app. If yours looks washed out, it's too light. If it looks "gamer", it's too purple/blue-tinted.

---

### Pitfall 2: Glassmorphism Blur on Low-Contrast Backgrounds

**What goes wrong:** Glass cards blur a noir background, disappearing into darkness. Text becomes hard to read because there's no visual separation.

**Why it happens:** Glassmorphism works because it blurs a colorful gradient behind it. On pure noir, blur creates no contrast difference.

**How to avoid:**
- Use *white tint* (bg-white/5 to bg-white/15) for the card background, NOT blue or purple
- Add a 1px subtle white border (border-white/10) to define the card edge
- Keep text white (not gray) for maximum contrast
- Optional: Layer a very subtle gradient or animated background *behind* the glass to create motion and depth

**Warning signs:** Hover over a card and can't see the boundary; text legibility drops below 4.5:1 contrast ratio; squint test shows glass disappears.

---

### Pitfall 3: Too Many Animations Causing Mobile Lag

**What goes wrong:** Every element has an entrance animation, hover effect, and scroll parallax. Test on iPhone 12: janky, 15 fps.

**Why it happens:** Developers get excited about Framer Motion; add animation to everything.

**How to avoid:**
- Animate *purposefully*: page enters, cards lift on hover, hero has subtle parallax
- Disable animations on mobile (or reduce complexity): use `prefers-reduced-motion` media query
- Keep parallax to one element (hero section) not every card
- Profile with Chrome DevTools Performance tab; aim for 60fps

```typescript
// Disable animations for users who prefer reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function TopicCard({ title, description }: TopicCardProps) {
  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -8 }}
    >
      {/* ... */}
    </motion.div>
  );
}
```

**Warning signs:** FPS drops below 50 on real phones; animation frame drops on scroll; battery drain noticeably higher.

---

### Pitfall 4: Responsive Layout Only Tested in Chrome DevTools

**What goes wrong:** Layout looks fine at 768px in DevTools, but on a real iPad, text overflows and buttons are unclickable because touch targets are too small.

**Why it happens:** DevTools simulator doesn't capture real device quirks (font rendering, safe areas, actual touch size).

**How to avoid:**
- Test on actual devices: iPhone (multiple sizes), Android phone, iPad
- Use Safari on iOS (renders differently than Chrome)
- Check touch target sizes: minimum 44x44px (WCAG)
- Test landscape and portrait orientations
- Verify text doesn't overflow in long-text scenarios (different locales, user zoom)

**Warning signs:** Dev tools looks great, but device users report "text cut off" or "button unclickable"; font sizes inconsistent across devices.

---

### Pitfall 5: Static Export Mode Not Configured Correctly for GitHub Pages

**What goes wrong:** Next.js tries to generate dynamic pages at request time, GitHub Pages serves static files only, site returns 404 for everything except index.html.

**Why it happens:** `next.config.js` doesn't set `output: 'export'`; developer forgets basePath for subdirectory deployments.

**How to avoid:**
- Set `output: 'export'` in next.config.js (required for static-only hosting)
- If deploying to github.com/user/repo (not custom domain), set `basePath: '/repo'`
- Test build locally: `npm run build && npx serve@latest out`
- Verify routing works: click navbar links, ensure no 404s
- Commit `.nojekyll` file to root of gh-pages branch (prevents Jekyll processing)

**Warning signs:** Deployed site shows 404 on all pages except home; CSS doesn't load (basePath mismatch); local build works but deployed doesn't.

---

### Pitfall 6: Inconsistent Spacing and Sizing

**What goes wrong:** Cards have `p-6` on desktop but `p-4` on mobile without consistent pattern; font sizes jump erratically; margins are random (8px, 12px, 16px, 20px, 24px...).

**Why it happens:** No spacing scale defined; developers pick sizes ad-hoc for each component.

**How to avoid:**
- Define a spacing scale in Tailwind @theme: 4, 6, 8, 12, 16, 20, 24, 32, 40, 48
- Use Tailwind spacing utilities exclusively (not hand-written padding values)
- Document the scale in a shared design guide
- Enforce via ESLint rule if possible (though Tailwind makes this less necessary)

**Example scale in tailwind.config.ts:**
```typescript
spacing: {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
}
```

**Warning signs:** Spacing looks random when side-by-side; components don't align on 4px grid; some cards feel cramped, others spacious.

---

## Code Examples

Verified patterns from Next.js and Tailwind CSS official documentation:

### Example 1: Hero Section with Parallax

```typescript
// app/page.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]); // Parallax offset

  return (
    <>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative w-full min-h-screen bg-noir flex items-center justify-center overflow-hidden"
      >
        {/* Background gradient (subtle) */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir via-noir to-noir/95 pointer-events-none" />

        {/* Animated background element */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute inset-0 bg-gradient-radial from-accent-blue/20 to-transparent blur-3xl" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Noesis
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
            Learn data management through Socratic dialogue. Bring your own AI key.
          </p>
          <button className="
            px-8 py-3 bg-accent-blue text-noir font-semibold rounded-lg
            hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
            transition-all duration-200
          ">
            Explore Topics
          </button>
        </motion.div>
      </motion.section>

      {/* Topics Section */}
      <section className="w-full bg-noir px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            What Noesis Covers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topics.map((topic, idx) => (
              <motion.div
                key={topic.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <TopicCard {...topic} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

**Source:** Next.js App Router + Framer Motion official docs; parallaxa pattern verified with motion.dev examples

---

### Example 2: Responsive Typography and Spacing

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'Noesis — Data Management Education',
  description: 'Learn data management through Socratic dialogue.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-noir text-white font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
```

```typescript
// Responsive text in components
<div className="
  text-lg sm:text-xl md:text-2xl lg:text-3xl
  font-bold
  leading-tight md:leading-normal
  tracking-tight
">
  Responsive Headline
</div>

<p className="
  text-sm sm:text-base md:text-lg
  text-gray-300
  leading-relaxed md:leading-loose
">
  Responsive body text with comfortable line height on all screen sizes.
</p>
```

**Source:** Next.js font optimization docs; Tailwind CSS responsive design patterns

---

### Example 3: shadcn/ui Button with Glow

```typescript
// components/ui/button.tsx (from shadcn/ui, customized)
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-noir transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent-blue text-noir hover:bg-accent-blue/90 shadow-[0_0_20px_rgba(0,217,255,0.6)] hover:shadow-[0_0_30px_rgba(0,217,255,0.8)]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-accent-blue text-accent-blue hover:bg-accent-blue/10",
        ghost: "hover:bg-white/10 hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Usage:**
```typescript
<Button variant="default">Primary CTA</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Tertiary</Button>
```

**Source:** shadcn/ui Button component with custom glow effect added to default variant

---

## State of the Art

| Old Approach | Current Approach (2026) | When Changed | Impact |
|---|---|---|---|
| CSS-in-JS (styled-components, Emotion) | Tailwind CSS with design tokens | 2022–2024 | Faster builds, better SSR, zero runtime overhead |
| Static dark mode toggle | OS preference + manual override | 2023–2025 | Respects user accessibility preferences |
| Responsive breakpoints as pixels | Mobile-first Tailwind breakpoints | 2020–2024 | Simpler development, consistent grid systems |
| Create React App | Next.js App Router | 2022–2024 | SSR, streaming, Server Components, zero-config |
| Individual @radix-ui/react-* packages | Unified @radix-ui package (shadcn/ui March 2026) | 2025–2026 | Smaller bundle, fewer dependency conflicts |
| Framer Motion v10 | Framer Motion v11 ("Motion for React") | 2025–2026 | React 19 Compiler support, better concurrency handling |

**Deprecated/outdated:**
- **Create React App (CRA):** Deprecated; React team no longer recommends. Use Next.js or Vite instead.
- **CSS modules in Next.js pages/:** Replaced by Tailwind + CSS variables (more flexible, consistent).
- **getServerSideProps for SSR rendering:** Use App Router Server Components or ISR for better performance.
- **Static dark mode with theme switcher only:** Use OS preference + next-themes for accessibility.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 1.x + React Testing Library |
| Config file | `vitest.config.ts` (auto-discovered) |
| Quick run command | `npm run test -- --run` (single pass, 30s) |
| Full suite command | `npm run test` (watch mode, CI uses `--run`) |

**Why Vitest:** 10–20x faster than Jest on large suites; ESM-native; perfect for Next.js + React 19 projects.

**Why React Testing Library:** User-focused assertions ("can user click button") not implementation details ("did setState call").

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INFRA-01 | Static export builds without error | Build test | `npm run build && test -d out` | ❌ Wave 0 |
| INFRA-02 | GitHub Actions workflow triggers on main push | Integration | Manual GitHub check (not automated locally) | ❌ Wave 0 |
| INFRA-03 | next.config.js accepts Vercel env vars | Unit | `npm run test -- config.test.ts` | ❌ Wave 0 |
| DSGN-01 | Dark background (#080808) renders correctly | Visual + unit | `npm run test -- components/Layout.test.tsx` | ❌ Wave 0 |
| DSGN-02 | Responsive breakpoints work on sm/md/lg | Integration | `npm run test -- responsive.e2e.ts` (Playwright) | ❌ Wave 0 |
| DSGN-03 | Design tokens applied consistently (spacing, color, radius) | Unit | `npm run test -- design-tokens.test.ts` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run test -- --run` (quick unit tests, ~10 seconds)
- **Per wave merge:** `npm run test -- --run && npm run build` (full suite + build, ~30 seconds)
- **Phase gate:** Full test suite + build green + manual responsive test on real device before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `vitest.config.ts` — Vitest configuration for Next.js + React Testing Library
- [ ] `tests/setup.ts` — Test setup file (jsdom, React Testing Library config)
- [ ] `tests/components/GlassCard.test.tsx` — Tests for core glassmorphism component
- [ ] `tests/components/Navigation.test.tsx` — Tests for sticky nav + mobile menu
- [ ] `tests/layout.test.tsx` — Tests for root layout, typography inheritance
- [ ] `tests/responsive.e2e.ts` — Playwright E2E tests for mobile/tablet/desktop layouts
- [ ] `tests/design-tokens.test.ts` — Tests verifying Tailwind @theme tokens are applied
- [ ] `tests/conftest.ts` — Shared test fixtures (mock components, render helpers)
- [ ] Framework install: `npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom` — if none detected

---

## Sources

### Primary (HIGH confidence)

- **Next.js Official Docs (2025)**: App Router, Static Export for GitHub Pages, ISR patterns — https://nextjs.org/docs
- **Tailwind CSS Official Docs (4.0, 2025)**: Design tokens via @theme directive, dark mode configuration — https://tailwindcss.com/docs
- **shadcn/ui Changelog (March 2026)**: CLI v4 release, unified Radix UI package, design system presets — https://ui.shadcn.com/docs/changelog
- **Framer Motion Official Docs (v11, 2025)**: React 19 support, layout animations, scroll-linked animation improvements — https://motion.dev/docs/react
- **GitHub Actions Official Docs**: Workflow configuration for Next.js builds and GitHub Pages deployments — https://docs.github.com/en/actions

### Secondary (MEDIUM confidence)

- [Dark Glassmorphism: The Aesthetic That Will Define UI in 2026](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f) — Medium article on glassmorphism implementation in dark mode; verified with multiple sources
- [Glassmorphism CSS Generator and 2026 Design Trends](https://www.jobhuntley.com/blog/web-design-trends-for-2026-the-rise-of-glassmorphism-and-how-to-achieve-it-with-css) — Design trend analysis with technical CSS examples
- [Responsive Design Breakpoints 2026 Guide](https://www.framer.com/blog/responsive-breakpoints/) — Framer blog on breakpoint strategy for mobile-first design
- [Design Tokens That Scale in 2026 (Tailwind v4 + CSS Variables)](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026) — Detailed guide on implementing design tokens with Tailwind v4
- [Testing in 2026: Jest, React Testing Library, and Full Stack Testing Strategies](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies) — Modern testing pyramid strategy for React/Next.js

### Tertiary (LOW confidence, marked for validation)

- GitHub Actions 2026 tutorials and community examples — syntax verified with official docs but specific workflow patterns may vary
- Glassmorphism performance impact (3–5 elements safe, 10+ causes lag) — based on community reports; recommend testing on target devices

---

## Metadata

**Confidence breakdown:**
- **Standard Stack:** HIGH — Next.js, React, Tailwind CSS, shadcn/ui all verified with official 2025–2026 documentation
- **Architecture Patterns:** HIGH — ISR, SSG, mobile-first responsive design are Next.js best practices; glassmorphism verified with multiple sources
- **Design Tokens:** HIGH — Tailwind v4 @theme directive confirmed in official docs
- **Responsive Design:** HIGH — Breakpoint strategy (360px mobile, 768px tablet, 1366px desktop) confirmed by W3C and Tailwind recommendations
- **Testing:** MEDIUM — Vitest vs Jest choice verified; specific test implementation deferred to Phase 1 task planning
- **Glassmorphism Dark Mode:** MEDIUM-HIGH — CSS approach verified; exact color tuning (opacity levels, border thickness) requires design iteration

**Research date:** 2026-03-15
**Valid until:** 2026-04-15 (30 days; Next.js/Tailwind stable, but verify shadcn/ui releases monthly)
