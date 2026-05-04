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
  url: string
};

export type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  url: string
};

export type Person = {
  name: string;
  height: string;
  mass: string;
  gender: string;
  url: string
};