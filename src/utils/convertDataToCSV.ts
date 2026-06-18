import type { SearchItem } from '../components/search/search-result-item/SearchResultItem';

export const convertDataToCSV = (items: SearchItem[]): string => {
  if (items.length === 0) return '';

  const allKeys = Array.from(
    new Set(items.flatMap((item) => Object.keys(item))),
  );

  const headers = allKeys.join(',');

  const rows = items.map((item) => {
    return allKeys
      .map((key) => {
        const value = item[key as keyof SearchItem];

        if (value === undefined || value === null) {
          return '';
        }

        if (typeof value === 'object') {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }

        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(',');
  });

  return [headers, ...rows].join('\n');
};
