import { useSearchParams } from 'react-router-dom';
import Button from '../../button/Button';
import style from './SearchPagination.module.scss';

export interface SearchPaginationProps {
  totalPages: number;
}

export default function SearchPagination({
  totalPages,
}: SearchPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const goToNextPage = () => {
    if (currentPage >= totalPages) return;
    const nextPage = currentPage + 1;
    setPageSearchParams(nextPage);
  };

  const goToPrevPage = () => {
    if (currentPage <= 1) return;
    const prevPage = currentPage - 1;
    setPageSearchParams(prevPage);
  };

  const setPageSearchParams = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  if (totalPages <= 1) return null;

  return (
    <div className={style.pagination}>
      <Button
        text="Prev"
        type="button"
        variant="blue"
        callback={goToPrevPage}
        disabled={currentPage === 1}
      />
      <span>
        {currentPage} / {totalPages}
      </span>
      <Button
        text="Next"
        type="button"
        variant="blue"
        callback={goToNextPage}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}
