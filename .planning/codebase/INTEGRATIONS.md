# External Integrations

**Analysis Date:** 2026-03-15

## APIs & External Services

**YouTube:**
- Service: YouTube video search and metadata extraction
  - SDK/Client: yt-dlp 2026.3.13
  - Auth: Public API access (no authentication required)
  - Used by: `scripts/yt_research.py`
  - Purpose: Search for videos by query, extract metadata (title, views, author, duration, upload date, description)
  - Rate limits: Handled by yt-dlp; respects YouTube's terms of service

**Google NotebookLM:**
- Service: AI-powered research notebook and artifact generation
  - SDK/Client: notebooklm-py 0.3.4 (unofficial API wrapper)
  - Auth: Google Account authentication via OAuth
    - Setup: User runs `notebooklm login` in terminal
    - Credentials stored locally by notebooklm-py
  - Used by: `scripts/notebooklm_pipeline.py`
  - Purpose: Create notebooks, upload YouTube URLs as sources, query for AI analysis, generate infographics/slide decks/flashcards
  - Capabilities:
    - Notebook creation
    - Multi-source management (up to 50 sources per notebook)
    - Chat/query interface for analysis
    - Artifact generation: infographics (multiple styles), slide decks (PDF/PPTX), flashcards (JSON/Markdown/HTML)

## Data Storage

**Databases:**
- None - project is stateless for data processing

**File Storage:**
- Local filesystem only
  - Output directory: `/Users/rajaonapple/Documents/ClaudeCode/NotebookLM/output/`
  - Generated files: Infographics (PNG), slide decks (PDF/PPTX), flashcards (JSON/Markdown/HTML)
  - Naming pattern: `{artifact_type}_{timestamp}.{ext}` (e.g., `infographic_20260315_170530.png`)
  - NotebookLM notebooks: Stored in Google's servers; referenced locally by notebook ID

**Caching:**
- None detected

## Authentication & Identity

**Auth Provider:**
- Google Account (via NotebookLM)
  - Implementation: OAuth flow managed by notebooklm-py
  - User initiates with: `notebooklm login` command
  - Persistent credentials: Stored locally by notebooklm library
  - Session handling: Managed transparently by `NotebookLMClient.from_storage()` async context manager (line 73 in notebooklm_pipeline.py)

## Monitoring & Observability

**Error Tracking:**
- None - errors logged to stderr via simple logging function

**Logs:**
- Standard output logging: Messages prefixed with `[notebooklm]` (line 60 in notebooklm_pipeline.py)
- Output stream: stderr for status messages, stdout for JSON results
- Notable log patterns:
  - Notebook creation confirmation
  - Source addition progress and failures
  - Generation task tracking (task_id, waiting status)
  - File output paths

## CI/CD & Deployment

**Hosting:**
- Local/standalone Python application
- No deployment infrastructure
- Runs on user's machine with internet connectivity

**CI Pipeline:**
- None detected

## Environment Configuration

**Required env vars:**
- None required - all configuration is command-line arguments or Google OAuth
- Optional: Could use env vars for output directory, but currently hardcoded (line 51)

**Secrets location:**
- Google OAuth credentials: Stored by notebooklm-py library (not in version control, secured by local OS permissions)
- No .env files or credential files in git repository

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None - all integrations are request-response (synchronous polling for async tasks)

## Artifact Generation Endpoints

**NotebookLM Artifact Generation Flow:**

1. **Infographic:**
   - Endpoint: `client.artifacts.generate_infographic(notebook_id, orientation, style, instructions)`
   - Parameters:
     - orientation: portrait, landscape, square
     - style: sketch_note, professional, bento_grid, editorial, instructional, bricks, clay, anime, kawaii, scientific, auto_select
     - instructions: Optional custom style prompt (line 127 in notebooklm_pipeline.py)
   - Returns: Task status with task_id
   - Download: `client.artifacts.download_infographic(notebook_id, output_path)`

2. **Slide Deck:**
   - Endpoint: `client.artifacts.generate_slide_deck(notebook_id)`
   - Output formats: PDF, PPTX
   - Returns: Task status with task_id
   - Download: `client.artifacts.download_slide_deck(notebook_id, output_path)`

3. **Flashcards:**
   - Endpoint: `client.artifacts.generate_flashcards(notebook_id, quantity, difficulty)`
   - Output formats: JSON, Markdown, HTML
   - Returns: Task status with task_id
   - Download: `client.artifacts.download_flashcards(notebook_id, output_path, output_format)`

4. **Chat Query:**
   - Endpoint: `client.chat.ask(notebook_id, question)`
   - Returns: Immediate response with answer text (line 103 in notebooklm_pipeline.py)

## Source Management

**YouTube Source Ingestion:**
- Method: URL-based
- Endpoint: `client.sources.add_url(notebook_id, url, wait=True)`
- Constraint: Up to 50 sources per notebook (documented in SKILL.md)
- Processing: Asynchronous with automatic waiting via `wait=True` parameter (line 90)

---

*Integration audit: 2026-03-15*
