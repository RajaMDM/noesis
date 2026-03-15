# Data Management Education Portal

## What This Is

An interactive, visually immersive educational portal that teaches data management — covering Data Sources, Data Integration, Data Quality, Master Data Management, Reverse Integration, Data Governance, and AI's evolving role across all of these. Built for a mixed audience (practitioners, career switchers, business stakeholders), the portal combines community-curated content, rich visual aids, AI chatbots with Bring Your Own Key (BYOK), and a distinctive Socratic Dialogue mode where the AI never gives answers — only questions — guiding learners to insight on their own.

## Core Value

A learner exploring any data management topic should leave with genuine understanding — not just information — through guided discovery, rich visuals, and AI that teaches rather than tells.

## Requirements

### Validated

(None yet — ship to validate)

### Active

**Content & Topics**
- [ ] 7 topic areas fully covered: Data Sources, Data Integration, Data Quality, Master Data Management, Reverse Integration, Data Governance, AI in Data Management
- [ ] Each topic includes curated explanations, real-world context, and how AI applies to it
- [ ] Hybrid learning path: recommended progression with free-exploration override

**Visual Learning**
- [ ] Rich visual aids per topic: diagrams, architecture flows, images, embedded videos
- [ ] Interactive elements (not just static content) — animated diagrams, visual walkthroughs
- [ ] Community content contribution and moderation system

**AI Features**
- [ ] BYOK chatbot — users supply their own API key (OpenAI, Anthropic, Google, etc.)
- [ ] Keys stay client-side — platform never handles user API keys on the server
- [ ] Socratic Dialogue mode — AI withholds answers, guides exclusively through questions until learner reaches insight
- [ ] Standard Q&A chat mode available alongside Socratic mode
- [ ] Clear UI separation between Standard Chat and Socratic Dialogue

**Design**
- [ ] Rich & immersive aesthetic — dark mode, gradients, motion/animation, premium feel
- [ ] Responsive across desktop and mobile
- [ ] Modern component library with consistent design language

**Hosting & Infrastructure**
- [ ] Deployed on Vercel (free tier for launch)
- [ ] Architecture supports migration to custom domain + scalable hosting (AWS/GCP/Vercel Pro)
- [ ] CI/CD via git → Vercel automatic deploys

### Out of Scope

- Formal certifications or assessments — not defined, defer to v2
- Mobile native app — web-first for now
- Business model / monetization — decided after platform proves value
- Platform-generated content (AI writes the curriculum) — community + curation model only
- Real-time collaboration or live sessions — static async learning first

## Context

- **Existing tooling in this repo**: YouTube research pipeline (`scripts/yt_research.py`) and NotebookLM pipeline (`scripts/notebooklm_pipeline.py`) — useful for sourcing and researching content for the portal, but not part of the portal product itself
- **Origin**: Prompted by professional frustration — people in the data field consistently lack foundational understanding of these concepts, and no single resource ties it all together well
- **Ambition**: Become the industry-reference destination for data management education — the resource practitioners point colleagues to
- **Content model**: Community-contributed and curated by maintainers; no paid content team at launch

## Constraints

- **Hosting cost**: Vercel free tier at launch — avoid recurring backend infrastructure spend until there's traction
- **AI inference cost**: BYOK model means zero AI API costs on the platform side; users pay for their own usage
- **Tech stack**: Modern JS framework (Next.js strongly implied by Vercel deployment target); exact choices finalized during research
- **Content team**: No dedicated writers — relies on community contribution + maintainer curation

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| BYOK for all AI features | Privacy (keys never touch our servers) + zero inference cost + provider flexibility | — Pending |
| Vercel for hosting | Free tier, native Next.js support, git-based CI/CD | — Pending |
| Socratic Dialogue as distinct mode | Fundamentally different from Q&A — teaches through questioning, not answers | — Pending |
| Community + curation content model | Scales without a content team; community grows the library over time | — Pending |
| Dark/immersive design direction | Signals quality and seriousness; differentiates from generic edu platforms | — Pending |

---
*Last updated: 2026-03-15 after initialization*
