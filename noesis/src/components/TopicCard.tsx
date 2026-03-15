'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import type { Topic } from '@/lib/topics';

export interface TopicCardProps {
  topic: Topic;
  index?: number; // For staggered entrance animation
}

export function TopicCard({ topic, index = 0 }: TopicCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { Icon, title, description, slug } = topic;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={prefersReducedMotion ? {} : { y: -8 }}
    >
      <Link href={`/topics/${slug}`} className="block h-full">
        <GlassCard className="h-full group">
          <div className="mb-4 text-[var(--color-accent-blue)]">
            <Icon className="w-8 h-8" aria-hidden="true" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[var(--color-accent-blue)] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {description}
          </p>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
