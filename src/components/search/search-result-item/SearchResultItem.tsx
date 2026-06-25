'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import type { Person, Planet, Starship } from '@/store/api-models';
import { getItemId } from '@/utils/get-id-from-url';
import { isPerson, isPlanet, isStarship } from '@/utils/search-item';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import SelectionCheckbox from '../selection-checkbox/SelectionCheckbox';
import style from './SearchResultItem.module.scss';

export type SearchItemProps = {
  item: SearchItem;
  category: string;
};

export type SearchItem = Person | Planet | Starship;

export default function SearchResultItem({ item, category }: SearchItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Search.item');

  const selectItem = (item: SearchItem) => {
    const id = getItemId(item.url);
    if (!id) return;

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('details', id);

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const renderDescription = () => {
    if (isPerson(item))
      return (
        <ul className={style.info}>
          <li>
            {t('birthYear')} {item.birth_year}
          </li>
        </ul>
      );
    if (isPlanet(item))
      return (
        <ul className={style.info}>
          <li>
            {t('terrain')} {item.terrain}
          </li>
        </ul>
      );
    if (isStarship(item))
      return (
        <ul className={style.info}>
          <li>
            {t('model')} {item.model}
          </li>
        </ul>
      );
    return null;
  };

  return (
    <div className={style.wrapper} onClick={() => selectItem(item)}>
      <div className={style.topRow}>
        <h2 className={style.name}>
          {/* 🌟 Динамически подставляем подключ в зависимости от категории */}
          <span>{t(`nameLabel.${category}`)}</span> {item.name}
        </h2>
        <div onClick={(e) => e.stopPropagation()} className={style.checkbox}>
          <SelectionCheckbox data={item} />
        </div>
      </div>
      <div className={style.description}>
        <div className={style.subtitle}>{t('descriptionLabel')}</div>
        {renderDescription()}
      </div>
    </div>
  );
}
