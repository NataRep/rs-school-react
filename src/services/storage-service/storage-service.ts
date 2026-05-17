export type StorageSearchKey = {
  query: string | null,
}

export class StorageService {
  private static QUERY_KEY: string = 'search-query-key';

  static saveSearchQuery(query: string): void {
    localStorage.setItem(this.QUERY_KEY, query);
  }

  static getSearchQuery(): StorageSearchKey {
    return {
      query: localStorage.getItem(this.QUERY_KEY),
    }
  }
}