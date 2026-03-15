'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { topics } from '@/lib/topics';
import { TopicCard } from '@/components/TopicCard';
import { Button } from '@/components/Button';
import { GlassCard } from '@/components/GlassCard';
import { Key, Brain, Briefcase, ExternalLink, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const heroY = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : 80]);

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--color-noir)]"
      >
        {/* Background glow — parallax */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[var(--color-accent-blue)] opacity-[0.05] rounded-full blur-3xl" />
          <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] bg-[var(--color-accent-blue)] opacity-[0.03] rounded-full blur-2xl" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
        >
          {/* Provenance badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] text-sm text-[var(--color-accent-blue)] mb-6 font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-blue)] animate-pulse" />
            Built by a practitioner · 20+ years in the field
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-none tracking-tight">
            Noesis
          </h1>

          {/* Primary value proposition — Raja's chosen line */}
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--color-accent-blue)] mb-4 leading-tight">
            Learn data management from someone who&apos;s broken it at scale.
          </p>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-3 leading-relaxed">
            Enterprise MDM, data governance, and AI-driven data management — explained
            by someone who&apos;s lived it, not just taught it.
          </p>

          {/* Subtle attribution */}
          <p className="text-sm text-[var(--color-text-muted)] font-mono mb-10">
            By{' '}
            <a
              href="https://linkedin.com/in/raja-shahnawaz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-blue)] hover:underline underline-offset-2"
            >
              Raja Shahnawaz Soni
            </a>
            {' '}· Senior Data Leader & MDM Architect · Dubai, UAE
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#topics">
              <Button size="lg">Explore Topics</Button>
            </Link>
            <Link href="#from-the-field">
              <Button variant="outline" size="lg">The Story Behind This</Button>
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
              From raw data sources to AI-driven governance — every foundational concept,
              explained by someone who&apos;s implemented it at enterprise scale.
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
              Generic ed-tech gives you information. Noesis gives you understanding —
              grounded in what actually happens in enterprise environments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Think Through It */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-[var(--color-accent-blue)] bg-opacity-10 w-fit">
                  <Brain className="w-6 h-6 text-[var(--color-accent-blue)]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Think Through It
                </h3>
                <p className="text-xs font-mono text-[var(--color-accent-blue)] mb-3 uppercase tracking-wider">
                  AI Mentor Mode
                </p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                  An AI that refuses to give you the answer. Instead it asks exactly the right
                  question to move your thinking forward — the way a great senior colleague would.
                  Understanding you build this way actually sticks.
                </p>
              </GlassCard>
            </motion.div>

            {/* Feature 2: From the Field */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard className="h-full">
                <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-[var(--color-accent-blue)] bg-opacity-10 w-fit">
                  <Briefcase className="w-6 h-6 text-[var(--color-accent-blue)]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  From the Field
                </h3>
                <p className="text-xs font-mono text-[var(--color-accent-blue)] mb-3 uppercase tracking-wider">
                  Practitioner Insights
                </p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                  Every topic includes real enterprise context — what textbooks don&apos;t tell you,
                  what actually breaks in production, and what the theory misses. Drawn from
                  20+ years across 70+ brands.
                </p>
              </GlassCard>
            </motion.div>

            {/* Feature 3: Your AI, Your Way */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="h-full">
                <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-[var(--color-accent-blue)] bg-opacity-10 w-fit">
                  <Key className="w-6 h-6 text-[var(--color-accent-blue)]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Your AI, Your Way
                </h3>
                <p className="text-xs font-mono text-[var(--color-accent-blue)] mb-3 uppercase tracking-wider">
                  Private · No Lock-in
                </p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                  Connect your own OpenAI, Anthropic, or Google key. It stays in your browser —
                  never touches our servers. No subscription, no data harvesting, no dependency
                  on a platform that might change.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── The Practitioner's Manifesto ────────────────────────── */}
      <section
        id="from-the-field"
        className="w-full bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-16 md:py-24 border-t border-[var(--color-glass-border)]"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Quote block */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-[var(--color-accent-blue)] opacity-60 rounded-full" />
              <blockquote className="pl-8">
                <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed mb-6 font-light">
                  &ldquo;I&apos;ve spent 20 years fixing data problems that shouldn&apos;t have existed.
                  Bad master data, broken governance, expensive tools that didn&apos;t need to be there.
                  Most of it came down to one thing: people didn&apos;t have a clear picture of how
                  data actually works in an enterprise. Noesis is my attempt to fix that.&rdquo;
                </p>
                <footer className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div>
                    <p className="text-white font-semibold">Raja Shahnawaz Soni</p>
                    <p className="text-[var(--color-text-muted)] text-sm font-mono">
                      Senior Data Leader & MDM Architect · Dubai, UAE
                    </p>
                    <p className="text-[var(--color-text-muted)] text-sm font-mono">
                      Speaker, Informatica World 2023 · ARC Award 2025
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Links to prior platforms */}
            <div className="mt-10 pt-8 border-t border-[var(--color-glass-border)]">
              <p className="text-[var(--color-text-muted)] text-sm font-mono uppercase tracking-wider mb-4">
                Platform lineage
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://rajamdm.github.io/data-alchemist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] hover:border-[var(--color-accent-blue)] transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold group-hover:text-[var(--color-accent-blue)] transition-colors">
                      The Data Alchemist
                    </p>
                    <p className="text-[var(--color-text-muted)] text-xs font-mono">Platform I · 7 modules · AI tutor</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-blue)] transition-colors flex-shrink-0" />
                </a>

                <a
                  href="https://gemini.google.com/share/efec178b8083"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] hover:border-[var(--color-accent-blue)] transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold group-hover:text-[var(--color-accent-blue)] transition-colors">
                      SYNAPTIQ
                    </p>
                    <p className="text-[var(--color-text-muted)] text-xs font-mono">Platform II · 6-stage enterprise architecture</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-blue)] transition-colors flex-shrink-0" />
                </a>

                <div className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-accent-blue)] bg-[var(--color-accent-blue)] bg-opacity-5">
                  <div className="flex-1">
                    <p className="text-[var(--color-accent-blue)] text-sm font-semibold">
                      Noesis
                    </p>
                    <p className="text-[var(--color-text-muted)] text-xs font-mono">Platform III · You are here</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--color-accent-blue)] flex-shrink-0" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────── */}
      <footer className="w-full bg-[var(--color-noir)] border-t border-[var(--color-glass-border)] px-4 sm:px-6 md:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <p className="font-semibold text-white">Noesis</p>
            <span className="hidden sm:inline opacity-30">·</span>
            <p>Built by{' '}
              <a
                href="https://linkedin.com/in/raja-shahnawaz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent-blue)] hover:underline underline-offset-2"
              >
                Raja Shahnawaz Soni
              </a>
            </p>
          </div>
          <p>Open platform · No accounts · No paywalls</p>
        </div>
      </footer>
    </>
  );
}
