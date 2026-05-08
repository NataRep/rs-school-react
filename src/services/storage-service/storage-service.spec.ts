import { StorageService } from "./storage-service";

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should save search terms object in local storage', () => {
    const query = 'some query';
    const category = 'planets';

    StorageService.saveSearchQuery(category, query);

    expect(localStorage.getItem('search-category-key')).toBe(category);
    expect(localStorage.getItem('search-query-key')).toBe(query);

  })

  it('should get search terms object from local storage', () => {
    const query = 'star wars';
    const category = 'films';

    localStorage.setItem('search-category-key', category);
    localStorage.setItem('search-query-key', query);

    const result = StorageService.getSearchQuery();

    expect(result).toEqual({
      category: category,
      query: query
    });
  });
})