export function DataQualityDiagram() {
  return (
    <div
      className="w-full max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden"
      style={{ background: '#f8f8fa', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}
    >
      <svg
        viewBox="0 0 760 440"
        className="w-full"
        role="img"
        aria-label="Radial spoke diagram showing six data quality dimensions — Accuracy, Completeness, Consistency, Timeliness, Uniqueness, and Validity — radiating from a central Data Quality hub"
      >
        <defs>
          <filter id="cardShadow-dq" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
          </filter>
          <marker id="arrow-dq" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#0071e3" opacity="0.7" />
          </marker>
          <style>{`
            @keyframes fadeInUp-dq {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes drawLine-dq {
              from { stroke-dashoffset: 300; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>

        {/* ── Center hub ── */}
        <g style={{ animation: 'fadeInUp-dq 0.4s ease forwards', animationDelay: '0s' }}>
          <circle cx={380} cy={220} r={60} fill="#eff6ff" stroke="#0071e3" strokeWidth={2} filter="url(#cardShadow-dq)" />
          <text x={380} y={213} textAnchor="middle" fill="#1d1d1f" fontSize={14} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Data</text>
          <text x={380} y={233} textAnchor="middle" fill="#1d1d1f" fontSize={14} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Quality</text>
        </g>

        {/* ── Connector lines from center to each dimension node ── */}
        {/* Accuracy (top, 270°): center=380,220 → 380,50 */}
        <line x1={380} y1={160} x2={380} y2={70}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.3}
          strokeDasharray="300" strokeDashoffset="300"
          style={{ animation: 'drawLine-dq 0.6s ease forwards', animationDelay: '0.1s' }}
        />
        {/* Completeness (top-right, 330°): center=380,220 → 514,97 */}
        <line x1={432} y1={172} x2={507} y2={97}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.3}
          strokeDasharray="300" strokeDashoffset="300"
          style={{ animation: 'drawLine-dq 0.6s ease forwards', animationDelay: '0.15s' }}
        />
        {/* Consistency (bottom-right, 30°): center=380,220 → 514,343 */}
        <line x1={432} y1={268} x2={507} y2={343}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.3}
          strokeDasharray="300" strokeDashoffset="300"
          style={{ animation: 'drawLine-dq 0.6s ease forwards', animationDelay: '0.2s' }}
        />
        {/* Timeliness (bottom, 90°): center=380,220 → 380,390 */}
        <line x1={380} y1={280} x2={380} y2={370}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.3}
          strokeDasharray="300" strokeDashoffset="300"
          style={{ animation: 'drawLine-dq 0.6s ease forwards', animationDelay: '0.25s' }}
        />
        {/* Uniqueness (bottom-left, 150°): center=380,220 → 246,343 */}
        <line x1={328} y1={268} x2={253} y2={343}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.3}
          strokeDasharray="300" strokeDashoffset="300"
          style={{ animation: 'drawLine-dq 0.6s ease forwards', animationDelay: '0.3s' }}
        />
        {/* Validity (top-left, 210°): center=380,220 → 246,97 */}
        <line x1={328} y1={172} x2={253} y2={97}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.3}
          strokeDasharray="300" strokeDashoffset="300"
          style={{ animation: 'drawLine-dq 0.6s ease forwards', animationDelay: '0.35s' }}
        />

        {/* ── Dimension nodes ── */}

        {/* Accuracy (top): rect x=320, y=30, w=120, h=40 */}
        <g style={{ animation: 'fadeInUp-dq 0.4s ease forwards', animationDelay: '0.1s' }}>
          <rect x={320} y={30} width={120} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-dq)" />
          <text x={380} y={55} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Accuracy</text>
        </g>

        {/* Completeness (top-right): rect x=454, y=77, w=130, h=40 */}
        <g style={{ animation: 'fadeInUp-dq 0.4s ease forwards', animationDelay: '0.15s' }}>
          <rect x={454} y={77} width={130} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-dq)" />
          <text x={519} y={102} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Completeness</text>
        </g>

        {/* Consistency (bottom-right): rect x=454, y=323, w=130, h=40 */}
        <g style={{ animation: 'fadeInUp-dq 0.4s ease forwards', animationDelay: '0.2s' }}>
          <rect x={454} y={323} width={130} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-dq)" />
          <text x={519} y={348} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Consistency</text>
        </g>

        {/* Timeliness (bottom): rect x=320, y=370, w=120, h=40 */}
        <g style={{ animation: 'fadeInUp-dq 0.4s ease forwards', animationDelay: '0.25s' }}>
          <rect x={320} y={370} width={120} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-dq)" />
          <text x={380} y={395} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Timeliness</text>
        </g>

        {/* Uniqueness (bottom-left): rect x=176, y=323, w=120, h=40 */}
        <g style={{ animation: 'fadeInUp-dq 0.4s ease forwards', animationDelay: '0.3s' }}>
          <rect x={176} y={323} width={120} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-dq)" />
          <text x={236} y={348} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Uniqueness</text>
        </g>

        {/* Validity (top-left): rect x=176, y=77, w=110, h=40 */}
        <g style={{ animation: 'fadeInUp-dq 0.4s ease forwards', animationDelay: '0.35s' }}>
          <rect x={176} y={77} width={110} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-dq)" />
          <text x={231} y={102} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Validity</text>
        </g>
      </svg>
    </div>
  );
}
