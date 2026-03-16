'use client';

import { useState, useEffect, useRef } from 'react';

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
    exchanges: (_title) => [
      {
        role: 'user',
        content: "What's the difference between Data Quality and Data Governance? Aren't they the same thing?",
        delay: 800,
      },
      {
        role: 'assistant',
        content: `They're not — and confusing them is why most DQ projects fail within a year.\n\n**Data Quality is a measurement.** It tells you the current state of your data against defined standards: 94% email completeness, 12% duplicate rate, 3% invalid postcodes.\n\n**Data Governance is the operating model** that determines who defines those standards, who enforces them, and who's accountable when they're breached.\n\nHere's the test that makes it real: your best data engineer runs a DQ sprint — cleans 200,000 records. Six months later, the same problems are back. Why?\n\nBecause DQ without Governance is a event, not a system. You fixed symptoms. The cause — no ownership, no prevention rules, no accountability — was never touched.\n\n**Governance is what makes Quality sustainable.** One without the other is either unsustainable or theoretical. Which one does your organisation currently have more of?`,
        delay: 4500,
        typingBefore: 1400,
      },
    ],
  },
  quiz: {
    icon: '⚡',
    label: 'Quiz Me',
    color: '#d97706',
    exchanges: (_title) => [
      {
        role: 'assistant',
        content: `⚡ **One question. Deceptively simple.**\n\nA retailer runs MDM deduplication across their systems.\n\nBefore: **2.1 million** customer records.\nAfter: **890,000** golden records.\n\nThe CEO walks in and asks: *"How many customers do we have?"*\n\nWhat number do you give — and why?`,
        delay: 600,
        typingBefore: 1000,
      },
      {
        role: 'user',
        content: "890,000 — that's the real deduplicated count. The 2.1M had duplicates.",
        delay: 4800,
      },
      {
        role: 'assistant',
        content: `✅ Partially right. But there's a trap — and most practitioners fall into it.\n\n**890,000** is correct for: marketing reach, loyalty analysis, customer profitability, personalisation.\n\n**2.1 million** is still the right number for: system migration scope, legacy reporting continuity, capacity planning, support ticket volumes.\n\nNeither is universally "correct". The CEO's question has no single answer — **until your organisation has a governed definition of 'Customer' that everyone agrees on.**\n\nMost don't. That's why the CFO and CMO quote different numbers in the same board meeting and both feel justified.\n\n**Harder follow-up:** what is the *first governance artefact* you'd create to resolve this permanently? Not a tool. Not a project. One document.`,
        delay: 8500,
        typingBefore: 1600,
      },
    ],
  },
  teach: {
    icon: '🎤',
    label: 'Teach It Back',
    color: '#7c3aed',
    exchanges: (_title) => [
      {
        role: 'assistant',
        content: `Teach me MDM — assume I know nothing.\n\nStart anywhere. I'll listen, and I'll push back where I find gaps.`,
        delay: 600,
        typingBefore: 700,
      },
      {
        role: 'user',
        content: "MDM creates a single source of truth so everyone in the business uses the same data",
        delay: 3200,
      },
      {
        role: 'assistant',
        content: `"Single source of truth" — I hear this phrase constantly. I want to challenge it.\n\nAfter MDM is implemented, the CRM still exists. The ERP still exists. The loyalty platform still exists. Three systems, all still running.\n\n**MDM didn't eliminate multiple sources. So how can there be a "single" source of truth?**\n\nWhat MDM actually does is subtler — and more powerful. It governs *which system is authoritative for which attribute*, and *how the others sync to it*. The CRM owns email. The ERP owns payment terms. The golden record holds the reconciled view.\n\nThat's not "one source". It's **governed authority distribution**.\n\nNow revise your explanation with that in mind. What does MDM *actually* do — in one sentence that a CFO would understand?`,
        delay: 7200,
        typingBefore: 1600,
      },
    ],
  },
  confession: {
    icon: '🎪',
    label: 'Confession Booth',
    color: '#dc2626',
    exchanges: (_title) => [
      {
        role: 'assistant',
        content: `Welcome to the Confession Booth.\n\nTell me your data sin. No judgment — just an honest diagnosis and a realistic path forward.`,
        delay: 600,
        typingBefore: 800,
      },
      {
        role: 'user',
        content: "We spent 18 months and £2M building a data warehouse. Nobody uses it.",
        delay: 3200,
      },
      {
        role: 'assistant',
        content: `I've heard this confession more than any other. And I can tell you exactly what happened — without knowing anything else about your organisation.\n\n**One of three things. Possibly all three.**\n\n**① The data isn't trusted.** Someone ran a report, found a number that didn't match their spreadsheet, and went back to the spreadsheet. The warehouse became a monument to distrust. Every number in it is now assumed guilty until proven innocent.\n\n**② It answers the wrong questions.** The team built what *they thought* the business needed. Nobody validated with actual users before a line of code was written. The business needed something else.\n\n**③ No self-service layer.** The data is there — but users have to raise a ticket with IT for every report. So they stopped asking. IT thinks it's a success because "the pipeline runs clean". The business thinks it's useless.\n\nWhich one resonates most?\n\nBecause the fix for each is completely different — and **conflating them is how organisations spend another 18 months arriving at the same place.**`,
        delay: 7500,
        typingBefore: 1800,
      },
    ],
  },
  socratic: {
    icon: '🏛️',
    label: 'Socratic',
    color: '#0891b2',
    exchanges: (_title) => [
      {
        role: 'assistant',
        content: `Here's a question that sounds simple but isn't:\n\nEquipment **depreciates** — it loses value with use and age, and appears on the balance sheet accordingly.\n\nData does the **opposite**: a customer record becomes more valuable over time as you add purchase history, behavioural signals, and interaction context.\n\n**If data appreciates like a financial asset — why does almost no organisation treat it like one?**`,
        delay: 600,
        typingBefore: 1100,
      },
      {
        role: 'user',
        content: "Because it's intangible? Hard to put a number on it?",
        delay: 5200,
      },
      {
        role: 'assistant',
        content: `True — but push further. "Hard to value" is the symptom, not the cause.\n\nWhen a *physical* asset appreciates — a property, a piece of specialist equipment — what do organisations do? They insure it. They maintain it. They assign an owner. They track it.\n\n**Data gets none of that rigour** in most organisations. No owner. No maintenance schedule. No insurance against loss or corruption.\n\nNow here's the real question — and take your time:\n\nIf your organisation *did* treat its customer data like a property portfolio — with assigned stewards, maintenance schedules, and quarterly valuations — **what is the single most uncomfortable change that would require?**\n\nNot technically. Organisationally. Politically. Who would have to give something up?`,
        delay: 9500,
        typingBefore: 1600,
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
  const containerRef = useRef<HTMLDivElement>(null);

  const preview = PREVIEWS[modeId];
  const exchanges = preview?.exchanges(topicTitle) ?? [];

  // Scroll only the preview container — never the outer page
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleCount, showTyping]);

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
    <div ref={containerRef} className="h-72 overflow-y-auto px-4 py-4 space-y-3">
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
          <div className="flex gap-1 items-center">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
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
