import { notFound } from 'next/navigation';
import Link from 'next/link';
import { topics } from '@/lib/topics';
import { topicContent } from '@/lib/topic-content';
import { GlassCard } from '@/components/GlassCard';
import { ProgressStrip } from '@/components/ProgressStrip';
import { VideoSection } from '@/components/VideoSection';
import { DataSourcesDiagram } from '@/components/diagrams/DataSourcesDiagram';
import { DataIntegrationDiagram } from '@/components/diagrams/DataIntegrationDiagram';
import { DataQualityDiagram } from '@/components/diagrams/DataQualityDiagram';
import { MDMDiagram } from '@/components/diagrams/MDMDiagram';
import { ReverseIntegrationDiagram } from '@/components/diagrams/ReverseIntegrationDiagram';
import { DataGovernanceDiagram } from '@/components/diagrams/DataGovernanceDiagram';
import { AIDataManagementDiagram } from '@/components/diagrams/AIDataManagementDiagram';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ChatPanel } from '@/components/ChatPanel';

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
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) return {};
  return {
    title: `${topic.title} — Noesis`,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);
  const content = topicContent[slug];

  if (!topic || !content) notFound();

  const { Icon, title, description } = topic;
  const DiagramComponent = diagramMap[slug];
  const nextTopic = content.whereToGoNext.nextTopicSlug
    ? topics.find((t) => t.slug === content.whereToGoNext.nextTopicSlug)
    : null;
  const relatedTopicObjects = content.whereToGoNext.relatedSlugs
    .map((s) => topics.find((t) => t.slug === s))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all topics
        </Link>

        {/* Topic header */}
        <div className="mb-12">
          <div className="mb-6 text-[var(--color-accent-blue)]">
            <Icon className="w-12 h-12" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
            {title}
          </h1>
          {content.tagline && (
            <p className="text-lg font-semibold text-[var(--color-accent-blue)] mb-3 leading-tight">
              {content.tagline}
            </p>
          )}
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            {description}
          </p>
          {content.analogy && (
            <p className="text-sm text-[var(--color-text-secondary)] mt-3 italic leading-relaxed bg-[rgba(0,113,227,0.04)] border border-[rgba(0,113,227,0.1)] rounded-xl px-4 py-3">
              {content.analogy}
            </p>
          )}
        </div>

        {/* Key Insights */}
        <div className="mb-10 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {content.keyInsights.map((insight, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[260px] sm:w-auto snap-start bg-white border border-[var(--color-glass-border)] rounded-2xl p-5 shadow-[var(--shadow-glass)]"
            >
              <span className="text-xl mb-3 block">{['💡', '🔍', '⚡'][i]}</span>
              <p className="text-[var(--color-text-primary)] font-medium text-sm leading-snug">{insight}</p>
            </div>
          ))}
        </div>

        {/* AI Learning Modes — early CTA */}
        <section className="mb-12">
          <ChatPanel slug={slug} topicTitle={title} />
        </section>

        {/* From the Field */}
        <section className="mb-12">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[rgba(0,113,227,0.05)] to-[rgba(0,113,227,0.01)] border border-[rgba(0,113,227,0.15)] px-8 py-8">
            <span className="text-6xl font-serif text-[var(--color-accent-blue)] opacity-20 leading-none block -mb-4 -mt-2 select-none">"</span>
            <p className="text-[var(--color-text-primary)] text-lg leading-relaxed font-medium mb-6">
              {content.fromTheField.text}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--color-accent-blue)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                RS
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">Raja Shahnawaz Soni</p>
                <p className="text-xs text-[var(--color-text-muted)] truncate">{content.fromTheField.anonymization}</p>
              </div>
              <span className="ml-auto flex-shrink-0 px-3 py-1 rounded-full bg-[var(--color-accent-blue)] text-white text-xs font-semibold">
                From the Field
              </span>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Architecture</h2>
          <p className="text-[var(--color-text-muted)] text-sm mb-6">{content.architectureCaption}</p>
          {DiagramComponent && <DiagramComponent />}
        </section>

        {/* Video */}
        <VideoSection youtubeId={content.video.youtubeId} title={content.video.title} />

        {/* Further Reading (optional) */}
        {content.furtherReading && content.furtherReading.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Further Reading</h2>
            <ul className="space-y-2">
              {content.furtherReading.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--color-accent-blue)] hover:underline text-sm"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Where to Go Next */}
        <section className="mb-12 pt-8 border-t border-[var(--color-glass-border)]">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Where to Go Next</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {nextTopic && (
              <Link href={`/topics/${nextTopic.slug}`} className="col-span-1 sm:col-span-2 md:col-span-1">
                <GlassCard className="border border-[var(--color-accent-blue)] border-opacity-30 h-full">
                  <p className="text-xs font-mono text-[var(--color-accent-blue)] uppercase tracking-wider mb-2">
                    Next in Path
                  </p>
                  <p className="text-[var(--color-text-primary)] font-semibold">{nextTopic.title}</p>
                  <p className="text-[var(--color-text-muted)] text-sm mt-1">{nextTopic.description}</p>
                </GlassCard>
              </Link>
            )}
            {relatedTopicObjects.map((related) => related && (
              <Link key={related.slug} href={`/topics/${related.slug}`}>
                <GlassCard className="h-full">
                  <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                    Related
                  </p>
                  <p className="text-[var(--color-text-primary)] font-semibold text-sm">{related.title}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Progress Strip */}
        <ProgressStrip currentSlug={slug} />
      </div>
    </div>
  );
}
