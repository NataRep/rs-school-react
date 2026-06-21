'use client';

import Button from '@/components/button/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import style from './SearchPagination.module.scss';

export interface SearchPaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function SearchPagination({
  totalPages,
  currentPage,
}: SearchPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setPageSearchParams = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page.toString());

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const goToNextPage = () => {
    if (currentPage >= totalPages) return;
    setPageSearchParams(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage <= 1) return;
    setPageSearchParams(currentPage - 1);
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
