export function ReverseIntegrationDiagram() {
  const lineColor = 'var(--color-accent-blue)';
  const mutedStroke = 'rgba(255,255,255,0.25)';
  const textColor = 'white';
  const mutedText = 'var(--color-text-secondary)';

  // Left column: source systems feeding the warehouse
  const sources = [
    { label: 'CRM', y: 60 },
    { label: 'ERP', y: 155 },
    { label: 'Files', y: 250 },
  ];

  // Right column: activation targets
  const targets = [
    { label: 'CRM', y: 45 },
    { label: 'Marketing', y: 120 },
    { label: 'Ad Platform', y: 195 },
    { label: 'Support Tool', y: 270 },
  ];

  const warehouseCx = 400;
  const warehouseCy = 200;

  return (
    <svg
      viewBox="0 0 800 360"
      className="w-full max-w-4xl mx-auto my-8"
      style={{ backgroundColor: 'var(--color-noir)', borderRadius: 'var(--radius-md)' }}
      role="img"
      aria-label="Reverse integration flow: source systems feed data warehouse via ETL (left), warehouse activates enriched data to operational tools via reverse integration (right)."
    >
      <defs>
        <marker id="arrow-fwd" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={lineColor} />
        </marker>
        <marker id="arrow-muted" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={mutedStroke} />
        </marker>
      </defs>

      {/* Source system boxes (left) */}
      {sources.map((src) => (
        <g key={`src-${src.label}-${src.y}`}>
          <rect x="20" y={src.y} width="90" height="40" rx="7" fill="none" stroke={mutedStroke} strokeWidth="1.5" />
          <text x="65" y={src.y + 24} textAnchor="middle" dominantBaseline="middle" fill={mutedText} fontSize="12" fontWeight="500">
            {src.label}
          </text>
        </g>
      ))}

      {/* ETL arrows: sources → warehouse (muted) */}
      {sources.map((src) => (
        <line
          key={`etl-${src.y}`}
          x1="110"
          y1={src.y + 20}
          x2="285"
          y2={warehouseCy}
          stroke={mutedStroke}
          strokeWidth="1.5"
          markerEnd="url(#arrow-muted)"
        />
      ))}

      {/* ETL label */}
      <text x="185" y="145" textAnchor="middle" fill={mutedText} fontSize="9" opacity="0.7">ETL</text>

      {/* Central Warehouse / Intelligence Hub box */}
      <rect x="285" y="120" width="230" height="160" rx="12" fill="rgba(0,217,255,0.08)" stroke={lineColor} strokeWidth="2.5" />
      <text x={warehouseCx} y={warehouseCy - 15} textAnchor="middle" fill={textColor} fontSize="13" fontWeight="700">
        Data Warehouse
      </text>
      <text x={warehouseCx} y={warehouseCy + 8} textAnchor="middle" fill={mutedText} fontSize="11">
        Intelligence Hub
      </text>
      <text x={warehouseCx} y={warehouseCy + 30} textAnchor="middle" fill={lineColor} fontSize="10">
        Enriched • Unified • Trusted
      </text>

      {/* Reverse Integration arrows: warehouse → targets (prominent electric blue) */}
      {targets.map((tgt) => (
        <line
          key={`rev-${tgt.y}`}
          x1="515"
          y1={warehouseCy}
          x2="600"
          y2={tgt.y + 20}
          stroke={lineColor}
          strokeWidth="2"
          markerEnd="url(#arrow-fwd)"
        />
      ))}

      {/* Target boxes (right) */}
      {targets.map((tgt) => (
        <g key={`tgt-${tgt.label}-${tgt.y}`}>
          <rect x="605" y={tgt.y} width="110" height="40" rx="7" fill="rgba(0,217,255,0.06)" stroke={lineColor} strokeWidth="1.5" />
          <text x="660" y={tgt.y + 24} textAnchor="middle" dominantBaseline="middle" fill={textColor} fontSize="11" fontWeight="600">
            {tgt.label}
          </text>
        </g>
      ))}

      {/* Reverse Integration label badge */}
      <rect x="520" y="148" width="78" height="24" rx="7" fill={lineColor} />
      <text x="559" y="164" textAnchor="middle" dominantBaseline="middle" fill="#080808" fontSize="9" fontWeight="700">
        Reverse
      </text>
      <rect x="520" y="176" width="78" height="24" rx="7" fill={lineColor} />
      <text x="559" y="192" textAnchor="middle" dominantBaseline="middle" fill="#080808" fontSize="9" fontWeight="700">
        Integration
      </text>
    </svg>
  );
}
