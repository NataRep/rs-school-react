'use client';

import { starWarsApi } from '@/store/starWarsApi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Button from '../button/Button';
import Icon, { type IconName } from '../icon/Icon';
import style from './Tabs.module.scss';

export type TabItem = {
  readonly label: string;
  readonly value: string;
};

type TabsProps = {
  readonly tabs: readonly TabItem[];
  readonly currentCategory: string;
};

export default function Tabs({ tabs, currentCategory }: TabsProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRefresh = () => {
    dispatch(starWarsApi.util.invalidateTags(['SwapiData']));
  };

  const handleTabClick = (tabValue: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('category', tabValue);
    newParams.set('page', '1');
    newParams.delete('details');

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className={style.container}>
      <nav className={style.nav}>
        {tabs.map((tab) => {
          const isActive = tab.value === currentCategory;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleTabClick(tab.value)}
              className={`${style.tab} ${isActive ? style.active : ''}`}
            >
              <Icon name={tab.value as IconName} className="center" />
              {tab.label}
            </button>
          );
        })}
      </nav>
      <Button
        type="button"
        text=""
        title="Refresh result"
        callback={handleRefresh}
        variant="blue small"
        icon="reload"
      />
    </div>
  );
}
