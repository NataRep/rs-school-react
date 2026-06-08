import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();
  let modalRoot: HTMLDivElement;

  beforeEach(() => {
    mockOnClose.mockClear();
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.removeChild(modalRoot);
  });

  it('should return null when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    );

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render modal content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Title">
        <div>Modal Body Text</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title-id');
    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
    expect(screen.getByText('Modal Body Text')).toBeInTheDocument();
  });

  it('should call onClose when clicking on the overlay', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    const overlay = dialog.parentElement;

    if (overlay) {
      await user.click(overlay);
    }

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when clicking inside the content box', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <button type="button">Inside Button</button>
      </Modal>
    );

    const insideBtn = screen.getByRole('button', { name: 'Inside Button' });
    await user.click(insideBtn);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    );

    const closeBtn = screen.getByRole('button', { name: 'Close' });
    await user.click(closeBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should trap focus when pressing Tab on the last element', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <input data-testid="first-input" />
        <button type="button" data-testid="last-button">Last</button>
      </Modal>
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    const lastButton = screen.getByTestId('last-button');

    lastButton.focus();
    expect(document.activeElement).toBe(lastButton);

    await user.tab();
    expect(document.activeElement).toBe(closeButton);
  });

  it('should trap focus when pressing Shift+Tab on the first element', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <input data-testid="first-input" />
        <button type="button" data-testid="last-button">Last</button>
      </Modal>
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    const lastButton = screen.getByTestId('last-button');

    closeButton.focus();
    expect(document.activeElement).toBe(closeButton);

    await user.tab({ shift: true });
    expect(document.activeElement).toBe(lastButton);
  });

  it('should not throw or loop if there are no focusable elements inside', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Text only</p>
      </Modal>
    );

    await user.tab();
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});