export function AIDataManagementDiagram() {
  return (
    <div
      className="w-full max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden"
      style={{ background: '#f8f8fa', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}
    >
      <svg
        viewBox="0 0 760 440"
        className="w-full"
        role="img"
        aria-label="Three-layer stack diagram showing Storage and Compute at the bottom, Data Management with Quality, MDM, Governance, and Integration in the middle, and an AI and Machine Learning layer with ML Models, AI Agents, Feature Stores, and Vector DBs on top, with bidirectional arrows between layers"
      >
        <defs>
          <filter id="cardShadow-ai" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
          </filter>
          <marker id="arrow-ai" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#0071e3" opacity="0.8" />
          </marker>
          <marker id="arrow-ai-gray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#6e6e73" opacity="0.6" />
          </marker>
          <style>{`
            @keyframes fadeInUp-ai {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes drawLine-ai {
              from { stroke-dashoffset: 400; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>

        {/* ── Layer 1: Storage & Compute (bottom) ── */}
        <g style={{ animation: 'fadeInUp-ai 0.4s ease forwards', animationDelay: '0s' }}>
          <rect x={60} y={340} width={500} height={60} rx={10} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ai)" />
          <text x={310} y={365} textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Storage &amp; Compute</text>
          <text x={310} y={383} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
            Data Lakes · Warehouses · Cloud Platforms
          </text>
        </g>

        {/* Connector: Storage → Data Management */}
        <line x1={310} y1={340} x2={310} y2={322}
          stroke="#6e6e73" strokeWidth={1.5} opacity={0.5}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-ai-gray)"
          style={{ animation: 'drawLine-ai 0.6s ease forwards', animationDelay: '0.1s' }}
        />

        {/* ── Layer 2: Data Management (middle) ── */}
        <g style={{ animation: 'fadeInUp-ai 0.4s ease forwards', animationDelay: '0.2s' }}>
          <rect x={60} y={210} width={500} height={110} rx={10} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ai)" />
          <text x={310} y={234} textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Data Management</text>

          {/* Sub-node pills */}
          {/* Quality */}
          <rect x={80} y={255} width={90} height={30} rx={6} fill="#f5f5f7" stroke="#e5e5e7" />
          <text x={125} y={275} textAnchor="middle" fill="#1d1d1f" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Quality</text>
          {/* MDM */}
          <rect x={190} y={255} width={90} height={30} rx={6} fill="#f5f5f7" stroke="#e5e5e7" />
          <text x={235} y={275} textAnchor="middle" fill="#1d1d1f" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">MDM</text>
          {/* Governance */}
          <rect x={300} y={255} width={110} height={30} rx={6} fill="#f5f5f7" stroke="#e5e5e7" />
          <text x={355} y={275} textAnchor="middle" fill="#1d1d1f" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Governance</text>
          {/* Integration */}
          <rect x={430} y={255} width={110} height={30} rx={6} fill="#f5f5f7" stroke="#e5e5e7" />
          <text x={485} y={275} textAnchor="middle" fill="#1d1d1f" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Integration</text>
        </g>

        {/* Bidirectional arrows between Data Management and AI layer */}
        {/* Up arrow: Data Management → AI (left channel) */}
        <line x1={270} y1={210} x2={270} y2={192}
          stroke="#0071e3" strokeWidth={2} opacity={0.8}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-ai)"
          style={{ animation: 'drawLine-ai 0.6s ease forwards', animationDelay: '0.25s' }}
        />
        {/* Down arrow: AI → Data Management (right channel) */}
        <line x1={350} y1={192} x2={350} y2={210}
          stroke="#0071e3" strokeWidth={2} opacity={0.8}
          strokeDasharray="400" strokeDashoffset="400"
          markerEnd="url(#arrow-ai)"
          style={{ animation: 'drawLine-ai 0.6s ease forwards', animationDelay: '0.3s' }}
        />

        {/* Arrow labels */}
        <text x={220} y={201} textAnchor="middle" fill="#0071e3" fontSize={9}
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">AI improves data</text>
        <text x={405} y={201} textAnchor="middle" fill="#0071e3" fontSize={9}
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Data enables AI</text>

        {/* ── Layer 3: AI & ML (top) ── */}
        <g style={{ animation: 'fadeInUp-ai 0.4s ease forwards', animationDelay: '0.4s' }}>
          <rect x={60} y={60} width={500} height={130} rx={10} fill="#eff6ff" stroke="#0071e3" strokeWidth={2} filter="url(#cardShadow-ai)" />
          <text x={310} y={85} textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">AI &amp; Machine Learning Layer</text>

          {/* Sub-node pills */}
          {/* ML Models */}
          <rect x={80} y={105} width={100} height={30} rx={6} fill="#ffffff" stroke="#bfdbfe" />
          <text x={130} y={125} textAnchor="middle" fill="#1d1d1f" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">ML Models</text>
          {/* AI Agents */}
          <rect x={200} y={105} width={100} height={30} rx={6} fill="#ffffff" stroke="#bfdbfe" />
          <text x={250} y={125} textAnchor="middle" fill="#1d1d1f" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">AI Agents</text>
          {/* Feature Stores */}
          <rect x={320} y={105} width={120} height={30} rx={6} fill="#ffffff" stroke="#bfdbfe" />
          <text x={380} y={125} textAnchor="middle" fill="#1d1d1f" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Feature Stores</text>
          {/* Vector DBs */}
          <rect x={460} y={105} width={90} height={30} rx={6} fill="#ffffff" stroke="#bfdbfe" />
          <text x={505} y={125} textAnchor="middle" fill="#1d1d1f" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Vector DBs</text>

          <text x={310} y={165} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
            Autonomous Pipelines · Semantic Discovery · AI Stewards
          </text>
        </g>
      </svg>
    </div>
  );
}
