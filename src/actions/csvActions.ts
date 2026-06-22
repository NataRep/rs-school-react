'use server';

import type { SearchItem } from '@/components/search/search-result-item/SearchResultItem';
import { convertDataToCSV } from '@/utils/convertDataToCSV';

export interface ActionResponse {
  success: boolean;
  csvContent: string | null;
  error: string | null;
}

export async function generateCsvAction(
  items: SearchItem[],
): Promise<ActionResponse> {
  try {
    if (!Array.isArray(items) || items.length === 0) {
      return { success: false, csvContent: null, error: 'Items list is empty' };
    }

    const csvContent = convertDataToCSV(items);

    return {
      success: true,
      csvContent,
      error: null,
    };
  } catch {
    return {
      success: false,
      csvContent: null,
      error: 'Server failed to compile CSV file',
    };
  }
}
