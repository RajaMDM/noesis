# noesis

[![Status](https://img.shields.io/badge/Status-Ideated%20%26%20Scaffolded-F59E0B?style=for-the-badge)]()
[![Active work](https://img.shields.io/badge/Active%20work-The%20MDM%20Lab-0EA5E9?style=for-the-badge)](https://data-alchemist.raja-cloudmdm.workers.dev)
[![Stack](https://img.shields.io/badge/Stack-Next.js%20%2B%20TypeScript-3178C6?style=for-the-badge)]()

> The intended next-generation successor to **The MDM Lab** — same domain, very different posture: BYOK API keys, Socratic-only AI mode, immersive UI. Fully spec'd, scaffolded, currently paused while the live MDM Lab keeps shipping.

---

## What Noesis is meant to be

An interactive, visually immersive education portal that teaches data management — covering Data Sources, Data Integration, Data Quality, MDM, Reverse Integration, Data Governance, and AI's evolving role across all of these. Built for a mixed audience (practitioners, career switchers, business stakeholders).

The differentiators that make it *not* a clone of The MDM Lab:

- **BYOK (Bring Your Own Key)** — users supply their own OpenAI / Anthropic / Google API key. Keys stay client-side. The platform never handles user keys on the server. This unlocks audiences (enterprise users, regulated environments) who can't or won't share data with a third-party AI proxy.
- **Socratic Dialogue mode** — the AI is constrained to *only* ask questions. No answers, no summaries — just questions tuned to the learner's last response, until the learner reaches insight on their own. A standard Q&A mode is available alongside, with a hard UI separation between the two.
- **Hybrid path** — recommended progression with a free-exploration override.
- **Community content** — contribution and moderation system for curated explanations.
- **Immersive aesthetic** — dark mode, gradients, motion, premium feel.

## Status today

- **Specification complete** — `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md` all written under the GSD planning method.
- **Scaffold in place** — Next.js 14 + TypeScript + Tailwind + Playwright + Vitest. `create-next-app` baseline plus the planning docs.
- **Build paused.** No active commits. No deployment.

## Why it's paused

Active product work is concentrated on **[The MDM Lab](https://data-alchemist.raja-cloudmdm.workers.dev)** — the existing live platform that already serves the same audience. Noesis is the longer arc: the rebuild that takes the lessons from MDM Lab and addresses what it can't (BYOK, Socratic) without bolting features onto a single-file SPA.

## What would unpause this

Two triggers, either one is sufficient:

1. **MDM Lab plateaus** — once the current platform stops needing weekly fixes and reaches a steady state, attention shifts here.
2. **A specific BYOK enterprise ask** — if a real user shows up wanting the "no shared AI proxy" version, this gets prioritised.

Until then: ideated and parked, on purpose.

## Active work happens at

- **The MDM Lab** — [data-alchemist.raja-cloudmdm.workers.dev](https://data-alchemist.raja-cloudmdm.workers.dev) — the live product Noesis intends to succeed.

---

<sub>© Raja Shahnawaz Soni · Personal use license · See profile at [github.com/RajaMDM](https://github.com/RajaMDM)</sub>
