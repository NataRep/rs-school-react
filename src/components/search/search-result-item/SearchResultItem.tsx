import { useLocation, useNavigate } from 'react-router-dom';
import type { Person, Planet, Starship } from '../../../services/api-service/api-models';
import { getItemId } from '../../../shared/utils/get-id-from-url';
import { isPerson, isPlanet, isStarship } from '../../../shared/utils/serch-item';
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
          <li>Gender: {item.gender}</li>
          <li>Height: {item.height}</li>
          <li>Mass: {item.mass}</li>
        </ul>
      );
    }

    if (isPlanet(item)) {
      return (
        <ul className={style.info}>
          <li>Terrain: {item.terrain}</li>
          <li>Climate: {item.climate}</li>
        </ul>
      );
    }

    if (isStarship(item)) {
      return (
        <ul className={style.info}>
          <li>Model: {item.model}</li>
          <li>Manufacturer: {item.manufacturer}</li>
        </ul>
      );
    }

    return null;
  };

  return (
    <div className={style.wrapper} onClick={() => selectItem(item)}>
      <h2 className={style.name}>
        <span>Name:</span> {item.name}
      </h2>
      <div className={style.description}>
        <div className={style.subtitle}>Description:</div>
        {renderDescription()}
      </div>
    </div>
  );
}