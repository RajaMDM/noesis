# Technology Stack

**Analysis Date:** 2026-03-15

## Languages

**Primary:**
- Python 3.12.7 - All core pipeline and research scripts

## Runtime

**Environment:**
- Python 3.12.7
- macOS (Darwin 25.3.0)

**Package Manager:**
- pip - Manages Python dependencies
- Lockfile: Not detected (uses installed packages tracked via memory)

## Frameworks

**Core:**
- notebooklm-py 0.3.4 - Unofficial Python client for Google's NotebookLM API with browser automation support
- yt-dlp 2026.3.13 - YouTube metadata scraping and video information extraction

**Async/Concurrency:**
- asyncio - Python standard library for async/await patterns (`notebooklm_pipeline.py`)

**CLI & Parsing:**
- argparse - Python standard library for command-line argument parsing

**Automation:**
- Playwright - Browser automation framework with Chromium headless shell (required for notebooklm authentication)

## Key Dependencies

**Critical:**
- notebooklm-py 0.3.4 - Enables all NotebookLM interactions: notebook creation, source management, artifact generation, and querying
- yt-dlp 2026.3.13 - Extracts YouTube video metadata; essential for research pipeline
- Playwright - Headless browser automation required for notebooklm Google authentication

**Data Processing:**
- json - Python standard library for JSON serialization (output formatting in `scripts/yt_research.py` and `scripts/notebooklm_pipeline.py`)
- pathlib - Python standard library for cross-platform file path handling in `scripts/notebooklm_pipeline.py`

## Configuration

**Environment:**
- Authentication stored locally via notebooklm-py's credential storage mechanism (`.notebooklm/` directory pattern)
- User must authenticate once with `notebooklm login` command (opens browser Google auth)

**Build:**
- No build step required - Python scripts run directly via python3 interpreter

**Output Directory:**
- Configured in `scripts/notebooklm_pipeline.py`: `/Users/rajaonapple/Documents/ClaudeCode/NotebookLM/output/`
- Created automatically if missing (line 51-52 in notebooklm_pipeline.py)

## Platform Requirements

**Development:**
- Python 3.12.7+
- macOS (tested/deployed on)
- Chromium headless browser support (via Playwright)
- Internet connection for YouTube and NotebookLM API access
- Google account for NotebookLM authentication

**Production:**
- Same as development environment
- Persistent storage for generated artifacts (`output/` directory)
- Network access to:
  - YouTube (yt-dlp scraping)
  - NotebookLM API (Google authentication, notebook operations)

## Scripts Entry Points

**YouTube Research:**
- Location: `scripts/yt_research.py`
- Invocation: `python3 scripts/yt_research.py "QUERY" -n 25 --format [table|json|urls]`
- Dependencies: yt-dlp

**NotebookLM Pipeline:**
- Location: `scripts/notebooklm_pipeline.py`
- Invocation: Multiple subcommands (create, add-sources, query, infographic, slide-deck, flashcards, pipeline)
- Dependencies: notebooklm-py (with browser support), asyncio, Playwright

---

*Stack analysis: 2026-03-15*
