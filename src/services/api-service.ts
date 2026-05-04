import { type Person, type Planet, type Starship, type SwapiResponse } from "./api-models.ts";

export type CategoryMap = {
  people: Person;
  planets: Planet;
  starships: Starship;
};

export class ApiService {
  static async getData<K extends keyof CategoryMap>(
    category: K,
    searchQuery: string
  ): Promise<SwapiResponse<CategoryMap[K]>> {

    const baseUrl = "/api";

    const response = await fetch(
      `${baseUrl}/${category}/?search=${encodeURIComponent(searchQuery)}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }
}