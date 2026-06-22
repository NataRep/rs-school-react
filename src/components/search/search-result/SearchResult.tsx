import { Person, Planet, Starship } from '@/store/api-models';
import SearchPagination from '../search-pagination/SearchPagination';
import SearchResultItem from '../search-result-item/SearchResultItem';
import style from './SearchResult.module.scss';

interface SearchResultProps {
  query: string;
  category: string;
  page: string;
}

export default async function SearchResult({
  query,
  category,
  page,
}: SearchResultProps) {
  const res = await fetch(
    `https://swapi.py4e.com/api/${category}/?page=${page}&search=${query}`,
  );

  if (!res.ok) {
    return (
      <div className={style.error}>
        Error loading data from Star Wars Universe
      </div>
    );
  }

  const currentData = await res.json();
  const hasResults = currentData.results && currentData.results.length > 0;

  const totalPages = currentData.count ? Math.ceil(currentData.count / 10) : 1;

  if (!hasResults) {
    return (
      <div className={style.emptyResult}>
        <h2>Nothing found matching your request.</h2>
      </div>
    );
  }

  return (
    <>
      <ul className={style.itemList}>
        {currentData.results.map((item: Person | Planet | Starship) => (
          <li key={item.url} className={style.item}>
            <SearchResultItem item={item} />
          </li>
        ))}
      </ul>
      <SearchPagination totalPages={totalPages} currentPage={Number(page)} />
    </>
  );
}
