import type { SearchItem } from "../../components/search/search-result-item/SearchResultItem";
import { convertDataToCSV } from "./convertDataToCSV";

export const handleDownload = (selectedItems: SearchItem[]) => {
  if (selectedItems.length === 0) return;

  const csvContent = convertDataToCSV(selectedItems);

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;

  link.setAttribute('download', `data_star_wars_${selectedItems.length}.csv`);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};