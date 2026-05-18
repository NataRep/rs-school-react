import { StorageService } from "./storage-service";

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should save search terms object in local storage', () => {
    const query = 'some query';

    StorageService.saveSearchQuery(query);
    expect(localStorage.getItem('search-query-key')).toBe(query);

  })

  it('should get search terms object from local storage', () => {
    const query = 'star wars';

    localStorage.setItem('search-query-key', query);

    const result = StorageService.getSearchQuery();

    expect(result).toEqual({
      query: query
    });
  });
})