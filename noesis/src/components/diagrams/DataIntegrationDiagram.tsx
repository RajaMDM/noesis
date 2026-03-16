export function DataIntegrationDiagram() {
  return (
    <div
      className="w-full max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden"
      style={{ background: '#f8f8fa', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}
    >
      <svg
        viewBox="0 0 760 380"
        className="w-full"
        role="img"
        aria-label="Pipeline flow diagram comparing ETL and ELT data integration paths from source systems into a data warehouse"
      >
        <defs>
          <filter id="cardShadow-di" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
          </filter>
          <marker id="arrow-di" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#0071e3" opacity="0.7" />
          </marker>
          <marker id="arrow-di-gray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#6e6e73" opacity="0.6" />
          </marker>
          <style>{`
            @keyframes fadeInUp-di {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes drawLine-di {
              from { stroke-dashoffset: 400; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>

        {/* ── Left column: Source Systems ── */}
        <text x={75} y={45} textAnchor="middle" fontSize={10} fill="#6e6e73" fontWeight={600}
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Sources</text>

        <g style={{ animation: 'fadeInUp-di 0.4s ease forwards', animationDelay: '0s' }}>
          <rect x={20} y={60} width={110} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-di)" />
          <text x={75} y={85} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">CRM</text>
        </g>
        <g style={{ animation: 'fadeInUp-di 0.4s ease forwards', animationDelay: '0.1s' }}>
          <rect x={20} y={120} width={110} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-di)" />
          <text x={75} y={145} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">ERP</text>
        </g>
        <g style={{ animation: 'fadeInUp-di 0.4s ease forwards', animationDelay: '0.1s' }}>
          <rect x={20} y={180} width={110} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-di)" />
          <text x={75} y={205} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Files</text>
        </g>

        {/* ── ETL Path label ── */}
        <text x={370} y={65} textAnchor="middle" fontSize={10} fill="#6e6e73"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">ETL Path</text>

        {/* ETL: Extract */}
        <g style={{ animation: 'fadeInUp-di 0.4s ease forwards', animationDelay: '0.2s' }}>
          <rect x={180} y={80} width={100} height={40} rx={8} fill="#eff6ff" stroke="#0071e3" filter="url(#cardShadow-di)" />
          <text x={230} y={105} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Extract</text>
        </g>
        {/* ETL: Transform */}
        <g style={{ animation: 'fadeInUp-di 0.4s ease forwards', animationDelay: '0.3s' }}>
          <rect x={320} y={80} width={110} height={40} rx={8} fill="#eff6ff" stroke="#0071e3" filter="url(#cardShadow-di)" />
          <text x={375} y={105} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Transform</text>
        </g>
        {/* ETL: Load */}
        <g style={{ animation: 'fadeInUp-di 0.4s ease forwards', animationDelay: '0.4s' }}>
          <rect x={480} y={80} width={90} height={40} rx={8} fill="#eff6ff" stroke="#0071e3" filter="url(#cardShadow-di)" />
          <text x={525} y={105} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Load</text>
        </g>

        {/* ── ELT Path label ── */}
        <text x={370} y={175} textAnchor="middle" fontSize={10} fill="#6e6e73"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">ELT Path</text>

        {/* ELT: Extract */}
        <g style={{ animation: 'fadeInUp-di 0.4s ease forwards', animationDelay: '0.2s' }}>
          <rect x={180} y={190} width={100} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-di)" />
          <text x={230} y={215} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Extract</text>
        </g>
        {/* ELT: Load */}
        <g style={{ animation: 'fadeInUp-di 0.4s ease forwards', animationDelay: '0.3s' }}>
          <rect x={320} y={190} width={90} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-di)" />
          <text x={365} y={215} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Load</text>
        </g>
        {/* ELT: Transform */}
        <g style={{ animation: 'fadeInUp-di 0.4s ease forwards', animationDelay: '0.4s' }}>
          <rect x={460} y={190} width={110} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-di)" />
          <text x={515} y={215} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Transform</text>
        </g>

        {/* ── Right: Data Warehouse ── */}
        <g style={{ animation: 'fadeInUp-di 0.4s ease forwards', animationDelay: '0.5s' }}>
          <rect x={620} y={80} width={120} height={150} rx={10} fill="#eff6ff" stroke="#0071e3" strokeWidth={1.5} filter="url(#cardShadow-di)" />
          <text x={680} y={148} textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Data</text>
          <text x={680} y={168} textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Warehouse</text>
        </g>

        {/* ── Connectors ── */}
        {/* Sources → ETL Extract (from source right edges to extract left, averaged at y~140) */}
        <line x1={130} y1={80} x2={180} y2={100}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.5}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-di)"
          style={{ animation: 'drawLine-di 0.6s ease forwards', animationDelay: '0.15s' }}
        />
        <line x1={130} y1={140} x2={180} y2={110}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.5}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-di)"
          style={{ animation: 'drawLine-di 0.6s ease forwards', animationDelay: '0.15s' }}
        />
        {/* Sources → ELT Extract */}
        <line x1={130} y1={140} x2={180} y2={200}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.5}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-di)"
          style={{ animation: 'drawLine-di 0.6s ease forwards', animationDelay: '0.15s' }}
        />
        <line x1={130} y1={200} x2={180} y2={210}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.5}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-di)"
          style={{ animation: 'drawLine-di 0.6s ease forwards', animationDelay: '0.15s' }}
        />

        {/* ETL: Extract → Transform → Load */}
        <line x1={280} y1={100} x2={320} y2={100}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.7}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-di)"
          style={{ animation: 'drawLine-di 0.6s ease forwards', animationDelay: '0.3s' }}
        />
        <line x1={430} y1={100} x2={480} y2={100}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.7}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-di)"
          style={{ animation: 'drawLine-di 0.6s ease forwards', animationDelay: '0.4s' }}
        />

        {/* ELT: Extract → Load → Transform */}
        <line x1={280} y1={210} x2={320} y2={210}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.7}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-di)"
          style={{ animation: 'drawLine-di 0.6s ease forwards', animationDelay: '0.3s' }}
        />
        <line x1={410} y1={210} x2={460} y2={210}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.7}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-di)"
          style={{ animation: 'drawLine-di 0.6s ease forwards', animationDelay: '0.4s' }}
        />

        {/* ETL Load → Warehouse */}
        <line x1={570} y1={100} x2={620} y2={125}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.7}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-di)"
          style={{ animation: 'drawLine-di 0.6s ease forwards', animationDelay: '0.5s' }}
        />
        {/* ELT Transform → Warehouse */}
        <line x1={570} y1={210} x2={620} y2={185}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.7}
          strokeDasharray="300" strokeDashoffset="300"
          markerEnd="url(#arrow-di)"
          style={{ animation: 'drawLine-di 0.6s ease forwards', animationDelay: '0.5s' }}
        />

        {/* ── Bottom labels ── */}
        <text x={370} y={295} textAnchor="middle" fontSize={9} fill="#86868b"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
          Batch / Scheduled
        </text>
        <text x={370} y={340} textAnchor="middle" fontSize={9} fill="#86868b"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
          Real-time / Cloud-native
        </text>
      </svg>
    </div>
  );
}
