import { act, fireEvent, render, screen } from '@testing-library/react';
import { StorageService } from '../../services/storage-service/storage-service';
import Search from './Search';
import SearchResult from './search-result/SearchResult';

jest.mock('../../services/storage-service/storage-service');
jest.mock('./search-result/SearchResult', () => {
  return jest.fn(() => {
    return null;
  });
});

describe('Search Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (StorageService.getSearchQuery as jest.Mock).mockReturnValue({
      category: null,
      query: null,
    });
  });

  it('should initialize with default state if storage is empty', async () => {
    await act(async () => {
      render(<Search />);
    });
    expect(screen.getByText(/Star Wars Universe Search/i)).toBeInTheDocument();

    const tabs = screen.getByRole('button', { name: /people/i });
    expect(tabs).toHaveClass('active');

    const input = screen.getByPlaceholderText(/Find a character, planet, or starship/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should initialize with data from StorageService', async () => {
    (StorageService.getSearchQuery as jest.Mock).mockReturnValue({
      category: 'planets',
      query: 'Tatooine',
    });

    await act(async () => {
      render(<Search />);
    });

    const input = screen.getByPlaceholderText(/Find a character, planet, or starship/i);
    expect(input).toHaveValue('Tatooine');

    const tabs = screen.getByRole('button', { name: /planets/i });
    expect(tabs).toHaveClass('active')
  });

  it('should update storage when category changes', async () => {
    await act(async () => {
      render(<Search />);
    });

    const planetsTab = screen.getByRole('button', { name: /planets/i });
    fireEvent.click(planetsTab);
    expect(StorageService.saveSearchQuery).toHaveBeenCalledWith('planets', '');
  });

  it('should catch errors in SearchResult and display fallback UI', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    (SearchResult as jest.Mock).mockImplementation(() => {
      throw new Error('Test Crash');
    });

    await act(async () => {
      render(<Search />);
    });

    const errorMessage = screen.queryByText(/Something went wrong/i);

    expect(errorMessage).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

})