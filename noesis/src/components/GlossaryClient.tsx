'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { GlossaryTerm, GlossaryCategory } from '@/lib/glossary';

const CATEGORY_COLORS: Record<string, string> = {
  'MDM': '#0071e3',
  'Data Quality': '#7c3aed',
  'Data Integration': '#0891b2',
  'Data Governance': '#d97706',
  'Data Sources': '#059669',
  'Reverse Integration': '#dc2626',
  'F&B / Hospitality': '#ea580c',
  'Apparel': '#9333ea',
  'Location': '#0891b2',
  'Financial': '#b45309',
  'General': '#6e6e73',
};

interface Props {
  terms: GlossaryTerm[];
  categories: GlossaryCategory[];
  letters: string[];
}

export function GlossaryClient({ terms, categories, letters }: Props) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'All'>('All');

  const filtered = useMemo(() => {
    return terms.filter(t => {
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      const q = query.toLowerCase();
      const matchesQuery = !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q) || (t.also?.toLowerCase().includes(q) ?? false);
      return matchesCategory && matchesQuery;
    });
  }, [terms, query, activeCategory]);

  const byLetter = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {};
    filtered.forEach(t => {
      const l = t.term[0].toUpperCase();
      if (!map[l]) map[l] = [];
      map[l].push(t);
    });
    return map;
  }, [filtered]);

  const visibleLetters = Object.keys(byLetter).sort();

  return (
    <div>
      {/* Search + filter bar */}
      <div className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-5 shadow-[var(--shadow-glass)] mb-8">
        {/* Search */}
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search terms and definitions…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--color-glass-border)] rounded-xl text-[var(--color-text-primary)] bg-white focus:outline-none focus:border-[var(--color-accent-blue)]"
          />
        </div>
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {(['All', ...categories] as (GlossaryCategory | 'All')[]).map(cat => {
            const color = cat === 'All' ? '#0071e3' : CATEGORY_COLORS[cat] ?? '#6e6e73';
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all"
                style={active
                  ? { background: color, color: 'white', borderColor: color }
                  : { background: 'white', color: '#6e6e73', borderColor: '#e5e5e7' }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Letter anchors */}
      {visibleLetters.length > 3 && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {visibleLetters.map(l => (
            <a
              key={l}
              href={`#letter-${l}`}
              className="w-7 h-7 flex items-center justify-center text-xs font-bold rounded-lg bg-white border border-[var(--color-glass-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-blue)] hover:text-white hover:border-[var(--color-accent-blue)] transition-all"
            >
              {l}
            </a>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-[var(--color-text-muted)] mb-6">
        {filtered.length} {filtered.length === 1 ? 'term' : 'terms'}
        {activeCategory !== 'All' && <> in <span className="font-semibold">{activeCategory}</span></>}
        {query && <> matching &ldquo;<span className="font-semibold">{query}</span>&rdquo;</>}
      </p>

      {/* Terms by letter */}
      {visibleLetters.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--color-text-muted)] text-sm">No terms found. Try a different search or category.</p>
        </div>
      )}

      <div className="space-y-10">
        {visibleLetters.map(letter => (
          <div key={letter} id={`letter-${letter}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-[var(--color-accent-blue)]">{letter}</span>
              <div className="flex-1 h-px bg-[var(--color-glass-border)]" />
            </div>
            <div className="space-y-3">
              {byLetter[letter].map(term => {
                const color = CATEGORY_COLORS[term.category] ?? '#6e6e73';
                return (
                  <div
                    key={term.term}
                    className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-5 shadow-[var(--shadow-glass)]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-base font-bold text-[var(--color-text-primary)]">{term.term}</h3>
                        {term.also && (
                          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Also: {term.also}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full"
                          style={{ color, background: `${color}12` }}
                        >
                          {term.category}
                        </span>
                        {term.relatedSlug && (
                          <Link
                            href={`/${term.relatedType === 'domain' ? 'domains' : 'topics'}/${term.relatedSlug}`}
                            className="text-[10px] font-medium text-[var(--color-accent-blue)] hover:underline border border-[rgba(0,113,227,0.2)] rounded-full px-2 py-0.5"
                          >
                            See context →
                          </Link>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{term.definition}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
