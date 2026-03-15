'use client';

import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { topics } from '@/lib/topics';

interface ProgressStripProps {
  currentSlug: string;
}

export function ProgressStrip({ currentSlug }: ProgressStripProps) {
  const prefersReducedMotion = useReducedMotion();
  const currentIndex = topics.findIndex((t) => t.slug === currentSlug);

  return (
    <nav aria-label="Learning path" className="my-12 pt-8 border-t border-[var(--color-glass-border)]">
      <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
        Learning Path
      </p>
      <ol className="flex items-stretch gap-1 sm:gap-2">
        {topics.map((topic, idx) => {
          const isActive = topic.slug === currentSlug;
          const isPast = idx < currentIndex;

          return (
            <li key={topic.slug} className="flex-1 min-w-0">
              <Link
                href={`/topics/${topic.slug}`}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${idx + 1}: ${topic.title}`}
                className={[
                  'flex flex-col items-center justify-center',
                  'px-1 sm:px-2 py-2 sm:py-3 rounded-[var(--radius-sm)]',
                  'text-center transition-all',
                  prefersReducedMotion ? '' : 'duration-200',
                  isActive
                    ? 'bg-[var(--color-accent-blue)] text-white'
                    : isPast
                    ? 'bg-[var(--color-glass-bg)] border border-[var(--color-accent-blue)] border-opacity-40 text-[var(--color-accent-blue)]'
                    : 'bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-text-secondary)]',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="text-xs font-mono mb-0.5 opacity-60">{idx + 1}</span>
                <span className="hidden sm:block text-xs font-medium leading-tight truncate w-full text-center">
                  {topic.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
