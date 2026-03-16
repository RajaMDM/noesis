'use client';

import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { useProviderKey, PROVIDERS, ProviderId } from '@/hooks/useProviderKey';
import { ChatPreview, PREVIEWS } from '@/components/ChatPreview';

// ─── Mode definitions (unchanged) ────────────────────────────────────────────
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
      `You are a sharp, energetic AI tutor inside Noesis — a data management education platform built by Raja Shahnawaz Soni, a senior MDM architect and data leader with 20+ years of enterprise experience.\nTopic: ${title}.\nStyle: precise, practitioner-level, real-world analogies always. Use **bold** for key terms. Use ## headings for multi-part answers. Connect concepts to enterprise realities. Never give textbook-only answers.`,
  },
  {
    id: 'quiz',
    icon: '⚡',
    label: 'Quiz Me',
    color: '#d97706',
    placeholder: 'Type your answer…',
    starter: null as ((title: string) => string) | null,
    system: (title: string) =>
      `You are a rigorous quiz master for Noesis. Topic: ${title}.\nAsk one question at a time. Wait for the answer. Grade it honestly (correct/partial/wrong with explanation). Then ask the next question. Questions range from basic definitions to tricky edge cases. Use **bold** for question text. After 5 questions, give a score and a one-line verdict.`,
  },
  {
    id: 'teach',
    icon: '🎤',
    label: 'Teach It Back',
    color: '#7c3aed',
    placeholder: 'Explain it in your own words…',
    starter: (title: string) =>
      `I want you to teach me **${title}** in your own words — as if I knew nothing.\n\nStart wherever feels right. I'll listen, ask questions, and help you find the gaps.`,
    system: (title: string) =>
      `You are a patient expert listener inside Noesis. Topic: ${title}.\nThe user will explain the topic. Your job: listen actively, ask Socratic follow-up questions when you spot gaps, gently correct misconceptions, and at the end give a structured "what you nailed / what needs work" feedback. Never lecture unprompted.`,
  },
  {
    id: 'confession',
    icon: '🎪',
    label: 'Confession Booth',
    color: '#dc2626',
    placeholder: 'Tell me your data sins…',
    starter: (title: string) =>
      `Welcome to the Confession Booth.\n\nTell me about a real data problem you've seen or lived through — related to ${title}. No judgment. Just diagnosis and a path forward.`,
    system: (title: string) =>
      `You are a wise, empathetic data management consultant inside Noesis. Topic: ${title}.\nThe user will confess a real data problem or mistake. Respond with: (1) validation — this is common, here's why, (2) root cause diagnosis, (3) a realistic remediation path. Never be preachy. Be the consultant who's seen it all and doesn't flinch.`,
  },
  {
    id: 'socratic',
    icon: '🏛️',
    label: 'Socratic',
    color: '#0891b2',
    placeholder: 'Answer the question…',
    starter: (title: string) =>
      `Let's think together about **${title}**.\n\nI won't give you answers — I'll ask questions. You'll find the answers yourself. Ready?`,
    system: (title: string) =>
      `You are a Socratic interlocutor inside Noesis. Topic: ${title}.\nNever give direct answers. Ask layered questions that lead the user to discover insights themselves. When they reach a correct insight, acknowledge it briefly and deepen with another question. When they're stuck, give a small hint as a question, not a statement.`,
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ─── Multi-provider AI call ───────────────────────────────────────────────────
async function callAI(
  providerId: string,
  model: string,
  apiKey: string,
  messages: Message[],
  systemPrompt: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (msg: string) => void,
) {
  try {
    let response: Response;

    if (providerId === 'anthropic') {
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model,
          max_tokens: 900,
          stream: true,
          system: systemPrompt,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
    } else if (providerId === 'openai' || providerId === 'mistral' || providerId === 'groq') {
      const baseUrls: Record<string, string> = {
        openai: 'https://api.openai.com/v1/chat/completions',
        mistral: 'https://api.mistral.ai/v1/chat/completions',
        groq: 'https://api.groq.com/openai/v1/chat/completions',
      };
      response = await fetch(baseUrls[providerId], {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          stream: true,
          max_tokens: 900,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      });
    } else if (providerId === 'google') {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: messages.map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }],
            })),
            generationConfig: { maxOutputTokens: 900 },
          }),
        }
      );
    } else {
      onError('Unknown provider');
      return;
    }

    if (!response.ok) {
      const errText = await response.text();
      let friendlyMsg = `API error (${response.status})`;
      try {
        const parsed = JSON.parse(errText);
        friendlyMsg = parsed?.error?.message || parsed?.message || friendlyMsg;
      } catch { /* keep default */ }
      onError(friendlyMsg);
      return;
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const json = JSON.parse(data);
          let chunk = '';
          if (providerId === 'anthropic') {
            if (json.type === 'content_block_delta' && json.delta?.type === 'text_delta') {
              chunk = json.delta.text;
            }
          } else if (providerId === 'google') {
            chunk = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
          } else {
            // OpenAI-compatible (openai, mistral, groq)
            chunk = json?.choices?.[0]?.delta?.content ?? '';
          }
          if (chunk) onChunk(chunk);
        } catch { /* skip malformed SSE line */ }
      }
    }
    onDone();
  } catch (err: unknown) {
    onError(err instanceof Error ? err.message : 'Network error');
  }
}

// ─── Markdown renderer (unchanged) ────────────────────────────────────────────
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      nodes.push(
        <ul key={`ul-${nodes.length}`} className="list-disc pl-5 my-2 space-y-1">
          {listItems.map((item, i) => <li key={i} className="text-sm">{renderInline(item)}</li>)}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      flushList();
      nodes.push(<p key={i} className="font-bold text-sm mt-3 mb-1 text-[var(--color-text-primary)]">{line.slice(3)}</p>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      listItems.push(line.slice(2));
    } else if (line.trim() === '') {
      flushList();
      nodes.push(<br key={i} />);
    } else {
      flushList();
      nodes.push(<p key={i} className="text-sm leading-relaxed">{renderInline(line)}</p>);
    }
  });
  flushList();
  return nodes;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-[var(--color-text-primary)]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-[rgba(0,113,227,0.08)] text-[var(--color-accent-blue)] px-1 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// ─── Typing dots ────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex gap-1 items-center py-1">
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

// ─── Provider Selector UI ───────────────────────────────────────────────────
interface ProviderKeySetupProps {
  onSave: () => void;
}

function ProviderKeySetup({ onSave }: ProviderKeySetupProps) {
  const { provider, model, apiKey, currentProviderConfig, setProvider, setModel, setApiKey } = useProviderKey();
  const [draft, setDraft] = useState('');
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setDraft(''); setError(''); }, [provider]);

  async function handleTest() {
    const key = draft.trim();
    if (!key) { setError('Enter your API key first.'); return; }
    setTesting(true);
    setError('');
    let ok = false;
    try {
      if (provider === 'anthropic') {
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true', 'content-type': 'application/json' },
          body: JSON.stringify({ model: model || currentProviderConfig.defaultModel, max_tokens: 10, messages: [{ role: 'user', content: 'hi' }] }),
        });
        ok = r.status !== 401 && r.status !== 403;
      } else if (provider === 'openai' || provider === 'mistral' || provider === 'groq') {
        const urls: Record<string, string> = { openai: 'https://api.openai.com/v1/models', mistral: 'https://api.mistral.ai/v1/models', groq: 'https://api.groq.com/openai/v1/models' };
        const r = await fetch(urls[provider], { headers: { Authorization: `Bearer ${key}` } });
        ok = r.status !== 401 && r.status !== 403;
      } else if (provider === 'google') {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        ok = r.status !== 400 && r.status !== 403;
      }
    } catch { ok = false; }
    setTesting(false);
    if (ok) {
      setApiKey(key);
      onSave();
    } else {
      setError('Key rejected. Double-check it and try again.');
    }
  }

  return (
    <div className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-6 shadow-[var(--shadow-glass)]">
      <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1">Choose your AI</h3>
      <p className="text-xs text-[var(--color-text-muted)] mb-5">Your key is stored only in this browser. Never sent to any server.</p>

      {/* Provider pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PROVIDERS.map(p => (
          <button
            key={p.id}
            onClick={() => setProvider(p.id as ProviderId)}
            className={[
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-all border',
              provider === p.id
                ? 'bg-[var(--color-accent-blue)] text-white border-[var(--color-accent-blue)]'
                : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-glass-border)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)]',
            ].join(' ')}
          >
            {p.shortName}
          </button>
        ))}
      </div>

      {/* Model — free-text with datalist suggestions */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-[var(--color-text-secondary)] block mb-1.5">
          Model
          <a
            href={currentProviderConfig.modelsDocsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-[var(--color-accent-blue)] hover:underline font-normal"
          >
            Browse all models →
          </a>
        </label>
        <datalist id={`models-${provider}`}>
          {currentProviderConfig.suggestions.map(s => <option key={s} value={s} />)}
        </datalist>
        <input
          type="text"
          list={`models-${provider}`}
          value={model}
          onChange={e => setModel(e.target.value)}
          placeholder={currentProviderConfig.defaultModel}
          className="w-full text-sm border border-[var(--color-glass-border)] rounded-xl px-3 py-2 text-[var(--color-text-primary)] bg-white focus:outline-none focus:border-[var(--color-accent-blue)]"
        />
        <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
          Type any model name — suggestions above are just a starting point.
        </p>
      </div>

      {/* Key input */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-[var(--color-text-secondary)] block mb-1.5">
          API Key
          <a
            href={currentProviderConfig.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-[var(--color-accent-blue)] hover:underline font-normal"
          >
            Get key →
          </a>
        </label>
        <input
          type="password"
          value={draft}
          onChange={e => { setDraft(e.target.value); setError(''); }}
          placeholder={currentProviderConfig.keyPlaceholder}
          className="w-full text-sm border border-[var(--color-glass-border)] rounded-xl px-3 py-2 text-[var(--color-text-primary)] bg-white focus:outline-none focus:border-[var(--color-accent-blue)]"
          onKeyDown={e => e.key === 'Enter' && handleTest()}
        />
        {apiKey && !draft && (
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Key saved. Enter a new key to update.</p>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      <button
        onClick={handleTest}
        disabled={testing || !draft.trim()}
        className="w-full py-2.5 rounded-xl bg-[var(--color-accent-blue)] text-white text-sm font-semibold disabled:opacity-50 transition-opacity hover:opacity-90"
      >
        {testing ? 'Testing key…' : 'Save & Start'}
      </button>

      {apiKey && (
        <button
          onClick={onSave}
          className="w-full mt-2 py-2 rounded-xl border border-[var(--color-glass-border)] text-[var(--color-text-secondary)] text-xs hover:text-[var(--color-accent-blue)] transition-colors"
        >
          Continue with saved {currentProviderConfig.shortName} key
        </button>
      )}
    </div>
  );
}

// ─── Chat Modal ───────────────────────────────────────────────────────────────
interface ChatModalProps {
  mode: typeof MODES[number];
  slug: string;
  topicTitle: string;
  onClose: () => void;
}

function ChatModal({ mode, slug, topicTitle, onClose }: ChatModalProps) {
  const { provider, model, apiKey, currentProviderConfig, setApiKey } = useProviderKey();
  const storageKey = `noesis__chat__${slug}__${mode.id}`;
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    if (messages.length === 0 && mode.starter) {
      const starterMsg: Message = { role: 'assistant', content: mode.starter(topicTitle) };
      setMessages([starterMsg]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.length > 0) localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  function send() {
    const text = input.trim();
    if (!text || streaming) return;
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setStreaming(true);

    let accumulated = '';
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    callAI(
      provider,
      model,
      apiKey,
      newMessages,
      mode.system(topicTitle),
      (chunk) => {
        accumulated += chunk;
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content: accumulated };
          return copy;
        });
      },
      () => setStreaming(false),
      (err) => {
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content: `⚠️ ${err}` };
          return copy;
        });
        setStreaming(false);
      },
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white sm:relative sm:inset-auto sm:rounded-2xl sm:border sm:border-[var(--color-glass-border)] sm:shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden" style={{ maxHeight: '70vh', minHeight: '420px' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-glass-border)] flex-shrink-0">
        <span className="text-lg">{mode.icon}</span>
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">{mode.label}</span>
        <span className="text-xs text-[var(--color-text-muted)] truncate flex-1">{currentProviderConfig.shortName} · {model.split('-').slice(0,2).join('-')}</span>
        <button
          onClick={() => setShowSettings(s => !s)}
          className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors px-2 py-1 border border-[var(--color-glass-border)] rounded-lg"
        >
          {showSettings ? 'Hide' : '⚙ AI'}
        </button>
        <button
          onClick={() => { setMessages([]); localStorage.removeItem(storageKey); }}
          className="text-[10px] text-[var(--color-text-muted)] hover:text-red-500 transition-colors px-2 py-1 border border-[var(--color-glass-border)] rounded-lg"
        >
          Clear
        </button>
        <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] ml-1 text-lg leading-none">×</button>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="px-4 py-3 border-b border-[var(--color-glass-border)] bg-[rgba(0,113,227,0.02)] flex-shrink-0">
          <div className="flex flex-wrap gap-2 mb-2">
            {PROVIDERS.map(p => (
              <button
                key={p.id}
                onClick={() => { /* handled by hook */ }}
                className={['px-2 py-1 rounded-full text-[10px] font-semibold border transition-all', provider === p.id ? 'bg-[var(--color-accent-blue)] text-white border-[var(--color-accent-blue)]' : 'bg-white text-[var(--color-text-muted)] border-[var(--color-glass-border)]'].join(' ')}
              >
                {p.shortName}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setApiKey(''); setShowSettings(false); }}
            className="text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            Remove saved key
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={['flex', msg.role === 'user' ? 'justify-end' : 'justify-start'].join(' ')}>
            <div
              className={[
                'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
                msg.role === 'user'
                  ? 'bg-[var(--color-accent-blue)] text-white rounded-br-sm'
                  : 'bg-[rgba(0,0,0,0.04)] text-[var(--color-text-primary)] rounded-bl-sm',
              ].join(' ')}
            >
              {msg.role === 'assistant'
                ? (msg.content ? renderMarkdown(msg.content) : <TypingDots />)
                : msg.content}
            </div>
          </div>
        ))}
        {streaming && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-[rgba(0,0,0,0.04)] rounded-2xl rounded-bl-sm px-4 py-3">
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-[var(--color-glass-border)] flex-shrink-0">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={mode.placeholder}
            rows={1}
            className="flex-1 resize-none text-sm border border-[var(--color-glass-border)] rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--color-accent-blue)] bg-white text-[var(--color-text-primary)]"
            style={{ maxHeight: '120px' }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || streaming}
            className="flex-shrink-0 w-9 h-9 rounded-xl bg-[var(--color-accent-blue)] text-white flex items-center justify-center disabled:opacity-40 transition-opacity hover:opacity-90"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 1L1 7l5 1.5L7.5 13 13 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ChatPanel (exported) ─────────────────────────────────────────────────────
interface ChatPanelProps {
  slug: string;
  topicTitle: string;
}

export function ChatPanel({ slug, topicTitle }: ChatPanelProps) {
  const { hasKey, loaded } = useProviderKey();
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [previewMode, setPreviewMode] = useState<string>('tutor');

  if (!loaded) return null;

  if (showSetup || (!hasKey && !activeMode)) {
    return (
      <div className="space-y-5">
        {/* Preview section — show value BEFORE asking for key */}
        <div className="bg-white border border-[var(--color-glass-border)] rounded-2xl overflow-hidden shadow-[var(--shadow-glass)]">
          {/* Preview header + mode tabs */}
          <div className="px-5 pt-4 pb-3 border-b border-[var(--color-glass-border)]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-bold text-[var(--color-text-primary)]">See it in action</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">Choose a mode to preview — then unlock with your API key below</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[rgba(0,113,227,0.08)] text-[var(--color-accent-blue)]">Preview</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(PREVIEWS).map(([id, mode]) => (
                <button
                  key={id}
                  onClick={() => setPreviewMode(id)}
                  className={[
                    'flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all',
                    previewMode === id
                      ? 'text-white border-transparent'
                      : 'bg-white border-[var(--color-glass-border)] text-[var(--color-text-secondary)] hover:border-[rgba(0,113,227,0.3)]',
                  ].join(' ')}
                  style={previewMode === id ? { background: mode.color, borderColor: mode.color } : {}}
                >
                  <span>{mode.icon}</span>
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Animated preview */}
          <div className="bg-[rgba(0,0,0,0.01)]">
            <ChatPreview topicTitle={topicTitle} modeId={previewMode} />
          </div>

          {/* Value prop footer */}
          <div className="px-5 py-3 border-t border-[var(--color-glass-border)] bg-[rgba(0,113,227,0.02)]">
            <p className="text-[10px] text-[var(--color-text-muted)] text-center">
              5 modes · Anthropic, OpenAI, Gemini, Mistral, Groq · Your key stays in your browser only
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center gap-3">
          <div className="flex-1 h-px bg-[var(--color-glass-border)]" />
          <span className="text-[10px] text-[var(--color-text-muted)] font-medium whitespace-nowrap">Your conversation. Your AI.</span>
          <div className="flex-1 h-px bg-[var(--color-glass-border)]" />
        </div>

        {/* Key setup */}
        <ProviderKeySetup onSave={() => { setShowSetup(false); }} />
      </div>
    );
  }

  if (activeMode) {
    const mode = MODES.find(m => m.id === activeMode)!;
    return (
      <div>
        <ChatModal mode={mode} slug={slug} topicTitle={topicTitle} onClose={() => setActiveMode(null)} />
        <button
          onClick={() => setShowSetup(true)}
          className="mt-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors"
        >
          ⚙ Switch AI provider
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[var(--color-glass-border)] rounded-2xl p-6 shadow-[var(--shadow-glass)]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-[var(--color-text-primary)]">AI Learning Modes</h3>
        <button
          onClick={() => setShowSetup(true)}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors border border-[var(--color-glass-border)] px-2 py-1 rounded-lg"
        >
          ⚙ Switch AI
        </button>
      </div>
      <p className="text-xs text-[var(--color-text-muted)] mb-5">Five ways to learn. Pick your mode.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {MODES.map(mode => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className="flex flex-col items-start p-4 rounded-xl border border-[var(--color-glass-border)] hover:border-[var(--color-accent-blue)] hover:shadow-[0_2px_12px_rgba(0,113,227,0.1)] transition-all text-left bg-white group"
          >
            <span className="text-xl mb-2">{mode.icon}</span>
            <span className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors">
              {mode.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
