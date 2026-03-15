export function DataSourcesDiagram() {
  const lineColor = 'var(--color-accent-blue)';
  const textColor = 'white';
  const leafColor = 'var(--color-accent-blue)';

  // Root node at top center
  const root = { cx: 380, cy: 60 };

  // Four category nodes below root (spread across)
  const categories = [
    { cx: 100, cy: 180, label: 'Databases' },
    { cx: 260, cy: 180, label: 'APIs' },
    { cx: 440, cy: 180, label: 'Files' },
    { cx: 620, cy: 180, label: 'Streams' },
  ];

  // Leaf nodes under each category
  const leaves: Record<string, { label: string }[]> = {
    Databases: [{ label: 'PostgreSQL' }, { label: 'Oracle' }, { label: 'MongoDB' }],
    APIs: [{ label: 'REST' }, { label: 'GraphQL' }, { label: 'gRPC' }],
    Files: [{ label: 'CSV' }, { label: 'JSON' }, { label: 'Parquet' }],
    Streams: [{ label: 'Kafka' }, { label: 'Kinesis' }, { label: 'Event Hub' }],
  };

  // Leaf vertical position
  const leafStartY = 310;
  const leafSpacing = 50;
  const leafWidth = 90;
  const leafHeight = 28;
  const leafRx = 6;

  return (
    <svg
      viewBox="0 0 760 430"
      className="w-full max-w-4xl mx-auto my-8"
      style={{ backgroundColor: 'var(--color-noir)', borderRadius: 'var(--radius-md)' }}
      role="img"
      aria-label="Data source taxonomy: Enterprise Data branches into Databases, APIs, Files, and Streams, each with specific examples."
    >
      {/* Root node */}
      <circle cx={root.cx} cy={root.cy} r={52} fill="none" stroke={lineColor} strokeWidth="2" />
      <text x={root.cx} y={root.cy - 8} textAnchor="middle" fill={textColor} fontSize="13" fontWeight="700">
        Enterprise
      </text>
      <text x={root.cx} y={root.cy + 10} textAnchor="middle" fill={textColor} fontSize="13" fontWeight="700">
        Data
      </text>

      {categories.map((cat) => {
        const catLeaves = leaves[cat.label] || [];
        return (
          <g key={cat.label}>
            {/* Line from root to category */}
            <line
              x1={root.cx}
              y1={root.cy + 52}
              x2={cat.cx}
              y2={cat.cy - 30}
              stroke={lineColor}
              strokeWidth="1.5"
              opacity="0.6"
            />

            {/* Category circle */}
            <circle cx={cat.cx} cy={cat.cy} r={30} fill="none" stroke={lineColor} strokeWidth="2" />
            <text x={cat.cx} y={cat.cy} textAnchor="middle" dominantBaseline="middle" fill={textColor} fontSize="11" fontWeight="600">
              {cat.label}
            </text>

            {/* Leaf nodes */}
            {catLeaves.map((leaf, i) => {
              const lx = cat.cx - leafWidth / 2;
              const ly = leafStartY + i * leafSpacing;
              const lineCy = ly + leafHeight / 2;
              return (
                <g key={leaf.label}>
                  {/* Line from category to leaf */}
                  <line
                    x1={cat.cx}
                    y1={cat.cy + 30}
                    x2={cat.cx}
                    y2={lineCy}
                    stroke={lineColor}
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  {/* Leaf rounded rect */}
                  <rect
                    x={lx}
                    y={ly}
                    width={leafWidth}
                    height={leafHeight}
                    rx={leafRx}
                    fill="none"
                    stroke={leafColor}
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <text
                    x={cat.cx}
                    y={ly + leafHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={textColor}
                    fontSize="10"
                    opacity="0.85"
                  >
                    {leaf.label}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
