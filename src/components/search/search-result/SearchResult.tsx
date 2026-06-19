import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router';
import type { Person, Planet, Starship } from '../../../store/api-models';
import { useGetDataQuery } from '../../../store/starWarsApi';
import ErrorNotification from '../../shared/error-notification/ErrorNotification';
import Loader from '../../shared/loader/Loader';
import SearchPagination from '../search-pagination/SearchPagination';
import SearchResultItem from '../search-result-item/SearchResultItem';
import style from './SearchResult.module.scss';

export default function SearchResult() {
  const { searchQuery, currentPage, categoryName } = useLoaderData() as {
    searchQuery: string;
    currentPage: number;
    categoryName: string;
  };

  const { data, isLoading, isError, error } = useGetDataQuery({
    category: categoryName || 'people',
    searchQuery: searchQuery || '',
    page: currentPage,
  });

  const getErrorContent = () => {
    if (!error) return null;

    if ('status' in error && error.status === 404) {
      return 'The requested category or page was not found.';
    }

    return 'Something went wrong. Please try again later.';
  };

  const navigate = useNavigate();
  const location = useLocation();

  const closeDetails = () => {
    navigate({
      pathname: `/search/${categoryName}`,
      search: location.search,
    });
  };

  const renderConstant = (currentData: typeof data) => {
    if (!currentData) return null;

    const hasResults = currentData?.results && currentData.results.length > 0;
    const totalPages = Math.ceil(currentData.count / 10);

    return (
      <div className={style.result}>
        {!hasResults && (
          <div className={style.emptyResult}>
            <h2>Nothing found matching your request.</h2>
          </div>
        )}

        {hasResults && (
          <>
            <ul className={style.itemList}>
              {currentData.results.map((item: Person | Planet | Starship) => (
                <li key={item.url} className={style.item}>
                  <SearchResultItem item={item} />
                </li>
              ))}
            </ul>
            <SearchPagination totalPages={totalPages} />
          </>
        )}
      </div>
    );
  };

  return (
    <div className={style.container}>
      {isLoading && (
        <div className={style.result}>
          <Loader />
        </div>
      )}

      {!isLoading && isError && (
        <ErrorNotification>{getErrorContent()}</ErrorNotification>
      )}

      {!isLoading && !isError && data && renderConstant(data)}
      <Outlet context={{ closeDetails }} />
    </div>
  );
}
