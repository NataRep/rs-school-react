'use client';

import { ThemeProvider } from '@/context/ThemeProvider';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { store } from './../../store';

const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
}
