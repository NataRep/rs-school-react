import { render, screen } from '@testing-library/react';
import * as NavigationUtils from '../../../shared/utils/navigation';
import ErrorBoundary from './ErrorBoundary';

jest.mock('../button/Button', () => {
  return function MockButton({ text, callback }: { text: string; callback: () => void }) {
    return <button onClick={callback}>{text}</button>;
  };
});

const ProblematicChild = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Test Error');
  }
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
      <ErrorBoundary>
        <ProblematicChild shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });

  it('should show a fallback interface when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblematicChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reload This Page/i })).toBeInTheDocument();
  });

  it('should log the error to the console when caught', () => {
    render(
      <ErrorBoundary>
        <ProblematicChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('ErrorBoundary caught an error:'),
      expect.any(Error)
    );
  });

  it('should trigger window.location.reload when the reload button is clicked', () => {
    const reloadSpy = jest.spyOn(NavigationUtils, 'reloadPage').mockImplementation(() => { });

    render(
      <ErrorBoundary>
        <ProblematicChild shouldThrow={true} />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole('button', { name: /Reload This Page/i });
    reloadButton.click();

    expect(reloadSpy).toHaveBeenCalledTimes(1);

    reloadSpy.mockRestore();
  });
});