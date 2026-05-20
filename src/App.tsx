import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/shared/error-boundary/ErrorBoundary';
import { router } from './Router';


export default function App() {
  return <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>;
}