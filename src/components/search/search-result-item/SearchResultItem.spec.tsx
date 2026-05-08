import { render, screen } from '@testing-library/react';
import type { Person, Planet, Starship } from '../../../services/api-service/api-models';
import SearchResultItem from './SearchResultItem';

describe('SearchResultItem Component', () => {
  it('should render person details correctly', () => {
    const mockPerson: Person = {
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      mass: '77',
    } as Person;

    render(<SearchResultItem item={mockPerson} />);

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
  });

  it('should render planet details correctly', () => {
    const mockPlanet: Planet = {
      name: 'Tatooine',
      terrain: 'desert',
      climate: 'arid',
    } as Planet;

    render(<SearchResultItem item={mockPlanet} />);

    expect(screen.getByText(/Terrain: desert/i)).toBeInTheDocument();
    expect(screen.getByText(/Climate: arid/i)).toBeInTheDocument();
  });

  it('should render starship details correctly', () => {
    const mockStarship: Starship = {
      name: 'Death Star',
      model: 'DS-1 Platform',
      manufacturer: 'Imperial Department of Military Research',
    } as Starship;

    render(<SearchResultItem item={mockStarship} />);

    expect(screen.getByText(/Model: DS-1 Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Manufacturer:/i)).toBeInTheDocument();
  });
});