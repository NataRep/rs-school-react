'use client';

import type { Person, Planet, Starship } from '@/store/api-models';
import { getItemId } from '@/utils/get-id-from-url';
import { isPerson, isPlanet, isStarship } from '@/utils/search-item';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SelectionCheckbox from '../selection-checkbox/SelectionCheckbox';
import style from './SearchResultItem.module.scss';

export type SearchItemProps = {
  item: SearchItem;
};

export type SearchItem = Person | Planet | Starship;

export default function SearchResultItem({ item }: SearchItemProps) {
  const router = useRouter();
  const rawPathname = usePathname();
  const searchParams = useSearchParams();

  const selectItem = (item: SearchItem) => {
    const id = getItemId(item.url);
    if (!id) return;

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('details', id);

    const cleanPathname = rawPathname.replace(/^\/(ru|en)(\/|$)/, '/') || '/';

    router.push(`${cleanPathname}?${newParams.toString()}`);
  };

  const renderDescription = () => {
    if (isPerson(item))
      return (
        <ul className={style.info}>
          <li>Birth year: {item.birth_year}</li>
        </ul>
      );
    if (isPlanet(item))
      return (
        <ul className={style.info}>
          <li>Terrain: {item.terrain}</li>
        </ul>
      );
    if (isStarship(item))
      return (
        <ul className={style.info}>
          <li>Model: {item.model}</li>
        </ul>
      );
    return null;
  };

  return (
    <div className={style.wrapper} onClick={() => selectItem(item)}>
      <div className={style.topRow}>
        <h2 className={style.name}>
          <span>Name:</span> {item.name}
        </h2>
        <div onClick={(e) => e.stopPropagation()} className={style.checkbox}>
          <SelectionCheckbox data={item} />
        </div>
      </div>
      <div className={style.description}>
        <div className={style.subtitle}>Description:</div>
        {renderDescription()}
      </div>
    </div>
  );
}
