'use client';

import { Link } from '@/i18n/navigation'; // Оставляем только кастомный Link
import { usePathname, useSearchParams } from 'next/navigation'; // 🌟 Берем стандартный usePathname
import style from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const rawPathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocale = rawPathname.startsWith('/ru') ? 'ru' : 'en';
  const pathnameWithoutLocale = rawPathname.replace(/^\/(ru|en)(\/|$)/, '/');

  const queryString = searchParams.toString();
  const targetPath = queryString
    ? `${pathnameWithoutLocale}?${queryString}`
    : pathnameWithoutLocale;

  return (
    <div className={style.container}>
      <Link
        href={targetPath}
        locale="ru"
        className={`${style.button} ${currentLocale === 'ru' ? style.active : ''}`}
      >
        RU
      </Link>
      <span className={style.divider}>|</span>
      <Link
        href={targetPath}
        locale="en"
        className={`${style.button} ${currentLocale === 'en' ? style.active : ''}`}
      >
        EN
      </Link>
    </div>
  );
}
