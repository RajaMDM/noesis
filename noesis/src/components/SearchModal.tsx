'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { searchIndex, SearchItem, SearchCategory } from '@/lib/search-index';

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: 'title', weight: 0.6 },
    { name: 'subtitle', weight: 0.3 },
    { name: 'body', weight: 0.1 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
});

const CATEGORY_COLORS: Record<SearchCategory, string> = {
  Topic: '#0071e3',
  Domain: '#7c3aed',
  Entity: '#0891b2',
  Scenario: '#dc2626',
  Integration: '#059669',
};

const CATEGORY_BG: Record<SearchCategory, string> = {
  Topic: 'rgba(0,113,227,0.08)',
  Domain: 'rgba(124,58,237,0.08)',
  Entity: 'rgba(8,145,178,0.08)',
  Scenario: 'rgba(220,38,38,0.08)',
  Integration: 'rgba(5,150,105,0.08)',
};

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setActiveIndex(0);
    }
  }, [open]);

  // Search on query change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    const r = fuse.search(query).slice(0, 10).map(r => r.item);
    setResults(r);
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation
  const navigate = useCallback((item: SearchItem) => {
    setOpen(false);
    router.push(item.url);
  }, [router]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIndex]) {
      navigate(results[activeIndex]);
    }
  }, [results, activeIndex, navigate]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] overflow-hidden border border-[var(--color-glass-border)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-glass-border)]">
          <svg className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search topics, domains, entities, scenarios…"
            className="flex-1 text-sm text-[var(--color-text-primary)] bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
          />
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-[var(--color-text-muted)] border border-[var(--color-glass-border)] rounded px-1.5 py-0.5 font-mono">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto">
          {query.trim() === '' && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">Start typing to search across all topics, domains, entities and scenarios.</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-2 opacity-60">{searchIndex.length} items indexed</p>
            </div>
          )}

          {query.trim() !== '' && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">No results for &ldquo;<span className="text-[var(--color-text-primary)]">{query}</span>&rdquo;</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((item, i) => (
                <button
                  key={item.id}
                  data-index={i}
                  onClick={() => navigate(item)}
                  className={[
                    'w-full text-left px-4 py-3 flex items-start gap-3 transition-colors',
                    i === activeIndex ? 'bg-[rgba(0,113,227,0.05)]' : 'hover:bg-[rgba(0,0,0,0.02)]',
                  ].join(' ')}
                >
                  <span
                    className="flex-shrink-0 mt-0.5 text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-full"
                    style={{
                      color: CATEGORY_COLORS[item.category],
                      background: CATEGORY_BG[item.category],
                    }}
                  >
                    {item.category}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight mb-0.5 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] leading-snug line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                  {i === activeIndex && (
                    <kbd className="flex-shrink-0 text-[9px] text-[var(--color-text-muted)] border border-[var(--color-glass-border)] rounded px-1 py-0.5 font-mono mt-0.5">
                      ↵
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[var(--color-glass-border)] flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-muted)] font-mono">
            <span>↑↓ navigate</span>
            <span>↵ open</span>
            <span>esc close</span>
          </div>
          <span className="text-[10px] text-[var(--color-text-muted)]">Noesis Search</span>
        </div>
      </div>
    </div>
  );
}

// Export a trigger button for the nav
export function SearchTrigger() {
  function open() {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
  }
  return (
    <button
      onClick={open}
      className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-text-muted)] border border-[var(--color-glass-border)] rounded-xl px-3 py-1.5 bg-white hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition-all"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <span className="text-xs">Search</span>
      <kbd className="text-[9px] border border-[var(--color-glass-border)] rounded px-1 py-0.5 font-mono">⌘K</kbd>
    </button>
  );
}
