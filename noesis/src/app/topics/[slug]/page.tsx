import { notFound } from 'next/navigation';
import Link from 'next/link';
import { topics } from '@/lib/topics';
import { Button } from '@/components/Button';
import { ArrowLeft } from 'lucide-react';

// Pre-generate all 7 topic pages at build time (required for static export)
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

  if (!topic) notFound();

  const { Icon, title, description } = topic;

  return (
    <div className="min-h-screen bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all topics
        </Link>

        {/* Topic header */}
        <div className="mb-12">
          <div className="mb-6 text-[var(--color-accent-blue)]">
            <Icon className="w-12 h-12" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Content placeholder — Phase 2 will replace this */}
        <div className="border border-dashed border-[var(--color-glass-border)] rounded-[var(--radius-md)] p-12 text-center">
          <p className="text-[var(--color-text-muted)] text-lg mb-2">Content coming in Phase 2</p>
          <p className="text-[var(--color-text-muted)] text-sm">
            Curated explanations, visual aids, embedded video, and AI-guided exploration.
          </p>
        </div>

        {/* Navigation to other topics — Link-wrapping pattern (Button has no asChild) */}
        <div className="mt-12 pt-8 border-t border-[var(--color-glass-border)]">
          <Link href="/">
            <Button variant="outline">Explore Other Topics</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
