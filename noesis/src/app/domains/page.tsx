import Link from 'next/link';
import { domains, parentDomains } from '@/lib/domains';
import { DomainMap } from '@/components/DomainMap';

export const metadata = {
  title: 'Domain Playbooks — Noesis',
  description: 'Data Management A-Z for the 5 master data domains: Party, Product, Location, Financial, Asset.',
};

export default function DomainsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-mono text-[var(--color-accent-blue)] uppercase tracking-widest mb-4">Domain Playbooks</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
            5 master data domains.<br />Everything in enterprise sits under one.
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Each playbook covers Data Management A-Z for that domain — not a generic overview, but the exact sources, quality challenges, governance issues, MDM considerations, and operational integrations that practitioners face.
          </p>
        </div>

        {/* Domain Map */}
        <div className="mb-16 bg-white rounded-2xl border border-[var(--color-glass-border)] shadow-[var(--shadow-glass)] p-6 sm:p-8">
          <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-1">Domain Relationship Map</h2>
          <p className="text-xs text-[var(--color-text-muted)] mb-6">Domains don&apos;t operate in isolation — every relationship line is a data quality dependency.</p>
          <DomainMap />
        </div>

        {/* Parent domain sections */}
        <div className="space-y-12">
          {parentDomains.map((parent) => {
            const subDomains = domains.filter(d => d.parentDomain === parent.id);
            return (
              <section key={parent.id}>
                {/* Parent header */}
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-2 h-8 rounded-full"
                      style={{ background: parent.color }}
                    />
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{parent.name}</h2>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-5 ml-0">{parent.tagline}</p>
                </div>

                {/* Sub-domain cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subDomains.map((domain) => {
                    const Icon = domain.icon;
                    return (
                      <div key={domain.slug} className="relative">
                        {domain.comingSoon ? (
                          <div className="block bg-white border border-[var(--color-glass-border)] rounded-2xl p-5 opacity-60">
                            <div className="flex items-start justify-between mb-4">
                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ background: `${domain.color}14` }}
                              >
                                <Icon className="w-4 h-4" style={{ color: domain.color }} />
                              </div>
                              <span
                                className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                                style={{ color: domain.color, background: `${domain.color}12` }}
                              >
                                Coming Soon
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">{domain.name}</h3>
                            <p className="text-xs text-[var(--color-text-secondary)] leading-snug">{domain.tagline}</p>
                          </div>
                        ) : (
                          <Link
                            href={`/domains/${domain.slug}`}
                            className="group block bg-white border border-[var(--color-glass-border)] rounded-2xl p-5 shadow-[var(--shadow-glass)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:border-opacity-50 transition-all duration-200"
                            style={{ '--hover-border': domain.color } as React.CSSProperties}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                style={{ background: `${domain.color}14` }}
                              >
                                <Icon className="w-4 h-4" style={{ color: domain.color }} />
                              </div>
                              <svg className="w-4 h-4 text-[var(--color-text-muted)] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                            <h3
                              className="text-sm font-bold text-[var(--color-text-primary)] mb-2 transition-colors"
                              style={{ '--tw-text-opacity': 1 } as React.CSSProperties}
                            >
                              <span className="group-hover:text-inherit" style={{ color: 'inherit' }}>
                                {domain.name}
                              </span>
                            </h3>
                            <p className="text-xs text-[var(--color-text-secondary)] leading-snug mb-4">{domain.tagline}</p>
                            <div className="flex flex-wrap gap-1">
                              {domain.dmTechniques.map(t => (
                                <span
                                  key={t}
                                  className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border"
                                  style={{ color: domain.color, borderColor: `${domain.color}30`, background: `${domain.color}08` }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-16 text-xs text-[var(--color-text-muted)] text-center">
          Each playbook covers the full Data Management journey: Sources → Integration → Quality → Governance → MDM → Reverse Integration.
          <br />The difference between domains is the substance of each step, not which steps exist.
        </p>

      </div>
    </div>
  );
}
