import type { IconName } from '../components/icon/Icon';

export interface NavLinkItem {
  label: string;
  path: string;
  icon: IconName;
}
export const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  {
    label: 'Search',
    path: '/',
    icon: 'search',
  },
  {
    label: 'About',
    path: '/about',
    icon: 'info',
  },
];
