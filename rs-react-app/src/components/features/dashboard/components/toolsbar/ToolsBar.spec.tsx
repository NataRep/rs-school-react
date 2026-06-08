import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import { addSubmission } from '../../../../../store/userSlice';
import type { UserFormData } from '../../../../../types/user';
import ToolsBar from './ToolsBar';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../../../../UI/Button/Button', () => {
  return function MockButton({ text, callback, title }: { text: string; callback: () => void; title: string }) {
    return (
      <button type="button" onClick={callback} title={title}>
        {text}
      </button>
    );
  };
});

jest.mock('../../../../UI/Modal/Modal', () => {
  return function MockModal({ isOpen, title, children, onClose }: { isOpen: boolean; title: string; children: React.ReactNode; onClose: () => void }) {
    if (!isOpen) return null;
    return (
      <div data-testid="mock-modal">
        <h1>{title}</h1>
        <button type="button" onClick={onClose} aria-label="Close modal">Close</button>
        {children}
      </div>
    );
  };
});

const mockFullFormData: UserFormData<string> = {
  name: 'Hook Form User',
  age: 25,
  email: 'test@test.com',
  gender: 'male',
  country: 'Belarus',
  password: 'Password1!',
  confirmPassword: 'Password1!',
  acceptTerms: true,
  profileImage: 'mock-base64-string',
};

jest.mock('../../../forms/components/uncontrolled-form/UncontrolledForm', () => {
  return function MockUncontrolledForm({ onSubmitSuccess }: { onSubmitSuccess: (data: unknown) => void }) {
    return (
      <div data-testid="uncontrolled-form">
        <button type="button" onClick={() => onSubmitSuccess({ ...mockFullFormData, name: 'Uncontrolled User' })}>
          Submit Uncontrolled
        </button>
      </div>
    );
  };
});

jest.mock('../../../forms/components/hook-form/ControlledForm', () => {
  return function MockControlledForm({ onSubmitSuccess }: { onSubmitSuccess: (data: unknown) => void }) {
    return (
      <div data-testid="controlled-form">
        <button type="button" onClick={() => onSubmitSuccess(mockFullFormData)}>
          Submit Controlled
        </button>
      </div>
    );
  };
})

describe('ToolsBar', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should render the control buttons and keep the modal hidden by default', () => {
    render(<ToolsBar />);

    expect(screen.getByRole('button', { name: 'Open uncontrolled Form' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open React Hook Form' })).toBeInTheDocument();
    expect(screen.queryByTestId('mock-modal')).not.toBeInTheDocument();
  });

  it('should open the modal with the uncontrolled form when the corresponding button is clicked', async () => {
    const user = userEvent.setup();
    render(<ToolsBar />);

    const openBtn = screen.getByRole('button', { name: 'Open uncontrolled Form' });
    await user.click(openBtn);

    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Uncontrolled Form' })).toBeInTheDocument();
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
    expect(screen.queryByTestId('controlled-form')).not.toBeInTheDocument();
  });

  it('should open the modal with the react hook form when the corresponding button is clicked', async () => {
    const user = userEvent.setup();
    render(<ToolsBar />);

    const openBtn = screen.getByRole('button', { name: 'Open React Hook Form' });
    await user.click(openBtn);

    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'React Hook Form' })).toBeInTheDocument();
    expect(screen.getByTestId('controlled-form')).toBeInTheDocument();
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
  });

  it('should close the modal container when the close action is initiated', async () => {
    const user = userEvent.setup();
    render(<ToolsBar />);

    await user.click(screen.getByRole('button', { name: 'Open uncontrolled Form' }));
    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(screen.queryByTestId('mock-modal')).not.toBeInTheDocument();
  });

  it('should dispatch the submission action and close the modal when a nested form triggers success', async () => {
    const user = userEvent.setup();
    render(<ToolsBar />);

    await user.click(screen.getByRole('button', { name: 'Open React Hook Form' }));

    const submitBtn = screen.getByRole('button', { name: 'Submit Controlled' });
    await user.click(submitBtn);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(addSubmission(mockFullFormData));
    expect(screen.queryByTestId('mock-modal')).not.toBeInTheDocument();
  });
});