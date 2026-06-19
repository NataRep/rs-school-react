import { RouterProvider } from 'react-router-dom';
import './App.scss';
import ErrorBoundary from './components/shared/error-boundary/ErrorBoundary';
import { useTheme } from './hooks/useTheme';
import { router } from './Router';

export default function App() {
  const { theme } = useTheme();

  return (
    <ErrorBoundary>
      <div className="appWrapper" data-theme={theme}>
        <RouterProvider router={router} />
      </div>
    </ErrorBoundary>
  );
}
