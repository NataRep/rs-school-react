import { Suspense } from 'react';
import { Await, Outlet, useLoaderData, useLocation, useNavigate, useParams } from 'react-router';
import type { Person, Planet, Starship } from '../../../services/api-service/api-models';
import Loader from '../../shared/loader/Loader';
import SearchPagination from '../search-pagination/SearchPagination';
import SearchResultItem from "../search-result-item/SearchResultItem";
import type { SearchLoaderData } from './searchLoader';
import style from './SearchResult.module.scss';

export default function SearchResult() {
  const { deferredData } = useLoaderData() as SearchLoaderData;
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const closeDetails = () => {
    navigate({
      pathname: `/search/${categoryName}`,
      search: location.search
    });
  };

  return (
    <div className={style.container}>
      <div className={style.result}>
        <Suspense fallback={<div className={style.itemList}><Loader /></div>}>
          <Await resolve={deferredData}>
            {(resolvedData: { items: (Person | Planet | Starship)[]; totalPages: number }) => (
              <>
                <ul className={style.itemList}>
                  {resolvedData.items.length === 0 && (
                    <div className={style.emptyResult}>
                      <h2>Nothing found matching your request.</h2>
                    </div>
                  )}

                  {resolvedData.items.map((item: Person | Planet | Starship) => (
                    <li key={item.url} className={style.item}>
                      <SearchResultItem item={item} />
                    </li>
                  ))}
                </ul>

                <SearchPagination totalPages={resolvedData.totalPages} />
              </>
            )}
          </Await>
        </Suspense>
      </div>

      <Outlet context={{ closeDetails }} />
    </div>
  );
}