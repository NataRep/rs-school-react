import type { LoaderFunctionArgs } from 'react-router';
import { searchResultLoader } from './searchLoader';

describe('searchResultLoader', () => {
  const createMockArgs = (urlStr: string, params: Record<string, string> = {}): LoaderFunctionArgs => {
    return {
      params,
      request: new Request(urlStr),
    } as LoaderFunctionArgs;
  };

  it('should successfully return default parameters if query parameters are missing', () => {
    const mockArgs = createMockArgs('http://localhost/search', { categoryName: 'people' });

    const result = searchResultLoader(mockArgs);

    expect(result).toEqual({
      searchQuery: '',
      currentPage: 1,
      categoryName: 'people',
    });
  });

  it('should correctly parse searchQuery and currentPage from the URL', () => {
    const mockArgs = createMockArgs(
      'http://localhost/search?search=skywalker&page=3',
      { categoryName: 'planets' }
    );

    const result = searchResultLoader(mockArgs);

    expect(result).toEqual({
      searchQuery: 'skywalker',
      currentPage: 3,
      categoryName: 'planets',
    });
  });

  it('should throw Response 404 if the category is invalid', () => {
    const mockArgs = createMockArgs('http://localhost/search', { categoryName: 'unknown-category' });

    expect(() => searchResultLoader(mockArgs)).toThrow();

    try {
      searchResultLoader(mockArgs);
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      const response = error as Response;
      expect(response.status).toBe(404);
      expect(response.statusText).toBe('Invalid Category');
    }
  });

  it('should throw Response 404 if the category is not passed at all', () => {
    const mockArgs = createMockArgs('http://localhost/search', {});

    try {
      searchResultLoader(mockArgs);
      fail('The loader should have thrown an error.');
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(404);
    }
  });
});