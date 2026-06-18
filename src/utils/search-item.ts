import type { Person, Planet, Starship } from '../store/api-models';

export const isPerson = (item: Person | Planet | Starship): item is Person =>
  'gender' in item;

export const isPlanet = (item: Person | Planet | Starship): item is Planet =>
  'climate' in item;

export const isStarship = (
  item: Person | Planet | Starship,
): item is Starship => 'model' in item;
