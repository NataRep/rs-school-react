import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from '../../../hooks/useTheme';
import { ThemeButton } from './ThemeButton';

jest.mock('../../shared/icon/Icon', () => {
  return function MockIcon({ name }: { name: string }) {
    return <span data-testid={`${name}`} />;
  };
});

jest.mock('../../../hooks/useTheme', () => ({
  useTheme: jest.fn().mockReturnValue({
    theme: 'light',
    toggleTheme: jest.fn(),
  }),
}));

describe('ThemeButton component', () => {
  it('should render input with icons', () => {
    render(<ThemeButton />);

    expect(screen.getByTitle('Toggle theme')).toBeInTheDocument();
    expect(screen.getByTestId('sun')).toBeInTheDocument();
    expect(screen.getByTestId('night')).toBeInTheDocument();
  });

  it('should call toggleTheme when checkbox is clicked', async () => {
    const mockToggleTheme = jest.fn();

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeButton />);

    const checkbox = screen.getByRole('checkbox');

    await userEvent.click(checkbox);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
