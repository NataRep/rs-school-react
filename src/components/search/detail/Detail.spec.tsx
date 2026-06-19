import { render, screen } from '@testing-library/react';
import { useGetEntityDetailsQuery } from '../../../store/starWarsApi';
import DetailView from './Detail';

const mockUseLoaderData = jest.fn();
const mockCloseDetails = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => mockUseLoaderData(),
  useOutletContext: () => ({ closeDetails: mockCloseDetails, isOpen: true }),
}));

jest.mock('../../../store/starWarsApi', () => ({
  useGetEntityDetailsQuery: jest.fn(),
}));

jest.mock('../../shared/button/Button', () => ({
  __esModule: true,
  default: ({ callback }: { callback: () => void }) => (
    <button onClick={callback}>Close</button>
  ),
}));

jest.mock('./../selection-checkbox/SelectionCheckbox', () => {
  return function MockSelectionCheckbox() {
    return <div data-testid="mock-checkbox" />;
  };
});

describe('DetailView Component with RTK Query', () => {
  const mockItem = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    url: 'https://swapi.py4e.com/api/people/1/',
    films: ['film1', 'film2'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLoaderData.mockReturnValue({ categoryName: 'people', id: '1' });
  });

  it('should show skeleton loader when isLoading is true', () => {
    (useGetEntityDetailsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<DetailView />);

    const skeletons = document.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
    expect(
      screen.queryByRole('heading', { name: /name:/i }),
    ).not.toBeInTheDocument();
  });

  it('should display item fields when data is loaded successfully', () => {
    (useGetEntityDetailsQuery as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      isError: false,
    });

    render(<DetailView />);

    const heading = screen.getByRole('heading', {
      name: /name: luke skywalker/i,
    });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/height/i)).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
  });

  it('should filter out excluded fields and arrays based on utility functions', () => {
    (useGetEntityDetailsQuery as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      isError: false,
    });

    render(<DetailView />);

    expect(screen.queryByText('Url:')).not.toBeInTheDocument();
    expect(screen.queryByText('Films:')).not.toBeInTheDocument();
  });

  it('should render error message if API query fails', () => {
    (useGetEntityDetailsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { status: 500 },
    });

    render(<DetailView />);

    expect(
      screen.getByText('Failed to load details. Please try again.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /name:/i }),
    ).not.toBeInTheDocument();
  });

  it('should render "No data available" if data is empty', () => {
    (useGetEntityDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<DetailView />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
