import { createBrowserRouter, Navigate } from 'react-router-dom';
import About from './components/about/About';
import Layout from './components/layout/Layout';
import { NotFoundPage } from './components/not-found-page/NotFoundPage';
import Search from './components/search/Search';
import DetailView from './components/search/detail/Detail';
import { detailLoader } from './components/search/detail/detailLoader';
import SearchResult from './components/search/search-result/SearchResult';
import { createSearchResultLoader } from './components/search/search-result/searchLoader';
import { RouterErrorCatch } from './components/shared/error-boundary/ErrorBoundary';
import Loader from './components/shared/loader/Loader';
import { store } from './store';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      HydrateFallback: () => <Loader />,
      errorElement: <RouterErrorCatch />,
      children: [
        {
          index: true,
          element: <Navigate to="/search/people" replace />,
        },
        {
          path: 'search',
          element: <Search />,
          children: [
            {
              index: true,
              element: <Navigate to="people" replace />,
            },
            {
              path: ':categoryName',
              element: <SearchResult />,
              HydrateFallback: () => <Loader />,
              loader: createSearchResultLoader(store),
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
              children: [
                {
                  path: ':id',
                  element: <DetailView />,
                  loader: detailLoader,
                  HydrateFallback: () => <Loader />,
                },
              ],
            },
          ],
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ],
  {
    basename: '/',
  },
);