import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { domains, parentDomains } from '@/lib/domains';
import { domainContent } from '@/lib/domain-content';
import { ChatPanel } from '@/components/ChatPanel';
import { DomainDetailDiagram } from '@/components/DomainDetailDiagram';

export async function generateStaticParams() {
  return domains.filter(d => !d.comingSoon).map(d => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = domains.find(d => d.slug === slug);
  if (!domain) return {};
  return { title: `${domain.name} — Data Management A-Z — Noesis`, description: domain.tagline };
}

export default async function DomainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = domains.find(d => d.slug === slug);
  const content = domainContent[slug];
  if (!domain || !content) notFound();

  const Icon = domain.icon;
  const parent = parentDomains.find(p => p.id === domain.parentDomain)!;

  return (
    <div className="min-h-screen bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs text-[var(--color-text-muted)]">
          <Link href="/domains" className="hover:text-[var(--color-accent-blue)] transition-colors">Domain Playbooks</Link>
          <span>/</span>
          <span style={{ color: domain.color }}>{parent.name}</span>
          <span>/</span>
          <span className="text-[var(--color-text-secondary)]">{content.name}</span>
        </div>

        {/* Header */}
        <div className="mb-14">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${domain.color}14` }}>
            <Icon className="w-7 h-7" style={{ color: domain.color }} />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: domain.color }}>
            Data Management A-Z · {parent.name}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">{content.name}</h1>
          <p className="text-xl font-semibold mb-4" style={{ color: domain.color }}>{content.tagline}</p>
          <p className="text-sm text-[var(--color-text-secondary)] italic leading-relaxed bg-white border rounded-xl px-5 py-4 max-w-2xl shadow-[var(--shadow-glass)]" style={{ borderColor: `${domain.color}20` }}>
            {content.analogy}
          </p>
        </div>

        {/* Entity Landscape */}
        <section className="mb-14">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Entity Landscape</h2>
            <p className="text-sm text-[var(--color-text-muted)]">The core data objects in this domain — with real examples from Noesis Foods Group</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.entities.map((entity) => (
              <div key={entity.name} className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-5 shadow-[var(--shadow-glass)]">
                <p className="text-sm font-bold mb-2" style={{ color: domain.color }}>{entity.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">{entity.definition}</p>
                <div className="bg-[rgba(0,0,0,0.03)] rounded-lg px-3 py-2 border border-[rgba(0,0,0,0.06)]">
                  <p className="text-[10px] font-mono text-[var(--color-text-secondary)] leading-relaxed">{entity.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Hierarchy */}
        <section className="mb-14">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Data Hierarchy</h2>
            <p className="text-sm text-[var(--color-text-muted)]">How records relate to each other — from root entity to leaf node</p>
          </div>
          <div className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-6 shadow-[var(--shadow-glass)]">
            <div className="space-y-1.5">
              {content.hierarchy.map((node, i) => {
                const indent = node.level * 20;
                const isRoot = node.level === 0;
                const connector = node.level === 0 ? '◆' : node.level === 1 ? '├─' : node.level === 2 ? '│  ├─' : node.level === 3 ? '│  │  ├─' : '│  │  │  └─';
                return (
                  <div key={i} className="flex items-start gap-0" style={{ paddingLeft: `${indent}px` }}>
                    <span
                      className="text-xs font-mono flex-shrink-0 mr-2 mt-0.5"
                      style={{ color: isRoot ? domain.color : '#c7c7c9' }}
                    >
                      {connector}
                    </span>
                    <div className="flex flex-wrap items-baseline gap-2 min-w-0">
                      <span
                        className={`text-sm font-${isRoot ? 'bold' : node.level === 1 ? 'semibold' : 'medium'}`}
                        style={{ color: isRoot ? domain.color : 'var(--color-text-primary)' }}
                      >
                        {node.name}
                      </span>
                      {node.description && (
                        <span className="text-xs text-[var(--color-text-muted)] italic">— {node.description}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DM Journey — animated pipeline */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Data Management Journey</h2>
            <p className="text-sm text-[var(--color-text-muted)]">All 6 stages — what each means specifically for {content.name} data</p>
          </div>
          <DomainDetailDiagram steps={content.dmJourney} color={domain.color} domainSlug={slug} />
        </section>

        {/* Cross-domain relationships */}
        <section className="mb-14">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Connected Domains</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Data flows that cross domain boundaries — and what breaks when they&apos;re dirty</p>
          </div>
          <div className="space-y-3">
            {content.crossDomainRelationships.map((rel) => (
              <div key={rel.targetSlug} className="bg-white border border-[var(--color-glass-border)] rounded-xl p-4 sm:p-5 shadow-[var(--shadow-glass)]">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ color: domain.color, background: `${domain.color}12` }}>
                    {content.name}
                  </span>
                  <svg className="w-3 h-3 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <Link
                    href={`/domains/${rel.targetSlug}`}
                    className="text-xs font-bold px-2 py-1 rounded-lg hover:opacity-80 transition-opacity"
                    style={{ color: '#6e6e73', background: 'rgba(0,0,0,0.05)' }}
                  >
                    {rel.targetName} ↗
                  </Link>
                </div>
                <p className="text-xs font-mono text-[var(--color-text-secondary)] mb-2 leading-relaxed">{rel.dataFlow}</p>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">⚠</span>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed italic">{rel.withoutThis}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Operational Integrations */}
        <section className="mb-14">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Operational Integrations</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Real tools and data services that create, consume, or enrich {content.name} data</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.integrations.map((integration) => (
              <div key={integration.name} className="bg-white border border-[var(--color-glass-border)] rounded-xl p-4 shadow-[var(--shadow-glass)]">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">{integration.name}</p>
                  <span className="flex-shrink-0 text-[9px] font-mono px-2 py-0.5 rounded-full" style={{ color: domain.color, background: `${domain.color}10` }}>
                    {integration.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{integration.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Burning Scenarios */}
        <section className="mb-14">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Burning Scenarios</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Recognise one of these? Explore the data management response with AI below.</p>
          </div>
          <div className="space-y-4">
            {content.scenarios.map((scenario, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden border px-6 py-6"
                style={{ background: `linear-gradient(135deg, ${domain.color}06, ${domain.color}02)`, borderColor: `${domain.color}20` }}
              >
                <span className="text-5xl font-serif opacity-10 leading-none block -mb-2 select-none" style={{ color: domain.color }}>&ldquo;</span>
                <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-3">{scenario.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">{scenario.narrative}</p>
                <div className="flex flex-wrap gap-1.5">
                  {scenario.dmConcepts.map(c => (
                    <span key={c} className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{ color: domain.color, borderColor: `${domain.color}30`, background: `${domain.color}08` }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ChatPanel */}
        <section className="mb-14">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Explore with AI</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Ask your AI tutor to walk you through any scenario, concept, or integration above.</p>
          </div>
          <ChatPanel slug={`domain-${slug}`} topicTitle={`${content.name} — Data Management A-Z`} />
        </section>

        {/* Footer */}
        <div className="pt-8 border-t border-[var(--color-glass-border)] flex items-center justify-between">
          <Link href="/domains" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            All Playbooks
          </Link>
          <Link href="/" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] transition-colors">
            Core Topics →
          </Link>
        </div>

      </div>
    </div>
  );
}
