import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/features/dashboard/Dashboard', () => {
  return function MockDashboard() {
    return <div data-testid="mock-dashboard">Dashboard Component</div>;
  };
});

describe('App', () => {
  it('should display the application header correctly', () => {
    render(<App />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('React Forms Sandbox');
  });

  it('should render the Dashboard component inside the main tag', () => {
    render(<App />);

    const mainElement = screen.getByRole('main');
    const dashboardMock = screen.getByTestId('mock-dashboard');

    expect(mainElement).toBeInTheDocument();
    expect(dashboardMock).toBeInTheDocument();
    expect(mainElement).toContainElement(dashboardMock);
  });

  it('should contain correct links to the author and the course in the footer', () => {
    render(<App />);

    const githubLink = screen.getByRole('link', { name: /natarep/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/NataRep');
    expect(githubLink).toHaveAttribute('target', '_blank');

    const courseLink = screen.getByRole('link', { name: /rs school react course task/i });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');

    expect(screen.getByText('2026(c)')).toBeInTheDocument();
  });

  it('should render an empty container for future modal windows', () => {
    const { container } = render(<App />);

    const modalRoot = container.querySelector('#modal-root');

    expect(modalRoot).toBeInTheDocument();
    expect(modalRoot).toHaveClass('modals-container');
    expect(modalRoot).toBeEmptyDOMElement();
  });
});