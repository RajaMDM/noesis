# Domain Pitfalls: Interactive Educational Portal with AI Features

**Domain:** Interactive educational platform with AI chatbot features (BYOK, Socratic dialogue)
**Researched:** 2026-03-15
**Confidence:** MEDIUM (combines training knowledge with educational platform patterns; BYOK and Socratic dialogue are emerging patterns with limited public post-mortems)

---

## Critical Pitfalls

### Pitfall 1: BYOK API Keys Logged or Exposed in Error Messages

**What goes wrong:** User supplies OpenAI/Anthropic/Google API key to frontend. During development or error handling, the key appears in:
- Console logs (dev tools, browser console visible to user)
- Network request bodies visible in DevTools Network tab
- Error stack traces sent to Sentry/monitoring services
- Client-side error boundaries displaying full exception details
- Temporary storage (localStorage, sessionStorage) with insufficient cleanup

The key is then compromised. User's billing account gets drained by unauthorized API calls within hours.

**Why it happens:**
- Frontend developers not trained on key handling patterns
- Assumption that browser environment is "private" (it's not — user has full control)
- Copy-paste of standard API integration code without adjusting for BYOK model
- Error logging that includes request/response bodies by default
- Keys stored in memory/state without encryption, persisted to disk without cleanup

**Consequences:**
- Direct financial loss to user (API billing)
- User trust destruction
- Legal liability (platform knew about key handling but didn't prevent exposure)
- Platform gains reputation for being unsafe with credentials

**Prevention:**
1. **Strict key isolation:**
   - Keys NEVER logged, even in error handlers
   - Keys NEVER included in network request headers that could be intercepted
   - Keys NEVER persisted to localStorage/sessionStorage — only hold in memory
   - Keys cleared from memory immediately after API call completes

2. **Network architecture:**
   - If key must be used on frontend (BYOK model), use dedicated secure context
   - Consider: keys stored in Web Workers (isolated execution context) instead of main thread
   - Disable DevTools when user has active key? (Extreme, but consider)

3. **Error handling:**
   - Sanitize error messages: never include request/response bodies
   - Custom error boundary that strips sensitive data before display
   - No automatic error reporting to 3rd-party service (or strip keys before sending)

4. **User education:**
   - Clear warning: "Your API key is sensitive. Never share it. Never paste it in chat history."
   - Show key only once during setup, don't display in settings UI after
   - Provide easy "rotate key" workflow to invalidate old key if suspicious

**Detection (warning signs):**
- User reports unexpected API billing
- Network tab shows API keys in request headers
- Error logs contain credential strings
- User can access and copy key value from multiple UI locations

**Which phase:** **Phase 2 (Core AI Features)** — must be implemented before any BYOK feature ships. Testing should include key exposure scenarios.

---

### Pitfall 2: Socratic Dialogue Mode Collapses into Standard Q&A

**What goes wrong:** AI is asked to use Socratic method (never give answers, only questions). But:
- User frustration mounts: they ask a direct question, AI responds with 5 counter-questions instead of help
- Dialogue becomes performative and annoying rather than educational
- AI struggles to know *when* to pivot from questioning to explaining (context window exhaustion)
- After 10+ back-and-forths, AI has forgotten the learner's original problem (context loss)
- Users abandon Socratic mode and switch to standard chat
- Or: AI gives up on Socratic and answers directly (prompt degradation)

**Why it happens:**
- Socratic method is genuinely hard to sustain consistently
- LLM prompt saying "ask questions not answers" is weak guardrail
- No clear exit condition: when does Socratic dialogue end and teaching begin?
- Context window limits (4K, 8K token windows) mean AI forgets the thread after 5-10 turns
- Temptation to shortcut: "user is frustrated, just answer already"
- Prompt drift: instruction to ask questions gets overridden by user's emotional pressure

**Consequences:**
- Feature becomes useless/annoying; users don't use it
- Reputational damage: "this AI doesn't actually teach, it just asks annoying questions"
- Hours spent engineering prompt only to have users ignore the mode
- False belief that "Socratic dialogue doesn't work for online learning"

**Prevention:**
1. **Explicit dialogue structure:**
   - Socratic mode has phases: (1) Clarification, (2) Exploration, (3) Synthesis, (4) Conclusion
   - AI explicitly states which phase it's in: "Let me clarify what I hear..."
   - After 3-4 user responses, AI offers summary: "You've discovered that X because Y. Agree?"

2. **Hybrid approach:**
   - Socratic asks 1-2 guiding questions per turn, not 5
   - Include one factual statement per response (scaffolding)
   - Example: "I notice you said X. Good observation. What do you think happens if you change Y?"

3. **Session design:**
   - Socratic mode paired with "learning objective" (user sets at start)
   - AI references objective frequently: "Your goal was to understand X. Are we there?"
   - Hard exit: after 8-10 turns, offer switch to explanation mode or context reset

4. **Fallback architecture:**
   - Two parallel model calls: (1) Socratic response, (2) Direct answer
   - Present both to user: "Socratic hint:" vs. "Detailed explanation:" tabs
   - Let user choose which helps more

5. **Prompt engineering (lower confidence):**
   - Avoid vague "use Socratic method" — use concrete examples in system prompt
   - Teach AI to recognize when learner is stuck (repeated questions on same point)
   - Include escalation rule: "If user seems lost after 2 attempts, shift to explanation"

**Detection (warning signs):**
- User switches from Socratic → Standard chat within first 2-3 minutes
- Support emails: "Socratic mode is frustrating"
- Analytics show Socratic mode abandoned after <5 turns per session
- AI responses become generic questions unrelated to user's topic

**Which phase:** **Phase 3 (Socratic Dialogue)**. Requires user testing and iteration. May need A/B test against standard chat to validate value.

---

### Pitfall 3: Content Architecture Too Rigid / Hard to Update

**What goes wrong:** Content is hardcoded in:
- React component files (`pages/topics/data-sources.tsx`)
- Large JSON bundles shipped with app
- Image/video URLs scattered across components
- Topic structure baked into component hierarchy

Then:
- A typo in content requires code deploy
- Updating a diagram requires rebuilding entire app
- Adding a new sub-topic requires code changes + tests + PR review
- Content structure can't evolve without refactoring code
- Search breaks when content changes (indices out of sync)

**Why it happens:**
- "We'll hardcode the MVP, refactor later" — later never comes
- Assumption: content is stable. Reality: education content evolves constantly.
- No CMS in place; unclear where content should live
- Component-driven thinking: "Each topic is a component" ≠ content separation

**Consequences:**
- Community contribution becomes friction: users can't edit content directly
- Content gets stale; typos linger for months
- Curation is painful; maintainers avoid updates
- Search/indexing breaks; users can't find content
- Rewrite required to extract content into CMS (Phase 4+)

**Prevention:**
1. **Content structure from day one:**
   - Separate content files (Markdown or JSON) from React components
   - One file per topic area: `content/topics/data-sources.md`
   - Schema: title, description, key-concepts, subtopics, related-topics, visual-assets

2. **Asset management:**
   - Diagrams/images in dedicated folder: `public/assets/diagrams/`
   - Reference by filename, not inline in code
   - Use image alt-text and captions (accessibility + searchability)

3. **CMS-ready architecture:**
   - Don't build a full CMS yet, but design for one
   - Content loader function: `loadTopic(topic-id)` that could read from file, DB, or API
   - This is 1-2 days of architectural work that saves weeks later

4. **Search indexing:**
   - Build search index during build time (static generation)
   - Include title, description, key-concepts, all text content
   - Rebuild index on every content change (part of deploy pipeline)

5. **Structured metadata:**
   - Each topic has JSON metadata: author, last-updated, version, topic-area
   - Metadata queryable for filters/facets
   - Makes it possible to add "recently updated" or "by topic area" features

**Detection (warning signs):**
- First content update takes >2 hours (should be <30 min)
- Content typos stay in production for >1 week
- Search returns stale results
- Adding a new topic requires modifying 5+ files

**Which phase:** **Phase 1 (Content Architecture)**. Set up content structure before Phase 2 (AI Features). This is foundational.

---

### Pitfall 4: Community Moderation Becomes Overwhelmed / Content Quality Collapses

**What goes wrong:** Community can contribute content. Platform grows. Then:
- Spam contributions (ads, off-topic junk) flood the queue
- Low-quality explanations (confusing, inaccurate) get upvoted by spam accounts
- Moderation queue grows 10x faster than maintainers can review
- Contributors post without reading guidelines; 80% need revision
- Toxic comments in discussion threads; no flagging system
- Maintainer burnout: "community contribution is more work than writing it ourselves"

**Why it happens:**
- Contribution system launched without moderation tools/process
- No clear content guidelines (what makes a good explanation?)
- No friction in submission (spam accounts can post instantly)
- Moderation queue visible to public (reputation signal attracts spam)
- No AI-assisted flagging (manual review of every submission)

**Consequences:**
- Content quality plummets; platform loses credibility
- Users see platform as spam/low-quality
- Maintainers disable community contributions (ironic, given that was the model)
- Rewrite of moderation system; months of architectural work

**Prevention:**
1. **Contribution guidelines (clear & enforced):**
   - Document: what is a good explanation? Examples + counter-examples
   - Submission form includes checklist: "I have cited sources" / "This is original"
   - Automated checks: reject if <100 characters, no sources, or flagged words

2. **Staged approval process:**
   - All contributions start as "draft" (not public)
   - Maintainer review required before publication
   - Contributor gets feedback: approved, needs revision, rejected
   - Revision history visible (transparency)

3. **Reputation/trust system:**
   - New contributors have lower visibility (contributions require 1+ approval before ranking)
   - Trusted contributors (vetted) get faster approval
   - Post-publication: downvoting/flagging available (signals bad content)

4. **AI-assisted moderation:**
   - LLM review before human moderation: "Does this violate guidelines? Confidence?"
   - Flag spam, off-topic, or unsourced claims for human review
   - Reduces moderation queue by 70%

5. **Lightweight discussion without moderation burden:**
   - Comments: allow, but hide until parent-approval (reduces spam)
   - No real-time chat/forum (moderation nightmare)
   - Fixed-question mode: "What's the biggest gotcha with this concept?" (keeps discussion on-topic)

**Detection (warning signs):**
- Contribution submission queue grows >20 items
- 50%+ of submissions need revision/rejection
- Spam comments with links/ads appear
- Maintainer has spent >5 hours/week on moderation (unsustainable)

**Which phase:** **Phase 4 (Community Features)**. Don't launch community contributions in Phase 1; get core content stable first. This prevents moderation chaos from the start.

---

### Pitfall 5: Streaming / Real-Time API Calls Timeout or Degrade Gracefully Nowhere

**What goes wrong:** User asks AI a complex question. App calls OpenAI/Anthropic API with streaming response. Then:
- Network hiccup midway through response: partial text displayed, no error message
- Stream timeout (API slow) after 30s: response cuts off, no indication of error
- User leaves page during stream: API still charged, response lost
- Multiple concurrent streams exceed rate limit: some requests 429 error silently
- Streaming interrupted by network switch (WiFi → cellular): response truncated
- No way to retry: user must retype question

**Why it happens:**
- Streaming is implemented without error boundaries
- No timeout handling (what's the max wait time?)
- "Fire and forget" pattern (call API, don't manage lifecycle)
- Rate limits not surfaced to user (they just see slow responses)
- No mechanism to resume interrupted streams

**Consequences:**
- Users see broken, incomplete responses
- Trust in AI erodes ("it's buggy")
- Repeated questions because retry is manual
- BYOK users have no idea why their API call failed (error buried in console)

**Prevention:**
1. **Streaming lifecycle management:**
   - Abort signal: cancel stream if user navigates away
   - Timeout: if no data for 60s, close stream and show error
   - Error boundary: catch stream failures, display user-friendly message

2. **Error messaging:**
   - "Stream interrupted. Partial response: [text so far]"
   - "API timeout (60s). Try again or rephrase your question."
   - "Rate limited. Please wait X seconds before next question."
   - For BYOK: "Your API key may have hit rate limit. Check your OpenAI dashboard."

3. **Rate limit awareness:**
   - Client-side tracking: count requests in last 60s
   - Warn user before hitting limit: "X requests in last minute. Slow down?"
   - Graceful degrade: queue requests, retry with backoff

4. **Network resilience:**
   - Don't rely on persistent connection; mobile networks change
   - Option to "save partial response as draft" and continue later
   - Retry button with exponential backoff (don't spam the API)

5. **User control:**
   - "Cancel streaming" button (explicit, not hidden)
   - Show which API the request is going to (for BYOK transparency)
   - Display streaming progress/tokens if possible ("Thinking... 150 tokens so far")

**Detection (warning signs):**
- User reports incomplete AI responses
- Network tab shows requests with no response body
- Error logs full of streaming timeouts
- Users say "the AI stopped mid-sentence"

**Which phase:** **Phase 2 (Core AI Features)**. Streaming is critical path; must handle error cases before shipping.

---

### Pitfall 6: BYOK Rate Limits / Account Lockout Not Communicated

**What goes wrong:** User supplies their API key and starts using the portal. They don't realize:
- Their OpenAI account has a rate limit (e.g., 3 requests/minute on free tier)
- Socratic dialogue mode makes 2-3 API calls per turn (hidden multiplier)
- After 10 turns of dialogue, they've hit their limit for the day
- Requests start failing with "Rate limit exceeded"
- User has no context: they think the platform is broken
- Or: user's API key belongs to a shared org account; other team members are using it simultaneously; chaos ensues

**Why it happens:**
- Platform doesn't track user's rate limit tier (it's external)
- No indication that a single question might consume multiple API calls
- Socratic mode is opaque about API usage (does it call the API once or twice per turn?)
- No rate limit caching (could reuse previous responses)

**Consequences:**
- User frustration: "Your platform is broken"
- User abandons platform
- Trust in "AI features" erodes

**Prevention:**
1. **Rate limit transparency:**
   - At setup: "What's your rate limit? (Free tier: 3 req/min, but verify in your OpenAI settings)"
   - After each request: show remaining quota if possible
   - Warning: "You're approaching your rate limit. Slow down?"

2. **API call accounting:**
   - Socratic mode: clearly label "This may make 2-3 API calls"
   - Simple question: "This will make 1 API call"
   - Regenerate/retry: "Your previous response used 1 call. Regenerate will use another."

3. **Caching & deduplication:**
   - Cache responses (Redis on backend? Or client-side?)
   - Socratic mode: cache intermediate responses to avoid re-querying
   - Reduce API call count wherever possible

4. **Graceful degradation:**
   - If rate limit hit: queue questions, retry after delay
   - Show: "Rate limited. Your next request available in 45 seconds."
   - Offer switch to "offline mode" (answer from cached context/docs)

5. **Key validation:**
   - At setup, test key with a small API call (verify it works)
   - Display: "Key verified. OpenAI account: [email]"
   - Warn if key is from shared/org account: "This key appears to be shared. Rate limits may be affected by others' usage."

**Detection (warning signs):**
- User reports "requests stopped working suddenly"
- Error message: "Rate limit exceeded" with no context
- Analytics: high bounce rate after 5-10 API calls

**Which phase:** **Phase 2 (Core AI Features)**. Test rate limit scenarios in QA.

---

### Pitfall 7: Heavy Visual/Animation Content Kills Mobile Performance

**What goes wrong:** Portal has rich animations, embedded videos, and animated diagrams on every page. Development works great on MacBook Pro. Then:
- Mobile users (especially Android) see janky, stuttering animations
- Page load on 3G network takes 20+ seconds (user leaves)
- Mobile battery drains 10% per minute (heavy video playback + animations)
- Scroll performance terrible on low-end phones (dropped frames)
- Videos autoplay = massive data usage (users on metered connections hate this)

**Why it happens:**
- "Mobile first" design, but no mobile testing (only iPhone 15 Pro tested)
- Rich animations implemented without performance profiling
- Videos embedded as `<video autoplay>` without lazy-loading
- SVG animations run on main thread (blocks user interactions)
- No throttling profile testing (what does this look like on 4G? 3G?)

**Consequences:**
- Mobile = 50% of traffic, but unusable
- Users on older Android devices abandon platform
- Battery drain complaints (not directly platform's fault, but reflects poorly)
- SEO hurt by Core Web Vitals (mobile performance)

**Prevention:**
1. **Performance budgets:**
   - Each topic page: <3s first contentful paint on 4G
   - Total JS bundle: <300KB (gzipped)
   - Videos: lazy-load, no autoplay without user action

2. **Animation constraints:**
   - SVG animations: use CSS transforms (GPU accelerated) not DOM changes
   - Limit concurrent animations (max 2-3 per page)
   - Disable animations on `prefers-reduced-motion` (accessibility + performance)

3. **Video strategy:**
   - No autoplay videos; load on-click
   - Provide image placeholder (don't load video until user interaction)
   - Consider: YouTube embed (optimized CDN) over self-hosted video
   - Offer transcript + summary (not everyone watches videos)

4. **Device testing:**
   - Test on real Android devices (not just iPhone/Chrome DevTools)
   - Use Lighthouse throttling (4G, 3G profiles)
   - Monitor Core Web Vitals (LCP, FID, CLS) on production

5. **Content optimization:**
   - Images: use modern formats (WebP) with fallback
   - Diagrams: SVG preferred over raster images
   - Responsive images: different sizes for mobile/desktop

**Detection (warning signs):**
- Lighthouse score <75 on mobile
- Android devices report janky scrolling/animations
- Video pages take >5s to load on 4G
- Mobile users have much shorter session times than desktop

**Which phase:** **Phase 1 (MVP Content)** with heavy testing in **Phase 2 (Visual Design)**. Make performance non-negotiable from the start.

---

### Pitfall 8: Vercel Deployment Secrets Exposure / Cold Start Delays

**What goes wrong:** Deploying Next.js to Vercel with AI features:
- Environment variables (API keys, database URLs) accidentally committed to git
- Vercel env vars exposed via preview deployments (PR deploys)
- Preview URLs are public and indexed by search engines (content leakage)
- Cold starts add 3-5s latency (Vercel free tier serverless)
- Streaming responses timeout on slow Vercel infra
- No image optimization: images bypass Vercel's CDN

**Why it happens:**
- Developers commit `.env` or `.env.local`
- Vercel preview deployments expose all environment (no separate secret management)
- Not using Vercel's built-in image optimization (`next/image`)
- Testing against free tier without understanding cold start impact

**Consequences:**
- API keys leaked (similar to BYOK pitfall, but different vector)
- Public data indexed on Google (content accessible without permission)
- Users see slow performance on first request
- Image optimization issues compound performance problems

**Prevention:**
1. **Secrets management:**
   - `.env.local` and `.env.*` in `.gitignore` (enforced via pre-commit hook)
   - All secrets in Vercel dashboard (Settings → Environment Variables)
   - NO secrets in code, even as examples
   - Rotate secrets regularly (quarterly)

2. **Preview deployments:**
   - Disable public preview URLs for PRs (use Vercel's private deployments)
   - Or: protect preview URLs with basic auth if needed for testing
   - Don't let preview deployments access production database (use test DB)

3. **Performance optimization:**
   - Image optimization: use `next/image` component (automatic CDN)
   - Caching strategy: static generation for content, ISR (incremental static regeneration) for user-generated content
   - API routes: cache responses where possible

4. **Cold start mitigation:**
   - Monitor cold start times in production (Vercel analytics)
   - If >2s cold start, consider keeping function "warm" (scheduler pings)
   - Or migrate to Vercel Pro (guaranteed cold start performance)

5. **Monitoring:**
   - Set up alerts: deployment failures, secret exposure attempts
   - Monitor Vercel analytics for performance regressions
   - Test streaming on Vercel free tier (know limits before shipping)

**Detection (warning signs):**
- Secrets found in git history
- Preview URLs indexed on Google
- First request after idle takes 5+ seconds
- Images load slowly (Vercel CDN bypass)

**Which phase:** **Phase 1 (Infrastructure)** — set up secret management before any development. This is a prerequisite, not a later refinement.

---

## Moderate Pitfalls

### Pitfall 9: Content Search Doesn't Work / Users Can't Find Anything

**What goes wrong:** Portal has 100+ topics, articles, and concepts. User wants to find "Master Data Management best practices." Search returns:
- Nothing (index is broken)
- Unrelated results ("Master" matches "master key" in unrelated article)
- Results ranked by recency, not relevance (newest content first, even if wrong)
- Search is slow (>2s latency, feels unresponsive)

**Why it happens:**
- Search index not built/maintained
- Full-text search not implemented (just string matching)
- No ranking algorithm (all results weighted equally)
- Search runs on slow backend (queries not cached)

**Prevention:**
- Implement full-text search (Algolia, Meilisearch, or Elasticsearch)
- Build search index during build time; update on content changes
- Rank by relevance: exact phrase match > keyword match > partial match
- Cache popular searches
- Include facets: filter by topic-area, difficulty, type (video/article/diagram)

**Detection:**
- User reports "can't find X" (they searched but nothing appeared)
- Search result click-through rate <20% (results aren't matching intent)

**Which phase:** **Phase 2 (Content Expansion)** — wait until content library is substantial.

---

### Pitfall 10: Socratic Mode Context Window Causes Forgetfulness

**What goes wrong:** Socratic dialogue progresses:
- Turn 1: User asks about data integration
- Turn 5: AI has forgotten the original question (context window limit)
- Turn 8: AI is asking questions about unrelated concepts (total context loss)

**Why it happens:**
- LLM context window is finite (4K-8K tokens typical)
- Long dialogue with explanations burns context fast
- No explicit summarization of conversation state

**Prevention:**
- Hard exit at turn 8-10 (reset context)
- Periodic summarization: "Here's what we've covered so far..."
- Store conversation summary (learning objective + key insights) separately from dialogue
- Use smaller context windows for initial design, test how long dialogues can realistically be

**Detection:**
- User complains: "The AI forgot what we were talking about"
- Analytics show avg dialogue length >10 turns, but then user asks "what was my original question?"

**Which phase:** **Phase 3 (Socratic Dialogue)** — user testing will expose this quickly.

---

### Pitfall 11: Community Content Has No Clear Quality Bar

**What goes wrong:** Two community-contributed explanations exist for the same concept. One is excellent, one is mediocre. Users don't know which to read. Platform doesn't have a rating system, so there's no signal about quality.

**Prevention:**
- Implement upvote/downvote system (simple, shows community consensus)
- Maintainer "verification badge": verified explanations are marked as reviewed
- Show contributor reputation (how many approved contributions?)
- Defer to the community where possible (don't over-curate early)

**Detection:**
- Multiple explanations of same concept with no differentiation
- Community complains: "How do I know which is right?"

**Which phase:** **Phase 4 (Community Features)** — design this from the start.

---

### Pitfall 12: No Analytics / Can't Tell if Portal is Working

**What goes wrong:** Portal launches. You have no idea:
- Which topics do users engage with?
- Where do users drop off?
- Are Socratic mode users learning better than standard Q&A users?
- Which content is outdated (never accessed)?

**Prevention:**
- Implement basic analytics from day one (Vercel Analytics, Posthog, Plausible)
- Track: page views, time on page, scroll depth, feature usage (Socratic vs. Q&A)
- Don't need complex funnels yet; just understand traffic patterns
- Respect privacy: no user IDs, no tracking across sites

**Detection:**
- Can't answer "What's our most popular topic?"

**Which phase:** **Phase 1 (MVP)** — add Google Analytics or simple alternative at launch.

---

## Minor Pitfalls

### Pitfall 13: UI/UX Separates Socratic and Standard Chat Poorly

**What goes wrong:** User doesn't understand the difference between Socratic and Standard mode. They click Socratic, get frustrated by questions, assume the feature is broken.

**Prevention:**
- Clear labeling: side-by-side buttons ("Ask AI" vs. "Socratic Guide")
- Help text: "Socratic mode teaches through questions. Standard mode gives direct answers."
- Toggle with clear state indicator (which mode are you in right now?)

---

### Pitfall 14: Videos Embedded Without Transcripts / Accessibility Fails

**What goes wrong:** Educational videos embedded without captions or transcripts. Deaf/HoH users excluded. SEO suffers (video content can't be indexed).

**Prevention:**
- All videos have captions (auto-generated OK for MVP, but improve over time)
- Provide transcript or summary below video
- Use `<video>` with `<track kind="captions">` or YouTube captions

---

### Pitfall 15: No Mobile Navigation / Topic Discovery Broken on Small Screens

**What goes wrong:** Desktop navigation has a sidebar with topic tree (7 main areas, 40+ subtopics). On mobile, sidebar collapses; navigation menu is hard to discover.

**Prevention:**
- Mobile-first nav: hamburger menu, breadcrumb trail
- Topic search prominent (especially on mobile)
- Clear "you are here" indicator (current topic highlighted)

---

## Phase-Specific Warnings

| Phase | Topic | Likely Pitfall | Mitigation |
|-------|-------|---|---|
| Phase 1 (Content) | Content structure | Content hardcoded in components | Use Markdown/JSON files + loader pattern (CMS-ready from day one) |
| Phase 1 | Performance | Rich animations kill mobile | Performance budget (<3s FCP on 4G); test on real Android devices |
| Phase 2 (AI Features) | BYOK security | API keys logged/exposed | Strict key isolation; no logging of sensitive data; key clearing after use |
| Phase 2 | Streaming | Timeouts/incomplete responses | Implement error boundaries, timeouts, abort signals, user-friendly error messages |
| Phase 2 | Rate limits | Users hit limits without warning | Show API call costs; cache where possible; warn before limit |
| Phase 3 (Socratic) | Dialogue quality | Mode collapses to standard Q&A | Explicit dialogue structure; hybrid approach (Socratic hint + explanation); exit strategy at turn 8-10 |
| Phase 3 | Context window | AI forgetfulness | Hard exit at turn 10; periodic summarization; smaller context windows for initial testing |
| Phase 4 (Community) | Moderation | Spam/low-quality content | Approval workflow; AI-assisted flagging; clear guidelines; trusted contributor tiers |
| Phase 4 | Search | Broken or irrelevant results | Implement full-text search; ranking by relevance; faceted search |
| All | Deployment | Secrets exposure | Enforce `.gitignore`; use Vercel env vars; pre-commit hooks; rotate secrets quarterly |
| All | Analytics | No visibility into usage | Add basic analytics at MVP launch (Vercel Analytics or simple alternative) |

---

## Critical Success Factors

To avoid these pitfalls, prioritize in this order:

1. **Phase 1:** Content architecture (separates content from code) + performance testing (mobile-first)
2. **Phase 2:** BYOK security (key isolation) + streaming error handling + rate limit transparency
3. **Phase 3:** Socratic dialogue structure (explicit phases, not just "ask questions") + context management
4. **Phase 4:** Moderation process + community guidelines before enabling contributions

---

## Sources & Confidence

**HIGH confidence:**
- Performance pitfalls (mobile animations, Vercel cold starts) — widely documented in Next.js community
- Deployment/secrets management — standard DevOps practices
- Content architecture patterns — common across CMS projects

**MEDIUM confidence:**
- BYOK security specifics — emerging pattern, fewer public post-mortems (draws on OAuth/API key handling best practices)
- Socratic dialogue design — new pattern, limited real-world data on what works (draws on educational psychology + LLM prompt engineering)
- Rate limit UX — few platforms expose this well (inference from API documentation + user feedback patterns)
- Community moderation — well-documented (Stack Overflow, Reddit, GitHub) but context-specific to educational platforms

**LOW confidence:**
- Specific streaming timeout thresholds (2s? 30s? depends on user expectations)
- Socratic mode optimal turn count (turn 8-10 exit suggested, but untested)
- Video lazy-load strategy (depends on user behavior patterns for this specific portal)

These are flagged for phase-specific research and user testing as the platform develops.

---

*Generated: 2026-03-15*
*Research mode: Pitfalls (domain-specific)*
*Downstream use: Roadmap phase planning + development QA checklists*
