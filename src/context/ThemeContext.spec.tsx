import { act, renderHook } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

describe('ThemeProvider', () => {
  it('should return the default "dark" theme', () => {

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toBe('dark');
  });

  it('should switch the theme when calling toggleTheme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
  });
});