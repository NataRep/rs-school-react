'use client';

import { DEFAULT_NAV_LINKS, type NavLinkItem } from '@/constants/navLinks';
import { Link, usePathname } from '@/i18n/navigation';
import Icon from '../shared/icon/Icon';
import style from './TopNav.module.scss';

interface TopNavProps {
  items?: NavLinkItem[];
}

export default function TopNav({ items = DEFAULT_NAV_LINKS }: TopNavProps) {
  const pathname = usePathname();

  return (
    <nav className={style.nav}>
      {items.map(({ path, icon, label }) => {
        const isActive =
          path === '/' ? pathname === '/' : pathname.startsWith(path);

        return (
          <Link
            key={path}
            href={path}
            className={`${style.link} ${isActive ? style.active : ''}`}
          >
            <Icon name={icon} className="center" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
