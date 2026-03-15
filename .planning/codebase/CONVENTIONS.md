# Coding Conventions

**Analysis Date:** 2026-03-15

## Naming Patterns

**Files:**
- Snake case: `yt_research.py`, `notebooklm_pipeline.py`
- Descriptive names indicating primary function
- No version suffixes or abbreviations

**Functions:**
- Snake case: `search_youtube()`, `format_results_table()`, `add_youtube_sources()`
- Verb-prefixed for action functions: `search_`, `format_`, `add_`, `create_`, `generate_`, `query_`
- Descriptive names indicating return type or purpose
- Internal helper functions use `_` prefix: `_ORIENTATION_MAP`, `_STYLE_MAP`

**Variables:**
- Snake case throughout: `max_results`, `ydl_opts`, `notebook_id`, `view_count`
- Temporary loop variables use single letters (`v`, `i`, `e`) in short contexts
- Constants in UPPER_SNAKE_CASE: `OUTPUT_DIR`, `_ORIENTATION_MAP`, `_STYLE_MAP`
- Type-hinted parameter names describe content: `query`, `urls`, `notebook_name`, `youtube_urls`

**Types:**
- No type stubs or type classes; uses inline Python 3.10+ type hints
- Union types use `|` operator: `list[str] | None`
- Dict types specify value types: `list[dict]`

## Code Style

**Formatting:**
- No explicit formatter configured (no `.prettierrc` or similar found)
- 4-space indentation (Python standard)
- Lines generally fit within 100-120 character limit
- Function definitions separated by 2 blank lines

**Linting:**
- No `.flake8`, `pylintrc`, or `black` config detected
- Code follows PEP 8 conventions by observation
- Import organization follows standard Python grouping

**Line Length Examples:**
- Most lines 40-90 characters
- Long strings may exceed (e.g., table formatting line at 140 chars in `format_results_table()`)
- Argument lists wrapped with proper indentation

## Import Organization

**Order:**
1. Standard library: `sys`, `json`, `argparse`, `asyncio`, `time`
2. Third-party libraries: `yt_dlp`, `notebooklm`
3. Standard library path utilities: `from pathlib import Path`
4. Local imports: None (single-file modules)

**Path Aliases:**
- No aliases used; direct imports from installed packages
- Submodule imports from `notebooklm`: `from notebooklm import NotebookLMClient` and `from notebooklm._artifacts import ...`
- Internal maps use underscore prefix to indicate module-private: `_ORIENTATION_MAP`, `_STYLE_MAP`

**Pattern:**
```python
# yt_research.py
import sys
import json
import argparse
import yt_dlp

# notebooklm_pipeline.py
import sys
import json
import asyncio
import argparse
import time
from pathlib import Path

try:
    from notebooklm import NotebookLMClient
    from notebooklm._artifacts import InfographicOrientation, InfographicStyle, InfographicDetail
except ImportError:
    # Error handling for missing dependency
```

## Error Handling

**Patterns:**
- ImportError caught explicitly with informative error message and sys.exit(1): `scripts/notebooklm_pipeline.py:15-22`
- General Exception caught with string conversion in loop context: `scripts/notebooklm_pipeline.py:88-95`
- Missing/None values checked with `if not` pattern before processing: `scripts/yt_research.py:39-40`, `scripts/notebooklm_pipeline.py:43-44`
- sys.exit(1) used for critical startup failures
- Broad `except Exception` used for source addition failures to continue with remaining sources

**Pattern Example:**
```python
# Import-time error handling
try:
    from notebooklm import NotebookLMClient
    from notebooklm._artifacts import InfographicOrientation, InfographicStyle, InfographicDetail
except ImportError:
    print("ERROR: notebooklm-py is not installed.", file=sys.stderr)
    print("Install with: pip install 'notebooklm-py[browser]'", file=sys.stderr)
    print("Then authenticate with: notebooklm login", file=sys.stderr)
    sys.exit(1)

# Loop-level error handling
try:
    await client.sources.add_url(notebook_id, url, wait=True)
    added.append(url)
except Exception as e:
    failed.append({"url": url, "error": str(e)})
```

## Logging

**Framework:** Custom logging wrapper using `print()` with `file=sys.stderr`

**Patterns:**
- `log()` helper function in `notebooklm_pipeline.py:59-60` wraps stderr output with timestamp-like prefix `[notebooklm]`
- Status messages go to stderr: `file=sys.stderr`
- Results/output go to stdout (JSON dumps)
- Verbose progress logging: `log(f"Adding: {url}")`, `log(f"Done: {url}")`
- Error context logged with exception message: `log(f"FAILED: {url} — {e}")`

**Usage Pattern:**
```python
def log(msg: str):
    print(f"[notebooklm] {msg}", file=sys.stderr)

# In main script
print(f"Searching YouTube for: '{args.query}' (top {args.count} results)...\n", file=sys.stderr)
log(f"Creating notebook: '{name}'")
log(f"Waiting for infographic (task_id={status.task_id})...")
```

## Comments

**When to Comment:**
- Used sparingly; code is generally self-documenting
- Clarification on non-obvious mappings: `"chalkboard": InfographicStyle.SKETCH_NOTE,   # closest available style` (line 35)
- Purpose of conditional blocks: `# Format duration from seconds to MM:SS or HH:MM:SS` (line 46)
- Data transformation intent: `# Format view count` (line 59)

**JSDoc/TSDoc:**
- Python docstrings used for all public functions
- Format: Triple-quoted docstring with Args, Returns sections
- Located immediately after function definition

**Docstring Pattern:**
```python
def search_youtube(query: str, max_results: int = 25) -> list[dict]:
    """
    Search YouTube for videos matching the query and return metadata.

    Args:
        query: Search query string
        max_results: Maximum number of results to return (default 25)

    Returns:
        List of dicts with keys: title, views, author, duration, url, thumbnail
    """
```

## Function Design

**Size:**
- Small focused functions: 5-30 lines typical
- Longer pipeline functions (50+ lines) used for orchestration/sequential operations
- `full_pipeline()` at 60 lines coordinates multiple async operations

**Parameters:**
- Type-hinted throughout: `def search_youtube(query: str, max_results: int = 25) -> list[dict]:`
- Default values used: `max_results: int = 25`, `deliverables: list[str] | None = None`
- Explicit None handling: `if deliverables is None: deliverables = []`
- Keyword arguments for optional parameters: `--style`, `--orientation`, `--format`

**Return Values:**
- Consistent dict returns for complex results: `{"id": nb.id, "name": name}`
- List returns for sequences: `list[dict]`, `list[str]`
- String returns for formatted output: `format_results_table()` returns `str`
- Full results always returned; side effects (file writes) also return path info

## Module Design

**Exports:**
- No explicit `__all__` defined
- Public functions: `search_youtube()`, `create_notebook()`, `add_youtube_sources()`, `query_notebook()`, `generate_infographic()`, `generate_slide_deck()`, `generate_flashcards()`, `full_pipeline()`, `main()`
- Private mappings: `_ORIENTATION_MAP`, `_STYLE_MAP` (underscore prefix convention)
- Helper functions: `log()`, `timestamp()`, `format_results_table()`

**Barrel Files:**
- Not applicable; two standalone CLI scripts without re-exports

**Module-Level Constants:**
- `OUTPUT_DIR = Path(__file__).parent.parent / "output"` set at module load with mkdir
- String-to-enum mappings as module constants for CLI argument parsing

---

*Convention analysis: 2026-03-15*
