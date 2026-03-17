import { notFound } from 'next/navigation';
import Link from 'next/link';
import { topics } from '@/lib/topics';
import { topicContent } from '@/lib/topic-content';
import { ChatPanel } from '@/components/ChatPanel';
import { VideoSection } from '@/components/VideoSection';
import { ProgressStrip } from '@/components/ProgressStrip';
import { DataSourcesDiagram } from '@/components/diagrams/DataSourcesDiagram';
import { DataIntegrationDiagram } from '@/components/diagrams/DataIntegrationDiagram';
import { DataQualityDiagram } from '@/components/diagrams/DataQualityDiagram';
import { MDMDiagram } from '@/components/diagrams/MDMDiagram';
import { ReverseIntegrationDiagram } from '@/components/diagrams/ReverseIntegrationDiagram';
import { DataGovernanceDiagram } from '@/components/diagrams/DataGovernanceDiagram';
import { AIDataManagementDiagram } from '@/components/diagrams/AIDataManagementDiagram';

// Map topic slug to its diagram component
type DiagramComponent = () => React.ReactElement;

const diagramMap: Record<string, DiagramComponent> = {
  'data-sources': DataSourcesDiagram,
  'data-integration': DataIntegrationDiagram,
  'data-quality': DataQualityDiagram,
  'master-data-management': MDMDiagram,
  'reverse-integration': ReverseIntegrationDiagram,
  'data-governance': DataGovernanceDiagram,
  'ai-in-data-management': AIDataManagementDiagram,
};

export async function generateStaticParams() {
  return topics.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topics.find(t => t.slug === slug);
  if (!topic) return {};
  return { title: `${topic.title} — Noesis`, description: topic.description };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topics.find(t => t.slug === slug);
  const content = topicContent[slug];
  if (!topic || !content) notFound();

  const DiagramComponent = diagramMap[slug];
  const currentIndex = topics.findIndex(t => t.slug === slug);
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">

        {/* ── 1. Header ─────────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[rgba(0,113,227,0.08)] flex items-center justify-center mb-6 text-[var(--color-accent-blue)]">
            <topic.Icon className="w-7 h-7" />
          </div>
          <p className="text-xs font-mono text-[var(--color-accent-blue)] uppercase tracking-widest mb-3">
            Data Management · Topic {currentIndex + 1} of {topics.length}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
            {topic.title}
          </h1>
          {content.tagline && (
            <p className="text-xl font-semibold text-[var(--color-accent-blue)] mb-4">
              {content.tagline}
            </p>
          )}
          {content.analogy && (
            <p className="text-sm text-[var(--color-text-secondary)] italic leading-relaxed bg-white border border-[rgba(0,113,227,0.12)] rounded-xl px-5 py-4 max-w-2xl shadow-[var(--shadow-glass)]">
              {content.analogy}
            </p>
          )}
        </div>

        {/* ── 2. Key Insight chips ──────────────────────────────────── */}
        {content.keyInsights && content.keyInsights.length > 0 && (
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {content.keyInsights.map((insight, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-5 shadow-[var(--shadow-glass)]"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center mb-3 text-sm font-bold text-white"
                  style={{ background: 'var(--color-accent-blue)' }}
                >
                  {i + 1}
                </div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── 3. ChatPanel — MAIN EXPERIENCE ───────────────────────── */}
        <div className="mb-14">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
              Explore with AI
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Five modes. Ask anything — from first principles to edge cases a textbook would never cover.
            </p>
          </div>
          <ChatPanel slug={slug} topicTitle={topic.title} />
        </div>

        {/* ── 4. Architecture Diagram ───────────────────────────────── */}
        {DiagramComponent && (
          <div className="mb-14">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
              Architecture View
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-5">
              How the pieces fit together — animated
            </p>
            <div className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-6 shadow-[var(--shadow-glass)]">
              <DiagramComponent />
            </div>
          </div>
        )}

        {/* ── 5. From the Field ─────────────────────────────────────── */}
        {content.fromTheField && (
          <div className="mb-14">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-5">
              From the Field
            </h2>
            <div
              className="relative rounded-2xl overflow-hidden border px-8 py-8"
              style={{
                background: 'linear-gradient(135deg, rgba(0,113,227,0.04), rgba(0,113,227,0.01))',
                borderColor: 'rgba(0,113,227,0.12)',
              }}
            >
              <span className="text-6xl font-serif text-[var(--color-accent-blue)] opacity-15 leading-none block -mb-4 select-none">&ldquo;</span>
              <p className="text-base text-[var(--color-text-primary)] leading-relaxed font-medium mb-6">
                {content.fromTheField.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent-blue)] flex items-center justify-center text-white text-xs font-bold">
                  RS
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--color-text-primary)]">Raja Shahnawaz Soni</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{content.fromTheField.anonymization}</p>
                </div>
                <span className="ml-auto px-3 py-1 rounded-full bg-[var(--color-accent-blue)] text-white text-xs font-semibold">
                  From the Field
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── 6. Video ─────────────────────────────────────────────── */}
        <div className="mb-14">
          <VideoSection youtubeId={content.video.youtubeId} title={content.video.title} />
        </div>

        {/* ── 7. Where to Go Next ───────────────────────────────────── */}
        <div className="mb-14 pt-8 border-t border-[var(--color-glass-border)]">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Where to Go Next</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevTopic && (
              <Link
                href={`/topics/${prevTopic.slug}`}
                className="group flex items-center gap-4 bg-white border border-[var(--color-glass-border)] rounded-2xl p-5 shadow-[var(--shadow-glass)] hover:shadow-[0_4px_20px_rgba(0,113,227,0.1)] hover:border-[rgba(0,113,227,0.3)] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(0,113,227,0.08)] flex items-center justify-center text-[var(--color-accent-blue)] flex-shrink-0">
                  <prevTopic.Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">&#8592; Previous</p>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors">{prevTopic.title}</p>
                </div>
              </Link>
            )}
            {nextTopic && (
              <Link
                href={`/topics/${nextTopic.slug}`}
                className="group flex items-center gap-4 bg-white border border-[var(--color-glass-border)] rounded-2xl p-5 shadow-[var(--shadow-glass)] hover:shadow-[0_4px_20px_rgba(0,113,227,0.1)] hover:border-[rgba(0,113,227,0.3)] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(0,113,227,0.08)] flex items-center justify-center text-[var(--color-accent-blue)] flex-shrink-0">
                  <nextTopic.Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Next &#8594;</p>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors">{nextTopic.title}</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* ── Progress Strip ────────────────────────────────────────── */}
        <ProgressStrip currentSlug={slug} />

      </div>
    </div>
  );
}
