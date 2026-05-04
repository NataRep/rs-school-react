import { type Person, type Planet, type Starship, type SwapiResponse } from "./api-models.ts";

export type CategoryMap = {
  people: Person;
  planets: Planet;
  starships: Starship;
};

export class ApiService {
  static async getData<K extends keyof CategoryMap>(
    category: K,
    searchQuery: string,
    page: number = 1
  ): Promise<SwapiResponse<CategoryMap[K]>> {

    const baseUrl = "https://swapi.py4e.com/api";

    const response = await fetch(
      `${baseUrl}/${category}/?search=${encodeURIComponent(searchQuery)}&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }
}