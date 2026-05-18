import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../shared/button/Button', () => {
  return function MockButton({ text, callback }: { text: string; callback: () => void }) {
    return <button onClick={callback}>{text}</button>;
  };
});

describe('NotFoundPage', () => {
  it('should render 404 page content', () => {
    render(<NotFoundPage />);

    expect(
      screen.getByText(/THIS IS NOT THE PAGE YOU ARE LOOKING FOR/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Go to home/i)
    ).toBeInTheDocument();
  });

  it('should navigate to home on button click', () => {
    const navigateMock = jest.fn();

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<NotFoundPage />);

    fireEvent.click(screen.getByText(/Go to home/i));

    expect(navigateMock).toHaveBeenCalledWith('/search/people');
  });
});