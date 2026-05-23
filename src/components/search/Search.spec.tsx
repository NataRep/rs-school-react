import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Search from './Search';

const mockNavigation = jest.fn().mockReturnValue({ state: 'idle' });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigation: () => mockNavigation(),
}));

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

jest.mock('../shared/loader/Loader', () => {
  return function MockLoader() {
    return <div data-testid="mock-loader">Loading...</div>;
  };
});

describe('Search Layout Component', () => {
  let consoleSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  beforeEach(() => {
    mockNavigation.mockReturnValue({ state: 'idle' });
  });

  it('should show loader when navigation is loading', () => {
    mockNavigation.mockReturnValue({ state: 'loading' });

    render(
      <MemoryRouter initialEntries={['/search/people']}>
        <Routes>
          <Route path="/search" element={<Search />}>
            <Route path="people" element={<div data-testid="child-route">People Results Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
    expect(screen.queryByTestId('child-route')).not.toBeInTheDocument();
  });

  it('should show content and no loader when navigation is idle', () => {
    mockNavigation.mockReturnValue({ state: 'idle' });

    render(
      <MemoryRouter initialEntries={['/search/people']}>
        <Routes>
          <Route path="/search" element={<Search />}>
            <Route path="people" element={<div data-testid="child-route">People Results Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('mock-loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('child-route')).toBeInTheDocument();
  });

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