import type { IconName } from '../components/icon/Icon';

export interface NavLinkItem {
  translationKey: string;
  path: string;
  icon: IconName;
}

export const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  {
    translationKey: 'search',
    path: '/',
    icon: 'search',
  },
  {
    translationKey: 'about',
    path: '/about',
    icon: 'info',
  },
];
