import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  RouterProvider: () => <main>mock app</main>,
}));

jest.mock('./store/starWarsApi', () => ({
  useGetDataQuery: jest.fn(),
}));

describe('App component', () => {
  it('should render app wrapper', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
