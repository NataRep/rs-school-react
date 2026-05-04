export type SwapiResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Planet = {
  name: string;
  climate: string;
  terrain: string;
};

export type Spaceship = {
  name: string;
  model: string;
  manufacturer: string;
};

export type Person = {
  name: string;
  height: string;
  mass: string;
  gender: string;
};