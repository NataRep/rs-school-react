import { act, render, screen } from '@testing-library/react';
import DetailView from './Detail';

const mockUseLoaderData = jest.fn();
const mockCloseDetails = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => mockUseLoaderData(),
  useOutletContext: () => ({ closeDetails: mockCloseDetails, isOpen: true }),
}));

jest.mock('../../shared/button/Button', () => ({
  __esModule: true,
  default: ({ callback }: { callback: () => void }) => <button onClick={callback}>Close</button>
}));

jest.mock('./../selection-checkbox/SelectionСheckbox', () => {
  return function MockSelectionCheckbox() {
    return <div data-testid="mock-checkbox" />;
  };
});

describe('DetailView Component', () => {
  const mockItem = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    url: 'https://swapi.dev/api/people/1/',
    films: ['film1', 'film2'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show skeleton loader first, then resolve and display item fields', async () => {
    let resolvePromise: (value: unknown) => void;
    const deferredPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockUseLoaderData.mockReturnValue({ details: deferredPromise });

    render(<DetailView />);

    const skeletons = document.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
    expect(screen.queryByRole('heading', { name: /name:/i })).not.toBeInTheDocument();

    await act(async () => {
      resolvePromise!(mockItem);
    });

    const heading = await screen.findByRole('heading', { name: /name: luke skywalker/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText('height:')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
  });

  it('should filter out excluded fields and arrays', async () => {
    mockUseLoaderData.mockReturnValue({ details: Promise.resolve(mockItem) });

    render(<DetailView />);

    await screen.findByRole('heading', { name: /name: luke skywalker/i });

    expect(screen.queryByText('url:')).not.toBeInTheDocument();
    expect(screen.queryByText('https://swapi.dev/api/people/1/')).not.toBeInTheDocument();
    expect(screen.queryByText('films:')).not.toBeInTheDocument();
  });

  it('should render "No data available" if loader resolves with null data', async () => {
    mockUseLoaderData.mockReturnValue({ details: Promise.resolve(null) });

    render(<DetailView />);

    const noDataMessage = await screen.findByText('No data available');
    expect(noDataMessage).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /name:/i })).not.toBeInTheDocument();
  });
});