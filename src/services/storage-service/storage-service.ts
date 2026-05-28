import type { CategoryMap } from "../api-service/api-service";

export type StorageSearchKey = {
  category: keyof CategoryMap | null,
  query: string | null,
}

export class StorageService {
  private static CATEGORY_KEY: string = 'search-category-key';
  private static QUERY_KEY: string = 'search-query-key';

  static saveSearchQuery(category: keyof CategoryMap, query: string): void {
    localStorage.setItem(this.QUERY_KEY, query);
    localStorage.setItem(this.CATEGORY_KEY, category)
  }

  static getSearchQuery(): StorageSearchKey {
    return {
      category: localStorage.getItem(this.CATEGORY_KEY) as keyof CategoryMap,
      query: localStorage.getItem(this.QUERY_KEY),
    }
  }
}