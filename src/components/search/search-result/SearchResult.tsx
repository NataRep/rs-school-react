import { Outlet, useLoaderData, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import type { Person, Planet, Starship } from '../../../services/api-service/api-models';
import Loader from '../../shared/loader/Loader';
import SearchPagination from '../search-pagination/SearchPagination';
import SearchResultItem from "../search-result-item/SearchResultItem";
import style from './SearchResult.module.scss';

export default function SearchResult() {
  const { items, totalPages } = useLoaderData() as { items: (Person | Planet | Starship)[]; totalPages: number };
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();

  const isListLoading =
    navigation.state === "loading" &&
    navigation.location?.pathname === location.pathname;

  const closeDetails = () => {
    navigate({
      pathname: '..',
      search: location.search
    }, { relative: 'path' });
  };

  return (
    <div className={style.container}>
      <div className={style.result}>
        <ul className={style.itemList}>
          {isListLoading && <Loader />}

          {!isListLoading && items.length === 0 && (
            <div className={style.emptyResult}>
              <h2>Nothing found matching your request.</h2>
            </div>
          )}

          {!isListLoading && items.map((item: Person | Planet | Starship) => (
            <li key={item.url} className={style.item}>
              <SearchResultItem item={item} />
            </li>
          ))}
        </ul>
        <SearchPagination totalPages={totalPages}></SearchPagination>
      </div>

      <Outlet context={{ closeDetails }} />
    </div>
  );
}