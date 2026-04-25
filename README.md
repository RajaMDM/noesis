# noesis

[![Status](https://img.shields.io/badge/Status-Ideated%20%26%20Scaffolded-F59E0B?style=for-the-badge)]()
[![Active work](https://img.shields.io/badge/Active%20work-The%20MDM%20Lab-0EA5E9?style=for-the-badge)](https://data-alchemist.raja-cloudmdm.workers.dev)
[![Stack](https://img.shields.io/badge/Stack-Next.js%20%2B%20TypeScript-3178C6?style=for-the-badge)]()

> A planned alternative to **The MDM Lab** with two main differences: BYOK API keys (users supply their own) and a Socratic mode where the AI only asks questions. Spec'd and scaffolded; currently paused.

---

## What Noesis is meant to be

An education portal for data management — covering Data Sources, Data Integration, Data Quality, MDM, Reverse Integration, Data Governance, and how AI applies to each. Audience: practitioners, career switchers, business stakeholders.

The two differences that make it not a clone of The MDM Lab:

- **BYOK (Bring Your Own Key)** — users supply their own OpenAI / Anthropic / Google API key. Keys stay client-side; the platform never sees them. Aimed at enterprise / regulated environments that can't route data through a third-party AI proxy.
- **Socratic mode** — the AI is constrained to only ask questions. No answers, no summaries — just follow-up questions tuned to the learner's last response. A standard Q&A mode is available alongside.

Other planned features: hybrid learning path (recommended progression with free-exploration override), community contribution + moderation for curated explanations.

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
