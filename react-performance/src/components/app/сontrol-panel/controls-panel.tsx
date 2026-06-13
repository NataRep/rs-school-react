import React from 'react';
import { SearchBar } from '../../search-bar/search-bar';
import { YearSelector } from '../../year-selector/year-selector';
import { ColumnSelectionManager } from '../column-selection-manager/column-selection-manager';
import { SortSelector } from '../sort-selector/sort-selector';
import styles from './controls-panel.module.css';

type ControlsProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedYear: number;
  availableYears: number[];
  onYearChange: (year: number) => void;
  availableColumns: string[];
  selectedColumns: string[];
  onColumnToggle: (column: string) => void;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onSortFieldChange: (field: 'name' | 'population') => void;
  onSortOrderToggle: () => void;
};

export const Controls = React.memo(({
  searchQuery,
  onSearchChange,
  selectedYear,
  availableYears,
  onYearChange,
  availableColumns,
  selectedColumns,
  onColumnToggle,
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderToggle,
}: ControlsProps) => {

  return (
    <div className={styles.controlsContainer}>
      <SearchBar value={searchQuery} onChange={onSearchChange} />

      <YearSelector year={selectedYear} years={availableYears} onChange={onYearChange} />

      <ColumnSelectionManager
        availableColumns={availableColumns}
        selectedColumns={selectedColumns}
        onToggle={onColumnToggle}
      />

      <SortSelector
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={onSortFieldChange}
        onSortOrderToggle={onSortOrderToggle}
      />
    </div>
  );
});

Controls.displayName = 'Controls';