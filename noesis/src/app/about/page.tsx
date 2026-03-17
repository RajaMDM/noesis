import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Noesis — Built by a Practitioner, for Practitioners',
  description: 'Noesis was built by Raja Shahnawaz Soni — 20+ years in enterprise data management across retail, hospitality, and financial services.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Eyebrow */}
        <p className="text-xs font-mono text-[var(--color-accent-blue)] uppercase tracking-widest mb-6">About</p>

        {/* Hero statement */}
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight">
          Built by a practitioner.<br />For practitioners.
        </h1>

        <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-12 max-w-2xl">
          Noesis exists because the gap between &ldquo;understanding data management concepts&rdquo; and &ldquo;knowing what to actually do in a real enterprise&rdquo; is enormous — and almost nothing bridges it honestly.
        </p>

        {/* Origin story */}
        <div className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-8 shadow-[var(--shadow-glass)] mb-10">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">The problem this solves</h2>
          <div className="space-y-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              You can find a definition of Master Data Management in five seconds. What you can&apos;t easily find is: what does an MDM implementation actually look like in a post-acquisition retail integration? What breaks when your location hierarchy doesn&apos;t match your cost centre hierarchy? What does a Logistical Variant have to do with allergen compliance?
            </p>
            <p>
              Generic AI tools give generic answers. They&apos;ve read the same Wikipedia articles and vendor whitepapers you have. They don&apos;t know what it feels like to reconcile two supplier masters at 11pm before a go-live, or to explain to a CFO why the regional P&L is wrong because nobody updated the cost centre when the stores moved district.
            </p>
            <p className="font-semibold text-[var(--color-text-primary)]">
              Noesis is the resource I wanted when I was starting out — and still want now.
            </p>
          </div>
        </div>

        {/* Author card */}
        <div className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-8 shadow-[var(--shadow-glass)] mb-10">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(0,113,227,0.08)] flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-[var(--color-accent-blue)]">RS</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Raja Shahnawaz Soni</h2>
              <p className="text-sm text-[var(--color-accent-blue)] font-semibold mb-1">Senior Data Leader · MDM Architect</p>
              <p className="text-xs text-[var(--color-text-muted)]">20+ years in enterprise data management</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8">
            <p>
              I&apos;ve spent over two decades inside the data problems that most courses treat as solved. MDM implementations in retail and hospitality. Post-acquisition data integrations where two companies have never agreed on what a &apos;Customer&apos; is. Governance programmes that work — and ones that produce beautiful documentation nobody enforces.
            </p>
            <p>
              My background spans retail, F&B, financial services, and professional services — the domains that appear in Noesis&apos;s playbooks aren&apos;t academic examples. They&apos;re the actual environments where I&apos;ve had to make data management work under real constraints: budget pressure, legacy systems, and stakeholders who see data as IT&apos;s problem until it affects their numbers.
            </p>
          </div>

          {/* Credential chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: '🏪', label: 'Retail & Hospitality', detail: 'Location MDM, Menu & Recipe data, Store hierarchy governance' },
              { icon: '👥', label: 'Customer & Supplier MDM', detail: 'Golden record design, match/merge, post-acquisition integration' },
              { icon: '📊', label: 'Data Governance', detail: 'Policy design, stewardship models, regulatory compliance programmes' },
              { icon: '🔗', label: 'Enterprise Integration', detail: 'ERP, POS, CRM, loyalty platforms — and the data gaps between them' },
              { icon: '🤖', label: 'AI & Data', detail: 'Grounding LLMs in enterprise data, RAG architecture, AI readiness' },
              { icon: '📍', label: 'Location Intelligence', detail: 'YEXT, catchment analysis, digital listings governance' },
            ].map(cred => (
              <div key={cred.label} className="flex items-start gap-3 p-3 bg-[rgba(0,113,227,0.03)] rounded-xl border border-[rgba(0,113,227,0.08)]">
                <span className="text-lg flex-shrink-0">{cred.icon}</span>
                <div>
                  <p className="text-xs font-bold text-[var(--color-text-primary)] mb-0.5">{cred.label}</p>
                  <p className="text-xs text-[var(--color-text-muted)] leading-snug">{cred.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Noesis is not */}
        <div className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-8 shadow-[var(--shadow-glass)] mb-10">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-5">What Noesis is not</h2>
          <div className="space-y-3">
            {[
              ['Not a certification course', 'There are no badges. No completion certificates. No multiple choice questions about definitions you could look up in ten seconds.'],
              ['Not vendor-neutral for its own sake', 'Real tools are named — YEXT, D&B, SAP, Workday, Nutritics — because practitioners need to know what integrates with what, not just what abstract patterns look like.'],
              ['Not a chatbot with a knowledge base', 'The content is practitioner-authored. The AI chat deepens it. Neither replaces the other.'],
              ['Not finished', 'Noesis is a living platform. New domains, new scenarios, and new integrations will be added as the field evolves.'],
            ].map(([title, body]) => (
              <div key={title} className="flex items-start gap-3">
                <span className="text-[var(--color-accent-blue)] font-bold text-lg leading-none mt-0.5 flex-shrink-0">×</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-0.5">{title}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            Start with the concepts, go deep with the domain playbooks, or search for exactly what you need.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/topics/data-sources"
              className="px-5 py-2.5 rounded-xl bg-[var(--color-accent-blue)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start with Topics
            </Link>
            <Link
              href="/domains"
              className="px-5 py-2.5 rounded-xl border border-[var(--color-glass-border)] bg-white text-[var(--color-text-secondary)] text-sm font-semibold hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition-all"
            >
              Explore Domain Playbooks
            </Link>
            <Link
              href="/glossary"
              className="px-5 py-2.5 rounded-xl border border-[var(--color-glass-border)] bg-white text-[var(--color-text-secondary)] text-sm font-semibold hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition-all"
            >
              Browse Glossary
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
