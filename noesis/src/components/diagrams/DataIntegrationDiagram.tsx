export function DataIntegrationDiagram() {
  const lineColor = 'var(--color-accent-blue)';
  const textColor = 'white';
  const mutedText = 'var(--color-text-secondary)';

  // Source system boxes (left column)
  const sources = [
    { label: 'CRM', y: 60 },
    { label: 'ERP', y: 175 },
    { label: 'Files', y: 290 },
  ];

  // Arrow marker definition
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full max-w-4xl mx-auto my-8"
      style={{ backgroundColor: 'var(--color-noir)', borderRadius: 'var(--radius-md)' }}
      role="img"
      aria-label="ETL vs ELT pipeline: source systems extract to staging, then either transform-first (ETL) or load-first (ELT) into the data warehouse."
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={lineColor} />
        </marker>
        <marker id="arrow-muted" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="rgba(255,255,255,0.3)" />
        </marker>
      </defs>

      {/* Source system boxes */}
      {sources.map((src) => (
        <g key={src.label}>
          <rect x="20" y={src.y} width="100" height="50" rx="8" fill="none" stroke={lineColor} strokeWidth="1.5" opacity="0.7" />
          <text x="70" y={src.y + 30} textAnchor="middle" dominantBaseline="middle" fill={textColor} fontSize="13" fontWeight="600">
            {src.label}
          </text>
        </g>
      ))}

      {/* Arrows from sources to Extract box */}
      {sources.map((src) => (
        <line
          key={`arr-${src.label}`}
          x1="120"
          y1={src.y + 25}
          x2="195"
          y2="200"
          stroke={lineColor}
          strokeWidth="1.5"
          opacity="0.5"
          markerEnd="url(#arrow)"
        />
      ))}

      {/* Extract box */}
      <rect x="200" y="165" width="110" height="60" rx="8" fill="none" stroke={lineColor} strokeWidth="2" />
      <text x="255" y="200" textAnchor="middle" dominantBaseline="middle" fill={textColor} fontSize="13" fontWeight="700">
        Extract
      </text>

      {/* Arrow Extract → Stage */}
      <line x1="310" y1="195" x2="355" y2="195" stroke={lineColor} strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Stage box */}
      <rect x="360" y="165" width="110" height="60" rx="8" fill="none" stroke={lineColor} strokeWidth="2" />
      <text x="415" y="200" textAnchor="middle" dominantBaseline="middle" fill={textColor} fontSize="13" fontWeight="700">
        Stage
      </text>

      {/* Fork: upper path (ETL) and lower path (ELT) */}
      {/* Vertical fork line from stage */}
      <line x1="470" y1="145" x2="470" y2="255" stroke={lineColor} strokeWidth="1.5" opacity="0.5" strokeDasharray="5,4" />

      {/* Upper: Transform → Load (ETL) */}
      {/* Horizontal line to Transform */}
      <line x1="470" y1="145" x2="530" y2="145" stroke={lineColor} strokeWidth="1.5" markerEnd="url(#arrow)" />
      <rect x="535" y="118" width="110" height="54" rx="8" fill="none" stroke={lineColor} strokeWidth="1.5" opacity="0.9" />
      <text x="590" y="140" textAnchor="middle" fill={textColor} fontSize="12" fontWeight="600">Transform</text>
      <text x="590" y="158" textAnchor="middle" fill={mutedText} fontSize="10">then Load</text>
      {/* ETL Badge */}
      <rect x="535" y="82" width="44" height="22" rx="6" fill={lineColor} />
      <text x="557" y="97" textAnchor="middle" dominantBaseline="middle" fill="#080808" fontSize="10" fontWeight="700">ETL</text>
      {/* Batch badge */}
      <rect x="586" y="82" width="60" height="22" rx="6" fill="rgba(0,217,255,0.15)" stroke={lineColor} strokeWidth="1" />
      <text x="616" y="97" textAnchor="middle" dominantBaseline="middle" fill={lineColor} fontSize="9">Batch</text>

      {/* Arrow from Transform to Warehouse (upper) */}
      <line x1="645" y1="145" x2="685" y2="145" stroke={lineColor} strokeWidth="1.5" markerEnd="url(#arrow)" />

      {/* Lower: Load → Transform (ELT) */}
      <line x1="470" y1="255" x2="530" y2="255" stroke={lineColor} strokeWidth="1.5" markerEnd="url(#arrow)" />
      <rect x="535" y="228" width="110" height="54" rx="8" fill="none" stroke={lineColor} strokeWidth="1.5" opacity="0.9" />
      <text x="590" y="250" textAnchor="middle" fill={textColor} fontSize="12" fontWeight="600">Load</text>
      <text x="590" y="268" textAnchor="middle" fill={mutedText} fontSize="10">then Transform</text>
      {/* ELT badge */}
      <rect x="535" y="290" width="44" height="22" rx="6" fill={lineColor} />
      <text x="557" y="305" textAnchor="middle" dominantBaseline="middle" fill="#080808" fontSize="10" fontWeight="700">ELT</text>
      {/* Streaming badge */}
      <rect x="586" y="290" width="60" height="22" rx="6" fill="rgba(0,217,255,0.15)" stroke={lineColor} strokeWidth="1" />
      <text x="616" y="305" textAnchor="middle" dominantBaseline="middle" fill={lineColor} fontSize="9">Streaming</text>

      {/* Arrow from ELT box to Warehouse (lower) */}
      <line x1="645" y1="255" x2="685" y2="255" stroke={lineColor} strokeWidth="1.5" markerEnd="url(#arrow)" />

      {/* Data Warehouse box (right) */}
      <rect x="690" y="100" width="90" height="200" rx="10" fill="none" stroke={lineColor} strokeWidth="2" />
      <text x="735" y="185" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="700">Data</text>
      <text x="735" y="205" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="700">Warehouse</text>

      {/* Stage → fork connecting line */}
      <line x1="415" y1="165" x2="415" y2="145" stroke={lineColor} strokeWidth="1.5" opacity="0.4" />
      <line x1="415" y1="145" x2="470" y2="145" stroke={lineColor} strokeWidth="1.5" opacity="0.4" />
      <line x1="415" y1="225" x2="415" y2="255" stroke={lineColor} strokeWidth="1.5" opacity="0.4" />
      <line x1="415" y1="255" x2="470" y2="255" stroke={lineColor} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}
