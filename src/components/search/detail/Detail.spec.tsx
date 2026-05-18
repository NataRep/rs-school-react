import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router';
import DetailView from './Detail';

import style from './Detail.module.scss';

describe('DetailView Component', () => {
  const mockCloseDetails = jest.fn();

  const mockItem = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    url: 'https://swapi.dev/api/people/1/',
    films: ['film1', 'film2'],
  };

  const renderWithRouter = (loaderData: unknown = mockItem) => {
    const routes = [
      {
        path: '/',
        element: <Outlet context={{ closeDetails: mockCloseDetails, isOpen: true }} />,
        HydrateFallback: () => <div>Loading...</div>,
        children: [
          {
            path: 'details',
            element: <DetailView />,
            loader: () => loaderData,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/details'],
    });

    return render(<RouterProvider router={router} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render item name and technical fields correctly', async () => {
    renderWithRouter();

    const heading = await screen.findByRole('heading', { name: /name: luke skywalker/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByText('height:')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('hair_color:')).toBeInTheDocument();
    expect(screen.getByText('blond')).toBeInTheDocument();
  });

  it('should filter out excluded fields and arrays', async () => {
    renderWithRouter();

    await screen.findByRole('heading', { name: /name:/i });

    expect(screen.queryByText('url:')).not.toBeInTheDocument();
    expect(screen.queryByText('https://swapi.dev/api/people/1/')).not.toBeInTheDocument();
    expect(screen.queryByText('films:')).not.toBeInTheDocument();
  });

  it('should call closeDetails when clicking on the overlay background', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    const heading = await screen.findByRole('heading', { name: /name:/i });

    const overlay = heading.closest(`.${style.overview}`) || heading.parentElement?.parentElement?.parentElement;

    expect(overlay).toBeInTheDocument();
    await user.click(overlay!);

    expect(mockCloseDetails).toHaveBeenCalledTimes(1);
  });

  it('should render "No data available" if loader returns empty/null data', async () => {
    renderWithRouter(null);

    const noDataMessage = await screen.findByText('No data available');
    expect(noDataMessage).toBeInTheDocument();
    expect(screen.queryByText('Information:')).not.toBeInTheDocument();
  });
});