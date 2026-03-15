'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { topics } from '@/lib/topics';
import { TopicCard } from '@/components/TopicCard';
import { Button } from '@/components/Button';
import { GlassCard } from '@/components/GlassCard';
import { Key, MessageCircleQuestion } from 'lucide-react';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Subtle parallax on hero background — disabled for reduced motion
  const heroY = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : 80]);

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--color-noir)]"
      >
        {/* Animated background glow — parallax offset */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-blue)] opacity-[0.06] rounded-full blur-3xl" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] text-sm text-[var(--color-accent-blue)] mb-6 font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-blue)] animate-pulse" />
            Bring Your Own Key · No data stored server-side
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-none tracking-tight">
            Noesis
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Master data management through Socratic dialogue — an AI that teaches
            by asking, not telling. Bring your own API key and explore freely.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Button does not support asChild — use Link-wrapping pattern */}
            <Link href="#topics">
              <Button size="lg">Explore Topics</Button>
            </Link>
            <Link href="#different">
              <Button variant="outline" size="lg">How It Works</Button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[var(--color-accent-blue)] to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ─── Topic Cards Grid ────────────────────────────────────── */}
      <section
        id="topics"
        className="w-full bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-16 md:py-24"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Seven Topics. One Platform.
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto">
              From raw data sources to AI-driven governance — every foundational concept, deeply explained.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {topics.map((topic, index) => (
              <TopicCard key={topic.slug} topic={topic} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── What Makes Noesis Different ─────────────────────────── */}
      <section
        id="different"
        className="w-full bg-[var(--color-noir-95)] px-4 sm:px-6 md:px-8 py-16 md:py-24 border-t border-[var(--color-glass-border)]"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Makes Noesis Different
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Generic ed-tech gives you information. Noesis gives you understanding.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1: BYOK */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-[var(--color-accent-blue)] bg-opacity-10 w-fit">
                  <Key className="w-6 h-6 text-[var(--color-accent-blue)]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Bring Your Own Key
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  Connect OpenAI, Anthropic, or Google — your key stays in your browser,
                  never touches our servers. Context-aware answers on every topic you read.
                  Zero subscription, zero lock-in.
                </p>
              </GlassCard>
            </motion.div>

            {/* Feature 2: Socratic Dialogue */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard className="h-full">
                <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-[var(--color-accent-blue)] bg-opacity-10 w-fit">
                  <MessageCircleQuestion className="w-6 h-6 text-[var(--color-accent-blue)]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Socratic Dialogue Mode
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  Switch into a mode where the AI never answers directly — it asks guiding
                  questions until you reason your way to the insight yourself. The understanding
                  you build this way actually sticks.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────── */}
      <footer className="w-full bg-[var(--color-noir)] border-t border-[var(--color-glass-border)] px-4 sm:px-6 md:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
          <p>Noesis — Data Management Education</p>
          <p>Open platform · No accounts · No paywalls</p>
        </div>
      </footer>
    </>
  );
}
