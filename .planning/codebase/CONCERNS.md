# CONCERNS.md — NotebookLM Research Pipeline

**Focus:** Technical debt, bugs, security, performance, fragile areas
**Mapped:** 2026-03-15

---

## Critical Issues

### 1. Overly Broad Exception Handling
**Location:** `scripts/notebooklm_pipeline.py` ~line 93
**Issue:** Generic `except Exception` blocks mask specific failures, making debugging difficult. Users get unhelpful error messages when things go wrong.
**Fix:** Catch specific exceptions (e.g., `AuthenticationError`, `NetworkError`, `TimeoutError`) and provide actionable messages.

### 2. No Timeout Protection
**Location:** `scripts/notebooklm_pipeline.py` — async operations
**Issue:** Long-running async operations (NotebookLM source addition, AI generation) can hang indefinitely. No mechanism to cancel or recover from stalled requests.
**Fix:** Add `asyncio.wait_for()` with configurable timeouts per operation type.

### 3. No Rate Limiting on Source Addition
**Location:** `scripts/notebooklm_pipeline.py` ~lines 87-95
**Issue:** YouTube URLs added to NotebookLM in rapid succession without delays. Likely to trigger rate limiting or silent failures from the unofficial API.
**Fix:** Add configurable delays between source additions (e.g., 1-2 seconds).

### 4. Suppressed yt-dlp Errors
**Location:** `scripts/yt_research.py` ~lines 25-30
**Issue:** `ignoreerrors: True` in yt-dlp options silently swallows extraction failures. Failed searches return partial or empty results without warning.
**Fix:** Log suppressed errors to stderr or a log file; surface counts of failed extractions.

### 5. Unbounded Output Accumulation
**Location:** `output/` directory
**Issue:** Each pipeline run generates new timestamped files (infographics, slides, flashcards) with no cleanup. Currently ~10MB, will grow unboundedly.
**Fix:** Add `--keep-last N` flag or automated cleanup of files older than X days.

### 6. No Authentication Verification
**Location:** `scripts/notebooklm_pipeline.py` — startup
**Issue:** Script assumes `notebooklm login` was previously run successfully. No pre-flight check; failures surface cryptically mid-pipeline.
**Fix:** Add auth check at startup with clear message: "Run `notebooklm login` first."

### 7. URL Construction Fragility
**Location:** `scripts/yt_research.py` ~lines 69-71
**Issue:** Three-level fallback for URL construction silently returns "N/A" when all options fail. Downstream pipeline receives invalid URLs without warning.
**Fix:** Raise explicit error or skip+warn when no valid URL can be constructed.

### 8. No Pipeline Recovery / Checkpointing
**Location:** `scripts/notebooklm_pipeline.py` — `pipeline` subcommand
**Issue:** If generation fails mid-pipeline (e.g., after notebook creation but before deliverable generation), the entire run must be restarted from scratch. No state persistence.
**Fix:** Save notebook ID after creation; allow `--resume NB_ID` to skip already-completed steps.

---

## Medium Issues

### 9. No Source Deduplication
**Location:** `scripts/notebooklm_pipeline.py` — `add-sources`
**Issue:** Same URL can be added multiple times to the same notebook. NotebookLM may reject or silently ignore duplicates.
**Fix:** Track added URLs in a local set; skip duplicates with a warning.

### 10. No Notebook Reuse
**Location:** `scripts/notebooklm_pipeline.py` — `pipeline` subcommand
**Issue:** Each pipeline invocation creates a new notebook, even for the same topic. No way to append sources to an existing notebook.
**Fix:** Add `--notebook-id NB_ID` option to reuse existing notebooks.

### 11. Missing Input Validation
**Location:** Both scripts
**Issue:** No validation of URL format before passing to NotebookLM. Non-YouTube URLs or malformed URLs will cause unclear failures.
**Fix:** Validate URLs match expected patterns before API calls.

### 12. No Credential Security
**Location:** `scripts/notebooklm_pipeline.py`
**Issue:** If credentials are stored in plaintext by `notebooklm-py`, there's no audit or warning about credential storage location/security.
**Fix:** Document where credentials are stored; warn if found in insecure locations.

---

## Performance Concerns

### 13. Sequential Source Addition
**Location:** `scripts/notebooklm_pipeline.py`
**Issue:** Sources added sequentially. For 20+ sources, this creates significant latency.
**Fix:** Batch source additions if API supports it; otherwise add small concurrency with rate limiting.

### 14. No Progress Feedback for Long Operations
**Location:** Both scripts
**Issue:** AI generation (infographic, slides) can take 30-120 seconds with no progress indication. Users may assume the process has hung.
**Fix:** Add spinner/progress indicator during waiting periods.

---

## Scaling Limits

- NotebookLM cap: 50 sources per notebook — no enforcement in current code
- yt-dlp search: `-n 25` hardcoded as default; large queries slow with no timeout
- Output directory: no size monitoring or alerting

---

## Test Coverage Gaps

- No unit tests for either script
- No integration tests for NotebookLM API interactions
- No mock/stub for yt-dlp to enable offline testing
- No validation of generated output file formats/content

---

*Last updated: 2026-03-15 after initial codebase mapping*
