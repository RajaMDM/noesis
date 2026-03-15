# TESTING.md — NotebookLM Research Pipeline

**Focus:** Test framework, structure, mocking, coverage
**Mapped:** 2026-03-15

---

## Current State

**No test framework is configured.** The codebase relies entirely on manual CLI validation.

- No `pytest`, `unittest`, or other test runner installed
- No `tests/` directory
- No CI/CD pipeline running tests
- Validation is done by running scripts directly and observing output

---

## Recommended Test Framework

**pytest** — standard Python testing tool, compatible with async code via `pytest-asyncio`.

```bash
pip install pytest pytest-asyncio
```

---

## Mocking Strategy

### yt-dlp (`yt_research.py`)

Mock `yt_dlp.YoutubeDL` to avoid real network calls:

```python
from unittest.mock import patch, MagicMock

@patch("yt_dlp.YoutubeDL")
def test_search_returns_results(mock_ydl_class):
    mock_ydl = MagicMock()
    mock_ydl_class.return_value.__enter__.return_value = mock_ydl
    mock_ydl.extract_info.return_value = {
        "entries": [
            {"title": "Test Video", "view_count": 1000, "uploader": "TestChannel",
             "duration": 300, "webpage_url": "https://youtube.com/watch?v=abc"}
        ]
    }
    # call search function and assert results
```

### NotebookLM Client (`notebooklm_pipeline.py`)

Mock `NotebookLMClient` to avoid real API calls and authentication:

```python
from unittest.mock import AsyncMock, patch

@pytest.mark.asyncio
async def test_create_notebook():
    with patch("notebooklm_pipeline.NotebookLMClient") as mock_client_class:
        mock_client = AsyncMock()
        mock_client_class.return_value = mock_client
        mock_client.create_notebook.return_value = {"id": "nb_test123", "name": "Test"}
        # call function and assert
```

---

## Unit Test Targets (High Priority)

### `scripts/yt_research.py`

| Function | Test Cases |
|----------|-----------|
| URL construction | Valid video URL, channel URL fallback, "N/A" when all fail |
| Duration formatting | Seconds → `H:MM:SS`, zero duration, None |
| Result formatting (table) | Truncation of long titles, missing fields |
| Result formatting (json) | Valid JSON output, empty results |
| Result formatting (urls) | One URL per line, no extras |

### `scripts/notebooklm_pipeline.py`

| Function/Subcommand | Test Cases |
|--------------------|-----------|
| `create` | Successful notebook creation, auth failure |
| `add-sources` | Single URL, multiple URLs, duplicate URLs |
| `query` | Successful query, empty response |
| `pipeline` | End-to-end happy path, failure at each stage |

---

## Async Testing

Use `pytest-asyncio` for async functions:

```python
import pytest

@pytest.mark.asyncio
async def test_add_sources_with_rate_limit():
    # test that delays are applied between source additions
```

---

## Integration Test Approach

Integration tests should be skipped unless `NOTEBOOKLM_INTEGRATION=1` env var is set (requires real login):

```python
import pytest, os

@pytest.mark.skipif(
    not os.getenv("NOTEBOOKLM_INTEGRATION"),
    reason="Requires real NotebookLM credentials"
)
async def test_real_notebook_creation():
    ...
```

---

## Test Coverage Gaps (Current)

- All code paths in both scripts are untested
- No validation of output file format/content
- No tests for error/exception paths
- No tests for CLI argument parsing
- No tests for edge cases (empty search results, 0 sources, 50-source limit)

---

## Recommended Test Structure

```
tests/
  unit/
    test_yt_research.py
    test_notebooklm_pipeline.py
  integration/
    test_notebooklm_live.py   # requires NOTEBOOKLM_INTEGRATION=1
  conftest.py                 # shared fixtures and mocks
```

---

*Last updated: 2026-03-15 after initial codebase mapping*
