import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { domains } from '@/lib/domains';
import { domainContent } from '@/lib/domain-content';
import { ChatPanel } from '@/components/ChatPanel';

export async function generateStaticParams() {
  return domains.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = domains.find((d) => d.slug === slug);
  if (!domain) return {};
  return {
    title: `${domain.name} Domain Playbook — Noesis`,
    description: domain.tagline,
  };
}

export default async function DomainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = domains.find((d) => d.slug === slug);
  const content = domainContent[slug];
  if (!domain || !content) notFound();

  const { Icon } = { Icon: domain.icon };

  return (
    <div className="min-h-screen bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          href="/domains"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Domain Playbooks
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: `${domain.color}14` }}
          >
            <Icon className="w-7 h-7" style={{ color: domain.color }} />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: domain.color }}>
            Domain Playbook
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
            {content.name}
          </h1>
          <p className="text-xl font-semibold mb-3" style={{ color: domain.color }}>
            {content.tagline}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] italic leading-relaxed bg-[rgba(0,113,227,0.04)] border border-[rgba(0,113,227,0.1)] rounded-xl px-4 py-3 max-w-2xl">
            {content.analogy}
          </p>
        </div>

        {/* Entity Landscape */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Entity Landscape</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-5">The core data objects in this domain</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.entities.map((entity) => (
              <div
                key={entity.name}
                className="bg-white border border-[var(--color-glass-border)] rounded-xl p-4 shadow-[var(--shadow-glass)]"
              >
                <p
                  className="text-sm font-bold mb-1"
                  style={{ color: domain.color }}
                >
                  {entity.name}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {entity.definition}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DM Journey */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Data Management Journey</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-5">Not every domain needs the full stack — here&apos;s what matters here</p>
          <div className="space-y-3">
            {content.dmJourney.map((step) => (
              <div
                key={step.technique}
                className="flex gap-4 bg-white border border-[var(--color-glass-border)] rounded-xl p-5 shadow-[var(--shadow-glass)]"
              >
                <span
                  className="flex-shrink-0 text-xs font-bold font-mono px-2.5 py-1 rounded-lg h-fit mt-0.5"
                  style={{ color: domain.color, background: `${domain.color}12` }}
                >
                  {step.technique}
                </span>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.why}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Operational Integrations */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Operational Integrations</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-5">Real tools and data services that create, consume, or enrich this domain&apos;s data</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.integrations.map((integration) => (
              <div
                key={integration.name}
                className="bg-white border border-[var(--color-glass-border)] rounded-xl p-4 shadow-[var(--shadow-glass)]"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">{integration.name}</p>
                  <span
                    className="flex-shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{ color: domain.color, background: `${domain.color}10` }}
                  >
                    {integration.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {integration.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Burning Scenarios */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Burning Scenarios</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-5">Real problems — recognise yours, then explore with AI</p>
          <div className="space-y-4">
            {content.scenarios.map((scenario, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden border px-7 py-7"
                style={{
                  background: `linear-gradient(135deg, ${domain.color}06, ${domain.color}02)`,
                  borderColor: `${domain.color}20`,
                }}
              >
                <span
                  className="text-5xl font-serif opacity-15 leading-none block -mb-3 -mt-1 select-none"
                  style={{ color: domain.color }}
                >&quot;</span>
                <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-3">
                  {scenario.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
                  {scenario.narrative}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {scenario.dmConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border"
                      style={{ color: domain.color, borderColor: `${domain.color}30`, background: `${domain.color}08` }}
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chat Panel */}
        <section className="mb-12">
          <p className="text-sm text-[var(--color-text-muted)] mb-5 italic">
            Recognise one of these scenarios? Ask the AI tutor to walk you through the exact data management steps.
          </p>
          <ChatPanel slug={`domain-${slug}`} topicTitle={`${content.name} Domain`} />
        </section>

        {/* Footer nav */}
        <div className="pt-8 border-t border-[var(--color-glass-border)] flex items-center justify-between">
          <Link
            href="/domains"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] transition-colors"
          >
            ← All Playbooks
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] transition-colors"
          >
            Core Topics →
          </Link>
        </div>

      </div>
    </div>
  );
}
