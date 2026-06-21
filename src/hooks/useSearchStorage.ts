// src/hooks/useSearchStorage.ts
import { useState } from 'react';

const QUERY_KEY = 'search-query-key';

export function useSearchStorage() {
  const [storedQuery, setStoredQuery] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(QUERY_KEY);
    }
    return null;
  });

  const saveSearchQuery = (query: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(QUERY_KEY, query);
    }
    setStoredQuery(query);
  };

  return {
    storedQuery,
    saveSearchQuery,
  };
}
