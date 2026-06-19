import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchPagination from './SearchPagination';

function renderWithRouter(initialPage = '1', totalPages = 5) {
  return render(
    <MemoryRouter initialEntries={[`/?page=${initialPage}`]}>
      <Routes>
        <Route
          path="/"
          element={<SearchPagination totalPages={totalPages} />}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('SearchPagination', () => {
  it('should not render when totalPages <= 1', () => {
    const { container } = renderWithRouter('1', 1);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render pagination info', () => {
    renderWithRouter('1', 5);
    expect(screen.getByText('1 / 5')).toBeInTheDocument();
  });

  it('should disable Prev on first page', () => {
    renderWithRouter('1', 5);

    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('should go to next page', async () => {
    renderWithRouter('1', 5);

    fireEvent.click(screen.getByText('Next'));

    expect(await screen.findByText('2 / 5')).toBeInTheDocument();
  });

  it('should go to previous page', () => {
    renderWithRouter('3', 5);

    fireEvent.click(screen.getByText('Prev'));

    expect(screen.getByText('2 / 5')).toBeInTheDocument();
  });

  it('should not go beyond last page', () => {
    renderWithRouter('5', 5);

    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('5 / 5')).toBeInTheDocument();
  });

  it('should not go below page 1', () => {
    renderWithRouter('1', 5);

    fireEvent.click(screen.getByText('Prev'));

    expect(screen.getByText('1 / 5')).toBeInTheDocument();
  });
});
