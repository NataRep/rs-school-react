'use client';

import { DEFAULT_NAV_LINKS, type NavLinkItem } from '@/constants/navLinks';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Icon from '../icon/Icon';
import style from './TopNav.module.scss';

interface TopNavProps {
  items?: NavLinkItem[];
}

export default function TopNav({ items = DEFAULT_NAV_LINKS }: TopNavProps) {
  const rawPathname = usePathname();
  const t = useTranslations('navigation');

  console.log(t('search'));

  const currentLocale = rawPathname.startsWith('/ru') ? 'ru' : 'en';

  const cleanPathname = rawPathname.replace(/^\/(ru|en)(\/|$)/, '/') || '/';

  return (
    <nav className={style.nav}>
      {items.map(({ path, icon, translationKey }) => {
        const isActive =
          path === '/' ? cleanPathname === '/' : cleanPathname.startsWith(path);

        return (
          <Link
            key={path}
            href={path}
            locale={currentLocale}
            className={`${style.link} ${isActive ? style.active : ''}`}
          >
            <Icon name={icon} className="center" />
            <span>{t(translationKey)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
