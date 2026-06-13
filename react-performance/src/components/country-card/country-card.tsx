import React, { useMemo } from 'react';
import type { Country } from '../../types';
import {
  createYearDataMap,
  getCo2ForYear,
  getPopulationForYear,
} from '../../utils/data-transformers';
import { formatNumber } from '../../utils/format-utils';
import { DataTable } from '../data-table/data-table';

import styles from './country-card.module.css';

type CountryCardProps = {
  country: Country;
  selectedYear: number;
  selectedColumns: string[];
};

export const CountryCard = React.memo(({ country, selectedYear, selectedColumns }: CountryCardProps) => {
  const yearDataMap = useMemo(() => {
    return createYearDataMap(country.data);
  }, [country.data]);

  const population = useMemo(() => {
    return getPopulationForYear(yearDataMap, selectedYear);
  }, [yearDataMap, selectedYear]);

  const co2 = useMemo(() => {
    return getCo2ForYear(yearDataMap, selectedYear)
  }, [yearDataMap, selectedYear]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{country.id}</h3>
        {country.iso_code && <span className={styles.isoCode}>{country.iso_code}</span>}
      </div>

      <div className={styles.stats}>
        <div>
          Population ({selectedYear}): {formatNumber(population)}
        </div>
        <div>
          CO₂ Emissions ({selectedYear}): {formatNumber(co2)} tonnes
        </div>
      </div>

      <DataTable data={country.data} year={selectedYear} columns={selectedColumns} />
    </div>
  );
});

CountryCard.displayName = 'CountryCard';

