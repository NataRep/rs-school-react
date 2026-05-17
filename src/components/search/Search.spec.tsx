import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Search from './Search';

jest.mock('./search-form/SearchForm', () => {
  return function MockSearchForm() {
    return <div data-testid="mock-search-form">Search Form</div>;
  };
});

jest.mock('./../shared/tab/Tabs', () => {
  return function MockTabs({ tabs }: { tabs: readonly { label: string }[] }) {
    return (
      <div data-testid="mock-tabs">
        {tabs.map((t) => t.label).join(', ')}
      </div>
    );
  };
});

describe('Search Layout Component', () => {
  it('should render header, search form, and tabs', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route path="/search" element={<Search />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Star Wars Universe Search/i })).toBeInTheDocument();

    expect(screen.getByTestId('mock-search-form')).toBeInTheDocument();
    expect(screen.getByTestId('mock-tabs')).toBeInTheDocument();
  });

  it('should pass correct tab configurations to the Tabs component', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route path="/search" element={<Search />} />
        </Routes>
      </MemoryRouter>
    );

    const tabsContainer = screen.getByTestId('mock-tabs');
    expect(tabsContainer.textContent).toContain('People');
    expect(tabsContainer.textContent).toContain('Planets');
    expect(tabsContainer.textContent).toContain('Starships');
    expect(tabsContainer.textContent).toContain('Get 404');
  });

  it('should render child routes inside the Outlet', () => {
    render(
      <MemoryRouter initialEntries={['/search/people']}>
        <Routes>
          <Route path="/search" element={<Search />}>
            <Route path="people" element={<div data-testid="child-route">People Results Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('child-route')).toBeInTheDocument();
    expect(screen.getByText('People Results Content')).toBeInTheDocument();
  });

  it('should render 404 or fallback content inside Outlet when route does not match any tab', () => {
    render(
      <MemoryRouter initialEntries={['/search/unknown-category']}>
        <Routes>
          <Route path="/search" element={<Search />}>
            <Route path="*" element={<div data-testid="not-found-subroute">Subroute Not Found</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Star Wars Universe Search/i })).toBeInTheDocument();
    expect(screen.getByTestId('mock-search-form')).toBeInTheDocument();

    expect(screen.getByTestId('not-found-subroute')).toBeInTheDocument();
    expect(screen.getByText('Subroute Not Found')).toBeInTheDocument();
  });

  it('should handle empty index route gracefully when no subroute is selected', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route path="/search" element={<Search />}>
            <Route index element={<div data-testid="index-route">Please select a category</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('index-route')).toBeInTheDocument();
    expect(screen.getByText('Please select a category')).toBeInTheDocument();
  });
});