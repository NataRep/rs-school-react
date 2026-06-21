import {
  DEFAULT_NAV_LINKS,
  type NavLinkItem,
} from '@/constants/navLinks';
import { NavLink } from 'react-router-dom';
import Icon from '../shared/icon/Icon';
import style from './TopNav.module.scss';

interface TopNavProps {
  items?: NavLinkItem[];
}

export default function TopNav({ items = DEFAULT_NAV_LINKS }: TopNavProps) {
  return (
    <nav className={style.nav}>
      {items.map(({ path, icon, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            isActive ? `${style.link} ${style.active}` : style.link
          }
        >
          <Icon name={icon} className="center" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
