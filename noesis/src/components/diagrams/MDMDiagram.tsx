export function MDMDiagram() {
  return (
    <div
      className="w-full max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden"
      style={{ background: '#f8f8fa', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}
    >
      <svg
        viewBox="0 0 760 480"
        className="w-full"
        role="img"
        aria-label="Hub and spoke diagram showing Master Data Management with a central Golden Record Hub connected bidirectionally to CRM, ERP, eCommerce, Finance, HR, and Marketing systems"
      >
        <defs>
          <filter id="cardShadow-mdm" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
          </filter>
          <marker id="arrow-mdm" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#0071e3" opacity="0.7" />
          </marker>
          <marker id="arrow-mdm-rev" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
            <path d="M8,0 L8,6 L0,3 z" fill="#0071e3" opacity="0.7" />
          </marker>
          <style>{`
            @keyframes fadeInUp-mdm {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes drawLine-mdm {
              from { stroke-dashoffset: 400; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>

        {/* Title */}
        <text x={380} y={25} textAnchor="middle" fontSize={11} fill="#6e6e73"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
          Master Data Management — Hub and Spoke Model
        </text>

        {/* ── Central Hub ── */}
        <g style={{ animation: 'fadeInUp-mdm 0.4s ease forwards', animationDelay: '0s' }}>
          <rect x={280} y={180} width={200} height={80} rx={12} fill="#eff6ff" stroke="#0071e3" strokeWidth={2} filter="url(#cardShadow-mdm)" />
          <text x={380} y={212} textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Golden Record Hub</text>
          <text x={380} y={234} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Match · Merge · Distribute</text>
        </g>

        {/* ── Left spoke nodes ── */}
        {/* CRM */}
        <g style={{ animation: 'fadeInUp-mdm 0.4s ease forwards', animationDelay: '0.1s' }}>
          <rect x={40} y={40} width={100} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-mdm)" />
          <text x={90} y={65} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">CRM</text>
        </g>
        {/* ERP */}
        <g style={{ animation: 'fadeInUp-mdm 0.4s ease forwards', animationDelay: '0.15s' }}>
          <rect x={40} y={200} width={100} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-mdm)" />
          <text x={90} y={225} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">ERP</text>
        </g>
        {/* eCommerce */}
        <g style={{ animation: 'fadeInUp-mdm 0.4s ease forwards', animationDelay: '0.2s' }}>
          <rect x={40} y={360} width={100} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-mdm)" />
          <text x={90} y={385} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">eCommerce</text>
        </g>

        {/* ── Right spoke nodes ── */}
        {/* Finance */}
        <g style={{ animation: 'fadeInUp-mdm 0.4s ease forwards', animationDelay: '0.1s' }}>
          <rect x={620} y={40} width={100} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-mdm)" />
          <text x={670} y={65} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Finance</text>
        </g>
        {/* HR */}
        <g style={{ animation: 'fadeInUp-mdm 0.4s ease forwards', animationDelay: '0.15s' }}>
          <rect x={620} y={200} width={100} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-mdm)" />
          <text x={670} y={225} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">HR</text>
        </g>
        {/* Marketing */}
        <g style={{ animation: 'fadeInUp-mdm 0.4s ease forwards', animationDelay: '0.2s' }}>
          <rect x={620} y={360} width={100} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-mdm)" />
          <text x={670} y={385} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Marketing</text>
        </g>

        {/* ── Bidirectional connectors ── */}
        {/* CRM ↔ Hub: spoke→hub (solid), hub→spoke (dashed) */}
        {/* CRM → Hub */}
        <line x1={140} y1={57} x2={278} y2={207}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.6}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.25s' }}
        />
        {/* Hub → CRM */}
        <line x1={282} y1={203} x2={144} y2={61}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.35}
          strokeDasharray="6,4" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.3s' }}
        />

        {/* ERP → Hub */}
        <line x1={140} y1={220} x2={278} y2={220}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.6}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.3s' }}
        />
        {/* Hub → ERP */}
        <line x1={280} y1={225} x2={142} y2={225}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.35}
          strokeDasharray="6,4" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.35s' }}
        />

        {/* eCommerce → Hub */}
        <line x1={140} y1={373} x2={278} y2={233}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.6}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.35s' }}
        />
        {/* Hub → eCommerce */}
        <line x1={282} y1={237} x2={144} y2={377}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.35}
          strokeDasharray="6,4" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.4s' }}
        />

        {/* Finance ↔ Hub */}
        {/* Finance → Hub */}
        <line x1={620} y1={57} x2={482} y2={207}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.6}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.25s' }}
        />
        {/* Hub → Finance */}
        <line x1={478} y1={203} x2={616} y2={61}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.35}
          strokeDasharray="6,4" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.3s' }}
        />

        {/* HR → Hub */}
        <line x1={620} y1={220} x2={482} y2={220}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.6}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.3s' }}
        />
        {/* Hub → HR */}
        <line x1={480} y1={225} x2={618} y2={225}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.35}
          strokeDasharray="6,4" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.35s' }}
        />

        {/* Marketing → Hub */}
        <line x1={620} y1={373} x2={482} y2={233}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.6}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.35s' }}
        />
        {/* Hub → Marketing */}
        <line x1={478} y1={237} x2={616} y2={377}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.35}
          strokeDasharray="6,4" strokeDashoffset="400"
          markerEnd="url(#arrow-mdm)"
          style={{ animation: 'drawLine-mdm 0.6s ease forwards', animationDelay: '0.4s' }}
        />

        {/* Legend */}
        <line x1={300} y1={450} x2={340} y2={450} stroke="#0071e3" strokeWidth={1.5} opacity={0.6} />
        <text x={348} y={454} fontSize={9} fill="#6e6e73"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Spoke → Hub</text>
        <line x1={430} y1={450} x2={470} y2={450} stroke="#0071e3" strokeWidth={1.5} opacity={0.35}
          strokeDasharray="6,4" />
        <text x={478} y={454} fontSize={9} fill="#6e6e73"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Hub → Spoke</text>
      </svg>
    </div>
  );
}
