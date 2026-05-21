import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

interface MockButtonProps {
  text: string;
  callback: () => void;
}

jest.mock('../shared/button/Button', () => {
  return {
    __esModule: true,
    default: ({ text, callback }: MockButtonProps) => (
      <button onClick={callback}>{text}</button>
    )
  };
});

jest.mock('./theme-button/ThemeButton', () => {
  return {
    __esModule: true,
    ThemeButton: () => <button data-testid="mock-theme">Theme</button>
  };
});

jest.mock('./top-nav/TopNav', () => {
  return {
    __esModule: true,
    default: () => <nav data-testid="mock-topnav">Navigation</nav>
  };
});

describe('Layout Component', () => {
  let consoleSpy: jest.SpyInstance;
  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterAll(() => {
    consoleSpy.mockRestore();
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
      await userEvent.click(crashButton);
    }).rejects.toThrow('Critical rendering error');
  });
});