import { useCallback, useMemo, useState } from 'react';
import { useCo2Data } from '../../hooks/useCo2Data';
import { getAvailableColumns, getAvailableYears } from '../../utils/data-transformers';
import { CountryList } from '../country-list/country-list';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { Controls } from './../сontrol-panel/controls-panel';
import styles from './app.module.css';

type AppState = {
  searchQuery: string;
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  selectedColumns: string[];
};

export const App = () => {
  const { data, isLoading, error } = useCo2Data();

  const [state, setState] = useState<AppState>({
    searchQuery: '',
    selectedRegion: '',
    selectedYear: 2020,
    sortField: 'population',
    sortOrder: 'desc',
    selectedColumns: ['year', 'population', 'co2', 'co2_per_capita'],
  });

  const years = useMemo(() => (data ? getAvailableYears(data) : []), [data]);
  const availableColumns = useMemo(() => getAvailableColumns(), []);

  const handleSearch = useCallback((value: string) => {
    setState((prev) => ({ ...prev, searchQuery: value }));
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setState((prev) => ({ ...prev, selectedYear: year }));
  }, []);

  const handleSortFieldChange = useCallback((field: 'name' | 'population') => {
    setState((prev) => ({ ...prev, sortField: field }));
  }, []);

  const handleSortOrderToggle = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handleColumnToggle = useCallback((column: string) => {
    setState((prev) => {
      const nextColumns = prev.selectedColumns.includes(column)
        ? prev.selectedColumns.filter((c) => c !== column)
        : [...prev.selectedColumns, column];

      return { ...prev, selectedColumns: nextColumns };
    });
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className={styles.errorMessage}>Error: {error}</div>;
  if (!data) return <div className={styles.noDataMessage}>No data available</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CO₂ Emissions Data Explorer</h1>

      <Controls
        searchQuery={state.searchQuery}
        onSearchChange={handleSearch}
        selectedYear={state.selectedYear}
        availableYears={years}
        onYearChange={handleYearChange}
        availableColumns={availableColumns}
        selectedColumns={state.selectedColumns}
        onColumnToggle={handleColumnToggle}
        sortField={state.sortField}
        sortOrder={state.sortOrder}
        onSortFieldChange={handleSortFieldChange}
        onSortOrderToggle={handleSortOrderToggle}
      />

      <CountryList
        countries={data}
        searchQuery={state.searchQuery}
        selectedColumns={state.selectedColumns}
        selectedRegion={state.selectedRegion}
        selectedYear={state.selectedYear}
        sortField={state.sortField}
        sortOrder={state.sortOrder}
        onYearChange={handleYearChange}
      />
    </div>
  );
};