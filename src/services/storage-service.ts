export class StorageService {
  private static KEY: string = 'search-key';

  static saveSearchQuery(query: string): void {
    localStorage.setItem(this.KEY, query)
  }

  static getSearchQuery(): string | null {
    return localStorage.getItem(this.KEY)
  }
}