'use client';

import { useState } from 'react';

interface Step {
  technique: string;
  why: string;
  exampleChallenge: string;
}

interface Props {
  steps: Step[];
  color: string;
  domainSlug: string;
}

const STAGE_ICONS = ['📥', '🔀', '✅', '🛡️', '🔑', '📤'];

export function DomainDetailDiagram({ steps, color, domainSlug }: Props) {
  const [active, setActive] = useState<number>(0);
  const S = domainSlug.replace(/[^a-z0-9]/g, '');

  return (
    <div>
      <style>{`
        @keyframes drawArrow-${S} {
          from { stroke-dashoffset: 60; opacity: 0; }
          to   { stroke-dashoffset: 0;  opacity: 1; }
        }
        @keyframes fadeInStep-${S} {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ${steps.map((_, i) => `
          .dm-step-${S}-${i} { animation: fadeInStep-${S} 0.4s ease forwards; animation-delay: ${i * 0.12}s; opacity: 0; }
          .dm-arrow-${S}-${i} { stroke-dasharray: 60; stroke-dashoffset: 60; animation: drawArrow-${S} 0.3s ease forwards; animation-delay: ${0.1 + i * 0.12}s; }
        `).join('')}
      `}</style>

      {/* Horizontal flow — scrollable on mobile */}
      <div className="overflow-x-auto pb-3 mb-6">
        <div className="flex items-center gap-0 min-w-max">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => setActive(i)}
                className={[
                  `dm-step-${S}-${i}`,
                  'flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border transition-all duration-200 cursor-pointer min-w-[90px]',
                  active === i
                    ? 'shadow-[0_2px_12px_rgba(0,0,0,0.1)]'
                    : 'bg-white border-[var(--color-glass-border)] hover:border-opacity-60',
                ].join(' ')}
                style={active === i
                  ? { background: `${color}10`, borderColor: `${color}40` }
                  : { background: 'white', borderColor: '#e5e5e7' }
                }
              >
                <span className="text-lg">{STAGE_ICONS[i]}</span>
                <span
                  className="text-[10px] font-bold text-center leading-tight"
                  style={{ color: active === i ? color : 'var(--color-text-secondary)' }}
                >
                  {step.technique}
                </span>
              </button>
              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <svg width="28" height="16" viewBox="0 0 28 16" className="flex-shrink-0">
                  <line
                    x1="2" y1="8" x2="22" y2="8"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeOpacity="0.35"
                    className={`dm-arrow-${S}-${i}`}
                  />
                  <polyline
                    points="18,4 24,8 18,12"
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeOpacity="0.35"
                    strokeLinejoin="round"
                    className={`dm-arrow-${S}-${i}`}
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active step detail */}
      <div
        key={active}
        className="bg-white border rounded-2xl p-5 shadow-[var(--shadow-glass)]"
        style={{
          borderColor: `${color}25`,
          animation: 'fadeIn 0.25s ease',
        }}
      >
        <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }`}</style>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">{STAGE_ICONS[active]}</span>
          <span className="text-sm font-bold" style={{ color }}>{steps[active].technique}</span>
          <span className="text-xs text-[var(--color-text-muted)] font-mono">Stage {active + 1} of 6</span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">{steps[active].why}</p>
        <div className="bg-[rgba(0,0,0,0.03)] rounded-xl px-4 py-3 border border-[rgba(0,0,0,0.05)]">
          <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-1">Real Challenge</p>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed italic">&ldquo;{steps[active].exampleChallenge}&rdquo;</p>
        </div>
      </div>
    </div>
  );
}
