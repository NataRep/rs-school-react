import { useLocation, useNavigate } from 'react-router-dom';
import type { Person, Planet, Starship } from '../../../store/api-models';
import { getItemId } from '../../../utils/get-id-from-url';
import { isPerson, isPlanet, isStarship } from '../../../utils/search-item';
import SelectionCheckbox from '../selection-checkbox/SelectionCheckbox';
import style from './SearchResultItem.module.scss';

export type SearchItemProps = {
  item: SearchItem;
};

export type SearchItem = Person | Planet | Starship;

export default function SearchResultItem({ item }: SearchItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const selectItem = (item: SearchItem) => {
    const id = getItemId(item.url);
    if (!id) return;
    navigate(`${id}${location.search}`);
  };

  const renderDescription = () => {
    if (isPerson(item)) {
      return (
        <ul className={style.info}>
          <li>Birth year: {item.birth_year}</li>
        </ul>
      );
    }

    if (isPlanet(item)) {
      return (
        <ul className={style.info}>
          <li>Terrain: {item.terrain}</li>
        </ul>
      );
    }

    if (isStarship(item)) {
      return (
        <ul className={style.info}>
          <li>Model: {item.model}</li>
        </ul>
      );
    }

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
