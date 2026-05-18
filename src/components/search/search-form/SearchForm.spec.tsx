import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { StorageService } from '../../../services/storage-service/storage-service';
import SearchForm from './SearchForm';

jest.mock('../../../services/storage-service/storage-service', () => ({
  __esModule: true,
  StorageService: {
    saveSearchQuery: jest.fn(),
  },
}));

jest.mock('../../shared/button/Button', () => {
  return function MockButton({ text, type }: { text: string; type: 'submit' | 'button' }) {
    return <button type={type}>{text}</button>;
  };
});

function URLDebugger() {
  const [searchParams] = useSearchParams();
  return <div data-testid="url-params">{searchParams.toString()}</div>;
}

describe('SearchForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize input value with query from URL', () => {
    render(
      <MemoryRouter initialEntries={['/search?search=Yoda&page=3']}>
        <SearchForm />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Find a character/i) as HTMLInputElement;
    expect(input.value).toBe('Yoda');
  });

  it('should update URL parameters and save query to storage on form submit', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchForm />
        <URLDebugger />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Find a character/i);
    const submitButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: 'R2-D2' } });
    fireEvent.click(submitButton);

    const urlParams = screen.getByTestId('url-params').textContent;
    expect(urlParams).toContain('search=R2-D2');
    expect(urlParams).toContain('page=1');

    const mockSave = StorageService.saveSearchQuery as jest.Mock;
    expect(mockSave).toHaveBeenCalledWith('R2-D2');
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  it('should remove search param from URL if query is empty on submit', () => {
    render(
      <MemoryRouter initialEntries={['/search?search=Obi-Wan&page=2']}>
        <SearchForm />
        <URLDebugger />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Find a character/i);
    const submitButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(submitButton);

    const urlParams = screen.getByTestId('url-params').textContent;
    expect(urlParams).not.toContain('search=');
    expect(urlParams).toContain('page=1');
  });

});