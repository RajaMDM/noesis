export function MDMDiagram() {
  const lineColor = 'var(--color-accent-blue)';
  const textColor = 'white';

  const hubCx = 400;
  const hubCy = 230;
  const hubW = 180;
  const hubH = 100;
  const spokeOrbitR = 175;

  // Seven spoke systems at equal angles
  const spokes = [
    'CRM',
    'ERP',
    'eCommerce',
    'Finance',
    'HR',
    'Logistics',
    'Marketing',
  ].map((label, i) => {
    const angleDeg = (360 / 7) * i - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      label,
      cx: hubCx + spokeOrbitR * Math.cos(angleRad),
      cy: hubCy + spokeOrbitR * Math.sin(angleRad),
    };
  });

  // Three golden record badges inside the hub
  const badges = ['Customer', 'Product', 'Supplier'];

  return (
    <svg
      viewBox="0 0 800 460"
      className="w-full max-w-4xl mx-auto my-8"
      style={{ backgroundColor: 'var(--color-noir)', borderRadius: 'var(--radius-md)' }}
      role="img"
      aria-label="MDM hub-and-spoke model: central Golden Record Hub containing Customer, Product, and Supplier records, connected bidirectionally to 7 spoke systems: CRM, ERP, eCommerce, Finance, HR, Logistics, Marketing."
    >
      <defs>
        <marker id="arrowBi-start" markerWidth="7" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse">
          <path d="M7,0 L0,3.5 L7,7 Z" fill={lineColor} opacity="0.8" />
        </marker>
        <marker id="arrowBi-end" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={lineColor} opacity="0.8" />
        </marker>
      </defs>

      {/* Spoke connections (bidirectional arrows) */}
      {spokes.map((spoke) => {
        // Compute direction from hub center to spoke
        const dx = spoke.cx - hubCx;
        const dy = spoke.cy - hubCy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nx = dx / dist;
        const ny = dy / dist;

        // Hub edge: approximate as rectangle edge
        const hubHalfW = hubW / 2;
        const hubHalfH = hubH / 2;
        let edgeX = hubCx;
        let edgeY = hubCy;
        if (Math.abs(nx) / hubHalfW > Math.abs(ny) / hubHalfH) {
          edgeX = hubCx + Math.sign(nx) * hubHalfW;
          edgeY = hubCy + ny * (hubHalfW / Math.abs(nx));
        } else {
          edgeY = hubCy + Math.sign(ny) * hubHalfH;
          edgeX = hubCx + nx * (hubHalfH / Math.abs(ny));
        }

        // Spoke edge: ellipse edge (rx=38, ry=20)
        const spokeRx = 38;
        const spokeRy = 20;
        const spokeEdgeX = spoke.cx - nx * spokeRx;
        const spokeEdgeY = spoke.cy - ny * spokeRy;

        return (
          <line
            key={spoke.label}
            x1={edgeX}
            y1={edgeY}
            x2={spokeEdgeX}
            y2={spokeEdgeY}
            stroke={lineColor}
            strokeWidth="1.5"
            opacity="0.6"
            markerStart="url(#arrowBi-start)"
            markerEnd="url(#arrowBi-end)"
          />
        );
      })}

      {/* Spoke system ellipses */}
      {spokes.map((spoke) => (
        <g key={spoke.label}>
          <ellipse
            cx={spoke.cx}
            cy={spoke.cy}
            rx={38}
            ry={20}
            fill="rgba(0,217,255,0.06)"
            stroke={lineColor}
            strokeWidth="1.5"
          />
          <text
            x={spoke.cx}
            y={spoke.cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={textColor}
            fontSize="11"
            fontWeight="600"
          >
            {spoke.label}
          </text>
        </g>
      ))}

      {/* Central Golden Record Hub */}
      <rect
        x={hubCx - hubW / 2}
        y={hubCy - hubH / 2}
        width={hubW}
        height={hubH}
        rx="10"
        fill="rgba(0,217,255,0.10)"
        stroke={lineColor}
        strokeWidth="2.5"
      />
      <text x={hubCx} y={hubCy - 26} textAnchor="middle" fill={textColor} fontSize="11" fontWeight="700">
        Golden Record Hub
      </text>

      {/* Badges inside hub */}
      {badges.map((badge, i) => {
        const bx = hubCx - 56 + i * 56;
        const by = hubCy;
        return (
          <g key={badge}>
            <rect x={bx - 24} y={by - 11} width={50} height={22} rx="5" fill="rgba(0,217,255,0.20)" stroke={lineColor} strokeWidth="1" />
            <text x={bx + 1} y={by} textAnchor="middle" dominantBaseline="middle" fill={textColor} fontSize="9" fontWeight="600">
              {badge}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
