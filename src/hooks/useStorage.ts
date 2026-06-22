import { useState } from 'react';

const QUERY_KEY = 'search-query-key';
const LOCALE_KEY = 'app-locale-key';

export function useStorage() {
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

  const [storedLocale, setStoredLocale] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(LOCALE_KEY);
    }
    return null;
  });

  const saveLocale = (locale: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_KEY, locale);

      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    }
    setStoredLocale(locale);
  };

  return {
    storedQuery,
    saveSearchQuery,
    storedLocale,
    saveLocale,
  };
}
