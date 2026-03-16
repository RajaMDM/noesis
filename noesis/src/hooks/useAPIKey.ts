'use client';

import { useState, useEffect } from 'react';

const KEY = 'noesis__anthropic_key';

export function useAPIKey() {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY) || '';
    setApiKeyState(stored);
    setLoaded(true);
  }, []);

  function setApiKey(key: string) {
    setApiKeyState(key);
    if (key) {
      localStorage.setItem(KEY, key);
    } else {
      localStorage.removeItem(KEY);
    }
  }

  return { apiKey, setApiKey, loaded };
}
