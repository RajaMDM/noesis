# Architecture

**Analysis Date:** 2026-03-15

## Pattern Overview

**Overall:** Multi-stage pipeline architecture with clean separation of concerns

**Key Characteristics:**
- Two independent CLI-driven stages: YouTube research and NotebookLM processing
- Async-first design for NotebookLM client operations
- Composable pipeline functions that can be called individually or chained
- External API integration (YouTube via yt-dlp, NotebookLM via notebooklm-py)
- Artifact generation and file output management

## Layers

**Data Acquisition Layer:**
- Purpose: Search and extract metadata from YouTube videos
- Location: `scripts/yt_research.py`
- Contains: YouTube search orchestration, metadata extraction, formatting utilities
- Depends on: `yt-dlp` library for YouTube interaction
- Used by: Users via CLI; results feed into NotebookLM layer

**NotebookLM Integration Layer:**
- Purpose: Manage NotebookLM notebook lifecycle and artifact generation
- Location: `scripts/notebooklm_pipeline.py`
- Contains: Async API client operations, notebook CRUD, query execution, artifact generation
- Depends on: `notebooklm-py` library with browser support, `asyncio` for async operations
- Used by: Users via CLI; integrates with output persistence layer

**Output Persistence Layer:**
- Purpose: Store generated deliverables with timestamps
- Location: `output/` directory (created at `OUTPUT_DIR` in `scripts/notebooklm_pipeline.py`)
- Contains: PNG infographics, PDF/PPTX slides, flashcard files (JSON/Markdown/HTML)
- Depends on: File system access, timestamp naming convention
- Used by: Artifact generation functions

## Data Flow

**Single-Stage Flow (YouTube only):**

1. User invokes `yt_research.py` with search query
2. `search_youtube()` calls yt-dlp with search constraints
3. yt-dlp returns structured entry data
4. Results extracted and formatted (duration, view counts)
5. Output formatted as table, JSON, or URLs based on `--format` flag
6. Results printed to stdout; metadata to stderr

**Multi-Stage Flow (Full Pipeline):**

1. `full_pipeline()` orchestrates complete workflow
2. `create_notebook()` creates new NotebookLM notebook, returns ID
3. `add_youtube_sources()` accepts notebook ID and list of URLs
4. Sources added sequentially with wait-for-completion polling
5. `query_notebook()` executes analysis question against indexed sources
6. Based on `--deliverables` list, one or more artifact generators invoked:
   - `generate_infographic()` with style/orientation options
   - `generate_slide_deck()` with PDF/PPTX format choice
   - `generate_flashcards()` with quantity/difficulty/format options
7. Each generator polls for task completion via `wait_for_completion()`
8. Completed artifacts downloaded to `output/` with timestamp names
9. Entire workflow results returned as JSON to stdout

**State Management:**
- YouTube search: Stateless. Results discarded after formatting/output
- NotebookLM: Stateful via notebook ID. Client authentication managed by `NotebookLMClient.from_storage()` (credentials stored by notebooklm-py)
- Pipeline results: Accumulated in `results` dict, returned as JSON output
- Artifact generation: Async task polling with client-managed state tracking

## Key Abstractions

**Search Result Record:**
- Purpose: Standardized video metadata representation
- Examples: `yt_research.py` lines 73-85
- Pattern: Python dict with typed fields (title, author, views, duration, url, thumbnail, etc.)
- Formatting: Dual representation - raw (for JSON) and human-readable (for table output)

**Async NotebookLM Client:**
- Purpose: Abstract NotebookLM API operations behind async context manager
- Examples: `scripts/notebooklm_pipeline.py` lines 73-105
- Pattern: Each operation uses `async with await NotebookLMClient.from_storage() as client:`
- Benefits: Automatic credential loading, connection lifecycle management

**Pipeline Command Dispatcher:**
- Purpose: Map CLI subcommands to corresponding async functions
- Examples: `scripts/notebooklm_pipeline.py` lines 252-365 (subparser setup and dispatch)
- Pattern: Subparsers for `create`, `add-sources`, `query`, `infographic`, `slide-deck`, `flashcards`, `pipeline`
- Routing: String-to-function mapping in async `run()` closure

**Style/Orientation Enumerations:**
- Purpose: User-friendly string inputs mapped to notebooklm-py enum types
- Examples: `_STYLE_MAP` (lines 32-48), `_ORIENTATION_MAP` (lines 26-30)
- Pattern: String lowercase → enum value (handles aliases like "sketch"/"sketch_note"/"chalkboard")

## Entry Points

**YouTube Research:**
- Location: `scripts/yt_research.py` main block (lines 110-146)
- Triggers: `python3 scripts/yt_research.py "QUERY" [--count 25] [--format table|json|urls]`
- Responsibilities: Parse arguments, invoke search, format and output results

**NotebookLM Pipeline:**
- Location: `scripts/notebooklm_pipeline.py` main block (lines 252-365)
- Triggers: `python3 scripts/notebooklm_pipeline.py {create|add-sources|query|infographic|slide-deck|flashcards|pipeline} [args]`
- Responsibilities: Parse subcommand, invoke corresponding async function, return JSON output

## Error Handling

**Strategy:** Graceful degradation with detailed logging

**Patterns:**

- YouTube search: Returns empty list on error; yt-dlp configured with `ignoreerrors=True` to skip failed entries
- NotebookLM individual operations: Exceptions caught in `add_youtube_sources()` (lines 93-95), failed URLs recorded separately from added URLs
- Async polling: `wait_for_completion()` managed by notebooklm-py client
- Missing dependencies: Early exit with install instructions (lines 19-22)
- Logging: All significant operations logged to stderr via `log()` helper (lines 59-60); JSON results to stdout

## Cross-Cutting Concerns

**Logging:** Custom `log()` function (line 59-60) prefixes all messages with `[notebooklm]` tag. Directed to stderr to preserve stdout for JSON output.

**Validation:** Argument validation delegated to argparse. Input sanitization minimal - queries passed directly to yt-dlp, notebook IDs and URLs passed to NotebookLM client.

**Authentication:** Managed entirely by notebooklm-py. Credentials stored after `notebooklm login` CLI invocation. Client pulls from storage via `NotebookLMClient.from_storage()`.

**Timestamps:** Generated via `timestamp()` helper (lines 63-64) in format `YYYYMMDD_HHMMSS` for artifact file naming.

---

*Architecture analysis: 2026-03-15*
