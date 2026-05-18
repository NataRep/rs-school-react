import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

jest.mock('../top-nav/TopNav', () => {
  return function MockTopNav() {
    return <nav data-testid="mock-topnav">Navigation</nav>;
  };
});

describe('Layout Component', () => {
  it('should render the main container and structural elements', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();

    expect(screen.getByTestId('mock-topnav')).toBeInTheDocument();
  });
});