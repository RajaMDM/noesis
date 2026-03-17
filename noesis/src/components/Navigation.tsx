'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { topics } from '@/lib/topics';
import { SearchTrigger } from '@/components/SearchModal';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-[rgba(255,255,255,0.85)] border-b border-[var(--color-glass-border)] backdrop-blur-[20px]"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight hover:text-[var(--color-accent-blue)] transition-colors"
        >
          Noesis
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Topics
              <ChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-[var(--color-glass-border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-glass)] py-1">
                {topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className="block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] hover:bg-[rgba(0,113,227,0.04)] transition-colors"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/domains"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium"
          >
            Playbooks
          </Link>
          <Link
            href="/glossary"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium"
          >
            Glossary
          </Link>
          <Link
            href="/about"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium"
          >
            About
          </Link>
          <span className="text-[var(--color-text-muted)] text-sm cursor-not-allowed" title="Coming in Phase 4">
            Chat
          </span>
          <SearchTrigger />
        </div>

        {/* Mobile: search icon + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <button
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[var(--color-text-secondary)]"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }))}
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[var(--color-text-primary)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--color-glass-border)] bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] px-2 mb-2">
              Topics
            </p>
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="block px-2 py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] hover:bg-[rgba(0,113,227,0.04)] rounded-[var(--radius-sm)] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {topic.title}
              </Link>
            ))}
            <Link
              href="/domains"
              className="block px-2 py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] hover:bg-[rgba(0,113,227,0.04)] rounded-[var(--radius-sm)] transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Playbooks
            </Link>
            <Link
              href="/glossary"
              className="block px-2 py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] hover:bg-[rgba(0,113,227,0.04)] rounded-[var(--radius-sm)] transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Glossary
            </Link>
            <Link
              href="/about"
              className="block px-2 py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] hover:bg-[rgba(0,113,227,0.04)] rounded-[var(--radius-sm)] transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <div className="border-t border-[var(--color-glass-border)] pt-3 mt-3">
              <span className="block px-2 py-3 text-[var(--color-text-muted)] text-sm">Chat (coming soon)</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
