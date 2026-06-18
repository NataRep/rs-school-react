import { render, screen } from '@testing-library/react';
import About from './About';

describe('About page', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('renders page title', () => {
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders author name with GitHub link', () => {
    const authorLink = screen.getByText('Nata Repkina');

    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', 'https://github.com/NataRep');
  });

  it('renders description about the app', () => {
    expect(screen.getByText(/star wars search project/i)).toBeInTheDocument();
  });

  it('renders course section', () => {
    expect(
      screen.getByRole('heading', { name: /a little about course/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/rs school react training program/i),
    ).toBeInTheDocument();
  });

  it('renders RS School course link', () => {
    const courseLink = screen.getByText(/rs\s*school\s*react\s*course/i);

    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs',
    );
  });
});
