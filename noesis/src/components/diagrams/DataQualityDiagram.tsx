export function DataQualityDiagram() {
  const lineColor = 'var(--color-accent-blue)';
  const textColor = 'white';

  const cx = 400;
  const cy = 225;
  const orbitR = 160;
  const dimR = 46;

  // Six dimensions at 60° apart, starting at 270° (top)
  const dimensions = [
    'Accuracy',
    'Completeness',
    'Consistency',
    'Uniqueness',
    'Validity',
    'Timeliness',
  ].map((label, i) => {
    const angleDeg = 270 + i * 60;
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      label,
      x: cx + orbitR * Math.cos(angleRad),
      y: cy + orbitR * Math.sin(angleRad),
    };
  });

  return (
    <svg
      viewBox="0 0 800 450"
      className="w-full max-w-4xl mx-auto my-8"
      style={{ backgroundColor: 'var(--color-noir)', borderRadius: 'var(--radius-md)' }}
      role="img"
      aria-label="Data quality dimensions wheel: six dimensions (Accuracy, Completeness, Consistency, Uniqueness, Validity, Timeliness) surrounding a central Fit for Purpose hub."
    >
      {/* Connecting lines from center to each dimension */}
      {dimensions.map((dim) => (
        <line
          key={`line-${dim.label}`}
          x1={cx}
          y1={cy}
          x2={dim.x}
          y2={dim.y}
          stroke={lineColor}
          strokeWidth="1.5"
          opacity="0.6"
        />
      ))}

      {/* Dimension circles */}
      {dimensions.map((dim) => (
        <g key={dim.label}>
          <circle
            cx={dim.x}
            cy={dim.y}
            r={dimR}
            fill="rgba(0,217,255,0.06)"
            stroke={lineColor}
            strokeWidth="1.5"
          />
          <text
            x={dim.x}
            y={dim.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={textColor}
            fontSize="11"
            fontWeight="600"
          >
            {dim.label}
          </text>
        </g>
      ))}

      {/* Central hub circle */}
      <circle
        cx={cx}
        cy={cy}
        r={50}
        fill="rgba(0,217,255,0.12)"
        stroke={lineColor}
        strokeWidth="2.5"
      />
      <text x={cx} y={cy - 7} textAnchor="middle" fill={textColor} fontSize="11" fontWeight="700">
        Fit for
      </text>
      <text x={cx} y={cy + 11} textAnchor="middle" fill={textColor} fontSize="11" fontWeight="700">
        Purpose
      </text>
    </svg>
  );
}
