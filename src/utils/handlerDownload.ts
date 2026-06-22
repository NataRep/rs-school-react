import { generateCsvAction } from '@/app/actions/csvActions';
import type { SearchItem } from '@/components/search/search-result-item/SearchResultItem';

export const handleDownload = async (selectedItems: SearchItem[]) => {
  try {
    const response = await generateCsvAction(selectedItems);

    if (!response.success || !response.csvContent) {
      console.error(response.error || 'Export failed');
      return;
    }

    const blob = new Blob([response.csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `star-wars-items-${selectedItems.length}.csv`,
    );
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download handler error:', err);
  }
};
