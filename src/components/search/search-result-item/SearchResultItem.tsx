import type { Person, Planet, Starship } from '../../../services/api-service/api-models';
import style from './SearchResultItem.module.scss';

type SearchItemProps = {
  item: Person | Planet | Starship;
};

const isPerson = (
  item: Person | Planet | Starship
): item is Person => 'gender' in item;

const isPlanet = (
  item: Person | Planet | Starship
): item is Planet => 'climate' in item;

const isStarship = (
  item: Person | Planet | Starship
): item is Starship => 'model' in item;

export default function SearchResultItem({ item }: SearchItemProps) {
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
    <div className={style.wrapper}>
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