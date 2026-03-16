'use client';

import { useState, useEffect } from 'react';

// ── Simple inline markdown renderer ──────────────────────────────────────────
function renderLine(text: string, key: number) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <span key={key}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
        if (part.startsWith('`') && part.endsWith('`'))
          return <code key={i} className="bg-[rgba(255,255,255,0.15)] px-1 rounded text-[10px] font-mono">{part.slice(1, -1)}</code>;
        return part;
      })}
    </span>
  );
}

function renderPreviewMarkdown(text: string) {
  return text.split('\n').map((line, i) => (
    <p key={i} className={line === '' ? 'h-2' : 'leading-relaxed'}>
      {renderLine(line, i)}
    </p>
  ));
}

// ── Typing dots ───────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex gap-1 items-center py-0.5 px-1">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

// ── Pre-scripted preview conversations ───────────────────────────────────────
// Each exchange has: role, content, delay (ms from start), typingBefore (ms of typing indicator)
interface Exchange {
  role: 'user' | 'assistant';
  content: string;
  delay: number;       // when this message appears
  typingBefore?: number; // how long before delay to show typing dots (assistant only)
}

const PREVIEWS: Record<string, {
  icon: string;
  label: string;
  color: string;
  exchanges: (title: string) => Exchange[];
}> = {
  tutor: {
    icon: '🤖',
    label: 'AI Tutor',
    color: '#0071e3',
    exchanges: (title) => [
      {
        role: 'assistant',
        content: `Hi! I'm your AI tutor for **${title}**.\n\nWhat would you like to understand? No question is too basic — start anywhere.`,
        delay: 600,
        typingBefore: 900,
      },
      {
        role: 'user',
        content: 'Can you give me a real-world example of why this matters?',
        delay: 2800,
      },
      {
        role: 'assistant',
        content: `The best way to understand **${title}** is through what *breaks* when it's wrong.\n\nImagine a business decision made from a report that's technically built on unmanaged data — duplicate records, inconsistent definitions, stale values. The decision is wrong. Nobody knows why for months.\n\n**That's the data management problem in practice.** Let's dig into the specifics →`,
        delay: 5200,
        typingBefore: 1400,
      },
    ],
  },
  quiz: {
    icon: '⚡',
    label: 'Quiz Me',
    color: '#d97706',
    exchanges: (title) => [
      {
        role: 'assistant',
        content: `⚡ **Quiz time.** Topic: **${title}**. I'll start easy and get harder.\n\nQuestion 1: Name the six dimensions of Data Quality.`,
        delay: 600,
        typingBefore: 900,
      },
      {
        role: 'user',
        content: 'Accuracy, completeness, consistency, timeliness... and two more?',
        delay: 3000,
      },
      {
        role: 'assistant',
        content: `✅ **4/6 — solid start.** The two you're missing: **uniqueness** (no duplicates) and **validity** (data conforms to defined rules and formats).\n\nNow harder: which of those six is most critical for **${title}** data — and why? Think before you answer.`,
        delay: 5500,
        typingBefore: 1200,
      },
    ],
  },
  teach: {
    icon: '🎤',
    label: 'Teach It Back',
    color: '#7c3aed',
    exchanges: (title) => [
      {
        role: 'assistant',
        content: `Teach me **${title}** in your own words — as if I knew nothing.\n\nStart wherever feels natural. I'll listen, ask questions, and surface the gaps.`,
        delay: 600,
        typingBefore: 800,
      },
      {
        role: 'user',
        content: "It's basically about making sure data is clean and in the right place across systems",
        delay: 2900,
      },
      {
        role: 'assistant',
        content: `Good — you've got the spirit of it.\n\nBut push deeper on "clean". What makes data *unclean* specifically in **${title}**? Give me a concrete example of a dirty record and trace what it causes downstream. That's where the real understanding lives.`,
        delay: 5400,
        typingBefore: 1300,
      },
    ],
  },
  confession: {
    icon: '🎪',
    label: 'Confession Booth',
    color: '#dc2626',
    exchanges: (title) => [
      {
        role: 'assistant',
        content: `Welcome to the Confession Booth.\n\nTell me about a real data problem you've seen or lived through — related to **${title}**. No judgment. Just diagnosis and a path forward.`,
        delay: 600,
        typingBefore: 900,
      },
      {
        role: 'user',
        content: "We had a data quality issue go undetected for months and it corrupted our quarterly reporting",
        delay: 3000,
      },
      {
        role: 'assistant',
        content: `That's one of the most common confessions — and one of the costliest.\n\nThe root cause is almost always the same: **no data quality monitoring, no SLAs, no ownership**. Quality issues are invisible until they're catastrophic.\n\nTwo questions: How did you eventually catch it? And when you did — who owned the fix?`,
        delay: 5600,
        typingBefore: 1400,
      },
    ],
  },
  socratic: {
    icon: '🏛️',
    label: 'Socratic',
    color: '#0891b2',
    exchanges: (title) => [
      {
        role: 'assistant',
        content: `Let's think together about **${title}**.\n\nI won't give you answers — I'll ask questions until you find them yourself.\n\nFirst: why do organisations struggle with data management even when they have good intentions?`,
        delay: 600,
        typingBefore: 1000,
      },
      {
        role: 'user',
        content: "It's hard to prioritise — data problems are invisible until something goes wrong",
        delay: 3100,
      },
      {
        role: 'assistant',
        content: `Exactly right — and that's the key insight.\n\nSo if data problems are *invisible* until they become *crises*... what would need to be true for an organisation to invest in **${title}** *before* the crisis hits? What needs to change — in culture, in accountability, in metrics?`,
        delay: 5800,
        typingBefore: 1300,
      },
    ],
  },
};

// ── ChatPreview component ─────────────────────────────────────────────────────
interface ChatPreviewProps {
  topicTitle: string;
  modeId: string;
}

export function ChatPreview({ topicTitle, modeId }: ChatPreviewProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [loopKey, setLoopKey] = useState(0);

  const preview = PREVIEWS[modeId];
  const exchanges = preview?.exchanges(topicTitle) ?? [];

  // Reset loopKey when mode or topic changes so the new preview starts at iteration 0
  useEffect(() => { setLoopKey(0); }, [modeId, topicTitle]);

  useEffect(() => {
    setVisibleCount(0);
    setShowTyping(false);

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    exchanges.forEach((msg, i) => {
      // Show typing dots before assistant messages — clamp to 0 so negative delays fire immediately
      if (msg.role === 'assistant' && msg.typingBefore) {
        const t = setTimeout(() => setShowTyping(true), Math.max(0, msg.delay - msg.typingBefore));
        timeouts.push(t);
      }
      // Show the message
      const t2 = setTimeout(() => {
        setShowTyping(false);
        setVisibleCount(i + 1);
      }, msg.delay);
      timeouts.push(t2);
    });

    // Loop: increment loopKey so the effect re-runs and reschedules all timeouts from scratch
    const lastDelay = exchanges[exchanges.length - 1]?.delay ?? 0;
    const loopTimeout = setTimeout(() => setLoopKey(k => k + 1), lastDelay + 3000);
    timeouts.push(loopTimeout);

    return () => timeouts.forEach(clearTimeout);
  // loopKey intentionally in deps — it triggers the restart
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeId, topicTitle, loopKey]);

  const color = preview?.color ?? '#0071e3';

  return (
    <div className="h-56 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
      {exchanges.slice(0, visibleCount).map((msg, i) => (
        <div
          key={`${modeId}-${i}`}
          className={['flex', msg.role === 'user' ? 'justify-end' : 'justify-start'].join(' ')}
          style={{ animation: 'chatMsgIn 0.3s ease forwards' }}
        >
          <div
            className={[
              'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs',
              msg.role === 'user'
                ? 'text-white rounded-br-sm'
                : 'bg-white border border-[var(--color-glass-border)] text-[var(--color-text-primary)] rounded-bl-sm shadow-sm',
            ].join(' ')}
            style={msg.role === 'user' ? { background: color } : {}}
          >
            {msg.role === 'assistant'
              ? renderPreviewMarkdown(msg.content)
              : <p className="leading-relaxed">{msg.content}</p>
            }
          </div>
        </div>
      ))}

      {showTyping && (
        <div className="flex justify-start" style={{ animation: 'chatMsgIn 0.2s ease forwards' }}>
          <div className="bg-white border border-[var(--color-glass-border)] rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm">
            <TypingDots />
          </div>
        </div>
      )}

      {visibleCount === 0 && !showTyping && (
        <div className="flex items-center justify-center h-full">
          <p className="text-xs text-[var(--color-text-muted)]">Starting preview…</p>
        </div>
      )}

      <style>{`
        @keyframes chatMsgIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Export PREVIEWS so ChatPanel can read the mode list
export { PREVIEWS };
