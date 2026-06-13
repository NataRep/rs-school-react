import React from 'react';
import styles from './sort-selector.module.css';

type SortSelectorProps = {
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onSortFieldChange: (value: 'name' | 'population') => void;
  onSortOrderToggle: () => void;
};

export const SortSelector = React.memo(({
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderToggle,
}: SortSelectorProps) => {
  return (
    <div className={styles.sortContainer}>
      <label className={styles.sortLabel}>Sort by:</label>

      <select
        value={sortField}
        onChange={(e) => onSortFieldChange(e.target.value as 'name' | 'population')}
        className={styles.sortSelect}
      >
        <option value="population">Population</option>
        <option value="name">Name</option>
      </select>

      <button onClick={onSortOrderToggle} className={styles.sortButton}>
        {sortOrder === 'asc' ? 'Ascending ⬆️' : 'Descending ⬇️'}
      </button>
    </div>
  );
});

SortSelector.displayName = 'SortSelector';