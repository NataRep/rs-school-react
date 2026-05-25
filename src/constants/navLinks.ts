import type { IconName } from "../components/shared/icon/Icon";

export interface NavLinkItem {
  label: string;
  path: string;
  icon: IconName;
}
export const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  {
    label: 'Search',
    path: '/search',
    icon: 'search',
  },
  {
    label: 'About',
    path: '/about',
    icon: 'info',
  },
];