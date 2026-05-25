import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';

const mockNavigation = jest.fn().mockReturnValue({ state: 'idle' });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigation: () => mockNavigation(),
}));

jest.mock('../search/selected-items-flyout/SelectedItemsFlyout', () => ({
  SelectedItemsFlyout: () => <div data-testid="flyout" />
}));

interface MockButtonProps {
  text: string;
  callback: () => void;
}

jest.mock('../shared/button/Button', () => ({
  __esModule: true,
  default: ({ text, callback }: MockButtonProps) => (
    <button onClick={callback}>{text}</button>
  )
}));

jest.mock('./theme-button/ThemeButton', () => ({
  __esModule: true,
  ThemeButton: () => <button data-testid="mock-theme">Theme</button>
}));

jest.mock('./top-nav/TopNav', () => ({
  __esModule: true,
  default: () => <nav data-testid="mock-topnav">Navigation</nav>
}));

jest.mock('../shared/loader/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-loader">Loading...</div>
}));

describe('Layout Component', () => {
  let consoleSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  beforeEach(() => {
    mockNavigation.mockReturnValue({ state: 'idle' });
  });

  it('should show loader when navigation is loading, and content when idle', () => {
    mockNavigation.mockReturnValue({ state: 'loading' });

    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div data-testid="child-page">Child Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
    expect(screen.queryByTestId('child-page')).not.toBeInTheDocument();

    mockNavigation.mockReturnValue({ state: 'idle' });

    rerender(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div data-testid="child-page">Child Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('mock-loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('child-page')).toBeInTheDocument();
  });

  it('should render the main container and structural elements', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('mock-topnav')).toBeInTheDocument();
    expect(screen.getByText('Show Error Boundary')).toBeInTheDocument();
  });

  it('should render child routes via Outlet', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div data-testid="child-page">Child Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('child-page')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('should throw an error when "Show Error Boundary" button is clicked', async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const crashButton = screen.getByText('Show Error Boundary');

    await expect(async () => {
      fireEvent.click(crashButton);
    }).rejects.toThrow('Critical rendering error');
  });
});