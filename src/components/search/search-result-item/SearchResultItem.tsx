import { Component } from "react";
import type { Person, Planet, Starship } from "../../../services/api-models";
import style from './SearchResultItem.module.scss';

type SearchItemProps = {
  item: Person | Planet | Starship
}

const isPerson = (item: Person | Planet | Starship): item is Person => 'gender' in item;
const isPlanet = (item: Person | Planet | Starship): item is Planet => 'climate' in item;
const isStarship = (item: Person | Planet | Starship): item is Starship => 'model' in item;

export default class SearchResultItem extends Component<SearchItemProps> {

  renderDescription() {
    const { item } = this.props;

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
  }

  render() {
    return <div className={style.wrapper}>
      <h2 className={style.name}><span>Name:</span> {this.props.item.name}</h2>
      <div className={style.description}><p>Description:</p>
        {this.renderDescription()}
      </div></div>
  }
}