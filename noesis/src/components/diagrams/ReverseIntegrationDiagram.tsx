export function ReverseIntegrationDiagram() {
  return (
    <div
      className="w-full max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden"
      style={{ background: '#f8f8fa', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}
    >
      <svg
        viewBox="0 0 760 380"
        className="w-full"
        role="img"
        aria-label="Bidirectional flow diagram showing traditional ETL into a Data Warehouse Intelligence Hub with AI Enrichment, then reverse ETL pushing scored segments to CRM, Marketing, Ad Platform, and Support tools"
      >
        <defs>
          <filter id="cardShadow-ri" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
          </filter>
          <marker id="arrow-ri" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#0071e3" opacity="0.7" />
          </marker>
          <marker id="arrow-ri-gray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#6e6e73" opacity="0.6" />
          </marker>
          <style>{`
            @keyframes fadeInUp-ri {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes drawLine-ri {
              from { stroke-dashoffset: 400; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>

        {/* ── Left: Source Systems ── */}
        <text x={90} y={45} textAnchor="middle" fontSize={10} fill="#6e6e73" fontWeight={600}
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Source Systems</text>

        <g style={{ animation: 'fadeInUp-ri 0.4s ease forwards', animationDelay: '0.1s' }}>
          <rect x={30} y={60} width={120} height={36} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ri)" />
          <text x={90} y={83} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">CRM System</text>
        </g>
        <g style={{ animation: 'fadeInUp-ri 0.4s ease forwards', animationDelay: '0.15s' }}>
          <rect x={30} y={116} width={120} height={36} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ri)" />
          <text x={90} y={139} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">ERP System</text>
        </g>
        <g style={{ animation: 'fadeInUp-ri 0.4s ease forwards', animationDelay: '0.2s' }}>
          <rect x={30} y={172} width={120} height={36} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ri)" />
          <text x={90} y={195} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Streams</text>
        </g>

        {/* ETL arrows: sources → warehouse */}
        <line x1={150} y1={78} x2={278} y2={165}
          stroke="#6e6e73" strokeWidth={1.5} opacity={0.5}
          strokeDasharray="6,3" strokeDashoffset="400"
          markerEnd="url(#arrow-ri-gray)"
          style={{ animation: 'drawLine-ri 0.6s ease forwards', animationDelay: '0.2s' }}
        />
        <line x1={150} y1={134} x2={278} y2={175}
          stroke="#6e6e73" strokeWidth={1.5} opacity={0.5}
          strokeDasharray="6,3" strokeDashoffset="400"
          markerEnd="url(#arrow-ri-gray)"
          style={{ animation: 'drawLine-ri 0.6s ease forwards', animationDelay: '0.2s' }}
        />
        <line x1={150} y1={190} x2={278} y2={185}
          stroke="#6e6e73" strokeWidth={1.5} opacity={0.5}
          strokeDasharray="6,3" strokeDashoffset="400"
          markerEnd="url(#arrow-ri-gray)"
          style={{ animation: 'drawLine-ri 0.6s ease forwards', animationDelay: '0.2s' }}
        />

        {/* ── Center: Data Warehouse / Intelligence Hub ── */}
        <g style={{ animation: 'fadeInUp-ri 0.4s ease forwards', animationDelay: '0s' }}>
          <rect x={280} y={130} width={200} height={80} rx={12} fill="#eff6ff" stroke="#0071e3" strokeWidth={2} filter="url(#cardShadow-ri)" />
          {/* AI Enrichment badge */}
          <rect x={300} y={125} width={120} height={20} rx={10} fill="#0071e3" />
          <text x={360} y={136} textAnchor="middle" fill="#ffffff" fontSize={9} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">AI Enrichment Layer</text>
          <text x={380} y={162} textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Data Warehouse</text>
          <text x={380} y={182} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Intelligence Hub</text>
        </g>

        {/* ── Right: Destination Tools ── */}
        <text x={670} y={35} textAnchor="middle" fontSize={10} fill="#6e6e73" fontWeight={600}
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Activated in Tools</text>

        <g style={{ animation: 'fadeInUp-ri 0.4s ease forwards', animationDelay: '0.3s' }}>
          <rect x={610} y={50} width={120} height={36} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ri)" />
          <text x={670} y={73} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">CRM</text>
        </g>
        <g style={{ animation: 'fadeInUp-ri 0.4s ease forwards', animationDelay: '0.35s' }}>
          <rect x={610} y={107} width={120} height={36} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ri)" />
          <text x={670} y={130} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Marketing</text>
        </g>
        <g style={{ animation: 'fadeInUp-ri 0.4s ease forwards', animationDelay: '0.4s' }}>
          <rect x={610} y={164} width={120} height={36} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ri)" />
          <text x={670} y={187} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Ad Platform</text>
        </g>
        <g style={{ animation: 'fadeInUp-ri 0.4s ease forwards', animationDelay: '0.45s' }}>
          <rect x={610} y={221} width={120} height={36} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ri)" />
          <text x={670} y={244} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Support Tool</text>
        </g>

        {/* ── Reverse ETL arrows: warehouse → destinations ── */}
        {/* → CRM */}
        <line x1={480} y1={163} x2={608} y2={68}
          stroke="#0071e3" strokeWidth={2} opacity={0.7}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-ri)"
          style={{ animation: 'drawLine-ri 0.6s ease forwards', animationDelay: '0.4s' }}
        />
        <text x={543} y={103} fontSize={9} fill="#0071e3" opacity={0.85} textAnchor="middle"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">LTV Score</text>

        {/* → Marketing */}
        <line x1={480} y1={168} x2={608} y2={125}
          stroke="#0071e3" strokeWidth={2} opacity={0.7}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-ri)"
          style={{ animation: 'drawLine-ri 0.6s ease forwards', animationDelay: '0.5s' }}
        />
        <text x={547} y={143} fontSize={9} fill="#0071e3" opacity={0.85} textAnchor="middle"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Segments</text>

        {/* → Ad Platform */}
        <line x1={480} y1={178} x2={608} y2={182}
          stroke="#0071e3" strokeWidth={2} opacity={0.7}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-ri)"
          style={{ animation: 'drawLine-ri 0.6s ease forwards', animationDelay: '0.55s' }}
        />
        <text x={544} y={172} fontSize={9} fill="#0071e3" opacity={0.85} textAnchor="middle"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Propensity</text>

        {/* → Support Tool */}
        <line x1={480} y1={183} x2={608} y2={239}
          stroke="#0071e3" strokeWidth={2} opacity={0.7}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-ri)"
          style={{ animation: 'drawLine-ri 0.6s ease forwards', animationDelay: '0.6s' }}
        />
        <text x={543} y={222} fontSize={9} fill="#0071e3" opacity={0.85} textAnchor="middle"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Risk Score</text>
      </svg>
    </div>
  );
}
