export function DataSourcesDiagram() {
  return (
    <div
      className="w-full max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden"
      style={{ background: '#f8f8fa', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}
    >
      <svg
        viewBox="0 0 760 420"
        className="w-full"
        role="img"
        aria-label="Tree diagram showing Enterprise Data broken into four categories: Databases, APIs, Files, and Streams, each with three example leaf nodes"
      >
        <defs>
          <filter id="cardShadow-ds" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
          </filter>
          <marker id="arrow-ds" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#0071e3" opacity="0.7" />
          </marker>
          <style>{`
            @keyframes fadeInUp-ds {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes drawLine-ds {
              from { stroke-dashoffset: 300; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>

        {/* Root node */}
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0s' }}>
          <rect
            x={300} y={20} width={160} height={44} rx={10}
            fill="#eff6ff" stroke="#0071e3" strokeWidth={1.5}
            filter="url(#cardShadow-ds)"
          />
          <text
            x={380} y={47}
            textAnchor="middle" fill="#1d1d1f" fontSize={13} fontWeight={700}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif"
          >
            Enterprise Data
          </text>
        </g>

        {/* Connector lines: root to categories */}
        <line
          x1={380} y1={64} x2={110} y2={130}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.4}
          strokeDasharray="300" strokeDashoffset="300"
          style={{ animation: 'drawLine-ds 0.6s ease forwards', animationDelay: '0.05s' }}
        />
        <line
          x1={380} y1={64} x2={280} y2={130}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.4}
          strokeDasharray="300" strokeDashoffset="300"
          style={{ animation: 'drawLine-ds 0.6s ease forwards', animationDelay: '0.1s' }}
        />
        <line
          x1={380} y1={64} x2={480} y2={130}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.4}
          strokeDasharray="300" strokeDashoffset="300"
          style={{ animation: 'drawLine-ds 0.6s ease forwards', animationDelay: '0.15s' }}
        />
        <line
          x1={380} y1={64} x2={650} y2={130}
          stroke="#0071e3" strokeWidth={1.5} opacity={0.4}
          strokeDasharray="300" strokeDashoffset="300"
          style={{ animation: 'drawLine-ds 0.6s ease forwards', animationDelay: '0.2s' }}
        />

        {/* Category: Databases */}
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.1s' }}>
          <rect x={40} y={130} width={140} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ds)" />
          <text x={110} y={155} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
            Databases
          </text>
        </g>
        {/* Category: APIs */}
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.15s' }}>
          <rect x={210} y={130} width={140} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ds)" />
          <text x={280} y={155} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
            APIs
          </text>
        </g>
        {/* Category: Files */}
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.2s' }}>
          <rect x={410} y={130} width={140} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ds)" />
          <text x={480} y={155} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
            Files
          </text>
        </g>
        {/* Category: Streams */}
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.25s' }}>
          <rect x={580} y={130} width={140} height={40} rx={8} fill="#ffffff" stroke="#e5e5e7" filter="url(#cardShadow-ds)" />
          <text x={650} y={155} textAnchor="middle" fill="#1d1d1f" fontSize={12} fontWeight={600}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">
            Streams
          </text>
        </g>

        {/* Vertical connectors: category bottoms to leaf centers */}
        {/* Databases column */}
        <line x1={110} y1={170} x2={110} y2={226} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        <line x1={110} y1={170} x2={110} y2={281} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        <line x1={110} y1={170} x2={110} y2={336} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        {/* APIs column */}
        <line x1={280} y1={170} x2={280} y2={226} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        <line x1={280} y1={170} x2={280} y2={281} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        <line x1={280} y1={170} x2={280} y2={336} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        {/* Files column */}
        <line x1={480} y1={170} x2={480} y2={226} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        <line x1={480} y1={170} x2={480} y2={281} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        <line x1={480} y1={170} x2={480} y2={336} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        {/* Streams column */}
        <line x1={650} y1={170} x2={650} y2={226} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        <line x1={650} y1={170} x2={650} y2={281} stroke="#0071e3" strokeWidth={1} opacity={0.25} />
        <line x1={650} y1={170} x2={650} y2={336} stroke="#0071e3" strokeWidth={1} opacity={0.25} />

        {/* Leaf nodes — Databases */}
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.3s' }}>
          <rect x={50} y={226} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={110} y={244} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">PostgreSQL</text>
        </g>
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.35s' }}>
          <rect x={50} y={281} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={110} y={299} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Oracle</text>
        </g>
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.4s' }}>
          <rect x={50} y={336} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={110} y={354} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">MongoDB</text>
        </g>

        {/* Leaf nodes — APIs */}
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.35s' }}>
          <rect x={220} y={226} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={280} y={244} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">REST</text>
        </g>
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.4s' }}>
          <rect x={220} y={281} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={280} y={299} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">GraphQL</text>
        </g>
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.45s' }}>
          <rect x={220} y={336} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={280} y={354} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">gRPC</text>
        </g>

        {/* Leaf nodes — Files */}
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.4s' }}>
          <rect x={420} y={226} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={480} y={244} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">CSV</text>
        </g>
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.45s' }}>
          <rect x={420} y={281} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={480} y={299} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Parquet</text>
        </g>
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.5s' }}>
          <rect x={420} y={336} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={480} y={354} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">JSON</text>
        </g>

        {/* Leaf nodes — Streams */}
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.45s' }}>
          <rect x={590} y={226} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={650} y={244} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Kafka</text>
        </g>
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.5s' }}>
          <rect x={590} y={281} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={650} y={299} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Kinesis</text>
        </g>
        <g style={{ animation: 'fadeInUp-ds 0.4s ease forwards', animationDelay: '0.55s' }}>
          <rect x={590} y={336} width={120} height={28} rx={6} fill="#ffffff" stroke="#e5e5e7" />
          <text x={650} y={354} textAnchor="middle" fill="#6e6e73" fontSize={10}
            fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif">Event Hub</text>
        </g>
      </svg>
    </div>
  );
}
