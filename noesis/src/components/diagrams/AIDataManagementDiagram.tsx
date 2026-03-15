export function AIDataManagementDiagram() {
  const lineColor = 'var(--color-accent-blue)';
  const textColor = 'white';
  const mutedText = 'var(--color-text-secondary)';

  // Three horizontal layers
  // viewBox: 800 x 420
  const layers = [
    {
      id: 'storage',
      label: 'Storage & Compute',
      y: 330,
      height: 60,
      fill: 'rgba(255,255,255,0.04)',
      stroke: 'rgba(255,255,255,0.20)',
      textColor: mutedText,
      sections: [],
    },
    {
      id: 'data-mgmt',
      label: 'Data Management Layer',
      y: 200,
      height: 100,
      fill: 'rgba(0,217,255,0.07)',
      stroke: 'rgba(0,217,255,0.45)',
      textColor: textColor,
      sections: ['Quality', 'MDM', 'Governance', 'Integration'],
    },
    {
      id: 'ai',
      label: 'AI / ML Layer',
      y: 60,
      height: 100,
      fill: 'rgba(0,217,255,0.14)',
      stroke: lineColor,
      textColor: textColor,
      sections: ['Models', 'Feature Store', 'Vector DBs', 'Agents'],
    },
  ];

  const layerX = 60;
  const layerW = 680;

  return (
    <svg
      viewBox="0 0 800 420"
      className="w-full max-w-4xl mx-auto my-8"
      style={{ backgroundColor: 'var(--color-noir)', borderRadius: 'var(--radius-md)' }}
      role="img"
      aria-label="AI and data management stack: storage and compute at base, data management layer (quality, MDM, governance, integration) in the middle, AI and ML layer (models, feature stores, vector databases, agents) at top with mutual dependency arrows."
    >
      <defs>
        <marker id="arrow-stack-up" markerWidth="8" markerHeight="8" refX="4" refY="8" orient="auto">
          <path d="M0,8 L4,0 L8,8 Z" fill={lineColor} />
        </marker>
        <marker id="arrow-stack-down" markerWidth="8" markerHeight="8" refX="4" refY="0" orient="auto">
          <path d="M0,0 L4,8 L8,0 Z" fill={lineColor} />
        </marker>
      </defs>

      {/* Render layers */}
      {layers.map((layer) => (
        <g key={layer.id}>
          <rect
            x={layerX}
            y={layer.y}
            width={layerW}
            height={layer.height}
            rx="10"
            fill={layer.fill}
            stroke={layer.stroke}
            strokeWidth="1.8"
          />

          {/* Layer title */}
          <text
            x={layerX + 12}
            y={layer.y + 20}
            fill={layer.textColor}
            fontSize="12"
            fontWeight="700"
          >
            {layer.label}
          </text>

          {/* Section sub-boxes */}
          {layer.sections.length > 0 && (() => {
            const secCount = layer.sections.length;
            const secPad = 10;
            const secW = (layerW - (secCount + 1) * secPad) / secCount;
            const secH = layer.height - 44;
            const secY = layer.y + 32;
            return layer.sections.map((sec, i) => {
              const secX = layerX + secPad + i * (secW + secPad);
              return (
                <g key={sec}>
                  <rect
                    x={secX}
                    y={secY}
                    width={secW}
                    height={secH}
                    rx="6"
                    fill="rgba(0,217,255,0.10)"
                    stroke={layer.stroke}
                    strokeWidth="1"
                  />
                  <text
                    x={secX + secW / 2}
                    y={secY + secH / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={textColor}
                    fontSize="11"
                    fontWeight="600"
                  >
                    {sec}
                  </text>
                </g>
              );
            });
          })()}
        </g>
      ))}

      {/* One-way arrow: Storage → Data Management */}
      <line
        x1="750"
        y1="325"
        x2="750"
        y2="305"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        markerEnd="url(#arrow-stack-up)"
      />

      {/* Bidirectional arrows between Data Management and AI layers */}
      {/* Up arrow */}
      <line
        x1="762"
        y1="196"
        x2="762"
        y2="165"
        stroke={lineColor}
        strokeWidth="2.5"
        markerEnd="url(#arrow-stack-up)"
      />
      {/* Down arrow */}
      <line
        x1="748"
        y1="165"
        x2="748"
        y2="196"
        stroke={lineColor}
        strokeWidth="2.5"
        markerEnd="url(#arrow-stack-down)"
      />
      {/* Mutual dependency label */}
      <text x="770" y="185" fill={lineColor} fontSize="9" fontWeight="700">mutual</text>
      <text x="770" y="197" fill={lineColor} fontSize="9" fontWeight="700">dependency</text>
    </svg>
  );
}
