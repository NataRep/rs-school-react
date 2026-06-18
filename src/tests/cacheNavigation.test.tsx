import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import {
  createMemoryRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import About from '../components/about/About';
import Layout from '../components/layout/Layout';
import Search from '../components/search/Search';
import { searchResultLoader } from '../components/search/search-result/searchLoader';
import SearchResult from '../components/search/search-result/SearchResult';
import selectedReducer from '../store/selectedSlice';
import { starWarsApi } from '../store/starWarsApi';

const createTestStore = () =>
  configureStore({
    reducer: {
      [starWarsApi.reducerPath]: starWarsApi.reducer,
      selected: selectedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(starWarsApi.middleware),
  });

describe('Integration Test: Saving RTK Cache Query During Navigation', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    fetchMock.resetMocks();
  });

  test('не должен делать повторные сетевые запросы при переходе на About и назад на Поиск', async () => {
    const mockPeopleData = {
      results: [
        { name: 'Luke Skywalker', url: 'https://swapi.py4e.com/api/people/1/' },
      ],
      count: 1,
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockPeopleData));

    const testRoutes: RouteObject[] = [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: 'search',
            element: <Search />,
            children: [
              {
                path: ':categoryName',
                element: <SearchResult />,
                loader: searchResultLoader,
                shouldRevalidate: ({
                  currentParams,
                  nextParams,
                  currentUrl,
                  nextUrl,
                }) => {
                  if (currentParams.categoryName !== nextParams.categoryName)
                    return true;
                  if (currentUrl.search !== nextUrl.search) return true;
                  return false;
                },
              },
            ],
          },
          {
            path: 'about',
            element: <About />,
          },
        ],
      },
    ];

    render(
      <Provider store={store}>
        <RouterProvider
          router={createMemoryRouter(testRoutes, {
            initialEntries: ['/search/people'],
          })}
        />
      </Provider>,
    );

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    await userEvent.click(aboutLink);

    expect(
      await screen.findByRole('heading', { name: /^about$/i, level: 1 }),
    ).toBeInTheDocument();

    const searchLink = screen.getByRole('link', { name: /^search$/i });
    await userEvent.click(searchLink);

    const peopleTab = await screen.findByRole('link', { name: /people/i });
    await userEvent.click(peopleTab);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
