import { List, useDynamicRowHeight, type RowComponentProps } from 'react-window';
import type { Country } from '../../types';
import { createYearDataMap, getPopulationForYear } from '../../utils/data-transformers';
import { CountryCard } from '../country-card/country-card';

import { useMemo } from 'react';
import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

interface MyRowProps {
  filteredCountries: Country[];
  selectedYear: number;
  selectedColumns: string[];
}

const CountryRow = ({ index, style, filteredCountries, selectedYear, selectedColumns }: RowComponentProps & MyRowProps) => {
  const country = filteredCountries[index];

  if (!country) return null;

  return (
    <div style={style} className={styles.rowWrapper}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {

  const filteredCountries = useMemo(() => {
    const filtered = countries.filter((c) => {
      const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
    });

    if (sortField === 'name') {
      return filtered.sort((a, b) =>
        sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
      );
    }

    const populationMap = new Map<string, number>();
    filtered.forEach((c) => {
      const pop = getPopulationForYear(createYearDataMap(c.data), selectedYear) || 0;
      populationMap.set(c.id, pop);
    });

    return filtered.sort((a, b) => {
      const popA = populationMap.get(a.id) || 0;
      const popB = populationMap.get(b.id) || 0;
      return sortOrder === 'asc' ? popA - popB : popB - popA;
    });

  }, [countries, searchQuery, selectedRegion, sortField, sortOrder, selectedYear]);

  const cacheKey = useMemo(() => selectedColumns.join(','), [selectedColumns]);

  const rowHeightCache = useDynamicRowHeight({
    defaultRowHeight: 300,
    key: cacheKey,
  });

  const rowProps = useMemo(() => ({
    filteredCountries,
    selectedYear,
    selectedColumns
  } as { filteredCountries: Country[]; selectedYear: number; selectedColumns: string[]; index: number; style: React.CSSProperties; rowProps: any }),
    [filteredCountries, selectedYear, selectedColumns]);

  if (filteredCountries.length === 0) {
    return <div className={styles.noData}>No countries found</div>;
  }

  return (
    <div className={styles.listContainer} style={{ height: '700px' }}>
      <List
        rowComponent={CountryRow}
        rowCount={filteredCountries.length}
        rowHeight={rowHeightCache}
        rowProps={rowProps}
      />
    </div>
  );
};