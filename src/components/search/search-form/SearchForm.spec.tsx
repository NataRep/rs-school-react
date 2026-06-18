import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import SearchForm from './SearchForm';

const mockSaveSearchQuery = jest.fn();
jest.mock('../../../hooks/useSearchStorage', () => ({
  useSearchStorage: () => ({
    saveSearchQuery: mockSaveSearchQuery,
  }),
}));

jest.mock('../../shared/button/Button', () => {
  return function MockButton({
    text,
    type,
  }: {
    text: string;
    type: 'submit' | 'button';
  }) {
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
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText(
      /Find a character/i,
    ) as HTMLInputElement;
    expect(input.value).toBe('Yoda');
  });

  it('should update URL parameters and save query to storage on form submit', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchForm />
        <URLDebugger />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText(/Find a character/i);
    const submitButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: 'R2-D2' } });
    fireEvent.click(submitButton);

    const urlParams = screen.getByTestId('url-params').textContent;
    expect(urlParams).toContain('search=R2-D2');
    expect(urlParams).toContain('page=1');

    expect(mockSaveSearchQuery).toHaveBeenCalledWith('R2-D2');
    expect(mockSaveSearchQuery).toHaveBeenCalledTimes(1);
  });

  it('should remove search param from URL if query is empty on submit', () => {
    render(
      <MemoryRouter initialEntries={['/search?search=Obi-Wan&page=2']}>
        <SearchForm />
        <URLDebugger />
      </MemoryRouter>,
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
