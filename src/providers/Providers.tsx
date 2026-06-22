'use client';

import { ThemeProvider } from '@/context/ThemeProvider';
import { store } from '@/store';
import { Provider } from 'react-redux';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
