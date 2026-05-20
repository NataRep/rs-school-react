import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { NavLinkItem } from "../../../shared/constants/navLinks";
import TopNav from "./TopNav";

jest.mock('../../shared/icon/Icon', () => {
  return function MockIcon({ name }: { name: string }) {
    return <span data-testid={`icon-${name}`} />;
  };
});

describe('TopNav', () => {
  const mokLinks: NavLinkItem[] = [
    {
      label: 'Search',
      path: '/search/people',
      icon: 'search',
    },
    {
      label: 'About',
      path: '/about',
      icon: 'info',
    },
  ];

  it('should render all links with correct labels and icons', () => {
    render(
      <MemoryRouter>
        <TopNav items={mokLinks} />
      </MemoryRouter>
    );

    mokLinks.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
      expect(screen.getByTestId(`icon-${link.icon}`)).toBeInTheDocument();
    });
  });

  it('should apply active class to the currently active route', () => {
    render(
      <MemoryRouter initialEntries={['/search/people']}>
        <TopNav items={mokLinks} />
      </MemoryRouter>
    );

    const searchLink = screen.getByRole('link', { name: /search/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(searchLink.className).toContain('active');
    expect(aboutLink.className).not.toContain('active');
  });

  it('should remain active when on a sub-route or when query parameters are present', () => {
    render(
      <MemoryRouter initialEntries={['/search/people/123?page=2&sort=desc']}>
        <TopNav items={mokLinks} />
      </MemoryRouter>
    );

    const searchLink = screen.getByRole('link', { name: /search/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(searchLink.className).toContain('active');
    expect(aboutLink.className).not.toContain('active');
  });
});