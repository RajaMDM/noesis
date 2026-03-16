import Link from 'next/link';
import { domains } from '@/lib/domains';

export const metadata = {
  title: 'Domain Playbooks — Noesis',
  description: 'Data Management A-Z for the domains that matter: Customer, Location, Supplier, F&B, Apparel, Employee.',
};

export default function DomainsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-mono text-[var(--color-accent-blue)] uppercase tracking-widest mb-4">Domain Playbooks</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
            Data Management A-Z<br />for the domains that matter
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Generic concepts meet specific reality. Each playbook shows exactly which data management techniques apply — and why — for Customer, Location, Supplier, F&B, Apparel, and Employee data.
          </p>
          <p className="text-sm text-[var(--color-text-muted)] mt-3 italic">
            This is what separates a practitioner from a theorist.
          </p>
        </div>

        {/* Domain grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((domain) => {
            const { Icon } = { Icon: domain.icon };
            return (
              <Link
                key={domain.slug}
                href={`/domains/${domain.slug}`}
                className="group block bg-white border border-[var(--color-glass-border)] rounded-2xl p-6 shadow-[var(--shadow-glass)] hover:shadow-[0_4px_24px_rgba(0,113,227,0.12)] hover:border-[rgba(0,113,227,0.3)] transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${domain.color}14` }}
                >
                  <Icon className="w-5 h-5" style={{ color: domain.color }} />
                </div>
                <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-blue)] transition-colors">
                  {domain.name}
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] leading-snug mb-5">
                  {domain.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {domain.dmTechniques.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border"
                      style={{
                        color: domain.color,
                        borderColor: `${domain.color}30`,
                        background: `${domain.color}08`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
