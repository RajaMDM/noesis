import { notFound } from 'next/navigation';
import Link from 'next/link';
import { topics } from '@/lib/topics';
import { topicContent } from '@/lib/topic-content';
import { Button } from '@/components/Button';
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
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* 1. Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Overview</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-base whitespace-pre-line">
            {content.overview}
          </p>
        </section>

        {/* 2. How AI Applies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">How AI Applies</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-base whitespace-pre-line">
            {content.howAIApplies}
          </p>
        </section>

        {/* 3. From the Field — GlassCard with electric blue badge */}
        <section className="mb-12">
          <GlassCard className="border border-[var(--color-accent-blue)] border-opacity-30">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent-blue)] text-white text-xs font-semibold tracking-wide">
                From the Field
              </span>
            </div>
            <p className="text-[var(--color-text-primary)] leading-relaxed mb-6 text-base">
              {content.fromTheField.text}
            </p>
            <p className="text-[var(--color-text-muted)] text-sm font-mono">
              — Raja Shahnawaz Soni · {content.fromTheField.anonymization}
            </p>
          </GlassCard>
        </section>

        {/* Topic-specific optional block: Tools (Data Quality, MDM) */}
        {content.tools && content.tools.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Tools &amp; Agents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.tools.map((tool) => (
                <GlassCard key={tool.name}>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">{tool.name}</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-3">{tool.description}</p>
                  {tool.link && (
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--color-accent-blue)] text-sm hover:underline"
                    >
                      Learn more <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </GlassCard>
              ))}
            </div>
          </section>
        )}

        {/* Topic-specific: Policy Framework (Data Governance) */}
        {content.policyFramework && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Governance Essentials</h2>
            <div className="text-[var(--color-text-secondary)] leading-relaxed text-base whitespace-pre-line">
              {content.policyFramework}
            </div>
          </section>
        )}

        {/* Topic-specific: Matching Algorithm (MDM) */}
        {content.matchingAlgorithm && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">How MDM Matching Works</h2>
            <div className="text-[var(--color-text-secondary)] leading-relaxed text-base">
              {content.matchingAlgorithm}
            </div>
          </section>
        )}

        {/* Topic-specific: Activation Examples (Reverse Integration) */}
        {content.activationExamples && content.activationExamples.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Activation Use Cases</h2>
            <ul className="space-y-3">
              {content.activationExamples.map((example, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-[var(--color-accent-blue)] font-mono text-sm pt-0.5">→</span>
                  <span className="text-[var(--color-text-secondary)] text-base">{example}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Topic-specific: Emerging Tools (AI in Data Management) */}
        {content.emergingTools && content.emergingTools.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Emerging AI Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.emergingTools.map((tool) => (
                <GlassCard key={tool.name}>
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">{tool.name}</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm">{tool.capability}</p>
                </GlassCard>
              ))}
            </div>
          </section>
        )}

        {/* 4. Architecture Diagram */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Architecture</h2>
          <p className="text-[var(--color-text-muted)] text-sm mb-6">{content.architectureCaption}</p>
          {DiagramComponent && <DiagramComponent />}
        </section>

        {/* 5. Video */}
        <VideoSection youtubeId={content.video.youtubeId} title={content.video.title} />

        {/* 6. Further Reading (optional) */}
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

        {/* 7. Where to Go Next */}
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
