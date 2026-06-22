import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { RootState } from '../../store';
import { starWarsApi } from '../../store/starWarsApi';
import Tabs from './Tabs';

jest.mock('../icon/Icon', () => {
  return function MockIcon({ name }: { name: string }) {
    return <span data-testid={`icon-${name}`} />;
  };
});

jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');

  return {
    ...actual,
    useDispatch: () => jest.fn(),
    useSelector: (selector: (state: RootState) => unknown) =>
      selector({
        selected: {
          items: [],
        },
        [starWarsApi.reducerPath]: starWarsApi.reducer(undefined, {
          type: '@@INIT',
        }),
      } as RootState),
  };
});

describe('Tabs Component', () => {
  const mockTabs = [
    { label: 'People', value: 'people' },
    { label: 'Planets', value: 'planets' },
    { label: 'Starships', value: 'starships' },
  ];

  it('should render all tabs with correct labels and icons', () => {
    render(
      <MemoryRouter>
        <Tabs tabs={mockTabs} />
      </MemoryRouter>,
    );

    mockTabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
      expect(screen.getByTestId(`icon-${tab.value}`)).toBeInTheDocument();
    });
  });

  it('should apply active class to the currently active route', () => {
    render(
      <MemoryRouter initialEntries={['/search/planets']}>
        <Tabs tabs={mockTabs} />
      </MemoryRouter>,
    );

    const peopleLink = screen.getByRole('link', { name: /people/i });
    const planetsLink = screen.getByRole('link', { name: /planets/i });

    expect(planetsLink.className).toContain('active');
    expect(peopleLink.className).not.toContain('active');
  });

  it('should remain active when on a sub-route or when query parameters are present ', () => {
    render(
      <MemoryRouter
        initialEntries={['/search/planets/tatooine?page=2&sort=desc']}
      >
        <Tabs tabs={mockTabs} />
      </MemoryRouter>,
    );

    const planetsLink = screen.getByRole('link', { name: /planets/i });
    const peopleLink = screen.getByRole('link', { name: /people/i });

    expect(planetsLink.className).toContain('active');
    expect(peopleLink.className).not.toContain('active');
  });
});
