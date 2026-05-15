import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Main from './components/main/Main';
import Search from './components/search/Search';
import SearchResult from './components/search/search-result/SearchResult';
import { searchResultLoader } from './components/search/search-result/searchLoader';


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Main />,
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