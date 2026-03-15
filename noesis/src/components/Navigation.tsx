'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { topics } from '@/lib/topics';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-[var(--color-noir-95)] border-b border-[var(--color-glass-border)] backdrop-blur-[10px]"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-white tracking-tight hover:text-[var(--color-accent-blue)] transition-colors"
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
              className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-white transition-colors"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Topics
              <ChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-[var(--color-noir-90)] border border-[var(--color-glass-border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-glass)] py-1">
                {topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className="block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-glass-bg)] transition-colors"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <span className="text-[var(--color-text-muted)] text-sm cursor-not-allowed" title="Coming in Phase 4">
            Chat
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--color-glass-border)] bg-[var(--color-noir-95)]">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] px-2 mb-2">
              Topics
            </p>
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="block px-2 py-3 text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-glass-bg)] rounded-[var(--radius-sm)] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {topic.title}
              </Link>
            ))}
            <div className="border-t border-[var(--color-glass-border)] pt-3 mt-3">
              <span className="block px-2 py-3 text-[var(--color-text-muted)] text-sm">Chat (coming soon)</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
