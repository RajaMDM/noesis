'use client';

import { useState, useEffect } from 'react';

const QUOTES = [
  { q: "Without data, you're just another person with an opinion.", a: "W. Edwards Deming", cat: "data" },
  { q: "In God we trust. All others must bring data.", a: "W. Edwards Deming", cat: "data" },
  { q: "The goal is to turn data into information, and information into insight.", a: "Carly Fiorina, former CEO of HP", cat: "data" },
  { q: "Torture the data, and it will confess to anything.", a: "Ronald Coase, Nobel Laureate", cat: "data" },
  { q: "If you cannot measure it, you cannot improve it.", a: "Lord Kelvin", cat: "data" },
  { q: "Data are becoming the new raw material of business.", a: "Craig Mundie, Microsoft", cat: "data" },
  { q: "Artificial intelligence is the new electricity.", a: "Andrew Ng, AI Pioneer", cat: "ai" },
  { q: "AI will be the greatest opportunity for value creation in the history of business.", a: "Jensen Huang, CEO of NVIDIA", cat: "ai" },
  { q: "The question is not whether machines can think. The question is whether we can govern the data they think with.", a: "Kai-Fu Lee", cat: "ai" },
  { q: "Garbage in, garbage out. With AI, it's: garbage in, confidently wrong output at scale.", a: "Thomas C. Redman", cat: "dq" },
  { q: "Eighty percent of the work in any data project is just getting data to the point where you can use it.", a: "DJ Patil, Former US Chief Data Scientist", cat: "dq" },
  { q: "Data quality is not a technology problem. It is a business problem with a technology symptom.", a: "Thomas C. Redman", cat: "dq" },
  { q: "AI amplifies whatever is in the data — the insights and the errors equally.", a: "Hilary Mason, Data Scientist", cat: "dq" },
  { q: "An AI model is only as trustworthy as the data it was trained on. Bad data encodes bias permanently.", a: "Kate Crawford, AI Now Institute", cat: "dq" },
  { q: "You can't fix a bad data foundation with a better algorithm. The algorithm will just fail more efficiently.", a: "Monica Rogati, AI & Data Advisor", cat: "dq" },
];

const CAT_CONFIG = {
  data: { label: '📊 Data Wisdom', color: '#0071e3', bg: '#eff6ff' },
  ai:   { label: '🤖 AI Era', color: '#6d28d9', bg: '#f5f3ff' },
  dq:   { label: '⚠️ Data Quality × AI', color: '#d97706', bg: '#fffbeb' },
};

export function QuoteRotator() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % QUOTES.length);
        setVisible(true);
      }, 400);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const q = QUOTES[idx];
  const cat = CAT_CONFIG[q.cat as keyof typeof CAT_CONFIG];

  return (
    <div style={{
      background: 'white',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: 16,
      padding: '20px 24px',
      boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
      transition: 'opacity 0.4s ease',
      opacity: visible ? 1 : 0,
      minHeight: 100,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: 0.8,
          color: cat.color, background: cat.bg,
          border: `1px solid ${cat.color}30`,
          borderRadius: 20, padding: '3px 10px',
        }}>
          {cat.label}
        </span>
        <span style={{ fontSize: 10, color: '#86868b' }}>{idx + 1} / {QUOTES.length}</span>
      </div>
      <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 8 }}>
        &ldquo;{q.q}&rdquo;
      </p>
      <p style={{ fontSize: 12, fontWeight: 700, color: cat.color }}>— {q.a}</p>
    </div>
  );
}
