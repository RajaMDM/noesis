'use client';

import { useState, useEffect } from 'react';

export type ProviderId = 'anthropic' | 'openai' | 'google' | 'mistral' | 'groq';

export interface ProviderConfig {
  id: ProviderId;
  name: string;
  shortName: string;
  defaultModel: string;         // pre-filled default — user can overwrite with anything
  suggestions: string[];        // datalist hints only, not a closed list
  modelsDocsUrl: string;        // where to browse available models
  docsUrl: string;
  keyPlaceholder: string;
  keyPrefix: string;
}

export const PROVIDERS: ProviderConfig[] = [
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    shortName: 'Claude',
    defaultModel: 'claude-haiku-4-5-20251001',
    suggestions: [
      'claude-haiku-4-5-20251001',
      'claude-sonnet-4-5-20251022',
      'claude-opus-4-5-20251101',
    ],
    modelsDocsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models',
    docsUrl: 'https://console.anthropic.com/account/keys',
    keyPlaceholder: 'sk-ant-api03-...',
    keyPrefix: 'sk-ant-',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    shortName: 'GPT',
    defaultModel: 'gpt-4o-mini',
    suggestions: ['gpt-4o-mini', 'gpt-4o', 'o1', 'o3-mini', 'gpt-4-turbo'],
    modelsDocsUrl: 'https://platform.openai.com/docs/models',
    docsUrl: 'https://platform.openai.com/api-keys',
    keyPlaceholder: 'sk-proj-...',
    keyPrefix: 'sk-',
  },
  {
    id: 'google',
    name: 'Google Gemini',
    shortName: 'Gemini',
    defaultModel: 'gemini-2.0-flash',
    suggestions: ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-pro'],
    modelsDocsUrl: 'https://ai.google.dev/gemini-api/docs/models',
    docsUrl: 'https://aistudio.google.com/app/apikey',
    keyPlaceholder: 'AIza...',
    keyPrefix: 'AIza',
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    shortName: 'Mistral',
    defaultModel: 'mistral-small-latest',
    suggestions: ['mistral-small-latest', 'mistral-large-latest', 'mistral-medium-latest', 'open-mistral-nemo'],
    modelsDocsUrl: 'https://docs.mistral.ai/getting-started/models/models_overview/',
    docsUrl: 'https://console.mistral.ai/api-keys',
    keyPlaceholder: 'your-mistral-key',
    keyPrefix: '',
  },
  {
    id: 'groq',
    name: 'Groq (Open Models)',
    shortName: 'Groq',
    defaultModel: 'llama-3.3-70b-versatile',
    suggestions: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768', 'gemma2-9b-it'],
    modelsDocsUrl: 'https://console.groq.com/docs/models',
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
    const savedModel = localStorage.getItem(MODEL_KEY(savedProvider)) || providerConfig.defaultModel;
    const savedKey = localStorage.getItem(API_KEY(savedProvider)) || '';
    setProviderState(savedProvider);
    setModelState(savedModel);
    setApiKeyState(savedKey);
    setLoaded(true);
  }, []);

  function setProvider(p: ProviderId) {
    const providerConfig = PROVIDERS.find(pc => pc.id === p)!;
    const savedModel = localStorage.getItem(MODEL_KEY(p)) || providerConfig.defaultModel;
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
