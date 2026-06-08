import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    mockCallback.mockClear();
  });

  it('should render the button with correct text and attributes', () => {
    render(<Button text="Click Me" type="button" title="Interactive button" />);

    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('title', 'Interactive button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'false');
  });

  it('should call the callback when clicked', async () => {
    const user = userEvent.setup();
    render(<Button text="Click Me" type="button" callback={mockCallback} />);

    const button = screen.getByRole('button', { name: 'Click Me' });
    await user.click(button);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback and should be disabled when disabled prop is true', async () => {
    const user = userEvent.setup();
    render(<Button text="Submit" type="submit" callback={mockCallback} disabled={true} />);

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');

    await user.click(button);
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should apply the default button style class name', () => {
    const { container } = render(<Button text="Style Test" type="button" />);

    const button = container.firstChild;
    expect(button).toHaveClass('button');
  });
});