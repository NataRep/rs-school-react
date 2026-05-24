import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { Person, Planet, Starship } from '../../../services/api-service/api-models';
import SearchResultItem from './SearchResultItem';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,

  useLocation: () => ({ search: '?page=1' }),
}));

jest.mock('./../selection-checkbox/SelectionСheckbox', () => {
  return function MockSelectionCheckbox() {
    return <div data-testid="mock-checkbox" />;
  };
});

describe('SearchResultItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render person details correctly', () => {
    const mockPerson: Person = {
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/1/',
    } as Person;

    render(
      <MemoryRouter>
        <SearchResultItem item={mockPerson} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth year:\s*19BBY/i)).toBeInTheDocument();
  });

  it('should render planet details correctly', () => {
    const mockPlanet: Planet = {
      name: 'Tatooine',
      terrain: 'desert',
      climate: 'arid',
      url: 'https://swapi.dev/api/planets/2/',
    } as Planet;

    render(
      <MemoryRouter>
        <SearchResultItem item={mockPlanet} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/Terrain:\s*desert/i)).toBeInTheDocument();
  });

  it('should render starship details correctly', () => {
    const mockStarship: Starship = {
      name: 'Death Star',
      model: 'DS-1 Platform',
      manufacturer: 'Imperial Department of Military Research',
      url: 'https://swapi.dev/api/starships/9/',
    } as Starship;

    render(
      <MemoryRouter>
        <SearchResultItem item={mockStarship} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Death Star/i)).toBeInTheDocument();
    expect(screen.getByText(/Model:\s*DS-1 Platform/i)).toBeInTheDocument();
  });

  it('should call navigate with correct id and search query on click', async () => {
    const mockPerson: Person = {
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      mass: '77',
      url: 'https://swapi.dev/api/people/1/',
    } as Person;

    render(
      <MemoryRouter>
        <SearchResultItem item={mockPerson} />
      </MemoryRouter>
    );

    const card = screen.getByText(/Luke Skywalker/i).closest('div');
    expect(card).toBeInTheDocument();

    if (card) {
      fireEvent.click(card);
    }
    expect(mockNavigate).toHaveBeenCalledWith('1?page=1');
  });
});