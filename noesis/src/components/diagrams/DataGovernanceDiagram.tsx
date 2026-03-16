export function DataGovernanceDiagram() {
  return (
    <div
      className="w-full max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden"
      style={{ background: '#f8f8fa', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}
    >
      <svg
        viewBox="0 0 760 420"
        className="w-full"
        role="img"
        aria-label="Layered architecture diagram showing three governance layers — Foundation Policies, Stewards and Catalog, and Governance Council — with a Compliance panel showing GDPR, CCPA, BCBS 239, and HIPAA"
      >
        <defs>
          <filter id="cardShadow-dg" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
          </filter>
          <marker id="arrow-dg" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#0071e3" opacity="0.8" />
          </marker>
          <marker id="arrow-dg-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" opacity="0.7" />
          </marker>
          <style>{`
            @keyframes fadeInUp-dg {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes drawLine-dg {
              from { stroke-dashoffset: 300; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>

        {/* ── Layer 1: Foundation (bottom) ── */}
        <g style={{ animation: 'fadeInUp-dg 0.4s ease forwards', animationDelay: '0s' }}>
          <rect x={40} y={310} width={540} height={70} rx={10} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-dg)" />
          <text x={310} y={340} textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Policies &amp; Standards</text>
          <text x={310} y={360} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
            Data Definitions · Quality SLAs · Access Controls · Retention Rules
          </text>
        </g>

        {/* Arrow: Layer 1 → Layer 2 */}
        <line x1={310} y1={310} x2={310} y2={292}
          stroke="#0071e3" strokeWidth={2} opacity={0.7}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-dg)"
          style={{ animation: 'drawLine-dg 0.6s ease forwards', animationDelay: '0.1s' }}
        />

        {/* ── Layer 2: Management (middle) ── */}
        <g style={{ animation: 'fadeInUp-dg 0.4s ease forwards', animationDelay: '0.15s' }}>
          <rect x={40} y={210} width={540} height={80} rx={10} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-dg)" />
          <text x={310} y={242} textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Stewards &amp; Catalog</text>
          <text x={310} y={262} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
            Named Owners · Data Catalog · Lineage Tracking · Issue Escalation
          </text>
        </g>

        {/* Arrow: Layer 2 → Layer 3 */}
        <line x1={310} y1={210} x2={310} y2={192}
          stroke="#0071e3" strokeWidth={2} opacity={0.7}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-dg)"
          style={{ animation: 'drawLine-dg 0.6s ease forwards', animationDelay: '0.25s' }}
        />

        {/* ── Layer 3: Oversight (top) ── */}
        <g style={{ animation: 'fadeInUp-dg 0.4s ease forwards', animationDelay: '0.3s' }}>
          <rect x={40} y={110} width={540} height={80} rx={10} fill="#eff6ff" stroke="#0071e3" strokeWidth={1.5} filter="url(#cardShadow-dg)" />
          <text x={310} y={142} textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Governance Council</text>
          <text x={310} y={162} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
            Policy Decisions · Ownership Disputes · Standards Approval
          </text>
        </g>

        {/* ── Right: Compliance panel ── */}
        <g style={{ animation: 'fadeInUp-dg 0.4s ease forwards', animationDelay: '0.4s' }}>
          <rect x={620} y={110} width={110} height={270} rx={10} fill="#fff8f0" stroke="#f59e0b" strokeWidth={1.5} filter="url(#cardShadow-dg)" />
          <text x={675} y={135} textAnchor="middle" fill="#1d1d1f" fontSize={11} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Compliance</text>
          <text x={675} y={160} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">GDPR</text>
          <text x={675} y={185} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">CCPA</text>
          <text x={675} y={210} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">BCBS 239</text>
          <text x={675} y={235} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">HIPAA</text>
        </g>

        {/* Arrow: Governance Council → Compliance */}
        <line x1={580} y1={150} x2={618} y2={150}
          stroke="#f59e0b" strokeWidth={1.5} opacity={0.6}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-dg-amber)"
          style={{ animation: 'drawLine-dg 0.6s ease forwards', animationDelay: '0.5s' }}
        />

        {/* Layer labels on left side */}
        <text x={28} y={352} textAnchor="middle" fill="#6e6e73" fontSize={8} fontWeight={600}
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif"
          transform="rotate(-90, 28, 345)">FOUNDATION</text>
        <text x={28} y={255} textAnchor="middle" fill="#6e6e73" fontSize={8} fontWeight={600}
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif"
          transform="rotate(-90, 28, 250)">MANAGEMENT</text>
        <text x={28} y={155} textAnchor="middle" fill="#0071e3" fontSize={8} fontWeight={600}
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif"
          transform="rotate(-90, 28, 150)">OVERSIGHT</text>
      </svg>
    </div>
  );
}
