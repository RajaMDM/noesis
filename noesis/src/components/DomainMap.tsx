'use client';

import React from 'react';

// Unique animation suffix
const S = 'dm';

const NODES = [
  { id: 'party',     label: 'Party',     sub: 'Customer · Supplier · Employee', cx: 140, cy: 100, color: '#0071e3' },
  { id: 'product',   label: 'Product',   sub: 'F&B · Apparel · Beauty', cx: 460, cy: 100, color: '#7c3aed' },
  { id: 'location',  label: 'Location',  sub: 'Store · Hierarchy · Listings', cx: 300, cy: 340, color: '#0891b2' },
  { id: 'financial', label: 'Financial', sub: 'CoA · Cost Centre · Legal Entity', cx: 90,  cy: 270, color: '#d97706' },
  { id: 'asset',     label: 'Asset',     sub: 'Equipment · Property · DAM', cx: 510, cy: 270, color: '#059669' },
];

const EDGES = [
  { from: 'party',     to: 'product',   label: 'Supplier → Product listing' },
  { from: 'party',     to: 'location',  label: 'Customer ↔ Store catchment' },
  { from: 'party',     to: 'financial', label: 'Customer revenue · Supplier COGS' },
  { from: 'product',   to: 'location',  label: 'Range · Allocation by site' },
  { from: 'product',   to: 'financial', label: 'Revenue by category' },
  { from: 'product',   to: 'asset',     label: 'DAM: product imagery' },
  { from: 'location',  to: 'financial', label: 'Store P&L · Cost centre' },
  { from: 'asset',     to: 'location',  label: 'Equipment at site · Property' },
  { from: 'asset',     to: 'financial', label: 'Asset valuation · Depreciation' },
];

function getNode(id: string) { return NODES.find(n => n.id === id)!; }

export function DomainMap() {
  return (
    <div className="w-full overflow-x-auto">
      <style>{`
        @keyframes drawLine-${S} {
          from { stroke-dashoffset: 400; opacity: 0; }
          to   { stroke-dashoffset: 0;   opacity: 1; }
        }
        @keyframes fadeInNode-${S} {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        .dm-edge { stroke-dasharray: 400; stroke-dashoffset: 400; opacity: 0; }
        .dm-node-g { opacity: 0; }
        ${EDGES.map((e, i) => `.dm-edge-${i} { animation: drawLine-${S} 0.6s ease forwards; animation-delay: ${0.3 + i * 0.1}s; }`).join('\n')}
        ${NODES.map((n, i) => `.dm-node-${n.id} { animation: fadeInNode-${S} 0.5s ease forwards; animation-delay: ${i * 0.15}s; }`).join('\n')}
      `}</style>
      <svg
        viewBox="0 0 600 440"
        className="w-full max-w-2xl mx-auto"
        style={{ minWidth: 320 }}
        aria-label="Domain relationship map"
      >
        {/* Background */}
        <rect width="600" height="440" rx="20" fill="#fafafa" />

        {/* Edges */}
        {EDGES.map((edge, i) => {
          const f = getNode(edge.from);
          const t = getNode(edge.to);
          const mx = (f.cx + t.cx) / 2;
          const my = (f.cy + t.cy) / 2;
          return (
            <g key={i}>
              <line
                x1={f.cx} y1={f.cy} x2={t.cx} y2={t.cy}
                stroke="#e5e5e7" strokeWidth="1.5"
                className={`dm-edge dm-edge-${i}`}
              />
              <text
                x={mx} y={my - 5}
                fontSize="8"
                fill="#86868b"
                textAnchor="middle"
                className={`dm-edge dm-edge-${i}`}
                style={{ fontFamily: 'ui-monospace, monospace' }}
              >
                {edge.label}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => (
          <g key={node.id} className={`dm-node-g dm-node-${node.id}`} style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}>
            {/* Shadow circle */}
            <circle cx={node.cx} cy={node.cy} r="42" fill="white" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))' }} />
            {/* Color ring */}
            <circle cx={node.cx} cy={node.cy} r="42" fill="none" stroke={node.color} strokeWidth="1.5" opacity="0.3" />
            {/* Inner accent */}
            <circle cx={node.cx} cy={node.cy} r="34" fill={node.color} opacity="0.06" />
            {/* Domain name */}
            <text
              x={node.cx} y={node.cy - 6}
              fontSize="11"
              fontWeight="700"
              fill={node.color}
              textAnchor="middle"
              style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
            >
              {node.label}
            </text>
            <text
              x={node.cx} y={node.cy + 8}
              fontSize="7"
              fill="#86868b"
              textAnchor="middle"
              style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
            >
              {node.sub}
            </text>
          </g>
        ))}
      </svg>
      <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">5 master data domains. Every enterprise data asset lives under one of them.</p>
    </div>
  );
}
