export function DataGovernanceDiagram() {
  const lineColor = 'var(--color-accent-blue)';
  const textColor = 'white';
  const mutedText = 'var(--color-text-secondary)';

  // Three horizontal bands — bottom (widest) to top (narrowest)
  // viewBox: 800 x 400
  const bands = [
    {
      label: 'Policies & Standards',
      sublabel: 'Foundation',
      x: 50,
      y: 290,
      width: 700,
      height: 70,
      opacity: '0.14',
    },
    {
      label: 'Stewards & Councils · Data Catalog',
      sublabel: 'Coordination',
      x: 100,
      y: 190,
      width: 600,
      height: 70,
      opacity: '0.10',
    },
    {
      label: 'Compliance & Audit',
      sublabel: 'Oversight',
      x: 170,
      y: 90,
      width: 460,
      height: 70,
      opacity: '0.07',
    },
  ];

  const arrowX = 730;
  const upArrowY1 = 350;
  const upArrowY2 = 110;
  const downArrowX = 755;

  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full max-w-4xl mx-auto my-8"
      style={{ backgroundColor: 'var(--color-noir)', borderRadius: 'var(--radius-md)' }}
      role="img"
      aria-label="Governance framework pyramid: Policies and Standards at the foundation, Stewards and Councils plus Data Catalog in the middle, Compliance and Audit at the top."
    >
      <defs>
        <marker id="arrow-up" markerWidth="8" markerHeight="8" refX="4" refY="8" orient="auto">
          <path d="M0,8 L4,0 L8,8 Z" fill={lineColor} />
        </marker>
        <marker id="arrow-down" markerWidth="8" markerHeight="8" refX="4" refY="0" orient="auto">
          <path d="M0,0 L4,8 L8,0 Z" fill={lineColor} opacity="0.6" />
        </marker>
      </defs>

      {/* Render bands bottom to top so bottom overlaps nothing */}
      {bands.map((band) => (
        <g key={band.label}>
          <rect
            x={band.x}
            y={band.y}
            width={band.width}
            height={band.height}
            rx="10"
            fill={`rgba(0,217,255,${band.opacity})`}
            stroke={lineColor}
            strokeWidth="1.5"
          />
          <text
            x={band.x + band.width / 2}
            y={band.y + band.height / 2 - 7}
            textAnchor="middle"
            fill={textColor}
            fontSize="13"
            fontWeight="700"
          >
            {band.label}
          </text>
          <text
            x={band.x + band.width / 2}
            y={band.y + band.height / 2 + 12}
            textAnchor="middle"
            fill={mutedText}
            fontSize="10"
          >
            {band.sublabel}
          </text>
        </g>
      ))}

      {/* Upward arrow on right — Policy enforcement */}
      <line
        x1={arrowX}
        y1={upArrowY1}
        x2={arrowX}
        y2={upArrowY2}
        stroke={lineColor}
        strokeWidth="2"
        markerEnd="url(#arrow-up)"
      />
      <text x={arrowX + 6} y={240} fill={lineColor} fontSize="9" fontWeight="600">
        Policy
      </text>
      <text x={arrowX + 6} y={254} fill={lineColor} fontSize="9" fontWeight="600">
        enforce-
      </text>
      <text x={arrowX + 6} y={268} fill={lineColor} fontSize="9" fontWeight="600">
        ment
      </text>

      {/* Downward arrow — Audit findings */}
      <line
        x1={downArrowX}
        y1={upArrowY2}
        x2={downArrowX}
        y2={upArrowY1}
        stroke={lineColor}
        strokeWidth="2"
        opacity="0.55"
        markerEnd="url(#arrow-down)"
      />
      <text x={downArrowX + 6} y={208} fill={mutedText} fontSize="9">Audit</text>
      <text x={downArrowX + 6} y={221} fill={mutedText} fontSize="9">findings</text>
    </svg>
  );
}
