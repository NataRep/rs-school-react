import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

jest.mock('../icon/Icon', () => {
  interface MockIconProps {
    name: string;
  }

  return function MockIcon({ name }: MockIconProps) {
    return <span data-testid="mock-icon">{name}</span>;
  };
});

describe('Button component', () => {
  let mockCallback: jest.Mock;
  const iconName = 'search';
  const buttonText = 'Click me';

  const renderButton = (props = {}) => {
    return render(
      <Button
        text={buttonText}
        type="button"
        callback={mockCallback}
        disabled={false}
        {...props}
      />,
    );
  };

  beforeEach(() => {
    mockCallback = jest.fn();
  });

  it('should render the button with correct text', () => {
    renderButton();

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('should called callback function', () => {
    renderButton();

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('should render icon', () => {
    renderButton({ icon: iconName });

    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveTextContent(iconName);
  });

  it('should not render icon without prop', () => {
    renderButton();

    const iconElement = screen.queryByTestId('mock-icon');
    expect(iconElement).toBeNull();
  });
});
