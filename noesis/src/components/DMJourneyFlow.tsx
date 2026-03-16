'use client';

import { useState } from 'react';

interface Stage {
  technique: string;
  why: string;
}

interface DMJourneyFlowProps {
  stages: Stage[];
  color: string; // domain accent colour, e.g. '#0071e3'
}

const STAGE_META: Record<string, { icon: string; shortLabel: string }> = {
  'Data Sources':            { icon: '📥', shortLabel: 'Sources' },
  'Data Integration':        { icon: '🔄', shortLabel: 'Integration' },
  'Data Quality':            { icon: '✅', shortLabel: 'Quality' },
  'Data Governance':         { icon: '🏛️', shortLabel: 'Governance' },
  'Master Data Management':  { icon: '🔑', shortLabel: 'MDM' },
  'Reverse Integration':     { icon: '📤', shortLabel: 'Publication' },
};

export function DMJourneyFlow({ stages, color }: DMJourneyFlowProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      {/* Inject keyframe animations */}
      <style>{`
        @keyframes dmStageIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dmArrowDraw {
          from { stroke-dashoffset: 40; opacity: 0; }
          to   { stroke-dashoffset: 0;  opacity: 1; }
        }
        @keyframes dmDetailIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dm-stage {
          animation: dmStageIn 0.35s ease both;
        }
        .dm-arrow {
          animation: dmArrowDraw 0.25s ease both;
        }
        .dm-detail {
          animation: dmDetailIn 0.2s ease both;
        }
      `}</style>

      {/* Scrollable pipeline row */}
      <div className="overflow-x-auto -mx-4 px-4 pb-2">
        <div className="flex items-center min-w-max gap-0">
          {stages.map((stage, i) => {
            const meta = STAGE_META[stage.technique] ?? { icon: '⚙️', shortLabel: stage.technique };
            const isActive = active === i;

            return (
              <div key={stage.technique} className="flex items-center">
                {/* Stage box */}
                <button
                  onClick={() => setActive(isActive ? null : i)}
                  className="dm-stage flex flex-col items-center gap-2 w-[96px] px-3 py-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex-shrink-0 focus:outline-none"
                  style={{
                    animationDelay: `${i * 90}ms`,
                    borderColor: isActive ? color : '#e5e5e7',
                    background: isActive ? `${color}0d` : '#ffffff',
                    boxShadow: isActive
                      ? `0 4px 20px ${color}25`
                      : '0 1px 6px rgba(0,0,0,0.06)',
                    transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                  aria-pressed={isActive}
                >
                  <span className="text-xl leading-none" role="img" aria-label={meta.shortLabel}>
                    {meta.icon}
                  </span>
                  <span
                    className="text-[10px] font-bold text-center leading-tight"
                    style={{ color: isActive ? color : '#6e6e73' }}
                  >
                    {meta.shortLabel}
                  </span>
                </button>

                {/* Animated connecting arrow (not after last item) */}
                {i < stages.length - 1 && (
                  <div className="flex items-center flex-shrink-0 px-1.5">
                    <svg
                      width="28"
                      height="14"
                      viewBox="0 0 28 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="dm-arrow"
                      style={{ animationDelay: `${i * 90 + 70}ms` }}
                    >
                      <path
                        d="M2 7 L22 7 M16 2 L22 7 L16 12"
                        stroke={color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="40"
                        strokeDashoffset="0"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded detail panel */}
      {active !== null && (
        <div
          className="dm-detail mt-4 rounded-2xl border px-5 py-4"
          style={{
            borderColor: `${color}25`,
            background: `${color}06`,
          }}
        >
          <p className="text-xs font-bold mb-2" style={{ color }}>
            {STAGE_META[stages[active].technique]?.icon ?? '⚙️'}&nbsp;&nbsp;
            {stages[active].technique}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {stages[active].why}
          </p>
        </div>
      )}

      {/* Tap hint */}
      {active === null && (
        <p className="text-[10px] text-[var(--color-text-muted)] mt-2 text-center">
          Tap any stage to see how it applies to this domain
        </p>
      )}
    </div>
  );
}
