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

  it('should called callback function', () => {
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

    fireEvent.click(buttonElement)

    expect(mockCallback).toHaveBeenCalled()
  });

  it('should render icon', () => {

    const buttonText = 'Click me';
    const mockCallback = jest.fn();
    const iconName = 'search'

    render(
      <Button
        text={buttonText}
        callback={mockCallback}
        disabled={false}
        icon={iconName}
      />
    );

    const iconElement = screen.getByTestId('mock-icon');

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveTextContent(iconName);
  })

  it('should not render icon without prop', () => {

    const buttonText = 'Click me';
    const mockCallback = jest.fn();

    render(
      <Button
        text={buttonText}
        callback={mockCallback}
        disabled={false}
      />
    );

    const iconElement = screen.queryByTestId('mock-icon')

    expect(iconElement).toBeNull();
  })
});