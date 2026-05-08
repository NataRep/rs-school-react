import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import SearchForm from './SearchForm';

describe('SearchForm Component', () => {
  const mockOnInputChange = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onInputChange when typing', async () => {
    await act(async () => {
      render(
        <SearchForm
          searchQuery=""
          onInputChange={mockOnInputChange}
        />
      );
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(mockOnInputChange).toHaveBeenCalledWith('Luke');
  });

  it('should not call onSearch if input is empty or only spaces', async () => {

    await act(async () => {
      render(
        <SearchForm
          searchQuery="   "
          onInputChange={mockOnInputChange}
          onSearch={mockOnSearch}
        />
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    const form = screen.getByRole('textbox').closest('form');
    if (form) fireEvent.submit(form);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('should not call onSearch if the value is the same as last sent', async () => {
    await act(async () => {
      render(
        <SearchForm
          searchQuery="Vader"
          onInputChange={mockOnInputChange}
          onSearch={mockOnSearch}
        />
      );
    })

    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);

    fireEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('should submit on Enter key press', async () => {
    await act(async () => {
      render(
        <SearchForm
          searchQuery="R2-D2"
          onInputChange={mockOnInputChange}
          onSearch={mockOnSearch}
        />
      );
    });

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalledWith('R2-D2');
  });
});