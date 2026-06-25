'use client';

import { useStorage } from '@/hooks/useStorage';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import style from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const { saveLocale } = useStorage();

  const queryString = searchParams.toString();
  const targetPath = queryString ? `${pathname}?${queryString}` : pathname;

  return (
    <div className={style.container}>
      <Link
        href={targetPath}
        locale="ru"
        className={`${style.button} ${currentLocale === 'ru' ? style.active : ''}`}
        onClick={() => saveLocale('ru')}
      >
        RU
      </Link>
      <span className={style.divider}>|</span>
      <Link
        href={targetPath}
        locale="en"
        className={`${style.button} ${currentLocale === 'en' ? style.active : ''}`}
        onClick={() => saveLocale('en')}
      >
        EN
      </Link>
    </div>
  );
}
