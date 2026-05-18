import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import About from './components/about/About';
import Layout from './components/main/Layout';
import { NotFoundPage } from './components/not-found-page/NotFoundPage';
import Search from './components/search/Search';
import SearchResult from './components/search/search-result/SearchResult';
import { searchResultLoader } from './components/search/search-result/searchLoader';
import ErrorBoundary, { RouterErrorCatch } from './components/shared/error-boundary/ErrorBoundary';
import Loader from './components/shared/loader/Loader';

const router = createBrowserRouter(
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
              loader: searchResultLoader,
            },
          ],
        },
        {
          path: 'about',
          element: <About />,
        }
      ],
    },
    { path: "*", element: <NotFoundPage /> }
  ],
  {
    basename: process.env.NODE_ENV === 'test' ? '/' : '/rs-school-react',
  }
);

export default function App() {
  return <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>;
}