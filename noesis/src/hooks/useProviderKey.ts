'use client';

import { useState, useEffect } from 'react';

export type ProviderId = 'anthropic' | 'openai' | 'google' | 'mistral' | 'groq';

export interface ModelOption {
  id: string;
  label: string;
}

export interface ProviderConfig {
  id: ProviderId;
  name: string;
  shortName: string;
  models: ModelOption[];
  docsUrl: string;
  keyPlaceholder: string;
  keyPrefix: string; // for display hint only
}

export const PROVIDERS: ProviderConfig[] = [
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    shortName: 'Claude',
    models: [
      { id: 'claude-haiku-4-5-20251001', label: 'Haiku 4.5 (fast)' },
      { id: 'claude-sonnet-4-5-20251022', label: 'Sonnet 4.5 (smart)' },
    ],
    docsUrl: 'https://console.anthropic.com/account/keys',
    keyPlaceholder: 'sk-ant-api03-...',
    keyPrefix: 'sk-ant-',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    shortName: 'GPT',
    models: [
      { id: 'gpt-4o-mini', label: 'GPT-4o Mini (fast)' },
      { id: 'gpt-4o', label: 'GPT-4o (smart)' },
    ],
    docsUrl: 'https://platform.openai.com/api-keys',
    keyPlaceholder: 'sk-proj-...',
    keyPrefix: 'sk-',
  },
  {
    id: 'google',
    name: 'Google Gemini',
    shortName: 'Gemini',
    models: [
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash (fast)' },
      { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro (smart)' },
    ],
    docsUrl: 'https://aistudio.google.com/app/apikey',
    keyPlaceholder: 'AIza...',
    keyPrefix: 'AIza',
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    shortName: 'Mistral',
    models: [
      { id: 'mistral-small-latest', label: 'Mistral Small (fast)' },
      { id: 'mistral-large-latest', label: 'Mistral Large (smart)' },
    ],
    docsUrl: 'https://console.mistral.ai/api-keys',
    keyPlaceholder: 'your-mistral-key',
    keyPrefix: '',
  },
  {
    id: 'groq',
    name: 'Groq (Open Models)',
    shortName: 'Groq',
    models: [
      { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
      { id: 'gemma2-9b-it', label: 'Gemma 2 9B' },
    ],
    docsUrl: 'https://console.groq.com/keys',
    keyPlaceholder: 'gsk_...',
    keyPrefix: 'gsk_',
  },
];

const PROVIDER_KEY = 'noesis__ai_provider';
const MODEL_KEY = (p: ProviderId) => `noesis__ai_model__${p}`;
const API_KEY = (p: ProviderId) => `noesis__ai_key__${p}`;

export function useProviderKey() {
  const [provider, setProviderState] = useState<ProviderId>('anthropic');
  const [model, setModelState] = useState<string>('claude-haiku-4-5-20251001');
  const [apiKey, setApiKeyState] = useState<string>('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedProvider = (localStorage.getItem(PROVIDER_KEY) as ProviderId) || 'anthropic';
    const providerConfig = PROVIDERS.find(p => p.id === savedProvider) || PROVIDERS[0];
    const savedModel = localStorage.getItem(MODEL_KEY(savedProvider)) || providerConfig.models[0].id;
    const savedKey = localStorage.getItem(API_KEY(savedProvider)) || '';
    setProviderState(savedProvider);
    setModelState(savedModel);
    setApiKeyState(savedKey);
    setLoaded(true);
  }, []);

  function setProvider(p: ProviderId) {
    const providerConfig = PROVIDERS.find(pc => pc.id === p)!;
    const savedModel = localStorage.getItem(MODEL_KEY(p)) || providerConfig.models[0].id;
    const savedKey = localStorage.getItem(API_KEY(p)) || '';
    setProviderState(p);
    setModelState(savedModel);
    setApiKeyState(savedKey);
    localStorage.setItem(PROVIDER_KEY, p);
  }

  function setModel(m: string) {
    setModelState(m);
    localStorage.setItem(MODEL_KEY(provider), m);
  }

  function setApiKey(key: string) {
    setApiKeyState(key);
    if (key) {
      localStorage.setItem(API_KEY(provider), key);
    } else {
      localStorage.removeItem(API_KEY(provider));
    }
  }

  const currentProviderConfig = PROVIDERS.find(p => p.id === provider) || PROVIDERS[0];
  const hasKey = Boolean(apiKey);

  return { provider, model, apiKey, loaded, hasKey, currentProviderConfig, setProvider, setModel, setApiKey };
}
