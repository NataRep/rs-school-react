import { act, renderHook } from '@testing-library/react';
import { useSearchStorage } from './useSearchStorage';

describe('useSearchStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should return query from localStorage on init', () => {
    localStorage.setItem('search-query-key', 'skywalker');

    const { result } = renderHook(() => useSearchStorage());

    expect(result.current.storedQuery).toBe('skywalker');
  });

  it('should return null if localStorage is empty', () => {
    const { result } = renderHook(() => useSearchStorage());

    expect(result.current.storedQuery).toBeNull();
  });

  it('should save query to localStorage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useSearchStorage());

    act(() => {
      result.current.saveSearchQuery('vader');
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      'search-query-key',
      'vader',
    );

    expect(localStorage.getItem('search-query-key')).toBe('vader');
  });

  it('should update storedQuery state after saving', () => {
    const { result } = renderHook(() => useSearchStorage());

    act(() => {
      result.current.saveSearchQuery('kenobi');
    });

    expect(result.current.storedQuery).toBe('kenobi');
  });
});