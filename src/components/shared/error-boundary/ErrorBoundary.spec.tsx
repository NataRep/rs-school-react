import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

jest.mock('../button/Button', () => {
  return function MockButton({ text, callback }: { text: string; callback: () => void }) {
    return <button onClick={callback}>{text}</button>;
  };
});

const ProblematicChild = ({ shouldThrow = false }) => {
  if (shouldThrow) throw new Error('Test Error');
  return <div>Everything is fine</div>;
};

describe('ErrorBoundary Component', () => {
  let consoleSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('should render children if there is no error', () => {
    render(
      <ErrorBoundary resetCondition="initial">
        <ProblematicChild shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });

  it('should show a fallback interface when an error occurs', () => {
    render(
      <ErrorBoundary resetCondition="initial">
        <ProblematicChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reload This Page/i })).toBeInTheDocument();
  });

  it('should reset the error state when resetCondition changes', () => {
    const { rerender } = render(
      <ErrorBoundary resetCondition="A">
        <ProblematicChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Oops!/i)).toBeInTheDocument();

    rerender(
      <ErrorBoundary resetCondition="B">
        <ProblematicChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
    expect(screen.queryByText(/Oops!/i)).not.toBeInTheDocument();
  });
});