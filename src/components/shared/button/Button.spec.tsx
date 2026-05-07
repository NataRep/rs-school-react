import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('should render the button with correct text', () => {
    const buttonText = 'Click me';
    const mockCallback = jest.fn();

    render(
      <Button
        text={buttonText}
        callback={mockCallback}
        disabled={false}
      />
    );

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    expect(buttonElement).toBeInTheDocument();
  });
});