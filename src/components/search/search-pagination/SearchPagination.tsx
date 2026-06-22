'use client';

import Button from '@/components/button/Button';
import { usePathname, useRouter } from '@/i18n/navigation'; // 🌟 Изменяем импорт usePathname! Теперь берем его из i18n
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation'; // Оставляем стандартный для параметров
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
  const pathname = usePathname(); // 🌟 Теперь вернет "/" вместо "/ru", или "/search" вместо "/ru/search"
  const searchParams = useSearchParams();
  const t = useTranslations('Search.pagination');

  const setPageSearchParams = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page.toString());

    // 🌟 Теперь здесь будет push("/?page=2"), а роутер сам сделает под капотом "/ru?page=2"
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
        text={t('prev')}
        type="button"
        variant="blue"
        callback={goToPrevPage}
        disabled={currentPage === 1}
      />
      <span>
        {currentPage} / {totalPages}
      </span>
      <Button
        text={t('next')}
        type="button"
        variant="blue"
        callback={goToNextPage}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}
