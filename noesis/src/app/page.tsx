'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { topics } from '@/lib/topics';
import { TopicCard } from '@/components/TopicCard';
import { Button } from '@/components/Button';
import { GlassCard } from '@/components/GlassCard';
import { Key, Brain, Briefcase, ExternalLink, ArrowRight } from 'lucide-react';
import { QuoteRotator } from '@/components/QuoteRotator';

const testimonials = [
  {
    text: "I'm truly grateful for the guidance and support I received from Raja, who has been an exceptional mentor in the early years of my career. His ability to simplify complex ideas, offer honest and actionable feedback, and lead by example has profoundly shaped both my professional growth and my communication skills. Raja consistently encouraged me to think bigger, stay focused, and approach challenges with confidence. I highly recommend Raja to anyone seeking a leader who inspires, empowers, and genuinely invests in people.",
    name: 'Sandeep Deshpande',
    title: 'Senior Software Engineer @ Vivicta',
    date: 'November 2025',
  },
  {
    text: "Meeting new people when joining a new company can sometimes be stressful, and I was very relieved that Raja has this calm and welcoming attitude that made my experience easy and pleasant. Raja is an expert in his field, which was clear from the get go, and that meant we got the job done right; but it doesn't end there because Raja also goes the extra mile. Any company in need of his skillset in Master Data Management would be lucky to have him.",
    name: 'Frederick Khoury',
    title: 'Senior Solutions Engineer at Snowflake',
    date: 'February 2022',
  },
  {
    text: "I have had the pleasure of working with Raja on a Customer 360 MDM implementation project for one of the leading Food distributors in North America during my tenure at Infosys. He is one of the best minds I have worked with. Learned a lot from him on MDM strategy and technical implementation and I was a witness to his solid grasp on the Informatica MDM multi-domain edition and CC360 tools! Highly energetic person and extremely comfortable to work with. I highly recommend Raja for any Data Management/Analytics initiatives.",
    name: 'Venkitaraman S',
    title: 'Senior Data Engineer at Coast Capital Savings, ex-Infosys',
    date: 'September 2020',
  },
  {
    text: "I've had the chance to work with Raja on several projects, and I have to say that it has always been a pleasure collaborating with him for the success of our customers. He is a great professional, nice to work with, pretty well organized, with a high sense of customer relationship, in addition to his high and various technical skills. Always willing to learn more, and to improve his way of doing things, he is also prompt in sharing his knowledge and ideas with all colleagues, with the sake of always improving the quality of our work. You can really rely on him in every circumstance.",
    name: 'Mohit Juneja',
    title: 'Global Service Manager @ The Adecco Group',
    date: 'April 2018',
  },
  {
    text: "Raja and I have been working together in various projects for a few years now. The first thing you notice about is his attitude — excellent!! You can throw a challenge at him and be assured that he will come out with flying colors. His ability to troubleshoot from a technical point of view is another strength I have seen. I am confident that he will continue to push the limits on his career growth more and more. I would be happy to work with him again! Top strengths: Great technical depth, Excellent Attitude, Personable.",
    name: 'Nilay Mardikar',
    title: 'Co-Founder, FinnovaNest',
    date: 'December 2011',
  },
  {
    text: "Raja is a dedicated software professional. He possesses a 'can do' attitude and is always ready for more work. Raja also has a lot of other good traits that makes him a favorite among his peer group. I have seen him add color to the team and becoming the binding glue for the group. At work, he has completed many assignments successfully and in some cases exhibited his leadership skills to complete the work on time!",
    name: 'Deepak Manjarekar',
    title: 'Global Head, Data HBU at Coforge',
    date: 'February 2011',
  },
];

const companyLogos = [
  { name: 'Alshaya Group', type: 'employer' },
  { name: 'MAGNOOS', type: 'employer' },
  { name: 'Infosys', type: 'employer' },
  { name: 'Tietoevry', type: 'employer' },
  { name: 'Informatica', type: 'platform' },
  { name: 'Microsoft', type: 'platform' },
  { name: 'Salesforce', type: 'platform' },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const heroY = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : 80]);

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--color-noir)]"
      >
        {/* Background gradient — light mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,113,227,0.04)] to-transparent pointer-events-none" aria-hidden="true" />

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

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--color-text-primary)] mb-4 leading-none tracking-tight">
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
            <Link href="/topics/data-sources">
              <Button size="lg">Start Here</Button>
            </Link>
            <Link href="#topics">
              <Button variant="outline" size="lg">Explore All Topics</Button>
            </Link>
          </div>

          {/* Quote rotator */}
          <div className="mt-10 max-w-2xl mx-auto">
            <QuoteRotator />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[rgba(0,113,227,0.4)] to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ─── Differentiation Strip ───────────────────────────────── */}
      <div className="w-full bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 pt-16 pb-0">
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🏗️',
                title: 'Practitioner-authored',
                body: '20+ years of enterprise data leadership — MDM implementations, post-acquisition integrations, regulatory programmes. Not synthesised. Lived.',
              },
              {
                icon: '🎯',
                title: 'Domain-deep, not generic',
                body: 'Noesis knows what a Logistical Variant is, why YEXT matters for Location MDM, and what GDPR Article 17 means for your Customer golden record. Generic AI doesn\'t.',
              },
              {
                icon: '🤖',
                title: 'Your AI, your key',
                body: 'Bring your own Anthropic, OpenAI, Gemini, Mistral, or Groq key. Five learning modes. Zero data sent to any server. Your conversations stay yours.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-6 shadow-[var(--shadow-glass)]"
              >
                <span className="text-2xl block mb-3">{card.icon}</span>
                <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">{card.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
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
                <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-[rgba(0,113,227,0.08)] w-fit">
                  <Brain className="w-6 h-6 text-[var(--color-accent-blue)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
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
                <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-[rgba(0,113,227,0.08)] w-fit">
                  <Briefcase className="w-6 h-6 text-[var(--color-accent-blue)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                  From the Field
                </h3>
                <p className="text-xs font-mono text-[var(--color-accent-blue)] mb-3 uppercase tracking-wider">
                  Practitioner Insights
                </p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                  Every topic includes real enterprise context — what it actually looks like
                  to implement this across complex, multi-brand environments. Platform-agnostic
                  thinking, drawn from 20+ years across 70+ brands.
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
                <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-[rgba(0,113,227,0.08)] w-fit">
                  <Key className="w-6 h-6 text-[var(--color-accent-blue)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
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
                <p className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-primary)] leading-relaxed mb-6 font-light">
                  &ldquo;20 years. Every kind of environment — enterprise platforms, custom builds,
                  everything in between. What I&apos;ve learned is this: the platform is the weapon.
                  You pick the right one for the job and you execute. What makes data management
                  actually work isn&apos;t the technology — it&apos;s the framework, the ownership, and
                  the people who understand why it matters. Noesis exists to build that understanding.&rdquo;
                </p>
                <footer className="flex flex-col gap-2">
                  <div>
                    <p className="text-[var(--color-text-primary)] font-semibold">Raja Shahnawaz Soni</p>
                    <p className="text-[var(--color-text-muted)] text-sm font-mono">
                      Senior Data Leader & MDM Architect · Dubai, UAE
                    </p>
                    <p className="text-[var(--color-text-muted)] text-sm font-mono">
                      Speaker, Informatica World 2023 · ARC Award 2025
                    </p>
                  </div>
                  {/* Platform-agnostic credential strip */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Informatica IDMC', 'Microsoft Power Platform', 'Salesforce CRM', 'GPT · Gemini · Claude', 'Custom AI Builds'].map((p) => (
                      <span key={p} className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--color-glass-border)] text-[var(--color-text-muted)]">
                        {p}
                      </span>
                    ))}
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
                    <p className="text-[var(--color-text-primary)] text-sm font-semibold group-hover:text-[var(--color-accent-blue)] transition-colors">
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
                    <p className="text-[var(--color-text-primary)] text-sm font-semibold group-hover:text-[var(--color-accent-blue)] transition-colors">
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

      {/* ─── Testimonials ──────────────────────────────────────── */}
      <section
        id="testimonials"
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              What Colleagues Say
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Endorsements from engineers, consultants, and leaders across 15+ years of collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(showAllTestimonials ? testimonials : testimonials.slice(0, 3)).map((t, idx) => (
              <motion.div
                key={t.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <GlassCard className="h-full flex flex-col">
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm flex-1 mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="border-t border-[var(--color-glass-border)] pt-4">
                    <p className="text-[var(--color-text-primary)] font-semibold text-sm">{t.name}</p>
                    <p className="text-[var(--color-text-muted)] text-xs font-mono mt-0.5">{t.title}</p>
                    <p className="text-[var(--color-text-muted)] text-xs font-mono opacity-60 mt-0.5">{t.date} · LinkedIn</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {!showAllTestimonials && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllTestimonials(true)}
                className="text-[var(--color-accent-blue)] text-sm font-mono hover:underline underline-offset-2 transition-colors"
              >
                Show all 6 endorsements →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Company & Platform Logos ───────────────────────────── */}
      <section
        id="logos"
        className="w-full bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-12 border-t border-[var(--color-glass-border)]"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider text-center mb-8">
            Experience &amp; Platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {companyLogos.map((logo) => (
              <div
                key={logo.name}
                className="px-4 py-2 rounded-[var(--radius-sm)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)]"
              >
                <span className="text-[var(--color-text-secondary)] text-sm font-medium opacity-70">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Raja ─────────────────────────────────────────── */}
      <section
        id="about"
        className="w-full bg-[var(--color-noir-95)] px-4 sm:px-6 md:px-8 py-16 md:py-24 border-t border-[var(--color-glass-border)]"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="flex-1">
                <p className="text-xs font-mono text-[var(--color-accent-blue)] uppercase tracking-wider mb-4">
                  About the Author
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                  Raja Shahnawaz Soni
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  Senior Data Architect and MDM Lead with 20+ years of experience designing
                  enterprise data management programs across 70+ brands in retail, logistics,
                  banking, and CPG. Currently leading data architecture at Alshaya Group,
                  one of the world&apos;s largest franchise operators.
                </p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  Platform-agnostic specialist in Informatica IDMC, Microsoft Power Platform,
                  and Salesforce. Builder of AI-powered data agents. Practitioner-educator
                  who believes real understanding comes from seeing how data management works —
                  and breaks — at enterprise scale.
                </p>

                {/* Credentials strip */}
                <div className="flex flex-wrap gap-3">
                  {[
                    'Speaker · Informatica World 2023',
                    'ARC Award 2025',
                    '20+ Years Experience',
                    'Dubai, UAE',
                  ].map((credential) => (
                    <span
                      key={credential}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] text-[var(--color-text-secondary)]"
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="flex flex-col gap-3 min-w-[200px]">
                <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                  Connect
                </p>
                <a
                  href="https://linkedin.com/in/raja-shahnawaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] hover:border-[var(--color-accent-blue)] transition-colors"
                >
                  <span className="text-[var(--color-text-primary)] text-sm group-hover:text-[var(--color-accent-blue)] transition-colors">
                    LinkedIn
                  </span>
                  <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-blue)] transition-colors ml-auto" />
                </a>
                <a
                  href="https://github.com/rajamdm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] hover:border-[var(--color-accent-blue)] transition-colors"
                >
                  <span className="text-[var(--color-text-primary)] text-sm group-hover:text-[var(--color-accent-blue)] transition-colors">
                    GitHub
                  </span>
                  <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-blue)] transition-colors ml-auto" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────── */}
      <footer className="w-full bg-[var(--color-noir)] border-t border-[var(--color-glass-border)] px-4 sm:px-6 md:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <p className="font-semibold text-[var(--color-text-primary)]">Noesis</p>
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
