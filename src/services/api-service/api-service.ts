import { type Person, type Planet, type Starship, type SwapiResponse } from "./api-models";

export type CategoryMap = {
  people: Person;
  planets: Planet;
  starships: Starship;
};

export class ApiService {
  static async getData(
    category: string,
    searchQuery: string,
    page: number = 1
  ): Promise<SwapiResponse<CategoryMap[K]>> {

    const baseUrl = "https://swapi.py4e.com/api";

    const response = await fetch(
      `${baseUrl}/${category}/?search=${encodeURIComponent(searchQuery)}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }
}