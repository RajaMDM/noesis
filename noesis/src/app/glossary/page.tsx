import { glossaryTerms, GlossaryCategory } from '@/lib/glossary';
import { GlossaryClient } from '@/components/GlossaryClient';

export const metadata = {
  title: 'Data Management Glossary — Noesis',
  description: '80+ practitioner-level definitions across MDM, Data Quality, Integration, Governance, and domain-specific terms.',
};

export default function GlossaryPage() {
  const categories = [...new Set(glossaryTerms.map(t => t.category))] as GlossaryCategory[];
  const sorted = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));
  const letters = [...new Set(sorted.map(t => t.term[0].toUpperCase()))].sort();

  return (
    <div className="min-h-screen bg-[var(--color-noir)] px-4 sm:px-6 md:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-mono text-[var(--color-accent-blue)] uppercase tracking-widest mb-4">Reference</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
            Data Management<br />Glossary
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {glossaryTerms.length}+ practitioner-level definitions — MDM, Data Quality, Integration, Governance, and domain-specific terms from F&amp;B, Apparel, Location, and Finance.
          </p>
          <p className="text-sm text-[var(--color-text-muted)] mt-2 italic">
            Not synthesised. Every definition written from enterprise experience.
          </p>
        </div>

        {/* Client component handles search + filter */}
        <GlossaryClient terms={sorted} categories={categories} letters={letters} />
      </div>
    </div>
  );
}
