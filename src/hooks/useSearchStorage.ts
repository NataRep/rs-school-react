import { useState } from "react";

const QUERY_KEY = 'search-query-key';

export function useSearchStorage() {
  const [storedQuery, setStoredQuery] = useState<string | null>(() => {
    return localStorage.getItem(QUERY_KEY);
  });

  const saveSearchQuery = (query: string): void => {
    localStorage.setItem(QUERY_KEY, query);
    setStoredQuery(query);
  };

  return {
    storedQuery,
    saveSearchQuery,
  };
}