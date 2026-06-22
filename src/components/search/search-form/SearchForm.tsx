'use client';

import Button from '@/components/button/Button';
import { useSearchStorage } from '@/hooks/useSearchStorage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import style from './SearchForm.module.scss';

interface SearchFormProps {
  initialQuery?: string;
}

export default function SearchForm({ initialQuery = '' }: SearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);

  const { saveSearchQuery } = useSearchStorage();

  if (initialQuery !== prevInitialQuery) {
    setSearchQuery(initialQuery);
    setPrevInitialQuery(initialQuery);
  }

  const handleInputClick = () => {
    const pathParts = pathname.split('/').filter(Boolean);
    if (pathParts.length > 2) {
      const basePath = '/' + pathParts.slice(0, 2).join('/');
      const currentParams = searchParams.toString();
      router.push(`${basePath}${currentParams ? `?${currentParams}` : ''}`);
    }
  };

  const submit = () => {
    const trimmed = searchQuery.trim();
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('page', '1');
    newParams.delete('details');

    if (!trimmed) {
      newParams.delete('query');
    } else {
      if (trimmed === initialQuery) return;
      newParams.set('query', trimmed);
      saveSearchQuery(trimmed);
    }

    const queryStr = newParams.toString();
    router.push(`${pathname}${queryStr ? `?${queryStr}` : ''}`);
  };

  return (
    <form
      autoComplete="off"
      className={style.form}
      onClick={handleInputClick}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className={style.inputContainer}>
        <input
          type="text"
          name="search"
          className={style.input}
          placeholder="Find a character, planet, or starship"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Button
        text="Search"
        type="submit"
        disabled={false}
        variant="blue"
        icon="search"
        iconPosition="left"
      />
    </form>
  );
}
