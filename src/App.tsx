import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Main from './components/main/Main';
import Search from './components/search/Search';
import SearchResult from './components/search/search-result/SearchResult';
import { searchResultLoader } from './components/search/search-result/searchLoader';
import ErrorBoundary from './components/shared/error-boundary/ErrorBoundary';
import Loader from './components/shared/loader/Loader';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Main />,
      HydrateFallback: () => <Loader />,
      children: [
        {
          index: true,
          element: <Navigate to="/search/people" replace />,
        },
        {
          path: 'search',
          element: <Search />,
          errorElement: <ErrorBoundary />,
          children: [
            {
              index: true,
              element: <Navigate to="people" replace />,
            },
            {
              path: ':categoryName',
              element: <SearchResult />,
              loader: searchResultLoader,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === 'test' ? '/' : '/rs-school-react',
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}