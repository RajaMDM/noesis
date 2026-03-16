'use client';

import { useState } from 'react';

const DIMS = [
  {
    id: 'accuracy',
    label: 'Accuracy',
    icon: '🎯',
    color: '#0071e3',
    angle: 0,
    def: 'Does the data correctly reflect the real-world entity it represents?',
    example: 'Customer address shows Dubai, but they moved to Abu Dhabi 6 months ago — technically filled, factually wrong.',
    mistake: 'Assuming data from a trusted source is automatically accurate. Validate against authoritative systems.',
  },
  {
    id: 'completeness',
    label: 'Completeness',
    icon: '🧩',
    color: '#059669',
    angle: 1,
    def: 'Are all required fields populated with meaningful values?',
    example: 'Customer record with no email address — 80% complete, but unusable for digital marketing.',
    mistake: 'Confusing completeness with accuracy. A field can be filled with "N/A" and be complete but not valid.',
  },
  {
    id: 'consistency',
    label: 'Consistency',
    icon: '🔄',
    color: '#d97706',
    angle: 2,
    def: 'Is the same data represented the same way across all systems?',
    example: 'CRM shows DOB as 1990-01-15. ERP shows 15/01/90. Same person, same fact — different format, different risk.',
    mistake: 'Treating consistency as a formatting issue only. It\'s also about conflicting values across systems.',
  },
  {
    id: 'uniqueness',
    label: 'Uniqueness',
    icon: '☝️',
    color: '#e11d48',
    angle: 3,
    def: 'Is each real-world entity represented exactly once — no duplicates?',
    example: '"John Smith" and "J. Smith" in the same CRM — two records, one person, one corrupted analytics view.',
    mistake: 'Treating deduplication as a one-time project. Duplicates re-enter continuously from source systems.',
  },
  {
    id: 'validity',
    label: 'Validity',
    icon: '✅',
    color: '#6d28d9',
    angle: 4,
    def: 'Does the data conform to required formats, types, and domain rules?',
    example: 'Email field containing "N/A" — completeness check passes, validity check fails.',
    mistake: 'Conflating validity with accuracy. Data can be in a valid format but still factually wrong.',
  },
  {
    id: 'timeliness',
    label: 'Timeliness',
    icon: '⏱️',
    color: '#0891b2',
    angle: 5,
    def: 'Is the data current enough for its intended use?',
    example: 'Contact data last refreshed 2 years ago — technically correct history, practically useless for outreach.',
    mistake: 'Focusing on recency without defining what "timely enough" means for the specific use case.',
  },
];

export function DataQualityDiagram() {
  const [selected, setSelected] = useState<string | null>(null);

  const cx = 160, cy = 160, R = 120, r = 44;
  const n = DIMS.length;

  const selectedDim = DIMS.find(d => d.id === selected);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden" style={{ background: '#f8f8fa', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
      <div style={{ padding: 24 }}>
        <p style={{ fontSize: 10, color: '#0071e3', letterSpacing: 2, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>
          🔬 The 6 Data Quality Dimensions — click any segment
        </p>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* SVG Wheel */}
          <svg width="320" height="320" viewBox="0 0 320 320" style={{ flex: '0 0 320px', cursor: 'pointer' }} role="img" aria-label="Interactive data quality dimensions wheel">
            <defs>
              <filter id="segShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.12)" />
              </filter>
            </defs>
            {DIMS.map((d, i) => {
              const a1 = (i / n) * Math.PI * 2 - Math.PI / 2;
              const a2 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
              const midAngle = (a1 + a2) / 2;
              // Outer arc points
              const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
              const x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
              // Inner arc points
              const xi1 = cx + r * Math.cos(a1), yi1 = cy + r * Math.sin(a1);
              const xi2 = cx + r * Math.cos(a2), yi2 = cy + r * Math.sin(a2);
              // Label position
              const lx = cx + (R + r) / 2 * Math.cos(midAngle);
              const ly = cy + (R + r) / 2 * Math.sin(midAngle);
              const isSelected = selected === d.id;

              return (
                <g key={d.id} onClick={() => setSelected(selected === d.id ? null : d.id)} style={{ cursor: 'pointer' }}>
                  <path
                    d={`M ${xi1} ${yi1} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} L ${xi2} ${yi2} A ${r} ${r} 0 0 0 ${xi1} ${yi1}`}
                    fill={isSelected ? d.color : d.color + '22'}
                    stroke="white"
                    strokeWidth="3"
                    style={{
                      transition: 'all 0.2s',
                      filter: isSelected ? `drop-shadow(0 4px 8px ${d.color}55)` : 'none',
                    }}
                  />
                  <text x={lx} y={ly - 8} textAnchor="middle" fontSize="18" style={{ pointerEvents: 'none' }}>{d.icon}</text>
                  <text x={lx} y={ly + 10} textAnchor="middle" fontSize="9" fontWeight="700"
                    fill={isSelected ? 'white' : d.color}
                    fontFamily="system-ui, -apple-system, sans-serif"
                    style={{ pointerEvents: 'none' }}>
                    {d.label}
                  </text>
                </g>
              );
            })}
            {/* Center hub */}
            <circle cx={cx} cy={cy} r={r - 4} fill="white" stroke="#e5e5e7" strokeWidth="1.5" />
            <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18">🔬</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fontWeight="700" fill="#6e6e73" fontFamily="system-ui, -apple-system, sans-serif">DQ</text>
          </svg>

          {/* Detail panel */}
          <div style={{ flex: 1, minWidth: 200 }}>
            {selectedDim ? (
              <div style={{ background: 'white', border: `2px solid ${selectedDim.color}30`, borderRadius: 16, padding: 20, animation: 'fadeInDetail 0.2s ease' }}>
                <style>{`@keyframes fadeInDetail { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{selectedDim.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: selectedDim.color, marginBottom: 14, fontFamily: 'system-ui' }}>{selectedDim.label}</div>

                <div style={{ fontSize: 10, fontWeight: 700, color: '#86868b', letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>Definition</div>
                <div style={{ fontSize: 13, color: '#1d1d1f', marginBottom: 14, lineHeight: 1.7 }}>{selectedDim.def}</div>

                <div style={{ fontSize: 10, fontWeight: 700, color: '#86868b', letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>Real-world example</div>
                <div style={{ fontSize: 13, color: '#6e6e73', marginBottom: 14, lineHeight: 1.7, fontStyle: 'italic' }}>{selectedDim.example}</div>

                <div style={{ fontSize: 10, fontWeight: 700, color: '#e11d48', letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>⚠️ Common mistake</div>
                <div style={{ fontSize: 13, color: '#e11d48', lineHeight: 1.7 }}>{selectedDim.mistake}</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#86868b', paddingTop: 60 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>👆</div>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>Click any segment to explore that dimension — definition, real-world example, and the mistake everyone makes.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
