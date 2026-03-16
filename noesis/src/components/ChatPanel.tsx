'use client';

import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { useAPIKey } from '@/hooks/useAPIKey';

// ─── Mode definitions ────────────────────────────────────────────────────────

const MODES = [
  {
    id: 'tutor',
    icon: '🤖',
    label: 'AI Tutor',
    color: '#0071e3',
    placeholder: 'Ask anything about this topic…',
    starter: (title: string) =>
      `Hi! I'm your AI tutor for **${title}**.\n\nWhat would you like to understand? No question is too basic.`,
    system: (title: string) =>
      `You are a sharp, energetic AI tutor inside Noesis — a data management education platform built by Raja Shahnawaz Soni, a senior MDM architect and data leader with 20+ years of enterprise experience.
Topic: ${title}.
Style: precise, practitioner-level, real-world analogies always. Use **bold** for key terms. Use ## headings for multi-part answers. Connect concepts to enterprise realities. Never give textbook-only answers.`,
  },
  {
    id: 'quiz',
    icon: '⚡',
    label: 'Quiz Me',
    color: '#d97706',
    placeholder: 'Type your answer…',
    starter: null as ((title: string) => string) | null,
    system: (title: string) =>
      `You are a quiz engine for ${title} inside Noesis (built by Raja Shahnawaz Soni, MDM architect).
QUIZ MODE: Ask ONE creative real-world enterprise scenario question (not MCQ). After the answer use ## to structure feedback: ## What You Got Right, ## What Was Missing, ## The Full Picture. Always offer another round. Make scenarios feel like real enterprise situations.`,
  },
  {
    id: 'teach',
    icon: '🎤',
    label: 'Teach It Back',
    color: '#059669',
    placeholder: 'Explain it in your own words…',
    starter: (title: string) =>
      `Pick any concept from **${title}** and explain it to me like teaching a colleague.\n\nPlain English is fine — I'll grade you **/10** and tell you exactly what landed and what didn't. 🎤`,
    system: (title: string) =>
      `You are a grader inside Noesis for ${title} (built by Raja Shahnawaz Soni).
EXPLAIN-BACK MODE: The student explains a concept. Grade it /10. Use ## Score, ## What Landed, ## What Was Missing, ## What You Should Know. Be warm but precise. Reward genuine understanding over memorised definitions.`,
  },
  {
    id: 'confess',
    icon: '🎪',
    label: 'Confession Booth',
    color: '#6d28d9',
    placeholder: "What don't you actually understand?",
    starter: (title: string) =>
      `Confession Booth 🎪\n\nZero judgment. Zero shame.\n\nWhat's *really* confusing you about **${title}**? Even the stuff you'd never ask in a meeting — especially that.`,
    system: (title: string) =>
      `You are the Confession Booth inside Noesis for ${title} (built by Raja Shahnawaz Soni, MDM practitioner).
CONFESSION MODE: Zero judgment, ever. Structure every answer: ## The Simple Truth, ## Why It Confuses Everyone, ## The Analogy That Makes It Click, ## One Thing To Remember. Celebrate honesty loudly. Make complex enterprise concepts feel approachable.`,
  },
  {
    id: 'socratic',
    icon: '🏛️',
    label: 'Socratic',
    color: '#e11d48',
    placeholder: 'Answer, or ask — the dialogue leads you there…',
    starter: (title: string) =>
      `Welcome to Socratic Dialogue 🏛️\n\nI won't explain anything directly. I'll ask you questions — one at a time — that guide you to the answer yourself.\n\nLet's start with **${title}**. What do you already think you know about it?`,
    system: (title: string) =>
      `You are a Socratic tutor inside Noesis for ${title} (built by Raja Shahnawaz Soni).
SOCRATIC MODE: NEVER give direct answers or explanations. ONLY ask probing questions that lead the student to discover concepts themselves. One question at a time. If they answer well, acknowledge briefly then probe deeper. If stuck, simplify with a more accessible question. If they ask you to explain directly, gently decline and reframe as a question. End every response with exactly one question.`,
  },
];

// ─── Anthropic streaming helper ───────────────────────────────────────────────

async function callAnthropic(
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
  system: string,
  onChunk: (text: string) => void
): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens: 900,
      system,
      stream: true,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'API error');
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let full = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    for (const line of chunk.split('\n')) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === 'content_block_delta' && data.delta?.text) {
            full += data.delta.text;
            onChunk(full);
          }
        } catch {
          // ignore malformed SSE lines
        }
      }
    }
  }
  return full;
}

// ─── Markdown renderer ────────────────────────────────────────────────────────

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <div
          key={i}
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: '#1d1d1f',
            marginTop: 14,
            marginBottom: 4,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            paddingBottom: 3,
          }}
        >
          {line.slice(3)}
        </div>
      );
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return (
        <div key={i} style={{ paddingLeft: 16, marginBottom: 3, color: '#1d1d1f', lineHeight: 1.7 }}>
          • {line.slice(2)}
        </div>
      );
    }
    if (line.trim() === '') {
      return <div key={i} style={{ height: 6 }} />;
    }
    // Bold and code inline
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
      <div key={i} style={{ lineHeight: 1.75, marginBottom: 2, color: '#1d1d1f' }}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code
                key={j}
                style={{
                  background: '#f0f6ff',
                  borderRadius: 4,
                  padding: '1px 5px',
                  fontSize: '0.88em',
                  color: '#0071e3',
                }}
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return part;
        })}
      </div>
    );
  });
}

// ─── Typing dots animation ────────────────────────────────────────────────────

function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#0071e3',
            display: 'inline-block',
            animation: `dotBounce 1s ${i * 0.18}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`@keyframes dotBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
    </span>
  );
}

// ─── API Key prompt ───────────────────────────────────────────────────────────

function APIKeyPrompt({ onSave }: { onSave: (key: string) => void }) {
  const [value, setValue] = useState('');
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    if (!value.trim()) return;
    setTesting(true);
    setError('');
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': value.trim(),
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 5,
          messages: [{ role: 'user', content: 'hi' }],
        }),
      });
      if (r.ok) {
        onSave(value.trim());
      } else {
        const e = await r.json();
        setError(e.error?.message || 'Invalid key.');
      }
    } catch {
      setError('Network error — check your connection.');
    }
    setTesting(false);
  }

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f', marginBottom: 4 }}>
          Unlock AI Learning Modes
        </div>
        <div style={{ fontSize: 12, color: '#6e6e73', lineHeight: 1.6 }}>
          Enter your Anthropic API key to unlock 5 AI-powered learning modes for this topic. Your key stays in your
          browser — never sent to our servers.{' '}
          <a
            href="https://console.anthropic.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0071e3' }}
          >
            Get a key →
          </a>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="password"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          placeholder="sk-ant-api03-…"
          style={{
            flex: 1,
            background: '#f5f5f7',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: 10,
            padding: '10px 14px',
            fontSize: 13,
            color: '#1d1d1f',
            outline: 'none',
          }}
          disabled={testing}
        />
        <button
          onClick={handleSave}
          disabled={testing || !value.trim()}
          style={{
            background: '#0071e3',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: 13,
            fontWeight: 600,
            cursor: testing || !value.trim() ? 'not-allowed' : 'pointer',
            opacity: testing || !value.trim() ? 0.5 : 1,
          }}
        >
          {testing ? 'Testing…' : 'Connect'}
        </button>
      </div>
      {error && (
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: '#e11d48',
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: 8,
            padding: '8px 12px',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

// ─── Chat modal ───────────────────────────────────────────────────────────────

type Message = { role: string; content: string; id: number };
type Mode = (typeof MODES)[0];

function ChatModal({
  apiKey,
  mode,
  topicSlug,
  topicTitle,
  onClose,
}: {
  apiKey: string;
  mode: Mode;
  topicSlug: string;
  topicTitle: string;
  onClose: () => void;
}) {
  const histKey = `noesis__chat__${topicSlug}__${mode.id}`;
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(histKey) || '[]');
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState('');
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const model = 'claude-haiku-4-5-20251001';

  // Save to localStorage on message change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(histKey, JSON.stringify(messages.slice(-40)));
      } catch {
        // ignore storage errors
      }
    }
  }, [messages, histKey]);

  // Initialize with starter message
  useEffect(() => {
    if (messages.length > 0) return;
    if (mode.starter) {
      setMessages([{ role: 'assistant', content: mode.starter(topicTitle), id: Date.now() }]);
    } else {
      // Quiz mode: kick off first question
      kickStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, stream]);

  async function kickStart() {
    setLoading(true);
    setStream('');
    try {
      let out = '';
      await callAnthropic(
        apiKey,
        model,
        [{ role: 'user', content: 'Begin.' }],
        mode.system(topicTitle),
        t => {
          out = t;
          setStream(t);
        }
      );
      setStream('');
      setMessages([{ role: 'assistant', content: out, id: Date.now() }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error');
    }
    setLoading(false);
  }

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim(), id: Date.now() };
    const all = [...messages, userMsg];
    setMessages(all);
    setInput('');
    setLoading(true);
    setStream('');
    setError('');
    try {
      let out = '';
      await callAnthropic(
        apiKey,
        model,
        all.map(m => ({ role: m.role, content: m.content })),
        mode.system(topicTitle),
        t => {
          out = t;
          setStream(t);
        }
      );
      setStream('');
      setMessages(prev => [...prev, { role: 'assistant', content: out, id: Date.now() }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error');
    }
    setLoading(false);
  }

  function clearHistory() {
    try {
      localStorage.removeItem(histKey);
    } catch {
      // ignore storage errors
    }
    setMessages([]);
    setError('');
    if (mode.starter) {
      setMessages([{ role: 'assistant', content: mode.starter(topicTitle), id: Date.now() }]);
    } else {
      kickStart();
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 700,
          background: 'white',
          border: `1.5px solid ${mode.color}30`,
          borderRadius: 24,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '88vh',
          boxShadow: `0 24px 60px ${mode.color}15, 0 4px 24px rgba(0,0,0,0.12)`,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${mode.color}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: `${mode.color}06`,
            borderRadius: '22px 22px 0 0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `${mode.color}15`,
                border: `1.5px solid ${mode.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}
            >
              {mode.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: mode.color }}>{mode.label}</div>
              <div style={{ fontSize: 11, color: '#86868b' }}>{topicTitle} · claude-haiku</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {messages.length > 1 && (
              <button
                onClick={clearHistory}
                style={{
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  color: '#92400e',
                  borderRadius: 8,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.1)',
                color: '#6e6e73',
                borderRadius: 8,
                padding: '6px 14px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {messages.map(m => (
            <div
              key={m.id}
              style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}
            >
              {m.role === 'user' ? (
                <div
                  style={{
                    maxWidth: '76%',
                    background: `${mode.color}12`,
                    border: `1px solid ${mode.color}30`,
                    borderRadius: '16px 16px 4px 16px',
                    padding: '10px 14px',
                    color: mode.color,
                    fontSize: 14,
                    lineHeight: 1.65,
                    fontWeight: 500,
                  }}
                >
                  {m.content}
                </div>
              ) : (
                <div
                  style={{
                    maxWidth: '84%',
                    background: '#f5f5f7',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '4px 16px 16px 16px',
                    padding: '12px 16px',
                    fontSize: 14,
                  }}
                >
                  {renderMarkdown(m.content)}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  background: '#f5f5f7',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '4px 16px 16px 16px',
                  padding: '12px 16px',
                  maxWidth: '84%',
                  fontSize: 14,
                }}
              >
                {stream ? renderMarkdown(stream) : <TypingDots />}
              </div>
            </div>
          )}
          {error && (
            <div
              style={{
                background: '#fff1f2',
                border: '1px solid #fecdd3',
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: 12,
                color: '#be123c',
              }}
            >
              {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: '12px 16px',
            borderTop: `1px solid ${mode.color}15`,
            display: 'flex',
            gap: 8,
            background: '#fafafa',
            borderRadius: '0 0 22px 22px',
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder={mode.placeholder}
            disabled={loading}
            style={{
              flex: 1,
              background: 'white',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 14,
              color: '#1d1d1f',
              outline: 'none',
            }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              background: mode.color,
              border: 'none',
              color: 'white',
              borderRadius: 10,
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 700,
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              opacity: loading || !input.trim() ? 0.4 : 1,
            }}
          >
            Send ↵
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────

export function ChatPanel({ slug, topicTitle }: { slug: string; topicTitle: string }) {
  const { apiKey, setApiKey, loaded } = useAPIKey();
  const [activeMode, setActiveMode] = useState<Mode | null>(null);

  if (!loaded) return null;

  return (
    <section className="mb-12 pt-8 border-t border-[var(--color-glass-border)]">
      <div className="mb-6">
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1d1d1f', marginBottom: 4 }}>AI Learning Modes</h2>
        <p style={{ fontSize: 13, color: '#6e6e73' }}>Five ways to go deeper — using your own Anthropic API key.</p>
      </div>

      {!apiKey ? (
        <APIKeyPrompt onSave={setApiKey} />
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: 10,
              marginBottom: 8,
            }}
          >
            {MODES.map(mode => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode)}
                style={{
                  background: 'white',
                  border: `1.5px solid ${mode.color}30`,
                  borderRadius: 12,
                  padding: '12px 10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = mode.color;
                  (e.currentTarget as HTMLButtonElement).style.background = `${mode.color}06`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${mode.color}30`;
                  (e.currentTarget as HTMLButtonElement).style.background = 'white';
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>{mode.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: mode.color, letterSpacing: 0.3 }}>
                  {mode.label}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setApiKey('')}
            style={{
              fontSize: 11,
              color: '#86868b',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Disconnect key
          </button>
        </>
      )}

      {activeMode && (
        <ChatModal
          apiKey={apiKey}
          mode={activeMode}
          topicSlug={slug}
          topicTitle={topicTitle}
          onClose={() => setActiveMode(null)}
        />
      )}
    </section>
  );
}
