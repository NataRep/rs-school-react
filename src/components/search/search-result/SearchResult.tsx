import { useState } from 'react';
import { Outlet, useLoaderData, useNavigation, useSearchParams } from 'react-router-dom';
import type { Person, Planet, Starship } from '../../../services/api-service/api-models';
import Button from '../../shared/button/Button';
import Loader from '../../shared/loader/Loader';
import SearchPagination from '../search-pagination/SearchPagination';
import SearchResultItem from "../search-result-item/SearchResultItem";
import style from './SearchResult.module.scss';

export default function SearchResult() {
  const { items, totalPages } = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const [searchParams, setSearchParams] = useSearchParams();
  const currentDetailId = searchParams.get('details');
  const [shouldCrash, setShouldCrash] = useState(false);

  const [error] = useState<Error | null>(null);

  if (shouldCrash) throw new Error('Critical rendering error');

  const closeDetails = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
  };

  if (shouldCrash) {
    throw new Error('Critical rendering error');
  }

  if (error) {
    return <div className={style.error}>{error.message}. Try another category.</div>;
  }

  return <div className={style.container}>
    <Button
      text="Show Error Boundary"
      callback={() => setShouldCrash(true)}
      type="button"
      disabled={false}
      variant="red"
      icon="error"
      iconPosition="left"
    />
    <div className={style.result}>
      <ul className={style.itemList}>
        {isLoading && <Loader />}
        {!isLoading && items.length === 0 && (
          <div className={style.emptyResult}>
            <h2>Nothing found matching your request.</h2>
          </div>
        )}
        {!isLoading && items.map((item: Person | Planet | Starship) => (
          <li key={item.url} className={style.item}>
            <SearchResultItem item={item} />
          </li>
        ))}
      </ul>
      <SearchPagination totalPages={totalPages}></SearchPagination>
    </div>
    {currentDetailId && <div className={style.detail}>
      <Button
        text=""
        type='button'
        callback={() => closeDetails()}
        disabled={false}
        variant="red"
        icon="close"
        iconPosition="left"
      />
      <Outlet></Outlet>
    </div>}
  </div>
}